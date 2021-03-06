import React, { Component, useEffect, useState } from 'react';
import { Alert } from "react-native";
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getActionFromState } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

export class FirebaseManager extends Component {
    //#region data
    userName;
    uriImage;
    sourceImage;
    // Data của Nhật ký
    dataAccount = {
        email: "",
        name: "",
        gender: "",
        phoneNumber: "",
        address: "",
        status: "not borrow",
        isAdmin: false,
        avatar: "https://firebasestorage.googleapis.com/v0/b/libraryapp-c2dfa.appspot.com/o/Account%2FavatarDefault.png?alt=media&token=80d36f3f-ee0b-4ae2-a474-74253149c2b1",
    }
    // Data của thông tin người dùng
    dataBorrowDetail = {
        idTicket: "",
        email: "",
        idBook: [],
        amount: "",
        borrowDate: "",
        returnDate: "",
    }
    // Data của bảng thống kê
    dataBook = {
        id: 0,
        bookName: "",
        bookCover: "",
        rating: 0,
        language: "",
        pageNo: 0,
        author: "",
        genre: [],
        readed: "",
        description: "",
        backgroundColor: "rgba(240,240,232,0.9)",
        navTintColor: '#000',
    }
    dataCart = {
        email: "",
        books: [],
    }
    dataBookmarked = {
        email: "",
        books: [],
    }
    //#endregion

    constructor(props) {
        super(props)
        this.userName = this.GetUserName();
        this.uriImage = "";
    }
    //#region user account method
    checkLogin() {
        const [initializing, setInitializing] = useState(true);
        const [user, setUser] = useState();
        function onAuthStateChanged(user) {
            setUser(user);
            if (initializing) setInitializing(false);
        }

        useEffect(() => {
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
            return subscriber; // unsubscribe on unmount
        }, []);

        if (initializing) return null;
        return user;
    }
    // Login with Email and Pass
    signIn(mail, pass) {
        auth()
            .signInWithEmailAndPassword(mail, pass)
            .then(() => {
                console.log("Sign in successed!");
            })
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/wrong-password') {
                    Alert.alert("Library App ", "Wrong Password");
                }
                if (error.code === 'auth/user-not-found') {
                    Alert.alert("Library App ", "User not found");
                }
                if (error.code === "auth/invalid-email") {
                    Alert.alert("Library App ", "Invalid Email");
                }
            });
    };
    // Đăng kí tài khoảng với mail và pass
    singUp(name, mail, pass) {
        auth().createUserWithEmailAndPassword(mail, pass)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: mail
                })
                this.dataAccount.email = mail;
                this.dataAccount.name = name;
                this.dataCart.email = mail;
                this.dataBookmarked.email = mail;
                this.pushData("Account", this.dataAccount);
                this.pushData("Cart", this.dataCart);
                this.pushData("Bookmarked", this.dataBookmarked);
                Alert.alert("Library App", "Successed!");
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("Library App ", "Email has already used");
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert("Library App ", "Invalid Email");
                }
            })
    }
    //Thay đổi password của user hiện tại
    ChangePassword(mail, oldPassword, newPassword) {
        this.signIn(mail, oldPassword)
        const user = auth().currentUser;
        user.updatePassword(newPassword)
            .then(() => {
                console.log("Update successed!");
                this.SignOut();
                Alert.alert('Library Manager',
                'Updated'); 
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    // Reset password

    async ResetPass(mail) {
        await auth().sendPasswordResetEmail(mail)
            .then(() => {
                Alert.alert("Library App ", "Please check your mail!");
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/user-not-found') {
                    Alert.alert("Library App ", "User not found!");
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert("Library App ", "Invalid Email");
                }
            });
    }

    //Lấy user name
    GetUserName() {
        const user = auth().currentUser;
        if (user)
            return user.displayName;
    }
    //Log out
    SignOut() {
        auth().signOut().then(() => { console.log("Log out successed!") })
    };
    //#endregion

    //#region Data method
    //PS: Query is a array EX: query =  ["day", "==", "10/06/2002"]
    // GetData from database
    async getData(collection, query?) {
        let temp = []
        if (query) {
            const data = await firestore()
                .collection(collection)
                .where(query[0], query[1], query[2])
                .get()
            data.forEach(doc => {
                temp.push(doc.data())
            })
        }
        else {
            const data = await firestore()
                .collection(collection)
                .get()
            data.forEach(doc => {
                temp.push(doc.data())
            })
        }
        return temp;
    }
    // Push data to database
    async pushData(collection, data) {
        await firestore()
            .collection(collection)
            .add(data)
            .then(() => {
                console.log('User added!');
            });
    }
    // UpdateData
    async UpdateData(collection, data, query) {
        const db = await firestore().collection(collection);
        var docID = "";
        await db
            .where(query[0], query[1], query[2])
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docID = doc.id;
                });
            })
        await db.doc(docID)
            .update(data)
            .then(() => {
                console.log('User updated!');
            });
    }
    // Remove data 
    async RemoveData(collection, query) {
        var docID = "";
        await firestore().collection(collection)
            .where(query[0], query[1], query[2])
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docID = doc.id;
                });
            })
        await firestore()
            .collection(collection)
            .doc(docID)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }
    //#endregion
    //#region Image method
    async pickImage(){
        let options = {
            mediaType: 'photo',
            storageOptions: {
             skipBackup: true
            }
           };
          await ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
             //console.log('User cancelled photo picker');
             this.uriImage="null";
            } else if (response.error) {
             //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
             //console.log('User tapped custom button: ', response.customButton);
            } else {
             const source = { uri : response.assets[0].uri };
             this.uriImage = source.uri;
            }
           });
    }

    async getImage(collection, imageName){
        const file = collection + '/' + this.userName + '/' + imageName + ".png";
        const url = await storage().ref(file).getDownloadURL();
        return url;
    }
    async uploadImage(collection, imageName, imagePath){
        const file = collection + '/' + this.userName + "/" + imageName + ".png"
        const reference = storage().ref(file);
        await reference.putFile(imagePath).then(async(value)=>{
            var temp = await this.getImage(collection, imageName);
            this.sourceImage = temp;
            console.log("Successed!")
        });
    }
    async deleteImage(collection, imageName){
        const file = collection + '/' + imageName + ".png";
        await storage().ref(file).delete();
    }
    //#endregion
};