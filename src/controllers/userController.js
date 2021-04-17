import * as fs from '../services/firestore';

// adds user to firestore
// req.body = { name: the name of user }
export const addUser = (req, res) => {
  fs.addUser(req.params.username, req.body.name)
    .then((result) => { res.send(result); })
    .catch((error) => {
      res.send({ error });
    });
};

// add/update preferences in user
// req.body = { processType: 'word'|'sentence',
//              filterTypes: ['h'|'t'|'r'|'s'|'a']}
export const updatePreferences = (req, res) => {
  fs.updatePreferences(req.params.username, req.body)
    .then((result) => { res.send(result); })
    .catch((error) => {
      res.send({ error });
    });
};

// get user + preferences
export const getUser = (req, res) => {
  fs.getUser(req.params.username)
    .then((result) => { res.send(result); })
    .catch((error) => {
      res.send({ error });
    });
};

// deletes user from firestore
export const deleteUser = (req, res) => {
  fs.deleteUser(req.params.username)
    .then((result) => { res.send(result); })
    .catch((error) => {
      res.send({ error });
    });
};
