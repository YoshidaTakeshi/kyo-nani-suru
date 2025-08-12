import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { planSuggestionScreenStyles } from './index.styles';

type PlanSuggestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PlanSuggestion'
>;

interface Props {
  navigation: PlanSuggestionScreenNavigationProp;
}

export default function PlanSuggestionScreen({ navigation }: Props) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={planSuggestionScreenStyles.container}>
      <Text style={planSuggestionScreenStyles.title}>プラン提案</Text>
      <Text style={planSuggestionScreenStyles.subtitle}>
        あなたにおすすめのプランを提案します
      </Text>

      <View style={planSuggestionScreenStyles.planContainer}>
        <Text style={planSuggestionScreenStyles.planText}>
          今日のおすすめプラン：
        </Text>
        <Text style={planSuggestionScreenStyles.planDescription}>
          カフェでゆっくり読書をして、
          {'\n'}
          その後公園を散歩してみませんか？
        </Text>
      </View>

      <Pressable
        style={planSuggestionScreenStyles.button}
        onPress={handleGoBack}
        testID="back-button"
      >
        <Text style={planSuggestionScreenStyles.buttonText}>戻る</Text>
      </Pressable>
    </View>
  );
}
