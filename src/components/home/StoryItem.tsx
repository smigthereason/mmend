import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StoryItemProps } from "../shared/types";

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <TouchableOpacity style={styles.storyItem}>
      <View style={styles.storyBorder}>
        <Image source={{ uri: story.image }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyName}>{story.name}</Text>
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
    borderColor: "#ff85a2",
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