import React, { useState } from "react";
import { View, Text } from "react-native";
import Style from "./styles";
import RoundedButton from "../../../components/RoundedButton/RoundedButton";
import RoundIconButton from "../../../components/RoundIconButton/RoundIconButton";
import DottedLine from "../../../components/DottedLine/DottedLine";
import Slider from "../../../components/Slider/Slider";
import {
  ConvertWidth as cw,
  ConvertHeight as ch,
} from "../../../components/Converter";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoriaFilters from "../../../components/CategoriaFilters/CategoriaFilters";
import { ScrollView } from "react-native-gesture-handler";
import { PixelRatio } from "react-native";

export default function Filters() {
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

  const [encomendas, setEncomendas] = useState(false);
  const [prontaEntrega, setProntaEntrega] = useState(false);
  const [vegano, setVegano] = useState(false);

  const [todosRegioes, setTodosRegioes] = useState(false);
  const [AC, setAC] = useState(false);
  const [AL, setAL] = useState(false);
  const [AP, setAP] = useState(false);
  const [AM, setAM] = useState(false);
  const [BA, setBA] = useState(false);
  const [CE, setCE] = useState(false);
  const [DF, setDF] = useState(false);
  const [ES, setES] = useState(false);
  const [MA, setMA] = useState(false);
  const [MT, setMT] = useState(false);
  const [MS, setMS] = useState(false);
  const [MG, setMG] = useState(false);
  const [PA, setPA] = useState(false);
  const [PB, setPB] = useState(false);
  const [PR, setPR] = useState(false);
  const [PE, setPE] = useState(false);
  const [PI, setPI] = useState(false);
  const [RJ, setRJ] = useState(false);
  const [RN, setRN] = useState(false);
  const [RS, setRS] = useState(false);
  const [RO, setRO] = useState(false);
  const [RR, setRR] = useState(false);
  const [SC, setSC] = useState(false);
  const [SP, setSP] = useState(false);
  const [SE, setSE] = useState(false);
  const [TO, setTO] = useState(false);

  const [todosMateriaPrima, setTodosMateriaPrima] = useState(false);
  const [papel, setPapel] = useState(false);
  const [upcycling, setUpcycling] = useState(false);
  const [metais, setMetais] = useState(false);
  const [lapis, setLapis] = useState(false);
  const [tinta, setTinta] = useState(false);
  const [tecido, setTecido] = useState(false);
  const [barroArgila, setBarroArgila] = useState(false);
  const [madeira, setMadeira] = useState(false);
  const [vidro, setVidro] = useState(false);
  const [cristaisPedras, setCristaisPedras] = useState(false);
  const [plastico, setPlastico] = useState(false);
  const [cimento, setCimento] = useState(false);
  const [linhasCordas, setLinhasCordas] = useState(false);
  const [biscuit, setBiscuit] = useState(false);

  const ampulheta = require("./../../../../assets/ampulheta.png");
  const ampulhetaSelecionada = require("./../../../../assets/ampulhetaSelecionada.png");
  const check = require("./../../../../assets/check.png");
  const checkSelecionado = require("./../../../../assets/checkSelecionado.png");
  const folha = require("./../../../../assets/folha.png");
  const folhaSelecionada = require("./../../../../assets/folhaSelecionada.png");

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={Style.page}>
      <Text style={Style.label}>Principais</Text>
      <View style={Style.principaisButtonsContainer}>
        <RoundIconButton
          width={cw(20)}
          text={"Encomendas"}
          active={encomendas}
          icon={encomendas ? ampulhetaSelecionada : ampulheta}
          onPress={() => setEncomendas(!encomendas)}
        />
        <RoundIconButton
          width={cw(20)}
          text={"Pronta-entrega"}
          active={prontaEntrega}
          icon={prontaEntrega ? checkSelecionado : check}
          onPress={() => setProntaEntrega(!prontaEntrega)}
        />
        <RoundIconButton
          width={cw(20)}
          text={"Vegano"}
          active={vegano}
          icon={vegano ? folhaSelecionada : folha}
          onPress={() => setVegano(!vegano)}
        />
      </View>

      <Text style={Style.label}>Categorias</Text>
      <CategoriaFilters />
      {/* <View>
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
      </View> */}
      <Text style={Style.label}>Regiões</Text>
      <View style={{ alignItems: "center" }}>
        <View style={Style.firstLineRegioesContainer}>
          <RoundedButton
            text="Todos"
            active={todosRegioes}
            onPress={() => setTodosRegioes(!todosRegioes)}
          />
          <RoundedButton text="AC" active={AC} onPress={() => setAC(!AC)} />
          <RoundedButton text="AL" active={AL} onPress={() => setAL(!AL)} />
          <RoundedButton text="AP" active={AP} onPress={() => setAP(!AP)} />
          <RoundedButton text="AM" active={AM} onPress={() => setAM(!AM)} />
          <RoundedButton text="BA" active={BA} onPress={() => setBA(!BA)} />
          <RoundedButton text="CE" active={CE} onPress={() => setCE(!CE)} />
        </View>

        <View style={Style.secondLineRegioesContainer}>
          <RoundedButton text="DF" active={DF} onPress={() => setDF(!DF)} />
          <RoundedButton text="ES" active={ES} onPress={() => setES(!ES)} />
          <RoundedButton text="MA" active={MA} onPress={() => setMA(!MA)} />
          <RoundedButton text="MT" active={MT} onPress={() => setMT(!MT)} />
          <RoundedButton text="MS" active={MS} onPress={() => setMS(!MS)} />
          <RoundedButton text="MG" active={MG} onPress={() => setMG(!MG)} />
          <RoundedButton text="PA" active={PA} onPress={() => setPA(!PA)} />
        </View>

        <View style={Style.thirdLineRegioesContainer}>
          <RoundedButton text="PB" active={PB} onPress={() => setPB(!PB)} />
          <RoundedButton text="PR" active={PR} onPress={() => setPR(!PR)} />
          <RoundedButton text="PE" active={PE} onPress={() => setPE(!PE)} />
          <RoundedButton text="PI" active={PI} onPress={() => setPI(!PI)} />
          <RoundedButton text="RJ" active={RJ} onPress={() => setRJ(!RJ)} />
          <RoundedButton text="RN" active={RN} onPress={() => setRN(!RN)} />
          <RoundedButton text="RS" active={RS} onPress={() => setRS(!RS)} />
        </View>

        <View style={Style.fourthLineRegioesContainer}>
          <RoundedButton text="RO" active={RO} onPress={() => setRO(!RO)} />
          <RoundedButton text="RR" active={RR} onPress={() => setRR(!RR)} />
          <RoundedButton text="SC" active={SC} onPress={() => setSC(!SC)} />
          <RoundedButton text="SP" active={SP} onPress={() => setSP(!SP)} />
          <RoundedButton text="SE" active={SE} onPress={() => setSE(!SE)} />
          <RoundedButton text="TO" active={TO} onPress={() => setTO(!TO)} />
        </View>
      </View>

      <Text style={Style.label}>Matéria prima</Text>
      <View style={{ alignItems: "center" }}>
        <View style={Style.firstLineMateriaPrimaContainer}>
          <RoundedButton
            text="Todos"
            active={todosMateriaPrima}
            onPress={() => setTodosMateriaPrima(!todosMateriaPrima)}
          />
          <RoundedButton
            text="Papel"
            active={papel}
            onPress={() => setPapel(!papel)}
          />
          <RoundedButton
            text="Upcycling"
            active={upcycling}
            onPress={() => setUpcycling(!upcycling)}
          />
          <RoundedButton
            text="Metais"
            active={metais}
            onPress={() => setMetais(!metais)}
          />
          <RoundedButton
            text="Lápis"
            active={lapis}
            onPress={() => setLapis(!lapis)}
          />
          <RoundedButton
            text="Tinta"
            active={tinta}
            onPress={() => setTinta(!tinta)}
          />
        </View>

        <View style={Style.secondLineMateriaPrimaContainer}>
          <RoundedButton
            text="Tecido"
            active={tecido}
            onPress={() => setTecido(!tecido)}
          />
          <RoundedButton
            text="Barro e argila"
            active={barroArgila}
            onPress={() => setBarroArgila(!barroArgila)}
          />
          <RoundedButton
            text="Madeira"
            active={madeira}
            onPress={() => setMadeira(!madeira)}
          />
          <RoundedButton
            text="Vidro"
            active={vidro}
            onPress={() => setVidro(!vidro)}
          />
          <RoundedButton
            text="Cristais e pedras"
            active={cristaisPedras}
            onPress={() => setCristaisPedras(!cristaisPedras)}
          />
        </View>

        <View style={Style.thirdLineMateriaPrimaContainer}>
          <RoundedButton
            text="Plástico"
            active={plastico}
            onPress={() => setPlastico(!plastico)}
          />
          <RoundedButton
            text="Cimento"
            active={cimento}
            onPress={() => setCimento(!cimento)}
          />
          <RoundedButton
            text="Linhas e cordas"
            active={linhasCordas}
            onPress={() => setLinhasCordas(!linhasCordas)}
          />
          <RoundedButton
            text="Biscuit"
            active={biscuit}
            onPress={() => setBiscuit(!biscuit)}
          />
        </View>
      </View>

      <Text style={Style.label}>Peso</Text>
      <Slider />

      <View style={Style.stripe} />
      <View style={Style.greenButtonContainer}>
        <RoundedButton
          activeOpacity={0.2}
          text="Ver resultados"
          style={Style.checkResultsButton}
          textStyle={Style.checkResultsButtonText}
        />
      </View>
    </ScrollView>
  );
}
