import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TopScreen from '../screens/TopScreen';

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  dispatch: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  setOptions: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  getId: jest.fn(),
};

describe('TopScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders title correctly', () => {
    const { getByText } = render(<TopScreen navigation={mockNavigation} />);
    expect(getByText('今日なにする？')).toBeTruthy();
  });

  test('renders plan suggestion button correctly', () => {
    const { getByText } = render(<TopScreen navigation={mockNavigation} />);
    expect(getByText('プラン提案')).toBeTruthy();
  });

  test('renders subtitle correctly', () => {
    const { getByText } = render(<TopScreen navigation={mockNavigation} />);
    expect(getByText('今日のプランを提案します')).toBeTruthy();
  });

  test('navigates to PlanSuggestion screen when plan suggestion button is pressed', () => {
    const { getByTestId } = render(<TopScreen navigation={mockNavigation} />);
    const planButton = getByTestId('plan-suggestion-button');
    fireEvent.press(planButton);
    expect(mockNavigate).toHaveBeenCalledWith('PlanSuggestion');
  });

  test('logs message when plan suggestion button is pressed', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { getByTestId } = render(<TopScreen navigation={mockNavigation} />);
    const planButton = getByTestId('plan-suggestion-button');
    fireEvent.press(planButton);
    expect(consoleSpy).toHaveBeenCalledWith('プラン提案ボタンが押されました');
    consoleSpy.mockRestore();
  });
});
