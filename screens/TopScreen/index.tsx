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
    // Navigate to next screen
    navigation.navigate('Next');
    console.log('はじめるボタンが押されました');
  };

  const handlePlanSuggestion = () => {
    // Navigate to plan suggestion screen
    navigation.navigate('PlanSuggestion');
    console.log('プラン提案ボタンが押されました');
  };

  return (
    <View style={topScreenStyles.container}>
      <Text style={topScreenStyles.title}>今日なにする？</Text>
      <Pressable
        style={topScreenStyles.startButton}
        onPress={handleStart}
        testID="start-button"
      >
        <Text style={topScreenStyles.startButtonText}>はじめる</Text>
      </Pressable>
      <Pressable
        style={topScreenStyles.planButton}
        onPress={handlePlanSuggestion}
        testID="plan-suggestion-button"
      >
        <Text style={topScreenStyles.planButtonText}>プラン提案</Text>
      </Pressable>
    </View>
  );
}
