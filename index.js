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
//hämtar "enter" på tangentbordet
let enter = 13;
//väderikoner
let sun = document.getElementById('sun');
let rain = document.getElementById('rain');
let fog = document.getElementById('fog');
let cloud = document.getElementById('cloud');

function onSearch() {
    //Tar bort meddelandet när användaren söker på en stad
    if(message != null) { message.remove() };

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
		  	sun.style.visibility = 'visible';
		  	cloud.style.visibility = 'hidden';
		  	fog.style.visibility = 'hidden';
		  	rain.style.visibility = 'hidden';
    	} else if (condData.includes('Rain') || condData.includes('rain')) {
			rain.style.visibility = 'visible';
			cloud.style.visibility = 'hidden';
		  	fog.style.visibility = 'hidden';
		  	sun.style.visibility = 'hidden';
    	} else if (condData.includes('Mist') || condData.includes('Fog')) {
			fog.style.visibility = 'visible';
			cloud.style.visibility = 'hidden';
		   	sun.style.visibility = 'hidden';
		  	rain.style.visibility = 'hidden';
    	} else {
			cloud.style.visibility = 'visible';
		  	sun.style.visibility = 'hidden';
		  	fog.style.visibility = 'hidden';
		  	rain.style.visibility = 'hidden';
    	};
    	}).catch(()=>{
        alert('We could not find this city! Please reset and enter another city name.')
   	})
};

//Sökfunktion triggas genom knapptryck. 
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