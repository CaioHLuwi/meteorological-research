let inputField = document.querySelector('#searchInput');

function searchWeather(event) {
    let warningMessage = document.querySelector('#warningMessage');
    event.preventDefault();

    if(inputField.value != ''){
        showLoading('Loading...')
        getLocInfo();
    } else {
       warningMessage.style.display = "block";
    }

    inputField.value = '';
}   

async function getLocInfo() {
    const APIKey = '';
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(inputField.value)}&limit=1&appid=58ce985714a31aec823c26d9d7dbdde0`;

    let req = await fetch(URL)
    let json = await req.json();

    let lat = json[0].lat;
    let lon = json[0].lon;

    let locName = json[0].name;
    let locState = json[0].state;
    let locCountry = json[0].country;

    
    getWeather(lat, lon, locName, locState, locCountry);
}

async function getWeather(lat, lon, name, state, country){
    const APIKey = '';
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&timezone=auto&forecast_days=1`;

    let req = await fetch(URL);
    let json = await req.json();

    let temperature = json.current.temperature_2m;
    let windSpeed = json.current.wind_speed_10m;
    let windDirection = json.current.wind_direction_10m;
    let locName = name;
    let locState = state;
    let locCountry = country;
    
    console.log(json);
    showData(temperature, windSpeed, windDirection, locName, locState, locCountry);
}

function showLoading(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function showData(temperature, windSpeed, windDirection, locName, locState, locCountry) {
    document.querySelector('.aviso').style.display = 'none';

    let resultArea = document.querySelector('.resultado');
    let titleElement = document.querySelector('#locName');
    let tempInfoElement = document.querySelector('.tempInfo');
    let windSpeedElement = document.querySelector('.ventoInfo');
    let windPointerElement = document.querySelector('.ventoPonto');

    resultArea.style.display = 'block';

    let wPointerDeg = windDirection - 90; 

    titleElement.textContent = `${locName}, ${locState} - ${locCountry}`;
    tempInfoElement.innerHTML = `${temperature} <sup>ºC</sup>`;
    windSpeedElement.innerHTML = `${windSpeed} <span>km/h</span>`;
    windPointerElement.style.transform = `rotate(${wPointerDeg}deg)`;
}
