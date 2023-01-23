import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList } from 'react-native';
import React, { useState } from "react";
import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { getFirestore } from "firebase/firestore";
import app from "../firestoreConfig"
import { collection, getDocs, addDoc, getDoc, doc, deleteDoc, getDocumentId } from "firebase/firestore";
import { useRoute } from '@react-navigation/native';

export default function DetailsScreen({navigation}) {
  const [data, setData] = useState([]);
          const [userId, setUserId] = useState('7dtjsgPYcdEoptEirNYD');
          const route = useRoute();
          const [nazwa, setNazwa] = useState(route.params.nazwa);
          const [obraz, setObraz] = useState(route.params.obraz);
          const [opis, setOpis] = useState(route.params.opis);
          const [rodzaj, setRodzaj] = useState(route.params.rodzaj);
          const [searchText, setSearchText] = useState('');
          const db = getFirestore(app);

          const filteredData = data.filter(item =>
            item.nazwa.toLowerCase().includes(searchText.toLowerCase()) ||
            item.rodzaj.toLowerCase().includes(searchText.toLowerCase())
          );
          useEffect(() => {
              getDocs(collection(db, "users", userId, "rejstr")).then((querySnapshot) => {
                  const newData = [];
                  querySnapshot.forEach((doc) => {
                      const docData = doc.data();
                      newData.push({
                          id: doc.id,
                          nazwa: docData.nazwa,
                          rodzaj: docData.rodzaj,
                          obraz: docData.obraz,
                          opis: docData.opis,
                      });
                      //rconsole.log(newData);
                  });
                  setData(newData.filter(item => item.nazwa === nazwa && item.obraz === obraz && item.opis === opis && item.rodzaj === rodzaj))

              });
          }, []);
          const [favoritesData, setFavoritesData] = useState([]);

  const [accelerometerData, setAccelerometerData] = useState({});

    useEffect(() => {
      const subscribe = Accelerometer.addListener(accelerometerData => {
        setAccelerometerData(accelerometerData);
      });

      return () => {
        subscribe.remove();
      };
    }, []);
    const addToFavorites = async () => {
        try {
            const dataToAdd = {
                nazwa: route.params.nazwa,
                obraz: route.params.obraz,
                rodzaj: route.params.rodzaj,
            };
            await addDoc(collection(db, "users", userId, "ulubione"), dataToAdd);
        } catch (err) {
            console.error(err);
        }
    };
    const addReservation = async () => {
        const today = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('pl-PL', options).format(today)
        try {
            const dataToAdd = {
                nazwa: route.params.nazwa,
                data: formattedDate,
                obraz: route.params.obraz,
            };
            await addDoc(collection(db, "users", userId, "rezerwacje"), dataToAdd);
        } catch (err) {
            console.error(err);
        }
    };
        const removeReservation = async () => {
            const docRef = doc(db, "users", userId, "rezerwacje", "6TmLZFAXnykIyW8YD6aI");
            const docRef2 = doc(db, "users", userId, "ulubione", "6TmLZFAXnykIyW8YD6aI");
            deleteDoc(docRef) .then(() => { console.log("Entire Document has been deleted successfully.") }) .catch(error => { console.log(error); });
            deleteDoc(docRef) .then(() => { console.log("Entire Document has been deleted successfully.") }) .catch(error => { console.log(error); })
        };
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require("../assets/log2.png")} />
        { accelerometerData.x > 0.53 ? (
                navigation.navigate("Rejestr", {language: "english"})
         ) : null }
        <Text style={styles.mytext}>Opis</Text>
        <TouchableOpacity style={styles.loginBtnd} onPress={()=>navigation.navigate("Rejestr", {language: "english"})}>
                <Text style={styles.buttonText}>&lt;-</Text>
        </TouchableOpacity>

        {data.length > 0 ? <Image style={styles.imagek} source={{ uri: route.params.obraz }} /> : null}
              {data.length > 0 ? <Text style={styles.mytexta}>{route.params.nazwa}</Text> : null}
              {data.length > 0 ? <Text style={styles.mytextb}>{route.params.opis}</Text> : null}
        <View style={styles.sdview}>
            <TouchableOpacity style={styles.loginBtn} onPress={addReservation}>
                <Text style={styles.buttonText}>Rezerwuj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={addToFavorites}>
              <Text style={styles.buttonText}>Ulubione</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={data.length !== 0 ? () => removeReservation(data[0].nazwa) : null}>
              <Text style={styles.buttonText}>Usuń</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 20,
    },
  sdview: {
             flexDirection: 'row',
             marginTop: 0,
    },

  image: {
    marginBottom: 5,
  },

   imagek: {
      marginBottom: 5,
      height: 300,
      width: 300,
      marginRight: 0,
      marginTop: 0,
    },
    imagek2: {
          marginBottom: 5,
          height: 400,
          width: 200,
          marginRight: 260,
          marginTop: 1,
    },
    buttonText:{
        placeholderTextColor: "#FFFFFF",
        color: "white",
    },

  mytext:{
    height: 30,
    marginBottom: 0,
  },

  mytexta:{
      height: 30,
      marginTop: 0,
      marginBottom: 0,
      marginRight: 200,
    },
 mytextb:{
        height: 30,
        marginTop: 0,
        marginBottom: 0,
        textAlign: 'justify',
        flex: 1,
        flexWrap: 'wrap',
        width: '100%',
        overflow: 'hidden',
      },

  newtext:{
    marginRight: 220,
    marginBottom:10,
  },

  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "70%",
    height: 40,
    marginBottom: 20,
    alignItems: "flex-start",
    borderColor: "#d4d5d9",
    borderWidth: 1,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginLeft: 180,
    marginTop: 10,
  },

  loginBtn: {
    width: "30%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D33DE",
    marginRight: 10,
    marginBottom: 50,
  },
  loginBtnd: {
      width: "10%",
      borderRadius: 10,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 280,
      backgroundColor: "#808080",
    },
});
