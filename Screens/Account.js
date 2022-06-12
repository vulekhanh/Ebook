  import React ,{useEffect, useState} from 'react';
  import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
  } from 'react-native';
  import CardInformation from '../custom component/CardInformation';
  import ButtonUser from '../custom component/ButtonUser';
  import { useNavigation } from '@react-navigation/core';
  import { COLORS } from '../constants';
  import { FirebaseManager } from './FirebaseManager';
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const AccountSettingScreen = ({navigation}) => {
    const manager = new FirebaseManager();
    const [dataUser, setDataUser] = useState(manager.dataAccount);
    //const navigation = useNavigation();
    useEffect(async()=>{
      var data = await manager.getData("Account", ["email", "==", manager.userName]);
      setDataUser(data[0]);
    },[])
    return (
      <ScrollView
      style={{ height: windowHeight, width: windowWidth}}>
        <View style={styles.container}>
          {/* Header  */}
          <View style={styles.containerHeader}>
            <Text style={{style: styles.textHeader, marginTop:20, marginBottom: 10, color: COLORS.white, fontSize: 30, fontWeight:'bold'}}>Personal details</Text>

            {/*<TouchableOpacity style={styles.btnEdit}>
              
              <Image
                source={{uri: 'https://icones.pro/wp-content/uploads/2021/05/icone-de-panier-orange.png'}}
                style={{ height: 30, width: 30, marginHorizontal: 5 }}
              />
            </TouchableOpacity>*/}

            {/* Info Wallet, Bookmarks Section */}
            <View>

            </View>
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
                onPress = {()=>{navigation.navigate("BookmarkedScreen");}}
              />
              <ButtonUser 
                name="Your Order" 
                onPress = {()=>{navigation.navigate("AccountList");}}
              />
              <ButtonUser 
                name="Edit Information"
                onPress = {()=>{navigation.navigate('EditAccountScreen', dataUser);}}
              />
              {/*<ButtonUser name="My Preferences" />*/}
              <ButtonUser 
                name="About Us" 
                onPress = {()=>{console.log("About us")}}
              />
              <View
                style={{
                  
                  flexDirection: 'row',
                  marginTop: 10,
                }}
              >
                <TouchableOpacity style={{flexDirection: 'row'}}>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate('EditAccountScreen', dataUser);
                  }}
                  style={styles.button1}
                >
                  <Image
                    source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_446456.png'}}
                    style={{ height: 20, width: 20, marginHorizontal: 10, tintColor: COLORS.white }}
                  />
                  <Text style={styles.buttonText1}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    manager.SignOut();
                    navigation.replace('SigningScreen');
                  }}
                  style={styles.button2}
                >
                  <Image
                    source={{uri: 'https://cdn4.iconfinder.com/data/icons/universal-icons/120/vector_288_20-512.png'}}
                    style={{ height: 20, width: 20, marginHorizontal: 10, tintColor: COLORS.primary }}
                  />
                  <Text style={styles.buttonText2}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default AccountSettingScreen;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor : COLORS.black,
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
      fontSize: 16,
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
  