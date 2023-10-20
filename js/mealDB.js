const loadMeals = async(searchText, limit) =>{
    
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    const data = await res.json();
    displayMeals(data.meals, limit);
    }
    catch(error){
        const warning = error;
        displayMeals(warning);
    }
}

const displayMeals = (meals, limit, warning) =>{
    const mealContainer = document.getElementById('meal-container');
    const btnShow = document.getElementById('btn-show');
    const foodContainer = document.getElementById('no-food-found');
    mealContainer.innerHTML = '';
    

    // console.log(foods);
    if(meals.length == warning){
        foodContainer.classList.remove('d-none');
    }
    else{
        foodContainer.classList.add('d-none')
    }

    if(limit && meals.length > 5){
        meals = meals.slice(0, 5)
        btnShow.classList.remove('d-none');
    }
    else{
        btnShow.classList.add('d-none');
    }

    meals.forEach( meal => {
        // console.log(meal)
        const mealDiv = document.createElement('col');
        mealDiv.innerHTML = `
        <div class="card p-3">
            <img style='height: 300px;' src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button onclick="viewDetails('${meal.idMeal}')" style='width: 130px;' class='bg-warning' data-bs-toggle="modal"data-bs-target="#mealDetailsModal">View Details</button>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
    });

}

const showAllBtnSearch = (limit) =>{
    const searchText = document.getElementById('text-field').value;
    loadMeals(searchText, limit);
}

const btnSearch = () =>{
    showAllBtnSearch(5);
}

document.getElementById('text-field').addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        showAllBtnSearch(5);
    }
})

const showButton = () =>{
    showAllBtnSearch();
}

const viewDetails = async(mealId) =>{
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch(error){
        console.log(error)
    }
}

const displayMealDetails = meal =>{
    console.log(meal)
    const mealTitle = document.getElementById('mealDetailsModalLabel');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    mealTitle.innerHTML = meal.strMeal;

    const mealDiv = document.createElement('div');
    mealDiv.innerHTML = `
        <h4>Category :${meal.strCategory}</h4>
        <p>Youtube :${meal.strYoutube}></p>
    `;
    modalBody.appendChild(mealDiv);
}

loadMeals('fish');