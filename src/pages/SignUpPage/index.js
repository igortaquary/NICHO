import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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
} from "./styles";
import { useState } from "react";
import { signUp } from "../../api/signup";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "../../contexts/userContext";
import { errors } from "../../api/errors/errors";

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [image, setImage] = useState("");

  const { SignUp, user, UpdateUser } = useUserContext();

  useEffect(() => {
    if (user) {
      setName(user.nome);
      setEmail(user.email);
      setGender(user.genero);
      setRegion(user.regiao);
      setUsuario(user.usuario);
      setImage(user.foto);
      setPassword("placeholder");
      setConfirmation("placeholder");
    }
  }, []);

  const handlePress = async () => {
    if (!email) {
      Alert.alert("O campo de Email deve ser preenchido.");
    } else if (!password) {
      Alert.alert("O campo de senha deve ser preenchido.");
    } else if (password != confirmation) {
      Alert.alert("A senha e a confirmação de senha devem ser iguais.");
    } else {
      await SignUp(
        name,
        email,
        usuario,
        password,
        gender,
        region,
        newsletter,
        navigation,
        image
      );
    }

    setPassword("");
    setConfirmation("");
  };

  const handleUpdate = async () => {
    if (!email) {
      Alert.alert("O campo de Email deve ser preenchido.");
    } else if (!password) {
      Alert.alert("O campo de senha deve ser preenchido.");
    } else if (password != confirmation) {
      Alert.alert("A senha e a confirmação de senha devem ser iguais.");
    } else {
      await UpdateUser(
        user.id,
        name,
        email,
        usuario,
        password,
        gender,
        region,
        newsletter,
        navigation,
        image
      ).then(
        () => Alert.alert("Dados atualizados com sucesso!"),
        (error) => {
          const err = errors[error.code];
          return Alert.alert(err.header, err.message);
        }
      );
    }

    setPassword("placeholder");
    setConfirmation("placeholder");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Erro",
        "Desculpe, precisa permitir o acesso às suas fotos para isso!"
      );
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
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Container>
          <WelcomeText>
            Bem vinde ao Nicho! Vamos recolher suas informações básicas e logo
            logo você poderá personalizar melhor aquilo que quer ver no app :)
          </WelcomeText>

          {image !== "" && (
            <ImageContainer onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150 }}
              />
            </ImageContainer>
          )}

          <ImageTextContainer onPress={pickImage}>
            <Feather name="edit-2" size={14} color="#019B92" />
            <ImageText>
              {image === "" ? "Adicionar" : "Alterar"} foto de perfil
            </ImageText>
          </ImageTextContainer>

          <Input>
            <InputLabel>Nome completo</InputLabel>
            <InputContainer>
              <TextInput value={name} onChangeText={(name) => setName(name)} />
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Endereço de e-mail</InputLabel>
            <InputContainer>
              <Feather
                name="mail"
                style={{ marginRight: 5 }}
                size={16}
                color="#707070"
              />
              <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Nome de usuário</InputLabel>
            <InputContainer>
              <Feather
                name="at-sign"
                style={{ marginRight: 5 }}
                size={16}
                color="#707070"
              />
              <TextInput
                value={usuario}
                onChangeText={(user) => setUsuario(user)}
              />
            </InputContainer>
          </Input>

          <Line />

          <Input>
            <InputLabel>Senha</InputLabel>
            <InputContainer>
              <Feather
                name="lock"
                style={{ marginRight: 5 }}
                size={16}
                color="#707070"
              />
              <TextInput
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
              <Feather
                name="eye"
                style={{ marginRight: 5 }}
                size={16}
                color="#707070"
              />
            </InputContainer>
          </Input>

          <Input>
            <InputLabel>Confirmação de senha</InputLabel>
            <InputContainer>
              <Feather
                name="lock"
                style={{ marginRight: 5 }}
                size={16}
                color="#707070"
              />
              <TextInput
                value={confirmation}
                onChangeText={(confirmation) => setConfirmation(confirmation)}
                secureTextEntry={true}
              />
              <Feather
                name="eye-off"
                style={{ marginRight: 5 }}
                size={16}
                color="#707070"
              />
            </InputContainer>
          </Input>

          <Line />

          <PickerContainer>
            <Option style={{ marginRight: 16 }}>
              <OptionLabel>Região</OptionLabel>
              <Pickerr
                selectedValue={region}
                onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
              >
                <Pickerr.Item label="selecionar..." value={null} />
                <Pickerr.Item label="Acre" value="AC" />
                <Pickerr.Item label="Alagoas" value="AL" />
                <Pickerr.Item label="Amapá" value="AP" />
                <Pickerr.Item label="Amazonas" value="AM" />
                <Pickerr.Item label="Bahia" value="BA" />
                <Pickerr.Item label="Ceará" value="CE" />
                <Pickerr.Item label="Espírito Santo" value="ES" />
                <Pickerr.Item label="Goiás" value="GO" />
                <Pickerr.Item label="Maranhão" value="MA" />
                <Pickerr.Item label="Mato Grosso" value="MT" />
                <Pickerr.Item label="Mato Grosso do Sul" value="MS" />
                <Pickerr.Item label="Minas Gerais" value="MG" />
                <Pickerr.Item label="Pará" value="PA" />
                <Pickerr.Item label="Paraíba" value="PB" />
                <Pickerr.Item label="Paraná" value="PR" />
                <Pickerr.Item label="Pernambuco" value="PE" />
                <Pickerr.Item label="Piauí" value="PI" />
                <Pickerr.Item label="Rio de Janeiro" value="RJ" />
                <Pickerr.Item label="Rio Grande do Norte" value="RN" />
                <Pickerr.Item label="Rio Grande do Sul" value="RS" />
                <Pickerr.Item label="Rondônia" value="RO" />
                <Pickerr.Item label="Roraima" value="RR" />
                <Pickerr.Item label="Santa Catarina" value="SC" />
                <Pickerr.Item label="São Paulo" value="SP" />
                <Pickerr.Item label="Sergipe" value="SE" />
                <Pickerr.Item label="Tocantins" value="TO" />
                <Pickerr.Item label="Distrito Federal" value="DF" />
              </Pickerr>
            </Option>
            <Option>
              <OptionLabel>Gênero</OptionLabel>
              <Pickerr
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Pickerr.Item label="selecionar..." value={null} />

                <Pickerr.Item label="Masculino" value="M" />
                <Pickerr.Item label="Feminino" value="F" />
                <Pickerr.Item label="Outro" value="O" />
              </Pickerr>
            </Option>
          </PickerContainer>

          <Newsletter onPress={() => setNewsletter(!newsletter)}>
            <Check
              style={{ borderColor: newsletter ? "#019B92" : "#C4C4C4" }}
              onPress={() => setNewsletter(!newsletter)}
            >
              {newsletter ? (
                <Feather name="check-square" size={18} color="#019B92" />
              ) : (
                <Feather name="square" size={18} color="#C4C4C4" />
              )}
            </Check>

            <NewsletterText>
              quero receber novidades do Nicho no meu email
            </NewsletterText>
          </Newsletter>

          {user ? (
            <Button onPress={handleUpdate}>
              <ButtonText>Atualizar</ButtonText>
            </Button>
          ) : (
            <Button onPress={handlePress}>
              <ButtonText>Criar conta</ButtonText>
            </Button>
          )}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;
