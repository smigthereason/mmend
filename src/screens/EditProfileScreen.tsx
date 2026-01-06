import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../context/ThemeContext";

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [profileImage, setProfileImage] = useState<string>(
    "https://images.unsplash.com/photo-1494790108755-2616b612b786"
  );
  const [name, setName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah.johnson@email.com");
  const [bio, setBio] = useState(
    "Mom of 2 | Early childhood educator | Love sharing parenting tips"
  );
  const [location, setLocation] = useState("San Francisco, CA");
  const [babyName, setBabyName] = useState("Emma");
  const [babyAge, setBabyAge] = useState("2 years");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    Alert.alert("Success", "Profile updated successfully!");
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 55,
      paddingBottom: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    saveButton: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: "600",
    },
    imageSection: {
      alignItems: "center",
      paddingVertical: 30,
      backgroundColor: colors.surface,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: colors.surface,
    },
    editImageButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.surface,
    },
    formSection: {
      padding: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textSecondary,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    babyInfoSection: {
      marginTop: 20,
      padding: 20,
      backgroundColor: colors.primary + "20",
      borderRadius: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
    },
    interestsSection: {
      marginTop: 30,
    },
    interestsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    interestChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    interestText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "500",
      marginRight: 6,
    },
    addInterestChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    addInterestText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 6,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={saveProfile}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.babyInfoSection}>
            <Text style={styles.sectionTitle}>Baby Information</Text>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Baby's Name</Text>
                <TextInput
                  style={styles.input}
                  value={babyName}
                  onChangeText={setBabyName}
                  placeholder="Baby's name"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  value={babyAge}
                  onChangeText={setBabyAge}
                  placeholder="Baby's age"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          </View>

          <View style={styles.interestsSection}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestsContainer}>
              {[
                "Baby Care",
                "Nutrition",
                "Sleep Training",
                "Development",
                "Health",
              ].map((interest, index) => (
                <TouchableOpacity key={index} style={styles.interestChip}>
                  <Text style={styles.interestText}>{interest}</Text>
                  <Ionicons name="close" size={16} color={colors.primary} />
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.addInterestChip}>
                <Ionicons name="add" size={20} color={colors.primary} />
                <Text style={styles.addInterestText}>Add Interest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;