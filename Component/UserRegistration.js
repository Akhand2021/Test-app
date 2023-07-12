import React, { FC, ReactElement, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  successMessage,
  Text,
  FormLable,
} from "react-native";
import axios from "axios";
import * as Device from "expo-device";
import tw from "twrnc";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function UserRegistration({navigation}) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorName, setErrorName] = useState("");
 const [successMessage, setSuccess] = useState("");

  const register = (name, email, password ) => {
    setSuccess("");
    if (!email && !password && !name) {
      alert("Please fill all required fields");
    } else {
      axios
        .post(`http://10.0.2.2:8000/api/register`, {
          name: name,
          email: email,
          password: password,
          devicename: Device.modelName,
        })
        .then((response) => {
          // console.log(response.data);
          if(response.data.message){
            setErrorEmail(response.data.message.email);
            setErrorPassword(response.data.message.password);
            setErrorName(response.data.message.name);
          }else{
            setSuccess("Registration Successfull");
            setemail("");
            setPassword("");
            setname("");
            setErrorEmail("");
            setErrorPassword("");
            setErrorName("");
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Register</Text>
        {successMessage && (
            <Text style={tw`bg-green-400 p-2 font-semibold text-center rounded-md text-Green-500`}> {successMessage} </Text>
          )}
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg font-semibold mb-1`}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder={"Name"}
            onChangeText={(text) => setname(text)}
            autoCapitalize={"none"}
          />
          {errorName && (
            <Text style={tw`bg-red-100 font-semibold text-red-500 my-2`}> {errorName} </Text>
          )}
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg font-semibold mb-1`}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder={"Email"}
            onChangeText={(text) => setemail(text)}
            autoCapitalize={"none"}
          />
          {errorEmail && (
            <Text style={tw`bg-red-100 font-semibold text-red-500 my-2`}> {errorEmail} </Text>
          )}
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg font-semibold mb-1`}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder={"Password"}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          {errorPassword && (
            <Text style={tw`bg-red-100 font-semibold text-red-500 my-2 `}>
              {errorPassword}
            </Text>
          )}
        </View>
        <Button
          title={"Sign Up"}
          onPress={() => {
            register(name, email, password);
          }}
        />
        <View style={styles.button}>
          <Button
            style={tw`bg-indigo-500`} primary={false}
            title={"Login"}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    paddingLeft: 10,
  },
  textWrapper: {
    marginTop: 100,
    padding: 30,
  },
  text: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
  },
});
