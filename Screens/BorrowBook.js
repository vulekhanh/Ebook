import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { useNavigation } from '@react-navigation/core';
import { color } from 'react-native-reanimated';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FirebaseManager } from './FirebaseManager';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const BorrowBookScreen = ({ route, navigation }) => {
  const [isAdmin, setIsAdmin] = useState(route.params)
  const manager = new FirebaseManager();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateBorrow, setDateBorrow] = useState("");
  const [dateReturn, setDateReturn] = useState("");
  const [email, setEmail] = useState("");

  useEffect(async () => {
    if (!isAdmin)
      setEmail(manager.userName);
    var syncData = await manager.getData("Cart", ["email", "==", manager.userName]);
    syncData[0].books.forEach(async value => {
      var dataBook = await manager.getData("Books", ["id", "==", value]);
      setData(items => [...items, dataBook[0]]);
    })
  }, [])

  const HandleDate = (date) => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  const RemoveBookFormList = (value) => {
    var dataAfter = [];
    var dataUpdate = {
      email: manager.userName,
      books: [],
    };
    data.forEach(item => {
      if (item.id != value.id) {
        dataAfter.push(item);
        dataUpdate.books.push(item.id);
      }
    })
    setData(dataAfter);
    manager.UpdateData("Cart", dataUpdate, ["email", "==", manager.userName])
  }
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10, paddingLeft: '6%', paddingRight: '5%', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BookDetail', {
              book: item,
            })
          }
        >
          <Image
            source={{ uri: item.bookCover }}
            resizeMode="cover"
            style={{
              width: 150,
              height: 220,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: '#fff' }}>{item.bookName}</Text>
          <TouchableOpacity
            onPress={() => RemoveBookFormList(item)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.base,
              marginRight: SIZES.base,
              marginTop: 5,
              backgroundColor: COLORS.darkRed,
              height: 35,
              borderRadius: SIZES.radius,
              alignSelf: 'center',
            }}>
            <Text style={{ color: COLORS.lightRed, alignSelf: 'center' }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem2 = ({ item }) => {
    if (item.id < 4) {
      if (item.id % 2 == 0) {
        return (
          <View
            style={{ marginVertical: 10, flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ color: COLORS.lightGray2, fontSize: 20 }}>{item.id}</Text>
            <Text style={{ color: COLORS.lightGray2, fontSize: 20 }}>. </Text>
            <Text style={{ color: COLORS.lightGray2, fontSize: 20 }}>{item.bookName}</Text>
          </View>
        );
      }
      return (
        <View
          style={{ marginVertical: 10, flexDirection: 'row', marginLeft: 20 }}>
          <Text style={{ color: COLORS.lightGray2, fontSize: 20 }}>{item.id}</Text>
          <Text style={{ color: COLORS.lightGray2, fontSize: 20 }}>. </Text>
          <Text style={{ color: COLORS.lightGray2, fontSize: 20 }}>{item.bookName}</Text>
        </View>
      );
    }
  };
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.radius,
          height: 70,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{ marginLeft: SIZES.base }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 0.95, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: 'bold' }}>
            Your Books List
          </Text>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'flex-end', padding: SIZES.padding }}>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            marginBottom: 5,
          }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              var date = HandleDate(new Date(Date.now()))
              setDateBorrow(date);
              setModalVisible(!modalVisible)
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: SIZES.base,
                  color: COLORS.white,
                  fontSize: 20,
                }}>
                Borrow Now
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleConfirmBtn = async () => {
    if (email == "" || dateReturn == "") {
      Alert.alert("Library Manager", "Please check information")
    }
    else {
      const dataAfter = {
        email: manager.userName,
        books: [],
      }
      manager.UpdateData("Cart", dataAfter, ["email", "==", manager.userName]);
      var idTicket = 1;
      var temp = await manager.getData("BorrowDetail")
      var countTicketUser = 0;
      temp.forEach(value => {
        if (idTicket <= value.idTicket)
          idTicket = value.idTicket + 1;
        if (email == value.email) {
          countTicketUser = countTicketUser + 1;
        }
      })
      const dataBorrow = manager.dataBorrowDetail;
      data.forEach(value => {
        dataBorrow.idBook.push(value.id)
      })
      dataBorrow.email = email;
      dataBorrow.amount = data.length;
      dataBorrow.borrowDate = dateBorrow;
      dataBorrow.returnDate = dateReturn;
      dataBorrow.idTicket = idTicket;
      manager.pushData("BorrowDetail", dataBorrow);
      if (countTicketUser == 0) {
        var dataUser = await manager.getData("Account", ["email", "==", email])
        var dataUserAfter = dataUser[0];
        dataUserAfter.status = "Borrowing";
        await manager.UpdateData("Account", dataUserAfter, ["email", "==", email])
      }
      setData([]);
      Alert.alert("Library Manager", "Borrow successful");
      setModalVisible(!modalVisible)
    }
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmPickTime = (date) => {
    setDateReturn(HandleDate(date));
    hideDatePicker();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      {/*Header*/}
      {renderHeader()}

      {/*Book List*/}
      <ScrollView
        style={{
          marginTop: 10,
          marginBottom: 40,
          width: windowWidth,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}></FlatList>
      </ScrollView>

      {/*Footer*/}
      {renderFooter()}
      {/*Borrow Detail*/}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmPickTime}
        onCancel={hideDatePicker}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            height: windowHeight,
            width: windowWidth,
          }}>
          <View
            style={{
              height: windowHeight - 165,
              width: windowWidth - 80,
              backgroundColor: COLORS.gray,
              borderRadius: 20,
              alignSelf: 'center',
              marginTop: 80,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    alignSelf: 'center',
                    color: COLORS.lightGray2,
                    fontSize: 30,
                  }}>
                  BORROW
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'stretch',
                  flex: 1,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    source={{
                      uri: 'https://icon-library.com/images/close-icon-png/close-icon-png-19.jpg',
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      resizeMode: 'cover',
                    }}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                alignContent: 'center',
              }}>
              <View style={styles.containerInput}>
                <Text style={styles.title}>Email: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  editable={isAdmin ? true : false}
                  onChangeText={value => setEmail(value)}
                  placeholderTextColor={COLORS.lightGray2}>
                  {email}</TextInput>
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.title}>Date: </Text>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholderTextColor={COLORS.lightGray2}>
                  {dateBorrow}</TextInput>
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.title}>Return: </Text>
                <TouchableOpacity
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <TextInput
                    style={styles.input}
                    editable={false}
                    placeholder="Choose date return"
                    placeholderTextColor={COLORS.lightGray2}>
                    {dateReturn}</TextInput>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 1,
                  borderColor: COLORS.lightGray2,
                  width: windowWidth - 130,
                  borderWidth: 1,
                  alignSelf: 'center',
                  marginVertical: 20,
                }}></View>
              <FlatList
                data={data}
                style={{ height: 250 }}
                renderItem={renderItem2}
                keyExtractor={item => item.id}></FlatList>
              <View
                style={{
                  height: 1,
                  borderColor: COLORS.lightGray2,
                  width: windowWidth - 130,
                  borderWidth: 1,
                  alignSelf: 'center',
                  marginVertical: 10,
                }}></View>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  borderRadius: 10,
                  width: 100,
                  height: 40,
                  backgroundColor: COLORS.primary,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
                onPress={handleConfirmBtn}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: 'Roboto-Bold',
                    color: COLORS.lightGray2,
                    fontSize: 15,
                  }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    //flex : 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {
    color: COLORS.primary,
    fontSize: 17,
    marginRight: 10,
    flex: 1,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: COLORS.lightGray2,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    color: COLORS.white,
    paddingLeft: 10,
    //marginTop: 25,
    fontSize: 15,
  }
})
export default BorrowBookScreen;
