import * as firebase from "firebase";

const openChat = (navigation, uid1, uid2, name1, name2, threads) => {
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