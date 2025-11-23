import React, { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ----------------------
// MOCK TRUCK DATA
// ----------------------
const mockTrucks = [
  {
    _id: "t1",
    vehicleNo: "MH12AB1234",
    truckType: "own",
    currentDriver: "Dilip",
    owner: "Indian Transport",
    dateOfRegistration: 1694458200000,
    allowedWeight: 16000,
    emptyWeight: 7000,
    totalWeight: 23000,
    vehicleType: "32 FT Container",
    maker: "Tata",
    model: "LPT 3118",
    chassisNo: "CHS12345678",
    engineNo: "ENG9876543",
    insuranceDate: 1735689600000,
    fitnessDate: 1733107200000,
    permitDate: 1738291200000,
    pucDate: 1730956800000,
    taxDate: 1733107200000,
    sold: false,
    maintenanceRemark: "",
    avgKm: 450,
    fuelAvg: 3.5,
    lastKmReading: 458200,
    lastKmReadingDate: 1697040000000,
    remark: "Vehicle in good condition",
  },
];

// Format timestamp into DD/MM/YYYY
const formatDate = (num?: number) => {
  if (!num) return "-";
  const d = new Date(num);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
};

export default function TruckScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedTruck, setSelectedTruck] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTrucks = mockTrucks.filter(
    (t) =>
      t.vehicleNo.toLowerCase().includes(searchText.toLowerCase()) ||
      (t.currentDriver || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (t.party || "").toLowerCase().includes(searchText.toLowerCase())
  );

  const handleTruckPress = (truck: any) => {
    setSelectedTruck(truck);
    setModalVisible(true);
  };

  const renderTruckCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleTruckPress(item)}
    >
      <Text style={styles.truckNo}>{item.vehicleNo}</Text>
      <Text style={styles.truckType}>{item.vehicleType || "Truck"}</Text>
      <Text style={styles.driverName}>
        Driver: {item.currentDriver || "N/A"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search truck number, driver, party..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Truck List */}
      <FlatList
        data={filteredTrucks}
        renderItem={renderTruckCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal */}
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

            {selectedTruck && (
              <ScrollView style={styles.detailsContainer}>
                <Text style={styles.modalTitle}>{selectedTruck.vehicleNo}</Text>

                {/* BASIC DETAILS */}
                <Info label="Truck Type" value={selectedTruck.truckType} />
                <Info label="Driver" value={selectedTruck.currentDriver} />
                <Info label="Owner" value={selectedTruck.owner} />
                <Info
                  label="Registration Date"
                  value={formatDate(selectedTruck.dateOfRegistration)}
                />
                <Info label="Vehicle Type" value={selectedTruck.vehicleType} />

                {/* DIMENSIONS */}
                <Section title="Dimensions">
                  <Info
                    label="Allowed Weight"
                    value={selectedTruck.allowedWeight}
                  />
                  <Info
                    label="Empty Weight"
                    value={selectedTruck.emptyWeight}
                  />
                  <Info
                    label="Total Weight"
                    value={selectedTruck.totalWeight}
                  />
                </Section>

                {/* ENGINE DETAILS */}
                <Section title="Vehicle Info">
                  <Info label="Maker" value={selectedTruck.maker} />
                  <Info label="Model" value={selectedTruck.model} />
                  <Info label="Chassis No" value={selectedTruck.chassisNo} />
                  <Info label="Engine No" value={selectedTruck.engineNo} />
                </Section>

                {/* DATES */}
                <Section title="Important Dates">
                  <Info
                    label="Insurance"
                    value={formatDate(selectedTruck.insuranceDate)}
                  />
                  <Info
                    label="Fitness"
                    value={formatDate(selectedTruck.fitnessDate)}
                  />
                  <Info
                    label="Permit"
                    value={formatDate(selectedTruck.permitDate)}
                  />
                  <Info label="PUC" value={formatDate(selectedTruck.pucDate)} />
                  <Info label="Tax" value={formatDate(selectedTruck.taxDate)} />
                </Section>

                {/* PERFORMANCE */}
                <Section title="Performance">
                  <Info label="Avg KM" value={selectedTruck.avgKm} />
                  <Info label="Fuel Avg" value={selectedTruck.fuelAvg} />
                  <Info
                    label="Last KM Reading"
                    value={selectedTruck.lastKmReading}
                  />
                  <Info
                    label="Reading Date"
                    value={formatDate(selectedTruck.lastKmReadingDate)}
                  />
                </Section>

                {selectedTruck.remark ? (
                  <Info label="Remark" value={selectedTruck.remark} />
                ) : null}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ----------------------
// SMALL COMPONENTS
// ----------------------
const Info = ({ label, value }: any) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value || "-"}</Text>
  </View>
);

const Section = ({ title, children }: any) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// ----------------------
// STYLES
// ----------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  searchContainer: { padding: 16, backgroundColor: "white" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  listContainer: { padding: 16 },

  // CARD
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  truckNo: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  truckType: { fontSize: 16, color: "#666" },
  driverName: { fontSize: 14, color: "#888", marginTop: 4 },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "85%",
  },
  closeButton: { position: "absolute", right: 15, top: 15, zIndex: 1 },
  closeButtonText: { fontSize: 24, fontWeight: "bold", color: "#666" },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  detailsContainer: { marginTop: 10 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    width: 130,
    color: "#333",
  },
  detailValue: { fontSize: 16, flex: 1, color: "#666" },
});
