import React, {useState} from 'react';
import { Text, View, Alert } from 'react-native';
import { 
  Container, Description, Input, 
  InputContainer, InputLabel, TextInput,
  PublishButton, PublishButtonText,
  CancelButton, CancelButtonText
 } from './styles';
import CreateProductCarousel from '../../components/CreateProductCarousel';
import OptionButton from '../../components/OptionButton';
import Label from '../../components/Label';
import {addProduct} from '../../api/addProduct';
import { ActivityIndicator } from 'react-native';

/* const categories = [
  "Adesivos", "Para vestir", "Para sua casa", 
  "Papelaria", "Cosméticos", "Impressões", "Esculturas", 
  "Desenhos", "Acessórios", "Pinturas" ] */

const categories = {
  "Adesivos": [],
  "Para vestir": ["Blusas", "Calças", "Roupas", "Calçados", "Saias", "Vestidos", "Blusões", "Tops", "Casacos", "Shorts"], 
  "Para sua casa": ["Quadros", "Vasos de plantas", "Móveis", "Luminárias", "Cadeiras", "Mesas", "Puff", "Cabeceira", "Estantes", "Prateleiras", "Armários", "Bancos", "Terrários", "Madeira de demolição", "Pallets", "Mesa de Cabeceira"], 
  "Papelaria": ["Cadernos", "Canetas", "Zines"],
  "Cosméticos": ["Desodorantes", "Sabonetes", "Maquiagem" ],
  "Impressões": ["Prints", "Arte digital", "Xilogravura", "Serigrafia", "Adesivos" ],
  "Esculturas": ["Argila", "Pedras", "Cristais", "Metais", "Madeira", "Vidro", "Resina"],
  "Desenhos": ["Lápis", "Digital", "Esboços" ],
  "Acessórios": ["Bolsas", "Brincos", "Piercings", "Aneis", "Pulseiras", "Colares", "Alianças"],
  "Pinturas": ["Aquarela", "Acrílica", "Óleo", "Técnicas mistas", "Colagens", "Carvão"]
}

const regions = [  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ]

const primas = [
  "Biscuit", "Papel", "Upcycling", "Metais", "Lápis", "Tinta",
  "Tecido", "Barro e argila", "Madeira", "Vidro", "Cristais e pedras",
  "Plástico", "Cimento", "Linhas e cordas", "Resina"]

