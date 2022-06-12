import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const CardInformation = ({name, mail, phone, address, imageSource, gender}) => {
  if (gender == 'Male') {
    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <ImageBackground source={imageSource} style={styles.image}>
            <Image
              style={{height: 25, width: 25}}
              source={{
                uri: 'https://static.wikia.nocookie.net/the-adventures-of-ra1nb0wk1tty-and-her-allies/images/4/48/Male-icon.png/revision/latest?cb=20210227210143',
              }}></Image>
          </ImageBackground>
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
  }
  if (gender == 'Female') {
    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <ImageBackground source={imageSource} style={styles.image}>
            <Image
              style={{height: 25, width: 25}}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Pink_female_symbol.svg/2048px-Pink_female_symbol.svg.png',
              }}></Image>
          </ImageBackground>
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
  }
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <ImageBackground
          source={imageSource}
          style={styles.image}></ImageBackground>
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
    width: '95%',
    height: 170,
    backgroundColor: 'black',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray2,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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
    maxWidth: 160,
  },
  textName: {
    fontWeight: 'bold',
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
    width: 160,
    backgroundColor: '#898888',
    height: 1,
    marginVertical: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    direction: 'ltr',
    flexWrap: 'wrap-reverse',
  },
});
