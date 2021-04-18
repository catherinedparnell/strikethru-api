import multer from 'multer';
import * as fs from '../services/firestore';

const { spawn } = require('child_process');

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
export const processText = (req, res) => {
  const { filename, countFlag, processType } = req.body;
  fs.getUser(req.params.username)
    .then((result) => {
      // filterTypes and chosenFilter are strings separated by commas
      const { filterTypes, chosenFilter } = result.result;
      let dataToSend;
      // spawn python script for text analysis
      const python = spawn('python', ['../scripts/textProcessing.py', filterTypes, processType, filename, chosenFilter, countFlag], { cwd: __dirname });
      python.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
      });
      // resolve and close child process
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend);
      });
    })
    .catch((error) => {
      res.send({ error });
    });
};
