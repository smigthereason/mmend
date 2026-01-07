// components/stories/StoriesViewer.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StoriesViewerProps, UserStory } from "../shared/types";
import StoryProgressBar from "./StoriesProgressBar";
import StoryHeader from "./StoriesHeader";

const { width, height } = Dimensions.get("window");

const StoriesViewer: React.FC<StoriesViewerProps> = ({
  stories,
  initialIndex = 0,
  onClose,
  onStorySeen,
}) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressInterval = useRef<NodeJS.Timeout>();

  const currentUser = stories[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const totalStories = currentUser?.stories.length || 0;

  // Mark story as seen
  useEffect(() => {
    if (currentUser && currentStory && onStorySeen) {
      onStorySeen(currentUser.userId, currentStoryIndex);
    }
  }, [currentUserIndex, currentStoryIndex]);

  // Progress animation
  const startProgressAnimation = useCallback(() => {
    if (!currentStory || paused) return;

    const duration = currentStory.duration * 1000; // Convert to milliseconds

    progressAnim.setValue(0);
    
    progressInterval.current = setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          nextStory();
        }
      });
    }, 100);
  }, [currentStory, paused]);

  const clearProgress = () => {
    if (progressInterval.current) {
      clearTimeout(progressInterval.current);
    }
    progressAnim.setValue(0);
  };

  useEffect(() => {
    if (currentStory) {
      clearProgress();
      startProgressAnimation();
    }

    return () => {
      clearProgress();
    };
  }, [currentUserIndex, currentStoryIndex, currentStory, paused]);

  const nextStory = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      const prevUserStories = stories[currentUserIndex - 1].stories.length;
      setCurrentStoryIndex(prevUserStories - 1);
    }
  };

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;
        const SWIPE_THRESHOLD = 50;

        // Horizontal swipe for next/prev
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > SWIPE_THRESHOLD) {
            prevStory();
          } else if (dx < -SWIPE_THRESHOLD) {
            nextStory();
          }
        }
        // Vertical swipe for close
        else if (dy > SWIPE_THRESHOLD) {
          onClose();
        }
      },
    })
  ).current;

  const handleLongPress = () => {
    setPaused(true);
  };

  const handlePressOut = () => {
    setPaused(false);
  };

  const handleTap = (event: any) => {
    const { locationX } = event.nativeEvent;
    const screenMiddle = width / 2;

    if (locationX < screenMiddle) {
      prevStory();
    } else {
      nextStory();
    }
  };

  if (!currentStory || !currentUser) {
    return null;
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View
        style={styles.contentContainer}
        onTouchStart={handleLongPress}
        onTouchEnd={handlePressOut}
        onTouchCancel={handlePressOut}
      >
        <Image
          source={{ uri: currentStory.url }}
          style={styles.storyImage}
          resizeMode="cover"
        />

        {currentStory.text && (
          <View style={styles.textOverlay}>
            <Text style={styles.storyText}>{currentStory.text}</Text>
          </View>
        )}

        {/* Progress bars */}
        <View style={styles.progressContainer}>
          {currentUser.stories.map((_, index) => (
            <StoryProgressBar
              key={index}
              currentIndex={currentStoryIndex}
              totalStories={totalStories}
              storyDurations={currentUser.stories.map(s => s.duration)}
              paused={paused}
              index={index}
            />
          ))}
        </View>

        {/* Header */}
        <StoryHeader
          user={currentUser}
          currentTime={currentStory.postedAt}
          onClose={onClose}
        />

        {/* Tap areas for navigation */}
        <TouchableOpacity
          style={[styles.tapArea, styles.leftTapArea]}
          onPress={() => prevStory()}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={[styles.tapArea, styles.rightTapArea]}
          onPress={() => nextStory()}
          activeOpacity={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentContainer: {
    flex: 1,
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  textOverlay: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  storyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  progressContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    zIndex: 10,
  },
  tapArea: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width / 3,
    zIndex: 5,
  },
  leftTapArea: {
    left: 0,
  },
  rightTapArea: {
    right: 0,
  },
});

export default StoriesViewer;