import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView
} from 'react-native'
//import {colors,theme} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5'
//import AccountItem from './AccountItem';
import AccountItem from './AccountItem'
import { FirebaseManager } from './FirebaseManager';

/**
 - ListView from a map of objects
 - FlatList
 */
function AccountList({ navigation }) {
    //list of foods = state
    const manager = new FirebaseManager();
    const [isAdmin, setIsAdmin] = useState(false);
    // Store data user (not admin)
    const [dataUser, setDataUser] = useState([])
    // The data is currently up to the administrator or the user
    const [data, setData] = useState([])
    useEffect(async () => {
        var temp = await manager.getData("Account", ["email", "==", manager.userName]);
        setIsAdmin(temp[0].isAdmin);
        setDataUser(temp[0]);
        if (temp[0].isAdmin) {
            var dataTemp = await manager.getData("Account");
            dataTemp.forEach(item => {
                if (!item.isAdmin)
                    setData(value => [...value, item])
            })
        }
        else {
            var dataTemp = await manager.getData("BorrowDetail", ["email", "==", manager.userName]);
            setData(dataTemp);
        }
    }, [])
    const [searchText, setSearchText] = useState('')
    const renderBorrow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("RenderBorrowDetail", { data: item, admin: false, user: dataUser })}
            >
                <View style={{ flexDirection: 'row', margin: 10, backgroundColor: "#77587799", borderRadius: 20, height: 130, alignItems: 'center' }}>
                    <View>
                        <Image
                            source={require('../assets/icons/Image_Ticket.png')}
                            style={{ width: 130, height: 130, borderRadius: 20 }}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            fontFamily: 'RobotoCondensed-Bold',
                            fontSize: 30,
                            borderBottomWidth: 2,
                            color: "#ffffff",
                            width: '90%',
                        }}>ID Ticket: {item.idTicket}</Text>
                        <Text style={{
                            fontSize: 17,
                            color: "#ffffff99",
                            fontFamily: 'Roboto-Italic'
                        }}>Number of Books: {item.amount}</Text>
                        <Text style={{
                            fontSize: 17,
                            color: "#ffffff99",
                            fontFamily: 'Roboto-Italic'
                        }}>Date borrow: {item.borrowDate}</Text>
                        <Text style={{
                            color: "#ffffff99",
                            fontSize: 17,
                            fontFamily: 'Roboto-Italic'
                        }}>Date return: {item.returnDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const filtered = () => data.filter(eachAccount => eachAccount.name.toLowerCase()
        .includes(searchText.toLowerCase()))
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
        {isAdmin ?
            <View style={{ flex: 1 }}>
                <View>
                    <View style={{
                        marginHorizontal: 10,
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon
                            name='search'
                            size={15} color={'white'}
                            style={{
                                position: 'absolute',
                                top: 12,
                                left: 10
                            }}
                        />
                        <TextInput
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setSearchText(text)
                            }}
                            style={{
                                backgroundColor: '#282C35',
                                color: 'white',
                                height: 40,
                                flex: 1,
                                marginEnd: 8,
                                borderRadius: 5,
                                opacity: 0.8,
                                paddingStart: 30
                            }} />
                        {/* <Icon name='bars' size={30} color={'black'} /> */}
                    </View>
                </View>
                {filtered().length > 0 ? <FlatList
                    data={filtered()}
                    renderItem={({ item }) =>
                        <AccountItem
                            PressUser={() => {
                                navigation.navigate("RenderUserInfo", item)
                            }}
                            data={item}
                            key={item.name}
                        />}
                    keyExtractor={eachAccount => eachAccount.name}
                /> : <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 18
                    }}>No food found</Text>
                </View>}
            </View>
            :
            (data.length > 0 ?
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        renderItem={renderBorrow}
                    />
                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "#black", fontSize : 18 }}>No data</Text>
                </View>
            )
        }
    </SafeAreaView>
}
export default AccountList;