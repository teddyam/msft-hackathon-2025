/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Microsoft-themed color palette inspired by their design system.
 */

const tintColorLight = '#0078D4'; // Microsoft Blue
const tintColorDark = '#66B2FF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#E1E1E1',
    card: '#F8F9FA',
    notification: '#FF3B30',
    primary: '#0078D4',
    secondary: '#106EBE',
    accent: '#FFB900',
    success: '#107C10',
    warning: '#FF8C00',
    error: '#D13438',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#2C2C2E',
    card: '#1C1C1E',
    notification: '#FF453A',
    primary: '#66B2FF',
    secondary: '#3D8CFF',
    accent: '#FFD60A',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF3B30',
  },
};
