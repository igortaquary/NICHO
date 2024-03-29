﻿import React, { Fragment, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Style from "./styles";
import Accordion from "../../components/Accordion";
import Icon from "./../../components/Icon/index";
import ShowLocation from "./../../components/ShowLocation";
import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import ImageView from "react-native-image-viewing";

export default function EventPage({ navigation, route }) {
  const [visible, setIsVisible] = useState(false);
  const event = route.params.event;
  const eventDate = moment(event.datas[0].from.toDate())
    .format("ddd, DD [DE] MMM [ÀS] HH:mm")
    .toUpperCase();
  const [seguindoBrio, setSeguindoBrio] = useState(true);
  const [seguindoBicuda, setSeguindoBicuda] = useState(true);

  const recommendations = route.params.recommendations;

  const mockedDate = moment().local().toDate();
  const finishDate = moment(mockedDate).add(1, "hour").format();
  const latitudeDelta = 0.00023;
  const longitudeDelta = 0.03;

  const isToday = (date) => {
    return (
      date.getDate() == mockedDate.getDate() &&
      date.getMonth() == mockedDate.getMonth() &&
      date.getFullYear() == mockedDate.getFullYear()
    );
  };

  const month = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];
  // const latitudeSource = "-15.833891";
  // const longitudeSource = "-48.051603";
  const latitudeDestination = event.local.geometry.location.lat;
  const longitudeDestination = event.local.geometry.location.lng;

  const addToCalendar = async () => {
    const { timezone } = await Localization.getLocalizationAsync();
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    let startDate = event.datas[0].from.toDate();
    let endRecurrence = event.datas[0].to.toDate();
    let endDate = event.datas[0].to
      .toDate()
      .setFullYear(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );

    if (status === "granted") {
      let calendars = await Calendar.getCalendarsAsync();
      let defaultCalendar = calendars.find(
        (element) => element.isPrimary == true
      );
      defaultCalendar ? {} : (defaultCalendar = calendars[0]);
      let eventCreated = await Calendar.createEventAsync(defaultCalendar.id, {
        title: event.titulo,
        startDate: startDate,
        endDate: endDate,
        location: event.local.address,
        alarms: [{ relativeOffset: -30, method: Calendar.AlarmMethod.DEFAULT }],
        recurrenceRule: {
          frequency: Calendar.Frequency.DAILY,

          endDate: endRecurrence,
        },
        timeZone: timezone,
      });
      Calendar.openEventInCalendar(eventCreated);
    }
  };

  return (
    <>
    <ImageView
        images={event.images.map(item => ({uri: item}))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View>
        <TouchableOpacity
          style={Style.backArrowContainer}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="back"
            size={cw(16.9)}
            color="#FFFFFF"
            style={{ left: cw(-1) }}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{ ...Style.iconContainer, top: cw(189) }}
            activeOpacity={0.5}
            onPress={() => console.log("apertado")}
          >
            <Icon
              name="compartilhar"
              size={cw(16.9)}
              color="#FFFFFF"
              style={{ left: cw(-1) }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Style.iconContainer} activeOpacity={0.5}>
            <Icon name="salvar" size={cw(13.5)} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>setIsVisible(true)}>
          <Image style={Style.coverImage} source={{ uri: event?.images[0] }} />
        </TouchableOpacity>
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
              {isToday(moment(event.datas[0].from.toDate()).toDate()) && (
                <Text style={Style.today}>Hoje!</Text>
              )}
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
              onPress={addToCalendar}
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
          destinationName={event.local.name}
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
          <View key={organizer} style={Style.organizerContainer}>
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
        {recommendations.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Text style={Style.eventName}>{item.titulo}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <View>
                <Image style={Style.additionalEventImage} source={item.image} />
                <TouchableOpacity style={Style.additionalEventShareIcon}>
                  <Icon
                    name="compartilhar"
                    size={16.9}
                    color="#FFFFFF"
                    style={{ right: cw(1) }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View style={Style.additionalEventInfo}>
              <View style={Style.additionalEventLeftContainer}>
                <Text style={Style.dayText}>
                  {item.datas[0].from.toDate().getDate()}
                </Text>
                <Text style={Style.monthText}>
                  {month[item.datas[0].from.toDate().getMonth()]}
                </Text>
              </View>
              <View style={Style.additionalEventRightContainer}>
                <Text style={Style.additionalEventLocationName}>
                  {item.localName}
                </Text>

                <Text style={Style.additionalEventLocationAddress}>
                  {item.region}
                </Text>

                <Text style={Style.additionalEventLocationTime}>
                  {"Dia " +
                    item.datas[0].from.toDate().getDate() +
                    " à partir de " +
                    event.datas[0].from.toDate().getHours() +
                    "h"}
                </Text>
              </View>
            </View>
          </Fragment>
        ))}
      </View>
    </ScrollView>
    </>
  );
}
