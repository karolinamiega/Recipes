let searchButton = document.querySelector('.search-button');
let searchBar = document.getElementById('input-box');
let inputBox = document.querySelector('.input-box');
let searchResults = document.querySelector('.search-results');
let mealDetailsContent = document.querySelector('.meal-details-content');
let recipeCloseBtn = document.getElementById('recipe-close-btn');
let mealList = document.getElementById('meal');

searchButton.addEventListener('click', () => {
    getMealList();
    searchResults.style = `visibility: visible;`
})
searchBar.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.key == "Enter"){
        getMealList();
    }
})
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList(){
    let searchInputText = document.getElementById('input-box').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
        .then(data => {
            let html = '';
            if(data.meals){
                data.meals.forEach(meal => {
                    html += `<div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}" alt="">
                                </div>
                                <div class="meal-name">
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#" class = "recipe-btn">Get Recipe</a>
                                </div>
                            </div>`
                });
            } else {
                html = "Sorry, we didn't find any meal! :(";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}
function getMealRecipe(event){
    event.preventDefault();
    if(event.target.classList.contains('recipe-btn')){
        let mealItem = event.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
