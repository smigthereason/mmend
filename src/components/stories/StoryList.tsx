// components/stories/StoryList.tsx
import React, { memo } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import StoryItem from "./UserStoryItem";
import { UserStory } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface StoryListProps {
  stories: UserStory[];
  onStoryPress: (index: number) => void;
  onCreateStory?: () => void;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 80;

// Memoize the StoryItem renderer for better performance
const StoryItemRenderer = memo(({ 
  item, 
  index, 
  stories, 
  onStoryPress 
}: { 
  item: UserStory; 
  index: number;
  stories: UserStory[];
  onStoryPress: (index: number) => void;
}) => {
  // Calculate the actual index in the original array
  const originalIndex = stories.findIndex(story => story.id === item.id);
  
  return (
    <StoryItem
      story={item}
      isYourStory={item.id === "0"}
      onPress={() => onStoryPress(originalIndex)}
    />
  );
});

// Memoize the Your Story component
const YourStoryRenderer = memo(({ 
  story, 
  onCreateStory 
}: { 
  story: UserStory; 
  onCreateStory?: () => void;
}) => {
  return (
    <StoryItem
      key="your-story"
      story={story}
      isYourStory={true}
      onPress={onCreateStory || (() => {})}
    />
  );
});

const StoryList: React.FC<StoryListProps> = ({ 
  stories, 
  onStoryPress,
  onCreateStory 
}) => {
  const { colors } = useTheme();

  // Filter out "Your Story" for the list
  const userStories = stories.filter(story => story.id !== "0");
  const yourStory = stories.find(story => story.id === "0");

  // Calculate initial number of items to render based on screen width
  const initialNumToRender = Math.floor((width - 16) / ITEM_WIDTH);

  const renderItem = ({ item, index }: { item: UserStory; index: number }) => (
    <StoryItemRenderer
      item={item}
      index={index}
      stories={stories}
      onStoryPress={onStoryPress}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={userStories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          yourStory ? (
            <YourStoryRenderer
              story={yourStory}
              onCreateStory={onCreateStory}
            />
          ) : null
        }
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
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

// Memoize the entire StoryList component
export default memo(StoryList);