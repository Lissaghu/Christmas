(()=>{var e={525:()=>{document.querySelector(".player-controls");const e=document.querySelector(".play-list"),t=document.querySelector(".play-prev"),n=document.querySelector(".play-next"),o=document.querySelector(".play"),a=(document.querySelector(".duration-timer"),document.querySelector(".duration")),r=document.querySelector(".current-duration"),l=document.querySelector(".progress-main-line"),s=document.querySelector(".progress-title"),c=document.querySelector(".progress-line"),i=document.querySelector(".volume-icon"),u=document.querySelector(".volume"),d=[{title:"Aqua Caelestis",src:"../assets/sounds/Aqua Caelestis.mp3",duration:"00:40"},{title:"Ennio Morricone",src:"../assets/sounds/Ennio Morricone.mp3",duration:"01:37"},{title:"River Flows In You",src:"../assets/sounds/River Flows In You.mp3",duration:"01:37"},{title:"Summer Wind",src:"../assets/sounds/Summer Wind.mp3",duration:"01:50"}],m=new Audio;let g=0,p=!1;function y(){m.src=d[g].src,m.currentTime=0,p?p&&(m.pause(),p=!1,o.classList.remove("pause")):(m.play(),p=!0,o.classList.add("pause"),m.volume=.2,u.value=20),function(){const e=document.querySelectorAll(".play-item");for(let t=0;t<e.length;t++)g==t?(e[t].classList.add("item-active"),e[t].classList.add("play-item-pause")):(e[t].classList.remove("item-active"),e[t].classList.remove("play-item-pause"))}(),function(){for(let e=0;e<d.length;e++)g==e&&(a.textContent=`${d[e].duration}`,s.textContent=`${d[e].title}`)}()}function v(){g++,g==d.length&&(g=0),y(),m.play(),m.paused?(p=!1,o.classList.remove("pause")):(p=!0,o.classList.add("pause"))}d.forEach((t=>{const n=document.createElement("li");n.classList.add("play-item"),n.textContent=t.title,e.append(n)}));const f=document.querySelectorAll(".play-item");function h(){for(let e of f)e.classList.contains("item-active")&&(m.paused?e.classList.remove("play-item-pause"):e.classList.add("play-item-pause"))}f.forEach(((e,t,n)=>{e.addEventListener("click",(n=>{let o=n.currentTarget;return setTimeout((()=>{f.forEach((e=>{e.classList.remove("play-item-pause")})),o.classList.contains("item-active")&&(m.paused?e.classList.remove("play-item-pause"):e.classList.add("play-item-pause"))}),1),g=t,y()}))})),o.addEventListener("click",y),t.addEventListener("click",(function(){g>0?g--:0==g&&(g=d.length-1),y(),m.play(),m.paused?(p=!1,o.classList.remove("pause")):(p=!0,o.classList.add("pause"))})),n.addEventListener("click",v),m.addEventListener("ended",v),m.addEventListener("timeupdate",(function(e){const{duration:t,currentTime:n}=e.srcElement,o=n/t*100;c.style.width=`${o}%`;let a=Math.floor(m.currentTime%60),l=Math.floor(m.currentTime/60%60);l<10&&(l=`0${l}`),a<10&&(a=`0${a}`),r.textContent=l+":"+a})),l.addEventListener("click",(function(e){const t=this.clientWidth,n=e.offsetX,o=m.duration;m.currentTime=n/t*o})),u.addEventListener("input",(function(){let e=u.value;m.volume=e/100,0==m.volume?i.classList.add("volume-icon-muted"):i.classList.remove("volume-icon-muted")})),i.addEventListener("click",(function(){m.volume>0?(i.classList.add("volume-icon-muted"),m.volume=0,u.value=0):(i.classList.remove("volume-icon-muted"),m.volume=1,u.value=100)})),o.addEventListener("click",h),n.addEventListener("click",h)},268:()=>{const e=document.querySelector(".time"),t=document.querySelector(".date"),n=document.querySelector(".greeting"),o=document.querySelector(".name"),a=document.querySelector("body"),r=document.querySelector(".slide-prev"),l=document.querySelector(".slide-next"),s=document.querySelector(".weather-icon"),c=document.querySelector(".temperature"),i=document.querySelector(".weather-description"),u=document.querySelector(".city"),d=document.querySelector(".wind"),m=document.querySelector(".humidity"),g=document.querySelector(".weather-error"),p=document.querySelector(".quote"),y=document.querySelector(".author"),v=document.querySelector(".change-quote"),f=document.querySelector(".select-lang"),h=document.querySelector(".settings"),S=document.querySelector(".select-bg");function L(){return(new Date).getHours()}function w(){const e=["morning","afternoon","evening","night"];return L()<12&&L()>=6?e[0]:L()<18&&L()>=12?e[1]:L()<=23&&L()>=18?e[2]:L()<6&&L()>=0?e[3]:void setTimeout(w,1e3)}let q;function E(){let e=w(),t=q<10?"0"+q:q;const n=new Image;n.src=`https://raw.githubusercontent.com/Lissaghu/stage1-tasks/assets/images/${e}/${t}.jpg`,"Github"==localStorage.getItem("backValue")&&n.addEventListener("load",(()=>{a.style.backgroundImage=`url(${n.src})`}))}async function k(){let e;e="Russia"==localStorage.getItem("langValue")?`https://api.openweathermap.org/data/2.5/weather?q=${u.value}&lang=ru&appid=3a8ea49517022bed16bfd3674732aec5&units=metric`:`https://api.openweathermap.org/data/2.5/weather?q=${u.value}&lang=en&appid=3a8ea49517022bed16bfd3674732aec5&units=metric`;const t=await fetch(e),n=await t.json();200==t.status?(s.className="weather-icon owf",s.classList.add(`owf-${n.weather[0].id}`),c.textContent=`${Math.round(n.main.temp)}°C`,i.textContent=n.weather[0].description,"Russia"==localStorage.getItem("langValue")?(d.textContent=`Скорость ветра: ${Math.round(n.wind.speed)} м/с`,m.textContent=`Влажность: ${n.main.humidity}%`):(d.textContent=`Wind speed: ${Math.round(n.wind.speed)} m/s`,m.textContent=`Humidity: ${n.main.humidity}%`),u.value=n.name,localStorage.setItem("city",u.value)):(g.textContent=`Error! ${n.message} for ${u.value}`,s.style.display="none",c.style.display="none",i.style.display="none",d.style.display="none",m.style.display="none")}async function I(){let e;e="Russia"==localStorage.getItem("langValue")?"data.json":"dataEng.json";const t=await fetch(e),n=await t.json();let o=n[Math.floor(10*Math.random())].text;p.textContent=o;for(let e of n)o==e.text&&(y.textContent=e.author)}async function x(){const e=`https://api.unsplash.com/photos/random?orientation=landscape&query=nature-${w()}&client_id=WwAot07b1Ke5fLmaHfzKAVjNaeBSpMfr17CQvts1hwg`,t=await fetch(e),n=await t.json(),o=new Image;o.src=n.urls.regular,"Unsplash"==localStorage.getItem("backValue")&&o.addEventListener("load",(()=>{a.style.backgroundImage=`url(${o.src})`}))}async function $(){const e=w();let t;"night"==e?t="72157720062587146":"morning"==e?t="72157720069530982":"afternoon"==e?t="72157720111881805":"evening"==e&&(t="72157720111880160");const n=`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=0f15ff623f1198a1f7f52550f8c36057&gallery_id=${t}&extras=url_h&format=json&nojsoncallback=1`;console.log(n);const o=await fetch(n),r=await o.json(),l=new Image;l.src=r.photos.photo[Math.floor(16*Math.random())].url_h,console.log(r.photos.photo),"Flickr"==localStorage.getItem("backValue")&&l.addEventListener("load",(()=>{a.style.backgroundImage=`url(${l.src})`}))}!function a(){const r=(new Date).toLocaleTimeString();e.textContent=`${r}`,function(){const e=new Date,n={month:"long",weekday:"long",day:"numeric"};if("Russia"==localStorage.getItem("langValue")){const o=e.toLocaleDateString("ru-RU",n);t.textContent=`${o}`}else{const o=e.toLocaleDateString("en-US",n);t.textContent=`${o}`}}(),function(){if("Russia"==localStorage.getItem("langValue")){const e=`${function(){const e=["Доброе утро","Добрый день","Добрый вечер","Доброй ночи"];return L()<12&&L()>=6?e[0]:L()<18&&L()>=12?e[1]:L()<=23&&L()>=18?e[2]:L()<6&&L()>=0?e[3]:void setTimeout(w,1e3)}()},`;n.textContent=e,o.placeholder="[Введите имя]"}else{const e=`Good ${w()},`;n.textContent=e}}(),setTimeout(a,1e3)}(),null===localStorage.getItem("city")&&localStorage.setItem("city","Minsk"),u.value=localStorage.getItem("city"),window.addEventListener("beforeunload",(function(){localStorage.setItem("name",o.value)})),window.addEventListener("load",(function(){localStorage.getItem("name")&&(o.value=localStorage.getItem("name"))})),q=Math.floor(20*Math.random())+1,E(),l.addEventListener("click",(function(){q<20?q++:20==q&&(q=1),E(),x(),$()})),r.addEventListener("click",(function(){q>1?q--:1==q&&(q=20),E(),x(),$()})),document.addEventListener("DOMContentLoaded",k),u.addEventListener("change",k),I(),v.addEventListener("click",I),"Russia"==localStorage.getItem("langValue")&&(document.querySelector(".language").textContent="Выбор языка",document.querySelector(".background-sourse").textContent="Выбор фона"),f.addEventListener("change",(function(){(null===localStorage.getItem("langValue")||localStorage.getItem("langValue")!=f.value)&&(localStorage.setItem("langValue",f.value),location.reload())})),h.addEventListener("click",(function(e){const t=document.querySelector(".settings-wrap");e.currentTarget.classList.contains("open")?(h.classList.remove("open"),t.style.opacity=""):(h.classList.add("open"),t.style.opacity="1")})),S.addEventListener("change",(function(){(null===localStorage.getItem("backValue")||localStorage.getItem("backValue")!=S.value)&&(localStorage.setItem("backValue",S.value),location.reload())})),x(),$()}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(268),n(525)})()})();