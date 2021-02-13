
import React, {useState} from 'react';



import { StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput,
  ScrollView,
  FlatList} from 'react-native';




const Message=props=>{
    return(

        <View style={styles.containerLists}>
    <FlatList
      
      data={props.data}
      keyExtractor={(item, id) => {
      return  id.toString();
      }}
      renderItem={itemData=>
      <View style={styles.listItems}>
        <Text >
          From : {itemData.item.from}
        </Text>
        <Text>
          Message:{itemData.item.message}
        </Text>
      </View>
      }
    />
  </View>
    );
    
}


const styles = StyleSheet.create({
    containerLists: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'black',
        borderWidth:1,
        borderRadius:10
      },
  });


export default Message; 