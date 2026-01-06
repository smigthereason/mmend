import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HelpSupportScreen: React.FC = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const faqs = [
    {
      id: "1",
      question: "How do I reset my password?",
      answer:
        "Go to Account Settings → Security → Change Password. Enter your current password and set a new one.",
    },
    {
      id: "2",
      question: "How do I contact other parents?",
      answer:
        "You can connect with other parents through the Messages tab, community posts, or interest groups.",
    },
    {
      id: "3",
      question: "Is my information secure?",
      answer:
        "Yes, we use end-to-end encryption and never share your personal information with third parties.",
    },
    {
      id: "4",
      question: "How do I delete my account?",
      answer:
        "Contact support to request account deletion. We'll process it within 7 business days.",
    },
  ];

  const contactMethods = [
    {
      id: "1",
      title: "Email Support",
      description: "Get help via email",
      icon: "mail-outline",
      action: () => Linking.openURL("mailto:support@parentpal.com"),
    },
    {
      id: "2",
      title: "Live Chat",
      description: "Chat with our support team",
      icon: "chatbubble-outline",
      action: () => console.log("Open live chat"),
    },
    {
      id: "3",
      title: "Phone Support",
      description: "Call us directly",
      icon: "call-outline",
      action: () => Linking.openURL("tel:+18005551234"),
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <Text style={styles.sectionDescription}>
            Get in touch with our support team for any questions or issues.
          </Text>

          <View style={styles.contactMethods}>
            {contactMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.contactMethod}
                onPress={method.action}
              >
                <View style={styles.contactIcon}>
                  <Ionicons
                    name={method.icon as any}
                    size={24}
                    color="#ff85a2"
                  />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{method.title}</Text>
                  <Text style={styles.contactDescription}>
                    {method.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Send Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryButtons}>
              {["Account", "Technical", "Billing", "Other"].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category &&
                      styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category &&
                        styles.categoryButtonTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue or question..."
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoSection}>
          <Ionicons name="information-circle" size={40} color="#ff85a2" />
          <Text style={styles.infoTitle}>MotherMend Support</Text>
          <Text style={styles.infoText}>
            Our support team is available 24/7 to help you with any questions or
            concerns.
          </Text>
          <Text style={styles.infoContact}>
            support@mothermend.com • 1-800-555-1234
          </Text>
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
  section: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  contactMethods: {
    marginTop: 10,
  },
  contactMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff5f7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: "#666",
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    marginBottom: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#ff85a2",
    borderColor: "#ff85a2",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  categoryButtonTextActive: {
    color: "#fff",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff85a2",
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoSection: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff5f7",
    marginTop: 12,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 12,
  },
  infoContact: {
    fontSize: 14,
    color: "#ff85a2",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default HelpSupportScreen;
