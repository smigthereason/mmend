// components/stories/StoryList.tsx
import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import StoryItem from "./UserStoryItem";
import { UserStory } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface StoryListProps {
  stories: UserStory[];
  onStoryPress: (index: number) => void;
}

const { width } = Dimensions.get("window");

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryPress }) => {
  const { colors } = useTheme();

  const renderStoryItem = ({ item, index }: { item: UserStory; index: number }) => (
    <StoryItem
      story={item}
      isFirst={index === 0}
      onPress={() => onStoryPress(index)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={stories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
});

export default StoryList;