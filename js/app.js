const loadPhones = async(searchText, dataLimit) =>{
    console.log(searchText, dataLimit)
    try{
        const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    }
    catch(error){
        console.log(error)
    }
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    const errorMessage = document.getElementById('no-phone-found');
    const showAllBtn = document.getElementById('show-all');
    phoneContainer.innerHTML = '';

    if(dataLimit && phones.length > 10){
        phones = phones.slice(0 , 10);
        showAllBtn.classList.remove('d-none');
    }
    else{
        showAllBtn.classList.add('d-none');
    }


    if(phones.length === 0){
        errorMessage.classList.remove('d-none');
    }
    else{
        errorMessage.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('col');
        div.innerHTML = `
            <div class="card p-4 rounded">
                <img src="${phone.image}" class="card-img-top container-fluid p-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p>Slug: ${phone.slug}</p>
                </div>
                <button onclick = "showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">Show Details</button>
            </div>
        `; 

        phoneContainer.appendChild(div);
 
    })
    // stop-loader***********

    loadingSpiner(false);
}

const procesSearch = dataLimit =>{
    loadingSpiner(true);
    const searchText = document.getElementById('text-field').value;
    loadPhones(searchText, dataLimit);
}


const searchPhones = () =>{
    // start loader *************
    procesSearch(10);
}
document.getElementById('text-field').addEventListener('keyup', function(event){
    if (event.key === "Enter") {
        procesSearch(10);
      }
})

const loadingSpiner = isLoading =>{
    const loaderSection = document.getElementById('loader');

    if(isLoading == true){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }

}


document.getElementById('btn-show-all').addEventListener('click', function(){
    procesSearch();
})


/*====================
Show details btn
======================*/

const showDetails = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    displayShowDetails(data.data)
}

const displayShowDetails = phone =>{
    console.log(phone)
    const modalContainer = document.getElementById('showDetailsModalLabel');
    modalContainer.innerText = phone.name;

    const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML =`
            <h6>Relase Date : ${phone.releaseDate ? phone.releaseDate : 'No Release date'}</h6>
        `; 

        
}

