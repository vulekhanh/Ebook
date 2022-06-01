import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native'
import { FirebaseManager } from './FirebaseManager';
const RenderBorrowDetail = ({ route, navigation }) => {
    const manager = new FirebaseManager();
    const [data, setData] = useState(route.params.data);
    const [isAdmin, setIsAdmin] = useState(route.params.admin);
    const [dataUser, setDataUser] = useState(manager.dataAccount);
    const [dataBooks, setDataBooks] = useState([])
    useEffect(async () => {
        data.idBook.forEach(async (value) => {
            var temp = await manager.getData("Books", ["id", "==", value]);
            setDataBooks(value => [...value, temp[0]]);
        })
        setDataUser(route.params.user);
    }, [])

    const RenderHeader = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.BorderHeader}>
                    <Image
                        source={require("../assets/icons/open-book.png")}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text style={[styles.Header, { color: "#64676D" }]}> Borrow </Text>
                    <Text style={[styles.Header, { color: "#22273B" }]}>Detail </Text>
                </View>
            </View>

        )
    }

    const RenderInfo = () => {
        return (
            <View style={{flex : 1}}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.titleInfo}>Name </Text>
                    <Text style={styles.dataInfo}>: {dataUser.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.titleInfo}>Email</Text>
                    <Text style={styles.dataInfo}>: {dataUser.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.titleInfo}>Phone Number</Text>
                    <Text style={styles.dataInfo}>: {dataUser.phoneNumber}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.titleInfo}>Borrow Date</Text>
                    <Text style={styles.dataInfo}>: {data.borrowDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.titleInfo}>Return Date</Text>
                    <Text style={styles.dataInfo}>: {data.returnDate}</Text>
                </View>
            </View>
        )
    }
    const RenderBooksBorrow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('BookDetail', {
                        book: item,
                      }) 
                }}
            >
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View>
                        <Image
                            style={{ width: 60, height: 80, borderRadius: 10 }}
                            source={{ uri: item.bookCover }}
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <Text style={styles.nameBook}>{item.bookName}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const BooksBorrow = () => {
        return (
            <View style ={{flex :2}}> 
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{
                        color: "#F96D41",
                        fontSize: 25,
                        fontFamily: 'Roboto-Medium',
                        margin: 10,
                        borderBottomWidth: 2,
                        borderColor: "#F96D41"
                    }}>Books Borrowed :</Text>
                </View>
                <FlatList
                    data={dataBooks}
                    renderItem={RenderBooksBorrow}
                />
            </View>
        )
    }
    const RenderButton = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {isAdmin ? 
                    <TouchableOpacity
                        style={[styles.Button, { backgroundColor: "#C5505E" }]}
                        onPress={async () => {
                            await manager.RemoveData("BorrowDetail",["idTicket", '==', data.idTicket])
                            var dataUserBorrow = await manager.getData("BorrowDetail", ["email", "==", dataUser.email])
                            if(dataUserBorrow.length == 0){
                              var dataAccount = await manager.getData("Account", ["email", "==", dataUser.email]);
                              var dataAccountAfter = dataAccount[0]; 
                              dataAccountAfter.status = "not borrow";
                              await manager.UpdateData("Account", dataAccountAfter, ["email", "==", dataUser.email])
                            }
                            navigation.navigate("AccountList")

                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'Roboto-Medium',
                            color: "#fff",
                        }}>Delete</Text>
                    </TouchableOpacity>
                    : null}
                <TouchableOpacity
                    style={[styles.Button, { backgroundColor: "#F96D41" }]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'Roboto-Medium',
                        color: "#fff",
                    }}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    } 
    return (
        <View style={{ flex: 1, backgroundColor: '#1E1B26' }}>
            <View style = {{flex : 2}}>
                {RenderHeader()}
            </View>
            <View style = {{flex : 9}}>
                {RenderInfo()}
                {BooksBorrow()} 
            </View> 
            <View style = {{flex : 1}}>
                {RenderButton()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    BorderHeader: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 20,
        padding: 10,

    },
    Header: {
        fontFamily: "RobotoCondensed-Bold",
        fontSize: 40,
    },
    titleInfo: {
        flex: 1,
        color: "#C5505E",
        fontSize: 20,
        fontFamily: 'Roboto-Italic',
        marginTop: 10,
        marginLeft: 10,

    },
    dataInfo: {
        flex: 2,
        color: "#fff",
        fontSize: 20,
        fontFamily: 'Roboto-Medium',
        marginTop: 10,
    },
    nameBook: {
        color: "#ffffff",
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'Roboto-Bold',
    },
    author: {
        color: "#EFEFF0",
        fontSize: 15,
        marginLeft: 10,
        fontFamily: 'Roboto-Italic',
    },
    Button: {
        width: 150,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
})
export default RenderBorrowDetail;