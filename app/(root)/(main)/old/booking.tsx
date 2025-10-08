import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";

import { Shadow } from "react-native-shadow-2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { constants } from "@/old/constants";
import { showError } from "@/lib/toast";
import CustomHeader from "@/old/components/common/custom-header";
import CustomScreen from "@/old/components/sleeping-pod/custom-screen";
import CustomShadowContainer from "@/old/components/sleeping-pod/custom-shadow-container";
import { getAvalablePodsQuery } from "@/services/query/sleeping-pod";

const screenWidth = Dimensions.get("window").width;

const sleepingPodTypes = ["Single", "Double", "Triple"];
const sleepingPodBirth = ["Upper", "Lower"];
const foarmData = new FormData();

const Booking = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState("select date");
  const [time, setTime] = React.useState("select time");
  const [selectedHours, setSelectedHours] = React.useState("");
  const [sleepingPodData, setSleepingPodData] = React.useState();
  const [selectedPod, setSelectedPod] = React.useState({});
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("");
  const [sleepingPodHours, setSleepingPodHours] = React.useState([]);
  const [selectedBirth, setSelectedBirth] = React.useState("");

  foarmData.append("date", date);
  foarmData.append("time", time);
  const { data } = getAvalablePodsQuery(foarmData);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const selectedDate = date.toISOString().split("T")[0];
    setDate(selectedDate);
    console.log("A date has been picked: ", selectedDate);
    hideDatePicker();
  };
  const handleTimeConfirm = (time) => {
    const selectedTime = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setTime(selectedTime);
    hideTimePicker();
  };

  const handleSelectPod = () => {};

  // useEffect(() => {
  //   const getAvalablePodsData = async () => {
  //     try {
  //       setIsDataLoading(true);
  //       if (date && time) {
  //         const foarmData = new FormData();
  //         foarmData.append("date", date);
  //         foarmData.append("time", time);
  //         // const res = await getAvalablePods(foarmData);
  //         const hours = res?.map((item) => item.hour);
  //         setSleepingPodHours(hours);
  //         setSleepingPodData(res);
  //         console.log("res", res);
  //         setIsDataLoading(false);
  //       }
  //     } catch (error) {
  //       setIsDataLoading(false);
  //       showError("Error", "Something went wrong");
  //     }
  //   };
  //   getAvalablePodsData();
  // }, [time, date]);

  useEffect(() => {
    if (selectedHours && selectedType) {
      sleepingPodData.map((item) => {
        console.log("item", item.data);
        if (item.hour == selectedHours) {
          const selectedtype = item.data.filter(
            (item) => item.serviceType == selectedType
          );
          console.log("selectedtype", selectedtype[0]);
          if (selectedtype[0].numbers.length == 0) {
            showError("Error", "No pod available");
          }
          setSelectedPod(selectedtype[0]);
        }
      });
    }
    // if (selectedHours) {
    //   sleepingPodData.map((item) => {
    //     if (item.hour == selectedHours) {
    //       setSelectedPod(item.data);
    //     }
    //   });
    // }
  }, [selectedHours, selectedType]);

  const bookingHandler = async () => {
    const foarmData = new FormData();
    foarmData.append("service", 1);
    foarmData.append("serviceType", selectedType + 7);
    foarmData.append("date", date);
    foarmData.append("checkin_time", time);
    foarmData.append("hours", selectedHours);
    foarmData.append("sleepingpod_numbers", [selectedPod.numbers[0]]);
    foarmData.append("sleepingpod_package_id", 1);
    // const token = await getAuthToken();

    // axios
    //   .post(
    //     "http://65.109.142.7:8003/api/v1/customer/sleepingpod-booking/",
    //     foarmData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("respp", res);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  const BookingCard = () => {
    return (
      <View style={{ padding: 15 }}>
        <CustomShadowContainer style={{ width: screenWidth - 30, padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: constants.fontPopSB,
              color: "#00205B",
              marginBottom: 20,
            }}
          >
            Select Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: constants.fontPopM,
              color: "#00205B",
              opacity: 0.75,
            }}
          >
            Date and Time
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 5,
                gap: 5,
                borderRadius: 7,
                justifyContent: "flex-start",
                borderColor: "#8A95BB",
                borderWidth: 1,
                height: 45,
                width: screenWidth / 2 - 45,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Feather name="calendar" size={20} color="#8A95BB" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: constants.fontPopM,
                  color: "#00205B",
                }}
              >
                {date}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showTimePicker}
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 5,
                gap: 5,
                borderRadius: 7,
                justifyContent: "flex-start",
                borderColor: "#8A95BB",
                borderWidth: 1,
                height: 45,
                width: screenWidth / 2 - 45,
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Feather name="clock" size={20} color="#8A95BB" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: constants.fontPopM,
                  color: "#00205B",
                }}
              >
                {time}
              </Text>
            </TouchableOpacity>
          </View>
          {sleepingPodData && (
            <>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: constants.fontPopM,
                  color: "#00205B",
                  opacity: 0.75,
                  marginBottom: 10,
                }}
              >
                Select hours
              </Text>

              <View style={{ flexDirection: "row", gap: 30 }}>
                {sleepingPodHours.map((item) => (
                  <Shadow
                    key={item.toString()}
                    containerStyle={[styles.shadowContainer, { elevation: 20 }]}
                    distance={Platform.OS == "android" ? 7 : 0}
                    {...(Platform.OS == "android" && { offset: [0, 4] })}
                  >
                    <TouchableOpacity onPress={() => setSelectedHours(item)}>
                      <LinearGradient
                        colors={
                          selectedHours == item
                            ? ["#6D8AFC", "#B5C4FF"]
                            : ["#F3F7FA", "#DDE0E5"]
                        }
                        angle={139}
                        style={{
                          height: 50,
                          paddingHorizontal: 25,
                          borderRadius: 5,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: constants.fontPopM,
                            color: "#00205B",
                          }}
                        >
                          {item} Hours
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Shadow>
                ))}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: constants.fontPopM,
                  color: "#00205B",
                  opacity: 0.75,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                Select type
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 30,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {sleepingPodTypes.map((item, index) => (
                  <Shadow
                    key={item.toString()}
                    containerStyle={[styles.shadowContainer, { elevation: 20 }]}
                    distance={Platform.OS == "android" ? 7 : 0}
                    {...(Platform.OS == "android" && { offset: [0, 4] })}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedType(index + 7)}
                    >
                      <LinearGradient
                        colors={
                          selectedType == index + 7
                            ? ["#6D8AFC", "#B5C4FF"]
                            : ["#F3F7FA", "#DDE0E5"]
                        }
                        angle={139}
                        style={{
                          height: 50,
                          paddingHorizontal: 25,
                          borderRadius: 5,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: constants.fontPopM,
                            color: "#00205B",
                          }}
                        >
                          {item}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Shadow>
                ))}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: constants.fontPopM,
                  color: "#00205B",
                  opacity: 0.75,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                Select berth
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 30,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {sleepingPodBirth.map((item) => (
                  <Shadow
                    key={item.toString()}
                    containerStyle={[styles.shadowContainer, { elevation: 20 }]}
                    distance={Platform.OS == "android" ? 7 : 0}
                    {...(Platform.OS == "android" && { offset: [0, 4] })}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedBirth(item)}
                      disabled={selectedPod.level !== item}
                    >
                      <LinearGradient
                        colors={
                          selectedPod.level == item
                            ? selectedBirth == selectedPod.level
                              ? ["#6D8AFC", "#B5C4FF"]
                              : ["#F3F7FA", "#DDE0E5"]
                            : ["#A9A9A9", "#A9A9A9"]
                        }
                        angle={139}
                        style={{
                          height: 50,
                          paddingHorizontal: 25,
                          borderRadius: 5,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: constants.fontPopM,
                            color: "#00205B",
                          }}
                        >
                          {item}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Shadow>
                ))}
              </View>
            </>
          )}
        </CustomShadowContainer>
      </View>
    );
  };

  const BuyCard = () => (
    <View
      style={{
        height: 125,
        backgroundColor: "white",
        borderTopLeftRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: constants.fontPopM,
            color: "#00205B",
          }}
        >
          1 Pod
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: constants.fontPopSB,
            color: "#00205B",
          }}
        >
          Rs 400
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Shadow distance={4} offset={[3, 3]}>
          <TouchableOpacity
            onPress={bookingHandler}
            style={{ borderRadius: 10, overflow: "hidden" }}
          >
            <LinearGradient
              colors={["#6D8AFC", "#B5C4FF"]}
              angle={358}
              style={{
                width: screenWidth - 40,
                alignItems: "center",
                height: 48,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: constants.fontPopM,
                  fontSize: 16,
                  color: "#FBFAFF",
                }}
              >
                Book now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Shadow>
      </View>
    </View>
  );

  const AddPodCard = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: 30,
        alignSelf: "flex-end",
        gap: 20,
        alignItems: "center",
        marginRight: 15,
        // backgroundColor: 'red',
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: constants.fontPopM,
          color: "#00205B",
        }}
      >
        ADD Next Sleeping pod
      </Text>
      <Shadow
        containerStyle={[styles.shadowContainer, { elevation: 20 }]}
        distance={Platform.OS == "android" ? 7 : 0}
        {...(Platform.OS == "android" && { offset: [0, 4] })}
      >
        <TouchableOpacity>
          <LinearGradient
            colors={["#F3F7FA", "#DDE0E5"]}
            angle={139}
            style={{
              height: 35,
              width: 35,

              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="plus-circle" size={20} color="#00205B" />
          </LinearGradient>
        </TouchableOpacity>
      </Shadow>
    </View>
  );

  return (
    <CustomScreen>
      <CustomHeader
        isHome={false}
        title={"Sleeping Pod"}
        isBack={true}
        isWallet={false}
      />
      <ScrollView>
        <BookingCard />
        <AddPodCard />
      </ScrollView>
      {time && date && selectedType && selectedBirth && <BuyCard />}
    </CustomScreen>
  );
};

export default Booking;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
});
