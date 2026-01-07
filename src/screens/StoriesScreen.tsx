// StoriesScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import StoriesViewer from "../components/stories/StoriesViewer";
import UserStoryItem from "../components/stories/UserStoryItem";
import { UserStory } from "../components/shared/types";
import { storiesData } from "../data/stories";

const { width, height } = Dimensions.get("window");

interface StoriesScreenProps {
  route?: any;
  navigation?: any;
}

const StoriesScreen: React.FC<StoriesScreenProps> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [stories, setStories] = useState<UserStory[]>([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [seenStories, setSeenStories] = useState<Record<string, number>>({});

  // Load stories data
  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    setStories(storiesData);
  };

  const handleStoryPress = (index: number) => {
    setCurrentStoryIndex(index);
    setViewerVisible(true);
  };

  const handleCloseViewer = () => {
    setViewerVisible(false);
    navigation?.goBack();
  };

  const handleStorySeen = (userId: string, storyIndex: number) => {
    // Update seen stories count
    setSeenStories(prev => ({
      ...prev,
      [userId]: storyIndex + 1,
    }));

    // Update stories data
    setStories(prevStories =>
      prevStories.map(story => {
        if (story.userId === userId) {
          const updatedStories = story.stories.map((s, idx) => ({
            ...s,
            seen: idx <= storyIndex,
          }));

          const hasUnseen = updatedStories.some(s => !s.seen);
          const seenStories = updatedStories.filter(s => s.seen).length;

          return {
            ...story,
            stories: updatedStories,
            hasUnseen,
            seenStories,
          };
        }
        return story;
      })
    );
  };

  const renderStoryItem = ({ item, index }: { item: UserStory; index: number }) => (
    <View style={styles.storyGridItem}>
      <UserStoryItem
        story={item}
        isFirst={index === 0}
        onPress={() => handleStoryPress(index)}
      />
    </View>
  );

  // Get initial index from route params
  useEffect(() => {
    if (route?.params?.initialIndex) {
      setCurrentStoryIndex(route.params.initialIndex);
      setViewerVisible(true);
    }
  }, [route?.params?.initialIndex]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={viewerVisible ? "#000" : colors.background}
        translucent
      />

      {viewerVisible ? (
        <StoriesViewer
          stories={stories}
          initialIndex={currentStoryIndex}
          onClose={handleCloseViewer}
          onStorySeen={handleStorySeen}
        />
      ) : (
        <View style={styles.storiesContainer}>
          <FlatList
            data={stories}
            renderItem={renderStoryItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.storiesGrid}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storiesContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 44,
  },
  storiesGrid: {
    padding: 8,
  },
  storyGridItem: {
    flex: 1,
    margin: 4,
    maxWidth: (width - 32) / 3,
  },
});

export default StoriesScreen;