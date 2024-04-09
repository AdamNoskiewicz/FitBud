// Funkcja do obliczania dziennego spożycia kalorii
function obliczKalorie() {
    // Pobierz wartości z formularza
    const wiek = parseInt(document.getElementById('age').value);
    const plec = document.getElementById('gender').value;
    const waga = parseFloat(document.getElementById('weight').value);
    const wzrost = parseInt(document.getElementById('height').value);
    const poziomAktywnosci = parseFloat(document.getElementById('activity-level').value);
    const cel = document.getElementById('goal').value;

    // Oblicz BMR (Podstawowa Przemiana Materii)
    let bmr = 0;
    if (plec === 'male') {
        bmr = 88.362 + (13.397 * waga) + (4.799 * wzrost) - (5.677 * wiek);
    } else if (plec === 'female') {
        bmr = 447.593 + (9.247 * waga) + (3.098 * wzrost) - (4.330 * wiek);
    }

    // Oblicz TDEE (Całkowite Dzienne Wydatki Energetyczne)
    const tdee = bmr * poziomAktywnosci;

    // Oblicz spożycie kalorii w zależności od celu
    let kalorieCel = 0;
    if (cel === 'maintenance') {
        kalorieCel = tdee;
    } else if (cel === 'weight-loss') {
        kalorieCel = tdee - 250; // Zmniejszenie spożycia o 500 kalorii na dzień
    } else if (cel === 'weight-gain') {
        kalorieCel = tdee + 250; // Zwiększenie spożycia o 500 kalorii na dzień
    }

    // Wyświetl wynik
    const resultElement = document.getElementById('calories-result');
    let goalText = '';
    if (cel === 'maintenance') {
        goalText = 'Utrzymanie wagi';
    } else if (cel === 'weight-loss') {
        goalText = 'Zmniejszenie wagi';
    } else if (cel === 'weight-gain') {
        goalText = 'Zwiększenie wagi';
    }
    resultElement.innerHTML = `<p>Szacowane dzienne spożycie kalorii: <strong>${kalorieCel.toFixed(2)}</strong> kalorii. Cel: <strong>${goalText}</strong>.</p>`;
}

// Dodaj nasłuchiwanie na zdarzenie submit formularza
const form = document.getElementById('calories-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Zapobiegaj domyślnemu wysyłaniu formularza
    obliczKalorie(); // Wywołaj funkcję obliczKalorie
});
