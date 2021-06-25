import * as firebase from "firebase";
import {Alert} from 'react-native';

const openChat = (navigation, uid1, uid2, name1, name2, threads) => {
  console.log(uid1);
  if(uid1 === undefined) {
    Alert.alert(
      "Usuário não conectado",
      "É necessário estar logado para realizar esta ação.",
      [
        {
          text: "Entrar depois",
          onPress: () => console.log('Depois')
        },
        {
          text: "Não possuo conta",
          onPress: () => navigation.navigate('SignUp'),
        },
        {
          text: "Ir para login",
          onPress: () => navigation.navigate('Login'),
        },
      ],
      {
        cancelable: true,
      }
    );
    return;
  }
  const document = {
    names: [name1, name2],
    latestMessage: {
      text: `Nova conversa, bem-vindo!`,
      createdAt: new Date().getTime()
    },
    uid1: uid1,
    uid2: uid2
  }

  const [openedChat] = threads.filter(item => (item.uid1 == uid1 && item.uid2 == uid2) || (item.uid1 == uid2 && item.uid2 == uid1));
  console.log(threads.filter(item => (item.uid1 == uid1 && item.uid2 == uid2) || (item.uid1 == uid2 && item.uid2 == uid1)));

  if (openedChat) {
    navigation.navigate('MensagemPage', { thread: openedChat });
  } else {
    firebase.firestore()
      .collection('MESSAGE_THREADS')
      .add(document)
      .then((docRef) => {
        docRef.collection('MESSAGES').add({
          text: `Nova conversa, bem-vindo!`,
          createdAt: new Date().getTime(),
          system: true
        })
        navigation.navigate('MensagemPage', { thread: { ...document, _id: docRef.id } });
      })
  }
}

export default openChat;