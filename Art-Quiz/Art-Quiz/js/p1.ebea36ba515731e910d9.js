(()=>{"use strict";let t=new Audio("../../assets/audio/trueAnswer.mp3"),e=new Audio("../../assets/audio/falseAnswer.mp3"),s=new Audio("../../assets/audio/endQuiz.mp3");const n=class{render(){const t=document.querySelector(".main-wrapper");t.innerHTML="",t.innerHTML='\n    <div class="main-settings">\n      <button class="settigs-back button-controller" data-page="Main"></button>\n      <div class="settings-name">Settings</div>\n      <div class="volume-name">Volume</div>\n      <div class="settings-volume-range">\n          <input class="volume-range" id="volume" type="range"\n      max="100" value="34" min="0" step="2">\n          <div class="button-mute"></div>\n          <div class="button-volume"></div>\n      </div>\n      <div class="time-game-name">Time game</div>\n      <div class="time-game-input">\n          <input type="checkbox">\n\n      </div>\n      <div class="time-answer">Time to answer</div>\n      <div class="time-input">\n          <button class="button-prev btn-settings">&minus;</button>\n          <div class="time-input-count">20</div>\n          <button class="button-next btn-settings">+</button>\n      </div>\n      <div class="main-settings-button">\n          <button class="button-default button button-controller" data-page="Main">Default</button>\n          <button class="button-save button button-controller" data-page="Main">Save</button>\n      </div>\n      <div class="main-footer">\n          <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n          <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n          <div class="footer-year">2021</div>\n      </div>\n    </div>',this.changeVolume()}soundTrueAnswer(){t.play(),t.volume=+localStorage.getItem("volume-trueAnswer")/100}soundFalseAnswer(){e.play(),e.volume=+localStorage.getItem("volume-trueAnswer")/100}soundEndQuiz(){s.play(),s.volume=+localStorage.getItem("volume-trueAnswer")/100}changeVolume(){let n=document.querySelector(".volume-range");n.addEventListener("change",(function(){this.value==this.min?(t.volume=0,e.volume=0,s.volume=0):this.value==this.max&&(t.volume=1,e.volume=1,s.volume=1)})),document.querySelector(".button-save").addEventListener("click",(()=>{localStorage.setItem("volume-trueAnswer",n.value)})),n.value=+localStorage.getItem("volume-trueAnswer"),document.querySelector(".button-volume").addEventListener("click",(()=>{n.value=1})),document.querySelector(".button-mute").addEventListener("click",(()=>{n.value=0})),document.querySelector(".button-default").addEventListener("click",(()=>{localStorage.setItem("volume-trueAnswer",0)}))}};let a;(async()=>{let t=await fetch("https://raw.githubusercontent.com/Lissaghu/image-data/master/images.json");return await t.json()})().then((t=>{a=t}));const r=class{constructor(){this.author=new class{constructor(){this.state}createAuthor(t,e){return(async()=>{this.state=e;let s=0,n=document.querySelectorAll(".question-author-button"),r=10*this.state.state.category,o=a.slice(r).map((t=>t.author)),i=a.map((t=>t.author)),u=t=>Math.floor(Math.random()*t);n.forEach((t=>{t.textContent=i[u(240)]})),n[u(4)].textContent=o[s];let c=document.querySelector(".button-next-wrap");document.querySelector(".button-modal-next").addEventListener("click",(()=>{c.classList.remove("button-next-wrap-open"),document.querySelectorAll(".question-author-button").forEach((t=>{t.classList.remove("question-author-button-green"),t.classList.remove("question-author-button-red")})),n.forEach((t=>{t.textContent=i[u(240)]})),n[u(4)].textContent=o[s+1],s!=t&&s++}))})()}},this.settings=new n,this.state,this.result,this.trueResult}render(t,e){return(async()=>{let e=document.querySelector(".main-wrapper");e.innerHTML="",e.innerHTML='\n        <div class="question-picture-wrapper">\n            <div class="question-picture">\n                <div class="question-close-modal">\n                    <button class="button-close-modal-menu btn-question-close"></button>\n                    <div class="question-close-modal-text btn-question-close">Do you really want to quit the game?</div>\n                    <button class="button question-close-modal-menu btn-question-close button-controller" data-page="Main">Menu</button>\n                    <button class="button  question-close-modal-category btn-question-close button-controller">Categories</button>\n                </div>\n                <div class="question-picture-header">\n                    <button class="question-close"></button>\n                    <div class="question-picture-header-time"></div>\n                </div>\n                <div class="question-picture-question">Who is the author of this picture?</div>\n                <div class="question-picture-wrap"></div>\n                <div class="question-picture-progress-dot">\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                </div>\n                <div class="question-author-button-wrap">\n                    <button class="button question-author-button"></button>\n                    <button class="button question-author-button"></button>\n                    <button class="button question-author-button"></button>\n                    <button class="button question-author-button"></button>\n                </div>\n                <div class="main-footer">\n                    <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n                    <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n                    <div class="footer-year">2021</div>\n                </div>\n                <div class="button-next-wrap">\n                    <div class="current-image"></div>\n                    <div class="current-name"></div>\n                    <div class="current-author"></div>\n                    <div class="current-year"></div>\n                    <button class="button button-modal-next">Next</button>\n                </div>\n                <div class="quiz-modal-end">\n                    <button class="quiz-modal-end-close button-controller quiz-end-main" data-page="Main"></button>\n                    <div class="end-text">Congratulations!</div>\n                    <div class="end-result"></div>\n                    <button class="button modal-button-end-exit button-controller quiz-end-main" data-page="Main">Exit</button>\n                    <button class="button modal-button-end-next button-controller">Next Quiz</button>\n                </div>\n                <div class="overflow"></div>\n            </div>\n        </div>',this.state=t,this.result=this.state.state.resultAnswer[`${this.state.state.category}`],this.trueResult=this.state.state.trueAnswer[`${this.state.state.category}`],t.setEventListeners(),await this.author.createAuthor(9,t),await this.createImage(9),this.modalCloseQuiz("Pictures"),this.targetAuthor()})()}createImage(t){return(async()=>{let e=0,s=document.querySelector(".question-picture-wrap"),n=10*this.state.category,r=a.slice(n).map((t=>t.imageNum)),o=document.createElement("img");o.classList.add("question-picture-img"),o.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${r[e]}full.webp`,s.append(o);let i=document.querySelector(".overflow");document.querySelector(".button-modal-next").addEventListener("click",(()=>{i.classList.remove("overflow-active"),s.innerHTML="";let n=document.createElement("img");n.classList.add("question-picture-img"),n.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${+r[e]+1}full.webp`,s.append(n),e==t?(this.state.setEventListeners(),this.modalEndQuiz(this.state.state.category,this.result,this.trueResult,"Pictures"),this.settings.soundEndQuiz()):e++}))})()}targetAuthor(){let t=0,e=document.querySelectorAll(".question-author-button"),s=10*this.state.state.category,n=a.slice(s).map((t=>t.author)),r=a.slice(s).map((t=>t.imageNum)),o=a.slice(s).map((t=>t.year)),i=a.slice(s).map((t=>t.name)),u=document.querySelector(".current-image"),c=document.querySelector(".current-name"),l=document.querySelector(".current-author"),d=document.querySelector(".current-year"),m=document.querySelector(".button-next-wrap"),p=document.createElement("div");p.classList.add("answer-true");let g=document.querySelector(".overflow"),v=document.querySelectorAll(".picture-progress-dot");e.forEach((e=>{e.addEventListener("click",(e=>{g.classList.add("overflow-active"),e.target.innerText==n[t]?(this.settings.soundTrueAnswer(),this.result.push(!0),p.classList.remove("answer-false"),v[t].classList.add("picture-progress-dot-true")):(this.settings.soundFalseAnswer(),this.result.push(!1),v[t].classList.add("picture-progress-dot-false"),p.classList.add("answer-false")),u.innerHTML="",c.innerHTML="",l.innerHTML="",d.innerHTML="";let s=document.createElement("img");s.classList.add("question-picture-img-modal"),s.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${r[t]}full.webp`,u.append(p),u.append(s),c.append(i[t]),l.append(n[t]),d.append(o[t]),m.classList.add("button-next-wrap-open"),t++}))}))}modalCloseQuiz(t){document.querySelector(".question-close-modal-category").setAttribute("data-page",t);let e=document.querySelector(".question-close"),s=document.querySelector(".overflow"),n=document.querySelector(".question-close-modal");e.addEventListener("click",(()=>{s.classList.add("overflow-active"),n.classList.add("question-close-modal-open")})),document.querySelectorAll(".btn-question-close").forEach((t=>{t.addEventListener("click",(()=>{s.classList.remove("overflow-active"),n.classList.remove("question-close-modal-open")}))}))}modalEndQuiz(t,e,s,n){document.querySelector(".modal-button-end-next").setAttribute("data-page",n);let a=document.querySelector(".quiz-modal-end");a.classList.add("quiz-modal-end-open");let r=document.querySelector(".overflow");r.classList.add("overflow-active"),document.querySelectorAll(".quiz-end-main").forEach((t=>{t.addEventListener("click",(()=>{a.classList.remove("quiz-modal-end-open"),r.classList.remove("overflow-active")}))})),document.querySelector(".modal-button-end-next").addEventListener("click",(()=>{a.classList.remove("quiz-modal-end-open"),r.classList.remove("overflow-active")})),localStorage.setItem(`${t}-result`,JSON.stringify(e));let o=document.querySelector(".end-result");for(let t of e)1==t&&s.push(t);localStorage.setItem(`${t}`,s.length),o.textContent=`${s.length}/10`}},o=["Portrait","Landscape","Still Life","Graphic","Antique","Avant-Garde","Renaissance","Surrealism","Kitsch","Minimalism","Avangard","Industrial","Portrait","Landscape","Still Life","Graphic","Antique","Avant-Garde","Renaissance","Surrealism","Kitsch","Minimalism","Avangard","Industrial"],i=class{constructor(){this.state,this.resultAnswer,this.trueAnswer}render(t){return(async()=>{const e=document.querySelector(".main-wrapper");e.innerHTML="",e.innerHTML='\n      <div class="categories-pictures-wrapper">\n        <div class="main-categories-pictures">\n          <div class="categories-pictures-title">Categories</div>\n          <div class="pictures-grid"></div>\n          <div class="categories-pictures-sidebar">\n              <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>\n              <button class="sidebar-categories sidebar-button" data-page="Pictures">Categories</button>\n          </div>\n        </div>\n      </div>',this.state=t,this.resultAnswer=t.state.resultAnswer,this.trueAnswer=t.state.trueAnswer,await this.createCategoryCard(12,10,0,0),this.setEventListeners(new r,this.state),this.setEventScore(this.state)})()}createCategoryCard(t,e,s,n){let a=document.querySelector(".pictures-grid"),r=n;return(async()=>{let n=await fetch("https://raw.githubusercontent.com/Lissaghu/image-data/master/images.json"),i=await n.json();for(let n of i)if(n.imageNum%e==0&&n.imageNum<t*e+s-1&&n.imageNum>=s){let t=document.createElement("div");t.classList.add("pictures-grid-item"),a.append(t);let e=document.createElement("div");e.classList.add("pictures-grid-item-wrap-title"),t.append(e);let s=document.createElement("div");s.classList.add("pictures-grid-item-title"),s.textContent=o[r],e.append(s);let i=document.createElement("div");i.classList.add("pictures-count");let u=localStorage.getItem(`${r}`);i.textContent=null==u?"":u+"/10",e.append(i);let c=document.createElement("div");c.classList.add("pictures-img-wrap"),t.append(c);let l=document.createElement("img");l.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${n.imageNum}.webp`,null!=u&&l.classList.add("pictures-img-color"),l.classList.add("pictures-img"),l.setAttribute("data-category",r),c.append(l);let d=document.createElement("button");d.textContent="Score",d.classList.add("pictures-score-button"),null!=u&&d.classList.add("pictures-score-button-open"),d.setAttribute("data-score",r),c.append(d),r++}})()}setEventListeners(t,e){document.querySelectorAll("img").forEach((s=>{s.addEventListener("click",(()=>{this.questionRender(event,t,e)}))}))}questionRender(t,e,s){t.target.dataset.category&&(s.state.category=+t.target.dataset.category,s.state.currentPage=e,this.getResultAnswer(s),this.getTrueAnswer(s));let n=document.querySelector(".main-wrapper");n.classList.add("main-wrapper-out"),setTimeout((()=>{n.classList.remove("main-wrapper-out"),s.state.currentPage.render(s)}),500)}getResultAnswer(t){t.state.resultAnswer[`${t.state.category}`]=[]}getTrueAnswer(t){t.state.trueAnswer[`${t.state.category}`]=[]}setEventScore(t){document.querySelectorAll(".pictures-score-button").forEach((e=>{e.addEventListener("click",(()=>this.scoreRender(event,t)))}))}scoreRender(t,e){t.target.dataset.score&&(e.state.score=+t.target.dataset.score,e.state.currentPage=new class{constructor(){this.score}render(t){document.querySelector(".main-wrapper").innerHTML='\n      <div class="score-wrapper">\n          <div class="score-title button-controller" data-page="Pictures">Categories</div>\n          <div class="score-grid"></div>\n          <div class="categories-pictures-sidebar">\n              <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>\n              <button class="sidebar-categories sidebar-button button-controller" data-page="Pictures">Categories</button>\n          </div>\n      </div>',this.score=t.state.score,t.setEventListeners(),this.renderResult(10)}renderResult(t){let e=document.querySelector(".score-grid"),s=this.score*t,n=a.slice(s,s+10).map((t=>t.imageNum));for(let t of n){let s=document.createElement("img");s.classList.add("question-picture-img"),s.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${t}.webp`,e.append(s)}let r=JSON.parse(localStorage.getItem(`${this.score}-result`)),o=document.querySelectorAll(".question-picture-img");for(let t=0;t<r.length;t++)o.forEach(((e,s)=>{0==r[t]&&t==s&&e.classList.add("score-img")}))}});let s=document.querySelector(".main-wrapper");s.classList.add("main-wrapper-out"),setTimeout((()=>{s.classList.remove("main-wrapper-out"),e.state.currentPage.render(e)}),500)}},u=class{render(){const t=document.querySelector(".main-wrapper");t.innerHTML="",t.innerHTML='\n      <div class="main-page" id="main">\n        <button class="settings button-controller" data-page="Settings"></button>\n        <div class="main">\n            <img class="logo-main" src="./assets/img/logo-main.png" alt="">\n            <button class="button button-artist button-controller" data-page="Artists">Artist quiz</button>\n            <button class="button button-pictures button-controller" data-page="Pictures">Pictures quiz</button>\n        </div>\n        <div class="main-footer">\n            <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n            <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n            <div class="footer-year">2021</div>\n        </div>\n      </div>'}},c=new Map([["Settings",n],["Main",u],["Pictures",i],["Artists",class{constructor(){this.pictureClass=new i,this.state}render(t){return(async()=>{const e=document.querySelector(".main-wrapper");e.innerHTML="",e.innerHTML='\n        <div class="categories-pictures-wrapper">\n            <div class="main-categories-pictures">\n                <div class="categories-pictures-title">Categories</div>\n                <div class="pictures-grid"></div>\n                <div class="categories-pictures-sidebar">\n                    <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>\n                    <button class="sidebar-categories sidebar-button" data-page="Artists">Categories</button>\n                </div>\n            </div>\n        </div>',this.state=t,await this.pictureClass.createCategoryCard(12,10,119,12),this.pictureClass.setEventListeners(new class{constructor(){this.pictures=new class{constructor(){this.state}createImage(t,e){return(async()=>{this.state=e;let s=0,n=document.querySelectorAll(".question-artist-img"),r=10*this.state.state.category,o=a.slice(r).map((t=>t.imageNum)),i=a.map((t=>t.imageNum)),u=t=>Math.floor(Math.random()*t);n.forEach((t=>{let e=document.createElement("img");e.classList.add("question-picture-img"),e.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${i[u(240)]}.webp`,t.append(e)}));let c=document.createElement("img");c.classList.add("question-picture-img"),c.setAttribute("data-id",s),c.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${o[s]}.webp`;let l=n[u(4)];l.innerHTML="",l.append(c);let d=document.querySelector(".button-next-wrap");document.querySelector(".button-modal-next").addEventListener("click",(()=>{document.querySelectorAll(".question-artist-img").forEach((t=>{t.innerHTML=""})),d.classList.remove("button-next-wrap-open");let e=document.querySelectorAll(".question-artist-img");e.forEach((t=>{let e=document.createElement("img");e.classList.add("question-picture-img"),e.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${i[u(240)]}.webp`,t.append(e)}));let n=document.createElement("img");n.classList.add("question-picture-img"),n.setAttribute("data-id",s+1),n.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${o[s+1]}.webp`;let a=e[u(4)];a.innerHTML="",a.append(n),s!=t&&s++}))})()}},this.settings=new n,this.questions=new r,this.state,this.result,this.trueResult}render(t){return(async()=>{let e=document.querySelector(".main-wrapper");e.innerHTML="",e.innerHTML='\n        <div class="question-artist-wrapper">\n            <div class="question-close-modal">\n                <button class="button-close-modal-menu btn-question-close"></button>\n                <div class="question-close-modal-text btn-question-close">Do you really want to quit the game?</div>\n                <button class="button question-close-modal-menu btn-question-close button-controller" data-page="Main">Menu</button>\n                <button class="button  question-close-modal-category btn-question-close button-controller">Categories</button>\n            </div>\n            <div class="question-artist-header">\n                <button class="question-close"></button>\n                <div class="question-artist-header-time"></div>\n            </div>\n            <div class="question-artist-question"></div>\n            <div class="question-artist-wrap">\n                <div class="question-artist-img"></div>\n                <div class="question-artist-img"></div>\n                <div class="question-artist-img"></div>\n                <div class="question-artist-img"></div>\n            </div>\n            <div class="question-artist-progress-dot">\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n                <span class="picture-progress-dot"></span>\n            </div>\n            <div class="main-footer">\n                <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n                <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n                <div class="footer-year">2021</div>\n            </div>\n            <div class="button-next-wrap">\n                <div class="current-image"></div>\n                <div class="current-name"></div>\n                <div class="current-author"></div>\n                <div class="current-year"></div>\n                <button class="button button-modal-next">Next</button>\n            </div>\n            <div class="quiz-modal-end">\n                <button class="quiz-modal-end-close button-controller quiz-end-main" data-page="Main"></button>\n                <div class="end-text">Congratulations!</div>\n                <div class="end-result"></div>\n                <button class="button modal-button-end-exit button-controller quiz-end-main" data-page="Main">Exit</button>\n                <button class="button modal-button-end-next button-controller">Next Quiz</button>\n            </div>\n            <div class="overflow"></div>\n        </div>',this.state=t,this.result=this.state.state.resultAnswer[`${this.state.state.category}`],this.trueResult=this.state.state.trueAnswer[`${this.state.state.category}`],this.state.setEventListeners(),await this.pictures.createImage(9,t),await this.createAuthor(9),this.questions.modalCloseQuiz("Artists"),this.targetImage()})()}createAuthor(t){return(async()=>{let e=0,s=document.querySelector(".question-artist-question"),n=10*this.state.state.category,r=a.slice(n).map((t=>t.author));s.textContent=`Which is ${r[e]} picture?`;let o=document.querySelector(".overflow");document.querySelector(".button-modal-next").addEventListener("click",(()=>{o.classList.remove("overflow-active"),s.textContent=`Which is ${r[e+1]} picture?`,e==t?(this.state.setEventListeners(),this.questions.modalEndQuiz(this.state.state.category,this.result,this.trueResult,"Artists"),this.settings.soundEndQuiz()):e++}))})()}targetImage(){let t=0,e=document.querySelectorAll(".question-artist-img"),s=10*this.state.state.category,n=a.slice(s).map((t=>t.author)),r=a.slice(s).map((t=>t.imageNum)),o=a.slice(s).map((t=>t.year)),i=a.slice(s).map((t=>t.name)),u=document.querySelector(".current-image"),c=document.querySelector(".current-name"),l=document.querySelector(".current-author"),d=document.querySelector(".current-year"),m=document.querySelector(".button-next-wrap"),p=document.createElement("div");p.classList.add("answer-true");let g=document.querySelector(".overflow"),v=document.querySelectorAll(".picture-progress-dot");e.forEach((e=>{e.addEventListener("click",(e=>{g.classList.add("overflow-active"),+e.target.dataset.id==t?(this.settings.soundTrueAnswer(),this.result.push(!0),p.classList.remove("answer-false"),v[t].classList.add("picture-progress-dot-true")):(this.settings.soundFalseAnswer(),this.result.push(!1),v[t].classList.add("picture-progress-dot-false"),p.classList.add("answer-false")),console.log(this.result),u.innerHTML="",c.innerHTML="",l.innerHTML="",d.innerHTML="";let s=document.createElement("img");s.classList.add("question-picture-img-modal"),s.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${r[t]}full.webp`,u.append(p),u.append(s),c.append(i[t]),l.append(n[t]),d.append(o[t]),m.classList.add("button-next-wrap-open"),t++}))}))}},t),this.pictureClass.setEventScore(this.state)})()}}]]);window.onload=()=>{document.querySelector(".preloader").classList.add("pswp__preloader__icn-hide"),(new class{constructor(t=new u,e,s){this.state={currentPage:t,resultAnswer:{},trueAnswer:{},category:e,score:s}}init(){this.state.currentPage.render(),this.setEventListeners()}setEventListeners(){document.querySelectorAll(".button-controller").forEach((t=>{t.addEventListener("click",(()=>this.changePage(event)))}))}changePage(t){var e;t&&(this.state.currentPage=(e=t.target.dataset.page,new(c.get(e))));let s=document.querySelector(".main-wrapper");s.classList.add("main-wrapper-out"),setTimeout((()=>{s.classList.remove("main-wrapper-out"),this.state.currentPage.render(this),this.setEventListeners()}),500)}}).init()},alert("Спасибо большое, что подождали! Проверьте работу пожалуйста на мобильном разрешении, желательно на 360х640, на адаптив времени не хватило)"),console.log("\nСпасибо всем, кто смог подождать до последнего дня кросс-чека!\nСделал многое, но не всё:\n- Игра на вермя не сделана,\n- При клике по карточкам на странице результата не выводится информация по ним\n- Особо никаких уникальных анимаций, кроме плавной смены страниц и выезжающих модальных окон, \nтут всё на ваше усмотрение)\n\n--- Почему-то GitHub не может найти пути к mp3, поэтому пришлось залить на нетлифай\nработоспособность звука можете проверить по ссылке https://brave-davinci-38c203.netlify.app/\n")})();