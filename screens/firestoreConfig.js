import { initializeApp } from 'firebase/app';


const firebaseConfig = {
	apiKey: "AIzaSyCEp7mreeQxHjwt6HBGwLya1DBqXPIogR0",
	authDomain: "fir-booksproject-b5d44.firebaseapp.com",
	projectId: "fir-booksproject-b5d44",
	storageBucket: "fir-booksproject-b5d44.appspot.com",
	messagingSenderId: "1099302290482",
	appId: "1:1099302290482:web:0fe0131c3e97939033a82b",
	measurementId: "G-KYFJJDDXE1"
	// apiKey: "AIzaSyARZo2_8JzKQ6LT9oEsYMks2UfQE3cawNo",
	// authDomain: "fir-test-68ca0.firebaseapp.com",
	// databaseURL: "https://fir-test-68ca0-default-rtdb.europe-west1.firebasedatabase.app",
	// projectId: "fir-test-68ca0",
	// storageBucket: "fir-test-68ca0.appspot.com",
	// messagingSenderId: "856418141407",
	// appId: "1:856418141407:web:53826fdbb1478607ae956a",
	// measurementId: "G-FXJX2N8ECS"
};


const app = initializeApp(firebaseConfig);


export default app;