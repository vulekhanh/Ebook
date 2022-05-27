import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Button
} from 'react-native'
import { FirebaseManager } from './FirebaseManager';

const SearchBook = ({navigation}) => {
    const manager = new FirebaseManager();
    const [dataSearch, setDataSearch] = useState("");
    const [dataBooks, setDataBooks] = useState([]);
    const filteredBooks = (value) => {
       var data = dataBooks.filter(eachBook => eachBook.bookName.toLowerCase().includes(value.toLowerCase()))
       setDataSearch(data);
    }
    useEffect(async ()=>{
        var data = await manager.getData("Books");
        setDataBooks(data);    
    },[])
    const SearchBar = () => {
        return (
            <View
                style={styles.searchBar}
            >
                <Image
                    source={require("../assets/icons/search_icon.png")}
                    style={{ width: 20, height: 20, marginLeft : 10 }}
                    resizeMode="cover"
                />
                <TextInput
                    style = {{height : 50, fontSize : 20, marginLeft : 10, color: "#fff"}}
                    placeholder='Input Book title'
                    placeholderTextColor={"#FFFFFF90"}
                    onChangeText={value => filteredBooks(value)}
                />
            </View>
        )
    }
    const renderBooks = ({item}) =>{
        return(
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('BookDetail', {
                        book: item,
                      })
                }}
            >
            <View style = {{flexDirection : 'row', margin : 10}}>
                <View>
                    <Image
                        style = {{width: 60, height: 80, borderRadius: 10}}
                        source = {{uri: item.bookCover}}
                        resizeMode = "cover"
                    />
                </View>
                <View>
                    <Text style = {styles.nameBook}>{item.bookName}</Text>
                    <Text style = {styles.author}>{item.author}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    const DataSection = () => {
        return (
            <FlatList
                data={(dataSearch.length > 0) ? dataSearch : dataBooks}
                renderItem = {renderBooks}
                keyExtractor = {items => items.id}
            />
        );
    }
    return (
        <View style = {{flex : 1, backgroundColor : '#1E1B26'}}>
            {SearchBar()}
            {DataSection()}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        alignItems : 'center',
        flexDirection: 'row',
        //height : 150,
        borderRadius : 20,
        borderWidth : 1,
        margin : 10,
        backgroundColor : "#2D3038",
        borderColor: '#EFEFF0', 
    },
    nameBook:{
        color : "#ffffff",
        fontSize : 20,
        marginLeft : 10,
        fontFamily : 'Roboto-Bold',
    },
    author:{
        color: "#EFEFF0",
        fontSize : 15,
        marginLeft : 10,
        fontFamily : 'Roboto-Italic',
    },

})
export default SearchBook;