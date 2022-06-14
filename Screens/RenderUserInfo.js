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

const RenderUserInfo = ({ route, navigation }) => {
    const manager = new FirebaseManager();
    const [dataUser, setDataUser] = useState(route.params);
    const [dataUserBorrow, setDataUserBorrow] = useState([]);
    useEffect( async()=>{
        var dataBorow = await manager.getData("BorrowDetail", ["email", "==", route.params.email])
        setDataUserBorrow(dataBorow);
    },[])

    const Header = () =>{
        return(
            <View style = {{
                backgroundColor : 'darkorange',  
                alignItems : 'center', 
                //justifyContent : 'center',
                height: 100,
            }}> 
                <Text style={{
                    fontSize : 20,
                    fontFamily : "Roboto-Medium",
                    marginTop : 20,
                    color : "#fff"
                }}>Profile</Text> 
            </View>
        )
    }

    const AvatarAndName = () =>{
        return(
            <View style = {{
                alignItems : 'center',
            }}>
                <Image
                    source={{uri : dataUser.avatar}} 
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        marginTop: -40, 
                    }}
                    resizeMode = 'cover' 
                />
                <Text style={{
                    color : "#fff",
                    margin : 10,
                    fontSize : 25,
                    fontFamily : "Roboto-Bold",

                }}>{dataUser.name}</Text>
            </View>
        )
    }
    const Info = () =>{
        return(
            <View>
                <Text style={{
                    fontFamily : "Roboto-Bold",
                    color: "#F96D41",
                    margin: 10,
                    fontSize : 20,
                }}>Info : </Text>
                <View>
                    <Text style = {styles.dataInfo}>Email: {dataUser.email}</Text>
                    <Text style = {styles.dataInfo}>Phone: {dataUser.phoneNumber}</Text>
                    <Text style = {styles.dataInfo}>Gender: {dataUser.gender}</Text>
                    <Text style = {styles.dataInfo}>Address: {dataUser.address}</Text>
                </View>
            </View>
        )
    }

    const renderBooksBorrow = ({item}) =>{
        return( 
            <TouchableOpacity
                onPress={()=> navigation.navigate("RenderBorrowDetail", {data :item, admin: true, user : dataUser})} 
            >
                <View style={{ 
                    flexDirection: 'row', 
                    margin: 10, 
                    backgroundColor: "#77587799", 
                    borderRadius: 20, 
                    height: 90, 
                    alignItems: 'center' }}>
                    <View>
                        <Image
                            source={require('../assets/icons/Image_Ticket.png')}
                            style={{ width: 90, height: 90, borderRadius: 20 }}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            fontFamily: 'Roboto-Regular', 
                            fontSize: 20,
                            borderBottomWidth: 2,
                            color : "#ffffff",
                            width: '90%',
                        }}>ID Ticket: {item.idTicket}</Text>
                        <Text style={{
                            fontSize: 14,
                            color : "#ffffff99",
                            fontFamily: 'Roboto-Italic'
                        }}>Number of Books: {item.amount}</Text>
                        <Text style={{
                            fontSize: 14,
                            color : "#ffffff99",
                            fontFamily: 'Roboto-Italic'
                        }}>Date borrow: {item.borrowDate}</Text>
                        <Text style={{
                            color : "#ffffff99",
                            fontSize: 14,
                            fontFamily: 'Roboto-Italic'
                        }}>Date return: {item.returnDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const BooksBorrow = () =>{
        return(
            <View style = {{flex : 1}}> 
                <Text style={{
                    fontFamily : "Roboto-Bold",
                    color: "#F96D41",
                    margin: 10,
                    fontSize : 20,
                }}>Books : </Text>
                <ScrollView>
                <FlatList
                    data={dataUserBorrow}
                    renderItem ={renderBooksBorrow}
                    />
                </ScrollView>
            </View> 
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#1E1B26' }}>
            {Header()}
            {AvatarAndName()}
            {Info()}
            {BooksBorrow()}

        </View>
    )
}

const styles = StyleSheet.create({
    dataInfo:{
        fontSize : 20, 
        fontFamily : "Roboto-Regular", 
        padding: 10,
        borderWidth : 1,
        borderRadius : 20,
        marginLeft: 20,
        marginRight: 20, 
        margin : 2, 
        backgroundColor: "#fff",
        color: "#000",
        borderColor: '#C5505E'
    }
})

export default RenderUserInfo;
