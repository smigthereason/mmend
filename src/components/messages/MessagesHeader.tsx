// MessagesHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "../../context/ThemeContext";

interface MessagesHeaderProps {
  onCameraPress?: () => void;
  onComposePress?: () => void;
}

const MessagesHeader: React.FC<MessagesHeaderProps> = ({
  onCameraPress,
  onComposePress,
}) => {
  const { colors } = useTheme();

  const handleCameraPress = async () => {
    if (onCameraPress) {
      onCameraPress();
    } else {
      // Default camera behavior
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "Camera permission is required to take photos.");
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        console.log("Camera photo taken:", result.assets[0].uri);
        // Here you would typically upload the image or save it
      }
    }
  };

  return (
    <View style={[styles.header, { 
      backgroundColor: colors.surface,
      borderBottomColor: colors.border 
    }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon} onPress={handleCameraPress}>
          <Ionicons name="camera-outline" size={28} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={onComposePress}>
          <Ionicons name="pencil" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 20,
  },
});

export default MessagesHeader;