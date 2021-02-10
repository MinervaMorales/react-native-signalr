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
    .withUrl("http://45.66.156.160:8443/chatHub")
    .configureLogging(LogLevel.Debug)
    .build();

    

    constructor(){
      super();
      this.state = {
        messages: [],
        inputMessage:{}
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

      const msgInputHandler=(text)=>{
        var json={
          "id":0,
          "from":"local",
         
          "message":text
        }
        this.setState({inputMessage:[this.state.inputMessage,json]})
      }

      const msgSendHandler=()=>{
        console.log(this.state.inputMessage)
        //this.setState({messages:[...this.state.messages,this.state.inputMessage[1]]})
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.inputMessage[1])
      };
      fetch('http://45.66.156.160:8443/weatherforecast/write', requestOptions)
          .then(response => response.json())
          //.then(data => this.setState({ postId: data.id }));
        
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
              value={this.text}
            />
            <Button title="send" onPress={msgSendHandler}/>
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
