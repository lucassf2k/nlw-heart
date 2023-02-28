import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { styles } from './styles';

import { Button } from '../Button';
import { COLORS } from '../../theme';

import { api } from '../../services/api';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit(){
    const messageFormatted = message.trim();
    
    if (messageFormatted.length > 0){
      setSendingMessage(true);
      await api.post('/messages', { message: messageFormatted });

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');
    } else {  
      Alert.alert('Por favor, escreva uma mensagem!');
    }
  }

  return (
    <View style={styles.constainer}>
      <TextInput 
        keyboardAppearance="dark"
        placeholder="Qual a sua espectativa para o DoWhile?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}