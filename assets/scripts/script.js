function getWeather(){

   var btnSearch = document.getElementById("search-apig");
   var btnByCitySearch = document.getElementById("search-apicity");
   
   var outputText = document.getElementById("h5par");
   var outputArea = document.querySelector(".container-output");
   var cardOutput1 = document.getElementById("c1");
   
   var cityInput = document.getElementById("input-form");
   
   
   
   var myKey = "612789a87d35fc20d850942f4f954d5d";
   var weatherGeoUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-33.8679&lon=151.2073&appid=bf4cae612aea9c8fdcead6bf50e7112e';
   
   const cityForecast = []; 
   var feels = " ";
   var temp = " ";
   var main = " ";
   var wind = " ";
   var humidity = " ";
   var card = 0;
   
   let date = new Date();
   console.log(date.getDate());
   
   var currentTime = dayjs().format('D.MMMM.YYYY_H:mm');
   
   
        function getApiCity(event){
           event.preventDefault();
      
           var city = cityInput.value.trim();
           
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
                  // console.log(date.getDate()+"  " + day+" "+ day1);
  
                  var day1 = Citydata.list[i].dt_txt.substring(8,10);
                  var time1 = Citydata.list[i].dt_txt.substring(11,13);
                
                  if (time1 === "09"){
                              card = card +1;
                   var dayForecastArray = {
                                city: city,
                                card: card,
                                day: day,
                                time: time,
                                feels: Citydata.list[i].main.feels_like-273.15,
                                temp: Citydata.list[i].main.temp-273.15.toFixed(2),
                                humidity: Citydata.list[i].main.humidity,
                                main: Citydata.list[i].weather[0].description,
                                wind: Citydata.list[i].wind.speed*1.61,
                           }
                           console.log(day1);

                           var par1 = document.createElement("p");
                           par1.textContent = day;
                          cardOutput1.appendChild(par1);     


                           localStorage.setItem(card, JSON.stringify(dayForecastArray));
                        //   localStorage.setItem(city+day1+"|"+i, JSON.stringify(dayForecastArray));
                       //    localStorage.setItem("1", JSON.stringify(dayForecastArray));
                }
                 
                  }   
               })};            
   
   // function printWeather(){
      
   //var knewWeather = JSON.parse(localStorage.getItem(day1));
  // console.log(knewWeather);
   //    outputText.textContent = "How it looks outside : "+knewWeather.main;
   //    document.querySelector("#output-1").textContent = "Temperature : "+knewWeather.temp;
   //    document.querySelector("#output-2").textContent = "Humidity : "+ knewWeather.humidity;
   //    document.querySelector("#output-3").textContent = "Wind speed : "+knewWeather.wind;
   //    
   // }
   
   // printWeather();
                 
                         
                  // cityForecast.push(dayForecastArray);
                  // console.log(cityForecast);
          
   // function printForecast(day, time){console.log("hello")};
   
   // function clearSearch(){
   //     cityInput.value = " ";
   //    par1.textContent = " ";};
   
   
   btnByCitySearch.addEventListener('click', getApiCity);
   };
   getWeather();