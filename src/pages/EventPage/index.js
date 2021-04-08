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

export default function EventPage({ navigation }) {
  const [seguindoBrio, setSeguindoBrio] = useState(true);
  const [seguindoBicuda, setSeguindoBicuda] = useState(true);
  const [location, setLocation] = useState();
  const [remover, setRemover] = useState(null);
  const [perm, setPerm] = useState(null);

  const eventName = "Feira Liga Pontos";
  const localName = "Brio - Café e Espaço Colaborativo ";
  const mockedDate = moment().local().format();
  const finishDate = moment(mockedDate).add(1, "hour").format();

  const coverImage = {
    uri: "https://source.unsplash.com/collection/227043",
  };
  const BrioPicture = {
    uri:
      "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/64702081_653936445081182_6307125986315993088_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=lnK4VDmcCNMAX8L7XVu&_nc_ht=scontent.fbsb3-1.fna&oh=1a1e5f5d2e14b84c6873e6710937a922&oe=60785EAB",
  };
  const BicudaPicture = {
    uri:
      "https://www.google.com/maps/uv?pb=!1s0x935a3361d53f3871%3A0xba9242c3671143ed!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS%3Dw347-h160-k-no!5sest%C3%BAdio%20bicuda%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS&hl=en&sa=X&ved=2ahUKEwjFgMeAhbbvAhWlJrkGHR4qD0sQoiowE3oECCMQAw",
  };
  const eventBrio = {
    uri:
      "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/79779044_775918186216340_2266589207151509504_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=0debeb&_nc_ohc=AlVD0iskulcAX8WmLCi&_nc_ht=scontent.fbsb3-1.fna&oh=1ca3bb0a03534f4cec1b9f6c516df41e&oe=60789F3A",
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
  const latitudeDestination = "-15.835981";
  const longitudeDestination = "-48.050079";

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
        title: eventName,
        startDate: new Date(mockedDate),
        endDate: new Date(finishDate ? finishDate : finishDate.add(1, "hour")),
        location: localName,
        alarms: [{ relativeOffset: -30, method: Calendar.AlarmMethod.DEFAULT }],
        timeZone: timezone,
      });
      Calendar.openEventInCalendar(event);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <Image style={Style.coverImage} source={coverImage} />

      <View
        style={{
          ...Style.sectionContainer,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <View style={Style.eventInfo}>
          <View style={Style.eventLeftContainer}>
            <View style={Style.dateContainer}>
              <Text style={Style.dateText}>SEX, 08 DE DEZ ÀS 14:00</Text>
              {isToday && <Text style={Style.today}>Hoje!</Text>}
            </View>
            <Text style={Style.localName}>{eventName}</Text>
            <Text style={Style.localNeighborhood}>DF - Asa Sul</Text>
            <Text style={Style.localAddress}>
              SQN 311/312 no gramado entrequadras
            </Text>
          </View>

          <View style={Style.addToCalendarContainer}>
            <TouchableOpacity
              style={Style.calendarContainer}
              activeOpacity={0.7}
              onPress={() => addToCalendar()}
            >
              <Image
                style={{ width: 21.94 }}
                source={require("../../assets/calendar.png")}
              />
            </TouchableOpacity>
            <Text style={Style.addToCalendarText}>
              adicionar ao meu calendário
            </Text>
          </View>
        </View>

        <View style={Style.stripe} />

        <View style={Style.iconAndInfoContainer}>
          <Image
            style={{ width: 14.37 }}
            source={require("../../assets/flag.png")}
          />
          <Text style={Style.infoText}>
            evento de{" "}
            <Text style={Style.organizerName}>Brio Espaço Colaborativo</Text> e{" "}
            <Text style={Style.organizerName}>Estúdio Bicuda</Text>
          </Text>
        </View>

        <View style={Style.iconAndInfoContainer}>
          <Image
            style={{ aspectRatio: 1 }}
            source={require("../../assets/minuto.png")}
          />
          <Text style={Style.infoText}>
            acontecerá na Quarta à partir de 17:00h
          </Text>
        </View>

        <View style={Style.iconAndInfoContainer}>
          <Image
            // style={{ width: 18 }}
            source={require("../../assets/ticket.png")}
          />
          <Text style={Style.infoText}>evento gratuito</Text>
        </View>

        <View style={Style.iconAndInfoContainer}>
          <Icon name="locais" size={17} color="#019B92" />
          <Text style={Style.infoText}>
            Taguatinga norte - QNL 12, Conjunto G
          </Text>
        </View>

        <ShowLocation
          destinationLatitude={parseFloat(latitudeDestination)}
          destinationLongitude={parseFloat(longitudeDestination)}
          destinationName={localName}
          style={Style.map}
        />
        <View style={Style.attentionTextContainer}>
          <View style={Style.attention} />
          <Text style={Style.noteText}>
            O tempo estimado de viagem não considera as condições de trânsito
          </Text>
        </View>

        {/* MAPA ----------------------------------- */}
      </View>

      <Accordion
        title="Detalhes"
        toggleButtonStyle={Style.toggleButtonStyle}
        textStyle={{ ...Style.title }}
        contentContainerStyle={Style.contentContainerStyle}
      >
        <Text style={Style.text}>
          {`O mercado das pulgas (português brasileiro) ou feira da ladra (português europeu) é um local onde diversos vendedores se reúnem para comercializar bens antigos, usados e outras mercadorias, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore`}
        </Text>
        <View style={Style.tagsContainer}>
          <View style={Style.tag}>
            <Text style={Style.tagText}>Feira</Text>
          </View>
          <View style={Style.tag}>
            <Text style={Style.tagText}>Artesanais</Text>
          </View>
          <View style={Style.tag}>
            <Text style={Style.tagText}>Objetos</Text>
          </View>
          <View style={Style.tag}>
            <Text style={Style.tagText}>Compra e venda</Text>
          </View>
        </View>
      </Accordion>

      <View style={Style.sectionContainer}>
        <Text
          style={{
            ...Style.title,
            marginTop: cw(14),
            marginBottom: cw(23),
            marginLeft: cw(6),
          }}
        >
          Organizado por
        </Text>

        <View style={Style.organizerContainer}>
          <Image style={Style.organizerPicture} source={BrioPicture} />
          <View style={Style.nameAndButtonContainer}>
            <Text style={Style.organizerTitle}>Brio Espaço Colaborativo</Text>
            <RoundedButton
              active={seguindoBrio}
              text="seguindo"
              style={Style.followingButton}
              textStyle={Style.followingButtonText}
              onPress={() => setSeguindoBrio(!seguindoBrio)}
            />
          </View>
        </View>

        <View style={Style.organizerContainer}>
          <Image style={Style.organizerPicture} source={BicudaPicture} />
          <View style={Style.nameAndButtonContainer}>
            <Text style={Style.organizerTitle}>Estúdio Bicuda</Text>
            <RoundedButton
              active={seguindoBicuda}
              text="seguindo"
              style={Style.followingButton}
              textStyle={Style.followingButtonText}
              onPress={() => setSeguindoBicuda(!seguindoBicuda)}
            />
          </View>
        </View>
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
          <TouchableOpacity style={{ ...Style.iconContainer, top: cw(189) }}>
            <Icon name="compartilhar" size={cw(18.18)} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={Style.iconContainer}>
            <Icon name="salvar" size={cw(13.5)} color="#FFFFFF" />
          </TouchableOpacity>
          <Image style={Style.additionalEventImage} source={eventBrio} />
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
        </View>
      </View>
    </ScrollView>
  );
}
