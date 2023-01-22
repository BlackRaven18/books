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
} from "react-native";
import { getFirestore } from "firebase/firestore";
import app from "../firestoreConfig"
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";

export default function RegisterScreen({navigation}) {
    const [data, setData] = useState([]);
        const [userId, setUserId] = useState('7dtjsgPYcdEoptEirNYD');
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
                setData(newData);

            });
        }, []);
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require("../assets/log2.png")} />
        <Text style={styles.mytext}>Rejestr</Text>
        <View style={styles.inputView}>

                    <TextInput
                      style={styles.TextInput}
                      placeholder="Wyszukaj"
                      placeholderTextColor="#acaebd"
                      onChangeText={(szukaj) => setSearchText(szukaj)}
                    />
                  </View>
                  <FlatList
                    data={filteredData}
                    renderItem={(item) => {
                      console.log(item);
                      return(
                        <View style={styles.sview}>
                          <TouchableOpacity onPress={()=>navigation.navigate("Opis", { nazwa: item.item.nazwa, obraz: item.item.obraz, opis: item.item.opis })}>
                            <Image style={styles.imagek} source={{uri: item.item.obraz}} />
                          </TouchableOpacity>
                          <View>
                            <Text style={styles.mytexta}>{item.item.nazwa}</Text>
                            <Text style={styles.mytexta}>{item.item.rodzaj}</Text>
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

  mytext:{
    height: 30,
    marginBottom: 20,
  },

  mytexta:{
      height: 30,
      marginTop: 0,
      marginBottom: 0,
      marginRight: 150,
      textAlign: 'left',
    },
 mytextb:{
       height: 30,
       marginTop: 0,
       marginBottom: 0,
       marginLeft:25,
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