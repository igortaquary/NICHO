import React, { Fragment } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from "../../components/Icon";
import Style from "./styles";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "./../../components/Converter";

export default function LocationsSpacesPage({ navigation }) {
  const closerToYou = [
    {
      id: "SAIJJ229JSD84JGH733",
      name: "Brio Espaço Colaborativo",
      photos: [
        {
          uri:
            "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/80100433_775919502882875_1481004186513440768_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=0debeb&_nc_ohc=1S7MIUY5rt4AX-XIlyX&_nc_ht=scontent.fbsb3-1.fna&oh=888fefb186871100e31158808ba6c9bc&oe=608604CE",
        },
        {
          uri:
            "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/78606104_775920106216148_3125259062040592384_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=0debeb&_nc_ohc=fMnOVEZshcUAX_g0iuJ&_nc_ht=scontent.fbsb3-1.fna&oh=32bc869ca43b38b5523b78ec3da94163&oe=6089155D",
        },
        {
          uri:
            "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/78755701_775919826216176_322984220718792704_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=0debeb&_nc_ohc=TRgYJW1aX5cAX840dmK&_nc_oc=AQl5T2TqPJtOYkprP-YjAYdR3837xwi3RUnpUUEpSuzYH4X5AMzVbc9ZFmD9PMm_A-w&_nc_ht=scontent.fbsb3-1.fna&oh=5c7a27503c515766ae2a40e65e4d8444&oe=60881BAD",
        },
      ],
      address: "Taguatinga sul - QSC 03 Conj F loja 23",
      rating: {
        value: 5,
        votes: 12,
      },
      businessHours: [
        "09:00h-20:00h",
        "09:00h-20:00h",
        "09:00h-20:00h",
        "09:00h-20:00h",
        "09:00h-20:00h",
        "09:00h-20:00h",
        "Fechado",
      ],
    },
    {
      id: "IYJBM5UI38C8362NC643",
      name: "Estúdio Bicuda",
      photos: [
        {
          uri:
            "https://lh5.googleusercontent.com/p/AF1QipMH4h581WznvICWud18cDg2qd8CbMdpIYPApxjS=s1258-k-no",
        },
        {
          uri:
            "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=unknown_client.imagery_viewer.gps&panoid=dFQyIpiLKFKBz4E0zahM3w&w=1177&h=580&thumb=2&yaw=157.86053&pitch=0",
        },
      ],
      address: "Taguatinga sul - St. B Sul CSB 15",
      rating: {
        value: 4,
        votes: 23,
      },
      businessHours: [
        "Fechado",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
      ],
    },
  ];

  const otherSpaces = [
    {
      id: "HJ68FKJ30F958VJE3",
      name: "Mercado Sul",
      photos: [
        {
          uri:
            "https://i0.wp.com/www.mercadosul.org/wp-content/uploads/2012/08/foto_beco_sindrome_criativa-1024x6821.jpg",
        },
        {
          uri:
            "https://3.bp.blogspot.com/-Ryrnzhv5E0Q/WKR8hVzHcEI/AAAAAAAAGIE/UWPi57ne3hg0VdeKIWFk3gpnLlLCi_k5QCLcB/s1600/16265669_1317355941672166_354684336455345428_n.jpg",
        },
      ],
      address: "Taguatinga sul - St. B Sul CSB 15",
      rating: {
        value: 5,
        votes: 23,
      },
      businessHours: [
        "Fechado",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
        "12:00h às 18:00h",
      ],
    },
    {
      id: "GK59CV834KFK45",
      name: "Ernesto Café",
      photos: [
        {
          uri:
            "https://www.desfrutecultural.com.br/wp-content/uploads/2018/10/ErnestoNorte_043_ByGilbertoEvangelista.jpg",
        },
        {
          uri:
            "https://lucianabarbo.com.br/wp-content/uploads/2018/09/Fachada-Principal_ernesto2-900x600.jpg",
        },
      ],
      address: "SQN 212 - Bl G/H loja 34",
      rating: {
        value: 3,
        votes: 23,
      },
      businessHours: [
        "18:00h às 24:00h",
        "18:00h às 24:00h",
        "18:00h às 24:00h",
        "18:00h às 24:00h",
        "18:00h às 24:00h",
        "18:00h às 24:00h",
        "Fechado",
      ],
    },
  ];

  const Space = ({ name, photos, address, rating, businessHours }) => {
    const days = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    let stars = Array(5);

    stars.fill("#F1F1F1");
    stars.fill("#E09F2B", 0, rating.value);

    const businessHoursHandler = (businessHours) => {
      let diaInicial = null;
      let diaFinal = null;
      let businessHoursText = "Aberto";

      for (let i = 0; i < businessHours.length; i++) {
        if (businessHours[i] != "Fechado") {
          if (diaInicial == null) {
            diaInicial = i;
          }
          for (let j = i + 1; j < businessHours.length; j++) {
            if (businessHours[j] == "Fechado") {
              i++;
              break;
            } else if (businessHours[i] == businessHours[j]) {
              diaFinal = j;
            }
          }
        }

        if (diaInicial != null) {
          businessHoursText = [
            businessHoursText,
            businessHoursText != "Aberto" ? `, ` : ` `,
          ];

          if (diaFinal != null) {
            businessHoursText = [
              businessHoursText,
              diaFinal - diaInicial != 1 && "de ",
              <Text key={diaFinal} style={Style.businessHoursTextDay}>
                {`${days[diaInicial]}`}
                {diaFinal - diaInicial != 1 ? " à " : " e "}
                {`${days[diaFinal]} - `}
              </Text>,
              `de ${businessHours[diaInicial].replace("-", " às ")}`,
            ];
          } else {
            businessHoursText = [
              businessHoursText,
              <Text
                key={diaFinal}
                style={Style.businessHoursTextDay}
              >{`${days[diaInicial]} - `}</Text>,
              `de ${businessHours[diaInicial].replace("-", " às ")}`,
            ];
          }
        }

        diaFinal && (i = diaFinal);
        diaInicial = null;
        diaFinal = null;
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
              onPress={() => navigation.navigate("Página do Espaço")}
            >
              <Image source={photo} style={Style.photo} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...Style.iconContainer, top: cw(230.7) }}
        >
          <Icon name="compartilhar" size={cw(18.18)} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={Style.iconContainer}>
          <Icon name="salvar" size={cw(13.5)} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={Style.addressRatingContainer}>
          <Text style={Style.addressText}>{address + " -"}</Text>
          {stars.map((starColor, index) => (
            <Icon key={index} name="star" size={8.51} color={starColor} />
          ))}
          <Text style={Style.ratingVotesText}>{`(${rating.votes})`}</Text>
        </View>

        <Text style={Style.businessHoursText}>
          {businessHoursHandler(businessHours)}
        </Text>
      </Fragment>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <View
        style={[
          Style.sectionContainer,
          { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
        ]}
      >
        <Text style={Style.titleText}>Mais próximos de você</Text>
        {closerToYou.map((local, index) => (
          <Fragment key={local.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Space
              name={local.name}
              photos={local.photos}
              address={local.address}
              rating={local.rating}
              businessHours={local.businessHours}
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
        {otherSpaces.map((local, index) => (
          <Fragment key={local.id}>
            {index > 0 && <View style={Style.stripe} />}
            <Space
              name={local.name}
              photos={local.photos}
              address={local.address}
              rating={local.rating}
              businessHours={local.businessHours}
            />
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
}
