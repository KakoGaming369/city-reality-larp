document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("orderForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const idNumber = document.getElementById("idNumber").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const houseNumber = document.getElementById("houseNumber").value;
    const houseCost = document.getElementById("houseCost").value;
    const location = document.getElementById("location").value;

    // Webhook URL
    const webhookURL = "https://discord.com/api/webhooks/1315002072243896491/7e1zybmrAFOwlEZ2r48F8R2w-RBNTb1Bsf7E_df174Phyerrxq5PNvQvRDaqcm4-uhVO";

    // Priprav payload
    const payload = {
      embeds: [
        {
          title: "Nová objednávka",
          color: 7506394, // Discord embed color
          fields: [
            { name: "Meno a priezvisko", value: fullName, inline: true },
            { name: "ID dokladu", value: idNumber, inline: true },
            { name: "Dátum kúpy", value: purchaseDate, inline: true },
            { name: "Číslo domu", value: houseNumber, inline: true },
            { name: "Suma domu", value: `$${houseCost}`, inline: true },
            { name: "Lokácia domu", value: location, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Objednávka úspešne odoslaná!");
      } else {
        alert("Nepodarilo sa odoslať objednávku.");
      }
    } catch (error) {
      console.error("Chyba pri odosielaní:", error);
      alert("Nastala chyba pri odosielaní formulára.");
    }
  });
});
