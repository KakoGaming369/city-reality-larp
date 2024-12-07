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

  console.log('Posielam tieto dáta:', formData);

  try {
    const response = await fetch('https://your-backend-url.com/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Objednávka odoslaná!');
    } else {
      alert('Nepodarilo sa odoslať objednávku');
    }
  } catch (error) {
    console.error('Chyba pri odosielaní:', error);
    alert('Chyba!');
  }
});
