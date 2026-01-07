// StoriesProgressBar.tsx
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { StoryProgressBarProps } from "../shared/types";

const StoriesProgressBar: React.FC<StoryProgressBarProps> = ({
  index,
  currentIndex,
  totalStories,
  storyDurations,
  paused,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const isActive = index === currentIndex;
  const isCompleted = index < currentIndex;

  useEffect(() => {
    if (isActive && !paused) {
      const duration = storyDurations[index] * 1000;
      
      Animated.timing(progressAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start();
    } else if (paused) {
      progressAnim.stopAnimation();
    }
  }, [isActive, paused, index]);

  useEffect(() => {
    if (isCompleted) {
      progressAnim.setValue(1);
    } else if (index > currentIndex) {
      progressAnim.setValue(0);
    }
  }, [currentIndex, index]);

  return (
    <View style={[styles.container, { marginRight: index < totalStories - 1 ? 4 : 0 }]}>
      <View style={styles.backgroundBar} />
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
    overflow: "hidden",
  },
  backgroundBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 1.5,
  },
});

export default StoriesProgressBar;