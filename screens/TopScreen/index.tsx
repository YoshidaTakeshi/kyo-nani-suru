import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { topScreenStyles } from './index.styles';

type TopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Top'>;

interface Props {
  navigation: TopScreenNavigationProp;
}

export default function TopScreen({ navigation }: Props) {
  const handleStart = () => {
    // Navigate to plan suggestion screen
    navigation.navigate('PlanSuggestion');
    console.log('プラン提案ボタンが押されました');
  };

  return (
    <View style={topScreenStyles.container}>
      <Text style={topScreenStyles.title}>今日なにする？</Text>
      <Text style={topScreenStyles.subtitle}>今日のプランを提案します</Text>
      <Pressable
        style={topScreenStyles.startButton}
        onPress={handleStart}
        testID="plan-suggestion-button"
      >
        <Text style={topScreenStyles.startButtonText}>プラン提案</Text>
      </Pressable>
    </View>
  );
}
