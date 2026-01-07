// UserStoryItem.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserStoryItemProps } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";
import Svg, { Circle } from "react-native-svg";

const UserStoryItem: React.FC<UserStoryItemProps> = ({ 
  story, 
  isFirst = false, 
  onPress 
}) => {
  const { colors } = useTheme();
  const isYourStory = isFirst;
  const totalStories = story.stories.length;
  const seenStories = story.seenStories || 0;
  const hasMultipleStories = totalStories > 1;

  // Create dashed border for multiple stories
  const renderDashedBorder = () => {
    if (!hasMultipleStories) return null;

    const radius = 35;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius;
    const gapLength = circumference / (totalStories * 2);
    const dashLength = (circumference / totalStories) - gapLength;

    return (
      <Svg
        height={radius * 2 + strokeWidth}
        width={radius * 2 + strokeWidth}
        style={styles.dashedBorder}
      >
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke={story.hasUnseen ? colors.primary : colors.textSecondary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashLength} ${gapLength}`}
          strokeDashoffset={-gapLength / 2}
          fill="none"
        />
        
        {/* Progress for seen stories */}
        {seenStories > 0 && (
          <Circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength * seenStories} ${circumference}`}
            strokeDashoffset={-gapLength / 2}
            fill="none"
          />
        )}
      </Svg>
    );
  };

  return (
    <TouchableOpacity 
      style={styles.storyItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.storyImageContainer}>
        {hasMultipleStories && renderDashedBorder()}
        
        <View style={[
          styles.storyBorder, 
          { 
            borderColor: isYourStory 
              ? colors.border 
              : story.hasUnseen 
                ? colors.primary 
                : colors.textSecondary,
            borderWidth: isYourStory ? 2 : hasMultipleStories ? 0 : 3,
          }
        ]}>
          <Image 
            source={{ uri: story.image }} 
            style={[
              styles.storyImage,
              { opacity: story.hasUnseen ? 1 : 0.8 }
            ]} 
          />
          
          {isYourStory && (
            <View style={[styles.addButton, { backgroundColor: colors.primary }]}>
              <Text style={[styles.addText, { color: '#fff' }]}>+</Text>
            </View>
          )}
        </View>

        {/* Story count badge */}
        {hasMultipleStories && !isYourStory && (
          <View style={[styles.storyCountBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.storyCountText, { color: '#fff' }]}>
              {totalStories}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.storyName, { color: colors.text }]} numberOfLines={1}>
        {isYourStory ? "Your Story" : story.name}
      </Text>
      
      {/* Unseen dot indicator */}
      {story.hasUnseen && !isYourStory && !hasMultipleStories && (
        <View style={[styles.unseenDot, { backgroundColor: colors.primary }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    alignItems: "center",
    marginHorizontal: 4,
    width: 100,
  },
  storyImageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  dashedBorder: {
    position: "absolute",
    zIndex: 1,
  },
  storyBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  addText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    width: '100%',
  },
  unseenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: 0,
    right: 20,
    zIndex: 3,
  },
  storyCountBadge: {
    position: "absolute",
    bottom: -5,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyCountText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default UserStoryItem;