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

interface Employee {
  _id: string;
  name: string;
  phone: { label: string; value: string }[];
  account: {
    name: string;
    accountNo: string;
    ifsc: string;
    bank: string;
    branch: string;
    remark: string;
  }[];
  role: string;
  status: string;
  truck?: string;
  licenseNo?: string;
  licenseExpiry?: number;
  referredBy?: string;
  opening: number;
  closing: number;
  remark: string;
}

// Mock data for demonstration
const mockEmployee: Employee[] = [
  {
    _id: "1",
    name: "ABC Transport Co.",
    phone: [
      { label: "Mobile", value: "9876543210" },
      { label: "Office", value: "0123456789" },
    ],
    account: [
      {
        name: "testing",
        accountNo: "8765432109",
        ifsc: "TEST0001234",
        bank: "Test Bank",
        branch: "Test Branch",
        remark: "",
      },
    ],
    role: "Driver",
    status: "Active",
    truck: "MH12AB1234",
    licenseNo: "DL1234567890",
    licenseExpiry: 1704067200,
    referredBy: "John Doe",
    opening: 50000,
    closing: 45000,
    remark: "",
  },
  {
    _id: "2",
    name: "XYZ Logistics",
    phone: [{ label: "Mobile", value: "8765432109" }],
    role: "Staff",
    account: [
      {
        name: "testing",
        accountNo: "8765432109",
        ifsc: "TEST0001234",
        bank: "Test Bank",
        branch: "Test Branch",
        remark: "",
      },
    ],
    status: "Active",
    truck: "MH12AB1234",
    licenseNo: "DL1234567890",
    licenseExpiry: 1704067200,
    referredBy: "John Doe",
    opening: 50000,
    closing: 45000,
    remark: "",
  },
];

export default function EmployeesScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const filteredParties = mockEmployee.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.phone.some((p) => p.value.includes(searchText))
  );

  const handleEmployeePress = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const renderEmployeeCard = ({ item }: { item: Employee }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleEmployeePress(item)}
    >
      <Text style={styles.employeeName}>{item.name}</Text>
      <Text style={styles.employeePhone}>
        {item.phone.length > 0
          ? item.phone.map((p) => p.value).join(", ")
          : "No phone"}
      </Text>
      <Text style={styles.employeeRole}>{item.role}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search employee..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredParties}
        renderItem={renderEmployeeCard}
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

            {selectedEmployee && (
              <View style={styles.detailsContainer}>
                <Text style={styles.modalTitle}>{selectedEmployee.name}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Role:</Text>
                  <Text style={styles.detailValue}>
                    {selectedEmployee.role}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <View style={styles.detailValue}>
                    {selectedEmployee.phone.map((p, index) => (
                      <Text key={index} style={styles.phoneItem}>
                        {p.label}: {p.value}
                      </Text>
                    ))}
                  </View>
                </View>

                {selectedEmployee.status && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEmployee.status}
                    </Text>
                  </View>
                )}

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Account:</Text>
                  <View style={styles.detailValue}>
                    {selectedEmployee.account.map((p, index) => (
                      <Text key={index} style={styles.phoneItem}>
                        {p.name}: {p.accountNo}
                        {p.remark && `, Remark: ${p.remark}`}
                      </Text>
                    ))}
                  </View>
                </View>

                {selectedEmployee.truck && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Truck:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEmployee.truck}
                    </Text>
                  </View>
                )}

                {selectedEmployee.licenseNo && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>License No:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEmployee.licenseNo}
                    </Text>
                  </View>
                )}

                {selectedEmployee.licenseExpiry && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>License Expiry Date:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEmployee.licenseExpiry}
                    </Text>
                  </View>
                )}

                {selectedEmployee.referredBy && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Referred By:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEmployee.referredBy} days
                    </Text>
                  </View>
                )}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Opening Balance:</Text>
                  <Text style={styles.detailValue}>
                    ₹{selectedEmployee.opening.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Closing Balance:</Text>
                  <Text style={styles.detailValue}>
                    ₹{selectedEmployee.closing.toLocaleString()}
                  </Text>
                </View>
                {selectedEmployee.remark && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Remark:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEmployee.remark}
                    </Text>
                  </View>
                )}
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
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  employeePhone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  employeeRole: {
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
