import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyD4CrCqLf8qjp58V7ONUD_DIoR1LSsGkJ4",
  applicationId: "1:3913810922:web:9d82ae476131b5c3e16893",
  projectId: "mentalgraph-8958a",
  authDomain: "mentalgraph-8958a.firebaseapp.com",
  databaseURL: "https://mentalgraph-8958a.firebaseio.com",
  storageBucket: "mentalgraph-8958a.appspot.com",
})

export const db = firebase.database()
export default firebase
