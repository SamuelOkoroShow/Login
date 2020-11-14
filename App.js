import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/login'
import Register from './app/register'

export default function App() {
	let [register, setRegister] = useState(false)
  return (
    <View style={{flex:1}}>
      {(register)?<Register register = {setRegister} />:<Login register = {setRegister} />}
      <StatusBar hidden style="auto" />
    </View>
  );
}


