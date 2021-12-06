import AppController from '../controller/controller'
import AppView from '../view/appView'
import { INews, ISources, DrawsNewsFunction } from '../controller/Models'

class App {
  private controller
  private view

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  start(): void {
    document
      .querySelector<HTMLDivElement>('.sources')
      ?.addEventListener('click', (e) => this.controller.getNews(e, (data: INews) => this.view.drawNews(data)))
    this.controller.getSources((data: ISources) => this.view.drawSources(data))
  }
}

export default App
