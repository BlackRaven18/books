import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { Barometer } from 'expo-sensors';
import { getFirestore } from "firebase/firestore";
import app from "../firestoreConfig"
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";

export default function PopularScreen({navigation}) {
  const [barometerData, setBarometerData] = useState({});

    useEffect(() => {
      const subscribe = Barometer.addListener(barometerData => {
        setBarometerData(barometerData);
      });

      return () => {
        subscribe.remove();
      };
    }, []);
    const [data, setData] = useState([]);
            const [userId, setUserId] = useState('7dtjsgPYcdEoptEirNYD');
            const db = getFirestore(app);
            useEffect(() => {
                getDocs(collection(db, "users", userId, "popularne")).then((querySnapshot) => {
                    const newData = [];
                    querySnapshot.forEach((doc) => {
                        const docData = doc.data();
                        newData.push({
                            id: doc.id,
                            nazwa: docData.nazwa,
                            nazwad: docData.nazwad,
                            obraz: docData.obraz,
                            obrazd: docData.obrazd,
                        });
                        //rconsole.log(newData);
                    });
                    setData(newData);

                });
            }, []);
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require("../assets/log2.png")} />
        <Text style={styles.mytext}>Najpopularniejsze książki</Text>
        <Text style={styles.mytexta}>{barometerData.pressure} hPa</Text>
        { barometerData.pressure > 1013 ? (
                        <Text style={styles.mytexta}>dobre ciśnienie do czytania</Text>
        ) : null }
        { barometerData.pressure <= 1013 ? (
                         <Text style={styles.mytexta}>złe ciśnienie do czytania</Text>
        ) : null }
        <FlatList
                         data={data}
                         renderItem={(item) => { console.log(item); return(
                             <View style={styles.sview}>
                                <View>
                                 <Image style={styles.imagek} source={{uri: item.item.obraz}} />

                                 <Text style={styles.mytextb}>{item.item.nazwa}</Text>
                                </View>

                             </View>
                         )}}
                         keyExtractor={item => item.id}
                         style={styles.flatListStyle}
                         horizontal={true}
                     />
                     <FlatList
                                              data={data}
                                              renderItem={(item) => { console.log(item); return(
                                                  <View style={styles.sview}>
                                                    <View>
                                                      <Image style={styles.imagek} source={{uri: item.item.obrazd}} />

                                                      <Text style={styles.mytextb}>{item.item.nazwad}</Text>

                                                      </View>
                                                  </View>
                                              )}}
                                              keyExtractor={item => item.id}
                                              style={styles.flatListStyle}
                                              horizontal={true}
                                          />


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

  flatListStyle: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      overflow: 'Scroll',
    },
    sview: {
           flexDirection: 'row',

        },

  image: {
    marginBottom: 5,
  },

   imagek: {
         marginBottom: 5,
         height: 145,
         width: 80,
         marginLeft: 15,
         marginTop: 1,
       },
    imagek2: {
          marginBottom: 5,
          height: 150,
          width: 100,
          marginRight: 260,
          marginTop: 1,
    },

  mytext:{
    height: 30,
    marginBottom: 20,
  },

  mytexta:{
      height: 30,
      marginTop: 0,
      marginBottom: 0,
      color: "green",
    },
     mytextb:{
          height: 30,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          textAlign: 'center',
          flexWrap: 'wrap',
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
    width: "70%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#1D33DE",
  },
});