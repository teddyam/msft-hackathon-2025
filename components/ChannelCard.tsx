import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

export interface ChannelCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
  onPress?: () => void;
}

export function ChannelCard({
  name,
  description,
  memberCount,
  icon,
  onPress,
}: ChannelCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.container}>
        <View style={styles.iconContainer}>
          <IconSymbol 
            size={32} 
            name={icon as any} 
            color={colors.tint} 
          />
        </View>
        
        <View style={styles.content}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {name}
          </ThemedText>
          <ThemedText style={styles.description} numberOfLines={2}>
            {description}
          </ThemedText>
          <ThemedText style={styles.memberCount}>
            {formatMemberCount(memberCount)} members
          </ThemedText>
        </View>
        
        <View style={styles.arrow}>
          <IconSymbol 
            size={20} 
            name="chevron.right" 
            color={colors.text} 
          />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 8,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
    lineHeight: 20,
  },
  memberCount: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
  },
  arrow: {
    marginLeft: 8,
    opacity: 0.5,
  },
});
