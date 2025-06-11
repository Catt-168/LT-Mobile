import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedDates, setSelectedDates] = useState({}); // Changed to object to track marked dates

  const changeMonth = (direction) => {
    const date = new Date(currentDate);
    if (direction === "prev") {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    setCurrentDate(date.toISOString().split("T")[0]);
  };

  const onDayPress = (day) => {
    setSelectedDates((prev) => {
      // Toggle date selection
      const newSelectedDates = { ...prev };
      if (newSelectedDates[day.dateString]) {
        delete newSelectedDates[day.dateString];
      } else {
        newSelectedDates[day.dateString] = {
          selected: true,
          selectedColor: "#a1d6a0",
          selectedDotColor: "orange",
        };
      }
      return newSelectedDates;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#a1d6a0" barStyle="dark-content" />

      <View style={styles.container}>
        <Text style={styles.title}>Activity Calendar</Text>
        <View style={styles.calendarWrapper}>
          <Calendar
            key={currentDate}
            current={currentDate}
            hideArrows={true}
            onDayPress={onDayPress}
            markedDates={selectedDates} // Pass all marked dates
            renderHeader={(date) => (
              <View style={styles.header}>
                <Text style={styles.monthText}>
                  {date.toString("MMMM yyyy")}
                </Text>
                <View style={styles.arrowContainer}>
                  <TouchableOpacity
                    onPress={() => changeMonth("prev")}
                    style={styles.arrowButton}
                  >
                    <Text style={styles.arrow}>{"<"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => changeMonth("next")}
                    style={styles.arrowButton}
                  >
                    <Text style={styles.arrow}>{">"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            theme={{
              todayTextColor: "#003366",
              selectedDayBackgroundColor: "#a1d6a0",
              monthTextColor: "#003366",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// ... keep your existing styles ...

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 24,
  },
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  calendarWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowContainer: {
    flexDirection: "row",
    gap: 5,
  },
  arrowButton: {
    backgroundColor: "#a1d6a0",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
