import React from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ChatInputProps } from "../shared/types";

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSendPress,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.inputIcon}>
          <Ionicons name="add-circle" size={28} color="#3897f0" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.textInput}
          placeholder="Message..."
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
            color={value.trim() ? "#3897f0" : "#999"} 
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
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: 'white',
  },
  inputIcon: {
    padding: 8,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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