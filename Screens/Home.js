import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';
//import { useNavigation } from '@react-navigation/core';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { FirebaseManager } from './FirebaseManager';

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}></View>
    </View>
  );
};

//const navigation = useNavigation();
const Home = ({ navigation }) => {
  const manager = new FirebaseManager();
  const [dataUser, setDataUser] = useState(manager.dataAccount);
  const [isAdmin, setisAdmin] = useState(false);
  const [profileData, setProfileData] = useState("Username");
  useEffect(LoadData, []);
  async function LoadData() {
    //get data books
    const dataBook = await manager.getData("Books");
    await dataBook.sort((a, b) => a.id - b.id);
    setMyBooks(dataBook);
    //get data user
    var query = ["email", "==", manager.userName]
    const temp = await manager.getData("Account", query)
    temp.forEach(value => {
      setProfile(value.name);
      setisAdmin(value.isAdmin);
    })
    //Get data categories
    const dataCategories = await manager.getData("CategoriesBook");
    var i = 0;
    await dataCategories.sort((a, b) => a.id - b.id);
    dataCategories.forEach(value => {
      value.books.forEach(items => {
        categories[i].books.push(dataBook[items - 1]);
      })
      i = i + 1;
    })
    setIsRender(true);
  }

  const categoriesData = [
    {
      id: 1,
      categoryName: 'Best Book',
      books: [],
    },
    {
      id: 2,
      categoryName: 'The Latest',
      books: [],
    },
    {
      id: 3,
      categoryName: 'Coming Soon',
      books: [],
    },
  ];
  const [isRender, setIsRender] = useState(false);
  const [profile, setProfile] = useState(profileData);
  const [myBooks, setMyBooks] = useState([]);
  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(1);
  function renderHeader(profile) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Hello there,</Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {profile}
            </Text>
          </View>
        </View>

        {/* Points */}
        {isAdmin ?
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              height: 40,
              paddingLeft: 3,
              paddingRight: SIZES.radius,
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.navigate("AddBooks")
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <Image
                  source={icons.plus_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>

              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}>
                Add Books
              </Text>
            </View>
          </TouchableOpacity>
          : <View>
          <Image
            source={require("../assets/icons/books.png")}
            style={{height:70,width:70}}
          />
        </View>}
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
        <View
          style={{
            flexDirection: 'row',
            height: 65,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius,
          }}>
          {/* Claim */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log('Claim')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={icons.claim_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}>
                Borrowed
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider />

          {/* Get Point */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('BookmarkedScreen')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={icons.point_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}>
                Bookmarked
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderMyBookSection(myBooks) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.navigate('BookDetail', {
              book: item,
            })
          }>
          {/* Book Cover */}
          <Image
            //source={item.bookCover}
            source={{ uri: item.bookCover }}
            resizeMode="cover"
            style={{
              width: 150,
              height: 220,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>Book Feature</Text>

          {/* <TouchableOpacity onPress={() => console.log('See More')}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                alignSelf: 'flex-start',
                textDecorationLine: 'underline',
              }}>
              see more
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* Books */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <FlatList
            nestedScrollEnabled={true}
            data={myBooks}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}>
          {selectedCategory == item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <FlatList
          nestedScrollEnabled={true}
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    var books = [];
    let selectedCategoryBooks = categories.filter(
      a => a.id == selectedCategory,
    );

    if (selectedCategoryBooks.length > 0) {
      books = selectedCategoryBooks[0].books;
    }

    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row' }}
            onPress={() =>
              navigation.navigate('BookDetail', {
                book: item,
              })
            }>
            {/* Book Cover */}
            <Image
              source={{ uri: item.bookCover }}
              resizeMode="cover"
              style={{ width: 85, height: 130, borderRadius: 10 }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
              {/* Book name and author */}
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.white,
                  }}>
                  {item.bookName}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  {item.author}
                </Text>
              </View>

              {/* Book Info */}
              <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                <Image
                  source={icons.page_filled_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}>
                  {item.pageNo}
                </Text>

                <Image
                  source={icons.read_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}>
                  {item.readed}
                </Text>
              </View>

              {/* Genre */}
              <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                {item.genre.includes('Adventure') && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkGreen,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>
                      Adventure
                    </Text>
                  </View>
                )}
                {item.genre.includes('Romance') && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkRed,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>
                      Romance
                    </Text>
                  </View>
                )}
                {item.genre.includes('Drama') && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkBlue,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>
                      Drama
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 5, right: 12 }}
            onPress={() => console.log('Bookmark')}>
            <Image
              source={icons.bookmark_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
        <FlatList
          nestedScrollEnabled={true}
          data={books}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header Section */}
      <View style={{ height: 200 }}>
        {renderHeader(profile)}
        {renderButtonSection()}
      </View>

      {/* Body Section */}
      <ScrollView nestedScrollEnabled={true} style={{ marginTop: SIZES.radius }}>
        {/* Books Section */}
        <View>{renderMyBookSection(myBooks)}</View>

        {/* Categories Section */}
        <View style={{ marginTop: SIZES.padding }}>
          <View>{renderCategoryHeader()}</View>
          {(isRender) ? <View>{renderCategoryData()}</View> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
