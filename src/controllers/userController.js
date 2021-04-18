import * as fs from '../services/firestore';

// adds user to firestore
export const addUser = (req, res) => {
  fs.getUser(req.params.username)
    .then((result) => {
      if (result.error !== undefined) {
        fs.addUser(req.params.username, req.body.name)
          .then((r) => { res.send(r); })
          .catch((error) => {
            res.send({ error });
          });
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      res.send({ error });
    });
};

// add/update preferences in user
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
