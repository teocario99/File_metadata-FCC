var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, ''); // Specify the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original file name
    },
  });
const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Define a route for file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

    res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
