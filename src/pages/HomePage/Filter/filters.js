import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Style from "./styles";
import RoundedButton from "../../../components/RoundedButton/RoundedButton";
import RoundIconButton from "../../../components/RoundIconButton/RoundIconButton";
/* import Slider from "../../../components/Slider/Slider"; */
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "../../../components/Converter";
import { useFilterContext } from "../../../contexts/filterContext";

/* const categories = [
  "Adesivos", "Para vestir", "Para sua casa", 
  "Papelaria", "Cosméticos", "Impressões", "Esculturas", 
  "Desenhos", "Acessórios", "Pinturas" ] */

const regions = [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ]

const primas = [
  "Biscuit", "Papel", "Upcycling", "Metais", "Lápis", "Tinta",
  "Tecido", "Barro e argila", "Madeira", "Vidro", "Cristais e pedras",
  "Plástico", "Cimento", "Linhas e cordas", "Resina" ]

const categories = {
  "Adesivos": [],
  "Para vestir": ["Blusas", "Calças", "Roupas", "Calçados", "Saias", "Vestidos", "Blusões", "Tops", "Casacos", "Shorts"], 
  "Para sua casa": ["Quadros", "Vasos de plantas", "Móveis", "Luminárias", "Cadeiras", "Mesas", "Puff", "Cabeceira", "Estantes",
    "Prateleiras", "Armários", "Bancos", "Terrários", "Madeira de demolição", "Pallets", "Mesa de Cabeceira"], 
  "Papelaria": ["Cadernos", "Canetas", "Zines"],
  "Cosméticos": ["Desodorantes", "Sabonetes", "Maquiagem" ],
  "Impressões": ["Prints", "Arte digital", "Xilogravura", "Serigrafia", "Adesivos" ],
  "Esculturas": ["Argila", "Pedras", "Cristais", "Metais", "Madeira", "Vidro", "Resina"],
  "Desenhos": ["Lápis", "Digital", "Esboços" ],
  "Acessórios": ["Bolsas", "Brincos", "Piercings", "Aneis", "Pulseiras", "Colares", "Alianças"],
  "Pinturas": ["Aquarela", "Acrílica", "Óleo", "Técnicas mistas", "Colagens", "Carvão"]
} 

export default function Filters({navigation}) {

  const { filters, setFilters } = useFilterContext();
  //Filter vars
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  /* const [selectedPrima, setSelectedPrima] = useState(); */
  const [selectedDelivery, setSelectedDelivery] = useState();

  useEffect(() => {
    if(filters.category){ setSelectedCategory(filters.category); }
    if(filters.delivery){ setSelectedDelivery(filters.delivery); }
    if(filters.region){ setSelectedRegion(filters.regions); }
    /* if(filters.prima){ setSelectedPrima(filters.prima); } */
  }, [filters]);

  const handleFilters = () => {
    // Por limitação do firebase não é possível pesquisar por mais de 10 campos na mesma clausula
    const auxFilters = {};
    if(selectedCategory){
      auxFilters.category = selectedCategory;
    }
    if(selectedRegion){
      auxFilters.region = selectedRegion;
    }
    /* if( selectedPrima){
      auxFilters.prima = selectedPrima;
    } */
    if(selectedSubCategory){
      auxFilters.subcategory = selectedSubCategory;
    }
    if( selectedDelivery ){
      auxFilters.delivery = selectedDelivery;
    }
    setFilters(auxFilters);
    navigation.navigate("Home");
  }

  const ampulheta = require("./../../../../assets/ampulheta.png");
  const ampulhetaSelecionada = require("./../../../../assets/ampulhetaSelecionada.png");
  const check = require("./../../../../assets/check.png");
  const checkSelecionado = require("./../../../../assets/checkSelecionado.png");

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <Text style={Style.label}>Principais</Text>
      <View style={Style.principaisButtonsContainer}>
        <RoundIconButton
          width={cw(20)}
          text={"Encomendas"}
          icon={selectedDelivery === "Encomendas" ? ampulhetaSelecionada : ampulheta}
          active={selectedDelivery === "Encomendas"}
          onPress={ 
            () => setSelectedDelivery("Encomendas") 
          }
        />
        <RoundIconButton
          width={cw(20)}
          text={"Pronta-entrega"}
          icon={selectedDelivery === "Pronta-entrega" ? checkSelecionado : check}
          active={selectedDelivery === "Pronta-entrega"}
          onPress={ 
            () => setSelectedDelivery("Pronta-entrega") 
          }/>
      </View>

      <Text style={Style.label}>Categorias</Text>
      <ScrollView style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap",
        padding: 5, width: "100%"}} horizontal={true}>
          <RoundedButton text={"Todas"} active={!selectedCategory}
              onPress={ () => {setSelectedCategory(); setSelectedSubCategory();}} /> 
         { Object.keys(categories).map( (item) => 
            <RoundedButton key={item} text={item} active={selectedCategory === item}
              onPress={ 
                () => {setSelectedCategory(item); setSelectedSubCategory();}
              } /> 
          )}
      </ScrollView>

      { selectedCategory && categories[selectedCategory].length > 0 && 
      <>
        <Text style={Style.label}>Subcategoria</Text>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
         alignItems: "center", justifyContent: "center"}}>
           <RoundedButton text={"Todas"} active={!selectedSubCategory}
                onPress={ () => setSelectedSubCategory() } /> 
          {
            categories[selectedCategory].map( (item) => 
              <RoundedButton key={item} text={item} active={selectedSubCategory === item}
              onPress={ 
                () => setSelectedSubCategory(item) 
              }/>
            )
          }
        </View>
      </>
      }
     
      <Text style={Style.label}>Regiões</Text>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
       alignItems: "center", justifyContent: "center"}}>
         <RoundedButton text={"Todas"} active={!selectedRegion}
              onPress={ () => setSelectedRegion() } /> 
        {
          regions.map( (item) => 
            <RoundedButton key={item} text={item} active={selectedRegion === item}
            onPress={ 
              () => setSelectedRegion( item ) 
            }/>
          )
        }
      </View>

      {/* <Text style={Style.label}>Matéria prima</Text>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
       alignItems: "center", justifyContent: "center"}}>
         <RoundedButton text={"Todas"} active={!selectedPrima}
              onPress={ () => setSelectedPrima() } /> 
        {
          primas.map( (item) => 
            <RoundedButton key={item} text={item} active={selectedPrima === item}
            onPress={ 
              () => setSelectedPrima(item) 
            }/>
          )
        }
      </View> */}

      {/* <Text style={Style.label}>Preço</Text>
      <Slider /> */}

      <View style={Style.stripe} />
      <View style={Style.greenButtonContainer}>
        <RoundedButton
          onPress={handleFilters}
          activeOpacity={0.2}
          text="Ver resultados"
          style={Style.checkResultsButton}
          textStyle={Style.checkResultsButtonText}
        />
      </View>
    </ScrollView>
  );
}
