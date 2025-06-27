import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { Keyboard, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function CommentModal({ visible, onClose, onSubmit }: CommentModalProps) {
  const [content, setContent] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
      onClose();
    }
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
      onRequestClose={handleClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.text + '20' }]}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <IconSymbol size={24} name="xmark" color={colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Add Comment</ThemedText>
          <TouchableOpacity 
            onPress={handleSubmit} 
            style={[
              styles.submitButton, 
              { 
                backgroundColor: content.trim() ? colors.tint : colors.text + '20',
                opacity: content.trim() ? 1 : 0.5 
              }
            ]}
            disabled={!content.trim()}
          >
            <ThemedText style={[
              styles.submitButtonText, 
              { color: content.trim() ? '#FFFFFF' : colors.text }
            ]}>
              Post
            </ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: colors.text + '20',
                  color: colors.text,
                  backgroundColor: colors.background,
                }
              ]}
              placeholder="Write your comment..."
              placeholderTextColor={colors.text + '60'}
              value={content}
              onChangeText={setContent}
              multiline
              maxLength={280}
              autoFocus
              selectionColor={colors.tint}
            />
            <ThemedText style={styles.characterCount}>
              {content.length}/280
            </ThemedText>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
    opacity: 0.6,
  },
});
