import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

interface MessagesHeaderProps {
  onCameraPress?: () => void;
  onComposePress?: () => void;
}

const MessagesHeader: React.FC<MessagesHeaderProps> = ({
  onCameraPress,
  onComposePress,
}) => {
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
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Messages</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon} onPress={handleCameraPress}>
          <Ionicons name="camera-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={onComposePress}>
          <Ionicons name="pencil" size={24} color="black" />
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
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 45,
    backgroundColor: "white",
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