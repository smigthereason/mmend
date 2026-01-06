import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AboutScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out Mothermend - the amazing parenting community app!",
        url: "https://Mothermend.app",
        title: "Mothermend App",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const aboutItems = [
    {
      id: "1",
      title: "Version",
      value: "1.0.0",
      icon: "information-circle-outline",
    },
    {
      id: "2",
      title: "Build Number",
      value: "2026.01.001",
      icon: "build-outline",
    },
    {
      id: "3",
      title: "Last Updated",
      value: "January 6, 2026",
      icon: "calendar-outline",
    },
    {
      id: "4",
      title: "Terms of Service",
      icon: "document-text-outline",
      action: () => Linking.openURL("https://mothermend.app/terms"),
    },
    {
      id: "5",
      title: "Privacy Policy",
      icon: "shield-checkmark-outline",
      action: () => Linking.openURL("https://mothermend.app/privacy"),
    },
    {
      id: "6",
      title: "Share App",
      icon: "share-social-outline",
      action: handleShare,
    },
    {
      id: "7",
      title: "Rate App",
      icon: "star-outline",
      action: () => console.log("Rate app"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* App Logo and Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.logoImage}>
        <Image
                source={require("../../assets/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
          </View>
          
          <Text style={styles.appTagline}>Your Parenting Community</Text>
          <Text style={styles.appDescription}>
            Connecting parents worldwide to share experiences, advice, and
            support. Together we make parenting easier and more joyful.
          </Text>
        </View>

        {/* App Details */}
        <View style={styles.detailsSection}>
          {aboutItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.detailItem}
              onPress={item.action}
              disabled={!item.action}
            >
              <View style={styles.detailLeft}>
                <Ionicons name={item.icon as any} size={24} color="#ff85a2" />
                <Text style={styles.detailTitle}>{item.title}</Text>
              </View>
              <View style={styles.detailRight}>
                {item.value && (
                  <Text style={styles.detailValue}>{item.value}</Text>
                )}
                {item.action && (
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          <Text style={styles.teamDescription}>
            Mothermend was created by a team of parents, developers, and child
            development experts passionate about supporting families.
          </Text>

          <View style={styles.teamMembers}>
            <View style={styles.teamMember}>
              <View style={styles.memberAvatar}>
                <Ionicons name="person" size={24} color="#ff85a2" />
              </View>
              <Text style={styles.memberName}>Victor Maina</Text>
              <Text style={styles.memberRole}>Founder & CEO</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={styles.memberAvatar}>
                <Ionicons name="person" size={24} color="#ff85a2" />
              </View>
              <Text style={styles.memberName}>Dr. James Wilson</Text>
              <Text style={styles.memberRole}>Child Psychologist</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={styles.memberAvatar}>
                <Ionicons name="person" size={24} color="#ff85a2" />
              </View>
              <Text style={styles.memberName}>Maria Garcia</Text>
              <Text style={styles.memberRole}>Product Designer</Text>
            </View>
          </View>
        </View>

        {/* Contact Links */}
        <View style={styles.linksSection}>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => Linking.openURL("https://mothermend.app")}
          >
            <Ionicons name="globe-outline" size={24} color="#ff85a2" />
            <Text style={styles.linkText}>Website</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => Linking.openURL("https://twitter.com/Mothermend")}
          >
            <Ionicons name="logo-twitter" size={24} color="#ff85a2" />
            <Text style={styles.linkText}>Twitter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => Linking.openURL("https://instagram.com/Mothermend")}
          >
            <Ionicons name="logo-instagram" size={24} color="#ff85a2" />
            <Text style={styles.linkText}>Instagram</Text>
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>© 2026 MotherMend Inc.</Text>
          <Text style={styles.copyrightText}>All rights reserved.</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee9d",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  headerRightPlaceholder: {
    width: 32,
  },
  appInfoSection: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#fff",
  },
  
   logoImage: {
    height: 120,
    width: 220,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  appDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  detailsSection: {
    backgroundColor: "#fff",
    marginTop: 12,
    paddingHorizontal: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 16,
    color: "#000",
    marginLeft: 16,
  },
  detailRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  teamSection: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  teamDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 24,
  },
  teamMembers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamMember: {
    alignItems: "center",
    flex: 1,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff5f7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  memberName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  memberRole: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  linksSection: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 12,
    paddingVertical: 20,
  },
  linkItem: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#ff85a2",
    fontWeight: "500",
    marginTop: 8,
  },
  copyrightSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  copyrightText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
});

export default AboutScreen;
