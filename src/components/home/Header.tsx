// Header.tsx
import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

interface HeaderProps {
  onAddPress?: () => void;
  points?: number;
}

const Header: React.FC<HeaderProps> = ({ onAddPress, points = 1578 }) => {
  const { colors } = useTheme();

  // Function to format points
  const formatPoints = (points: number): string => {
    if (points >= 1000000) {
      return (points / 1000000).toFixed(1) + 'M';
    } else if (points >= 10000) {
      return Math.round(points / 1000) + 'k';
    } else if (points >= 1000) {
      return (points / 1000).toFixed(1) + 'k';
    }
    return points.toLocaleString();
  };

  return (
    <View style={[styles.header, { 
      backgroundColor: colors.surface,
      borderBottomColor: colors.border 
    }]}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.headerIcons}>
        {/* Add Post Button - Always comes first */}
        <TouchableOpacity 
          style={[styles.addButton, { 
            borderColor: colors.primary,
            backgroundColor: colors.surface 
          }]} 
          onPress={onAddPress}
        >
          <Ionicons 
            name="add" 
            size={28} 
            color={colors.primary} 
          />
        </TouchableOpacity>
        
        {/* Points Display */}
        <View style={[styles.pointsContainer, { 
          backgroundColor: colors.background === '#f8f9fa' ? '#fff5f7' : colors.surface,
          borderColor: colors.primary 
        }]}>
          <View style={styles.pointsContent}>
            <Ionicons name="star" size={16} color="#FFD700" style={styles.starIcon} />
            <Text style={[styles.pointsText, { color: colors.primary }]}>
              {formatPoints(points)}
            </Text>
            <Text style={[styles.pointsLabel, { color: colors.primary, opacity: 0.8 }]}>
              pts
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  logoImage: {
    height: 40,
    width: 150,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  pointsContainer: {
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 80,
  },
  pointsContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    marginRight: 6,
  },
  pointsText: {
    fontSize: 15,
    fontWeight: "700",
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 2,
  },
});

export default Header;