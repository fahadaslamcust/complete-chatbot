import React, { useState } from 'react';    
import { View, Text, TextInput, Button, ScrollView,Image} from 'react-native';   
import axios from 'axios';   
const ChatBot = () => {   
  const [message, setMessage] = useState('');   
  const [shoes, setShoes] = useState([]);   
  const handleSendMessage = async () => { 
    console.log("I am handling send message")  
    try {   
      const result = await axios.post(`https://2052-35-188-160-2.ngrok-free.app/api/shoes?q=${message}`);   
      setShoes(result.data);  // Set the result data
    } catch (error) {   
      console.error(error);   
    }   
  };   
  return (   
    <View style={{
      backgroundColor: '#F5F5F5',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      marginTop: 10,
      marginBottom: 5
    }}> 
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold'
        }}
        >
         Shoe Store Chatbot<br/>
        </Text> 
      <TextInput   
        value={message}   
        onChangeText={(text) => setMessage(text)}   
        placeholder="Type a message"   
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}   
      /> 
      <Button title="Send" onPress={handleSendMessage} />   
      <ScrollView style={{ marginTop: 20 }}>   
        {shoes.length > 0 && shoes.map(shoe => (
          <><Text key={shoe.id}>
            {shoe.name}:   ${shoe.price} <br/> Description:  {shoe.message}
          </Text><Image
              source={{ uri: shoe.image }}
              style={{ width: 100, height: 100, marginTop: 10 }} /></>
        ))}
      </ScrollView>   
    </View>     
  );   
};   
export default ChatBot;