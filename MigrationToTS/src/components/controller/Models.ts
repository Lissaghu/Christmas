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

export interface GetNews {
  status: string
  totalResults: number
  articles?: ArticlesType[]
}

export interface GetSources {
  status: string
  sources: SourcesType[]
}

type CallbackFuntion<T> = (data: T) => void
export type DrawsNewsFunction = CallbackFuntion<GetNews>

export type GetRespType = {
  endpoint: string
  options?: { [key: string]: string }
}

export interface ILoader {
  getResp: ({ endpoint, options }: GetRespType, callback: DrawsNewsFunction) => void
  errorHandler: (res: Response) => Response
  makeUrl: (options: SourcesType, endpoint: string) => string
  load: (method: string, endpoint: string, callback: DrawsNewsFunction, options: SourcesType) => void
}

export interface IAppView {
  drawNews: (data: GetNews) => void
  drawSources: (data: GetSources) => void
}

export enum Errors {
  NotFound = 404,
  Unauthorized = 401,
}

export interface INews {
  draw: (data: ArticlesType[]) => void
}

export interface ISources {
  draw: (data: SourcesType[]) => void
}

export interface IApp {
  start: () => void
}
