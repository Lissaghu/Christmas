import AppController from '../controller/controller'
import { AppView } from '../view/appView'

class App {
  private controller
  private view

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  start(): void {
    ;(document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
      this.controller.getNews(e, (data: INews) => this.view.drawNews(data))
    )
    this.controller.getSources((data: ISources) => this.view.drawSources(data))
  }
}

export type ArticlesType = {
  author: string
  content: string
  description: string
  publishedAt: string
  source: {
    id: string
    name: string
  }
  title: string
  url: string
  urlToImage: string
}

export type SourcesType = { [key: string]: string }

// export type SourcesType = {
//   id: string
//   name: string
//   description: string
//   url: string
//   category: string
//   language: string
//   country: string
// }

export interface INews {
  status: string
  totalResults: number
  articles?: ArticlesType[]
}

export interface ISources {
  status: string
  sources?: SourcesType[]
}

export default App
