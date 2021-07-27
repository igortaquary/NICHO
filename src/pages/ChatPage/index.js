import React, {useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Separator from '../../components/Separator';
import * as firebase from "firebase";
import { SearchContainer } from './styles';
import { Avatar } from 'react-native-elements';
import "firebase/firestore";
import { useUserContext } from '../../contexts/userContext';
import Icon from '../../components/Icon';

export default function ChatPage({ navigation }) {
    const {user, threads} = useUserContext();

    return (
        <View style={styles.container}>
          <SearchContainer>
            <Icon name='busca' size={16} color={"#707070"}/>
            <TextInput placeholder="Pesquise suas conversas" style={{marginLeft: 8, width: '100%'}} 
            returnKeyType="search" onSubmitEditing={ e => search(e.nativeEvent.text)} />
          </SearchContainer>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.userChat} onPress={() => {navigation.navigate('MensagemPage', { thread: item })}}>
                        <View style={styles.row}>
                            <View style={styles.content}>
                                <View style={styles.header}>
                                    <Avatar
                                      size="medium"
                                      rounded
                                      title={item.names.filter(name => name != user.nome)[0]}
                                      source={{ uri: item.img ? item.img : item.img1 }}
                                    />
                                </View>
                                <View style={styles.texts}>
                                  <Text style={styles.nameText}>{item.names.filter(name => name != user.nome)[0]}</Text>
                                  <Text style={styles.contentText}>
                                    {item.latestMessage.text.slice(0, 90)}
                                  </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    title: {
      marginTop: 20,
      marginBottom: 30,
      fontSize: 28,
      fontWeight: '500'
    },
    texts: {
      justifyContent: 'center',
      paddingLeft: 10
    },
    row: {
      color: 'white',
      paddingRight: 10,
      paddingLeft: 5,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    userChat: {
      backgroundColor: 'white'
    },
    content: {
      flexShrink: 1,
      flexDirection: 'row'
    },
    header: {
      padding: 10
    },
    nameText: {
      fontFamily: "Raleway_700Bold",
      fontWeight: '600',
      fontSize: 14,
      color: 'grey'
    },
    dateText: {},
    contentText: {
      fontFamily: "Raleway_300Light",
      color: '#949494',
      fontSize: 12,
      marginTop: 4
    }
  })