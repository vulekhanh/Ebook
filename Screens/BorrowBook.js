import React, {useState} from 'react';
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
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {useNavigation} from '@react-navigation/core';
import {color} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ListData = [
  {
    id: 1,
    bookName: 'Other Words For Home',
    bookCover: images.otherWordsForHome,
    rating: 4.5,
    language: 'Eng',
    pageNo: 341,
    author: 'Jasmine Warga',
    genre: ['Romance', 'Adventure', 'Drama'],
    readed: '12k',
    description:
      "Jude never thought she’d be leaving her beloved older brother and father behind, all the way across the ocean in Syria. But when things in her hometown start becoming volatile, Jude and her mother are sent to live in Cincinnati with relatives. At first, everything in America seems too fast and too loud. The American movies that Jude has always loved haven’t quite prepared her for starting school in the US—and her new label of 'Middle Eastern,' an identity she’s never known before. But this life also brings unexpected surprises—there are new friends, a whole new family, and a school musical that Jude might just try out for. Maybe America, too, is a place where Jude can be seen as she really is.",
    backgroundColor: 'rgba(240,240,232,0.9)',
    navTintColor: '#000',
  },

  {
    id: 2,
    bookName: 'The Metropolis',
    bookCover: images.theMetropolist,
    rating: 4.1,
    language: 'Eng',
    pageNo: 272,
    author: 'Seith Fried',
    genre: ['Adventure', 'Drama'],
    readed: '13k',
    description:
      "In Metropolis, the gleaming city of tomorrow, the dream of the great American city has been achieved. But all that is about to change, unless a neurotic, rule-following bureaucrat and an irreverent, freewheeling artificial intelligence can save the city from a mysterious terrorist plot that threatens its very existence. Henry Thompson has dedicated his life to improving America's infrastructure as a proud employee of the United States Municipal Survey. So when the agency comes under attack, he dutifully accepts his unexpected mission to visit Metropolis looking for answers. But his plans to investigate quietly, quickly, and carefully are interrupted by his new partner: a day-drinking know-it-all named OWEN, who also turns out to be the projected embodiment of the agency's supercomputer. Soon, Henry and OWEN are fighting to save not only their own lives and those of the city's millions of inhabitants, but also the soul of Metropolis. The Municipalists is a thrilling, funny, and touching adventure story, a tour-de-force of imagination that trenchantly explores our relationships to the cities around us and the technologies guiding us into the future.",
    backgroundColor: 'rgba(247,239,219,0.9)',
    navTintColor: '#000',
  },

  {
    id: 3,
    bookName: 'The Tiny Dragon',
    bookCover: images.theTinyDragon,
    rating: 3.5,
    language: 'Eng',
    pageNo: 110,
    author: 'Ana C Bouvier',
    genre: ['Drama', 'Adventure', 'Romance'],
    readed: '13k',
    description:
      'This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!',
    backgroundColor: 'rgba(119,77,143,0.9)',
    navTintColor: '#FFF',
  },
  {
    id: 4,
    bookName: 'les misérables',
    bookCover: {
      uri: 'https://cdn.cokesbury.com/images/products/ExtraLarge/215/9781501887215.jpg',
    },
  },
];

const BorrowBookScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 10, paddingLeft: '6%', paddingRight: '5%'}}>
        <Image
          source={item.bookCover}
          resizeMode="cover"
          style={{
            width: 150,
            height: 220,
            borderRadius: 20,
          }}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: '#fff'}}>{item.bookName}</Text>
          <TouchableOpacity
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
            <Text style={{color: COLORS.lightRed, alignSelf: 'center'}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem2 = ({item}) => {
    if(item.id < 4){
      if(item.id % 2 == 0){
        return (
          <View
            style={{marginVertical: 10,  flexDirection: 'row', marginLeft: 20}}>
            <Text style={{color: COLORS.lightGray2, fontSize: 20}}>{item.id}</Text>
            <Text style={{color: COLORS.lightGray2, fontSize: 20}}>. </Text>
            <Text style={{color: COLORS.lightGray2, fontSize: 20}}>{item.bookName}</Text>
          </View>
        );
      }
      return (
        <View
          style={{marginVertical: 10,  flexDirection: 'row', marginLeft: 20}}>
          <Text style={{color: COLORS.lightGray2, fontSize: 20}}>{item.id}</Text>
          <Text style={{color: COLORS.lightGray2, fontSize: 20}}>. </Text>
          <Text style={{color: COLORS.lightGray2, fontSize: 20}}>{item.bookName}</Text>
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
            Your Books List
          </Text>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{flex: 1, justifyContent: 'flex-end', padding: SIZES.padding}}>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            marginBottom: 5,
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setModalVisible(!modalVisible)}>
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

  const handleConfirmBtn = () => {
    setModalVisible(!modalVisible)
    Alert.alert("Borrow successful");
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
      <ScrollView
        style={{
          marginTop: 10,
          marginBottom: 40,
          width: windowWidth,
        }}>
        <FlatList
          data={ListData}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}></FlatList>
      </ScrollView>

      {/*Footer*/}
      {renderFooter()}
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
                  TICKET
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
              <TextInput
                style={{
                  height: 40,
                  width: 250,
                  borderColor: COLORS.lightGray2,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: 'center',
                  color: COLORS.white,
                  paddingLeft: 10,
                  fontSize: 15,
                }}
                placeholder="Enter Email"
                placeholderTextColor={COLORS.lightGray2}></TextInput>
              <TextInput
                style={{
                  height: 40,
                  width: 250,
                  borderColor: COLORS.lightGray2,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: 'center',
                  color: COLORS.white,
                  paddingLeft: 10,
                  marginTop: 25,
                  fontSize: 15,
                }}
                placeholder="Enter Name"
                placeholderTextColor={COLORS.lightGray2}></TextInput>
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
                data={ListData}
                style={{height: 250}}
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
export default BorrowBookScreen;
