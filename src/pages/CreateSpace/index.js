import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  LogBox,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import Style from "./styles";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Icon from "./../../components/Icon/index";
import CoverPlaceholder from "../../components/CoverPlaceholder";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import AutocompleteWithMaps from "../../components/AutocompleteWithMaps";
import { AddSpacePhotos } from "../../components/AddSpacePhotos";
import { addSpace } from "../../api/addSpace";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import { ImageModal, pickImage } from "../../components/ImagePickerWithModal";

export default function CreateSpace({ navigation }) {
  // ---------------------- Cover ----------------------

  const [coverImage, setCoverImage] = useState([]);
  const [coverImageErrorMessage, setCoverImageErrorMessage] = useState("");

  // ---------------------- Profile Picture ----------------------

  const [profilePicture, setProfilePicture] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profilePictureErrorMessage, setProfilePictureErrorMessage] =
    useState("");

  // ---------------------- Establishment Name ----------------------

  const [establishmentName, setEstablishmentName] = useState("");
  const [establishmentNameErrorMessage, setEstablishmentNameErrorMessage] =
    useState("");

  // ---------------------- Location Counter ----------------------

  const [locationCounter, setLocationCounter] = useState([0, 0, 0]);

  // ---------------------- Location 1 ----------------------

  const [locationText1, setLocationText1] = useState("");
  const [useMaps1, setUseMaps1] = useState(true);
  const [placeName1, setPlaceName1] = useState("");
  const [placeAddress1, setPlaceAddress1] = useState("");
  const [placeGeometry1, setPlaceGeometry1] = useState("");
  const [locationTextErrorMessage1, setLocationTextErrorMessage1] =
    useState("");

  // ---------------------- Location 2 ----------------------

  const [locationText2, setLocationText2] = useState("");
  const [placeName2, setPlaceName2] = useState("");
  const [placeGeometry2, setPlaceGeometry2] = useState();
  const [placeAddress2, setPlaceAddress2] = useState("");
  const [useMaps2, setUseMaps2] = useState(true);
  const [locationTextErrorMessage2, setLocationTextErrorMessage2] =
    useState("");

  // ---------------------- Location 3 ----------------------

  const [locationText3, setLocationText3] = useState("");
  const [placeName3, setPlaceName3] = useState("");
  const [placeGeometry3, setPlaceGeometry3] = useState();
  const [placeAddress3, setPlaceAddress3] = useState("");
  const [useMaps3, setUseMaps3] = useState(true);
  const [locationTextErrorMessage3, setLocationTextErrorMessage3] =
    useState("");

  // ---------------------- Location 4 ----------------------

  const [locationText4, setLocationText4] = useState("");
  const [placeName4, setPlaceName4] = useState("");
  const [placeGeometry4, setPlaceGeometry4] = useState();
  const [placeAddress4, setPlaceAddress4] = useState("");
  const [useMaps4, setUseMaps4] = useState(true);
  const [locationTextErrorMessage4, setLocationTextErrorMessage4] =
    useState("");

  // ---------------------- Business Hours ----------------------

  const [businessHours, setBusinessHours] = useState([
    {
      days: [
        { text: "Segunda", selected: false },
        { text: "Terça", selected: false },
        { text: "Quarta", selected: false },
        { text: "Quinta", selected: false },
        { text: "Sexta", selected: false },
        { text: "Sábado", selected: false },
        { text: "Domingo", selected: false },
      ],
      time: {
        from: undefined,
        to: undefined,
      },
    },
  ]);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [field, setField] = useState("");
  const [incorrectBusinessHours, setIncorrectBusinessHours] = useState([]);
  const [businessHoursErrorMessage, setBusinessHoursErrorMessage] =
    useState("");

  // ---------------------- Contacts  ----------------------

  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  // ---------------------- Details  ----------------------

  const [details, setDetails] = useState("");
  const [detailsErrorMessage, setDetailsErrorMessage] = useState("");

  // ---------------------- Categories ----------------------

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

  // ---------------------- Images  ----------------------

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

  const [permission, askForPermission, getPermission] =
    Permissions.usePermissions(Permissions.LOCATION, {
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

  function handleSave() {
    let error = false;

    if (!coverImage.length) {
      error = true;
      setCoverImageErrorMessage(`Insira uma imagem de capa para o local!\n`);
    } else setCoverImageErrorMessage("");

    if (!profilePicture.length) {
      error = true;
      setProfilePictureErrorMessage("Adicione uma foto de perfil!");
    } else setProfilePictureErrorMessage("");

    if (/^\s*$/.test(establishmentName)) {
      error = true;
      setEstablishmentNameErrorMessage("Insira o nome do estabelecimento!");
    } else setEstablishmentNameErrorMessage("");

    let useMapsErrorMessage =
      "Digite um endereço e selecione um local da lista!";
    let nonMapsErrorMessage = "Insira o endereço do local!";
    let savingLocations = [];

    switch (locationCounter.lastIndexOf(1)) {
      case 2:
        if (useMaps4) {
          if (!placeAddress4 || !placeGeometry4 || !placeName4) {
            setLocationTextErrorMessage4(useMapsErrorMessage);
          } else {
            setLocationTextErrorMessage4("");
            savingLocations.push({
              placeAddress: placeAddress4,
              placeGeometry: placeGeometry4,
              placeName: placeName4,
            });
          }
        } else if (/^\s*$/.test(locationText4)) {
          error = true;
          setLocationTextErrorMessage4(nonMapsErrorMessage);
        } else {
          setLocationTextErrorMessage4("");
          savingLocations.push({ locationText: locationText4 });
        }

      case 1:
        if (useMaps3) {
          if (!placeAddress3 || !placeGeometry3 || !placeName3) {
            setLocationTextErrorMessage3(useMapsErrorMessage);
          } else {
            setLocationTextErrorMessage3("");
            savingLocations.push({
              placeAddress: placeAddress3,
              placeGeometry: placeGeometry3,
              placeName: placeName3,
            });
          }
        } else if (/^\s*$/.test(locationText3)) {
          error = true;
          setLocationTextErrorMessage3(nonMapsErrorMessage);
        } else {
          setLocationTextErrorMessage3("");
          savingLocations.push({ locationText: locationText3 });
        }

      case 0:
        if (useMaps2) {
          if (!placeAddress2 || !placeGeometry2 || !placeName2) {
            setLocationTextErrorMessage2(useMapsErrorMessage);
          } else {
            setLocationTextErrorMessage2("");
            savingLocations.push({
              placeAddress: placeAddress2,
              placeGeometry: placeGeometry2,
              placeName: placeName2,
            });
          }
        } else if (/^\s*$/.test(locationText2)) {
          error = true;
          setLocationTextErrorMessage2(nonMapsErrorMessage);
        } else {
          setLocationTextErrorMessage2("");
          savingLocations.push({ locationText: locationText2 });
        }

      default:
        if (useMaps1) {
          if (!placeAddress1 || !placeGeometry1 || !placeName1) {
            setLocationTextErrorMessage1(useMapsErrorMessage);
          } else {
            setLocationTextErrorMessage1("");
            savingLocations.push({
              placeAddress: placeAddress1,
              placeGeometry: placeGeometry1,
              placeName: placeName1,
            });
          }
        } else if (/^\s*$/.test(locationText1)) {
          error = true;
          setLocationTextErrorMessage1(nonMapsErrorMessage);
        } else {
          setLocationTextErrorMessage1("");
          savingLocations.push({ locationText: locationText1 });
        }
    }

    // businessHours.find(element => element.days.find(day => !day.selected) || )
    let auxIncorrectBusinessHours = [];
    let savingBusinessHours;

    businessHours.forEach((element, index) => {
      if (!element.days.find((day) => day.selected)) {
        auxIncorrectBusinessHours = [
          ...auxIncorrectBusinessHours,
          [index, "days"],
        ];
      }
      if (!element.time.from) {
        console.log("element time from ");
        console.log(element.time.from);
        auxIncorrectBusinessHours = [
          ...auxIncorrectBusinessHours,
          [index, "from"],
        ];
      }
      if (!element.time.to) {
        auxIncorrectBusinessHours = [
          ...auxIncorrectBusinessHours,
          [index, "to"],
        ];
      }
      if (
        element.time.to &&
        element.time.from &&
        (moment(element.time.to).isSameOrBefore(element.time.from, "minute") ||
          moment(element.time.to).isSameOrBefore(element.time.from, "minute"))
      ) {
        auxIncorrectBusinessHours = [
          ...auxIncorrectBusinessHours,
          [index, "time"],
        ];
      }
    });

    if (auxIncorrectBusinessHours.length) {
      error = true;
      setBusinessHoursErrorMessage(
        "Você deve marcar ao menos um dia e preencher o horário corretamente!"
      );
      setIncorrectBusinessHours(auxIncorrectBusinessHours);
    } else {
      setIncorrectBusinessHours([]);
      setBusinessHoursErrorMessage("");
      savingBusinessHours = businessHours.map((element) => {
        let daysArray = [];

        element.days.forEach(
          (day, index) => day.selected && (daysArray = [...daysArray, index])
        );

        return {
          days: daysArray,
          time: {
            from: moment(element.time.from).toDate(),
            to: moment(element.time.to).toDate(),
          },
        };
      });
    }

    if (/^\s*$/.test(details)) {
      error = true;
      setDetailsErrorMessage("Insira uma descrição do estabelecimento!");
    } else setDetailsErrorMessage("");

    const selected = categories
      .filter((category) => category.selected == true)
      .map((e) => e.text);

    if (!selected.length) {
      error = true;
      setCategoriesErrorMessage("Selecione ao menos uma categoria!");
    } else setCategoriesErrorMessage("");

    if (!images.length) {
      error = true;
      setImagesErrorMessage("Adicione ao menos uma imagem do estabelecimento!");
    }

    console.log("APERTOU");
    if (!error) {
      console.warn("ENVIOOOU!!!");
      let establishment = {
        name: establishmentName,
        locations: savingLocations,
        businessHours: savingBusinessHours,
        contacts: { instagram: instagram, phone: phone, website: website },
        details: details,
        categories: selected,
        images: coverImage.concat(profilePicture).concat(images),
      };
      addSpace(establishment, navigation);
      clearPage();
      console.log(establishment);
    } else {
      Keyboard.dismiss();
      setTimeout(scrollToTop, 10);
    }
  }

  function clearPage() {
    setCoverImage([]);
    setCoverImageErrorMessage("");

    setProfilePicture([]);
    setShowModal(false);
    setProfilePictureErrorMessage("");

    setEstablishmentName("");
    setEstablishmentNameErrorMessage("");

    setLocationCounter([0, 0, 0]);
    autocompleteFieldRef.current?.setAddressText("");

    setLocationText1("");
    setUseMaps1(true);
    setPlaceName1("");
    setPlaceAddress1("");
    setPlaceGeometry1("");
    setLocationTextErrorMessage1("");

    setLocationText2("");
    setPlaceName2("");
    setPlaceGeometry2();
    setPlaceAddress2("");
    setUseMaps2(true);
    setLocationTextErrorMessage2("");

    setLocationText3("");
    setPlaceName3("");
    setPlaceGeometry3();
    setPlaceAddress3("");
    setUseMaps3(true);
    setLocationTextErrorMessage3("");

    setLocationText4("");
    setPlaceName4("");
    setPlaceGeometry4();
    setPlaceAddress4("");
    setUseMaps4(true);
    setLocationTextErrorMessage4("");

    setBusinessHours([
      {
        days: [
          { text: "Segunda", selected: false },
          { text: "Terça", selected: false },
          { text: "Quarta", selected: false },
          { text: "Quinta", selected: false },
          { text: "Sexta", selected: false },
          { text: "Sábado", selected: false },
          { text: "Domingo", selected: false },
        ],
        time: {
          from: undefined,
          to: undefined,
        },
      },
    ]);
    setTime(new Date());
    setShowPicker(false);
    setCurrentIndex();
    setField("");
    setIncorrectBusinessHours([]);
    setBusinessHoursErrorMessage("");

    setInstagram("");
    setPhone("");
    setWebsite("");

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
    setImages([]);
    setImagesErrorMessage("");
  }

  function scrollToTop() {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }

  function handleTime(event, time) {
    setShowPicker(false);

    if (event.type === "set") {
      let auxArray = [...businessHours];

      // se currentDateTime for null nao ha nada para colocar no objeto

      if (field == "from" && !auxArray[currentIndex].time.to) {
        let toTime = moment(time).add(8, "hours");

        // muda o estado da array afetando apenas a posiçao desejada
        auxArray[currentIndex].time.to = toTime.isAfter(moment(time), "day")
          ? moment().endOf("day")
          : toTime;
      }
      auxArray[currentIndex].time[field] = moment(time).toDate();
      setBusinessHours(auxArray);
    }
  }

  function BusinessHoursPicker() {
    function handleTimePicker(index, field, currentTime) {
      setShowPicker(true);
      setCurrentIndex(index);
      setField(field);
      console.log("aquii");
      currentTime.pop();
      setTime(moment(currentTime).toDate());
    }

    function handleTimeParts(index, businessHour) {
      // transforma a string do objeto datetime em um array de strings como [mes, dia, ano] ou [hora, minutos]
      let [timeFrom, timeTo] = Array(2).fill("");

      if (businessHour.time.from) {
        timeFrom = moment(businessHour.time.from).toArray();
        // timeFrom = timeFrom.match(/\w\w/g);
      }
      if (businessHour.time.to) {
        timeTo = moment(businessHour.time.to).toArray();
        // timeTo = timeTo.match(/\w\w/g);
      }

      timeFrom = [...timeFrom, checkError(index, "from")];
      timeTo = [...timeTo, checkError(index, "to")];

      // (^\d+|\d\B.)(?!$)

      return { timeFrom, timeTo };
    }

    function handleSetDays(index, dayIndex) {
      let auxArray = [...businessHours];
      auxArray[index].days[dayIndex].selected =
        !auxArray[index].days[dayIndex].selected;
      setBusinessHours(auxArray);
    }

    function checkError(index, field) {
      const includesError = incorrectBusinessHours.some((incorrect) => {
        if (incorrect[0] == index) {
          if (incorrect[1] == "time") {
            return true;
          } else if (incorrect[1] == field) {
            return true;
          }
        }
      });
      console.log("segue");
      console.log(businessHoursErrorMessage);
      console.log(includesError);
      console.log(incorrectBusinessHours);
      console.log("fim");

      return !!businessHoursErrorMessage && includesError;
    }

    function handleRemoveBusinessHour(index) {
      let auxArray = [...businessHours];

      auxArray.splice(index, 1);
      setBusinessHours(auxArray);
    }

    return businessHours.map((businessHour, index) => {
      let { timeFrom, timeTo } = handleTimeParts(index, businessHour);
      console.log(timeFrom, timeTo);

      return (
        <View key={index} style={{ flex: 1 }}>
          <View style={Style.captionHeader}>
            <Text style={Style.caption}>Horário {index + 1}:</Text>
            {index != 0 && (
              <TouchableOpacity onPress={() => handleRemoveBusinessHour(index)}>
                <Icon name="x" size={cw(14)} color="#838383" />
              </TouchableOpacity>
            )}
          </View>

          {!!businessHoursErrorMessage &&
            incorrectBusinessHours.some((element) => element[0] == index) && (
              <Text
                style={[
                  Style.errorMessage,
                  { marginVertical: cw(2), top: cw(-10) },
                ]}
              >
                {businessHoursErrorMessage}
              </Text>
            )}

          <View
            style={[
              Style.daysButtonsContainer,
              incorrectBusinessHours.some(
                (element) => element[0] == index && element[1] == "days"
              ) &&
                !!businessHoursErrorMessage && {
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: cw(5),
                },
            ]}
          >
            {businessHour.days.map((day, i) => (
              <RoundedButton
                key={day.text}
                text={day.text}
                style={Style.dayButton}
                textStyle={Style.dayButtonText}
                active={day.selected}
                onPress={() => {
                  handleSetDays(index, i);
                }}
              />
            ))}
          </View>

          <View style={[Style.timeInputRow]}>
            <Text style={[Style.fromToText]}>De:</Text>
            <TouchableOpacity
              style={[
                Style.timeField,
                timeFrom.includes(true) && {
                  borderColor: "red",
                  borderWidth: 1,
                },
              ]}
              onPress={() => handleTimePicker(index, "from", timeFrom)}
            >
              <Text style={Style.timeText}>
                {timeFrom[3] < 10 ? "0" + timeFrom[3] : timeFrom[3]}
              </Text>
              <Text style={Style.colons}>:</Text>
              <Text style={Style.timeText}>
                {timeFrom[4] < 10 ? "0" + timeFrom[4] : timeFrom[4]}
              </Text>
            </TouchableOpacity>

            <Text
              style={[
                Style.fromToText,
                { marginLeft: cw(26), marginRight: cw(6) },
              ]}
            >
              Até:
            </Text>
            <TouchableOpacity
              style={[
                Style.timeField,
                timeTo.includes(true) && { borderColor: "red", borderWidth: 1 },
              ]}
              onPress={() => handleTimePicker(index, "to", timeTo)}
            >
              <Text style={Style.timeText}>
                {timeTo[3] < 10 ? "0" + timeTo[3] : timeTo[3]}
              </Text>
              <Text style={Style.colons}>:</Text>
              <Text style={Style.timeText}>
                {timeTo[4] < 10 ? "0" + timeTo[4] : timeTo[4]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  const Categories = () => {
    return categories.map((button, index) => (
      <RoundedButton
        key={button.text}
        text={button.text}
        style={Style.categoryButton}
        textStyle={Style.categoryButtonText}
        active={button.selected}
        onPress={() => {
          handleSetCategories(index);
        }}
      />
    ));
  };

  function handleSetCategories(index) {
    let auxArray = [...categories];
    auxArray[index].selected = !auxArray[index].selected;
    setCategories(auxArray);
  }

  async function handleAddProfilePicture() {
    if (profilePicture && profilePicture[0]) {
      setShowModal(true);
    } else await pickImage(0, profilePicture, setProfilePicture);
  }

  function handleAddLocation(index) {
    let auxArray = [...locationCounter];
    let nextInput = auxArray.findIndex((element) => element == 0);
    auxArray[nextInput] = 1;
    setLocationCounter(auxArray);
  }

  function handleRemoveLocation(index) {
    let auxArray = [...locationCounter];

    auxArray.splice(index, 1, 0);
    setLocationCounter(auxArray);
  }

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
        errorMessageStyle={Style.coverErrorMessageStyle}
      />

      {/* ESTILIZAR ---------------------------------- */}

      <View style={Style.profilePictureContainer}>
        <View
          style={[
            Style.profilePicturePlaceholder,
            profilePictureErrorMessage && {
              borderColor: "red",
              borderWidth: 1,
            },
          ]}
        >
          {profilePicture && profilePicture[0] && (
            <Image
              source={{ uri: profilePicture[0] }}
              style={Style.profilePicture}
            />
          )}
        </View>

        <TouchableOpacity
          style={Style.addProfilePictureButton}
          onPress={handleAddProfilePicture}
        >
          <Icon
            name="lapis"
            color="#019B92"
            size={cw(12)}
            style={{ top: cw(-2) }}
          />
          <Text style={Style.addProfilePictureText}>
            {profilePicture && profilePicture[0] ? "Alterar" : "Adicionar"} foto
            de perfil
          </Text>
        </TouchableOpacity>
      </View>
      <ImageModal
        isVisible={showModal}
        setIsVisible={setShowModal}
        images={profilePicture}
        setImages={setProfilePicture}
        backgroundStyle={Style.backgroundStyle}
      />

      <View
        style={[
          Style.sectionContainer,
          {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            paddingTop: cw(96),
            zIndex: 5,
          },
          (!!profilePictureErrorMessage || !!coverImageErrorMessage) && {
            paddingTop: cw(106),
          },
        ]}
      >
        {!!profilePictureErrorMessage && (
          <Text
            style={[
              Style.errorMessage,
              { alignSelf: "center", position: "absolute", top: cw(85) },
            ]}
          >
            {profilePictureErrorMessage}
          </Text>
        )}
        <Text style={[Style.title, { marginLeft: cw(5) }]}>
          Nome do Estabelecimento
        </Text>

        <TextInput
          style={[
            Style.establishmentNameInput,
            establishmentNameErrorMessage.length && {
              borderColor: "red",
              borderWidth: 1,
            },
          ]}
          value={establishmentName}
          onChangeText={(text) => setEstablishmentName(text)}
        />

        {establishmentNameErrorMessage != "" && (
          <Text style={[Style.errorMessage, { top: cw(-27) }]}>
            {establishmentNameErrorMessage}
          </Text>
        )}

        <View style={Style.stripe} />

        <Text style={[Style.title, { marginLeft: cw(8) }]}>
          Onde seu estabelecimento se encontra?
        </Text>

        <AutocompleteWithMaps
          placeholderText="Digite o endereço do local"
          locationText={locationText1}
          setLocationText={setLocationText1}
          placeAddress={placeAddress1}
          setPlaceAddress={setPlaceAddress1}
          placeName={placeName1}
          setPlaceName={setPlaceName1}
          placeGeometry={placeGeometry1}
          setPlaceGeometry={setPlaceGeometry1}
          useMaps={useMaps1}
          setUseMaps={setUseMaps1}
          errorMessage={locationTextErrorMessage1}
          inputFieldReference={autocompleteFieldRef}
        />

        {locationCounter[0] == 1 && (
          <>
            <Text style={[Style.title, { marginLeft: cw(8) }]}>
              Onde seu estabelecimento se encontra?
            </Text>
            <AutocompleteWithMaps
              placeholderText="Digite o endereço do local"
              locationText={locationText2}
              setLocationText={setLocationText2}
              placeAddress={placeAddress2}
              setPlaceAddress={setPlaceAddress2}
              placeName={placeName2}
              setPlaceName={setPlaceName2}
              placeGeometry={placeGeometry2}
              setPlaceGeometry={setPlaceGeometry2}
              useMaps={useMaps2}
              setUseMaps={setUseMaps2}
              errorMessage={locationTextErrorMessage2}
              onXPress={() => handleRemoveLocation(0)}
            />
          </>
        )}

        {locationCounter[1] == 1 && (
          <>
            <Text style={[Style.title, { marginLeft: cw(8) }]}>
              Onde seu estabelecimento se encontra?
            </Text>
            <AutocompleteWithMaps
              placeholderText="Digite o endereço do local"
              locationText={locationText3}
              setLocationText={setLocationText3}
              placeAddress={placeAddress3}
              setPlaceAddress={setPlaceAddress3}
              placeName={placeName3}
              setPlaceName={setPlaceName3}
              placeGeometry={placeGeometry3}
              setPlaceGeometry={setPlaceGeometry3}
              useMaps={useMaps3}
              setUseMaps={setUseMaps3}
              errorMessage={locationTextErrorMessage3}
              onXPress={() => handleRemoveLocation(1)}
            />
          </>
        )}

        {locationCounter[2] == 1 && (
          <>
            <Text style={[Style.title, { marginLeft: cw(8) }]}>
              Onde seu estabelecimento se encontra?
            </Text>

            <AutocompleteWithMaps
              placeholderText="Digite o endereço do local"
              locationText={locationText4}
              setLocationText={setLocationText4}
              placeAddress={placeAddress4}
              setPlaceAddress={setPlaceAddress4}
              placeName={placeName4}
              setPlaceName={setPlaceName4}
              placeGeometry={placeGeometry4}
              setPlaceGeometry={setPlaceGeometry4}
              useMaps={useMaps4}
              setUseMaps={setUseMaps4}
              errorMessage={locationTextErrorMessage4}
              onXPress={() => handleRemoveLocation(2)}
            />
          </>
        )}

        {locationCounter.includes(0) && (
          <TouchableOpacity onPress={handleAddLocation}>
            <Text style={Style.addLocation}>+ Adicionar mais um local</Text>
          </TouchableOpacity>
        )}

        <View
          style={[Style.stripe, { marginTop: cw(22), marginBottom: cw(25) }]}
        />

        {/* ---------------------------- HORARIOOOOOOOS --------------------------------------*/}
        <Text style={Style.title}>Horários de Funcionamento</Text>
        <BusinessHoursPicker />

        {showPicker && (
          <DateTimePicker
            value={time}
            mode={"time"}
            is24Hour={true}
            // display={"spinner"}
            onChange={(event, date) => {
              handleTime(event, date);
            }}
          />
        )}
        <TouchableOpacity
          style={Style.addDateButton}
          onPress={() =>
            setBusinessHours([
              ...businessHours,
              {
                days: [
                  { text: "Segunda", selected: false },
                  { text: "Terça", selected: false },
                  { text: "Quarta", selected: false },
                  { text: "Quinta", selected: false },
                  { text: "Sexta", selected: false },
                  { text: "Sábado", selected: false },
                  { text: "Domingo", selected: false },
                ],
                time: {
                  from: undefined,
                  to: undefined,
                },
              },
            ])
          }
        >
          <Text style={Style.addDateText}>+ Adicionar mais um horário</Text>
        </TouchableOpacity>

        {/* ------------------------------CONTATOS-------------------------------------------- */}
        <View style={Style.stripe} />

        <Text style={Style.title}>Contatos</Text>

        <View style={Style.contactContainer}>
          <View style={Style.contactField}>
            <Icon
              name="instagram"
              color="#019B92"
              size={16}
              style={Style.contactIcon}
            />
            <TextInput
              value={instagram}
              onChangeText={(text) => setInstagram(text)}
              style={Style.contactInput}
            />
          </View>
          <View style={Style.contactField}>
            <Icon
              name="telephone"
              color="#019B92"
              size={16}
              style={Style.contactIcon}
            />
            <TextInput
              value={phone}
              keyboardType="number-pad"
              onChangeText={(text) => setPhone(text)}
              style={Style.contactInput}
            />
          </View>
          <View style={Style.contactField}>
            <Icon
              name="website"
              color="#019B92"
              size={16}
              style={Style.contactIcon}
            />
            <TextInput
              value={website}
              onChangeText={(text) => setWebsite(text)}
              style={Style.contactInput}
            />
          </View>
        </View>
      </View>

      <View style={[Style.sectionContainer, { paddingTop: cw(26) }]}>
        <Text style={Style.title}>Sobre o estabelecimento</Text>
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
          placeholder={"Fale um pouco sobre o estabelecimento"}
          multiline={true}
          textBreakStrategy={"highQuality"}
          placeholderTextColor={"#AEAEAE"}
          value={details}
          onChangeText={(text) => setDetails(text)}
        />

        <View style={[Style.stripe, { marginBottom: cw(24) }]} />

        <Text style={[Style.title, { marginLeft: cw(9) }]}>
          Que tipo de produtos estão disponíveis aqui?
        </Text>
        {!!categoriesErrorMessage && (
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
            !!categoriesErrorMessage && {
              borderColor: "red",
              borderWidth: 1,
              borderRadius: cw(5),
            },
          ]}
        >
          <Categories />
        </View>
      </View>

      {/* <View style={[Style.stripe, { marginBottom: cw(26) }]} />

      <View style={[Style.stripe, { marginBottom: cw(27) }]} /> */}

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
          // onPressOut={handleSave}
        />
        <Text style={[Style.cancel]} onPress={() => navigation.goBack()}>
          Cancelar
        </Text>
      </View>
    </ScrollView>
  );
}
