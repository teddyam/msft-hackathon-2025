import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface ColoredIceCreamProps {
  color: string;
  size?: number;
}

export const ColoredIceCream: React.FC<ColoredIceCreamProps> = ({ 
  color, 
  size = 20 
}) => {
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.coloredCone, 
          { 
            backgroundColor: color,
            width: size * 0.8,
            height: size * 0.8,
          }
        ]} 
      />
      <ThemedText style={[styles.emoji, { fontSize: size }]}>🍦</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coloredCone: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.7,
    zIndex: 1,
  },
  emoji: {
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
