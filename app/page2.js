import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://your-api-url.com'; // Replace with your actual backend URL

const AuthScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // AUTH SERVICE LOGIC
  const handleAuth = async (type) => {
    if (!email || !password) return Alert.alert("Error", "Please fill all fields");
    
    setIsLoading(true);
    const endpoint = type === 'login' ? '/api/login' : '/api/register';

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Output 1: userId generated (returned from your backend)
        const { token, userId } = data; 
        
        // Output 2: user session active (persist the token)
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', userId);
        
        Alert.alert("Success", `${type} successful!`);
        onLoginSuccess(); // Redirect to Home
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Connection Error", "Could not connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Custom Auth Service</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => handleAuth('login')} />
          <View style={{ marginVertical: 10 }} />
          <Button title="Sign Up" color="#2ecc71" onPress={() => handleAuth('signup')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 20, borderRadius: 8 },
  buttonContainer: { marginTop: 10 }
});

export default AuthScreen;