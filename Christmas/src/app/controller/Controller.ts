import { IController } from "../models/Models"
import Toys from "../toys/Toys"


class Controller implements IController {
  
  private state: {[key: string]: string | undefined}
  private toys

  constructor() {
    this.toys = new Toys()
    this.state = {
      currentPage: 'main'

    }
  }

  init() {
    this.render()
    this.setEventListener()
    
  }

  setEventListener(): void {
    document.querySelectorAll('.button_controller').forEach(item => {
      item.addEventListener('click', () => this.changePage(event))
    })
  }

  changePage(event: Event | undefined): void {
    this.state.currentPage = (event?.target as HTMLElement).dataset.page
    this.render()
    this.setEventListener()
    
    if (this.state.currentPage === 'toys') {
      this.toys.initToys(this)
    }
  }

  render(): void {
    let app: HTMLDivElement = document.querySelector('.app') as HTMLDivElement
    app.innerHTML = ''
    let currentPageHTML = (document.querySelector(`#${this.state.currentPage}`) as HTMLTemplateElement).content.cloneNode(true)
    app.append(currentPageHTML)
  }
}

export default Controller