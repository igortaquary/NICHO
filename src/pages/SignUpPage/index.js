import React from 'react'
import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
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
  ButtonText
} from './styles';
import { useState } from 'react';

const SignUpPage = () => {

  const [gender, setGender] = useState(null);
  const [region, setRegion] = useState(null);
  const [newsletter, setNewsletter] = useState(false);


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}}>

        <Container>
          <WelcomeText>
          Bem vinde ao Nicho! Vamos recolher suas informações básicas e logo logo você poderá personalizar melhor aquilo que quer ver no app :)
          </WelcomeText>

          <Input>
            <InputLabel>Nome completo</InputLabel>
            <InputContainer>
              <TextInput />
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Endereço de e-mail</InputLabel>
            <InputContainer>
              <Feather name="mail" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput />
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Nome de usuário</InputLabel>
            <InputContainer>
              <Feather name="at-sign" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput />
            </InputContainer>
          </Input>

          <Line />

          <Input>
            <InputLabel>Senha</InputLabel>
            <InputContainer>
              <Feather name="lock" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput />
              <Feather name="eye" style={{marginRight: 5}} size={16} color="#707070" />

            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Confirmação de senha</InputLabel>
            <InputContainer>
              <Feather name="lock" style={{marginRight: 5}} size={16} color="#707070" />
              <TextInput />
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
                selectedValue={region}
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
          
          <Newsletter>
            <CheckBox
              disabled={false}
              value={newsletter}
              onValueChange={(newValue) => setNewsletter(newValue)}
              boxType='circle'
              lineWidth={1}
            />
            <NewsletterText>quero receber novidades do Nicho no meu email</NewsletterText>
          </Newsletter>

          <Button>
            <ButtonText>Criar conta</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpPage
