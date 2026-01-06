// StoryList.tsx
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import StoryItem from "./StoryItem";
import { Story } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.storiesContainer, { 
        borderBottomColor: colors.border,
        backgroundColor: colors.surface 
      }]}
    >
      {stories.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default StoryList;