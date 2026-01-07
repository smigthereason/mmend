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
import { StoriesViewerProps } from "../shared/types";
import StoriesProgressBar from "./StoriesProgressBar";
import StoriesHeader from "./StoriesHeader";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  const currentUser = stories[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const totalStories = currentUser?.stories.length || 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (progressInterval.current) {
        clearTimeout(progressInterval.current);
      }
    };
  }, []);

  // Mark story as seen - FIXED: Only run when story changes
  useEffect(() => {
    if (currentUser && currentStory && onStorySeen) {
      onStorySeen(currentUser.userId, currentStoryIndex);
    }
  }, [currentUser?.userId, currentStoryIndex, onStorySeen]); // Fixed dependencies

  // Progress animation with proper cleanup
  const startProgressAnimation = useCallback(() => {
    if (!currentStory || paused || !isMounted.current) return;

    const duration = currentStory.duration * 1000;

    // Reset animation
    progressAnim.setValue(0);
    
    // Clear any existing timeout
    if (progressInterval.current) {
      clearTimeout(progressInterval.current);
    }
    
    // Start new animation
    progressInterval.current = setTimeout(() => {
      if (!isMounted.current) return;
      
      Animated.timing(progressAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && isMounted.current) {
          nextStory();
        }
      });
    }, 100);
  }, [currentStory, paused]);

  const clearProgress = useCallback(() => {
    if (progressInterval.current) {
      clearTimeout(progressInterval.current);
      progressInterval.current = null;
    }
    progressAnim.setValue(0);
  }, []);

  // Handle story changes - FIXED: Proper cleanup
  useEffect(() => {
    if (currentStory) {
      clearProgress();
      setImageLoaded(false);
      startProgressAnimation();
    }

    return () => {
      clearProgress();
    };
  }, [currentUserIndex, currentStoryIndex, startProgressAnimation, clearProgress]);

  const nextStory = useCallback(() => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
  }, [currentStoryIndex, totalStories, currentUserIndex, stories.length, onClose]);

  const prevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      const prevUserStories = stories[currentUserIndex - 1].stories.length;
      setCurrentStoryIndex(prevUserStories - 1);
    }
  }, [currentStoryIndex, currentUserIndex, stories]);

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;
        const SWIPE_THRESHOLD = 50;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > SWIPE_THRESHOLD) {
            prevStory();
          } else if (dx < -SWIPE_THRESHOLD) {
            nextStory();
          }
        } else if (dy > SWIPE_THRESHOLD) {
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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!currentStory || !currentUser) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.contentContainer}
        onTouchStart={handleLongPress}
        onTouchEnd={handlePressOut}
        onTouchCancel={handlePressOut}
        {...panResponder.panHandlers}
      >
        {/* Background */}
        <View style={styles.background} />
        
        {/* Story Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentStory.url }}
            style={[
              styles.storyImage,
              !imageLoaded && styles.hiddenImage
            ]}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onError={() => {
              // If image fails to load, skip to next story
              setTimeout(nextStory, 500);
            }}
          />
        </View>

        {/* Text overlay */}
        {currentStory.text && imageLoaded && (
          <View style={styles.textOverlay}>
            <Text style={styles.storyText}>{currentStory.text}</Text>
          </View>
        )}

        {/* Progress bars */}
        <View style={styles.progressContainer}>
          {currentUser.stories.map((_, index) => (
            <StoriesProgressBar
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
        <StoriesHeader
          user={currentUser}
          currentTime={currentStory.postedAt}
          onClose={onClose}
        />

        {/* Navigation tap areas - simplified */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.tapArea, styles.leftTapArea]}
            onPress={prevStory}
            activeOpacity={0.7}
          />
          <TouchableOpacity
            style={[styles.tapArea, styles.rightTapArea]}
            onPress={nextStory}
            activeOpacity={0.7}
          />
        </View>
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
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000", // Prevent flashing with black background
  },
  hiddenImage: {
    opacity: 0,
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
    top: 40,
    left: 10,
    right: 10,
    flexDirection: "row",
    zIndex: 10,
  },
  navigationContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  tapArea: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width / 3,
  },
  leftTapArea: {
    left: 0,
  },
  rightTapArea: {
    right: 0,
  },
});

export default StoriesViewer;