import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBjgXCOOAvZT1jUgv08y2dSvwLBGb6ZYgA",
    authDomain: "testing-file-upload-fb5da.firebaseapp.com",
    projectId: "testing-file-upload-fb5da",
    storageBucket: "testing-file-upload-fb5da.appspot.com",
    messagingSenderId: "362605589045",
    appId: "1:362605589045:web:314927b82e2917f653377c"
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = app.database()
export const storage = app.storage()