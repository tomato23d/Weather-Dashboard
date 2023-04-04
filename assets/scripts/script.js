
var btnStartSearch = document.getElementById("start-search");
var cityStart = document.getElementById("input-start");

function getWeather(){

  
   var btnByCitySearch = document.getElementById("search-apicity");
   
   var outputToday = document.getElementById("today");
  // var outputArea = document.querySelector(".container-output");
  var searchAgain = document.getElementById("search-again");
   
   var cityInput = document.getElementById("input-form");

   //var cityButton1 = document.querySelectorAll(".city-button");
   var cityButton = document.getElementById("history");
   
   const cityHistoryArr = [];
   //if there is something in localStorage, get the items and add them to the array

   
   var myKey = "612789a87d35fc20d850942f4f954d5d";
  // var weatherGeoUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-33.8679&lon=151.2073&appid=bf4cae612aea9c8fdcead6bf50e7112e';
   
   var feels = " ";
   var temp = " ";
   var main = " ";
   var wind = " ";
   var humidity = " ";
  
   
   let date = new Date();
  console.log(date.getDate());
   
   var currentTime = dayjs().format('D.MMMM.YYYY_H:mm');
   
   
        function getApiCity(event){
           event.preventDefault();
        
           var card = 0;
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
                           };
                           search = city+card;
                      
                           localStorage.setItem(search, JSON.stringify(dayForecastArray));
                        

                        //   localStorage.setItem(city+day1+"|"+i, JSON.stringify(dayForecastArray));
                      
                       printCard(card);
                }
               
                  }   
               })
         // under development for the search history list 
               cityInput.value = " ";
               searchAgain.textContent = city;
               cityHistoryArr.push(city);
               localStorage.setItem("city", JSON.stringify(cityHistoryArr));
               searchHistory();
           //this is to close getApiCity();
            };            
   
   function printCard(card){
   
     
         var knowWeather = JSON.parse(localStorage.getItem(search));
         // print into main board the forecast for today;
         if(card === 1) {
            outputToday.innerHTML = " ";

         var cityPrint = document.createElement("p");  
         var par = document.createElement("p");
         var par1 = document.createElement("p");
         var par2 = document.createElement("p");
         var par3 = document.createElement("p");
 

         cityPrint.textContent = knowWeather["city"];
         par.textContent = knowWeather["day"];
         par1.textContent = knowWeather["main"];
         var t = knowWeather["temp"].toFixed(2);
         par2.textContent = "Temp: " +t +"'C";
         par3.textContent = "Humidity: " +knowWeather["humidity"]+ " %";
        
         outputToday.appendChild(cityPrint);
         outputToday.appendChild(par);
         outputToday.appendChild(par1);
         outputToday.appendChild(par2);
         outputToday.appendChild(par3);    
      }  
      
      else if (card >= 2 && card <= 5){
       // print into cards the forecast available for the next few days
         var cardOutput = document.getElementById(card);
         printWeather(card, cardOutput);  
        }


   function printWeather(card, cardOutput){
      cardOutput.innerHTML = " ";

      var knowWeather = JSON.parse(localStorage.getItem(search));
      var par = document.createElement("p");
      var par1 = document.createElement("p");
      var par2 = document.createElement("p");
      var par3 = document.createElement("p");
     
      par.textContent = knowWeather["day"];
      par1.textContent = knowWeather["main"];
      var t = knowWeather["temp"].toFixed(0);
      par2.textContent = "Temp: " +t +"'C";
      par3.textContent = "Humidity: " +knowWeather["humidity"]+ " %";
     
      
       cardOutput.appendChild(par);
       cardOutput.appendChild(par1);
       cardOutput.appendChild(par2);
       cardOutput.appendChild(par3);

   };
} ;  
 
//     function clearSearch(){
     
//       outputToday.innerHTML = " ";
//       cardOutput.innerHTML = " ";
      
// };
   

   function searchHistory (){
   var cityHistory = JSON.parse(localStorage.getItem("city"));
 
   for (var a = 0; a < cityHistory.length; a++) {
        var city1 = document.createElement("button");
      //  city1.setAttribute("class", "history");
         city1.id = cityHistory[a];
         city1.textContent = cityHistory[a];
         searchAgain.appendChild(city1);
   };

};
   
   btnByCitySearch.addEventListener('click', getApiCity);
   
   
}
   getWeather();

   cityButton.addEventListener('click', console.log("works"));

// function getWeather(event){
//    event.preventDefault();
//    console.log(cityStart);
// }

//    btnStartSearch.addEventListener('click', getWeather(cityStart) );