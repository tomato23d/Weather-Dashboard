var btnSearch = document.getElementById("search-api");
var outputText = document.getElementById("h5par");

var myKey = "bf4cae612aea9c8fdcead6bf50e7112e";
var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=bf4cae612aea9c8fdcead6bf50e7112e';
var city = "Paris";

function testButton(){console.log("hello")};


function getApi(){
    weatherUrl
    
    fetch(weatherUrl)
    .then(function(response){
       return response.json();
        })
    .then(function(data){
       console.log(data)
        })

        for (var i = 0; i < data.length; i++) {
    
    h5par.textContent = data[i].name;


    }};



//btnSearch.addEventListener('click', getApi);

btnSearch.addEventListener('click', testButton);