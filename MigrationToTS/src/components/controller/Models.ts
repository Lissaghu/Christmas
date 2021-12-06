/* eslint-disable prettier/prettier */
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

export interface INews {
  status: string
  totalResults: number
  articles?: ArticlesType[]
}

export interface ISources {
  status: string
  sources?: SourcesType[]
}

type CallbackFuntion<T> = (data: T) => void
export type DrawsNewsFunction = CallbackFuntion<INews>

export interface ILoader {
  getResp: () => void
  errorHandler: (res: Response) => Response
  makeUrl: () => string
  load: () => void
}

export interface IAppView {
  drawNews: (data: INews) => void
  drawSources: (data: ISources) => void
}
