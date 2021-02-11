import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import {Message} from './Message';
import Input from './components/Input';

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
    //.withUrl("http://45.66.156.160:8443/chatHub")
    .configureLogging(LogLevel.Debug)
    .build();

    

    constructor(){
      super();
      this.state = {
        messages: []
        
      };
    }

    componentDidMount(){
      
      

      this._hubConnection.start().then(a => {
        console.log('Connected rafa');
      });
      this._hubConnection.on('SendAsync', message => {
        console.log(message);
        this.setState({messages:[...this.state.messages,message]})
        
      });

      this._hubConnection.on('ReceiveStores', stores => {
        console.log(stores);
      });
    }

    render(){

      

      const msgSendHandler=(msg)=>{
        console.log(this.state.inputMessage)
        //this.setState({messages:[...this.state.messages,this.state.inputMessage[1]]})
        var json={
          "id":0,
          "from":"local",
          "message":msg
          }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json)
      };
      fetch('https://localhost:5001/api/Chat/sendBroadCast', requestOptions)
     //fetch('http://45.66.156.160:8443/weatherforecast/write', requestOptions)
          .then(response => response.json())
          //.then(data => this.setState({ postId: data.id }));
        
      }


      return (
        <View style={styles.container}>
          <View style={styles.containerLists}>
            <FlatList
              
              data={this.state.messages}
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
          <Input addMessage={msgSendHandler}/>
          <StatusBar style="auto" />
        </View>
      );
    }
 
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
  containerLists: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'black',
    borderWidth:1,
    borderRadius:10
  },
  button:{
    width:'100%'
  },
  
 
  listItems:{
    flex:2,
    padding:10,
    width:'100%',
    marginVertical:10,
    backgroundColor:"yellow",
    borderRadius:10
    
  }
});


export default App;
