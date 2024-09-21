import React, { useState } from 'react';    
import { View, Text, TextInput, Button, ScrollView, StyleSheet,Image } from 'react-native';
import axios from 'axios';   
const ChatBot = () => {   
  const [message, setMessage] = useState('');   
  const [shoes, setShoes] = useState([]);   
  const handleSendMessage = async () => { 
    console.log("I am handling send message")  
    try {   
      const result = await axios.post(`https://db86-34-80-121-33.ngrok-free.app/api/shoes?q=${message}`);   
      setShoes(result.data);  // Set the result data
    } catch (error) {   
      console.error(error);   
    }   
  };   
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shoe Store Chatbot</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type a message"
          style={styles.input}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
      <ScrollView style={styles.chatContainer}>
        {shoes.map(shoe => (
          <View key={shoe.id} style={styles.chatBubble}>
            <Text style={styles.chatText}>
              {shoe.name}: ${shoe.price}
              <Text style={styles.chatDescription}>
                {'\n'}Description: {shoe.message}
              </Text>
            </Text>
            <Image
              source={{ uri: shoe.image }}
              style={styles.chatImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  chatContainer: {
    marginTop: 20,
  },
  chatBubble: {
    marginBottom: 20,
  },
  chatText: {
    fontSize: 16,
  },
  chatDescription: {
    fontSize: 14,
    color: '#666',
  },
  chatImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
  },
});
export default ChatBot;