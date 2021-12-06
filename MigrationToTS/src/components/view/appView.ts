import News from './news/news'
import Sources from './sources/sources'
import { INews } from '../app/app'
import { ISources } from '../app/app'

export class AppView {
  private news
  private sources
  constructor() {
    this.news = new News()
    this.sources = new Sources()
  }

  drawNews(data: INews): void {
    const values = data?.articles ? data?.articles : []
    this.news.draw(values)
  }

  drawSources(data: ISources): void {
    const values = data?.sources ? data?.sources : []
    this.sources.draw(values)
  }
}

export default AppView
