const spaceRoot = document.querySelector('.hero__input-display');

function issLocation(apiInput) {
    const coordinatesBox = document.createElement('section');
    const dateText = document.createElement('p');
    const longitudeText = document.createElement('p');
    const latitudeText = document.createElement('p');

    coordinatesBox.classList.add("input-display__container");
    dateText.classList.add("container__date-input");
    longitudeText.classList.add("container__longitude-input");
    latitudeText.classList.add("container__latitude-input");

    const timeStamp = new Date(apiInput.timestamp * 1000);

    dateText.innerText = "Date: " + timeStamp.toDateString();
    longitudeText.innerText = "Longitude: " + apiInput.iss_position.longitude + "°";
    latitudeText.innerText = "Latitude: " + apiInput.iss_position.latitude + "°";

    coordinatesBox.appendChild(dateText);
    coordinatesBox.appendChild(longitudeText);
    coordinatesBox.appendChild(latitudeText);

    spaceRoot.appendChild(coordinatesBox);
};

const locatorButton = document.getElementById('button');

locatorButton.addEventListener('dblclick', () => {
    const mySpacePromise = axios.get('http://api.open-notify.org/iss-now.json');

    mySpacePromise
        .then(result => {
            spaceRoot.innerText = "";
            const apiInputArray = result.data;
            issLocation(apiInputArray);
        })
        .catch(error => { console.error(error) });
});

locatorButton.addEventListener('click', () => {
    
    const issImage = document.querySelector('.hero__image');

    if (!issImage.classList.contains('image__rotate')) {
        issImage.classList.add('image__rotate');
    } else {
        issImage.classList.remove('image__rotate');
    }
});