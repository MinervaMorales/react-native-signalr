import React, {useState} from 'react';
import { StyleSheet, 

  View, 
  Button, 
  TextInput} from 'react-native';

const InputServer=props=>{
    return(
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Put your serverName here..."
             // onChangeText={msgInputHandler}
             // value={enteredText}
            />
            
        </View>
    );
}

const styles=StyleSheet.create({
    input:{
        width:'100%',
        borderColor: 'black',
        borderWidth:1,
        padding:10
        
         },
    inputContainer:{
        
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignContent:'center'
      }
})

export default InputServer;