const CreateProductPage = ({navigation}) => {

    const [images, setImages] = useState([]);

    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    //Price vars
    const [priceType, setPriceType] = useState('unique');
    const [productPrice, setProductPrice] = useState('');
    const [productPrice2, setProductPrice2] = useState('');
    //Options vars
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedPrimas, setSelectedPrimas] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePress = () => {
      if(checkInputs()){
        const auxProduct = {
          titulo: productTitle,
          descricao: productDescription,
          categorias: selectedCategories,
          subcategorias: selectedSubCategories,
          regioes: selectedRegions,
          materias: selectedPrimas,
          preco: productPrice,
          entrega: selectedDelivery
        }
        addProduct(auxProduct, images, navigation, setLoading);
      }
    };

    const checkInputs = () => {
      if(productTitle.length < 4){
        Alert.alert('O titulo do seu produto deve ter pelo menos 4 caracteres');
        return false;
      }
      if(productDescription.length < 10){
        Alert.alert('A descrição do seu produto deve ter pelo menos 10 caracteres');
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
      if(selectedPrimas.length < 1){
        Alert.alert('Escolha pelo menos uma matéria prima para seu produto');
        return false;
      }
      if(productPrice){

      }
      if(priceType !== 'unique'){
        if(productPrice2 === ''){
          Alert.alert('Digite o valor final do seu produto', 
          'Um produto com faixa de preço deve ter um preço mínimo e um máximo');
          return false
        }
      }
      return true;
    }

    return(
        loading ?
        <ActivityIndicator color="#019B92" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}/>
        :
        <Container>
            <CreateProductCarousel images={images} setImages={setImages}/>
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
                    style={{textAlignVertical: 'top'}}
                    textAlign="left"
                    placeholder={"Diga um pouco mais sobre o seu produto..."}
                    multiline={true}
                    numberOfLines={4}
                    value={productDescription}
                    onChangeText={(desc) => setProductDescription(desc)} />
                </InputContainer>
            </Input>
            <Input>
                <InputLabel>Escolha a categoria do seu produto</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  { Object.keys(categories).map( (item) => 
                    <OptionButton key={item} title={item} selected={selectedCategories.includes(item)}
                      /* onPress={ () => setSelectedCategories( prev => prev.includes(item) ? 
                        prev.filter(e => e !== item) : [...prev, item] ) } */
                      onPress={ () => {setSelectedCategories([item]); setSelectedSubCategories([]); }}
                       /> 
                  )}
                </View>
            </Input>
            { selectedCategories[0] && categories[selectedCategories[0]].length > 0 &&
            <Input>
                <InputLabel>Escolha a sub-categoria do seu produto</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {  categories[selectedCategories[0]].map( (item) => 
                    <OptionButton key={item} title={item} selected={selectedSubCategories.includes(item)}
                    onPress={ () => setSelectedSubCategories([item])}
                    /> 
                    )}
                </View>
            </Input>
            }
            <Input>
                <InputLabel>Opções de entrega</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                  <OptionButton title="Encomendas" icon="ampulheta" 
                  selected={selectedDelivery.includes("Encomendas")}
                  onPress={ 
                    () => setSelectedDelivery( prev => prev.includes("Encomendas") ? 
                    prev.filter(e => e !== "Encomendas") : [...prev, "Encomendas"] ) 
                  }/>
                  <OptionButton title="Pronta-entrega" icon="check"
                  selected={selectedDelivery.includes("Pronta-entrega")}
                  onPress={ 
                    () => setSelectedDelivery( prev => prev.includes("Pronta-entrega") ? 
                    prev.filter(e => e !== "Pronta-entrega") : [...prev, "Pronta-entrega"] ) 
                  }/>
                </View>
            </Input>
            <Input>
                <InputLabel>Região</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {
                    regions.map( (item) => 
                      <OptionButton key={item} title={item} selected={selectedRegions.includes(item)}
                      onPress={ 
                        () => setSelectedRegions( prev => prev.includes(item) ? 
                        prev.filter(e => e !== item) : [...prev, item] ) 
                      }/>
                    )
                  }
                </View>
            </Input>
            <Input>
                <InputLabel>Materia Prima</InputLabel>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {
                    primas.map( (item) => 
                      <OptionButton key={item} title={item} selected={selectedPrimas.includes(item)}
                      onPress={ 
                        () => setSelectedPrimas( prev => prev.includes(item) ? 
                        prev.filter(e => e !== item) : [...prev, item] ) 
                      }/>
                    )
                  }
                </View>
            </Input>
            <Input>
                <InputLabel>Preço</InputLabel>
                <Description>Você pode determinar um preço fixo ou uma faixa de preço!</Description>
                { priceType === 'unique' ?
                  <>
                    <Text style={{fontSize: 14, padding: 3, color: '#019B92', textAlign: 'right'}}
                    onPress={ () => setPriceType('variable')}>Usar faixa de preço</Text>
                    <InputContainer>
                      <InputLabel style={{fontSize: 16, marginTop: 3, marginRight: 5}}>R$</InputLabel>
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
                    <Text style={{fontSize: 14, padding: 3, color: '#019B92', textAlign: 'right'}}
                    onPress={ () => setPriceType('unique')}>Usar preço único</Text>
                    <InputContainer>
                      <InputLabel style={{fontSize: 16, marginTop: 3, marginRight: 5}}>R$</InputLabel>
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
            <PublishButton onPress={handlePress}>
                <PublishButtonText>
                  Publicar Produto
                </PublishButtonText>
            </PublishButton>
            <CancelButton onPress={() => navigation.goBack()}>
                <CancelButtonText>
                  Cancelar
                </CancelButtonText>
            </CancelButton>
        </Container>
    )
};

export default CreateProductPage;