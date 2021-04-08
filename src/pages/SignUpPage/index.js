import React from 'react'
import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import {
  Container,
  WelcomeText,
  Input,
  InputLabel,
  InputContainer,
  TextInput,
  Line,
  PickerContainer,
  Option,
  OptionLabel,
  Pickerr,
  Newsletter,
  NewsletterText,
  Button,
  ButtonText,
  Check,
  ImageContainer,
  ImageTextContainer,
  ImageText,
} from './styles';
import { useState } from 'react';
import {signUp} from '../../api/signup';
import * as ImagePicker from 'expo-image-picker';

const SignUpPage = ({navigation}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [image, setImage] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (password != confirmation) {
      Alert.alert('Password and confirmation are not the same.');
    } else{
      signUp(name, email, user, password, gender, region, newsletter, navigation, image);
    }

    setPassword('');
    setConfirmation('');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Erro','Desculpe, precisa permitir o acesso às suas fotos para isso!');
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.5,
          });
          if (!result.cancelled) {
            setImage(result.uri);
          }
        }
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}}>

        <Container>
          <WelcomeText>
          Bem vinde ao Nicho! Vamos recolher suas informações básicas e logo logo você poderá personalizar melhor aquilo que quer ver no app :)
          </WelcomeText>

          {
          image !== '' &&
          <ImageContainer onPress={pickImage} >
            <Image source={{ uri: image }} style={{ width: 150, height: 150 }}/>
          </ImageContainer>
          }

          <ImageTextContainer onPress={pickImage} >
            <Feather name="edit-2" size={14} color="#019B92" />
            <ImageText>
              {image === '' ? 'Adicionar' : 'Alterar'} foto de perfil
            </ImageText>
          </ImageTextContainer>

          <Input>
            <InputLabel>Nome completo</InputLabel>
            <InputContainer>
              <TextInput 
                value={name}
                onChangeText={(name) => setName(name)}/>
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Endereço de e-mail</InputLabel>
            <InputContainer>
              <Feather name="mail" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)} />
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Nome de usuário</InputLabel>
            <InputContainer>
              <Feather name="at-sign" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput 
                value={user}
                onChangeText={(user) => setUser(user)}/>
            </InputContainer>
          </Input>

          <Line />

          <Input>
            <InputLabel>Senha</InputLabel>
            <InputContainer>
              <Feather name="lock" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true} />
              <Feather name="eye" style={{marginRight: 5}} size={16} color="#707070" />

            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Confirmação de senha</InputLabel>
            <InputContainer>
              <Feather name="lock" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput 
                value={confirmation}
                onChangeText={(confirmation) => setConfirmation(confirmation)}
                secureTextEntry={true}/>
              <Feather name="eye-off" style={{marginRight: 5}} size={16} color="#707070" />
            </InputContainer>
          </Input>

          <Line />

          <PickerContainer>

            <Option style={{marginRight: 16}}>
              <OptionLabel>Região</OptionLabel>
              <Pickerr
                selectedValue={region}
                onValueChange={(itemValue, itemIndex) =>
                  setRegion(itemValue)
                }>
                <Pickerr.Item label="selecionar..." value={null} />
                <Pickerr.Item label="Distrito Federal" value="DF" />
                <Pickerr.Item label="Bahia" value="BA" />
              </Pickerr>
            </Option>
            <Option>
              <OptionLabel>Gênero</OptionLabel>
              <Pickerr
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) =>
                  setGender(itemValue)
                }>
                <Pickerr.Item label="selecionar..." value={null} />

                <Pickerr.Item label="Masculino" value="M" />
                <Pickerr.Item label="Feminino" value="F" />
                <Pickerr.Item label="Outro" value="O" />
              </Pickerr>
            </Option>
          </PickerContainer>
          
          <Newsletter onPress={() => setNewsletter(!newsletter)}>
            <Check style={{borderColor: newsletter ? '#019B92' : '#C4C4C4'}} onPress={() => setNewsletter(!newsletter)}>
              {newsletter ? <Feather name="check-square" size={18} color="#019B92" /> : <Feather name="square" size={18} color="#C4C4C4" />}
            </Check>
            
            <NewsletterText>quero receber novidades do Nicho no meu email</NewsletterText>
          </Newsletter>

          <Button onPress={handlePress}>
            <ButtonText>Criar conta</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpPage
