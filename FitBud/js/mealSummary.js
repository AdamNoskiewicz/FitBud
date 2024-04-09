// Inicjalizacja zmiennych przechowujących dane
let meals = [];
let mealCount = 0;
let totalCalories = 0;
let totalProtein = 0;
let totalCarbs = 0;
let totalFat = 0;

// Funkcja dodająca posiłek
function addMeal() {
    const mealName = document.getElementById('meal-name').value;
    const calories = parseInt(document.getElementById('calories').value);
    const protein = parseInt(document.getElementById('protein').value);
    const carbs = parseInt(document.getElementById('carbs').value);
    const fat = parseInt(document.getElementById('fat').value);

    const meal = {
        name: mealName,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat
    };

    // Dodawanie posiłku do listy
    meals.push(meal);
    mealCount++;

    // Aktualizowanie sum kalorii i makroskładników
    totalCalories += calories;
    totalProtein += protein;
    totalCarbs += carbs;
    totalFat += fat;

    // Aktualizowanie podsumowania na stronie
    updateSummary();

    // Resetowanie pól formularza
    document.getElementById('meal-name').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('carbs').value = '';
    document.getElementById('fat').value = '';

    // Dodawanie nowego posiłku do listy na stronie
    addMealToList(meal);
    document.getElementById("result").style.display = 'block';
}

// Funkcja aktualizująca podsumowanie
function updateSummary() {
    document.getElementById('meal-count').textContent = mealCount;
    document.getElementById('total-calories').textContent = totalCalories;
    document.getElementById('total-protein').textContent = totalProtein;
    document.getElementById('total-carbs').textContent = totalCarbs;
    document.getElementById('total-fat').textContent = totalFat;
}

// Funkcja dodająca posiłek do listy na stronie
function addMealToList(meal) {
    const mealList = document.getElementById('meal-list');
    const mealItem = document.createElement('li');
    mealItem.innerHTML = `
    <strong>${meal.name}</strong> - ${meal.calories} kcal,
    Białko: ${meal.protein}g, Węglowodany: ${meal.carbs}g, Tłuszcze: ${meal.fat}g
  `;
    mealList.appendChild(mealItem);
}

// Funkcja pobierająca podsumowanie w formie tekstu
function downloadSummary() {
    let summaryText = `Podsumowanie posiłków:\n\n`;

    summaryText += `Liczba posiłkow:  ${meals.length}\n`;
    summaryText += `Łączna ilość makroskładników:\n`;

    summaryText += `Kalorie: ${totalCalories} kcal\n`;
    summaryText += `Białko: ${totalProtein} g\n`;
    summaryText += `Węglowodany: ${totalCarbs} g\n`;
    summaryText += `Tłuszcze: ${totalFat} g\n\n`;

    meals.forEach((meal, index) => {
        summaryText += `Posiłek ${index + 1}: ${meal.name}\n`;
        summaryText += `Kalorie: ${meal.calories} kcal\n`;
        summaryText += `Białko: ${meal.protein} g\n`;
        summaryText += `Węglowodany: ${meal.carbs} g\n`;
        summaryText += `Tłuszcze: ${meal.fat} g\n\n`;
    });


    // Tworzenie linku do pobrania
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(summaryText);
    downloadLink.download = 'podsumowanie_posilkow.txt';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
