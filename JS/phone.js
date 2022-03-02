document.getElementById('error-message').style.display = 'none';

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //Clear Data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        // displayError(error);
        document.getElementById('error-message').style.display = 'block';
        console.log('Please write something to display');
    }

    else {
        //Load Data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}


const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    console.log(phones);

    searchResult.textContent = "";
    if (phones.length == 0) {
        // Show no result Found
        console.log('No Result Found');
    }


    for (let i = 0; i < 20 && i < phones.length; i++) {

        console.log(phones[i]);
        // console.log(i);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img class="img-fluid" src="${phones[i].image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phones[i].phone_name}</h5>
                <h4 class="card-title">${phones[i].brand}</h4>
            </div>
            <button  onclick = "loadPhoneDetail('${phones[i].slug}')" class="btn btn-info" type="button"
            id="button-search">See Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    }

    if (phones.length > 20) {
        const seeMore = document.getElementById('see-more');
        seeMore.innerHTML =
            `
        <button  onclick = "seeMore(phones)" class="btn btn-info w-75 m-5 mx-auto" type="button"
            id="button-search">See More</button>
        `
    }


}

function seeMore(phones) {
    for (let i = 20; i < phones.length; i++) {

        console.log(phones[i]);
        // console.log(i);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img class="img-fluid" src="${phones[i].image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phones[i].phone_name}</h5>
                <h4 class="card-title">${phones[i].brand}</h4>
            </div>
            <button  onclick = "loadPhoneDetail('${phones[i].slug}')" class="btn btn-info" type="button"
            id="button-search">See Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    }
}



const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
    // .then(data => console.log(data));
}

