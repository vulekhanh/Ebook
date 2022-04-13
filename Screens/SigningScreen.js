import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
const header = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
};
const buttonSection = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
const signInView = () => {
  return (
    <View style={styles.signingContainer}>
      <ImageBackground
        source={{
          uri: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/Blur-PC-Wallpapers.jpg',
        }}
        style={[styles.imageStyle, styles.signingContainer]}>
        <View style={styles.emailContainer}>
          <Icon name="user" style={styles.iconStyle} />
          <TextInput style={styles.inputBoxStyle} placeholder="Email" />
        </View>
        <View style={styles.passwordContainer}>
          <Icon name="lock" style={styles.iconStyle} />
          <TextInput style={styles.inputBoxStyle} placeholder="Password" />
        </View>
        <TouchableOpacity style={styles.signingButtonStyle}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.passwordRetrieveButton}>Forgot password?</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const SigningScreen = () => {
  return (
    <View style={styles.container}>
      {header()}
      {buttonSection()}
      {signInView()}
    </View>
  );
};

export default SigningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    backgroundColor: '#2464aa',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: '#f6f5f9',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#2464aa',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    borderBottomColor: '#2464aa',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
  },
  signingContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flexGrow: 1,
    width: Dimensions.get('window').width,
  },
  inputBoxStyle: {
    borderBottomColor: '#e5ecef',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
  },
  emailContainer: {
    flexDirection: 'row',
    padding: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    padding: 30,
  },
  iconStyle: {
    width: 40,
    height: 40,
    fontSize: 30,
    borderBottomColor: '#e5ecef',
    borderBottomWidth: 1,
  },
  signingButtonStyle: {
    width: 150,
    height: 50,
    margin: 30,
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e5ecef',
  },
  passwordRetrieveButton: {
    color: '#e5ecef',
    fontSize: 18,
  },
});
