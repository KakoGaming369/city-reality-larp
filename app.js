document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    meno: formData.get("meno"),
    idDokladu: formData.get("idDokladu"),
    datumKup: formData.get("datumKup"),
    domCislo: formData.get("domCislo"),
    sumaDomu: formData.get("sumaDomu"),
    lokacia: formData.get("lokacia")
  };

  const webhookURL = "https://discord.com/api/webhooks/1315002072243896491/7e1zybmrAFOwlEZ2r48F8R2w-RBNTb1Bsf7E_df174Phyerrxq5PNvQvRDaqcm4-uhVO";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `Nová objednávka: ${JSON.stringify(data)}` }),
    });

    if (response.ok) {
      document.getElementById("status-message").innerText = "Objednávka odoslaná!";
    } else {
      throw new Error("Chyba pri odosielaní.");
    }
  } catch (error) {
    document.getElementById("status-message").innerText = "Nepodarilo sa odoslať.";
  }
});
