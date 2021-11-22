import "./Main.scss"

class Main {
  render() {
    const wrap = document.querySelector(".main-wrapper")
    wrap.innerHTML = ""
    let currentPageHTML = `
      <div class="main-page" id="main">
        <button class="settings button-controller" data-page="Settings"></button>
        <div class="main">
            <img class="logo-main" src="./assets/img/logo-main.png" alt="">
            <button class="button button-artist button-controller" data-page="Artists">Artist quiz</button>
            <button class="button button-pictures button-controller" data-page="Pictures">Pictures quiz</button>
        </div>
        <div class="main-footer">
            <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>
            <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>
            <div class="footer-year">2021</div>
        </div>
      </div>`
    wrap.innerHTML = currentPageHTML
  }
}

export default Main
