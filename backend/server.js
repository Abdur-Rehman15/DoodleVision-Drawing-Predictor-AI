const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/predict', (req, res) => {
  const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("input.png", base64Data, 'base64');

  exec('python predictor.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send('Prediction failed.');
    }
    const [prediction, confidence] = stdout.trim().split(',');
    res.json({ prediction, confidence });
  });
});

app.listen(5000, () => console.log('🧠 ML API running on http://localhost:5000'));
