const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json({ limit: '10mb' }));

// Prediction endpoint
app.post('/predict', async (req, res) => {
    try {
        // Validate input
        if (!req.body.image || !req.body.image.startsWith('data:image')) {
            return res.status(400).json({ error: 'Invalid image format' });
        }

        // Save image
        const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
        const imagePath = path.join(__dirname, 'input.png');
        
        await fs.promises.writeFile(imagePath, base64Data, 'base64');

        // Execute Python script from the correct directory
        exec('python predictor.py', { cwd: __dirname }, (error, stdout, stderr) => {
            if (error) {
                console.error(`[SERVER ERROR] ${stderr}`);
                return res.status(500).json({ error: 'Prediction failed', details: stderr });
            }

            // Parse output (format: "label,confidence")
            const result = stdout.trim().split(',');
            
            if (result.length !== 2 || result[0] === 'error') {
                return res.status(500).json({ error: 'Invalid prediction result' });
            }

            res.json({
                prediction: result[0],
                confidence: parseFloat(result[1])
            });
        });

    } catch (err) {
        console.error(`[SERVER CRASH] ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(PORT, () => console.log(`🧠 Doodle API running on port ${PORT}`));