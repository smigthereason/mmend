import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { specialistsData } from "../data/specialists";
import Header from "../components/home/Header";

const ConsultScreen: React.FC = () => {
  const [points, setPoints] = useState(1578);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleAddPress = () => {
    console.log("Add points pressed");
    setPoints(prev => prev + 100);
  };

  const filters = ["All", "Gold", "Silver", "Bronze", "Available"];

  const filteredSpecialists = specialistsData.filter(specialist => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Available") return specialist.available;
    return specialist.tier === selectedFilter;
  });

  const renderSpecialist = ({ item }) => (
    <TouchableOpacity style={styles.specialistCard}>
      <View style={styles.specialistHeader}>
        <Image source={{ uri: item.image }} style={styles.specialistImage} />
        <View style={styles.specialistInfo}>
          <Text style={styles.specialistName}>{item.name}</Text>
          <Text style={styles.specialistTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount} reviews)
            </Text>
          </View>
        </View>
        <View style={[styles.tierBadge, styles[`${item.tier.toLowerCase()}Tier`]]}>
          <Text style={styles.tierText}>{item.tier}</Text>
        </View>
      </View>

      <Text style={styles.specialtyText}>Specialty: {item.specialty}</Text>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.experience}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="language-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.languages.join(", ")}</Text>
        </View>
      </View>

      <View style={styles.availabilityRow}>
        <View style={styles.availabilityInfo}>
          <Ionicons 
            name={item.available ? "checkmark-circle" : "time-outline"} 
            size={16} 
            color={item.available ? "#4CAF50" : "#FF9800"} 
          />
          <Text style={[
            styles.availabilityText,
            { color: item.available ? "#4CAF50" : "#FF9800" }
          ]}>
            {item.available ? "Available" : "Booked"} • {item.nextAvailable}
          </Text>
        </View>
        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>${item.consultationFee}</Text>
          <Text style={styles.sessionText}>/session</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Consultation</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Custom Header - Title aligned to left */}
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Consult Specialists</Text>
        <TouchableOpacity 
          style={styles.headerPoints} 
          onPress={handleAddPress}
        >
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.pointsText}>{points}</Text>
          <Text style={styles.pointsLabel}> pts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>Connect with certified professionals</Text>
          
          {/* Filter Tabs - Full width with proper spacing */}
          <View style={styles.filterSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScrollContent}
            >
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter && styles.filterButtonActive
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive
                  ]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Results Count */}
          <Text style={styles.resultsText}>
            {filteredSpecialists.length} specialist{filteredSpecialists.length !== 1 ? 's' : ''} found
          </Text>

          {/* Specialists List */}
          <FlatList
            data={filteredSpecialists}
            renderItem={renderSpecialist}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color="#ccc" />
                <Text style={styles.emptyText}>No specialists found</Text>
                <Text style={styles.emptySubtext}>Try a different filter</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerPoints: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff5f7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ff85a2",
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ff85a2",
    marginLeft: 4,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff85a2",
    opacity: 0.8,
    marginLeft: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterScrollContent: {
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonActive: {
    backgroundColor: "#ff85a2",
    borderColor: "#ff85a2",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontStyle: "italic",
  },
  listContent: {
    paddingBottom: 40,
  },
  specialistCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  specialistHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  specialistImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  specialistTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  goldTier: {
    backgroundColor: "#FFF3CD",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  silverTier: {
    backgroundColor: "#E9ECEF",
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  bronzeTier: {
    backgroundColor: "#F8E5D6",
    borderWidth: 1,
    borderColor: "#CD7F32",
  },
  tierText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  specialtyText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "600",
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  availabilityInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  feeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  feeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff85a2",
  },
  sessionText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 3,
  },
  bookButton: {
    backgroundColor: "#ff85a2",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#ff85a2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
});

export default ConsultScreen;