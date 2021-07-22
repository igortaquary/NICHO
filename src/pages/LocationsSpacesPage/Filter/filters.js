import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Style from "./styles";
import RoundedButton from "../../../components/RoundedButton/RoundedButton";
import RoundIconButton from "../../../components/RoundIconButton/RoundIconButton";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "../../../components/Converter";
import { useFilterContext } from "../../../contexts/filterContext";

const day = [
  "Hoje", "Esta Semana", "Este Mês", "Este Ano"
]

const week = [
  "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
]

const regions = [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ]

const time = [
  "Manhã", "Tarde", "Noite"
]

export default function FiltersSpace({navigation}) {

  const { filters, setFilters } = useFilterContext();
  //Filter vars
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedToday, setSelectedToday] = useState();
  const [selectedEntry, setSelectedEntry] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    if(filters.entry){ setSelectedEntry(filters.entry); }
    if(filters.day){ setSelectedDay(filters.day); }
    if(filters.week){ setSelectedWeek(filters.week); }
    if(filters.time){ setSelectedTime(filters.time); }
    if(filters.region){ setSelectedRegion(filters.regions); }
    if(filters.today){ setSelectedToday(filters.today); }
  }, [filters]);

  const handleFilters = () => {
    // Por limitação do firebase não é possível pesquisar por mais de 10 campos na mesma clausula
    const auxFilters = {};
    if(selectedDay){
      auxFilters.day = selectedDay;
    }
    if(selectedRegion){
      auxFilters.region = selectedRegion;
    }
    if( selectedToday){
      auxFilters.today = selectedToday;
    }
    if( selectedEntry ){
      auxFilters.entry = selectedEntry;
    }
    if( selectedWeek ){
      auxFilters.week = selectedWeek;
    }
    if( selectedTime ){
      auxFilters.time = selectedTime;
    }
    setFilters(auxFilters);
    navigation.navigate("Home");
  }

  const ampulheta = require("./../../../../assets/ampulheta.png");
  const ampulhetaSelecionada = require("./../../../../assets/ampulhetaSelecionada.png");
  const check = require("./../../../../assets/check.png");
  const checkSelecionado = require("./../../../../assets/checkSelecionado.png");
/*   const folha = require("./../../../../assets/folha.png");
  const folhaSelecionada = require("./../../../../assets/folhaSelecionada.png"); */

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <Text style={Style.label}>Principais</Text>
      <View style={Style.principaisButtonsContainer}>
        <RoundIconButton
          width={cw(20)}
          text={"Entrada Gratuita"}
          icon={selectedEntry === "Entrada Gratuita" ? ampulhetaSelecionada : ampulheta}
          active={selectedEntry === "Entrada Gratuita"}
          onPress={ 
            () => setSelectedDelivery("Entrada Gratuita") 
          }
        />
        <RoundIconButton
          width={cw(20)}
          text={"Aberto Hoje"}
          icon={selectedToday === "Aberto Hoje" ? checkSelecionado : check}
          active={selectedToday === "Aberto Hoje"}
          onPress={ 
            () => setSelectedToday("Aberto Hoje") 
          }/>
      </View>

      <Text style={Style.label}>Quando</Text>
      {/* <CategoriaFilters /> */}
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
       alignItems: "center", justifyContent: "center"}}>
         <RoundedButton text={"Todas"} active={!selectedDay}
              onPress={ () => setSelectedDay() } /> 
         { day.map( (item) => 
            <RoundedButton key={item} text={item} active={selectedDay === item}
              onPress={ 
                () => setSelectedDay(item) 
              } /> 
          )}
       </View>

       <Text style={Style.label}>Dia da Semana</Text>
      {/* <CategoriaFilters /> */}
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
       alignItems: "center", justifyContent: "center"}}>
         <RoundedButton text={"Todas"} active={!selectedWeek}
              onPress={ () => setSelectedWeek() } /> 
         { week.map( (item) => 
            <RoundedButton key={item} text={item} active={selectedWeek === item}
              onPress={ 
                () => setSelectedWeek(item) 
              } /> 
          )}
       </View>

       <Text style={Style.label}>Horários</Text>
      {/* <CategoriaFilters /> */}
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
       alignItems: "center", justifyContent: "center"}}>
         <RoundedButton text={"Todas"} active={!selectedTime}
              onPress={ () => setSelectedTime() } /> 
         { time.map( (item) => 
            <RoundedButton key={item} text={item} active={selectedTime === item}
              onPress={ 
                () => setSelectedTime(item) 
              } /> 
          )}
       </View>
     
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
