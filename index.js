//Input value ruta och knapp
let inputValue = document.querySelector('.inputValue');
let button = document.querySelector('.submit');
let resetButton = document.querySelector('.reset');
let message = document.querySelector('#container-message')

//väderparametrar 
let city = document.querySelector('.city');
let condition = document.querySelector('.desc');
let temperature = document.querySelector('.temp');
let feelsLike = document.querySelector('.feels')
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');

//små väderikoner på startskärmen
let smallIcons = document.querySelector('#small-icons');

let enter = 13;

function onSearch() {
    //Tar bort meddelandet när användaren söker på en stad
    document.getElementById('container-message').remove();

    //Hämtar data från API
    fetch('https://api.weatherapi.com/v1/current.json?key=13b60eb1c9fc4420b4b103815211803&q='+inputValue.value+'&aqi=yes')
    .then(response => response.json())
    .then(data => {

        let cityData = data['location']['name'];
        let condData = data['current']['condition']['text'];
        let tempData = data['current']['temp_c'];
        let feelsLikeData = data['current']['feelslike_c'];
        let humidityData = data['current']['humidity'];
        let windData = data['current']['wind_kph'];
        
        //Datan frambringas i webbläsaren
        city.innerHTML = cityData;
        condition.innerHTML = 'Condition:  ' + condData;
        temperature.innerHTML = 'Temperature:  ' + tempData + ' °C';
        feelsLike.innerHTML = `Feels like:  ${feelsLikeData} °C`;
        humidity.innerHTML = 'Humidity:  ' + humidityData + '%'; 
        wind.innerHTML = 'Wind:  ' + windData  + 'k/h';

		//Gömmer de små väder ikonerna vid sökning
		smallIcons.style.visibility ='hidden';

    //Ändrar väderikonen beroende på väderbeskrivning
      if (condData.includes('Sun') || condData.includes('Clear')) {
        document.getElementById('sun').style.visibility = 'visible';
    } else if (condData.includes('Rain') || condData.includes('rain')) {
        document.getElementById('rain').style.visibility = 'visible';
    } else if (condData.includes('Mist') || condData.includes('Fog')) {
        document.getElementById('fog').style.visibility = 'visible';
    } else {
        document.getElementById('cloud').style.visibility = 'visible';
    };
    }).catch(()=>{
        alert('We could not find this city! Please reset and enter another city name.')
    })
};

//Sökfunktion triggas genom knapptrck. 
button.addEventListener('click', onSearch);

// Sökfunktion triggas genom Enter
inputValue.addEventListener("keyup", function(event) {
	if (event.keyCode === enter) {
	  	event.preventDefault();
		button.click(onSearch);
	}
  });

    //Laddar om sidan och nollställer
    resetButton.addEventListener('click', function (){
    document.location.reload();
});