function getWeather(){

   var btnSearch = document.getElementById("search-apig");
   var btnByCitySearch = document.getElementById("search-apicity");
   
   var outputText = document.getElementById("h5par");
   var outputArea = document.querySelector(".container-output");
   var cardOutput1 = document.getElementById("c1");
   var cardOutput2 = document.getElementById("2");
   
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
                           };
                           localStorage.setItem(card, JSON.stringify(dayForecastArray));
                        //   localStorage.setItem(city+day1+"|"+i, JSON.stringify(dayForecastArray));
                       //    localStorage.setItem("1", JSON.stringify(dayForecastArray));
                       printWeather(card);
                }
               
                  }   
               })};            
   
   function printWeather(card){
      console.log(card);
     // for (card = 1; card < 6; card++) {
         var knowWeather = JSON.parse(localStorage.getItem(card));
         if(card === 1) {
                 
         var par = document.createElement("p");
         var par1 = document.createElement("p");
         var par2 = document.createElement("p");
         var par3 = document.createElement("p");
         
         par.textContent = knowWeather["day"];
         par1.textContent = knowWeather["main"];
         var t = knowWeather["temp"].toFixed(2);
         par2.textContent = "Temp: " +t +"'C";
         par3.textContent = "Humidity: " +knowWeather["humidity"]+ " %";
        
         cardOutput1.appendChild(par);
         cardOutput1.appendChild(par1);
         cardOutput1.appendChild(par2);
         cardOutput1.appendChild(par3);    
      }  
      
      else if (card === 2){
         var par = document.createElement("p");
         var par1 = document.createElement("p");
         var par2 = document.createElement("p");
         var par3 = document.createElement("p");
        
         par.textContent = knowWeather["day"];
         par1.textContent = knowWeather["main"];
         var t = knowWeather["temp"].toFixed(2);
         par2.textContent = "Temp: " +t +"'C";
         par3.textContent = "Humidity: " +knowWeather["humidity"]+ " %";
        
         cardOutput2.appendChild(par);
         cardOutput2.appendChild(par1);
         cardOutput2.appendChild(par2);
         cardOutput2.appendChild(par3); 
        }

        else if (card === 3){
         var cardOutput3 = document.getElementById("3");
         var par = document.createElement("p");
         var par1 = document.createElement("p");
         var par2 = document.createElement("p");
         var par3 = document.createElement("p");
        
         par.textContent = knowWeather["day"];
         par1.textContent = knowWeather["main"];
         var t = knowWeather["temp"].toFixed(2);
         par2.textContent = "Temp: " +t +"'C";
         par3.textContent = "Humidity: " +knowWeather["humidity"]+ " %";
        
         cardOutput3.appendChild(par);
         cardOutput3.appendChild(par1);
         cardOutput3.appendChild(par2);
         cardOutput3.appendChild(par3); 
        }
   };   


 
   // function clearSearch(){
   //     cityInput.value = " ";
   //    par1.textContent = " ";};
   
   
   btnByCitySearch.addEventListener('click', getApiCity);
}
   getWeather();