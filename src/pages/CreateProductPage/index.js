import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { 
  Container, Description, Input, 
  InputContainer, InputLabel, TextInput,
  PublishButton, PublishButtonText,
  CancelButton, CancelButtonText
 } from './styles';
import CreateProductCarousel from '../../components/CreateProductCarousel';
import OptionButton from '../../components/OptionButton';

const images = [
    {
      id: 1,
      color: 'yellow',
      url: 'https://source.unsplash.com/featured/?handmade'
    },
    {
      id: 2,
      color: 'blue',
      url: 'https://source.unsplash.com/featured/?handmade'
    },
    {
      id: 3,
      color: 'orange',
      url: 'https://source.unsplash.com/featured/?handmade'
    },
  ]

const categorys = [
  "Adesivos", "Para vestir", "Para sua casa", 
  "Papelaria", "Cosméticos","Impressões", "Esculturas", 
  "Desenhos", "Acessórios", "Pinturas" ]
const selectedCategorys = ["Cosméticos", "Adesivos"]

const regions = [  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ]
const selectedRegions = [ "DF"]

const CreateProductPage = () => {

    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    //Price vars
    const [priceType, setPriceType] = useState('unique');
    const [productPrice, setProductPrice] = useState('');
    const [productPrice2, setProductPrice2] = useState('');

    return(
        <Container>
            <CreateProductCarousel data={images}/>
            <Input>
                <InputLabel>Título</InputLabel>
                <InputContainer>
                <TextInput 
                    placeholder={"Dê um titulo ao para o seu produto"}
                    value={productTitle}
                    onChangeText={(title) => setProductTitle(title)}/>
                </InputContainer>
            </Input>
            <Input>
                <InputLabel>Descrição</InputLabel>
                <InputContainer>
                <TextInput 
                    textAlign="left"
                    placeholder={"Diga um pouco mais sobre o seu produto..."}
                    multiline={true}
                    numberOfLines={5}
                    value={productDescription}
                    onChangeText={(desc) => setProductDescription(desc)} />
                </InputContainer>
            </Input>
            <Input>
                <InputLabel>Escolha as categorias do seu produto</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {
                    categorys.map( (item) => 
                      <OptionButton title={item} selected={selectedCategorys.includes(item)}/>
                    )
                  }
                </View>
            </Input>
            <Input>
                <InputLabel>Opções de entrega</InputLabel>
                
            </Input>
            <Input>
                <InputLabel>Região</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {
                    regions.map( (item) => 
                      <OptionButton title={item} selected={selectedRegions.includes(item)}/>
                    )
                  }
                </View>
            </Input>
            <Input>
                <InputLabel>Materia Prima</InputLabel>
                
            </Input>
            <Input>
                <InputLabel>Preço</InputLabel>
                <Description>Você pode determinar um preço fixo ou uma faixa de preço!</Description>
                { priceType === 'unique' ?
                  <>
                    <Text style={{fontSize: 14, padding: 10, color: '#019B92', textAlign: 'right'}}
                    onPress={ () => setPriceType('variable')}>Usar faixa de preço</Text>
                    <InputContainer>
                      <InputLabel style={{fontSize: 16, marginTop: 5, marginRight: 5}}>R$</InputLabel>
                      <TextInput 
                          textAlign="left"
                          keyboardType="number-pad"
                          placeholder={"Preço único"}
                          value={productPrice}
                          onChangeText={(price) => setProductPrice(price)} />
                    </InputContainer>
                  </>
                  :
                  <>
                    <Text style={{fontSize: 14, padding: 10, color: '#019B92', textAlign: 'right'}}
                    onPress={ () => setPriceType('unique')}>Usar preço único</Text>
                    <InputContainer>
                      <InputLabel style={{fontSize: 16, marginTop: 5, marginRight: 5}}>R$</InputLabel>
                      <TextInput 
                          textAlign="left"
                          keyboardType="number-pad"
                          placeholder={"Valor Inicial"}
                          value={productPrice}
                          onChangeText={(price) => setProductPrice(price)} />
                    </InputContainer>
                    <InputContainer style={{marginTop: 10}}>
                      <InputLabel style={{fontSize: 16, marginTop: 5, marginRight: 5}}>Até R$</InputLabel>
                      <TextInput 
                          textAlign="left"
                          keyboardType="number-pad"
                          placeholder={"Valor final"}
                          value={productPrice2}
                          onChangeText={(price) => setProductPrice2(price)} />
                    </InputContainer>
                  </>
                }
            </Input>
            <PublishButton>
                <PublishButtonText>
                  Publicar Produto
                </PublishButtonText>
            </PublishButton>
            <CancelButton>
                <CancelButtonText>
                  Cancelar
                </CancelButtonText>
            </CancelButton>
        </Container>
    )
};

export default CreateProductPage;