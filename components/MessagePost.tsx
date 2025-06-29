import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

export interface MessagePostProps {
  id: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: number;
  hashtags: string[];
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  onUpvote?: () => void;
  onDownvote?: () => void;
  onReply?: () => void;
  onPress?: () => void;
}

export function MessagePost({
  content,
  timestamp,
  upvotes,
  downvotes,
  replies,
  hashtags,
  isUpvoted = false,
  isDownvoted = false,
  onUpvote,
  onDownvote,
  onReply,
  onPress,
}: MessagePostProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { borderColor: colors.text + '20' }]}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <ThemedText style={styles.emoji}>🍦</ThemedText>
          {/* Hashtags on same line as cone */}
          {hashtags.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.hashtagContainer}
              contentContainerStyle={styles.hashtagContent}
              decelerationRate="fast"
              scrollEventThrottle={16}
            >
              {hashtags.map((hashtag, index) => (
                <View key={index} style={[
                  styles.hashtagBubble, 
                  { 
                    backgroundColor: colors.accent + '20',
                    borderColor: colors.accent + '60'
                  }
                ]}>
                  <ThemedText style={[styles.hashtagText, { color: colors.accent }]}>
                    {hashtag}
                  </ThemedText>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
      </View>
      
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <ThemedText style={styles.content}>{content}</ThemedText>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={onUpvote}>
          <IconSymbol 
            size={20} 
            name={isUpvoted ? "arrow.up.circle.fill" : "arrow.up.circle"} 
            color={isUpvoted ? colors.primary : colors.text} 
          />
        </TouchableOpacity>
        
        <ThemedText style={[
          styles.scoreText, 
          { 
            color: upvotes - downvotes > 0 ? colors.primary : 
                   upvotes - downvotes < 0 ? '#F44336' : colors.text 
          }
        ]}>
          {upvotes - downvotes}
        </ThemedText>
        
        <TouchableOpacity style={styles.actionButton} onPress={onDownvote}>
          <IconSymbol 
            size={20} 
            name={isDownvoted ? "arrow.down.circle.fill" : "arrow.down.circle"} 
            color={isDownvoted ? '#F44336' : colors.text} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onReply}>
          <IconSymbol size={20} name="bubble.left" color={colors.text} />
          <ThemedText style={styles.actionText}>{replies}</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
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
    marginBottom: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  emoji: {
    fontSize: 14,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  hashtagContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  hashtagContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  hashtagBubble: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 6,
  },
  hashtagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
