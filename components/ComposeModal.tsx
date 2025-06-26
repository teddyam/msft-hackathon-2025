import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { mockChannels } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

export interface ComposeModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (content: string, channel: string) => void;
}

export function ComposeModal({ visible, onClose, onSubmit }: ComposeModalProps) {
  const [content, setContent] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('microsoft-general');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSubmit = () => {
    if (content.trim().length === 0) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }
    
    onSubmit(content.trim(), selectedChannel);
    setContent('');
    onClose();
  };

  const handleClose = () => {
    setContent('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <ThemedView style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>
            <ThemedText type="title" style={styles.title}>New Post</ThemedText>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.headerButton, styles.postButton, { backgroundColor: colors.primary }]}
            >
              <ThemedText style={styles.postText}>Post</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Channel Selector */}
          <ThemedView style={styles.channelSection}>
            <ThemedText style={styles.sectionTitle}>Channel</ThemedText>
            <View style={styles.channelSelector}>
              <IconSymbol size={20} name="number" color={colors.primary} />
              <ThemedText style={styles.channelText}>
                {mockChannels.find(ch => ch.id === selectedChannel)?.name || 'Microsoft General'}
              </ThemedText>
            </View>
          </ThemedView>

          {/* Content Input */}
          <ThemedView style={styles.contentSection}>
            <ThemedText style={styles.sectionTitle}>Your anonymous message</ThemedText>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              value={content}
              onChangeText={setContent}
              placeholder="Share your thoughts anonymously..."
              placeholderTextColor={colors.icon}
              multiline
              maxLength={500}
              autoFocus
            />
            <ThemedText style={styles.characterCount}>
              {content.length}/500
            </ThemedText>
          </ThemedView>

          {/* Anonymous Notice */}
          <ThemedView style={styles.noticeSection}>
            <IconSymbol size={16} name="eye.slash" color={colors.icon} />
            <ThemedText style={styles.noticeText}>
              Your post will be completely anonymous. No one can trace it back to you.
            </ThemedText>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postButton: {
    minWidth: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  postText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  channelSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  channelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    gap: 8,
  },
  channelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  contentSection: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
    opacity: 0.6,
  },
  noticeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
});
