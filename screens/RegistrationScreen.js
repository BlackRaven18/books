import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import app from "../firestoreConfig";
import LoggedUserManager from '../LoggedUserManager';

export default function RegistrationScreen({ navigation }) {

    const [displayName, setDisplayName] = useState('');
    const [displaySurname, setDisplaySurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [data, setData] = useState([])


    const db = getFirestore(app);
    useEffect(() => {
        getDocs(collection(db, "users")).then((querySnapshot) => {
            let tmp = []
            querySnapshot.forEach((doc) => {
                tmp = [...tmp, doc.data()];
            });
            setData(tmp)
        })
    }, [])
    const handleSignUp = () => {
        const auth = getAuth();
        console.log(auth);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                dodajKolekcje();
                console.log(user);
                console.log('user');
                navigation.navigate("Books", {
                    screen: "Popularne"
                })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
                // ..
            });
    };

    const favoriteData = {
        nazwa: "null"
    };
    const reservationData = {
        nazwa: "null"
    };
    const historyData = {
        nazwa: "null"
    };

    const dodajKolekcje = async () => {
        const loggedUserManager = LoggedUserManager.getInstance();
        const newUserId = loggedUserManager.getId();
        const userRef = doc(collection(db, "users"));

        const data = {
            imie: displayName,
            nazwisko: displaySurname,
            email: email
        };



        try {
            await setDoc(userRef, data);
            const zmienna = searchUser();

        } catch (error) {
            console.log(error)
        }
    }
    const searchUser = async () => {
        const loggedUserManager = LoggedUserManager.getInstance();
        const qRef = query(collection(db, "users"), where("email", "==", email));
        const qSnap = await getDocs(qRef);
        qSnap.forEach((doc) => {
            console.log(doc.id);
            loggedUserManager.setId(doc.id);
            const wynik = doc.id;
            console.log("wynik:" + wynik);
            dodajKolekcje2(wynik);
        });
    };
    const dodajKolekcje2 = async (zmienna) => {
        const favoriteRef = doc(collection(db, "users", zmienna, "ulubione"));
        const reservationRef = doc(collection(db, "users", zmienna, "rezerwacje"));
        const historyRef = doc(collection(db, "users", zmienna, "historia"));
        await setDoc(favoriteRef, favoriteData);
        await setDoc(reservationRef, reservationData);
        await setDoc(historyRef, historyData);
    }

    return (

        <View style={styles.container}>

            <Image style={styles.image} source={require("../assets/log2.png")} />
            <Text style={styles.mytext}>Rejestracja</Text>
            <StatusBar style="auto" />
            <Text style={styles.newtext}>Imię</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Wprowadź swoje imię"
                    placeholderTextColor="#acaebd"
                    onChangeText={displayName => setDisplayName(displayName)}
                    value={displayName}
                //onChangeText={(login) => setLogin(login)}
                />
            </View>
            <Text style={styles.nazwtext}>Nazwisko</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Wprowadź swoje nazwisko"
                    placeholderTextColor="#acaebd"
                    onChangeText={displaySurname => setDisplaySurname(displaySurname)}
                    value={displaySurname}
                />
            </View>
            <Text style={styles.newtext}>Email</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Wprowadź swój email"
                    placeholderTextColor="#acaebd"
                    onChangeText={email => setEmail(email)}
                    value={email}
                //onChangeText={(login) => setLogin(login)}
                />
            </View>
            <Text style={styles.newtext}>Hasło</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Wprowadź hasło"
                    placeholderTextColor="#acaebd"
                    onChangeText={password => setPassword(password)}
                    value={password}
                    maxLength={15}
                    secureTextEntry={true}
                //onChangeText={(login) => setLogin(login)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
                <Text style={styles.loginText}>Rejestruj</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Logowanie")}>
                <Text style={styles.forgot_button}>Logowanie</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 5,

    },

    loginText: {
        placeholderTextColor: "#FFFFFF",
        color: "white",
    },

    mytext: {
        height: 30,
        marginBottom: 20,
    },

    newtext: {
        marginRight: 220,
        marginBottom: 10,
    },
    nazwtext: {
        marginRight: 190,
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
        width: "70%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#1D33DE",
    },
});