document.getElementById('order-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    id: document.getElementById('id').value,
    date: document.getElementById('date').value,
    houseNumber: document.getElementById('houseNumber').value,
    amount: document.getElementById('amount').value,
    location: document.getElementById('location').value,
  };

  console.log('Form data:', formData);

  const webhookURL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `🛒 Nová objednávka: 
        - Meno: ${formData.name}
        - ID dokladu: ${formData.id}
        - Dátum kúpy: ${formData.date}
        - Číslo domu: ${formData.houseNumber}
        - Suma domu: ${formData.amount}
        - Lokácia domu: ${formData.location}`,
      }),
    });

    if (response.ok) {
      alert("Objednávka bola úspešne odoslaná na Discord.");
    } else {
      alert("Nepodarilo sa odoslať objednávku.");
      console.log("Response error:", response);
    }
  } catch (error) {
    alert("Chyba pri odosielaní.");
    console.error("Chyba: ", error);
  }
});
