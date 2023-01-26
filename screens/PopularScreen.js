import { Barometer } from 'expo-sensors';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import app from "../firestoreConfig";

export default function PopularScreen({ navigation }) {

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

  const db = getFirestore(app);
  useEffect(() => {
    getDocs(collection(db, "popularne")).then((querySnapshot) => {
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
      });
      setData(newData);

    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/log2.png")} />
      <Text style={styles.mytext} >Najpopularniejsze książki</Text>

      {barometerData.pressure >= 1013 ? (
        <View>
          <Text style={styles.averagePressureText}>{barometerData.pressure} hPa</Text>
          <Text style={styles.averagePressureText}>umiarkowane dobre ciśnienie do czytania</Text>
        </View>
      ) : null}

      {barometerData.pressure > 1000 && barometerData.pressure < 1013 ? (
        <View>
          <Text style={styles.goodPressureText}>{barometerData.pressure} hPa</Text>
          <Text style={styles.goodPressureText}>dobre ciśnienie do czytania</Text>
        </View>
      ) : null}
      {barometerData.pressure <= 1000 ? (
        <View>
          <Text style={styles.badPressureText}>{barometerData.pressure} hPa</Text>
          <Text style={styles.badPressureText}>niesprzyjające ciśnienie do czytania</Text>
        </View>
      ) : null}

      <FlatList
        data={data}
        renderItem={(item) => {
          return (
            <View style={[styles.sview, { marginTop: 10 }]}>
              <View>
                <Image style={styles.imagek} source={{ uri: item.item.obraz }} />

                <Text style={styles.mytextb}>{item.item.nazwa}</Text>
              </View>

            </View>
          )
        }}
        keyExtractor={item => item.id}
        style={styles.flatListStyle}
        horizontal={true}
      />
      <FlatList
        data={data}
        renderItem={(item) => {
          return (
            <View style={styles.sview}>
              <View>
                <Image style={styles.imagek} source={{ uri: item.item.obrazd }} />

                <Text style={styles.mytextb}>{item.item.nazwad}</Text>

              </View>
            </View>
          )
        }}
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
    overflow: 'scroll',
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

  mytext: {
    height: 30,
    marginBottom: 5,
  },


  goodPressureText: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
    color: "green",
  },

  averagePressureText: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
    color: "orange",
  },

  badPressureText: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
    color: "red",
  },

  mytextb: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});