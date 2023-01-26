import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firestoreConfig";
import LoggedUserManager from "../LoggedUserManager"

export default function HistoryScreen({ navigation }) {

  const loggedUserManager = LoggedUserManager.getInstance();
  const zmienna = loggedUserManager.getId();
  const [userId, setUserId] = useState(zmienna);
  const [data, setData] = useState([]);
  const db = getFirestore(app);
  const [accelerometerData, setAccelerometerData] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {

    const subscribe = Accelerometer.addListener(accelerometerData => {
      setAccelerometerData(accelerometerData);
    });

    if (isFocused) {
      if (accelerometerData.x > 0.53) {
        navigation.navigate("Profil");
      }
    }

    return () => {
      subscribe.remove();
    };
  }, [accelerometerData, isFocused]);

  useEffect(() => {
    getDocs(collection(db, "users", userId, "historia")).then((querySnapshot) => {
      const newData = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        newData.push({
          id: doc.id,
          nazwa: docData.nazwa,
          data: docData.data,
          obraz: docData.obraz,
        });
      });
      setData(newData);

    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/log2.png")} />
      <Text style={styles.mytext}>Historia</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Profil")}>
        <Text style={styles.loginText}>&lt;-</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={(item) => {
          return (
            <View style={styles.sview}>
              <Image style={styles.imagek} source={{ uri: item.item.obraz }} />
              <View>
                <Text style={styles.mytexta}>{item.item.nazwa}</Text>
                <Text style={styles.mytexta}>{item.item.data}</Text>
              </View>
            </View>
          )
        }}
        keyExtractor={item => item.id}
        style={styles.scrollView}
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

  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
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
    marginRight: 30,
    marginTop: 1,
  },
  imagek2: {
    marginBottom: 5,
    height: 150,
    width: 100,
    marginLeft: 1,
    marginTop: 1,
  },

  loginText: {
    placeholderTextColor: "#FFFFFF",
    color: "white",
  },

  mytext: {
    height: 30,
    marginBottom: 20,
  },

  mytexta: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 150,
    textAlign: 'left',
  },
  mytextb: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 25,
  },

  newtext: {
    marginRight: 220,
    marginBottom: 10,
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
    width: "10%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 280,
    backgroundColor: "#808080",
  },
});