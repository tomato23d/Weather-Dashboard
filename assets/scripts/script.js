var btnSearch = document.getElementById("search-apig");
var btnByCitySearch = document.getElementById("search-apicity");

var outputText = document.getElementById("h5par");


//var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=' + myKey;
var city = "Paris";
var myKey = "612789a87d35fc20d850942f4f954d5d";

var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=48.8534&lon=2.3488&appid=bf4cae612aea9c8fdcead6bf50e7112e';
var weatherCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=bf4cae612aea9c8fdcead6bf50e7112e';

function getApi(event){
   event.preventDefault();
    weatherUrl
    
   fetch(weatherUrl)
    .then(function(response){
      return response.json();
         })
    .then(function(data){
        console.log("weather", data)
        for (var i = 0; i < data.length; i++) {
                h5par.textContent = data[i].name;
        }
        })
     };



     function getApiCity(event){
        event.preventDefault();
         weatherCityUrl;
         
        fetch(weatherUrl)
         .then(function(response){
           return response.json();
              })
         .then(function(Citydata){
             console.log("weatherCity", Citydata)})};

btnSearch.addEventListener('click', getApi);
btnByCitySearch.addEventListener('click', getApiCity);

//btnSearch.addEventListener('click', testButton);