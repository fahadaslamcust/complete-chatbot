import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  console.log('App loaded'); // Log to check if the component is rendering

  const sendMessage = () => {
    if (inputText.trim()) {
      console.log('Message sent:', inputText); // Log the input text

      setMessages([...messages, { key: `${messages.length}`, text: inputText }]);
      setInputText('');

      setTimeout(() => {
        console.log('Bot response:', `Bot: ${inputText}`); // Log the bot response

        setMessages(prevMessages => [
          ...prevMessages,
          { key: `${prevMessages.length}`, text: `Bot: ${inputText}` }
        ]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  message: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
