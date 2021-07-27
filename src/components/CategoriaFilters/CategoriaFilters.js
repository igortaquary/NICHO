import React, { useState } from "react";
import { View, useWindowDimensions, Text, PixelRatio } from "react-native";
import RoundedButton from "./../RoundedButton/RoundedButton";
import Style from "./styles";

export default function CategoriaFilters() {
  const [todosCategorias, setTodosCategorias] = useState(false);
  const [vestir, setVestir] = useState(false);
  const [casa, setCasa] = useState(false);
  const [papelaria, setPapelaria] = useState(false);
  const [cosmeticos, setCosmeticos] = useState(false);
  const [impressoes, setImpressoes] = useState(false);
  const [esculturas, setEsculturas] = useState(false);
  const [desenhos, setDesenhos] = useState(false);
  const [acessorios, setAcessorios] = useState(false);
  const [pinturas, setPinturas] = useState(false);

  return (
    <View>
      <View style={Style.firstLineCategoriasContainer}>
        <RoundedButton
          text="Todos"
          active={todosCategorias}
          onPress={() => setTodosCategorias(!todosCategorias)}
        />
        <RoundedButton
          text="Para vestir"
          active={vestir}
          onPress={() => setVestir(!vestir)}
        />
        <RoundedButton
          text="Para sua casa"
          active={casa}
          onPress={() => setCasa(!casa)}
        />
        <RoundedButton
          text="Papelaria"
          active={papelaria}
          onPress={() => setPapelaria(!papelaria)}
        />
        <RoundedButton
          text="Cosméticos"
          active={cosmeticos}
          onPress={() => setCosmeticos(!cosmeticos)}
        />
      </View>
      <View style={Style.secondLineCategoriasContainer}>
        <RoundedButton
          text="Impressões"
          active={impressoes}
          onPress={() => setImpressoes(!impressoes)}
        />
        <RoundedButton
          text="Esculturas"
          active={esculturas}
          onPress={() => setEsculturas(!esculturas)}
        />
        <RoundedButton
          text="Desenhos"
          active={desenhos}
          onPress={() => setDesenhos(!desenhos)}
        />
        <RoundedButton
          text="Acessórios"
          active={acessorios}
          onPress={() => setAcessorios(!acessorios)}
        />
        <RoundedButton
          text="Pinturas"
          active={pinturas}
          onPress={() => setPinturas(!pinturas)}
        />
      </View>
    </View>
  );
}
