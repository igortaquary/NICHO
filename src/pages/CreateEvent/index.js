import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  LogBox,
} from "react-native";
import Style from "./styles";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Icon from "./../../components/Icon/index";
import CoverPlaceholder from "./../../components/coverPlaceholder";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AutocompleteWithMaps from "../../components/AutocompleteWithMaps";
import { AddSpacePhotos } from "../../components/AddSpacePhotos";

import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default function CreateEvent({ navigation }) {
  const [coverImage, setCoverImage] = useState([]);
  const [coverImageErrorMessage, setCoverImageErrorMessage] = useState("");

  const [eventName, setEventName] = useState("");
  const [eventNameErrorMessage, setEventNameErrorMessage] = useState("");

  const [eventLocationText, setEventLocationText] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeGeometry, setPlaceGeometry] = useState();
  const [placeAddress, setPlaceAddress] = useState("");
  const [useMaps, setUseMaps] = useState(true);
  const [
    eventLocationTextErrorMessage,
    setEventLocationTextErrorMessage,
  ] = useState("");

  const [datetimes, setDatetimes] = useState([
    {
      date: { from: undefined, to: undefined },
      time: { from: undefined, to: undefined },
    },
  ]);
  const [date, setDate] = useState(Date.now());
  const [currentDatetime, setCurrentDatetime] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [field, setField] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [datetimesErrorMessage, setDatetimesErrorMessage] = useState("");
  const [datetimesErrorIndexes, setDatetimesErrorIndexes] = useState([]);
  const [incorrectDatetimeMessage, setIncorrectDatetimeMessage] = useState("");
  const [incorrectDatetimes, setIncorrectDatetimes] = useState([]);

  const [details, setDetails] = useState("");
  const [detailsErrorMessage, setDetailsErrorMessage] = useState("");

  const [categories, setCategories] = useState([
    { text: "Arte digital", selected: false },
    { text: "Para vestir", selected: false },
    { text: "Decoração", selected: false },
    { text: "Papelaria", selected: false },
    { text: "Cosméticos", selected: false },
    { text: "Jardim", selected: false },
    { text: "Esculturas", selected: false },
    { text: "Desenhos e Pinturas", selected: false },
    { text: "Acessórios", selected: false },
  ]);
  const [categoriesErrorMessage, setCategoriesErrorMessage] = useState("");

  const [isFree, setIsFree] = useState(false);

  const [organizers, setOrganizers] = useState([]);
  const [organizer, setOrganizer] = useState("");
  const [organizersErrorMessage, setOrganizersErrorMessage] = useState("");

  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagesErrorMessage, setImagesErrorMessage] = useState("");

  const scrollViewRef = useRef();

  const handleSave = () => {
    let error = false;

    if (coverImage.length == 0) {
      error = true;
      setCoverImageErrorMessage(
        `Insira uma imagem de capa para o local!\nEssa imagem aparecerá na lista de eventos!`
      );
    } else setCoverImageErrorMessage("");

    if (/^\s*$/.test(eventName)) {
      error = true;
      setEventNameErrorMessage("Escreva o nome do evento!");
    } else setEventNameErrorMessage("");

    if (useMaps) {
      if (!placeName || !placeGeometry || !placeAddress) {
        error = true;
        setEventLocationTextErrorMessage(
          "Digite o endereço do evento e selecione um lugar na lista de locais!"
        );
      } else setEventLocationTextErrorMessage("");
    } else {
      if (/^\s*$/.test(eventLocationText)) {
        error = true;
        setEventLocationTextErrorMessage(
          "Escreva o endereço de onde ocorrerá o evento!"
        );
      } else setEventLocationTextErrorMessage("");
    }

    let auxArray = [];

    const found = datetimes.filter((datetime, index) => {
      if (!datetime.date.from || !datetime.time.from) {
        auxArray.push(index);
        return true;
      }
    });

    if (found.length) {
      error = true;
      setDatetimesErrorIndexes(auxArray);
      setDatetimesErrorMessage("Precisamos da data e do horário de início!!");
    } else setDatetimesErrorMessage("");

    auxArray = [];
    const incorrectDatetimes = datetimes.filter((datetime, index) => {
      // console.log("oiii");
      // console.log(datetime);
      let include = false;
      if (moment(datetime.date.from).isBefore(new Date(), "day")) {
        auxArray.push([index, "date", "from"]);
        include = true;
      }
      if (moment(datetime.date.to).isBefore(new Date(), "day")) {
        auxArray.push([index, "date", "to"]);
        include = true;
      }
      if (moment(datetime.time.from).isBefore(new Date(), "minute")) {
        auxArray.push([index, "time", "from"]);
        include = true;
      }
      if (moment(datetime.time.to).isBefore(new Date(), "minute")) {
        auxArray.push([index, "time", "to"]);
        include = true;
      }
      if (moment(datetime.date.from).isAfter(moment(datetime.date.to))) {
        auxArray.push([index, "date"]);

        include = true;
      }
      if (moment(datetime.time.from).isAfter(moment(datetime.time.to))) {
        auxArray.push([index, "time"]);

        include = true;
      }
      return include && true;
    });

    if (incorrectDatetimes.length) {
      error = true;
      setIncorrectDatetimeMessage("Existem Datas incorretas!");
      setIncorrectDatetimes(auxArray);
    } else setIncorrectDatetimeMessage("");

    console.log(details);
    if (/^\s*$/.test(details)) {
      error = true;
      setDetailsErrorMessage("Insira uma descrição do evento!");
    } else setDetailsErrorMessage("");

    const selected = categories.find((category) => category.selected == true);

    if (!selected) {
      error = true;
      setCategoriesErrorMessage("Selecione ao menos uma categoria!");
    } else setEventNameErrorMessage("");

    if (organizers.length == 0) {
      error = true;
      setOrganizersErrorMessage("O evento deve ter ao menos um organizador!");
    }

    if (images.length == 0) {
      error = true;
      setImagesErrorMessage("Adicione ao menos uma imagem do local do evento!");
    }

    if (!error) {
      console.warn("Enviou!!!!");
      let event = {
        name: eventName,
        localization: {
          name: placeName,
          address: useMaps ? placeAddress : eventLocationText,
          geometry: placeGeometry,
        },
        dates: datetimes,
        details: details,
        categories: categories
          .filter((element) => element.selected)
          .map((element) => element.text),
        isFree: isFree,
        organizers: organizers,
        spacePhotos: images,
      };
      console.log(event);
    } else {
      console.log(incorrectDatetimes);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const handleSetCategories = (button, index) => {
    setCategories(
      Object.assign([...categories], {
        [index]: { ...button, selected: !button.selected },
      })
    );
  };

  const handleOrganizers = (organizer, index) => {
    console.log(organizer, index);
    if (!/^\s*$/.test(organizer) || index >= 0) {
      let copyOrganizers = [...organizers];
      console.log("entrou", copyOrganizers);
      if (organizer) {
        copyOrganizers.splice(copyOrganizers.length, 1, organizer);
        setOrganizer("");
      } else copyOrganizers.splice(index, 1);
      setOrganizers(copyOrganizers);
    }
  };

  const Categories = () => {
    return categories.map((button, index) => (
      <RoundedButton
        key={button.text}
        text={button.text}
        style={Style.categoryButton}
        textStyle={Style.categoryButtonText}
        active={button.selected}
        onPress={() => {
          handleSetCategories(button, index);
        }}
      />
    ));
  };

  const handleDatetime = (event, date) => {
    setShow(false); // muda o estado da variavel show para false para que o date/time picker nao fique aparecendo de novo

    if (event.type === "set") {
      // verifica se a pessoa clicou em "ok" no date/time picker

      let auxArray = [...datetimes];

      // se currentDateTime for null nao ha nada para colocar no objeto

      if (field == "from" && !auxArray[currentIndex][mode]["to"]) {
        let addType = mode == "date" ? "days" : "hours";
        let toDate = moment(date).add(1, addType);

        // muda o estado da array afetando apenas a posiçao desejada
        auxArray[currentIndex][mode]["to"] = toDate;
      }
      auxArray[currentIndex][mode][field] = moment(date);
      setDatetimes(auxArray);
    }
  };

  // useEffect(() => {
  //   console.log(datetimes);
  //   console.log(incorrectDatetimes);
  // }, [datetimes]);

  const Picker = () => {
    function openPicker(index, mode, field) {
      setDate(new Date());
      setMode(mode);
      setField(field);
      setShow(true);
      setCurrentIndex(index);
    }

    function handleTimeOrDateParts(index, datetime) {
      // transforma a string do objeto datetime em um array de strings como [mes, dia, ano] ou [hora, minutos]
      let [dateFrom, dateTo, timeFrom, timeTo] = Array(4).fill("");
      // console.log(datetime[attribute] ? true : false);
      if (datetime.date.from) {
        dateFrom = moment(datetime.date.from).format("L");
        dateFrom = dateFrom.split("/");
      }
      if (datetime.date.to) {
        dateTo = moment(datetime.date.to).format("L");
        dateTo = dateTo.split("/");
      }
      if (datetime.time.from) {
        timeFrom = moment(datetime.time.from).format("HH:mm");
        timeFrom = timeFrom.match(/\w\w/g);
      }
      if (datetime.time.to) {
        timeTo = moment(datetime.time.to).format("HH:mm");
        timeTo = timeTo.match(/\w\w/g);
      }

      dateFrom = [...dateFrom, checkError(dateFrom, index, "date", "from")];
      dateTo = [...dateTo, checkError(dateTo, index, "date", "to")];
      timeFrom = [...timeFrom, checkError(timeFrom, index, "time", "from")];
      timeTo = [...timeTo, checkError(timeTo, index, "time", "to")];

      // (^\d+|\d\B.)(?!$)

      return { dateFrom, dateTo, timeFrom, timeTo };
    }

    function checkError(TimeOrDateArray, index, mode, field) {
      const includesError = incorrectDatetimes.some((incorrect) => {
        if (incorrect[0] == index && incorrect[1] == mode) {
          if (!incorrect[2]) {
            return true;
          } else if (incorrect[2] == field) {
            return true;
          }
        }
      });

      return (
        (!TimeOrDateArray && !!datetimesErrorMessage) ||
        (!!incorrectDatetimeMessage && includesError)
      );
    }

    return datetimes.map((datetime, index) => {
      let { dateFrom, dateTo, timeFrom, timeTo } = handleTimeOrDateParts(
        index,
        datetime
      );

      return (
        <Fragment key={index}>
          <Text style={Style.caption}>Data {index + 1}:</Text>

          {datetimesErrorIndexes.includes(index) && (
            <Text
              style={[
                Style.errorMessage,
                { marginTop: cw(-16.9), marginBottom: cw(5) },
              ]}
            >
              {datetimesErrorMessage}
            </Text>
          )}

          {incorrectDatetimes.some((element) => element[0] == index) && (
            <Text style={[Style.errorMessage, { marginBottom: cw(10) }]}>
              {incorrectDatetimeMessage}
            </Text>
          )}

          <View style={Style.scheduleDateHourContainer}>
            <Icon name="calendar" size={cw(21.94)} color="#707070" />
            <Text style={[Style.fromToText, { marginLeft: cw(12) }]}>De:</Text>
            <TouchableOpacity
              style={[
                Style.scheduleInputContainer,
                dateFrom.includes(true) && {
                  borderColor: "red",
                  borderWidth: 1,
                },
              ]}
              onPress={() => openPicker(index, "date", "from")}
            >
              <Text style={Style.datetime}>{dateFrom[0]}</Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>{dateFrom[1] || "     "}</Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>{dateFrom[2]}</Text>
            </TouchableOpacity>
            <Text style={[Style.fromToText, { marginLeft: cw(20) }]}>Até:</Text>
            <TouchableOpacity
              style={[
                Style.scheduleInputContainer,
                dateTo.includes(true) && { borderColor: "red", borderWidth: 1 },
              ]}
              onPress={() => openPicker(index, "date", "to")}
            >
              <Text style={Style.datetime}>{dateTo[0]}</Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>{dateTo[1] || "     "}</Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>{dateTo[2]}</Text>
            </TouchableOpacity>
          </View>
          <View style={Style.scheduleDateHourContainer}>
            <Icon name="clock" size={cw(22)} color="#707070" />
            <Text style={[Style.fromToText, { marginLeft: cw(11) }]}>De:</Text>
            <TouchableOpacity
              style={[
                Style.scheduleInputContainer,

                timeFrom.includes(true) && {
                  borderColor: "red",
                  borderWidth: 1,
                },
              ]}
              onPress={() => openPicker(index, "time", "from")}
            >
              <Text style={Style.datetime}>{timeFrom[0]}</Text>
              <Text style={[Style.colons, { paddingRight: cw(-6) }]}>:</Text>
              <Text style={Style.datetime}>{timeFrom[1]}</Text>
            </TouchableOpacity>
            <Text style={[Style.fromToText, { marginLeft: cw(20) }]}>Até:</Text>
            <TouchableOpacity
              style={[
                Style.scheduleInputContainer,
                timeTo.includes(true) && { borderColor: "red", borderWidth: 1 },
              ]}
              onPress={() => openPicker(index, "time", "to")}
            >
              <Text style={Style.datetime}>{timeTo[0]}</Text>
              <Text style={Style.colons}>:</Text>
              <Text style={Style.datetime}>{timeTo[1]}</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      );
    });
  };

  useEffect(() => {
    setPlaceName("");
    setPlaceAddress("");
    setPlaceGeometry("");
  }, [useMaps]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      contentContainerStyle={Style.page}
      keyboardShouldPersistTaps={"handled"}
      showsVerticalScrollIndicator={false}
    >
      <CoverPlaceholder
        buttonStyle={Style.coverText}
        image={coverImage}
        setImage={setCoverImage}
        errorMessage={coverImageErrorMessage}
      />

      <View
        style={[
          Style.sectionContainer,
          {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            paddingTop: cw(40),
            zIndex: 5,
          },
        ]}
      >
        <Text style={[Style.title, { marginLeft: cw(5) }]}>Nome do evento</Text>

        <TextInput
          style={[
            Style.eventNameInput,
            eventNameErrorMessage.length && {
              borderColor: "red",
              borderWidth: 1,
            },
          ]}
          value={eventName}
          onChangeText={(text) => setEventName(text)}
        />

        {eventNameErrorMessage != "" && (
          <Text style={[Style.errorMessage, { top: cw(-27) }]}>
            {eventNameErrorMessage}
          </Text>
        )}

        <View style={Style.stripe} />
        <Text style={[Style.title, { marginLeft: cw(8) }]}>Onde ocorrerá?</Text>
        <View style={[Style.locationContainer]}>
          <AutocompleteWithMaps
            placeholderText="Digite o local do evento"
            eventLocationText={eventLocationText}
            setEventLocationText={setEventLocationText}
            placeAddress={placeAddress}
            setPlaceAddress={setPlaceAddress}
            placeName={placeName}
            setPlaceName={setPlaceName}
            placeGeometry={placeGeometry}
            setPlaceGeometry={setPlaceGeometry}
            useMaps={useMaps}
            setUseMaps={setUseMaps}
            errorMessage={eventLocationTextErrorMessage}
          />
        </View>

        <View
          style={[Style.stripe, { marginTop: cw(22), marginBottom: cw(25) }]}
        />
        <Text style={Style.title}>Data do evento</Text>
        <Picker />
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            // display={"spinner"}
            onChange={(event, date) => {
              handleDatetime(event, date);
            }}
          />
        )}

        <Text
          style={Style.addDateText}
          onPress={() =>
            setDatetimes([
              ...datetimes,
              {
                date: { from: undefined, to: undefined },
                time: { from: undefined, to: undefined },
              },
            ])
          }
        >
          + Adicionar outra data
        </Text>
      </View>

      <View
        style={[
          Style.sectionContainer,
          {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            paddingTop: cw(26),
          },
        ]}
      >
        <Text style={Style.title}>Detalhes sobre o evento</Text>
        {detailsErrorMessage != "" && (
          <Text style={[Style.errorMessage, { marginTop: cw(5) }]}>
            {detailsErrorMessage}
          </Text>
        )}
        <TextInput
          style={[
            Style.detailsInput,
            detailsErrorMessage && { borderColor: "red", borderWidth: 1 },
          ]}
          placeholder={"Fale um pouco sobre o evento"}
          multiline={true}
          textBreakStrategy={"highQuality"}
          placeholderTextColor={"#AEAEAE"}
          value={details}
          onChangeText={(text) => setDetails(text)}
        />

        <Text style={[Style.title, { marginLeft: cw(9) }]}>
          Que tipo de produtos estão disponíveis aqui?
        </Text>
        {categoriesErrorMessage != "" && (
          <Text
            style={[
              Style.errorMessage,
              { marginTop: cw(10), marginLeft: cw(9) },
            ]}
          >
            {categoriesErrorMessage}
          </Text>
        )}
        <View
          style={[
            Style.categoriesContainer,
            categoriesErrorMessage != "" && {
              borderColor: "red",
              borderWidth: 1,
            },
          ]}
        >
          <Categories />
        </View>

        <View style={[Style.checkboxContainer, { marginBottom: cw(27) }]}>
          <TouchableOpacity
            style={[Style.checkbox]}
            onPress={() => setIsFree(!isFree)}
          >
            {isFree ? (
              <Feather name="check-square" size={18} color="#019B92" />
            ) : (
              <Feather name="square" size={18} color="#707070" />
            )}
          </TouchableOpacity>
          <Text style={Style.freeEventText}>Evento Gratuito</Text>
        </View>

        <View style={[Style.stripe, { marginBottom: cw(26) }]} />

        <Text
          style={[Style.title, { marginLeft: cw(4), marginBottom: cw(10) }]}
        >
          Organizado por
        </Text>

        {organizersErrorMessage != "" && (
          <Text
            style={[Style.errorMessage, { top: cw(-5), marginVertical: cw(5) }]}
          >
            {organizersErrorMessage}
          </Text>
        )}

        {organizers.map((organizer, index) => (
          <View key={index} style={Style.organizerContainer}>
            <Text
              style={[Style.addRemoveOrganizer, { top: cw(-3) }]}
              onPress={() => handleOrganizers(null, index)}
            >
              -
            </Text>
            <Text style={Style.organizerName}>{organizer}</Text>
            {/* <TextInput style={Style.organizerInput} /> */}
          </View>
        ))}

        <View
          style={[
            Style.organizerContainer,
            { marginBottom: cw(31) },
            organizersErrorMessage != "" && {
              borderColor: "red",
              borderWidth: 1,
            },
          ]}
        >
          <Text
            style={Style.addRemoveOrganizer}
            onPress={() => {
              handleOrganizers(organizer);
            }}
          >
            +
          </Text>
          <TextInput
            style={[Style.organizerInput]}
            placeholder={"Adicionar organizador"}
            value={organizer}
            onChangeText={(text) => setOrganizer(text)}
            placeholderTextColor={"#AEAEAE"}
          />
        </View>

        <View style={[Style.stripe, { marginBottom: cw(27) }]} />

        <AddSpacePhotos
          images={images}
          setImages={setImages}
          errorMessage={imagesErrorMessage}
        />

        <RoundedButton
          text="Salvar alterações"
          style={Style.saveButton}
          textStyle={Style.saveButtonText}
          onPress={handleSave}
        />
        <Text style={[Style.cancel]} onPress={() => navigation.goBack()}>
          Cancelar
        </Text>
      </View>
    </ScrollView>
  );
}
