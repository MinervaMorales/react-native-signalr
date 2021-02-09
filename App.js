import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';


class App extends React.Component {

  _hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44353/chatHub")
    .configureLogging(LogLevel.Debug)
    .build();

    componentDidMount(){
      this._hubConnection.start().then(a => {
        console.log('Connected rafa');
      });
      this._hubConnection.on('ReceiveMessage', message => {
        console.log("message",message);
      });

      this._hubConnection.on('ReceiveStores', stores => {
        console.log(stores);
      });
    }

    render(){
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
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
