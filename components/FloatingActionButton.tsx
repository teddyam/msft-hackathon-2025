import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

export interface FloatingActionButtonProps {
  onPress?: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
          shadowColor: colors.text,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconSymbol size={24} name="plus" color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
