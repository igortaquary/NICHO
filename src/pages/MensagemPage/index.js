import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {useUserContext} from '../../contexts/userContext';
import * as firebase from "firebase";
import "firebase/firestore";

export default function Messages({ route }) {
  const { thread } = route.params;
  const { user } = useUserContext();
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsubscribeListener = firebase.firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data()
  
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          }
  
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName
            }
          }
  
          return data
        })
  
        setMessages(messages)
      })
  
    return () => unsubscribeListener()
  }, [])

  async function handleSend(messages) {
    const text = messages[0].text;
    console.log(text)
    await firebase.firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.id,
          displayName: user.nome
        }
      })
    await firebase.firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: user.id
      }}
    />
  )
}