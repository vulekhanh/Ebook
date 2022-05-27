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
    Dimensions,
    Pressable,
    ScrollView
} from 'react-native'
import { FirebaseManager } from './FirebaseManager';

const AddBooks = () => {
    const manager = new FirebaseManager();
    const [dataBooks, setDataBooks] = useState(manager.dataBook);
    const [isImage, setIsImage] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const AddNewBook = () => {
        var nameImageBook = dataBooks.bookName;
        dataBooks.bookCover = nameImageBook;
        manager.pushData("Books", dataBooks);
        manager.uploadImage("Books", nameImageBook, manager.uriImage);
    }
    const Header = () => {
        return (
            <View style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row'
            }}>
                <Image
                    source={require("../assets/icons/open-book.png")}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={styles.header}> Add </Text>
                <Text style={[styles.header, { color: "#22273B" }]}>Books</Text>
            </View>
        )
    }
    const InfoBooks = () => {
        return (
            <View style={{ paddingLeft: 30 }}>
                <Text
                    style={styles.infoTitle}
                >Name :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.bookName = value}
                />
                <Text
                    style={styles.infoTitle}
                >Author :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.author = value}
                />
                <Text
                    style={styles.infoTitle}
                >Genre :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.genre = value}
                />
                <Text
                    style={styles.infoTitle}
                >Language :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.language = value}
                />
                <Text
                    style={styles.infoTitle}
                >Page Number :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.pageNo = value}
                />
                <Text
                    style={styles.infoTitle}
                >Description :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.description = value}

                />
            </View>
        )
    }
    const ImgaeBooks = () => {
        return (
            <View style={{ alignItems: 'center', margin: 10 }}>
                <Pressable
                    onPress={async () => {
                        await manager.pickImage();
                        setImageSource(manager.uriImage);
                        setIsImage(true);
                    }}
                    style={{
                        borderWidth: 1,
                        padding: isImage ? 0 : 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 150,
                        width: 120,
                        borderRadius: 20,
                    }}>
                    {isImage ?
                        <Image
                            source={{ uri: imageSource }}
                            style={{ height: 150, width: 120, borderRadius: 20}}
                            resizeMode = 'cover'
                        />
                        :
                        <Image
                            source={require('../assets/icons/add-image.png')}
                            style={{ height: 50, width: 50, }}
                        />
                    }
                </Pressable>
            </View>
        )
    }
    const buttonSection = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Pressable
                    onPress={AddNewBook}
                    style={{
                        backgroundColor: "#22273B",
                        padding: 10,
                        borderRadius: 10,
                        width: Dimensions.get("window").width - 60,
                    }}>
                    <Text
                        style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}
                    >Add Book</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            {Header()}
            {InfoBooks()}
            {ImgaeBooks()}
            {buttonSection()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontFamily: 'Roboto-Bold',
    },
    infoTitle: {
        fontSize: 15,
        //fontFamily: "Roboto-Medium",
        color: "#424BAF",
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputInfo: {
        borderWidth: 1,
        borderRadius: 5,
        //height : 40,
        padding: 5,
        width: Dimensions.get('window').width - 60,
        alignItems: 'center',
    },
})

export default AddBooks;