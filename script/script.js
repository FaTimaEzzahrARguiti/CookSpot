document.getElementById('searchInput').addEventListener('input', function() {
    const searchText = this.value.toLowerCase(); // Récupère le texte saisi et le met en minuscules
    const cards = document.querySelectorAll('#wineCards .card'); // Sélectionne toutes les cartes

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase(); // Titre de la carte
        const description = card.querySelector('.card-text').textContent.toLowerCase(); // Description de la carte

        // Vérifie si le texte saisi correspond au titre ou à la description
        if (title.includes(searchText) || description.includes(searchText)) {
            card.style.display = ''; // Affiche la carte si elle correspond
        } else {
            card.style.display = 'none'; // Masque la carte si elle ne correspond pas
        }
    });
});




// Données temporaires pour les recettes
let recipes = [];

// Fonction pour afficher les recettes sur la page d'accueil
function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    if (recipeList) {
        recipeList.innerHTML = '';

        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'col-md-4 recipe-card mb-4';
            recipeCard.innerHTML = `
                <div class="card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text"><strong>Catégorie:</strong> ${recipe.category}</p>
                        <p class="card-text"><strong>Ingrédients:</strong> ${recipe.ingredients}</p>
                        <p class="card-text"><strong>Étapes:</strong> ${recipe.steps}</p>
                        <button class="btn btn-warning btn-sm" onclick="editRecipe(${index})">Modifier</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${index})">Supprimer</button>
                    </div>
                </div>
            `;
            recipeList.appendChild(recipeCard);
        });
    }
}

