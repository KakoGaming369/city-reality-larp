const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware na parsovanie JSON dát
app.use(bodyParser.json());

// Discord webhook URL - tu vlož svoju URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

app.post('/submit-form', async (req, res) => {
  try {
    const { name, id, date, houseNumber, amount, location } = req.body;

    console.log('Prijatá požiadavka:', req.body);

    // Posielanie dát na Discord webhook
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: 'Nová rezervácia',
            color: 7506394,
            fields: [
              { name: 'Meno a priezvisko', value: name, inline: true },
              { name: 'ID dokladu totožnosti', value: id, inline: true },
              { name: 'Dátum kúpy', value: date, inline: true },
              { name: 'Dom (číselna hodnota)', value: houseNumber, inline: true },
              { name: 'Suma domu', value: `$${amount}`, inline: true },
              { name: 'Lokácia domu', value: location, inline: true },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'Odoslané cez formulár',
            },
          },
        ],
      }),
    });

    if (response.ok) {
      console.log('Požiadavka odoslaná na Discord');
      res.status(200).json({ message: 'Požiadavka úspešne odoslaná na Discord' });
    } else {
      console.error('Chyba pri odosielaní požiadavky na Discord');
      res.status(500).json({ message: 'Nepodarilo sa odoslať požiadavku na Discord' });
    }
  } catch (error) {
    console.error('Chyba servera:', error);
    res.status(500).json({ message: 'Chyba servera' });
  }
});

app.listen(PORT, () => {
  console.log(`Server beží na http://localhost:${PORT}`);
});
