// Ladda djuren från localStorage när sidan laddas
document.addEventListener('DOMContentLoaded', function() {
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals.forEach(addAnimalToGrid);
});

// Hantera formulärinmatning
document.getElementById('animalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindrar att sidan laddas om

    // Hämta formulärvärdena
    const animalName = document.getElementById('animalName').value;
    const animalType = document.getElementById('animalType').value;
    const color = document.getElementById('color').value;
    const legs = document.getElementById('legs').value;
    const likesHumans = document.getElementById('likesHumans').checked ? "Ja" : "Nej";

    // Skapa ett nytt djurobjekt
    const newAnimal = { animalName, animalType, color, legs, likesHumans };

    // Lägg till djuret i localStorage
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals.push(newAnimal);
    localStorage.setItem('animals', JSON.stringify(animals));

    // Lägg till djuret i gridden
    addAnimalToGrid(newAnimal);

    // Töm formuläret efter inskickning
    document.getElementById('animalForm').reset();
});

// Funktion för att lägga till ett djurkort till gridden
function addAnimalToGrid(animal) {
    const animalCard = document.createElement('div');
    animalCard.classList.add('grid-item');

    // Kolla om djuret gillar människor, om inte lägg till varningsstil
    if (animal.likesHumans === "Nej") {
        animalCard.classList.add('danger');
        const warningIcon = document.createElement('div');
        warningIcon.classList.add('warning-icon');
        animalCard.appendChild(warningIcon);
    }

    // Skapa innehållet i kortet
    animalCard.innerHTML += `
        <h3>${animal.animalName}</h3>
        <p><strong>Typ av djur:</strong> ${animal.animalType}</p>
        <p><strong>Färg:</strong> ${animal.color}</p>
        <p><strong>Antal ben:</strong> ${animal.legs}</p>
        <p><strong>Gillar människor:</strong> ${animal.likesHumans}</p>
        <button class="delete-btn">Ta bort</button>
    `;

    // Hantera borttagning av djuret
    animalCard.querySelector('.delete-btn').addEventListener('click', function() {
        removeAnimalFromGrid(animalCard, animal);
    });

    document.getElementById('animalGrid').appendChild(animalCard);
}

// Funktion för att ta bort ett djur från gridden och localStorage
function removeAnimalFromGrid(card, animal) {
    // Ta bort kortet från gridden
    card.remove();

    // Ta bort djuret från localStorage
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals = animals.filter(a => a.animalName !== animal.animalName || a.animalType !== animal.animalType);
    localStorage.setItem('animals', JSON.stringify(animals));
}
