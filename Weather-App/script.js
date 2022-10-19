let weather = {
    apiKey: 'aab9496a908339c9e3c4924c8500d6a8',
    fetchWeather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerHTML = "Weather in " + name;
        document.querySelector('.temp').innerHTML = Math.ceil(temp) + "°C";
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/'+ icon +'.png';
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.humidity').innerHTML = "Humidity: " + humidity + "%";
        document.querySelector('.wind').innerHTML = "Wind speed: " + speed + "km/h";
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = 'url(https://source.unsplash.com/1600x900/?' + name +')'
    },
    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
    

};
let searchBox = document.querySelector('.search-button');
let searchBar = document.querySelector('.search-bar');

searchBox.addEventListener('click', (event) => {
    event.preventDefault();
    weather.search();
})
searchBar.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.key == "Enter"){
        weather.search();
    }
})
weather.fetchWeather('Denver');
