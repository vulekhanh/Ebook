import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React from "react";
  
  const CardInformation = ({ name, mail, phone, address, imageSource }) => {
    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.information}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.details}>{mail}</Text>
          <View style={styles.line} />
          <Text style={styles.details}>{phone}</Text>
          <View style={styles.line} />
          <Text style={styles.details}>{address}</Text>
        </View>
      </View>
    );
  };
  
  export default CardInformation;
  
  const styles = StyleSheet.create({
    card: {
      width: "95%",
      height: 170,
      backgroundColor: "black",
      marginHorizontal: 15,
      marginTop: 10,
      borderRadius: 20,
      backgroundColor: "white",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
      flexDirection: "row",
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 20,
      alignSelf: "center",
      marginLeft: 30,
    },
    information: {
      justifyContent: "center",
      marginLeft: 20,
      flexWrap: "wrap",
      alignItems: "flex-start",
      width: 180,
      maxWidth: 160,
    },
    textName: {
      fontWeight: "400",
      fontSize: 18,
      lineHeight: 27,
    },
    details: {
      fontWeight: "400",
      fontSize: 13,
      lineHeight: 18,
      color: "#898888",
    },
    line: {
      width: 160,
      backgroundColor: "#898888",
      height: 1,
      marginVertical: 5,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 20,
      bottom: 10,
    },
  });
  