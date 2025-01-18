document.addEventListener('DOMContentLoaded', function () {
    // Fetch recipes from localStorage or initialize an empty array
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Function to display recipes
    function displayRecipes(filteredRecipes = recipes) {
        const wineCards = document.getElementById('wineCards');
        wineCards.innerHTML = '';

        filteredRecipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${recipe.image || 'placeholder.jpg'}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <p class="card-text">${recipe.description}</p>
                        <a href="#" class="btn btn-primary">Voir plus</a>
                        <button class="btn btn-danger" onclick="deleteRecipe(${index})">Supprimer</button>
                        <button class="btn btn-warning" onclick="editRecipe(${index})">Modifier</button>
                    </div>
                </div>
            `;
            wineCards.appendChild(card);
        });
    }

    // Function to delete a recipe
    window.deleteRecipe = function (index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
        }
    };

    // Function to edit a recipe
    window.editRecipe = function (index) {
        const recipe = recipes[index];
        const editFormHTML = `
            <form id="editRecipeForm">
                <div class="mb-3">
                    <label for="editTitle" class="form-label">Titre</label>
                    <input type="text" class="form-control" id="editTitle" value="${recipe.title}" required>
                </div>
                <div class="mb-3">
                    <label for="editDescription" class="form-label">Description</label>
                    <textarea class="form-control" id="editDescription" required>${recipe.description}</textarea>
                </div>
                <div class="mb-3">
                    <label for="editCategory" class="form-label">Catégorie</label>
                    <select class="form-select" id="editCategory" required>
                        <option ${recipe.category === 'Entée' ? 'selected' : ''}>Entée</option>
                        <option ${recipe.category === 'Plat-Principal' ? 'selected' : ''}>Plat Principal</option>
                        <option ${recipe.category === 'Dessert' ? 'selected' : ''}>Dessert</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="editImage" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="editImage" value="${recipe.image}" required>
                </div>
                <button type="submit" class="btn btn-primary">Sauvegarder</button>
            </form>
        `;

        document.querySelector('.main-content').innerHTML = editFormHTML;

        document.getElementById('editRecipeForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Update recipe
            recipes[index] = {
                title: document.getElementById('editTitle').value,
                description: document.getElementById('editDescription').value,
                category: document.getElementById('editCategory').value,
                image: document.getElementById('editImage').value,
            };

            localStorage.setItem('recipes', JSON.stringify(recipes));
            window.location.reload(); // Reload to reset UI
        });
    };

    // Add recipe form handler
    const addRecipeForm = document.getElementById('addRecipeForm');
    if (addRecipeForm) {
        addRecipeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const newRecipe = {
                title: document.getElementById('recipeTitle').value,
                description: document.getElementById('recipeDescription').value,
                category: document.getElementById('recipeCategory').value,
                image: document.getElementById('recipeImage').value || 'placeholder.jpg',
            };

            // Add new recipe to the array
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            // Redirect to the main page
            window.location.href = 'Acceuil.html';
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredRecipes = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm) ||
                recipe.description.toLowerCase().includes(searchTerm)
            );
            displayRecipes(filteredRecipes);
        });
    }

    // Filter by category
    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            const selectedCategory = this.value;
            if (selectedCategory === 'Catégorie') {
                displayRecipes();
            } else {
                const filteredRecipes = recipes.filter(recipe => recipe.category === selectedCategory);
                displayRecipes(filteredRecipes);
            }
        });
    }

    // Initial display of recipes
    displayRecipes();
});
