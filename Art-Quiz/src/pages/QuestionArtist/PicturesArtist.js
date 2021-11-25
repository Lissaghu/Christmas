import { imageData } from "../QuestionPictres/QuestionPictures"

class PicturesArtist {
  constructor() {
    this.state
  }

  createImage(num, state) {
    let event = async () => {
      this.state = state //  присваиваем объект Controller

      let oneItemArray = 0 //  выводим авторов из массива начиная с первого элемента

      let imgContainer = document.querySelectorAll(".question-artist-img")

      let start = this.state.state.category * 10 // определяем начало интервала категории в json файле

      //  получаем массив с нужными нам объектами
      let currentImage = imageData.slice(start).map((item) => {
        return item.imageNum
      })

      //  получаем массив только изображений
      let allImages = imageData.map((item) => item.imageNum)

      //  функция рандома
      let random = (max) => Math.floor(Math.random() * max)

      //  создаём 4 рандомных изображения и присваиваем им соответствующий src
      imgContainer.forEach((item) => {
        let img = document.createElement("img")
        img.classList.add("question-picture-img")
        img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${
          allImages[random(240)]
        }.webp`
        item.append(img)
      })

      //  создаём изображение с правильным атрибутом
      let trueImg = document.createElement("img")
      trueImg.classList.add("question-picture-img")
      trueImg.setAttribute("data-id", oneItemArray)
      trueImg.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${currentImage[oneItemArray]}.webp`

      let trueImgContainer = imgContainer[random(4)]
      trueImgContainer.innerHTML = ""
      trueImgContainer.append(trueImg)

      //  получаем контейнер кнопки Next и саму кнопку
      let buttonNextWrap = document.querySelector(".button-next-wrap")
      let buttonNext = document.querySelector(".button-modal-next")

      //  вешаем лиснер на кнопку Next
      buttonNext.addEventListener("click", () => {
        let imgWrap = document.querySelectorAll(".question-artist-img")
        imgWrap.forEach((item) => {
          item.innerHTML = ""
        })

        //  удаляем у контейнера кнопки Next класс open
        buttonNextWrap.classList.remove("button-next-wrap-open")
        //  получаем все изображения
        let imgContainer = document.querySelectorAll(".question-artist-img")

        //  создаём 4 рандомных изображения и присваиваем им соответствующий src
        imgContainer.forEach((item) => {
          let img = document.createElement("img")
          img.classList.add("question-picture-img")
          img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${
            allImages[random(240)]
          }.webp`
          item.append(img)
        })

        //  создаём изображение с правильным атрибутом
        let trueImg = document.createElement("img")
        trueImg.classList.add("question-picture-img")
        trueImg.setAttribute("data-id", oneItemArray + 1)
        trueImg.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${
          currentImage[oneItemArray + 1]
        }.webp`

        let trueImgContainer = imgContainer[random(4)]
        trueImgContainer.innerHTML = ""
        trueImgContainer.append(trueImg)

        if (oneItemArray != num) oneItemArray++ // отображаем следующие 4 изображения
      })
    }
    return event()
  }
}

export default PicturesArtist
