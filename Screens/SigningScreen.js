import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
KeyboardAwareScrollView;
const SigningScreen = ({navigation}) => {
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
        <View style={styles.inputContainer}>
          <FontistoIcon name="email" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesignIcon name="lock" style={styles.iconStyle} color="#FFFFFF" />
          <TextInput
            style={styles.inputBoxStyle}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <TouchableOpacity
          style={styles.signingButtonStyle}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const signUpView = () => {
    return (
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.signingContainer}>
          <View style={styles.inputContainer}>
            <AntDesignIcon
              name="user"
              style={styles.iconStyle}
              color="#FFFFFF"
            />
            <TextInput
              style={styles.inputBoxStyle}
              placeholder="Name"
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontistoIcon
              name="email"
              style={styles.iconStyle}
              color="#FFFFFF"
            />
            <TextInput
              style={styles.inputBoxStyle}
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontistoIcon
              name="email"
              style={styles.iconStyle}
              color="#FFFFFF"
            />
            <TextInput
              style={styles.inputBoxStyle}
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesignIcon
              name="lock"
              style={styles.iconStyle}
              color="#FFFFFF"
            />
            <TextInput
              style={styles.inputBoxStyle}
              placeholder="Confirm password"
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity style={styles.signingButtonStyle}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };
  return (
    <View style={styles.container}>
      {header()}
      {buttonSection()}
      <View style={styles.signingContainer}>
        <ImageBackground
          source={{
            uri: 'http://papers.co/wallpaper/papers.co-sg90-dark-color-inside-gradation-blur-34-iphone6-plus-wallpaper.jpg',
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
    backgroundColor: '#151936',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 50,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151936',
    borderColor: '#FFFFFF',
    borderTopWidth: 1,
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
  },
  focusButton: {
    borderBottomColor: '#FFFFFF',
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
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 30,
  },
  iconStyle: {
    width: 40,
    height: 40,
    fontSize: 30,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  signingButtonStyle: {
    width: 150,
    height: 50,
    margin: 30,
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
