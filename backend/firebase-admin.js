
const admin = require('firebase-admin');
const serviceAccount = require('/Users/annac/Downloads/bake-b6e75-firebase-adminsdk-pz2oi-c9e4a71572.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bake-b6e75-default-rtdb.firebaseio.com/" 
});

module.exports = admin;