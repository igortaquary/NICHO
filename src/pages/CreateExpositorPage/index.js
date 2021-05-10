import React, { useState, useRef } from 'react'
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import Icon from '../../components/Icon';
import {
    Container,
    Banner,
    BannerImage,
    ActionText,
    ActionDescription,
    UserAvatar,
    Clickable,
    ClickableText,
    Input,
    InputContainer,
    InputLabel,
    TextInput,
    Button,
    ButtonText
} from './styles';
import { Entypo } from '@expo/vector-icons';
import OptionButton from '../../components/OptionButton';
import AutocompleteWithMaps from '../../components/AutocompleteWithMaps';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import { useUserContext } from '../../contexts/userContext';
import * as ImagePicker from 'expo-image-picker';

const CreateExpositorPage = ({navigation}) => {

    const { user, updateUserToExpositor } = useUserContext();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([user.regiao]);
    const [selectedProfileImage, setSelectedProfileImage] = useState(user.foto);
    const [selectedBannerImage, setSelectedBannerImage] = useState('');
    const [socialMedia, setSocialMedia] = useState({});
    const [description, setDescription] = useState('');

    const [locationCounter, setLocationCounter] = useState([0]);

    // ---------------------- Location 1 ----------------------

    const [locationText1, setLocationText1] = useState("");
    const [useMaps1, setUseMaps1] = useState(true);
    const [placeName1, setPlaceName1] = useState("");
    const [placeAddress1, setPlaceAddress1] = useState("");
    const [placeGeometry1, setPlaceGeometry1] = useState("");
    const [locationTextErrorMessage1, setLocationTextErrorMessage1] = useState(
        ""
    );

    // ---------------------- Location 2 ----------------------

    const [locationText2, setLocationText2] = useState("");
    const [placeName2, setPlaceName2] = useState("");
    const [placeGeometry2, setPlaceGeometry2] = useState();
    const [placeAddress2, setPlaceAddress2] = useState("");
    const [useMaps2, setUseMaps2] = useState(true);
    const [locationTextErrorMessage2, setLocationTextErrorMessage2] = useState(
        ""
    );

    const autocompleteFieldRef = useRef();

    const checkInputs = () => {
        if(selectedBannerImage == ''){
            Alert.alert('Escolha uma foto de fundo');
            return false;
        }
        if(description.length < 20){
          Alert.alert('Insira uma descrição de pelo menos 20 caracteres.');
          return false;
        }
        if(selectedCategories.length < 1){
          Alert.alert('Escolha pelo menos uma categoria para seu produto');
          return false;
        }
        if(selectedRegions.length < 1){
          Alert.alert('Escolha pelo menos uma região para seu produto');
          return false;
        }
        if(placeName1 == ''){
            Alert.alert('Escolha pelo menos um local de venda');
            return false;
        }
        return true;
      }

    const handleSubmit = async (route) => {
        if(checkInputs()) {
            const expositorData = {
                isExpositor: true,
                dados_vendedor: {
                    descricao: description,
                    links: {...socialMedia},
                    tipos_de_produto: selectedCategories,
                    regiao: selectedRegions,
                    locais: [
                        {
                            nome: placeName1,
                            endereco: placeAddress1,
                            coordenadas: placeGeometry1
                        }                        
                    ]
                }
            };
            if(placeName2 != '') {
                expositorData
                .dados_vendedor
                .locais.push({
                    nome: placeName2,
                    endereco: placeAddress2,
                    coordenadas: placeGeometry2
                })
            }
            await updateUserToExpositor(expositorData, selectedProfileImage, selectedBannerImage);
            navigation.navigate(route);
        }
    }

    const pickImage = async (set) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Erro', 'Desculpe, precisa permitir o acesso às suas fotos para isso!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.5,
            });
            if (!result.cancelled) {
                //setCurrentImage(4);
                set(result.uri)
                console.log(result.uri)
            }
        }
    }

    function handleAddLocation(index) {
        let auxArray = [...locationCounter];
        let nextInput = auxArray.findIndex((element) => element == 0);
        auxArray[nextInput] = 1;
        setLocationCounter(auxArray);
    }

    function handleRemoveLocation(index) {
        let auxArray = [...locationCounter];

        auxArray.splice(index, 1, 0);
        setLocationCounter(auxArray);
    }

    const categories = [
        "Adesivos", "Para vestir", "Para sua casa",
        "Papelaria", "Cosméticos", "Impressões", "Esculturas",
        "Desenhos", "Acessórios", "Pinturas"];
    const regions = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]


    return (
        <Container contentContainerStyle={{ alignItems: 'center' }} keyboardShouldPersistTaps={"handled"}>
            <Banner onPress={() => pickImage(setSelectedBannerImage)}>
                <BannerImage source={{ uri: selectedBannerImage }} />
                <ActionText>
                    <Icon name='lapis' size={15} color='#FFFFFF' />
                    <ActionDescription>Adicionar foto de fundo</ActionDescription>
                </ActionText>
            </Banner>
            <UserAvatar source={{ uri: selectedProfileImage }} />
            <Clickable onPress={() => pickImage(setSelectedProfileImage)}>
                <Icon name='lapis' size={15} color='#019B92' />
                <ClickableText style={{ color: '#019B92' }}>
                    {selectedProfileImage ? 'Alterar foto de perfil' : 'Adicionar foto de perfil'}
                </ClickableText>
            </Clickable>

            <View style={{ paddingLeft: '6%', paddingRight: '6%', paddingBottom: '10%', width: '100%' }}>
                <Input>
                    <InputLabel>Nome</InputLabel>
                    <InputContainer>
                        <TextInput
                            value={user.nome}
                            editable={false}
                        />
                    </InputContainer>
                </Input>

                <Input>
                    <InputLabel>Nome de usuário</InputLabel>
                    <InputContainer>
                        <Entypo name="email" size={15} color="#707070" />
                        <TextInput
                            value={user.usuario}
                            editable={false}
                        />
                    </InputContainer>
                </Input>

                <Input>
                    <InputLabel>Descrição</InputLabel>
                    <InputContainer>
                        <TextInput
                            style={{ textAlignVertical: 'top' }}
                            textAlign="left"
                            placeholder={"Fale um pouco sobre você"}
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                        />
                    </InputContainer>
                </Input>
                <Input>
                    <InputLabel>Minhas outras redes</InputLabel>
                    <InputContainer style={{ marginBottom: 12 }}>
                        <Icon name='instagram' size={15} color='#019B92' />
                        <TextInput
                            value={socialMedia.instagram}
                            onChangeText={(value) => { setSocialMedia({ ...socialMedia, instagram: value }) }}
                        />
                    </InputContainer>
                    <InputContainer style={{ marginBottom: 12 }}>
                        <Icon name='linkedin' size={15} color='#019B92' />
                        <TextInput
                            value={socialMedia.linkedin}
                            onChangeText={(value) => { setSocialMedia({ ...socialMedia, linkedin: value }) }}
                        />
                    </InputContainer>
                    <InputContainer style={{ marginBottom: 12 }}>
                        <Icon name='website' size={15} color='#019B92' />
                        <TextInput
                            value={socialMedia.website}
                            onChangeText={(value) => { setSocialMedia({ ...socialMedia, website: value }) }}
                        />
                    </InputContainer>
                    <InputContainer style={{ marginBottom: 12 }}>
                        <Icon name='facebook' size={15} color='#019B92' />
                        <TextInput
                            value={socialMedia.facebook}
                            onChangeText={(value) => { setSocialMedia({ ...socialMedia, facebook: value }) }}
                        />
                    </InputContainer>
                </Input>

                <Input>
                    <InputLabel>Que tipos de obra você produz?</InputLabel>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {categories.map((item) =>
                            <OptionButton key={item} title={item} selected={selectedCategories.includes(item)}
                                onPress={
                                    () => setSelectedCategories(prev => prev.includes(item) ?
                                        prev.filter(e => e !== item) : [...prev, item])
                                } />
                        )}
                    </View>
                </Input>

                <Input>
                    <InputLabel>Onde você reside atualmente? </InputLabel>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            regions.map((item) =>
                                <OptionButton key={item} title={item} selected={selectedRegions.includes(item)}
                                    onPress={
                                        () => setSelectedRegions(prev => prev.includes(item) ?
                                            prev.filter(e => e !== item) : [...prev, item])
                                    } />
                            )
                        }
                    </View>
                </Input>

                <InputLabel style={{ marginBottom: 0 }}>Locais físicos onde você vende seus produtos</InputLabel>
                <AutocompleteWithMaps
                    placeholderText="Digite o endereço do local"
                    locationText={locationText1}
                    setLocationText={setLocationText1}
                    placeAddress={placeAddress1}
                    setPlaceAddress={setPlaceAddress1}
                    placeName={placeName1}
                    setPlaceName={setPlaceName1}
                    placeGeometry={placeGeometry1}
                    setPlaceGeometry={setPlaceGeometry1}
                    useMaps={useMaps1}
                    setUseMaps={setUseMaps1}
                    errorMessage={locationTextErrorMessage1}
                    inputFieldReference={autocompleteFieldRef}
                />

                {locationCounter[0] == 1 && (
                    <AutocompleteWithMaps
                        placeholderText="Digite o endereço do local"
                        locationText={locationText2}
                        setLocationText={setLocationText2}
                        placeAddress={placeAddress2}
                        setPlaceAddress={setPlaceAddress2}
                        placeName={placeName2}
                        setPlaceName={setPlaceName2}
                        placeGeometry={placeGeometry2}
                        setPlaceGeometry={setPlaceGeometry2}
                        useMaps={useMaps2}
                        setUseMaps={setUseMaps2}
                        errorMessage={locationTextErrorMessage2}
                        onXPress={() => handleRemoveLocation(0)}
                    />
                )}
                {locationCounter.includes(0) && (
                    <TouchableOpacity style={{ alignItems: 'center', marginBottom: 25 }} onPress={handleAddLocation}>
                        <Text>+ Adicionar mais um local</Text>
                    </TouchableOpacity>
                )}

                <Button onPress={() => handleSubmit('NewProduct')}>
                    <ButtonText>Salvar e adicionar um produto</ButtonText>
                </Button>
                <Button style={{ backgroundColor: 'white', borderColor: '#019B92', borderWidth: 1 }} onPress={() => handleSubmit('Home')}>
                    <ButtonText style={{ color: '#019B92' }}>Salvar e voltar à tela inicial</ButtonText>
                </Button>
            </View>
        </Container>
    )
}

export default CreateExpositorPage
