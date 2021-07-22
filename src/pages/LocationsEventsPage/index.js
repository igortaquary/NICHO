import React, { Fragment, useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import EventBlock from "./../../components/EventBlock";
import Style from "./style";
import moment from "moment";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import * as firebase from "firebase";

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d; // kilometers
}

export default function LocationsEventsPage({ navigation }) {
  const [eventList, setEventList] = useState([]);
  const [refreshing, setRefreshing] = useState();
  const [eventsToday, setEventsToday] = useState([]);
  const [location, setLocation] = useState();
  const [nearby, setNearby] = useState([]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(pos => {
  //     setLocation(pos.coords);
  //   })
  // }, []);

  // useEffect(() => {
  //   if(location && eventList.length) {
  //     const perto = eventList.filter(item => {
  //       return (measure(location.latitude,
  //        location.longitude,
  //        item.local.geometry.location.lat,
  //        item.local.geometry.location.lng) < 20.0)
  //     });
  //   }
  // }, [location, eventList])

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
        navigator.geolocation.getCurrentPosition(pos => {
          const location = pos.coords;
          const perto = events.filter(item => {
            return (measure(location.latitude,
             location.longitude,
             item.local.geometry.location.lat,
             item.local.geometry.location.lng) < 20.0)
          });
          setNearby(perto)
        });
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

  return refreshing ? (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
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
        <RenderItem data={nearby} />
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
