import React from 'react';
import { View, Text } from 'react-native';
import { nextScreenStyles } from './index.styles';

export default function NextScreen() {
  return (
    <View style={nextScreenStyles.container}>
      <Text style={nextScreenStyles.text}>次の画面（プレースホルダー）</Text>
    </View>
  );
}