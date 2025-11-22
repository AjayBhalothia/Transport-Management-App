import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Party {
  _id: string;
  name: string;
  phone: { label: string; value: string }[];
  type: string;
  email?: string;
  address?: string;
  panNo?: string;
  gstNo?: string;
  creditPeriod: number;
  opening: number;
  closing: number;
}

// Mock data for demonstration
const mockParties: Party[] = [
  {
    _id: "1",
    name: "ABC Transport Co.",
    phone: [
      { label: "Mobile", value: "9876543210" },
      { label: "Office", value: "0123456789" },
    ],
    type: "TRANSPORTER",
    email: "abc@transport.com",
    address: "123 Main St, City",
    panNo: "ABCDE1234F",
    gstNo: "27ABCDE1234F1Z5",
    creditPeriod: 30,
    opening: 50000,
    closing: 45000,
  },
  {
    _id: "2",
    name: "XYZ Logistics",
    phone: [{ label: "Mobile", value: "8765432109" }],
    type: "PARTY",
    email: "xyz@logistics.com",
    address: "456 Business Park",
    panNo: "XYZAB5678C",
    gstNo: "29XYZAB5678C1A2",
    creditPeriod: 45,
    opening: 75000,
    closing: 80000,
  },
];

export default function PartyScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredParties = mockParties.filter(
    (party) =>
      party.name.toLowerCase().includes(searchText.toLowerCase()) ||
      party.phone.some((p) => p.value.includes(searchText))
  );

  const handlePartyPress = (party: Party) => {
    setSelectedParty(party);
    setModalVisible(true);
  };

  const renderPartyCard = ({ item }: { item: Party }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePartyPress(item)}
    >
      <Text style={styles.partyName}>{item.name}</Text>
      <Text style={styles.partyPhone}>
        {item.phone.length > 0 ? item.phone.map(p => p.value).join(", ") : "No phone"}
      </Text>
      <Text style={styles.partyType}>{item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search parties..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredParties}
        renderItem={renderPartyCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            {selectedParty && (
              <View style={styles.detailsContainer}>
                <Text style={styles.modalTitle}>{selectedParty.name}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Type:</Text>
                  <Text style={styles.detailValue}>{selectedParty.type}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <View style={styles.detailValue}>
                    {selectedParty.phone.map((p, index) => (
                      <Text key={index} style={styles.phoneItem}>
                        {p.label}: {p.value}
                      </Text>
                    ))}
                  </View>
                </View>

                {selectedParty.email && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>
                      {selectedParty.email}
                    </Text>
                  </View>
                )}

                {selectedParty.address && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Address:</Text>
                    <Text style={styles.detailValue}>
                      {selectedParty.address}
                    </Text>
                  </View>
                )}

                {selectedParty.panNo && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>PAN:</Text>
                    <Text style={styles.detailValue}>
                      {selectedParty.panNo}
                    </Text>
                  </View>
                )}

                {selectedParty.gstNo && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>GST:</Text>
                    <Text style={styles.detailValue}>
                      {selectedParty.gstNo}
                    </Text>
                  </View>
                )}

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Credit Period:</Text>
                  <Text style={styles.detailValue}>
                    {selectedParty.creditPeriod} days
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Opening Balance:</Text>
                  <Text style={styles.detailValue}>
                    ₹{selectedParty.opening.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Closing Balance:</Text>
                  <Text style={styles.detailValue}>
                    ₹{selectedParty.closing.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  partyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  partyPhone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  partyType: {
    fontSize: 14,
    color: "#888",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
  detailsContainer: {
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    width: 120,
    color: "#333",
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
    color: "#666",
  },
  phoneItem: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
});
