const container = document.getElementById('container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.getElementById('.not-found');

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    const API = 'a34f263af35aa5f427de1a0fe210c799';

    if(city === '') {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`).then(response => response.json()).then(json => {
        if(json.cod === '404') {
             container.style.height = '400px';
             weatherBox.style.display = 'none';
             weatherDetails.style.display = 'none';
             error.style.display = 'block';
             error.classList.add('fadeIn');
             return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = './img/clear.png';
                break;
                
            case 'Clouds':
                image.src = './img/cloud.png';
                break;
                
            case 'Mist':
                image.src = './img/mist.png';
                break;
                
            case 'Rain':
                image.src = './img/rain.png';
                break;
                
            case 'Snow':
                image.src = './img/snow.png';
                break;
            case 'Haze':
                image.src = './img/haze.png';
                break;

            default:
                image.src = '';
                
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C°</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
})