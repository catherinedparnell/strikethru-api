const admin = require('firebase-admin');

const serviceAccount = require('../../strikethru-20e98-firebase-adminsdk-7npkv-bb3e7f34f5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://strikethru.firebaseio.com',
});

const db = admin.firestore();

// add user: takes username and name
export async function addUser(username, name) {
  const user = {
    name,
    chosenFilter: 'none',
  };
  await db.collection('users').doc(username).set(user);
  const userRef = db.collection('users').doc(username);
  const doc = await userRef.get();
  if (!doc.exists) {
    return { error: 'Failure to add new user' };
  } else {
    return { result: doc.data() };
  }
}

// add/update preferences in user
export async function updatePreferences(username, preferences) {
  const userRef = db.collection('users').doc(username);
  await userRef.update({
    filterTypes: preferences.filterTypes,
    processType: preferences.processType,
    chosenFilter: preferences.chosenFilter,
  });
  const doc = await userRef.get();
  if (!doc.exists) {
    return { error: 'Failure to get new user' };
  } else {
    return { result: doc.data() };
  }
}

// gets user + info
export async function getUser(username) {
  const usersRef = db.collection('users').doc(username);
  const doc = await usersRef.get();
  if (!doc.exists) {
    return { error: 'Failure to get user' };
  } else {
    return { result: doc.data() };
  }
}

// deletes user
export async function deleteUser(username) {
  await db.collection('users').doc(username).delete();
  return { message: 'User successfully deleted.' };
}
