// ChatInput.tsx
import React from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ChatInputProps } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSendPress,
}) => {
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={[styles.keyboardAvoidingView, { backgroundColor: colors.surface }]}
    >
      <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.inputIcon}>
          <Ionicons name="add-circle" size={28} color={colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={[styles.textInput, { 
            backgroundColor: colors.background === '#121212' ? '#333333' : '#f0f0f0',
            color: colors.text 
          }]}
          placeholder="Message..."
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          multiline
          maxLength={500}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically={true}
        />
        
        <TouchableOpacity 
          style={styles.inputIcon} 
          onPress={onSendPress}
          disabled={!value.trim()}
        >
          <Ionicons 
            name={value.trim() ? "send" : "mic"} 
            size={24} 
            color={value.trim() ? colors.primary : colors.textMuted} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderTopWidth: 1,
  },
  inputIcon: {
    padding: 8,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    maxHeight: 120,
    minHeight: 40,
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ChatInput;