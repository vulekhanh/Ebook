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
function AccountList(props) {
    const manager = new FirebaseManager();
    const [isAdmin, setIsAdmin] = useState(false);
    const [data, setData] = useState([
        {
            name: 'Nguyen Van A',
            url: 'https://i.pravatar.cc/300',
            status: 'Borrowing',
            website: 'https://edition.cnn.com',
            phoneNumber: '0983652844',
            
        },
        {
            name: 'Nguyen Van B',
            url: 'https://i.pravatar.cc/301',
            status: 'Borrowing',
            
            website: 'https://huands.abc.com',
            phoneNumber: '0983652844',
            
        },
        {
            name: 'Nguyen Van C',
            url: 'https://i.pravatar.cc/307',
            status: 'Borrowing',
            website: 'https://huands.abc.com',
            phoneNumber: '0983652844',
        },
        {
            name: 'Nguyen Van D',
            url: 'https://i.pravatar.cc/323',
            status: 'Not Borrow',
            website: 'https://www.uiuds.com',
            phoneNumber: '0983652844',
        },
        {
            name: 'Nguyen Van E',
            url: 'https://i.pravatar.cc/304',
            status: 'Giveback late',
            website: 'https://edition.sabc.com',
            phoneNumber: '0983652844',
        },
        {
            name: 'Abc xyz',
            url: 'https://i.pravatar.cc/305',
            status: 'Giveback late',
            
            website: 'https://www.food.com/',
            phoneNumber: '0983652844',
        }
    ])
    //const [data, setData] = useState([])
    const [isRender, setIsRender] = useState(false);
    useEffect(async () => {
        var temp = await manager.getData("Account", ["email", "==", manager.userName]);
        setIsAdmin(temp[0].isAdmin);
        if (temp[0].isAdmin) {

        }
        else {
            var dataTemp = await manager.getData("BorrowDetail", ["email", "==", manager.userName]);
            // var temp = [1,4,2]
            // temp.forEach(async (value)=>{
            //     var test = await manager.getData("Books",["id", "==", value]);
            //     console.log(test);
            //     setData(value => [...value, test[0]]);
            // })
            setData(dataTemp);
            setIsRender(true);
        }
    }, [])
    const [searchText, setSearchText] = useState('')
    const renderBorrow = ({ item }) => {
        return (
            <TouchableOpacity>
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
                            color : "#ffffff",
                            width: '90%',
                        }}>ID Ticket: {item.idTicket}</Text>
                        <Text style={{
                            fontSize: 17,
                            color : "#ffffff99",
                            fontFamily: 'Roboto-Italic'
                        }}>Number of Books: {item.amount}</Text>
                        <Text style={{
                            fontSize: 17,
                            color : "#ffffff99",
                            fontFamily: 'Roboto-Italic'
                        }}>Date borrow: {item.borrowDate}</Text>
                        <Text style={{
                            color : "#ffffff99",
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
            <View style = {{flex : 1}}>
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
                            onPress={() => {
                                alert(`You press item's name: ${item.name}`)
                            }}
                            account={item}
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
            <View style={{ flex: 1 }}>
                {isRender ?
                    <FlatList
                        data={data}
                        renderItem={renderBorrow}
                    />
                    :
                    null}
            </View>
        }
    </SafeAreaView>
}
export default AccountList;