// StoryItem.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StoryItemProps } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.storyItem}>
      <View style={[styles.storyBorder, { borderColor: colors.primary }]}>
        <Image source={{ uri: story.image }} style={styles.storyImage} />
      </View>
      <Text style={[styles.storyName, { color: colors.text }]}>{story.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  storyBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default StoryItem;