import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

export interface MessagePostProps {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  channel: string;
  isLiked?: boolean;
  onLike?: () => void;
  onReply?: () => void;
}

export function MessagePost({
  content,
  timestamp,
  likes,
  replies,
  channel,
  isLiked = false,
  onLike,
  onReply,
}: MessagePostProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={[styles.channelTag, { backgroundColor: colors.tint + '20', color: colors.tint }]}>
          #{channel}
        </ThemedText>
        <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
      </View>
      
      <ThemedText style={styles.content}>{content}</ThemedText>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <IconSymbol 
            size={20} 
            name={isLiked ? "heart.fill" : "heart"} 
            color={isLiked ? '#FF6B6B' : colors.text} 
          />
          <ThemedText style={styles.actionText}>{likes}</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onReply}>
          <IconSymbol size={20} name="bubble.left" color={colors.text} />
          <ThemedText style={styles.actionText}>{replies}</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol size={20} name="square.and.arrow.up" color={colors.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelTag: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
