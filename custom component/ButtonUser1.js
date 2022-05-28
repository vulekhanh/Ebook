import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import vector from '../assets/icons/Vector.png'
import { useNavigation } from '@react-navigation/core'
import { COLORS } from '../constants';

const ButtonUser1 = ({name}) => {
    const navigation = useNavigation()
    
  return (
      
    <View style={styles.container}>
    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate('')}>
      </TouchableOpacity>
      {name && <Text style={styles.textName}>{name}</Text>}
      <Image style={styles.icon} source={vector}/>
    </View>
    
  )
}

export default ButtonUser1

const styles = StyleSheet.create({
    container:{
        flex:1, 
    },
    TouchableOpacity:{
      backgroundColor: COLORS.lightGray2,
      width:330,
      height:50,
      marginTop:20,
      borderRadius:20,
      flexDirection:'row'
    },
    textName:{
        position:'absolute',
        
        
        fontSize:18,
        fontWeight:'bold',
        top:32,
        left:30
        
    },
    icon:{
        width:18, 
        height:18, 
        position:'absolute',
        right:30,
        top:35
        
            
    },
    
    
})