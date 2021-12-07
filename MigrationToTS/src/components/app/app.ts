import AppController from '../controller/controller'
import AppView from '../view/appView'
import { GetNews, GetSources, IApp } from '../controller/Models'

class App implements IApp {
  private controller
  private view

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  start(): void {
    document
      .querySelector<HTMLDivElement>('.sources')
      ?.addEventListener('click', (e) =>
        this.controller.getNews(e, (data: Partial<GetNews>) => this.view.drawNews(data))
      )
    this.controller.getSources((data: Partial<GetSources>) => this.view.drawSources(data))
  }
}

export default App
