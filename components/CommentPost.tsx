import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

export interface CommentPostProps {
  id: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  hashtags: string[];
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

export function CommentPost({
  content,
  timestamp,
  upvotes,
  downvotes,
  hashtags,
  isUpvoted = false,
  isDownvoted = false,
  onUpvote,
  onDownvote,
}: CommentPostProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const netScore = upvotes - downvotes;

  return (
    <ThemedView style={[styles.container, { borderColor: colors.text + '20' }]}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <ThemedText style={styles.emoji}>💬</ThemedText>
          {/* Hashtags on same line as emoji */}
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
      
      <ThemedText style={styles.content}>{content}</ThemedText>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={onUpvote}>
          <IconSymbol 
            size={18} 
            name={isUpvoted ? "arrow.up.circle.fill" : "arrow.up.circle"} 
            color={isUpvoted ? '#4CAF50' : colors.text} 
          />
        </TouchableOpacity>
        
        <ThemedText style={[
          styles.scoreText, 
          { 
            color: netScore > 0 ? '#4CAF50' : netScore < 0 ? '#F44336' : colors.text 
          }
        ]}>
          {netScore > 0 ? `+${netScore}` : netScore}
        </ThemedText>
        
        <TouchableOpacity style={styles.actionButton} onPress={onDownvote}>
          <IconSymbol 
            size={18} 
            name={isDownvoted ? "arrow.down.circle.fill" : "arrow.down.circle"} 
            color={isDownvoted ? '#F44336' : colors.text} 
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  emoji: {
    fontSize: 12,
    marginRight: 6,
  },
  timestamp: {
    fontSize: 11,
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
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 4,
  },
  hashtagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
});
