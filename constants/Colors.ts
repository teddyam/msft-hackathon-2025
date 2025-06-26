/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Ice cream themed color palette with soft, creamy tones.
 */

const tintColorLight = '#FF6B9D'; // Strawberry Pink
const tintColorDark = '#FFB6C1';  // Light Pink

export const Colors = {
  light: {
    text: '#2D1B2E',           // Dark Purple (like rich chocolate)
    background: '#FFF8F3',     // Cream/Vanilla background
    tint: tintColorLight,
    icon: '#8B7B8B',          // Muted purple-gray
    tabIconDefault: '#A68DA0', // Soft purple-gray
    tabIconSelected: tintColorLight,
    border: '#F0E6E6',        // Very light pink border
    card: '#FEFBF8',          // Slightly warmer white
    notification: '#FF3B30',
    primary: '#FF6B9D',       // Strawberry pink
    secondary: '#DDA0DD',     // Plum
    accent: '#87CEEB',        // Sky blue (like blue bubblegum)
    success: '#98FB98',       // Pale green (mint)
    warning: '#FFEAA7',       // Pale yellow (vanilla)
    error: '#FF7675',         // Soft red
  },
  dark: {
    text: '#F8E8F0',          // Light cream
    background: '#2C1810',    // Dark chocolate brown
    tint: tintColorDark,
    icon: '#C7A8C0',          // Light purple-gray
    tabIconDefault: '#9B8A9B', // Muted purple
    tabIconSelected: tintColorDark,
    border: '#4A3A3A',        // Dark brown border
    card: '#3D2817',          // Darker brown card
    notification: '#FF453A',
    primary: '#FFB6C1',       // Light pink
    secondary: '#DDA0DD',     // Plum
    accent: '#87CEEB',        // Sky blue
    success: '#90EE90',       // Light green
    warning: '#F1C40F',       // Soft yellow
    error: '#E74C3C',         // Soft red
  },
};
