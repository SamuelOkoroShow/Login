import React, {useState} from 'react';
import {Image, View, ScrollView, TextInput, Dimensions, TouchableOpacity, StyleSheet, Text} from 'react-native'
import logo from './images/logo.png'
import sign_in_progress from './images/sign_in_progress.png'
import sign_in_button from './images/sign_in_button.png'
const windowWidth = Dimensions.get('window').width;
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

const EMAILMARGIN = 20
const EMAILWIDTH = windowWidth - (EMAILMARGIN*2)
const BORDERCOLOR1 = '#141B27'
const BORDERCOLOR2 = '#3f1324'



const Login = (props) => {
	const [warning, setwarning] = useState("")
	const [warning2, setwarning2] = useState("")
	let [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [secure, setSecure] = useState(true)

	validateEmail = (email) => {
		//console.log(email)
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(re.test(String(email).toLowerCase()))
    
    return re.test(String(email).toLowerCase());
}

const onChangeText = (val) => {
	//console.log(val)
	setEmail(val)
	if(!validateEmail(val)){
		setwarning('Invalid email')
	}else{
		setwarning("")
	}
}

const onPasswordChange = (val) => {
	setPassword(val)
	if (val.length < 6) {
		setwarning2("Password must be at least 6 characters")
	}else{
		setwarning2("")
	}
}

const toggleSecure = () => {
	setSecure(!secure)
	console.log(!secure)
}

const login = () => {
	auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}

  return (
    <View style={styles.container}>
    <ScrollView>
    <Image source = {logo} resizeMode = "contain" style={{width:155, height:13, alignSelf:'center', margin:70}} />
    <View style={styles.progress_bar}>
	    <TouchableOpacity style={styles.progress_touch}>
		    <Text style={styles.active_view_text}>
		    SIGN IN
		    </Text>
	    </TouchableOpacity>
	    <Image source = {sign_in_progress} resizeMode = "contain" style={{width:185, marginHorizontal:10}} />
	    <TouchableOpacity onPress={() => 																																props.register(true)} style={styles.progress_touch}>
		    <Text style={styles.inactive_view_text}>
		    SIGN UP
		    </Text>
	    </TouchableOpacity>
    </View>
    <View style={{width:EMAILWIDTH, marginBottom:40, marginHorizontal:EMAILMARGIN}}>
		<Text style={{marginBottom:10, fontSize:12, color:"#2e485b"}}>Email</Text>
		<View style={{borderBottomWidth:1, borderColor:BORDERCOLOR1}}>
		<View style={{alignItems:'center',flexDirection:'row', width:EMAILWIDTH}}>
		<TextInput blurOnSubmit={false} 
		onChangeText={(text) => onChangeText(text)} 
		value ={email} 
		selectionColor="#08060d"placeholder="Email" 
		placeholderTextColor='#2e485b' 
		style={styles.textInput} />
		<View style = {{width:20, height:18}} />
		</View>
		<Text style={{color:"#902642", fontSize:11,}}>{warning}</Text>
		</View>
	</View>
    <View style={{width:EMAILWIDTH, marginBottom:40, marginHorizontal:EMAILMARGIN}}>
		<Text style={{marginBottom:10, fontSize:12, color:"#2e485b"}}>Password</Text>
		<View style={{borderBottomWidth:1, borderColor:BORDERCOLOR1}}>
		<View style={{alignItems:'center',flexDirection:'row', width:EMAILWIDTH}}>
		<TextInput
			onChangeText={(text) => onPasswordChange(text)} 
		 value={password} secureTextEntry = {secure} placeholder="Password" placeholderTextColor='#2e485b' style={styles.textInput} />
		<TouchableOpacity onPress = {toggleSecure} style={{width:20, height:20, alignItems:'center', justifyContent:'center'}} >
		<AntDesign name={'eyeo'} size={20} color="#2e485b" />
		</TouchableOpacity>
		</View>
		<Text style={{color:"#902642", fontSize:11,}}>{warning2}</Text>
		</View>
	</View>
			<View style={{flex:1, marginHorizontal:EMAILMARGIN, flexDirection:'row', marginBottom:50, justifyContent:'space-between'}}>
				<TouchableOpacity onPress = {login}>
					<Image source = {sign_in_button} resizeMode="contain" style={{width:139, height:56}} />
				</TouchableOpacity>
				<TouchableOpacity style={{width:139, height:56, justifyContent:'center', alignItems:'center'}}>
					<Text style={{color:"#2e485b"}}>Forgot password?</Text>
				</TouchableOpacity>
			</View>
			</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08060F',
  },
  progress_bar:{
  	height: 32,
  	width:EMAILWIDTH,
  	marginHorizontal:EMAILMARGIN,
  	flexDirection:'row',
  	alignSelf:'center',
  	justifyContent:'space-between',
  	alignItems:'center',
  	marginBottom:50,
  },
  textInput:{
  	fontSize:15,
  	borderWidth:0,
  	flex:1,
  	color:'#849fb2'
  },
  progress_touch:{
  	alignItems:'center',
  	justifyContent:'center'
  },
  active_view_text:{
  	color:'#adbfce',
  	fontSize:12
  },
  inactive_view_text:{
  	color:"#192330",
  	fontSize:12
  }
});

export default Login;