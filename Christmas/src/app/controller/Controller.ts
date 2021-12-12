class Controller {
  state: State
  constructor() {
    this.state = {
      currentPage: 'toys'

    }
  }

  init() {
    this.render()
  }

  setEventListener() {

  }

  changePage() {

  }

  render(): void {
    let app: HTMLDivElement = document.querySelector('.app') as HTMLDivElement
    app.innerHTML = ''
    let currentPageHTML = (document.querySelector(`#${this.state.currentPage}`) as HTMLTemplateElement).content.cloneNode(true)
    app.append(currentPageHTML)
  }
}

type State = { [key: string]: string }

export default Controller