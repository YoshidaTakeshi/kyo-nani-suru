import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopScreen from './screens/TopScreen';
import PlanSuggestionScreen from './screens/PlanSuggestionScreen';

export type RootStackParamList = {
  Top: undefined;
  PlanSuggestion: undefined;
};

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        id={undefined}
        initialRouteName="Top"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Top" 
          component={TopScreen} 
          options={{
            title: '今日何する？',
            headerShown: false, // Hide header for top screen for cleaner look
          }}
        />
        <Stack.Screen 
          name="PlanSuggestion" 
          component={PlanSuggestionScreen} 
          options={{
            title: 'プラン提案',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;