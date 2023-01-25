import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firestoreConfig";

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
                console.log(user);

                auth.signOut()
                    .then(() => {
                        console.log("user cretaed account but we logged it out");
                        navigation.navigate("Logowanie");
                    })
                    .catch(error => alert(error.message));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
                // ..
            });


    };

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
            <TouchableOpacity onPress={() => navigation.navigate("Logowanie", { language: "english" })}>
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