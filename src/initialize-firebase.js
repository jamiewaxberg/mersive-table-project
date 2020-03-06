// This file initializes the Firebase database

import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAWGYs6MVkNKPZkbpOa8NPFu60EmN912N0",
    authDomain: "mersiv-table-project-2.firebaseapp.com",
    databaseURL: "https://mersiv-table-project-2.firebaseio.com",
    projectId: "mersiv-table-project-2",
    storageBucket: "mersiv-table-project-2.appspot.com",
    messagingSenderId: "423593652241",
    appId: "1:423593652241:web:6c5a20d24670a2352181b0"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const databaseRef = database.ref("/");