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
import { colors,theme } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    let { 
        name, 
        id, 
        socialNetworks, 
        status, 
        url, 
        website,         
    } = props.account //destructuring an object    
    const {onPress} = props
    debugger
    return ( <TouchableOpacity 
        onPress={onPress}
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
                uri: url
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
            }}>{name}</Text>
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
                    color: _getColorFromStatus(status),
                    fontSize: 13,
                }}>{status.toUpperCase()}</Text>
            </View>
            <Text style={{
                    color: 'white',
                    fontSize: 13,
            }}>Id: {id} </Text>
            <Text style={{
                    color: 'white',
                    fontSize: 13,
            }}>So sach dang muon: 3 </Text>
            <Text style={{
                    color: 'white',
                    fontSize: 13,
            }}>Gmail: {website}</Text>
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