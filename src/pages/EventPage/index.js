import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import Style from "./styles";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Accordion from "../../components/Accordion";
import Icon from "./../../components/Icon/index";
import ShowLocation from "./../../components/ShowLocation";
import SkeletonContent from "react-native-skeleton-content";
import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
import * as Localization from "expo-localization";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import { event } from "react-native-reanimated";

export default function EventPage({ navigation, route }) {
  const event = route.params.event;
  const eventDate = moment(event.datas[0].from.toDate())
    .format("ddd, DD [DE] MMM [ÀS] HH:mm")
    .toUpperCase();
  const [seguindoBrio, setSeguindoBrio] = useState(true);
  const [seguindoBicuda, setSeguindoBicuda] = useState(true);

  const mockedDate = moment().local().format();
  const finishDate = moment(mockedDate).add(1, "hour").format();
  const latitudeDelta = 0.00023;
  const longitudeDelta = 0.03;

  const BrioPicture = {
    uri: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/64702081_653936445081182_6307125986315993088_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=lnK4VDmcCNMAX8L7XVu&_nc_ht=scontent.fbsb3-1.fna&oh=1a1e5f5d2e14b84c6873e6710937a922&oe=60785EAB",
  };
  const BicudaPicture = {
    uri: "https://www.google.com/maps/uv?pb=!1s0x935a3361d53f3871%3A0xba9242c3671143ed!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS%3Dw347-h160-k-no!5sest%C3%BAdio%20bicuda%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS&hl=en&sa=X&ved=2ahUKEwjFgMeAhbbvAhWlJrkGHR4qD0sQoiowE3oECCMQAw",
  };
  const eventBrio = {
    uri: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/79779044_775918186216340_2266589207151509504_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=0debeb&_nc_ohc=AlVD0iskulcAX8WmLCi&_nc_ht=scontent.fbsb3-1.fna&oh=1ca3bb0a03534f4cec1b9f6c516df41e&oe=60789F3A",
  };

  const isToday = (date) => {
    return (
      date.getDate() == mockedDate.getDate() &&
      date.getMonth() == mockedDate.getMonth() &&
      date.getFullYear() == mockedDate.getFullYear()
    );
  };

  // const latitudeSource = "-15.833891";
  // const longitudeSource = "-48.051603";
  const latitudeDestination = event.local.geometry.location.lat;
  const longitudeDestination = event.local.geometry.location.lng;

  const addToCalendar = async () => {
    const { timezone } = await Localization.getLocalizationAsync();
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      let calendars = await Calendar.getCalendarsAsync();
      let defaultCalendar = calendars.find(
        (element) => element.isPrimary == true
      );
      defaultCalendar ? {} : (defaultCalendar = calendars[0]);
      // console.log(calendars);
      console.log(defaultCalendar.id);
      console.log(typeof mockedDate);
      console.log(finishDate);
      let event = await Calendar.createEventAsync(defaultCalendar.id, {
        title: event.titulo,
        startDate: new Date(mockedDate),
        endDate: new Date(finishDate ? finishDate : finishDate.add(1, "hour")),
        location: event.organizador,
        alarms: [{ relativeOffset: -30, method: Calendar.AlarmMethod.DEFAULT }],
        timeZone: timezone,
      });
      Calendar.openEventInCalendar(event);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View>
        <View>
          <TouchableOpacity style={{ ...Style.iconContainer, top: cw(189) }}>
            <Icon
              name="compartilhar"
              size={cw(16.9)}
              color="#FFFFFF"
              style={{ left: cw(-1) }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Style.iconContainer}>
            <Icon name="salvar" size={cw(13.5)} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Image style={Style.coverImage} source={{ uri: event?.images[0] }} />
      </View>

      <View
        style={{
          ...Style.sectionContainer,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          paddingBottom: cw(29),
        }}
      >
        <View style={Style.eventInfo}>
          <View style={Style.eventLeftContainer}>
            <View style={Style.dateContainer}>
              <Text style={Style.dateText}>{eventDate}</Text>
              {isToday && <Text style={Style.today}>Hoje!</Text>}
            </View>
            <Text style={Style.localName}>{event.titulo}</Text>
            <Text style={Style.localNeighborhood}>{event.localName}</Text>
            <Text style={Style.localAddress}>
              {event.location + ", " + event.region}
            </Text>
          </View>

          <View style={Style.addToCalendarContainer}>
            <TouchableOpacity
              style={Style.calendarContainer}
              activeOpacity={0.7}
              onPress={() => addToCalendar()}
            >
              <Icon name="calendar" size={21.94} color="#707070" />
            </TouchableOpacity>
            <Text style={Style.addToCalendarText}>
              adicionar ao meu calendário
            </Text>
          </View>
        </View>

        <View style={Style.stripe} />

        <View style={Style.iconAndInfoContainer}>
          <Icon name="flag" size={13.5} color="#019B92" />
          <Text style={Style.infoText}>
            evento de{" "}
            <Text style={Style.organizerName}>{event.organizador[0]}</Text>
          </Text>
        </View>

        <View style={Style.iconAndInfoContainer}>
          <Icon name="clock" size={15.5} color="#019B92" />
          <Text style={Style.infoText}>
            {"acontecerá na " +
              moment(event.datas[0].from.toDate()).format("dddd") +
              " das " +
              moment(event.datas[0].from.toDate()).format("HH:mm") +
              "h às " +
              moment(event.datas[0].to.toDate()).format("HH:mm") +
              "h"}
          </Text>
        </View>

        <View style={Style.iconAndInfoContainer}>
          <Icon name="ticket" size={16} color="#019B92" />
          <Text style={Style.infoText}>
            {event.ingresso ? "evento gratuito" : "evento pago"}
          </Text>
        </View>

        <View style={Style.iconAndInfoContainer}>
          <Icon name="locais" size={16} color="#019B92" />
          <Text style={Style.infoText}>
            {event.localName + ", " + event.location + ", " + event.region}
          </Text>
        </View>

        <ShowLocation
          destinationLatitude={parseFloat(latitudeDestination)}
          destinationLongitude={parseFloat(longitudeDestination)}
          latitudeDelta={latitudeDelta}
          longitudeDelta={longitudeDelta}
          destinationName={event.organizador}
          style={Style.map}
        />

        {/* MAPA ----------------------------------- */}
      </View>

      <Accordion
        title="Detalhes"
        toggleButtonStyle={Style.toggleButtonStyle}
        textStyle={{ ...Style.title }}
        contentContainerStyle={Style.contentContainerStyle}
      >
        <Text style={Style.text}>{event.descricao}</Text>
        <View style={Style.tagsContainer}>
          {event.categorias.map((category) => (
            <View key={category} style={Style.tag}>
              <Text style={Style.tagText}>{category}</Text>
            </View>
          ))}
        </View>
      </Accordion>

      <View style={Style.sectionContainer}>
        <Text
          style={{
            ...Style.title,
            marginTop: cw(14),
            marginBottom: cw(16),
            marginLeft: cw(6),
          }}
        >
          Organizado por
        </Text>

        {event.organizador.map((organizer) => (
          <View style={Style.organizerContainer}>
            {/* <Image style={Style.organizerPicture} source={BrioPicture} /> */}
            <View style={Style.nameAndButtonContainer}>
              <Text style={Style.organizerTitle}>{organizer}</Text>
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          ...Style.sectionContainer,
          paddingLeft: cw(17),
          paddingRight: cw(15),
        }}
      >
        <Text style={Style.greenTitleText}>Mais eventos para você</Text>
        <Text style={Style.eventName}>Encontro dos Brechós</Text>

        <View>
          <Image style={Style.additionalEventImage} source={eventBrio} />
          <TouchableOpacity style={Style.additionalEventShareIcon}>
            <Icon
              name="compartilhar"
              size={16.9}
              color="#FFFFFF"
              style={{ right: cw(1) }}
            />
          </TouchableOpacity>
        </View>

        <View style={Style.additionalEventInfo}>
          <View style={Style.additionalEventLeftContainer}>
            <Text style={Style.dayText}>18</Text>
            <Text style={Style.monthText}>DEZ</Text>
          </View>
          <View style={Style.additionalEventRightContainer}>
            <Text style={Style.additionalEventLocationName}>
              Brio Espaço Colaborativo - DF - Taguatinga Sul
            </Text>

            <Text style={Style.additionalEventLocationAddress}>
              Taguatinga sul - St. B Sul QSB 13
            </Text>

            <Text style={Style.additionalEventLocationTime}>
              Sexta à partir de 11:00h
            </Text>
          </View>

          <TouchableOpacity style={Style.additionalEventSaveIcon}>
            <Icon name="salvar" size={17.32} color="#707070" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
