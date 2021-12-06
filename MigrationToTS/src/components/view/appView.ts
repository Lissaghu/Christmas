import News from './news/news'
import Sources from './sources/sources'
import { ArticlesType, SourcesType, INews, ISources } from '../controller/Models'
import { IAppView } from '../controller/Models'

class AppView implements IAppView {
  private news
  private sources
  constructor() {
    this.news = new News()
    this.sources = new Sources()
  }

  drawNews(data: INews): void {
    const values: ArticlesType[] = data?.articles ? data?.articles : []
    this.news.draw(values)
  }

  drawSources(data: ISources): void {
    const values: SourcesType[] = data?.sources ? data?.sources : []
    this.sources.draw(values)
  }
}

export default AppView
