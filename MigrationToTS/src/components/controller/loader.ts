import { ILoader } from './Models'

class Loader implements ILoader {
  constructor(public baseLink: string, public options: object) {
    this.baseLink = baseLink
    this.options = options
  }

  getResp(
    { endpoint, options = {} }: GetRespType,
    callback = (): void => {
      console.error('No callback for GET response')
    }
  ): void {
    this.load('GET', endpoint, callback, options)
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`)
      throw Error(res.statusText)
    }

    return res
  }

  makeUrl(options, endpoint: string): string {
    const urlOptions = { ...this.options, ...options }
    let url = `${this.baseLink}${endpoint}?`

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`
    })

    return url.slice(0, -1)
  }

  load(method, endpoint, callback, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err))
  }
}

type GetRespType = {
  endpoint: string
  options?: object
}

export default Loader
