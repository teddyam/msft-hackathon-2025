import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface IceCreamTabIconProps {
  color: string;
  size?: number;
  focused?: boolean;
  type: 'hot' | 'new' | 'my-posts';
}

export const IceCreamTabIcon: React.FC<IceCreamTabIconProps> = ({ 
  color, 
  size = 28, 
  focused = false,
  type 
}) => {
  const getIconStyle = () => {
    const baseStyle = {
      fontSize: size,
      color: color,
    };

    if (focused) {
      return {
        ...baseStyle,
        transform: [{ scale: 1.1 }],
        textShadowColor: color,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
      };
    }

    return baseStyle;
  };

  const getIcon = () => {
    switch (type) {
      case 'hot':
        return '🔥'; // Fire for hot posts
      case 'new':
        return '✨'; // Sparkles for new posts  
      case 'my-posts':
        return '👤'; // Person for my posts
      default:
        return '🍦';
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.icon, getIconStyle()]}>
        {getIcon()}
      </ThemedText>
      {focused && (
        <View style={[styles.glowDot, { backgroundColor: color }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    textAlign: 'center',
  },
  glowDot: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.8,
  },
});
