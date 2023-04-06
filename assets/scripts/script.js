

var container = document.querySelector(".container-output");

function getWeather() {


   var btnByCitySearch = document.getElementById("search-apicity");

   var outputToday = document.getElementById("today");
   
   var searchAgain = document.getElementById("search-again");

   var form = document.getElementById("search-form");

   var cityInput = document.getElementById("input-form");

   var publishMessage = document.getElementById("message")
 


   const cityHistoryArr = [];
   
   var myKey = "612789a87d35fc20d850942f4f954d5d";
   
   var feels = " ";
   var temp = " ";
   var main = " ";
   var wind = " ";
   var humidity = " ";


   let date = new Date();
   //console.log(date.getDate());

   var currentTime = dayjs().format('D.MMMM.YYYY_H:mm');


   function getApiCity(event) {
      event.preventDefault();

      
      var card = 0;
      var city = cityInput.value.trim();

      if (!city){
         publishMessage.textContent = "Please enter a city below";
         return;
       };
       container.style.display="block";
       publishMessage.textContent = " ";
      var weatherCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + myKey;


      fetch(weatherCityUrl)
         .then(function (response) {
            return response.json();
         })
         .then(function (Citydata) {
            console.log("weatherCity", Citydata)
            for (var i = 0; i < 40; i++) {

               var day = dayjs(Citydata.list[i].dt_txt).format('D/MMMM/YYYY');
               var time = dayjs(Citydata.list[i].dt_txt).format('H');


               var day1 = Citydata.list[i].dt_txt.substring(8, 10);
               var time1 = Citydata.list[i].dt_txt.substring(11, 13);

            // 9am is the most popular time to check the weather
               if (time1 === "09") {
                  card = card + 1;
                  var dayForecastArray = {
                     city: city,
                     card: card,
                     day: day,
                     time: time,
                     feels: Citydata.list[i].main.feels_like - 273.15,
                     temp: Citydata.list[i].main.temp - 273.15.toFixed(2),
                     humidity: Citydata.list[i].main.humidity,
                     main: Citydata.list[i].weather[0].description,
                     wind: Citydata.list[i].wind.speed * 1.61,
                  };
                  search = city + card;

                  localStorage.setItem(search, JSON.stringify(dayForecastArray));

                  printBoard(card);
               }

            }
         })
      // setup for the search history list 
      cityInput.value = " ";
      searchAgain.textContent = " ";
    
      cityHistoryArr.push(city);
      localStorage.setItem("city", JSON.stringify(cityHistoryArr));
      searchHistory();
      //last line getApiCity();
   };

   function printBoard(card) {


      var knowWeather = JSON.parse(localStorage.getItem(search));
      // print into main board the forecast for today;
      if (card === 1) {
         outputToday.innerHTML = " ";

         var cityPrint = document.createElement("p");
         var par = document.createElement("p");
         var par1 = document.createElement("p");
         var par2 = document.createElement("p");
         var par3 = document.createElement("p");
         var par4 = document.createElement("p");


         cityPrint.textContent = knowWeather["city"];
         par.textContent = knowWeather["day"];
         par1.textContent = knowWeather["main"];
         var t = knowWeather["temp"].toFixed(2);
         par2.textContent = "Temperature: " + t + "'C";
         par3.textContent = "Humidity: " + knowWeather["humidity"] + " %";
         par4.textContent = "Wind speed: " + knowWeather["wind"].toFixed(1) + "km/h";

         outputToday.appendChild(cityPrint);
         outputToday.appendChild(par);
         outputToday.appendChild(par1);
         outputToday.appendChild(par2);
         outputToday.appendChild(par3);
         outputToday.appendChild(par4);
      }

      else if (card >= 2 && card <= 5) {
         // print into cards the forecast available for the next few days
         var cardOutput = document.getElementById(card);
         printWeatherCards(card, cardOutput);
      }


      function printWeatherCards(card, cardOutput) {
         cardOutput.innerHTML = " ";

         var knowWeather = JSON.parse(localStorage.getItem(search));
         var par = document.createElement("p");
         par.style.fontWeight = "bold";
         var par1 = document.createElement("p");
         var par2 = document.createElement("p");
         var par3 = document.createElement("p");
         var par4 = document.createElement("p");

         par.textContent = knowWeather["day"];
         par1.textContent = knowWeather["main"];
         var t = knowWeather["temp"].toFixed(0);
         par2.textContent = "Temperature: " + t + "'C";
         par3.textContent = "Humidity: " + knowWeather["humidity"] + " %";
         par4.textContent = "Wind speed: " + knowWeather["wind"].toFixed(1) + "km/h";


         cardOutput.appendChild(par);
         cardOutput.appendChild(par1);
         cardOutput.appendChild(par2);
         cardOutput.appendChild(par3);
         cardOutput.appendChild(par4);

      };
   };

   
   // render cities that have already been searched
   function searchHistory() { 
      searchAgain.innerHTML = " ";
      
      var cityHistory = JSON.parse(localStorage.getItem("city"));

      for (var a = 0; a < cityHistory.length; a++) {
         var city1 = document.createElement("button");

         city1.id = cityHistory[a];
         city1.textContent = cityHistory[a];
         city1.classList.add('history-button');
         searchAgain.appendChild(city1);

       
      };

   };
   // print the forecast for cities previously searched
   function buttonClick(event) {
         city = event.target.id;
  
      for (card = 1; card <= 5; card++) {search = city+card;
         printBoard(card);
        // console.log(search); 
      }
   };
 

   // start city forecast search for the first time
   btnByCitySearch.addEventListener('click', getApiCity);
   form.addEventListener("submit", getApiCity);

   //print the forecast for cities previously searched
   searchAgain.addEventListener('click', buttonClick);

}
getWeather();


