import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../src/firebase';

const { width } = Dimensions.get('window');

interface LogCreateScreenProps {
  planId?: string;
}

export default function LogCreateScreen({ planId = 'test-plan' }: LogCreateScreenProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [memo, setMemo] = useState('');
  const [uploading, setUploading] = useState(false);

  // Request permissions for image picker
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('権限が必要です', '写真を選択するには、カメラロールへのアクセス権限が必要です。');
      return false;
    }
    return true;
  };

  // Select multiple images
  const selectImages = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10, // Limit to 10 images
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error('Image selection error:', error);
      Alert.alert('エラー', '画像の選択中にエラーが発生しました。');
    }
  };

  // Remove image from selection
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Upload image to Firebase Storage
  const uploadImageToStorage = async (uri: string, filename: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, `logs/${Date.now()}_${filename}`);
    await uploadBytes(storageRef, blob);
    
    return await getDownloadURL(storageRef);
  };

  // Save log to Firestore
  const saveLog = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('画像を選択してください', '少なくとも1枚の画像を選択してください。');
      return;
    }

    setUploading(true);

    try {
      // Upload all images to Storage
      const imageUrls: string[] = [];
      
      for (let i = 0; i < selectedImages.length; i++) {
        const uri = selectedImages[i];
        const filename = `image_${i}.jpg`;
        const downloadUrl = await uploadImageToStorage(uri, filename);
        imageUrls.push(downloadUrl);
      }

      // Save log data to Firestore
      const logData = {
        planId,
        timestamp: serverTimestamp(),
        imageUrls,
        memo: memo.trim(),
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'logs'), logData);

      Alert.alert('保存完了', 'ログが正常に保存されました。', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setSelectedImages([]);
            setMemo('');
          },
        },
      ]);
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('エラー', 'ログの保存中にエラーが発生しました。');
    } finally {
      setUploading(false);
    }
  };

  const renderImagePreview = () => {
    if (selectedImages.length === 0) {
      return (
        <View style={styles.noImagesContainer}>
          <Text style={styles.noImagesText}>画像が選択されていません</Text>
        </View>
      );
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={styles.imagePreviewWrapper}>
            <Image source={{ uri }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>実行ログ作成</Text>
      
      {/* Image selection section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>写真を選択</Text>
        
        <TouchableOpacity style={styles.selectButton} onPress={selectImages}>
          <Text style={styles.selectButtonText}>写真を選択 ({selectedImages.length}枚)</Text>
        </TouchableOpacity>
        
        {renderImagePreview()}
      </View>

      {/* Memo section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>メモ</Text>
        <TextInput
          style={styles.memoInput}
          value={memo}
          onChangeText={setMemo}
          placeholder="実行内容や感想を記録してください"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Save button */}
      <TouchableOpacity
        style={[styles.saveButton, uploading && styles.saveButtonDisabled]}
        onPress={saveLog}
        disabled={uploading}
      >
        {uploading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#fff" />
            <Text style={styles.saveButtonText}>保存中...</Text>
          </View>
        ) : (
          <Text style={styles.saveButtonText}>ログを保存</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  noImagesContainer: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  noImagesText: {
    color: '#999',
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
  },
  imagePreviewWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memoInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonDisabled: {
    backgroundColor: '#999',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});