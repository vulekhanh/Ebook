import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import CardInformation from '../custom component/CardInformation';
import ButtonUser from '../custom component/ButtonUser';
import {useNavigation} from '@react-navigation/core';
import {COLORS} from '../constants';
import {FirebaseManager} from './FirebaseManager';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AccountSettingScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cnewPass, setCNewPass] = useState('');
  const manager = new FirebaseManager();
  const [dataUser, setDataUser] = useState(manager.dataAccount);
  //const navigation = useNavigation();
  useEffect(async () => {
    var data = await manager.getData('Account', [
      'email',
      '==',
      manager.userName,
    ]);
    setDataUser(data[0]);
  }, []);
  return (
    <ScrollView style={{height: windowHeight, width: windowWidth}}>
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
              height: windowHeight - 280,
              width: windowWidth - 55,
              backgroundColor: COLORS.gray,
              borderRadius: 20,
              alignSelf: 'center',
              marginTop: 110,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    alignSelf: 'center',
                    color: COLORS.lightGray2,
                    fontSize: 20,
                  }}>
                  CHANGE YOUR PASSWORD
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
            <View style={stylesmodal.container}>
              <Text style={stylesmodal.title}>Your Password:</Text>
              <TextInput
                style={stylesmodal.input}
                secureTextEntry
                onChangeText={value => setPass(value)}
                placeholder={'Enter Your Password'}
                placeholderTextColor={COLORS.lightGray}
                selectionColor={COLORS.lightGray}></TextInput>
              <Text style={stylesmodal.title}>New Password:</Text>
              <TextInput
                style={stylesmodal.input}
                secureTextEntry
                onChangeText={value => setNewPass(value)}
                placeholder={'Enter New Password'}
                placeholderTextColor={COLORS.lightGray}
                selectionColor={COLORS.lightGray}></TextInput>
              <Text style={stylesmodal.title}>Confirm New Password:</Text>
              <TextInput
                style={stylesmodal.input}
                secureTextEntry
                onChangeText={value => setCNewPass(value)}
                placeholder={'Confirm New Password'}
                placeholderTextColor={COLORS.lightGray}
                selectionColor={COLORS.lightGray}></TextInput>
            </View>
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
              onPress={() => {
                if (pass.length > 0) {
                  if (newPass.length > 0 && cnewPass.length > 0) {
                    if (cnewPass == newPass) {
                      manager.ChangePassword(dataUser.email, pass, newPass);         
                      setModalVisible(!modalVisible)
                      Alert.alert('Library Manager',
                      'Updated');
                      navigation.replace('SigningScreen');
                    } else {
                      Alert.alert(
                        'Library Manager',
                        'Mật khẩu mới không trùng khớp',
                      );
                    }
                  }
                  else {
                    Alert.alert(
                      'Library Manager',
                      'Please Enter New Password')
                  }
                } else {
                  Alert.alert('Library Manager', 'Please Check Your Password');
                }
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Roboto-Bold',
                  color: COLORS.lightGray2,
                  fontSize: 15,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {/* Header  */}
        <View style={styles.containerHeader}>
          <Text
            style={{
              style: styles.textHeader,
              marginTop: 40,
              marginBottom: 10,
              color: COLORS.white,
              fontSize: 36,
              fontWeight: 'bold',
            }}>
            Personal details
          </Text>

          {/*<TouchableOpacity style={styles.btnEdit}>
              
              <Image
                source={{uri: 'https://icones.pro/wp-content/uploads/2021/05/icone-de-panier-orange.png'}}
                style={{ height: 30, width: 30, marginHorizontal: 5 }}
              />
            </TouchableOpacity>*/}

          {/* Info Wallet, Bookmarks Section */}
          <View></View>
          {/* Card Info  */}
          <View style={styles.feature}>
            <CardInformation
              name={dataUser.name}
              mail={dataUser.email}
              imageSource={{uri: dataUser.avatar}}
              address={dataUser.address}
              phone={dataUser.phoneNumber}
              gender={dataUser.gender}
            />
            <ButtonUser
              name="Your Favorite"
              onPress={() => {
                navigation.navigate('BookmarkedScreen');
              }}
            />
            <ButtonUser
              name="Edit Information"
              onPress={() => {
                navigation.navigate('EditAccountScreen', dataUser);
              }}
            />
            <ButtonUser
              name="Setting"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />

            {/*<ButtonUser name="My Preferences" />*/}
            <ButtonUser
              name="About Us"
              onPress={() => {
                Alert.alert('Ebook project by team 10 <3','ebook15062022@gmail.com');
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}></TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('EditAccountScreen', dataUser);
                }}
                style={styles.button1}>
                <Image
                  source={{
                    uri: 'http://cdn.onlinewebfonts.com/svg/img_446456.png',
                  }}
                  style={{
                    height: 20,
                    width: 20,
                    marginHorizontal: 10,
                    tintColor: COLORS.white,
                  }}
                />
                <Text style={styles.buttonText1}>Setting</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  manager.SignOut();
                  navigation.replace('SigningScreen');
                }}
                style={styles.button1}>
                <Image
                  source={{
                    uri: 'https://cdn4.iconfinder.com/data/icons/universal-icons/120/vector_288_20-512.png',
                  }}
                  style={{
                    height: 25,
                    width: 25,
                    marginHorizontal: 10,
                    tintColor: COLORS.white,
                  }}
                />
                <Text style={styles.buttonText1}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountSettingScreen;
const stylesmodal = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 15,
    color: COLORS.lightGray2,
    borderColor: COLORS.lightGray2,
    borderWidth: 1,
    alignSelf: 'center',
    width: 300,
    marginTop: 20,
    borderRadius: 30,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    // height: windowHeight,
  },
  containerHeader: {
    flexDirection: 'column',
    padding: 10,
  },
  /*btnEdit: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'transparent',
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
    },*/
  textHeader: {
    position: 'absolute',
    width: 147,
    height: 27,
    left: 35,
    top: 10,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 27,
  },
  editText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  card: {
    width: '95%',
    height: 170,
    backgroundColor: 'black',
    marginHorizontal: 15,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: 30,
  },
  information: {
    justifyContent: 'center',
    marginLeft: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: 180,
  },
  textName: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
  },
  details: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#898888',
  },
  line: {
    width: 170,
    backgroundColor: '#898888',
    height: 1,
    marginVertical: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  feature: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonText1: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 20,
  },
  buttonText2: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  button1: {
    backgroundColor: COLORS.primary,
    width: '48%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: 'white',
    width: '48%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
});
