import React, { Fragment, useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { HeaderContainer, FilterContainer, Filters, FilterButton, SearchContainer, CategoryContainer, CategoryText } from '../HomePage/styles';
import { useFilterContext } from '../../contexts/filterContext';
import Icon from '../../components/Icon';
import Style from "./styles";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";
import * as firebase from "firebase";

export default function LocationsSpacesPage({ navigation }) {
  const [spaceList, setSpaces] = useState([]);
  const [refreshing, setRefreshing] = useState();

  const fetchSpaces = async (spaces) => {
    const Documents = await firebase
      .firestore()
      .collection("local")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const doc = documentSnapshot.data();
          doc.id = documentSnapshot.id;
          const fullAddress =
            doc.local[0].placeAddress || doc.local[0].locationText;
          const splitAddress = fullAddress.split("-");
          doc.region = splitAddress[1];
          doc.location = splitAddress[0];
          doc.localName = doc.local[0].placeName || doc.local[0].locationText;
          doc.id = documentSnapshot.id;
          spaces.push(doc);
        });
      });
  };

  const fetchImages = async (spaces) => {
    for (const item of spaces) {
      const images = [];
      try {
        for (let i = 0; i < 3; i++) {
          const url = {
            uri: await firebase
              .storage()
              .ref("spaces/" + item.anunciante + "/" + item.titulo + "/" + i)
              .getDownloadURL(),
          };
          images.push(url);
        }
      } catch (fail) {
        console.log(fail);
      }
      item.images = images;
    }
  };

  useEffect(() => {
    const spaces = [];
    setRefreshing(0);
    fetchSpaces(spaces).then(() => {
      fetchImages(spaces).then(() => {
        setSpaces(spaces);
        setRefreshing(1);
      });
    });
  }, []);

  const Space = ({ name, photos, address, rating, businessHours, space }) => {
    const days = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    let stars = Array(5);

    const onSpaceClick = async () => {
      navigation.navigate("Página do Espaço", {space})
    }

    stars.fill("#F1F1F1");
    stars.fill("#E09F2B", 0, rating.value);

    const businessHoursHandler = (businessHours) => {
      let diaInicial = null;
      let diaFinal = null;
      let businessHoursText = [];
      let text = [];

      for (schedule of businessHours) {
        // itera pelos horarios de funcionamento
        let fromHours = schedule.time.from.toDate().getHours();
        let fromMinutes = schedule.time.from.toDate().getMinutes();
        let toHours = schedule.time.to.toDate().getHours();
        let toMinutes = schedule.time.to.toDate().getMinutes();
        fromMinutes = fromMinutes < 10 ? "0" + fromMinutes : fromMinutes;
        toMinutes = toMinutes < 10 ? "0" + toMinutes : toMinutes;
        let time = ` - de ${fromHours}:${fromMinutes}h à ${toHours}:${toMinutes}h `;
        text = [];
        diaInicial = null; // reseta o dia inicial e final pra null
        diaFinal = null;

        if (schedule.days.length == 1) {
          // se tiver apenas 1 dia o texto já pode ser escrito

          businessHoursText = [
            ...businessHoursText,
            <Text key={businessHoursText}>
              {businessHoursText.length ? ", " : "Aberto "}
              <Text style={Style.businessHoursTextDay}>
                {" "}
                {days[schedule.days[0]]}
              </Text>
            </Text>,
          ];

          // businessHoursText += `${businessHoursText ? ", " : "Aberto"} ${
          //   days[schedule.days[0]]
          // } ${schedule.days.length == 2 ? ", " + days[schedule.days[1]] : ""}`;
        } else {
          // se tiver dois ou mais dias de funcionamento, checa se eles sao seguidos

          for (let j = 0; j < schedule.days.length - 1; j++) {
            diaInicial == null && (diaInicial = schedule.days[j]); // se ainda nao foi definido uma data inicial, define-se

            if (Math.abs(schedule.days[j] - schedule.days[j + 1]) == 1) {
              // olhamos se o dia e o proximo tem uma diferenca absoluta de 1

              diaFinal = schedule.days[j + 1]; // se tiver o diaFinal eh atualizado
            }
            if (
              (Math.abs(schedule.days[j] - schedule.days[j + 1]) != 1 || // se nao houver diferenca de um dia, quer dizer que os dias nao sao seguidos (temos que escrever o texto 'diaInicial a diaFinal')
                j == schedule.days.length - 2) && // ou j eh o penultimo dia (ultimo do loop)
              diaFinal // e o diaFinal eh diferente de null ou undefined
            ) {
              text = [
                ...text,
                <Text key={businessHoursText + text}>
                  {businessHoursText.length || text.length ? ", " : "Aberto "}
                  {/* se ja tiver texto antes, coloca virgula ao inves de 'Aberto'*/}
                  <Text style={Style.businessHoursTextDay}>
                    {days[diaInicial]}
                  </Text>
                  {diaFinal - diaInicial != 1 ? " à " : ", "}
                  {/* se a diferenca nao for de um dia coloca-se virgula ao inves de 'à'*/}
                  <Text style={Style.businessHoursTextDay}>
                    {days[diaFinal]}
                  </Text>
                  {diaFinal != schedule.days[j + 1] && (
                    <Text>
                      {/*  diaFinal != proximo dia, entao temos que escrever o dia pois ele nao sera repetido*/}
                      {`, `}
                      <Text style={Style.businessHoursTextDay}>
                        {days[schedule.days[j + 1]]}
                      </Text>
                    </Text>
                  )}
                </Text>,
              ];
              // text +=

              // `${businessHoursText || text ? "," : "Aberto"} ${
              //   days[diaInicial]
              // }${diaFinal - diaInicial != 1 ? " à" : ","} ${days[diaFinal]}${
              //   Math.abs(schedule.days[j] - schedule.days[j + 1]) != 1
              //     ? ", " + days[schedule.days[j + 1]]
              //     : ""
              // }`;

              diaInicial = null; // reseta o dia inicial e final pois podemos iniciar uma nova sequencia de dias
              diaFinal = null;
            } else if (!diaFinal) {
              // se nao tiver dia final eh porque nao existe uma sequencia de dias para mostrar
              text = [
                ...text,
                <Text key={businessHoursText + text}>
                  {businessHoursText.length || text.length ? `, ` : "Aberto "}
                  <Text style={Style.businessHoursTextDay}>
                    {days[diaInicial]}
                  </Text>
                </Text>,
              ];

              // text += `${businessHoursText || text ? "," : "Aberto"} ${
              //   days[diaInicial]
              // }`;
              diaInicial = null;
            }
          }
          businessHoursText = [...businessHoursText, text];
        }
        businessHoursText = [...businessHoursText, time];
      }

      return businessHoursText;
    };

    return (
      <Fragment>
        <Text style={Style.spaceName}>{name}</Text>

        <ScrollView
          snapToInterval={cw(295)}
          decelerationRate={"fast"}
          horizontal
          style={{ flex: 1, marginRight: cw(-16), marginLeft: cw(-3) }}
          contentContainerStyle={Style.photosContainer}
          showsHorizontalScrollIndicator={false}
        >
          {photos.map((photo, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              onPress={onSpaceClick}
            >
              <Image source={photo} style={Style.photo} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...Style.iconContainer, top: cw(230.7) }}
        >
          <Icon name="compartilhar" size={cw(16)} style={{right:-4 }} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={Style.iconContainer}>
          <Icon name="salvar" size={cw(13.5)} style={{right:-6 }} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={Style.addressRatingContainer}>
          <Text style={Style.addressText}>{address}</Text>
        </View>

        <Text style={Style.businessHoursText}>
          {businessHoursHandler(businessHours)}
        </Text>
      </Fragment>
    );
  };

  const { filters, setFilters, search } = useFilterContext();
  const categories = [ "Próximo de você", "Aberto hoje", "Melhores avaliações" ];

  return (
    refreshing ?
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
            <FilterButton onPress={() => navigation.navigate("FiltersSpace")}>
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
          { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
        ]}
      >
        <Text style={Style.titleText}>Mais próximos de você</Text>
        {spaceList.map((local, index) => (
          <Fragment key={local.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Space
              space={local}
              name={local.titulo}
              photos={local.images}
              address={local.localName}
              rating={{
                value: 5,
                votes: 12,
              }}
              businessHours={local.funcionamento}
            />
          </Fragment>
        ))}
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
        <Text style={Style.titleText}>Outros locais na sua região</Text>
        {spaceList.map((local, index) => (
          <Fragment key={local.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Space
              space={local}
              name={local.titulo}
              photos={local.images}
              address={local.localName}
              rating={{
                value: 5,
                votes: 12,
              }}
              businessHours={local.funcionamento}
            />
          </Fragment>
        ))}
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{ marginTop: 50 }} color="green" />
  );
}
