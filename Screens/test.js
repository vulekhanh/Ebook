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
    const [data,setData] =useState(manager.dataHealthInfor);

    return (
        <View>
            <TextInput
                style={{ borderWidth: 1, margin: 10 }}
            onChangeText={(e)=> data.Weight= e}
            />
            <TextInput
                style={{ borderWidth: 1,margin:10 }}
                onChangeText={(e)=> data.Height = e}
            />

            <Text>

            </Text>
            <Button
                title='hello'
                onPress={() => {
                    // firestore()
                    //     .collection('Users')
                    //     .add({
                    //         name: 'Ada Lovelace',
                    //         age: 30,
                    //     })
                    //     .then(() => {
                    //         console.log('User added!');
                    //     });
                    manager.AddDataRandomDoc("HealthInfo",data);
                }}
            >

            </Button>
        </View>
    )

}
export default Test;