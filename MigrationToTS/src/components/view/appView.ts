import News from './news/news'
import Sources from './sources/sources'
import { ArticlesType, SourcesType, GetNews, GetSources, IAppView } from '../controller/Models'

class AppView implements IAppView {
  private news
  private sources
  constructor() {
    this.news = new News()
    this.sources = new Sources()
  }

  drawNews(data: Partial<GetNews>): void {
    const values: ArticlesType[] = data?.articles ? data?.articles : []
    this.news.draw(values)
  }

  drawSources(data: Partial<GetSources>): void {
    const values: SourcesType[] = data?.sources ? data?.sources : []
    this.sources.draw(values)
  }
}

export default AppView
