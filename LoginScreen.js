import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.navigate('WelcomeScreen'); 
    } else {
      alert('Please enter your credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Paul's Restaurant</Text>
      <Image
        source={{ uri: 'https://static.takeaway.com/images/restaurants/ro/ON037O01/logo_465x320.png' }} 
        style={styles.image}
      />
      <Animatable.View animation="fadeIn" duration={1500}>
        <TextInput
          style={styles.input}
          placeholder="Username or email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#c6c6c6"
        />
      </Animatable.View>
      <Animatable.View animation="fadeIn" duration={1500} delay={500}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#c6c6c6"
        />
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1500} delay={1000}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 30,
    borderRadius: 10,
  },
  input: {
    width: '80%',
    height: 45,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF69B4', 
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
