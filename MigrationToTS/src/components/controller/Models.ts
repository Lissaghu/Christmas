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
  sources: SourcesType[]
}

type CallbackFuntion<T> = (data: T) => void
export type DrawsNewsFunction = CallbackFuntion<INews>

export type GetRespType = {
  endpoint: string
  options: { [key: string]: string }
}

export interface ILoader {
  getResp: ({ endpoint, options }: GetRespType, callback: DrawsNewsFunction) => void
  errorHandler: (res: Response) => Response
  makeUrl: (options: SourcesType, endpoint: string) => string
  load: (method: string, endpoint: string, callback: DrawsNewsFunction, options: SourcesType) => void
}

export interface IAppView {
  drawNews: (data: INews) => void
  drawSources: (data: ISources) => void
}
