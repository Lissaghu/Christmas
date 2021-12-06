import AppLoader from './appLoader'
import { INews } from '../app/app'
import { ISources } from '../app/app'

class AppController extends AppLoader {
  getSources(callback: Function) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    )
  }

  getNews(e: MouseEvent, callback): void {
    let { target } = e
    const newsContainer = e.currentTarget

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id')
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
      target = target.parentNode
    }
  }
}

export default AppController