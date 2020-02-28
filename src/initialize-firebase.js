// This file initializes the Firebase database

import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBQQTjmX-VGvd3Gdt8tk_jw84RD1kLwlPY",
    authDomain: "mersive-table-projec.firebaseapp.com",
    databaseURL: "https://mersive-table-projec.firebaseio.com",
    projectId: "mersive-table-projec",
    storageBucket: "mersive-table-projec.appspot.com",
    messagingSenderId: "963903620971",
    appId: "1:963903620971:web:c1a9e38b8a1bcd8a84ee2e"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export const databaseRef = database.ref("/");