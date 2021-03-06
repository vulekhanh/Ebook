import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import { FirebaseManager } from './FirebaseManager';
//import { colors,theme } from '../constants';
//import Icon from 'react-native-vector-icons/FontAwesome5';

function _getColorFromStatus(status) {
    /*
    if(status.toLowerCase().trim() == 'opening now') {
        return colors.success
    } else if(status.toLowerCase().trim() == 'closing soon') {
        return colors.alert
    } else if(status.toLowerCase().trim() == 'comming soon') {
        return colors.warning
    }
    return colors.success
    */
    return status.toLowerCase().trim() == 'borrowing' ? 'green' :
            (status.toLowerCase().trim() == 'not borrow' ? 'red' : 
            (status.toLowerCase().trim() == 'giveback late' ? 'darkorange' : 'green'))
}
function AccountItem(props) {
    //destructuring an object
    const manager = new FirebaseManager();
    const [data,setData] = useState(props.data) 
    debugger
    return ( <TouchableOpacity 
        onPress={props.PressUser}
        style={{
        height: 150,                 
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: 'row'
    }}>
        <Image 
            style={{
                width: 130, 
                height: 110,
                resizeMode: 'cover',
                borderRadius: 10,
                marginRight: 15
            }}
            source={{
                uri: data.avatar
        }} />
        <View style={{                    
            flex: 1,
            marginRight: 10,
            //backgroundColor:'black',
        }}>
            <Text style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold'
            }}>{data.name}</Text>
            <View style={{
                height: 1,
                backgroundColor: 'grey',                        
            }} />
            
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    color: 'white',
                    fontSize: 13,
                }}>Status: </Text>
                <Text style={{
                    color: _getColorFromStatus(data.status),
                    fontSize: 13,
                }}>{data.status.toUpperCase()}</Text>
            </View>
            <Text style={{
                    color: 'white',
                    fontSize: 13,
            }}>Email: {data.email}</Text>
            {/* <Text style={{
                    color: 'white',
                    fontSize: 13,
            }}>Gender: {gender} </Text> */}
            <Text style={{
                    color: 'white',
                    fontSize: 13,
            }}>Phone : {data.phoneNumber} </Text>
            
            {/* <View style={{
                flexDirection: 'row'
            }}>
                {socialNetworks['facebook'] != undefined  && <Icon 
                    style={{paddingEnd: 5}}
                    name='facebook' size={18} 
                    color={colors.inactive} />}
                {socialNetworks['twitter'] != undefined  && <Icon 
                    name='twitter' 
                    style={{paddingEnd: 5}}
                    size={18} 
                    color={colors.inactive} />}
                {socialNetworks['instagram'] != undefined  && <Icon 
                    name='instagram' 
                    size={18} 
                    color={colors.inactive} />}
            </View> */}
        </View>                
    </TouchableOpacity>)
}
export default AccountItem;