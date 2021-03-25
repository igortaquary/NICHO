import React, { Fragment } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from "./../../components/Icon/index";
import EventBlock from "./../../components/EventBlock";
import Style from "./style";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import { FlatList } from "react-native-gesture-handler";

export default function LocationsEventsPage({ navigation }) {
  const TodayData = [
    {
      id: "CSSA1232455CCSYJHY",
      name: "Feira Liga Pontos",
      image: {
        uri:
          "https://payload.cargocollective.com/1/12/412724/8528630/07_900.jpg",
      },
      date: "2020-12-08",
      location: "DF - Asa sul",
      address: "SQN 311/312, no gramado entrequadras",
      schedule: "Sexta à partir de 14:00h",
    },
  ];
  const CloserToYou = [
    {
      id: "RH245465YRTGFD3",
      name: "Multirão de reforma - Estúdio Bicuda",
      image: {
        uri:
          "https://www.google.com/maps/uv?pb=!1s0x935a3361d53f3871%3A0xba9242c3671143ed!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS%3Dw347-h160-k-no!5sest%C3%BAdio%20bicuda%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS&hl=en&sa=X&ved=2ahUKEwjFgMeAhbbvAhWlJrkGHR4qD0sQoiowE3oECCMQAw",
      },
      date: "2020-12-10",
      location: "Estúdio Bicuda - DF - Taguatinga Sul",
      address: "Taguatinga sul - St. B Sul QSB 13",
      schedule: "Domingo à partir de 09:00h",
    },
  ];
  const MoreEvents = [
    {
      id: "FJ39309J4JFW0JERFW",
      name: "Encontro de Brechós",
      image: {
        uri:
          "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/79779044_775918186216340_2266589207151509504_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=0debeb&_nc_ohc=AlVD0iskulcAX8WmLCi&_nc_ht=scontent.fbsb3-1.fna&oh=1ca3bb0a03534f4cec1b9f6c516df41e&oe=60789F3A",
      },
      date: "2020-12-18",
      location: "Brio Espaço Colaborativo - DF - Taguatinga Sul",
      address: "Taguatinga sul - St. B Sul QSB 13",
      schedule: "Sexta à partir de 11:00h",
    },
    {
      id: "FJ235G9J4JFW0JERFW",
      name: "Mercado de Pulgas",
      image: {
        uri:
          "http://espiandopelomundo.com.br/wp-content/uploads/2017/11/Mercado-de-Pulgas-de-Col%C3%B4nia-2-e1511558720837.jpg",
      },
      date: "2020-12-20",
      location: "DF - Taguatinga Norte",
      address: "Taguatinga norte - QNL 12, conjunto G",
      schedule: "Quarta à partir de  17:00h",
    },
  ];

  const eventBrio = {
    uri:
      "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/79779044_775918186216340_2266589207151509504_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=0debeb&_nc_ohc=AlVD0iskulcAX8WmLCi&_nc_ht=scontent.fbsb3-1.fna&oh=1ca3bb0a03534f4cec1b9f6c516df41e&oe=60789F3A",
  };

  const ItemSeparator = () => <View style={Style.stripe} />;

  const RenderItem = ({ data }) => {
    return data.map((item, index) => (
      <Fragment key={item.id}>
        {index > 0 && <ItemSeparator />}
        <EventBlock
          name={item.name}
          date={new Date(item.date)}
          location={item.location}
          image={item.image}
          address={item.address}
          schedule={item.schedule}
        />
      </Fragment>
    ));
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View
        style={[
          Style.sectionContainer,
          { borderTopLeftRadius: cw(0), borderTopRightRadius: cw(0) },
        ]}
      >
        <Text style={[Style.titleText, { marginTop: cw(27) }]}>Hoje!</Text>
        <RenderItem data={TodayData} />
      </View>
      <View style={Style.sectionContainer}>
        <Text style={Style.titleText}>Mais próximo de você</Text>
        <RenderItem data={CloserToYou} />
      </View>
      <View
        style={[
          Style.sectionContainer,
          { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        ]}
      >
        <Text style={Style.titleText}>Mais eventos para você</Text>
        <RenderItem data={MoreEvents} />
      </View>
    </ScrollView>
  );
}
