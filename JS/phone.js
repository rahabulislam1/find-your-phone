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
            .then(data => console.log(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}