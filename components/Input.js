import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import {Message} from './Message';


import { StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput,
  ScrollView,
  FlatList} from 'react-native';


const Input = props=> {
    const [enteredText,setEnteredText]=useState('')
    const msgInputHandler=(enteredText)=>{
        console.log(enteredText)
       /* var json={
            "id":0,
            "from":"local",
            "message":enteredText
            }*/
          setEnteredText(enteredText)
    }
    return(
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Write here..."
              onChangeText={msgInputHandler}
              value={enteredText}
            />
            <Button style={styles.button}title="send" onPress={props.addMessage.bind(this,enteredText)}/>
          </View>
        );
}


const styles=StyleSheet.create({
    input:{
        width:'87%',
        borderColor: 'black',
        borderWidth:1,
        padding:10
        
         },
    inputContainer:{
    
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignContent:'center'
      },


});

export default Input;