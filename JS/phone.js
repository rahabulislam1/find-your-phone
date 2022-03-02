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

const displayPhoneDetail = phone => {
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');

    phoneDetails.textContent = '';


    const div = document.createElement('div');
    if (phone.releaseDate == '') {
        phone.releaseDate = 'No data found';
    }
    else {
        phone.releaseDate = phone.releaseDate;
    }
    div.classList.add('card');

    if (typeof phone.details == 'object') {
        div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h2 class="card-title">Model: ${phone.name}</h2>
        <h2 class="card-title">Brand: ${phone.brand}</h2>
        <h5 class="card-title">Release Date: ${phone.releaseDate}</h5>
        <h5 class="card-title">Chipset: ${phone.mainFeatures.chipSet}</h5>
        <h5 class="card-title">Display Size: ${phone.mainFeatures.displaySize}</h5>
        <h5 class="card-title">Memory: ${phone.mainFeatures.memory}</h5>
        <h5 class="card-title">Sensors: ${phone.mainFeatures.sensors}</h5>
        <h3 class="card-title text-center">Other: </h3>
        <h5 class="card-title">${phone.others.GPS}</h5>
        <h5 class="card-title">${phone.others.NFC}</h5>
        <h5 class="card-title">${phone.others.Radio}</h5>
        <h5 class="card-title">${phone.others.USB}</h5>
        <h5 class="card-title">${phone.others.Bluetooth}</h5>
        <h5 class="card-title">${phone.others.WLAN}</h5>
    </div>
    `;
    }



    phoneDetails.appendChild(div);

}