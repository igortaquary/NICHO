import React from "react";
import { StatusBar, Text, View } from "react-native";
import { MainContainer, Container, CustomText, IconContainer, UserMiniAvatar } from "./styles";
import Icon from "../Icon";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigationState,
  getFocusedRouteNameFromRoute,
  useRoute,
} from "@react-navigation/native";
import AccessController from "../AccessController";
import { useFilterContext } from '../../contexts/filterContext';
import { useUserContext } from "../../contexts/userContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerHeader = ({ scene }) => {
  const currentPage = getFocusedRouteNameFromRoute(scene.route);
  const {user} = useUserContext();

  const { clearAllFilters } = useFilterContext();

  function handlePlus() {
    let locaisRoute = scene.route?.state?.routes[1]?.state;

    if (currentPage == "Locais") {
      if (
        !locaisRoute?.index ||
        (locaisRoute.index && locaisRoute.index == 0)
      ) {
        scene.descriptor.navigation.navigate("Criar Evento");
      } else if (locaisRoute.index && locaisRoute.index == 1) {
        scene.descriptor.navigation.navigate("Criar Espaço");
      }
    } else scene.descriptor.navigation.navigate("NewProduct");
  }

  const handleAvatar = () => {
    if(user.isExpositor) {
      scene.descriptor.navigation.navigate("Página do Artista", {anunciante: user})
    }
  }

  return (
    <MainContainer>
      <Container>
        <IconContainer
          onPress={() => scene.descriptor.navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={25} color={"#707070"} />
        </IconContainer>
        <CustomText
          onPress={() => {scene.descriptor.navigation.navigate("Home"); clearAllFilters()}}
        >
          nicho
        </CustomText>
      </Container>
      <Container>
        {/* <IconContainer
          onPress={() => scene.descriptor.navigation.navigate("Messages")}
        >
          <Icon name="busca" size={18} color={"#AEAEAE"} />
        </IconContainer> */}
        {/* <AccessController profile="logado">
          <IconContainer
            onPress={() => scene.descriptor.navigation.navigate("Chat")}
          >
            <Icon name="chat" size={18} color={"#AEAEAE"} />
          </IconContainer>
        </AccessController> */}
        <AccessController profile="expositor">
          <IconContainer onPress={handlePlus}>
            <Icon name="plus" size={18} color={"#AEAEAE"} />
          </IconContainer>
        </AccessController>
        <AccessController profile="logado">
          <TouchableOpacity onPress={handleAvatar}>
            <UserMiniAvatar 
              source={
                { uri: user?.foto } || {
                  uri: "https://source.unsplash.com/featured/412x115/?craft",
                }
              }
            />
          </TouchableOpacity>
        </AccessController>
      </Container>
    </MainContainer>
  );
};

export default DrawerHeader;
