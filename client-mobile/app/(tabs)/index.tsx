import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { API_BASE_URL } from "@/constants/api";
import { useApi } from "@/hooks/useApi";

export default function HomeScreen() {
  const { data, loading, error } = useApi<{ status: string }>(
    `${API_BASE_URL}/health`
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Life Manager</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Server Status</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : error ? (
          <Text style={styles.error}>Offline</Text>
        ) : (
          <Text style={styles.ok}>{data?.status ?? "Unknown"}</Text>
        )}
      </View>

      <Text style={styles.hint}>
        API: {API_BASE_URL}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    minWidth: 200,
  },
  cardTitle: {
    fontSize: 16,
    color: "#666",
  },
  ok: {
    fontSize: 20,
    color: "green",
    fontWeight: "600",
  },
  error: {
    fontSize: 20,
    color: "red",
    fontWeight: "600",
  },
  hint: {
    fontSize: 12,
    color: "#999",
    marginTop: 16,
  },
});
