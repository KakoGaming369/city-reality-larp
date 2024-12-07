const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware na parsovanie JSON dát
app.use(bodyParser.json());

// Discord webhook URL
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL';

app.post('/submit-form', async (req, res) => {
  try {
    const { name, id, date, houseNumber, amount, location } = req.body;

    console.log('Prijatá objednávka:', req.body);

    // Posielanie údajov v Discord Embed formáte
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: 'Nová objednávka',
            color: 7506394, // Pekná farba v hex kóde
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
              text: 'Odoslané z formulára',
            },
          },
        ],
      }),
    });

    if (response.ok) {
      res.status(200).json({ message: 'Údaje boli úspešne odoslané.' });
    } else {
      res.status(500).json({ message: 'Nepodarilo sa odoslať údaje na Discord.' });
    }
  } catch (error) {
    console.error('Chyba pri odosielaní:', error);
    res.status(500).json({ message: 'Chyba servera.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server beží na http://localhost:${PORT}`);
});
