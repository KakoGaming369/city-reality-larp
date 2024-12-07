document.getElementById('houseForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Zabraňuje obnoveniu stránky

    // Získanie údajov z formulára
    const fullName = document.getElementById('fullName').value;
    const idNumber = document.getElementById('idNumber').value;
    const purchaseDate = document.getElementById('purchaseDate').value;
    const houseNumber = document.getElementById('houseNumber').value;
    const housePrice = document.getElementById('housePrice').value;
    const houseLocation = document.getElementById('houseLocation').value;

    // Príprava údajov na odoslanie
    const data = {
        embeds: [
            {
                title: 'Nová objednávka domu',
                color: 0x00ff00,
                fields: [
                    { name: 'Meno a priezvisko', value: fullName, inline: true },
                    { name: 'ID dokladu totožnosti', value: idNumber, inline: true },
                    { name: 'Dátum kúpy', value: purchaseDate, inline: true },
                    { name: 'Dom (číselná hodnota)', value: houseNumber.toString(), inline: true },
                    { name: 'Suma domu', value: `$${housePrice}`, inline: true },
                    { name: 'Lokácia domu', value: houseLocation, inline: true },
                ],
                timestamp: new Date(),
            },
        ],
    };

    // Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1315002072243896491/7e1zybmrAFOwlEZ2r48F8R2w-RBNTb1Bsf7E_df174Phyerrxq5PNvQvRDaqcm4-uhVO';

    try {
        // Odoslanie údajov na webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Objednávka bola úspešne odoslaná!');
        } else {
            alert('Nastala chyba pri odosielaní objednávky.');
        }
    } catch (error) {
        console.error('Chyba:', error);
        alert('Nepodarilo sa odoslať objednávku.');
    }
});
