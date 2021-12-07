import AppLoader from './appLoader'
import { DrawsNewsFunction } from './Models'

class AppController extends AppLoader {
  getSources(callback: DrawsNewsFunction): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    )
  }

  getNews(e: MouseEvent, callback: DrawsNewsFunction): void {
    let target: HTMLElement = e.target as HTMLElement
    const newsContainer: HTMLDivElement = e.currentTarget as HTMLDivElement

    while (target !== newsContainer) {
      if (target?.classList.contains('source__item')) {
        const sourceId: string = target?.getAttribute('data-source-id') as string
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId)
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          )
        }
        return
      }
      target = target.parentNode as HTMLElement
    }
  }
}

export default AppController
