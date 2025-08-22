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
      <Text style={planSuggestionScreenStyles.description}>
        あなたにおすすめのプランを提案します
      </Text>
      <Pressable
        style={planSuggestionScreenStyles.backButton}
        onPress={handleGoBack}
        testID="back-button"
      >
        <Text style={planSuggestionScreenStyles.backButtonText}>戻る</Text>
      </Pressable>
    </View>
  );
}
