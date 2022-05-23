import React, {useState, useEffect} from 'react';
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
/**
 - ListView from a map of objects
 - FlatList
 */
function AccountList(props) {
    //list of foods = state
    const [accounts, setAccounts] = useState([        
        {
            name: 'Nguyen Van A',
            url: 'https://i.pravatar.cc/300',
            status: 'Borrowing',
            id:123,
            // price: 5223.56,
            website: 'https://edition.cnn.com',
            socialNetworks: {
                facebook: 'https://www.facebook.com/duyvu91',
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Nguyen Van B',
            url: 'https://i.pravatar.cc/301',
            status: 'Borrowing',
            //price: 1124.56,
            id:234,
            website: 'https://huands.abc.com',
            socialNetworks: {
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Nguyen Van C',
            url: 'https://i.pravatar.cc/307',
            status: 'Borrowing',
            price: 1124.56,
            id:345,
            website: 'https://huands.abc.com',
            socialNetworks: {
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Nguyen Van D',
            url: 'https://i.pravatar.cc/323',
            status: 'Not Borrow',
            //price: 2342.56,
            id:456,
            website: 'https://www.uiuds.com',
            socialNetworks: {
                facebook: 'https://www.facebook.com/duyvu91',                    
            }
        },
        {
            name: 'Nguyen Van E',
            url: 'https://i.pravatar.cc/304',
            status: 'Giveback late',
            //price: 2354.56,
            id:456,
            website: 'https://edition.sabc.com',
            socialNetworks: {
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Abc xyz',
            url: 'https://i.pravatar.cc/305',
            status: 'Giveback late',
            //price: 5568.11,
            id:456,
            website: 'https://www.food.com/',
            socialNetworks: {
                instagram: 'https://www.instagram.com/aeisinger/'
            }
        }
    ])
    // const [categories, setCategories] = useState([
    //     {
    //         name: 'BBQ',
    //         url: 'https://images.foody.vn/BlogsContents/46444498_1785582584898023_6834569445101273088_n(1).jpg'
    //     },
    //     {
    //         name: 'Breakfast',
    //         url: 'https://herbalconcepts.com/wp-content/uploads/2019/02/6-burrito.jpeg'
    //     },
    //     {
    //         name: 'Coffee',
    //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12qcjgUCbektxgkXY2cgWu_MfPCG3-eDfWruf19VOdo45be0Xzo6pUJTQx0hW4QrO_FU&usqp=CAU'
    //     },
    //     {
    //         name: 'Noodles',
    //         url: 'https://static.toiimg.com/photo/52467119.cms'
    //     },
    //     {
    //         name: 'Hot dogs',
    //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNjeiTctEE8JCDkPBzQ9ymmBS1zMt3Mws-xo25gnbVFByCZ0NVuwiL2VZicgbS49jz7c&usqp=CAU'
    //     },
    //     {
    //         name: 'Dinner',
    //         url: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/01/22/12/dinner-table.jpg?width=1200'
    //     },
    //     {
    //         name: 'Beverages',
    //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzVkc-LPuqE-DXVUkTznfkCadCqCYzcfoBA&usqp=CAU'
    //     },
    //     {
    //         name: 'Dessert',
    //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW08jAcTeGjQRVr9NAITfKF3nbRB5RPef2VA&usqp=CAU'
    //     },
    //     {
    //         name: 'Wine',
    //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUB_gxlZAGsGjHOwSU6mIc_L4X18yTAffJT-ocG6Y-5WqZSORqytoBaMkA5qcgeC2FeZA&usqp=CAU'
    //     },
    //     {
    //         name: 'Barbecue',
    //         url: 'https://m.media-amazon.com/images/I/81s-rWYsoKL._SX466_.jpg'
    //     },        
    // ])
    const [searchText, setSearchText] = useState('')
    const filteredAccounts = () => accounts.filter(eachAccount => eachAccount.name.toLowerCase()
                                    .includes(searchText.toLowerCase()))
    return <SafeAreaView style={{flex: 1, backgroundColor: '#1E1B26'}}>
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
                        color:'white',
                        height: 40,
                        flex: 1,
                        marginEnd: 8,
                        borderRadius: 5,
                        opacity: 0.8,
                        paddingStart: 30
                    }} />
                {/* <Icon name='bars' size={30} color={'black'} /> */}
            </View>
            {/* <View style={{
                height: 100,
            }}>
                <View style={{
                    height: 1, 
                    backgroundColor: colors.inactive,                    
                }} /> */}
                {/* <FlatList 
                    horizontal
                    data={categories}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => {
                        return <TouchableOpacity
                            onPress={()=>{
                                alert(`press ${item.name}`)
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'cover',
                                    borderRadius: 25,
                                    margin: 10
                                }}
                                source={{
                                    uri: item.url
                                }} />
                            <Text style={{
                                color: 'black',
                                fontSize: fontSizes.h6 * 0.8
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    }}
                    style={{flex: 1}}>

                </FlatList> */}
                {/* <View style={{height: 1, backgroundColor: colors.inactive}} />

            </View> */}



            {/* <ScrollView>
                {foods.map(eachFood => <FoodItem 
                    food = {eachFood} key={eachFood.name}/>)}                
            </ScrollView> */}

            </View>                     
            {filteredAccounts().length > 0 ? <FlatList 
                data={filteredAccounts()}
                renderItem={({item}) => <AccountItem 
                    onPress={()=> {                        
                        alert(`You press item's name: ${item.name}`)
                    }}
                    account = {item} key={item.name}/>}
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
    </SafeAreaView>
}
export default AccountList;