import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {useNavigation} from '@react-navigation/core';
import {color} from 'react-native-reanimated';
import { FirebaseManager } from './FirebaseManager';

const windowWidth = Dimensions.get('window').width;


const BookmarkedScreen = () => {
  const navigation = useNavigation();
  const manager = new FirebaseManager();
  const [data, setData] = useState([]);

  useEffect(async ()=>{
    var syncData = await manager.getData("Bookmarked", ["email", "==", manager.userName]);
    syncData[0].books.forEach(async item => { 
      var temp = await manager.getData("Books", ["id", "==", item])
      setData(value => [...value, temp[0]]); 
    })
  },[])

  const RemoveBookFormList = (value) =>{
    var dataAfter = [];
    var dataUpdate = {
      email: manager.userName,
      books: [],
    };
    data.forEach(item => {
      if(item.id != value.id){
        dataAfter.push(item);
        dataUpdate.books.push(item.id);
      }
    })
    setData(dataAfter);
    manager.UpdateData("Bookmarked", dataUpdate, ["email", "==", manager.userName])
  } 
  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 15, paddingLeft: '6%', paddingRight: '5%'}}>
        <Image
          source={{uri :item.bookCover}} 
          resizeMode="cover"
          style={{
            width: 150,
            height: 220,
            borderRadius: 20,
          }}
        />
        <View style={{flexDirection: 'column', alignItems : 'center'}}>
          <Text style={{color: '#fff'}}>{item.bookName}</Text>
          <TouchableOpacity
            onPress={()=>RemoveBookFormList(item)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.base,
              marginRight: SIZES.base,
              backgroundColor: COLORS.darkRed,
              height: 40,
              borderRadius: SIZES.radius,
              alignSelf: 'center',
            }}>
            <Text style={{color: COLORS.lightRed, alignSelf: 'center'}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
          <Text style={{color: COLORS.white, fontSize: 30, fontWeight: 'bold'}}>
            Your Favorite
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      {/*Header*/}
      {renderHeader()}

      {/*Book List*/}
      {/* {renderBookList(ListData)} */}
      <ScrollView
        style={{
          height: 620,
          marginTop: 15,
          marginBottom: 15,
          width: windowWidth,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}></FlatList>
      </ScrollView>

      {/*Footer*/}
      {/* {renderFooter()} */}
    </View>
  );
};
export default BookmarkedScreen;
