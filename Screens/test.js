import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    TextInput,
    Button
} from 'react-native';
import { FirebaseManager } from './FirebaseManager';
import firestore from '@react-native-firebase/firestore';

const Test = () => {
    const manager = new FirebaseManager();
    const [uriImage, setUrlImage] = useState("");
    const [imagePath, setImagePath] = useState("");
    async function PressPlease(){
        const temp = await manager.uploadImage("Books", "Test1", manager.uriImage);
        setUrlImage(temp);
    }
    return (
        <View>
            <Text
                style={{ borderWidth: 1,margin:10, fontSize: 40 }}
            >
                {imagePath}
            </Text>
            <Text
                style={{ borderWidth: 1,margin:10, fontSize: 40 }}
            >
                {uriImage}
            </Text>
            <Button
                title='Pick Image'
                onPress={async ()=>{
                    await manager.pickImage();
                    setImagePath(manager.uriImage);
                }}
            />
            <Button
                style = {{margin : 10}}
                title='hello'
                onPress={PressPlease}
            />
        </View>
    )

}
export default Test;