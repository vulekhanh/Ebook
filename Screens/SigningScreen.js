import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
const SigningScreen = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const header = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
      </View>
    );
  };
  const buttonSection = () => {
    let clickButtonStyle = [styles.buttonStyle, styles.focusButton];
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={isSignIn ? clickButtonStyle : styles.buttonStyle}
          onPress={() => {
            setIsSignIn(true);
          }}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isSignIn ? styles.buttonStyle : clickButtonStyle}
          onPress={() => {
            setIsSignIn(false);
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const signInView = () => {
    return (
      <View style={styles.signingContainer}>
        <View style={styles.emailContainer}>
          <FontistoIcon name="email" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <View style={styles.passwordContainer}>
          <AntDesignIcon name="lock" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <TouchableOpacity style={styles.signingButtonStyle}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.passwordRetrieveButton}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const signUpView = () => {
    return (
      <View style={styles.signingContainer}>
        <View style={styles.passwordContainer}>
          <AntDesignIcon name="user" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Name"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <View style={styles.emailContainer}>
          <FontistoIcon name="email" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <View style={styles.passwordContainer}>
          <FontistoIcon name="email" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <View style={styles.passwordContainer}>
          <AntDesignIcon name="lock" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Confirm password"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <TouchableOpacity style={styles.signingButtonStyle}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {header()}
      {buttonSection()}
      <View style={styles.signingContainer}>
        <ImageBackground
          source={{
            uri: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/Blur-PC-Wallpapers.jpg',
          }}
          style={[styles.imageStyle, styles.signingContainer]}>
          {isSignIn ? signInView() : signUpView()}
        </ImageBackground>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
  },
  focusButton: {
    borderBottomColor: '#194689',
    borderBottomWidth: 4,
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
