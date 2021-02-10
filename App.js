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


class App extends React.Component {

  _hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/chatHub")
    .configureLogging(LogLevel.Debug)
    .build();

    

    constructor(){
      super();
      this.state = {
        messages: [],
      };
    }

    componentDidMount(){
      
      

      this._hubConnection.start().then(a => {
        console.log('Connected rafa');
      });
      this._hubConnection.on('ReceiveMessage', message => {
        console.log(message);
        
        this.setState({messages:[...this.state.messages,message]})
        
      });

      this._hubConnection.on('ReceiveStores', stores => {
        console.log(stores);
      });
    }

    render(){

      const msgInputHandler=(enteredMessage)=>{
        var json={
          "from":"local",
          "to":"self",
          "message":enteredMessage
        }
        this.setState({messages:[...this.state.messages,json]})
      }


      return (
        <View style={styles.container}>
          
          <FlatList
            data={this.state.messages}
            keyExtractor={(item, id) => {
            return  id.toString();
            }}
            renderItem={itemData=>
            <View>
              <Text >
                From : {itemData.item.from}
              </Text>
              <Text >
                To: {itemData.item.to}
              </Text>
              <Text>
                Message:{itemData.item.message}
              </Text>
            </View>
            }
          />
          <View>
            <TextInput
              placeholder="Write here..."
              onChangeText={msgInputHandler}
              value={this.enteredMessage}
            />
            <Button title="send" onPress={msgInputHandler}/>
          </View>
          <StatusBar style="auto" />
        </View>
      );
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;
