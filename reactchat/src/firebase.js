import firebase from 'firebase';

    // в переменную firebaseApp сохраняем объект конфигурации
    const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAruttTh5jewG-nGkUrBOZSnXMSHhO-54I",
        authDomain: "reactchat-f3a23.firebaseapp.com",
        projectId: "reactchat-f3a23",
        storageBucket: "reactchat-f3a23.appspot.com",
        messagingSenderId: "490683277936",
        appId: "1:490683277936:web:fb78c7a1b26a6a36eb8ab5",
        measurementId: "G-QZ95LRVXVG"
    });

    const db = firebaseApp.firestore();
    
    const auth = firebase.auth();


export  { db, auth };
