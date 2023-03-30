var btnSearch = document.getElementById("search-apig");
var btnByCitySearch = document.getElementById("search-apicity");

var outputText = document.getElementById("h5par");
var outputArea = document.querySelector(".container-output");

var cityInput = document.getElementById("input-form");



var myKey = "612789a87d35fc20d850942f4f954d5d";
var weatherGeoUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-33.8679&lon=151.2073&appid=bf4cae612aea9c8fdcead6bf50e7112e';

const cityForecast = []; 
var feels = " ";
var temp = " ";
var main = " ";
var wind = " ";
var humidity = " ";


var currentTime = dayjs().format('D.MMMM.YYYY_H:mm');


     function getApiCity(event){
        event.preventDefault();
   
        var city = cityInput.value.trim();
        console.log(city);
        var weatherCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city+ '&appid=' + myKey;
        
         
        fetch(weatherCityUrl)
         .then(function(response){
           return response.json();
              })
         .then(function(Citydata){
             console.log("weatherCity", Citydata)
             for (var i = 0; i < 40; i++) {
                
                var day = dayjs(Citydata.list[i].dt_txt).format('D/MMMM/YYYY');
                var time = dayjs(Citydata.list[i].dt_txt).format('H');
               
               
               var day1 = Citydata.list[i].dt_txt.substring(8,10);
               var time1 = Citydata.list[i].dt_txt.substring(11,13);
              // console.log(i +" day : ", day1, " time : ", time1);
              
               if (time1 === "09"){
                  
                  //console.log(i + "nine o'clock  " + time1);
           
                var dayForecastArray = {
                             city: city,
                             day: day,
                             time: time,
                             feels: Citydata.list[i].main.feels_like,
                             temp: Citydata.list[i].main.temp,
                             humidity: Citydata.list[i].main.humidity,
                             main: Citydata.list[i].weather[0].description,
                             wind: Citydata.list[i].wind.speed,
                        }
                        localStorage.setItem(city+day1+time1, JSON.stringify(dayForecastArray));
         
                 }
             
               }   
            })};            

               //  var par1 = document.createElement("p");
               //  par1.textContent = day;
               //  outputArea.appendChild(par1);
                      
               // cityForecast.push(dayForecastArray);
               // console.log(cityForecast);
       
// function printForecast(day, time){console.log("hello")};

// function clearSearch(){
//     cityInput.value = " ";
//    par1.textContent = " ";};


btnByCitySearch.addEventListener('click', getApiCity);
