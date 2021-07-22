import React, { Fragment, useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator, TextInput } from "react-native";
import EventBlock from "./../../components/EventBlock";
import Style from "./style";
import { HeaderContainer, FilterContainer, Filters, FilterButton, SearchContainer, CategoryContainer, CategoryText } from '../HomePage/styles';
import { useFilterContext } from '../../contexts/filterContext';
import Icon from '../../components/Icon';
import moment from "moment";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import * as firebase from "firebase";

export default function LocationsEventsPage({ navigation }) {
  const [eventList, setEventList] = useState([]);
  const [refreshing, setRefreshing] = useState();
  const [eventsToday, setEventsToday] = useState([]);

  const fetchEvents = async (events) => {
    const Documents = await firebase
      .firestore()
      .collection("evento")
      .get()
      .then((querrySnapshot) => {
        querrySnapshot.forEach((documentSnapshot) => {
          const doc = documentSnapshot.data();
          const fullAddress = doc.local.address;
          const splitAddress = fullAddress.split("-");
          doc.region = splitAddress[1];
          doc.location = splitAddress[0];
          doc.localName = doc.local.name;
          doc.id = documentSnapshot.id;
          events.push(doc);
        });
      });
  };

  const fetchImagem = async (events) => {
    for (const item of events) {
      item.image = {
        uri: await firebase
          .storage()
          .ref("events/" + item.anunciante + "/" + item.titulo + "/" + 0)
          .getDownloadURL(),
      };
    }
  };

  useEffect(() => {
    const events = [];
    setRefreshing(0);
    fetchEvents(events).then(() => {
      fetchImagem(events).then(() => {
        setEventList(events);
        setRefreshing(1);
      });
    });
  }, []);

  const getEventsToday = () => {
    let events = [];

    if (eventList.length) {
      events = eventList.filter((event) => {
        return event.datas.some((data) =>
          moment(data.from.toDate()).isSame(moment(), "day")
        );
      });
    }
    console.log(events);
    return events;
  };

  const RenderItem = ({ data }) => {
    if (data.length) {
      return data.map((item, index) => {
        return (
          <Fragment key={item.id}>
            {index > 0 && <View style={Style.stripe} />}
            <EventBlock
              name={item.titulo}
              date={item.datas[0].from.toDate()}
              location={item.localName}
              image={item.image}
              address={item.region}
              schedule={item.datas[0].from.toDate()}
              navigation={navigation}
              event={item}
              isList
              events={eventList}
            />
          </Fragment>
        );
      });
    } else {
      return (
        <>
          <Text>Nenhum evento hoje {":("}</Text>
        </>
      );
    }
  };

  const { filters, setFilters, search } = useFilterContext();
  const categories = [ "Esta semana", "Este mês", "Este ano" ];

  return refreshing ? (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <HeaderContainer>
        <FilterContainer>
          <Filters showsHorizontalScrollIndicator={false} horizontal={true}>
            { filters.category && 
            <CategoryContainer onPress={ () => setFilters({})}>
              <CategoryText selected={false}>
                Todos
              </CategoryText>
            </CategoryContainer>}
            {
            categories.map( (item, i) => 
            <CategoryContainer key={i} onPress={ () => setFilters({category: item})}>
              <CategoryText selected={filters.category === item || !filters.category}>
                {item}
              </CategoryText>
            </CategoryContainer>
            )
            }
          </Filters>
            <FilterButton onPress={() => navigation.navigate("FiltersEvent")}>
              <Icon name='filtros' size={20} color={"#FFF"} />
            </FilterButton>
        </FilterContainer>
        <SearchContainer>
          <Icon name='busca' size={16} color={"#707070"}/>
          <TextInput placeholder="Pesquise por itens" style={{marginLeft: 8, width: '100%'}} 
            returnKeyType="search" onSubmitEditing={ e => search(e.nativeEvent.text)} />
          </SearchContainer>
      </HeaderContainer>
      <View
        style={[
          Style.sectionContainer,
          { borderTopLeftRadius: cw(0), borderTopRightRadius: cw(0) },
        ]}
      >
        <Text style={[Style.titleText, { marginTop: cw(27) }]}>Hoje!</Text>
        <RenderItem data={getEventsToday()} />
      </View>
      <View style={Style.sectionContainer}>
        <Text style={Style.titleText}>Mais próximo de você</Text>
        <RenderItem data={eventList} />
      </View>
      <View
        style={[
          Style.sectionContainer,
          {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginBottom: 0,
          },
        ]}
      >
        <Text style={Style.titleText}>Mais eventos para você</Text>
        <RenderItem data={eventList} />
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{ marginTop: 50 }} color="green" />
  );
}
