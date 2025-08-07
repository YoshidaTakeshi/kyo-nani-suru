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

// Mock React Native components for testing
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Pressable = ({ children, onPress, style, ...props }) => {
    const React = require('react');
    return React.createElement('div', { 
      onClick: onPress, 
      style: Array.isArray(style) ? Object.assign({}, ...style) : style,
      'data-testid': 'pressable',
      ...props 
    }, children);
  };
  RN.Text = ({ children, style, ...props }) => {
    const React = require('react');
    return React.createElement('span', { 
      style: Array.isArray(style) ? Object.assign({}, ...style) : style,
      ...props 
    }, children);
  };
  RN.View = ({ children, style, ...props }) => {
    const React = require('react');
    return React.createElement('div', { 
      style: Array.isArray(style) ? Object.assign({}, ...style) : style,
      ...props 
    }, children);
  };
  return RN;
});

const React = require('react');
const { render, fireEvent } = require('@testing-library/react-native');
const TopScreen = require('../screens/TopScreen').default;

describe('TopScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders title correctly', () => {
    const { getByText } = render(React.createElement(TopScreen, { navigation: mockNavigation }));
    expect(getByText('今日なにする？')).toBeTruthy();
  });

  test('renders start button correctly', () => {
    const { getByText } = render(React.createElement(TopScreen, { navigation: mockNavigation }));
    expect(getByText('はじめる')).toBeTruthy();
  });

  test('navigates to Next screen when start button is pressed', () => {
    const { getByTestId } = render(React.createElement(TopScreen, { navigation: mockNavigation }));
    const startButton = getByTestId('pressable');
    fireEvent.press(startButton);
    expect(mockNavigate).toHaveBeenCalledWith('Next');
  });

  test('logs message when start button is pressed', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { getByTestId } = render(React.createElement(TopScreen, { navigation: mockNavigation }));
    const startButton = getByTestId('pressable');
    fireEvent.press(startButton);
    expect(consoleSpy).toHaveBeenCalledWith('はじめるボタンが押されました');
    consoleSpy.mockRestore();
  });
});