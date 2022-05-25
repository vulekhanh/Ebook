import React, { Component, useEffect, useState } from 'react';
import {Alert } from "react-native";
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getActionFromState } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

export class FirebaseManager extends Component {
    //#region data
    userName;
    // Data của Nhật ký
    dataAccount = {
        userName: "",
        email: "",
        name: "",
        gender: "",
        phoneNumber: "",
        address: "",
        status: "",
    }
    // Data của chỉ số sức khỏe
    dataUserBorrow = {
        mail: "",
        idTicket: "",
    }
    // Data của thông tin người dùng
    dataBorrowDetail = {
        idTicket: "",
        email: "",
        idBook: "",
        amount: "",
        borrowDate: "",
        returnDate: "",
    }
    // Data của bảng thống kê
    dataBook = {
        idBook: "",
        bookCover: "",
        bookName: "",
        author: "",
        stock: "",
        genre: "",
        numberPage: "",
        descripsion: "",
        rating: "",
        read: "",
    }
    //#endregion

    constructor(props) {
        super(props)
        this.userName = this.GetUserName();
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
                console.log("Sign in succesed");
            })
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/wrong-password') {
                    Alert.alert("Health Trangking ","Sai mật khẩu");
                }
                if (error.code === 'auth/user-not-found') {
                    Alert.alert("Health Trangking ","Mail sai hoặc chưa được đăng kí");
                }
                if(error.code === "auth/invalid-email"){
                    Alert.alert("Health Trangking ","Mail không đúng định dạng");
                }
            });
    };
    // Đăng kí tài khoảng với mail và pass
    singUp(userName, mail, pass) {
        auth().createUserWithEmailAndPassword(mail, pass)
            .then((res) => {
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: userName
                })
                Alert.alert("Health Trangking ","Đăng kí thành công");
                const data = this.dataAccount;
                data.email = mail;
                data.userName = userName;
                this.userName = userName;
                this.AddDataRandomDoc("Account",data);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("Health Trangking ","Mail đã có người sử dụng");
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert("Health Trangking ","Mail không hợp lệ");
                }
            })
    }
    //Thay đổi password của user hiện tại
    ChangePassword(mail, oldPassword, newPassword) {
        this.signIn(mail, oldPassword)
        const user = auth().currentUser;
        user.updatePassword(newPassword)
            .then(() => {
                console.log("Update succesed");
                this.SignOut();
            })
            .catch(error => {
                console.log(error)
            })
    }
    // Reset password

    async ResetPass(mail){
        await auth().sendPasswordResetEmail(mail)
        .then(()=>{
            Alert.alert("Health Trangking ","Vui lòng kiểm tra hòm thư");
        })
        .catch(error =>{
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                Alert.alert("Health Trangking ","Mail chưa đăng ký");
            }
            if (error.code === 'auth/invalid-email') {
                Alert.alert("Health Trangking ","Mail không hợp lệ");
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
        auth().signOut().then(() => { console.log("Log out succesed") })
    };
    //#endregion
    
    //#region upload and get file firebase
    // Lấy data với query return List data
    async getData(collection, query?) {
        let temp = []
        const data = await firestore()
            .collection(collection)
            // Filter results
            .where('userName', '==', this.userName)
            .where(field, operators, value)
            .get()
        data.forEach(doc => {
            temp.push(doc.data())
        })
        return temp;
    }
    // Lấy data với collection
    async getDataWithCollection(collection) {
        let temp = []
        const data = await firestore()
            .collection(collection)
            .where('userName', '==', this.userName)
            .get()
        data.forEach(doc => {
            temp.push(doc.data())
        })
        return temp;
    }
    // Thêm dữ liệu lên database với document ngẫu nhiên
    async AddDataRandomDoc(collection, data) {
        data.userName = this.userName;
        await firestore()
            .collection(collection)
            .add(data)
            .then(() => {
                console.log('User added!');
            });
    }
    // Cập nhập dữ liệu lên database
    // Query là 1 mảng (có thể có hoặc ko) VD: ["name", "==", "Firebase"]
    async UpdateData(collection, data, query?) {
        data.userName = this.userName;
        const db = await firestore().collection(collection);
        var docID = "";
        if (query) {
            await db
                .where("userName", '==', this.userName)
                .where(query[0], query[1], query[2])
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        docID = doc.id;
                    });
                })
        }
        else {
            await db
                .where("userName", '==', this.userName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        docID = doc.id;
                    });
                })
        }
        await db.doc(docID)
            .update(data)
            .then(() => {
                console.log('User updated!');
            });
    }
    // Xóa dữ liệu database 
    RemoveData(collection, document) {
        firestore()
            .collection(collection)
            .doc(document)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }
    async getImage(collection, imageName){
        const file = this.userName + '/' + collection + '/' + imageName + ".png";
        const url = await storage().ref(file).getDownloadURL();
        return url;
    }
    async uploadImage(collection, imageName, imagePath){
        const file = this.userName + '/' + collection + '/' + imageName + ".png"
        const reference = storage().ref(file);
        await reference.putFile(imagePath).then(()=>{
            console.log("success!")
        });
    }
    async deleteImage(collection, imageName){
        const file = this.userName + '/' + collection + '/' + imageName + ".png";
        await storage().ref(file).delete();
    }
    //#endregion
};