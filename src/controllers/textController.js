/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */

import multer from 'multer';
import * as fs from '../services/firestore';

const { spawn } = require('child_process');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

// upload file
// req.body = { file }
export const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file.filename);
  });
};

// process text by file
// req.body = { filename }
export const processText = (req, res) => {
  const { filename } = req.body;
  fs.getUser(req.params.username)
    .then((result) => {
      const { filterTypes, processType } = result.result;
      let dataToSend;
      const python = spawn('python', ['../scripts/textProcessing.py', filterTypes, processType, filename], { cwd: __dirname });
      python.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
      });
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.download(path.resolve(`public/${dataToSend.replace(/\n/g, '')}`));
      });
    })
    .catch((error) => {
      res.send({ error });
    });
};
