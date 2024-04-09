document.addEventListener("DOMContentLoaded", function () {
    var dairyList = document.getElementById("dairyList");
    var dairyQuantity = document.getElementById("dairyQuantity");
    var addDairyButton = document.getElementById("addDairyButton");
    var addedItemsTable = document.getElementById("addedItems").getElementsByTagName("tbody")[0];
    var downloadButton = document.getElementById("downloadButton");

    var fruitList = document.getElementById("fruitList");
    var fruitQuantity = document.getElementById("fruitQuantity");
    var addFruitButton = document.getElementById("addFruitButton");

    var vegetableList = document.getElementById("vegetableList");
    var vegetableQuantity = document.getElementById("vegetableQuantity");
    var addVegetableButton = document.getElementById("addVegetableButton");

    var breadList = document.getElementById("breadList");
    var breadQuantity = document.getElementById("breadQuantity");
    var addBreadButton = document.getElementById("addBreadButton");

    var meatList = document.getElementById("meatList");
    var meatQuantity = document.getElementById("meatQuantity");
    var addMeatButton = document.getElementById("addMeatButton");

    var fishList = document.getElementById("fishList");
    var fishQuantity = document.getElementById("fishQuantity");
    var addFishButton = document.getElementById("addFishButton");

    var wheatList = document.getElementById("wheatList");
    var wheatQuantity = document.getElementById("wheatQuantity");
    var addWheatButton = document.getElementById("addWheatButton");

    var addonsList = document.getElementById("addonsList");
    var addonsQuantity = document.getElementById("addonsQuantity");
    var addAddonButton = document.getElementById("addAddonButton");


    var itemList = []; // Tablica przechowująca dodane produkty

    var totalCalories = 0;
    var totalCarbs = 0;
    var totalProteins = 0;
    var totalFats = 0;


    function updateMealProperties() {
        var mealPropertiesTable = document.getElementById("mealProperties").getElementsByTagName("tbody")[0];
        mealPropertiesTable.innerHTML = ""; // Czyszczenie istniejących wierszy
        var row = document.createElement("tr");

        var caloriesCell = document.createElement("td");
        caloriesCell.textContent = parseFloat(totalCalories).toFixed(2);
        row.appendChild(caloriesCell);

        var carbsCell = document.createElement("td");
        carbsCell.textContent = parseFloat(totalCarbs).toFixed(2);
        row.appendChild(carbsCell);

        var proteinsCell = document.createElement("td");
        proteinsCell.textContent = parseFloat(totalProteins).toFixed(2);
        row.appendChild(proteinsCell);

        var fatsCell = document.createElement("td");
        fatsCell.textContent = parseFloat(totalFats).toFixed(2);
        row.appendChild(fatsCell);

        mealPropertiesTable.appendChild(row);
    }


    // Funkcja do tworzenia wiersza tabeli dla dodanych rzeczy
    function createTableRow(category, name, quantity, kcal, carbs, proteins, fats) {
        var listItem = document.createElement("tr");

        var categoryCell = document.createElement("td");
        categoryCell.textContent = category;
        listItem.appendChild(categoryCell);

        var nameCell = document.createElement("td");
        nameCell.textContent = name;
        listItem.appendChild(nameCell);

        var quantityCell = document.createElement("td");
        quantityCell.textContent = quantity;
        listItem.appendChild(quantityCell);

        var kcalCell = document.createElement("td");
        kcalCell.textContent = kcal;
        listItem.appendChild(kcalCell);

        var carbsCell = document.createElement("td");
        carbsCell.textContent = carbs;
        listItem.appendChild(carbsCell);

        var proteinsCell = document.createElement("td");
        proteinsCell.textContent = proteins;
        listItem.appendChild(proteinsCell);

        var fatsCell = document.createElement("td");
        fatsCell.textContent = fats;
        listItem.appendChild(fatsCell);

        return listItem;
    }


    function updateDownloadLink() {
        let carbs = parseFloat(totalCarbs);
        let fats = parseFloat(totalFats);
        let cals = parseFloat(totalCalories);
        let proteins = parseFloat(totalProteins);
        var textToSave = "Spożyte kalorie: " + cals.toFixed(2) + "\n";
        textToSave += "Węglowodany: " + carbs.toFixed(2) + "g\n";
        textToSave += "Białka: " + proteins.toFixed(2) + "g\n";
        textToSave += "Tłuszcze: " + fats.toFixed(2) + "g\n";
        textToSave += "\n" + itemList.join("\n");

        // Tworzenie elementu <a> do pobrania pliku
        var downloadLink = document.createElement("a");
        downloadLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(textToSave);
        downloadLink.download = "lista_produktow.txt";
        downloadLink.textContent = "Pobierz listę";

        downloadButton.innerHTML = ""; // Czyszczenie istniejącego przycisku
        downloadButton.appendChild(downloadLink);
        document.getElementById("add").style.display = 'block';
    }

    // Tworzenie opcji dla listy rozwijanej dla kategorii Nabiał
    for (var i = 0; i < dairyItems.length; i++) {
        var option = document.createElement("option");
        option.text = dairyItems[i].name;
        dairyList.add(option);
    }
    var categories = [
        {items: vegetableItems, list: vegetableList},
        {items: fruitItems, list: fruitList},
        {items: breadItems, list: breadList},
        {items: meatItems, list: meatList},
        {items: fishItems, list: fishList},
        {items: wheatItems, list: wheatList},
        {items: addonItems, list: addonsList}
    ];

    for (var j = 0; j < categories.length; j++) {
        var category = categories[j];

        for (var i = 0; i < category.items.length; i++) {
            var option = document.createElement("option");
            option.text = category.items[i].name;
            category.list.add(option);
        }
    }

    function handleAddButtonClick(categoryList, categoryQuantity, categoryItems, categoryName) {
        var selectedItem = categoryList.value;
        var quantity = categoryQuantity.value;

        if (selectedItem && quantity) {
            var item = categoryItems.find(function (item) {
                return item.name === selectedItem;
            });

            if (item) {
                var kcal = (parseFloat(item.kcal) * parseFloat(quantity)) / 100;
                var carbs = (parseFloat(item.carbs) * parseFloat(quantity)) / 100;
                var proteins = (parseFloat(item.protein) * parseFloat(quantity)) / 100;
                var fats = (parseFloat(item.fats) * parseFloat(quantity)) / 100;
                var listItem = createTableRow(categoryName, selectedItem, quantity, kcal.toFixed(2), carbs.toFixed(2), proteins.toFixed(2), fats.toFixed(2));
                addedItemsTable.appendChild(listItem);

                // Aktualizacja sum kalorii, węglowodanów, białek i tłuszczów
                totalCalories += kcal;
                totalCarbs += carbs;
                totalProteins += proteins;
                totalFats += fats;

                categoryList.value = "";
                categoryQuantity.value = "";

                updateMealProperties();

                itemList.push(categoryName + " - " + selectedItem + " (" + quantity + " gram) - " + kcal.toFixed(2) + " kcal " + carbs.toFixed(2) + " carbs " +
                    proteins.toFixed(2) + " proteins " + fats.toFixed(2) + " fats");

                updateDownloadLink();
            }
        }
    }

    addFruitButton.addEventListener("click", function () {
        handleAddButtonClick(fruitList, fruitQuantity, fruitItems, "Owoce");
    });

    addVegetableButton.addEventListener("click", function () {
        handleAddButtonClick(vegetableList, vegetableQuantity, vegetableItems, "Warzywa");
    });

    addDairyButton.addEventListener("click", function () {
        handleAddButtonClick(dairyList, dairyQuantity, dairyItems, "Nabiał");
    });

    addMeatButton.addEventListener("click", function () {
        handleAddButtonClick(meatList, meatQuantity, meatItems, "Mięso");
    });

    addBreadButton.addEventListener("click", function () {
        handleAddButtonClick(breadList, breadQuantity, breadItems, "Pieczywo");
    });

    addFishButton.addEventListener("click", function () {
        handleAddButtonClick(fishList, fishQuantity, fishItems, "Ryby i owoce morza");
    });

    addWheatButton.addEventListener("click", function () {
        handleAddButtonClick(wheatList, wheatQuantity, wheatItems, "Produkty zbożowe");
    });

    addAddonButton.addEventListener("click", function () {
        handleAddButtonClick(addonsList, addonsQuantity, addonItems, "Dodatki");
    });

    downloadButton.addEventListener("click", updateDownloadLink);
    // Obsługa kliknięcia guzika "Pobierz listę"
    downloadButton.addEventListener("click", function () {
        if (itemList.length > 0) {
            updateDownloadLink(); // Aktualizacja pliku do pobrania przed pobraniem
        }
    });
});
