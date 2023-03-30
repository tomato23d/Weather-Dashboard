var btnSearch = document.getElementById("search-apig");
var btnByCitySearch = document.getElementById("search-apicity");

var outputText = document.getElementById("h5par");
var outputArea = document.querySelector(".container-output");

var cityInput = document.getElementById("input-form");


//var city = "Paris";
var myKey = "612789a87d35fc20d850942f4f954d5d";

var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-33.8679&lon=151.2073&appid=bf4cae612aea9c8fdcead6bf50e7112e';

const cityForecast = [];


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
        clearSearch();

        var city = cityInput.value.trim();
        console.log(city);
        var weatherCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city+ '&appid=' + myKey;
        //var weatherCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=' + myKey;
        //weatherCityUrl;
         
        fetch(weatherCityUrl)
         .then(function(response){
           return response.json();
              })
         .then(function(Citydata){
             console.log("weatherCity", Citydata)
             for (var i = 0; i < 40; i++) {
                var par1 = document.createElement("p");
                par1.textContent = Citydata.list[i].dt_txt;
                outputArea.appendChild(par1);
                var day =  Citydata.list[i].dt_txt;
               //  var day2 = dayjs(day).format('D/MMMM/YYYY');
               //  var day_time = dayjs(day).format('H');
               //  console.log(day, "  ", day2, "  ", day_time);
               var day1 = new Date(day);
                console.log(typeof(day1), "  ", day1);

               // var dayForecastArray = {
               //      city: city,
               //      day2: day_time,

               // }
               //console.log(dayForecastArray);
              // var forecastString = JSON.stringify(dayForecastArray);
              
               // cityForecast.push(dayForecastArray);
               // console.log(cityForecast);
        }   
            })};


function clearSearch(){
    cityInput.value = " ";
   par1.textContent = " ";}

btnSearch.addEventListener('click', getApi);
btnByCitySearch.addEventListener('click', getApiCity);
