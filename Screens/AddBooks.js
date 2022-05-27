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
    ScrollView
} from 'react-native'
import { FirebaseManager } from './FirebaseManager';

const AddBooks = ({ navigation }) => {
    const manager = new FirebaseManager();
    const [dataBooks, setDataBooks] = useState(manager.dataBook);
    const [isImage, setIsImage] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const AddNewBook = async () => {
        var nameImageBook = dataBooks.bookName;
        var temp = await manager.uploadImage("Books", nameImageBook, imageSource);
        dataBooks.bookCover = manager.sourceImage;
        manager.pushData("Books", dataBooks);
        navigation.replace("Home");
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
                >ID books :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.id = parseInt(value)}
                />
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
                >Description :</Text>
                <TextInput
                    style={styles.inputInfo}
                    onChangeText={value => dataBooks.description = value}

                />
                <View style = {{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style = {{flex : 2}}>
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
                    </View>
                    <TouchableOpacity
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
                            marginRight : 20,
                            //flex : 1,
                        }}>
                        {isImage ?
                            <Image
                                source={{ uri: imageSource }}
                                style={{ height: 150, width: 120, borderRadius: 20 }}
                                resizeMode='cover'
                            />
                            :
                            <Image
                                source={require('../assets/icons/add-image.png')}
                                style={{ height: 50, width: 50, }}
                            />
                        }
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    const buttonSection = () => {
        return (
            <View style={{ alignItems: 'center', margin: 20 }}>
                <TouchableOpacity
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
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {Header()}
            {InfoBooks()}
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
        color: "#424BAF",
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputInfo: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        width : "90%",
        alignItems: 'center',
    },
})

export default AddBooks;