import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';

import Input from './components/Input';

import { StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput,
  ScrollView,
  FlatList} from 'react-native';
import Message from './components/Message';
import PrivateMessage from './components/PrivateMessage';
import InputConnect from './components/InputConnect';
import InputServer from './components/InputServer';


class App extends React.Component {
  
 
 
 
  

    

    constructor(){
      super();
      this.state = {
        messages: [],
        privateMessages:[],
        hosts:[],
        to:''
        
      };
    }

    

     
    
      

    render(){

      const connect=(host)=>{
        
        let _hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub?username="+host)
        //.withUrl("http://45.66.156.160:8443/chatHub")
        .configureLogging(LogLevel.Debug)
        .build();
      

      _hubConnection.start().then(a => {
        console.log('Connected rafa');
        _hubConnection.invoke("GetConnectedUsers")
      });
      _hubConnection.on('ReceiveMessage', (message) => {
        console.log(message);
        this.setState({messages:[...this.state.messages,message]})
        
      });

      _hubConnection.on('GetConnectedUsers', (host) => {
      var cont=0;
      console.log(host) 
      this.state.hosts.forEach(element=>{
         if(element.message==host.message){
           cont++;
         }
       })
       if(cont==0){
         
        this.setState({hosts:[...this.state.hosts,host]})
       }
       console.log(this.state.hosts)
        
      });

      _hubConnection.on('sendToPrivateMessage', (message) => {
        console.log('privado')
        this.setState({privateMessages:[...this.state.privateMessages,message]})
      });


      
    }
     

      const msgSendHandler=(msg)=>{
       var json={
          "id":0,
          "from":"local",
          "connectionId":"a@a.com",
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
         
        }


      const msgPrivateSendHandler=(msg)=>{
        var json={
           "id":0,
           "to":this.state.to,
           "message":msg
           }
           console.log(json)
         const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(json)
         };
         fetch('https://localhost:5001/api/Chat/sendPrivate', requestOptions)
         //fetch('http://45.66.156.160:8443/weatherforecast/write', requestOptions)
           .then(response => response.json())
       }


       const toMessage=(value)=>{
         console.log('pasa por aca')
        this.setState({to:value})
       }


       


           
           
       



      return (
        <View style={styles.container}>
          <View style={styles.containerChat}>
            <View style={styles.window}>
              <Message data={this.state.messages}/>
              <Input addMessage={msgSendHandler}/>
              <StatusBar style="auto" />
            </View>
            <View style={styles.window}>
            <PrivateMessage data={this.state.privateMessages}/>
              <Input addMessage={msgPrivateSendHandler}/>
              <StatusBar style="auto" />
            </View>
          </View>
          <View>
            <InputConnect addHost={connect}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Put your serverName here..."
              onChangeText={toMessage}
              //value={enteredText}
            />
            
        </View>
          
        </View>
      );
    }
 
}

const styles = StyleSheet.create({
  containerChat:{
    flex:2,
    flexDirection: 'row'
  },
  window:{
    flex:2
  },
  container:{
    flex:1,
    flexDirection: 'column'
  },
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
});


export default App;
