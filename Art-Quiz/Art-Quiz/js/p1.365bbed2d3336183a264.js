(()=>{"use strict";let t;(async()=>{let t=await fetch("https://raw.githubusercontent.com/Lissaghu/image-data/master/images.json");return await t.json()})().then((e=>{t=e}));const e=class{constructor(){this.author=new class{constructor(){this.state}createAuthor(e,s,n){return(async()=>{this.state=n;let s=0,a=document.querySelectorAll(".question-author-button"),r=10*this.state.category,o=t.slice(r).map((t=>t.author)),i=t.map((t=>t.author)),c=t=>Math.floor(Math.random()*t);a.forEach((t=>{t.textContent=i[c(240)]})),a[c(4)].textContent=o[s];let u=document.querySelector(".button-next-wrap");document.querySelector(".button-modal-next").addEventListener("click",(()=>{u.classList.remove("button-next-wrap-open"),document.querySelectorAll(".question-author-button").forEach((t=>{t.classList.remove("question-author-button-green"),t.classList.remove("question-author-button-red")})),a.forEach((t=>{t.textContent=i[c(240)]})),a[c(4)].textContent=o[s+1],s!=e&&s++}))})()}},this.state,this.result,this.trueResult}render(t){let e=async()=>{let s=document.querySelector(".main-wrapper");s.innerHTML="",s.innerHTML='\n        <div class="question-picture-wrapper">\n            <div class="question-picture">\n                <div class="question-close-modal">\n                    <button class="button-close-modal-menu btn-question-close"></button>\n                    <div class="question-close-modal-text btn-question-close">Do you really want to quit the game?</div>\n                    <button class="button question-close-modal-menu btn-question-close button-controller" data-page="Main">Menu</button>\n                    <button class="button  question-close-modal-category btn-question-close button-controller" data-page="Pictures">Categories</button>\n                </div>\n                <div class="question-picture-header">\n                    <button class="question-close"></button>\n                    <div class="question-picture-header-time"></div>\n                </div>\n                <div class="question-picture-question">Who is the author of this picture?</div>\n                <div class="question-picture-wrap"></div>\n                <div class="question-picture-progress-dot">\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                    <span class="picture-progress-dot"></span>\n                </div>\n                <div class="question-author-button-wrap">\n                    <button class="button question-author-button"></button>\n                    <button class="button question-author-button"></button>\n                    <button class="button question-author-button"></button>\n                    <button class="button question-author-button"></button>\n                </div>\n                <div class="main-footer">\n                    <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n                    <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n                    <div class="footer-year">2021</div>\n                </div>\n                <div class="button-next-wrap">\n                    <div class="current-image"></div>\n                    <div class="current-name"></div>\n                    <div class="current-author"></div>\n                    <div class="current-year"></div>\n                    <button class="button button-modal-next">Next</button>\n                </div>\n                <div class="quiz-modal-end">\n                    <button class="quiz-modal-end-close button-controller quiz-end-main" data-page="Main"></button>\n                    <div class="end-text">Congratulations!</div>\n                    <div class="end-result"></div>\n                    <button class="button modal-button-end-exit button-controller quiz-end-main" data-page="Main">Exit</button>\n                    <button class="button modal-button-end-next button-controller" data-page="Pictures">Next Quiz</button>\n                </div>\n                <div class="overflow"></div>\n            </div>\n        </div>',this.state=t,this.result=this.state.state.resultAnswer[`${this.state.category}`],this.trueResult=this.state.state.trueAnswer[`${this.state.category}`],t.setEventListeners(),await this.author.createAuthor(9,e,this.state),await this.createImage(9,e),this.modalCloseQuiz(),this.targetAuthor(e)};return e()}createImage(e){return(async()=>{let s=0,n=(document.querySelector(".main-wrapper"),document.querySelector(".question-picture-wrap")),a=10*this.state.category,r=t.slice(a).map((t=>t.imageNum)),o=document.createElement("img");o.classList.add("question-picture-img"),o.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${r[s]}full.webp`,n.append(o);let i=document.querySelector(".overflow");document.querySelector(".button-modal-next").addEventListener("click",(()=>{i.classList.remove("overflow-active"),n.innerHTML="";let t=document.createElement("img");t.classList.add("question-picture-img"),t.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${+r[s]+1}full.webp`,n.append(t),s==e?(this.state.setEventListeners(),this.modalEndQuiz()):s++}))})()}targetAuthor(e){let s=0,n=document.querySelectorAll(".question-author-button"),a=10*this.state.category,r=t.slice(a).map((t=>t.author)),o=t.slice(a).map((t=>t.imageNum)),i=t.slice(a).map((t=>t.year)),c=t.slice(a).map((t=>t.name)),u=document.querySelector(".current-image"),l=document.querySelector(".current-name"),d=document.querySelector(".current-author"),m=document.querySelector(".current-year"),p=document.querySelector(".button-next-wrap"),g=document.createElement("div");g.classList.add("answer-true");let v=document.querySelector(".overflow"),h=document.querySelectorAll(".picture-progress-dot");n.forEach((t=>{t.addEventListener("click",(t=>{v.classList.add("overflow-active"),t.target.innerText==r[s]?(this.result.push(!0),g.classList.remove("answer-false"),h[s].classList.add("picture-progress-dot-true")):(this.result.push(!1),h[s].classList.add("picture-progress-dot-false"),g.classList.add("answer-false")),u.innerHTML="",l.innerHTML="",d.innerHTML="",m.innerHTML="";let e=document.createElement("img");e.classList.add("question-picture-img-modal"),e.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${o[s]}full.webp`,u.append(g),u.append(e),l.append(c[s]),d.append(r[s]),m.append(i[s]),p.classList.add("button-next-wrap-open"),s++}))}))}modalCloseQuiz(){let t=document.querySelector(".question-close"),e=document.querySelector(".overflow"),s=document.querySelector(".question-close-modal");t.addEventListener("click",(()=>{e.classList.add("overflow-active"),s.classList.add("question-close-modal-open")})),document.querySelectorAll(".btn-question-close").forEach((t=>{t.addEventListener("click",(()=>{e.classList.remove("overflow-active"),s.classList.remove("question-close-modal-open")}))}))}modalEndQuiz(){let t=document.querySelector(".quiz-modal-end");t.classList.add("quiz-modal-end-open");let e=document.querySelector(".overflow");e.classList.add("overflow-active"),document.querySelectorAll(".quiz-end-main").forEach((s=>{s.addEventListener("click",(()=>{t.classList.remove("quiz-modal-end-open"),e.classList.remove("overflow-active")}))})),document.querySelector(".modal-button-end-next").addEventListener("click",(()=>{t.classList.remove("quiz-modal-end-open"),e.classList.remove("overflow-active")})),localStorage.setItem(`${this.state.category}-result`,this.result);let s=document.querySelector(".end-result");for(let t of this.result)1==t&&this.trueResult.push(t);localStorage.setItem(`${this.state.category}`,this.trueResult.length),s.textContent=`${this.trueResult.length}/10`}},s=["Portrait","Landscape","Still Life","Graphic","Antique","Avant-Garde","Renaissance","Surrealism","Kitsch","Minimalism","Avangard","Industrial"],n=class{constructor(){this.state,this.resultAnswer,this.trueAnswer,this.score}render(t){return(async()=>{const e=document.querySelector(".main-wrapper");e.innerHTML="",e.innerHTML='\n      <div class="categories-pictures-wrapper">\n        <div class="main-categories-pictures">\n          <div class="categories-pictures-title">Categories</div>\n          <div class="pictures-grid"></div>\n          <div class="categories-pictures-sidebar">\n              <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>\n              <button class="sidebar-categories sidebar-button" data-page="Pictures">Categories</button>\n          </div>\n        </div>\n      </div>',this.state=t,this.resultAnswer=t.state.resultAnswer,this.trueAnswer=t.state.trueAnswer,await this.createCategoryCard(12,10,0),this.setEventListeners(),this.setEventScore()})()}createCategoryCard(t,e,n){let a=document.querySelector(".pictures-grid"),r=0;return(async()=>{let o=await fetch("https://raw.githubusercontent.com/Lissaghu/image-data/master/images.json"),i=await o.json();for(let o of i)if(o.imageNum%e==0&&o.imageNum<t*e+n-1&&o.imageNum>=n){let t=document.createElement("div");t.classList.add("pictures-grid-item"),a.append(t);let e=document.createElement("div");e.classList.add("pictures-grid-item-wrap-title"),t.append(e);let n=document.createElement("div");n.classList.add("pictures-grid-item-title"),n.textContent=s[r],e.append(n);let i=document.createElement("div");i.classList.add("pictures-count");let c=localStorage.getItem(`${r}`);i.textContent=null==c?"":c+"/10",e.append(i);let u=document.createElement("div");u.classList.add("pictures-img-wrap"),t.append(u);let l=document.createElement("img");l.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${o.imageNum}.webp`,null!=c&&l.classList.add("pictures-img-color"),l.classList.add("pictures-img"),l.setAttribute("data-category",r),u.append(l);let d=document.createElement("button");d.textContent="Score",d.classList.add("pictures-score-button"),null!=c&&d.classList.add("pictures-score-button-open"),d.setAttribute("data-score",r),u.append(d),r++}})()}setEventListeners(){document.querySelectorAll("img").forEach((t=>{t.addEventListener("click",(()=>this.questionRender(event)))}))}questionRender(t){t.target.dataset.category&&(this.state.category=+t.target.dataset.category,this.state.currentPage=new e,this.getResultAnswer(),this.getTrueAnswer());let s=document.querySelector(".main-wrapper");s.classList.add("main-wrapper-out"),setTimeout((()=>{s.classList.remove("main-wrapper-out"),this.state.currentPage.render(this.state)}),500)}getResultAnswer(){this.resultAnswer[`${this.state.category}`]=[]}getTrueAnswer(){this.trueAnswer[`${this.state.category}`]=[]}setEventScore(){document.querySelectorAll(".pictures-score-button").forEach((t=>{t.addEventListener("click",(()=>this.scoreRender(event)))}))}scoreRender(s){s.target.dataset.score&&(this.score=+s.target.dataset.score,this.state.currentPage=new class{constructor(){this.state,this.pictures,this.score,this.question=new e}render(t,e){document.querySelector(".main-wrapper").innerHTML='\n      <div class="score-wrapper">\n          <div class="score-title button-controller" data-page="Pictures">Categories</div>\n          <div class="score-grid"></div>\n          <div class="categories-pictures-sidebar">\n              <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>\n              <button class="sidebar-categories sidebar-button button-controller" data-page="Pictures">Categories</button>\n          </div>\n      </div>',this.state=t,this.pictures=e,this.score=e.score,this.state.setEventListeners(),this.renderResult(10)}renderResult(e){let s=document.querySelector(".score-grid"),n=this.score*e,a=t.slice(n,n+10).map((t=>t.imageNum));for(let t of a){let e=document.createElement("img");e.classList.add("question-picture-img"),e.classList.add("score-img"),e.src=`https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${t}.webp`,s.append(e)}let r=localStorage.getItem(`${this.score}-result`);console.log(r)}});let n=document.querySelector(".main-wrapper");n.classList.add("main-wrapper-out"),setTimeout((()=>{n.classList.remove("main-wrapper-out"),this.state.currentPage.render(this.state,this)}),500)}},a=class{render(){const t=document.querySelector(".main-wrapper");t.innerHTML="",t.innerHTML='\n      <div class="main-page" id="main">\n        <button class="settings button-controller" data-page="Settings"></button>\n        <div class="main">\n            <img class="logo-main" src="./assets/img/logo-main.png" alt="">\n            <button class="button button-artist button-controller" data-page="Artists">Artist quiz</button>\n            <button class="button button-pictures button-controller" data-page="Pictures">Pictures quiz</button>\n        </div>\n        <div class="main-footer">\n            <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n            <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n            <div class="footer-year">2021</div>\n        </div>\n      </div>'}},r=new Map([["Settings",class{render(){const t=document.querySelector(".main-wrapper");t.innerHTML="",t.innerHTML='\n    <div class="main-settings">\n      <button class="settigs-back button-controller" data-page="Main"></button>\n      <div class="settings-name">Settings</div>\n      <div class="volume-name">Volume</div>\n      <div class="settings-volume-range">\n          <input class="volume-range" id="volume" type="range"\n      max="100" value="34" min="0" step="2">\n          <div class="button-mute"></div>\n          <div class="button-volume"></div>\n      </div>\n      <div class="time-game-name">Time game</div>\n      <div class="time-game-input">\n          <input type="checkbox">\n\n      </div>\n      <div class="time-answer">Time to answer</div>\n      <div class="time-input">\n          <button class="button-prev btn-settings">&minus;</button>\n          <div class="time-input-count">20</div>\n          <button class="button-next btn-settings">+</button>\n      </div>\n      <div class="main-settings-button">\n          <button class="button-default button button-controller" data-page="Main">Default</button>\n          <button class="button-save button button-controller" data-page="Main">Save</button>\n      </div>\n      <div class="main-footer">\n          <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>\n          <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>\n          <div class="footer-year">2021</div>\n      </div>\n    </div>'}}],["Main",a],["Pictures",n],["Artists",class{constructor(){this.pictureClass=new n}render(){const t=document.querySelector(".main-wrapper");t.innerHTML="",t.innerHTML='\n    <div class="categories-pictures-wrapper">\n    <div class="main-categories-pictures">\n      <div class="categories-pictures-title">Categories</div>\n      <div class="pictures-grid"></div>\n      <div class="categories-pictures-sidebar">\n          <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>\n          <button class="sidebar-categories sidebar-button" data-page="Artists">Categories</button>\n      </div>\n    </div>\n  </div>',this.pictureClass.createCategoryCard(12,10,119)}}]]);window.onload=()=>{document.querySelector(".preloader").classList.add("pswp__preloader__icn-hide"),(new class{constructor(t=new a,e){this.state={currentPage:t,resultAnswer:{},trueAnswer:{},category:e}}init(){this.state.currentPage.render(),this.setEventListeners()}setEventListeners(){document.querySelectorAll(".button-controller").forEach((t=>{t.addEventListener("click",(()=>this.changePage(event)))}))}changePage(t){var e;t&&(this.state.currentPage=(e=t.target.dataset.page,new(r.get(e))));let s=document.querySelector(".main-wrapper");s.classList.add("main-wrapper-out"),setTimeout((()=>{s.classList.remove("main-wrapper-out"),this.state.currentPage.render(this),this.setEventListeners()}),500)}}).init()}})();