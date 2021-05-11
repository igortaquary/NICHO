import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  LogBox,
  Keyboard,
} from "react-native";
import Style from "./styles";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Icon from "./../../components/Icon/index";
import CoverPlaceholder from "../../components/CoverPlaceholder/index";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import AutocompleteWithMaps from "../../components/AutocompleteWithMaps";
import { AddSpacePhotos } from "../../components/AddSpacePhotos";
import {addEvent} from '../../api/addEvent';
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default function CreateEvent({ navigation }) {
  // ---------------------- Cover ----------------------

  const [coverImage, setCoverImage] = useState([]);
  const [coverImageErrorMessage, setCoverImageErrorMessage] = useState("");

  // ---------------------- Event name ----------------------

  const [eventName, setEventName] = useState("");
  const [eventNameErrorMessage, setEventNameErrorMessage] = useState("");

  // ---------------------- Location 1 ----------------------

  const [eventLocationText, setEventLocationText] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeGeometry, setPlaceGeometry] = useState();
  const [placeAddress, setPlaceAddress] = useState("");
  const [useMaps, setUseMaps] = useState(true);
  const [
    eventLocationTextErrorMessage,
    setEventLocationTextErrorMessage,
  ] = useState("");

  // ---------------------- Dates ----------------------

  const [datetimes, setDatetimes] = useState([
    {
      date: { from: undefined, to: undefined },
      time: { from: undefined, to: undefined },
    },
  ]);
  const [date, setDate] = useState(Date.now());
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
  const [imagesErrorMessage, setImagesErrorMessage] = useState("");

  const scrollViewRef = useRef();
  const autocompleteFieldRef = useRef();

  const pkg = Constants.manifest.releaseChannel
    ? Constants.manifest.android.package
    : "host.exp.exponent";
  const openAppSettings = () => {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
      { data: "package:" + pkg }
    );
  };

  const [
    permission,
    askForPermission,
    getPermission,
  ] = Permissions.usePermissions(Permissions.LOCATION, {
    get: true,
    ask: true,
  });

  if (permission && permission.status !== "granted") {
    Alert.alert(
      "Localização",
      "A localização é necessária para alguns recursos do aplicativo",
      [
        {
          text: "Me lembre depois",
          onPress: () => console.log("Me lembre depois"),
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
        },
        {
          text: "Ativar",
          onPress: () =>
            permission.canAskAgain ? askForPermission() : openAppSettings(),
        },
      ],
      {
        cancelable: false,
      }
    );
  }

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
      setDatetimesErrorMessage(
        "Precisamos, pelo menos, da data e do horário de início!!"
      );
    } else setDatetimesErrorMessage("");

    auxArray = [];
    const incorrectDatetimes = datetimes.filter((datetime, index) => {
      // console.log("oiii");
      // console.log(datetime);
      let include = false;
      if (
        // moment(datetime.date.from).isBefore(new Date(), "day") ||
        !datetime.date.from
      ) {
        auxArray.push([index, "date", "from"]);
        include = true;
      }
      // if (moment(datetime.date.to).isBefore(new Date(), "day")) {
      //   auxArray.push([index, "date", "to"]);
      //   include = true;
      // }
      if (
        // moment(datetime.time.from).isBefore(new Date(), "minute") ||
        !datetime.time.from
      ) {
        auxArray.push([index, "time", "from"]);
        include = true;
      }
      // if (moment(datetime.time.to).isBefore(new Date(), "minute")) {
      //   auxArray.push([index, "time", "to"]);
      //   include = true;
      // }
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

    const selected = categories
      .filter((category) => category.selected)
      .map((element) => element.text);

    if (!selected.length) {
      error = true;
      setCategoriesErrorMessage("Selecione ao menos uma categoria!");
    } else setCategoriesErrorMessage("");

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
      let savingDatetimes = datetimes.map((datetime) => {
        let dateFrom = moment(datetime.date.from)
          .hours(moment(datetime.time.from).hours())
          .minutes(moment(datetime.time.from).minutes());
        let dateTo = moment(datetime.date.to)
          .hours(moment(datetime.time.to).hours())
          .minutes(moment(datetime.time.to).minutes());

        return { from: dateFrom, to: dateTo };
      });

      let event = {
        cover: coverImage,
        name: eventName,
        localization: {
          name: placeName,
          address: useMaps ? placeAddress : eventLocationText,
          geometry: placeGeometry,
        },
        dates: savingDatetimes,
        details: details,
        categories: selected,
        isFree: isFree,
        organizers: organizers,
        spacePhotos: coverImage.concat(images),
      };
      console.log(event);
      addEvent(event, navigation)
      clearPage();
    } else {
      // console.log(incorrectDatetimes);
      Keyboard.dismiss();
      setTimeout(scrollToTop, 10);
    }
  };

  function clearPage() {
    setCoverImage([]);
    setCoverImageErrorMessage("");

    setEventName("");
    setEventNameErrorMessage("");

    autocompleteFieldRef.current?.setAddressText("");
    setEventLocationText("");
    setPlaceName("");
    setPlaceGeometry();
    setPlaceAddress("");
    setUseMaps(true);
    setEventLocationTextErrorMessage("");

    setDatetimes([
      {
        date: { from: undefined, to: undefined },
        time: { from: undefined, to: undefined },
      },
    ]);
    setDate(Date.now());
    setCurrentIndex(0);
    setField();
    setMode("date");
    setShow(false);
    setDatetimesErrorMessage("");
    setDatetimesErrorIndexes([]);
    setIncorrectDatetimeMessage("");
    setIncorrectDatetimes([]);

    setDetails("");
    setDetailsErrorMessage("");

    setCategories([
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
    setCategoriesErrorMessage("");

    setIsFree(false);

    setOrganizers([]);
    setOrganizer("");
    setOrganizersErrorMessage("");

    setImages([]);
    setImagesErrorMessage("");
  }

  function scrollToTop() {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }

  const handleSetCategories = (button, index) => {
    setCategories(
      Object.assign([...categories], {
        [index]: { ...button, selected: !button.selected },
      })
    );
  };

  const handleOrganizers = (organizer, index) => {
    if (!/^\s*$/.test(organizer) || index >= 0) {
      let copyOrganizers = [...organizers];

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

        if (mode == "time") {
          toDate = toDate.isAfter(moment(date), "day")
            ? moment().endOf("day")
            : toDate;
        }
        // muda o estado da array afetando apenas a posiçao desejada
        auxArray[currentIndex][mode]["to"] = toDate.toDate();
      }
      auxArray[currentIndex][mode][field] = moment(date).toDate();
      setDatetimes(auxArray);
    }
  };

  // useEffect(() => {
  //   console.log(datetimes);
  //   console.log(incorrectDatetimes);
  // }, [datetimes]);

  const Picker = () => {
    function openPicker(index, mode, field, currentDate) {
      currentDate.pop();
      setDate(moment(currentDate).toDate());
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
        dateFrom = moment(datetime.date.from).toArray();
        // dateFrom = dateFrom.split("/");
      }
      if (datetime.date.to) {
        dateTo = moment(datetime.date.to).toArray();
        // dateTo = dateTo.split("/");
      }
      if (datetime.time.from) {
        timeFrom = moment(datetime.time.from).toArray();
        // timeFrom = timeFrom.match(/\w\w/g);
      }
      if (datetime.time.to) {
        timeTo = moment(datetime.time.to).toArray();
        // timeTo = timeTo.match(/\w\w/g);
      }

      dateFrom = [...dateFrom, checkError(index, "date", "from")];
      dateTo = [...dateTo, checkError(index, "date", "to")];
      timeFrom = [...timeFrom, checkError(index, "time", "from")];
      timeTo = [...timeTo, checkError(index, "time", "to")];

      // (^\d+|\d\B.)(?!$)

      return { dateFrom, dateTo, timeFrom, timeTo };
    }

    function checkError(index, mode, field) {
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
        (!!datetimesErrorMessage || !!incorrectDatetimeMessage) && includesError
      );
    }

    function handleRemoveDate(index) {
      let auxArray = [...datetimes];

      auxArray.splice(index, 1);
      setDatetimes(auxArray);
    }

    return datetimes.map((datetime, index) => {
      let { dateFrom, dateTo, timeFrom, timeTo } = handleTimeOrDateParts(
        index,
        datetime
      );

      return (
        <Fragment key={index}>
          <View style={Style.captionHeader}>
            <Text style={Style.caption}>Data {index + 1}:</Text>
            {index != 0 && (
              <TouchableOpacity
                onPress={() => handleRemoveDate(index)}
                style={{
                  top: cw(-4),
                }}
                hitSlop={{
                  bottom: 7,
                  left: 7,
                  right: 7,
                  top: 7,
                }}
              >
                <Icon name="x" size={cw(14)} color="#838383" />
              </TouchableOpacity>
            )}
          </View>
          {datetimesErrorIndexes.includes(index) && !!datetimesErrorMessage && (
            <Text style={[Style.errorMessage, { marginTop: cw(-10) }]}>
              {datetimesErrorMessage}
            </Text>
          )}

          {incorrectDatetimes.some((element) => element[0] == index) &&
            !!incorrectDatetimeMessage && (
              <Text style={[Style.errorMessage, { marginBottom: cw(5) }]}>
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
              onPress={() => openPicker(index, "date", "from", dateFrom)}
            >
              <Text style={Style.datetime}>
                {dateFrom[2] < 10 ? "0" + dateFrom[2] : dateFrom[2]}
              </Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>
                {dateFrom[1] < 10
                  ? "0" + (dateFrom[1] + 1)
                  : dateFrom[1] + 1 || "     "}
              </Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>{dateFrom[0]}</Text>
            </TouchableOpacity>
            <Text style={[Style.fromToText, { marginLeft: cw(20) }]}>Até:</Text>
            <TouchableOpacity
              style={[
                Style.scheduleInputContainer,
                dateTo.includes(true) && { borderColor: "red", borderWidth: 1 },
              ]}
              onPress={() => openPicker(index, "date", "to", dateTo)}
            >
              <Text style={Style.datetime}>
                {dateTo[2] < 10 ? "0" + dateTo[2] : dateTo[2]}
              </Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>
                {dateTo[1] < 10
                  ? "0" + (dateTo[1] + 1)
                  : dateTo[1] + 1 || "     "}
              </Text>
              <Text style={Style.bars}>/</Text>
              <Text style={Style.datetime}>{dateTo[0]}</Text>
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
              onPress={() => openPicker(index, "time", "from", timeFrom)}
            >
              <Text style={Style.datetime}>
                {timeFrom[3] < 10 ? "0" + timeFrom[3] : timeFrom[3]}
              </Text>
              <Text style={[Style.colons, { paddingRight: cw(-6) }]}>:</Text>
              <Text style={Style.datetime}>
                {timeFrom[4] < 10 ? "0" + timeFrom[4] : timeFrom[4]}
              </Text>
            </TouchableOpacity>
            <Text style={[Style.fromToText, { marginLeft: cw(20) }]}>Até:</Text>
            <TouchableOpacity
              style={[
                Style.scheduleInputContainer,
                timeTo.includes(true) && { borderColor: "red", borderWidth: 1 },
              ]}
              onPress={() => openPicker(index, "time", "to", timeTo)}
            >
              <Text style={Style.datetime}>
                {timeTo[3] < 10 ? "0" + timeTo[3] : timeTo[3]}
              </Text>
              <Text style={Style.colons}>:</Text>
              <Text style={Style.datetime}>
                {timeTo[4] < 10 ? "0" + timeTo[4] : timeTo[4]}
              </Text>
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
            locationText={eventLocationText}
            setLocationText={setEventLocationText}
            placeAddress={placeAddress}
            setPlaceAddress={setPlaceAddress}
            placeName={placeName}
            setPlaceName={setPlaceName}
            placeGeometry={placeGeometry}
            setPlaceGeometry={setPlaceGeometry}
            useMaps={useMaps}
            setUseMaps={setUseMaps}
            errorMessage={eventLocationTextErrorMessage}
            inputFieldReference={autocompleteFieldRef}
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

        <TouchableOpacity
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
          <Text style={Style.addDateText}>+ Adicionar outra data</Text>
        </TouchableOpacity>
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
              borderRadius: 5,
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