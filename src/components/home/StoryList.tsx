import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import StoryItem from "./StoryItem";
import { Story } from "../shared/types";

interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}
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
    borderBottomColor: "#eeeeee10",
  },
});

export default StoryList;