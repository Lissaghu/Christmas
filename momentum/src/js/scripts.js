const time = document.querySelector('.time')
const dateToday = document.querySelector('.date')
const greet = document.querySelector('.greeting')
const greetingTextInput = document.querySelector('.name')
const body = document.querySelector('body')
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')
const weatherIcon = document.querySelector('.weather-icon')
const weatherTemperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const inputCity = document.querySelector('.city')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherError = document.querySelector('.weather-error')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')
const selectLanguage = document.querySelector('.select-lang')
const settingsButton = document.querySelector('.settings')

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString()
  time.textContent = `${currentTime}`
  showDate()
  showGreeting()
  setTimeout(showTime, 1000)
}
showTime()

function showDate() {
  const date = new Date();
  const options = {
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  };
  if (localStorage.getItem('langValue') == 'Russia') {
    const currentDate = date.toLocaleDateString('ru-RU', options)
    dateToday.textContent = `${currentDate}`
  } else {
    const currentDate = date.toLocaleDateString('en-US', options)
    dateToday.textContent = `${currentDate}`
  }


}

function getHours() {
  const date = new Date()
  const hours = date.getHours()
  return hours
}

function getTimeOfDay() {
  const timeOfDay = ['morning', 'afternoon', 'evening', 'night']
  if (getHours() < 12 && getHours() >= 6) {
    return timeOfDay[0]
  } else if (getHours() < 18 && getHours() >= 12) {
    return timeOfDay[1]
  } else if (getHours() <= 23 && getHours() >= 18) {
    return timeOfDay[2]
  } else if (getHours() < 6 && getHours() >= 0) {
    return timeOfDay[3]
  }
  setTimeout(getTimeOfDay, 1000)
}

function getTimeOfDayRu() {
  const timeOfDay = ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи']
  if (getHours() < 12 && getHours() >= 6) {
    return timeOfDay[0]
  } else if (getHours() < 18 && getHours() >= 12) {
    return timeOfDay[1]
  } else if (getHours() <= 23 && getHours() >= 18) {
    return timeOfDay[2]
  } else if (getHours() < 6 && getHours() >= 0) {
    return timeOfDay[3]
  }
  setTimeout(getTimeOfDay, 1000)
}

function showGreeting() {
  if (localStorage.getItem('langValue') == 'Russia') {
    const timeOfDay = getTimeOfDayRu()
    const greetingText = `${timeOfDay},`
    greet.textContent = greetingText
    greetingTextInput.placeholder = '[Введите имя]'
  } else {
    const timeOfDay = getTimeOfDay()
    const greetingText = `Good ${timeOfDay},`
    greet.textContent = greetingText
  }

}

function localStorageCity() {
  if (localStorage.getItem('city') === null) {
    localStorage.setItem('city', 'Minsk')
  }
  inputCity.value = localStorage.getItem('city')
}
localStorageCity()

function setLocalStorage() {
  localStorage.setItem('name', greetingTextInput.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    greetingTextInput.value = localStorage.getItem('name')
  }
}
window.addEventListener('load', getLocalStorage)

let randomNum;

function getRandomNum() {
  let max = 20
  let min = 1
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum;
}
getRandomNum()

function setBg() {
  let timeOfDay = getTimeOfDay()
  let bgNum = randomNum
  let num = bgNum < 10 ? ('0' + bgNum) : bgNum
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Lissaghu/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`
  })
}
setBg()

function getSlideNext() {
  if (randomNum < 20) {
    randomNum++
  } else if (randomNum == 20) {
    randomNum = 1
  }
  setBg()
}

slideNext.addEventListener('click', getSlideNext)

function getSlidePrev() {
  if (randomNum > 1) {
    randomNum--
  } else if (randomNum == 1) {
    randomNum = 20
  }
  setBg()
}

slidePrev.addEventListener('click', getSlidePrev)

// async function getWeather() {
//   let url;
//   if (localStorage.getItem('langValue') == 'Russia') {
//     url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=ru&appid=3a8ea49517022bed16bfd3674732aec5&units=metric`
//   } else {
//     url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=3a8ea49517022bed16bfd3674732aec5&units=metric`
//   }

//   const res = await fetch(url)
//   console.log(res.status)
//   const data = await res.json()

//   if (res.status == 200) {
//     weatherIcon.className = 'weather-icon owf';
//     weatherIcon.classList.add(`owf-${data.weather[0].id}`);
//     weatherTemperature.textContent = `${Math.round(data.main.temp)}°C`
//     weatherDescription.textContent = data.weather[0].description

//     if (localStorage.getItem('langValue') == 'Russia') {
//       wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
//       humidity.textContent = `Влажность: ${data.main.humidity}%`
//     } else {
//       wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
//       humidity.textContent = `Humidity: ${data.main.humidity}%`
//     }

//     inputCity.value = data.name
//     localStorage.setItem('city', inputCity.value)
//   } else {
//     weatherError.textContent = `Error! ${data.message} for ${inputCity.value}`
//     weatherIcon.style.display = 'none'
//     weatherTemperature.style.display = 'none'
//     weatherDescription.style.display = 'none'
//     wind.style.display = 'none'
//     humidity.style.display = 'none'
//   }
// }

// document.addEventListener('DOMContentLoaded', getWeather);
// inputCity.addEventListener('change', getWeather)

async function getQuotes() {

  let quotes;

  if (localStorage.getItem('langValue') == 'Russia') {
    quotes = 'data.json'
  } else {
    quotes = 'dataEng.json'
  }

  const res = await fetch(quotes)
  const data = await res.json()

  let quoteText = data[Math.floor(Math.random() * 10)].text
  quote.textContent = quoteText

  for (let elem of data) {
    if (quoteText == elem.text) {
      author.textContent = elem.author
    }
  }
}
getQuotes()

changeQuote.addEventListener('click', getQuotes)

// select Languages--------------------------------------------------

function selectLanguageValue() {
  if (localStorage.getItem('langValue') === null) {
    localStorage.setItem('langValue', selectLanguage.value)
    location.reload()
  } else if (localStorage.getItem('langValue') != selectLanguage.value) {
    localStorage.setItem('langValue', selectLanguage.value)
    location.reload()
  }

}

function changeLanguage() {
  if (localStorage.getItem('langValue') == 'Russia') {
    document.querySelector('.language').textContent = 'Выбор языка'
    document.querySelector('.background-sourse').textContent = 'Выбор фона'
  }
}
changeLanguage()

selectLanguage.addEventListener('change', selectLanguageValue)

// settings-------------------------------------------------------------

function clickSetting() {

}

settingsButton.addEventListener('click', clickSetting)
