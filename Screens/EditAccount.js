import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {useNavigation} from '@react-navigation/core';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { FirebaseManager } from './FirebaseManager';
import { Value } from 'react-native-reanimated';

// 

const EditAccountScreen = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const manager = new FirebaseManager();
  const [dataUser, setDataUser] = useState(route.params);
  const [avatar, setAvatar] = useState(route.params.avatar);
  const UpdateData = async () => {
    if(avatar != dataUser.avatar){
      await manager.uploadImage("Account", "avatar", avatar);
      setAvatar(manager.sourceImage);
      dataUser.avatar = avatar;
    }
    manager.UpdateData("Account", dataUser, ["email", "==", manager.userName])
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }
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
          style={{marginLeft: SIZES.base}}
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
          style={{flex: 0.95, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: COLORS.white, fontSize: 25, fontWeight: 'bold'}}>
            Edit Your Account
          </Text>
        </View>
      </View>
    );
  }

  function renderInfo() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 150,
            width: 150,
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 40,
          }}>
          <ImageBackground 
            source={{
              uri: avatar
            }}
            style={{
              height: 150,
              width: 150,
              alignSelf: 'center',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
              direction: 'ltr',
              flexWrap: 'wrap-reverse',
            }}
            imageStyle={{borderRadius: 100}}>
            <TouchableOpacity onPress={async() => {
              await manager.pickImage();
              if(manager.uriImage != "null")
                setAvatar(manager.uriImage)
            }}>
              <Image
                source={{
                  uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/124-512.png',
                }}
                style={{height: 40, width: 40}}></Image>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            {dataUser.email}
          </Text>
          <TextInput
            style={{
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
            }}
            onChangeText = {value => dataUser.name = value}
            placeholder={'Name'}
            placeholderTextColor={COLORS.lightGray}
            selectionColor={COLORS.lightGray}>{dataUser.name}</TextInput>
          <TextInput
            style={{
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
            }}
            onChangeText = {value => dataUser.gender = value}
            placeholder={'Gender (Male/Female)'}
            placeholderTextColor={COLORS.lightGray}
            selectionColor={COLORS.lightGray}>{dataUser.gender}</TextInput>
          <TextInput
            style={{
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
            }}
            onChangeText = {value => dataUser.phoneNumber = value}
            placeholder={'Phone Number'}
            placeholderTextColor={COLORS.lightGray}
            keyboardType="number-pad"
            selectionColor={COLORS.lightGray}>{dataUser.phoneNumber}</TextInput>
          <TextInput
            style={{
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
            }}
            onChangeText = {value => dataUser.address = value}
            placeholder={'Address'}
            placeholderTextColor={COLORS.lightGray}
            selectionColor={COLORS.lightGray}>{dataUser.address}</TextInput>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={UpdateData}
          style={{
            height: 50,
            width: 120,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
          }}>
          <Text style={{fontSize: 20, color: COLORS.white, fontWeight: 'bold'}}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      {/*Header*/}
      {renderHeader()}
      {/*Info*/}
      {renderInfo()}
      {/*Footer*/}
      {renderFooter()}
    </KeyboardAwareScrollView>
  );
};

export default EditAccountScreen;
