import Loader from "./loader"

class AppLoader extends Loader {
  constructor() {
    super("https://newsapi.org/v2/", {
      apiKey: "996feb5c4e8d44a0b5972ea7a1aac080",
    })
  }
}

export default AppLoader
