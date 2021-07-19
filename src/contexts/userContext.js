import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { signIn } from "../api/auth";
import fetchUser from "../api/fetchUser";
import { signUp } from "../api/signup";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [threads, setThreads] = useState([]);
  const [threads1, setThreads1] = useState([]);
  const [threads2, setThreads2] = useState([]);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {

    if (user) {
      loadCollections();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe1 = firebase
        .firestore()
        .collection("MESSAGE_THREADS")
        .where("uid1", "==", user.id)
        .onSnapshot((querySnapshot) => {
          const threads = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              name: "",
              img1: "https://source.unsplash.com/featured/412x115/?craft",
              latestMessage: { text: "" },
              ...documentSnapshot.data(),
            };
          });
          setThreads1(threads);
        });

      const unsubscribe2 = firebase
        .firestore()
        .collection("MESSAGE_THREADS")
        .where("uid2", "==", user.id)
        .onSnapshot((querySnapshot) => {
          const threads = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              name: "",
              img1: "https://source.unsplash.com/featured/412x115/?craft",
              latestMessage: { text: "" },
              ...documentSnapshot.data(),
            };
          });
          setThreads2(threads);
        });

      return () => (unsubscribe1(), unsubscribe2());
    }
  }, [user]);

  useEffect(() => {
    async function fetchImages() {
      for (var thread of threads2) {
        try{
          thread.img = await firebase.storage().ref("user_photo/" + thread.uid1).getDownloadURL()
        }catch(err){
          // console.log(err)
        }
      }
      for (var thread of threads1) {
        try{
          thread.img = await firebase.storage().ref("user_photo/" + thread.uid1).getDownloadURL()
        }catch(err){
          // console.log(err)
        }
      }
    }
    fetchImages();
    setThreads(
      [...threads1, ...threads2].sort((x, y) => y.createdAt - x.createdAt)
    );
  }, [threads1, threads2]);

  async function onAuthStateChanged(user_firebase) {
    if (user_firebase) {
      await fetchUser(user_firebase.uid).then((res) => {
        setUser({ ...res, username: user_firebase.email });
      });
    } else {
      setUser(null);
    }

    if (initializing) setInitializing(false);
  }

  const loadCollections = async () => {
    const auxCollections = [];
    const res = await firebase
      .firestore()
      .collection("usuario")
      .doc(user.id)
      .collection("colecoes")
      .get();
    for (const doc of res.docs) {
      let auxProdutos = [];
      for (const product of doc.data().produtos) {
        const produto = await firebase
          .firestore()
          .collection("produto")
          .doc(product.id)
          .get();
        const firstImage = await firebase
          .storage()
          .ref("user_products/" + product.anunciante + "/" + product.titulo + "/0")
          .getDownloadURL();
        auxProdutos.push({
          ...produto.data(),
          uri: firstImage,
          id: produto.id,
        });
      }
      auxCollections.push({
        titulo: doc.data().titulo,
        produtos: auxProdutos,
        ref: doc.ref,
      });
    }
    setCollections(auxCollections);
  };

  const loadCategories = async () => {
    await firebase
      .firestore()
      .collection("categorias")
      .get()
      .then((doc) => {
        setCategories(doc.data())
      });
  };

  const addProductToCollection = async (doc, product) => {
    await doc.ref.update({
      produtos: firebase.firestore.FieldValue.arrayUnion({
        id: product.id,
        anunciante: product.anunciante,
        titulo: product.titulo,
      }),
    });
    Alert.alert("Produto adicionado!");
    loadCollections();
  };

  const addProductToNewCollection = async (product, newCollectionTitle) => {
    await firebase
      .firestore()
      .collection("usuario")
      .doc(user.id)
      .collection("colecoes")
      .add({
        titulo: newCollectionTitle,
        produtos: [
          {
            id: product.id,
            anunciante: product.anunciante,
            titulo: product.titulo,
          },
        ],
      });
    loadCollections();
    Alert.alert("Produto adicionado!");
  };

  const updateUserToExpositor = async (
    expositorData,
    profileUrl,
    bannerUrl
  ) => {
    if (profileUrl != user.foto) {
      const profileReference = firebase.storage().ref("user_photo/" + user.id);
      const response = await fetch(profileUrl);
      const blob = await response.blob();
      await profileReference.put(blob);
    }
    const reference = firebase.storage().ref("expositor_banners/" + user.id);
    const response = await fetch(bannerUrl);
    const blob = await response.blob();
    await reference.put(blob);
    await firebase
      .firestore()
      .collection("usuario")
      .doc(user.id)
      .update(expositorData);
    const currentUser = await fetchUser(user.id);
    setUser(currentUser);
  };

  const followArtist = async (artistId) => {
    await firebase
      .firestore()
      .collection("usuario")
      .doc(user.id)
      .update({
        seguindo: firebase.firestore.FieldValue.arrayUnion(artistId),
      });
    const currentUser = await fetchUser(user.id);
    setUser(currentUser);
  };

  const SignIn = async (email, password, navigation) => {
    const loggedUid = await signIn(email, password);
    const currentUser = await fetchUser(loggedUid);
    setUser(currentUser);
    navigation.navigate("Main");
  };

  const SignUp = async (
    name,
    email,
    user,
    password,
    gender,
    region,
    newsletter,
    navigation,
    image
  ) => {
    await signUp(
      name,
      email,
      user,
      password,
      gender,
      region,
      newsletter,
      image
    );
    await SignIn(email, password, navigation);
  };

  if (initializing) {
    return null;
  } else
    return (
      <UserContext.Provider
        value={{
          user,
          collections,
          categories,
          SignIn,
          loadCollections,
          loadCategories,
          SignUp,
          addProductToCollection,
          addProductToNewCollection,
          updateUserToExpositor,
          threads,
          followArtist,
        }}
      >
        {children}
      </UserContext.Provider>
    );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
