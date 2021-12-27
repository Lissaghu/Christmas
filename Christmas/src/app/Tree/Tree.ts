import './Tree.scss'
import data from '../../data'

class Tree {

  // Метод для запуска всех методов класса
  initTree(): void {
    this.choiseBackground()
    this. renderToys()
    this.choiseTree()
  }

  renderToys(): void {
    let toysContainer = document.querySelectorAll('.main__tree__settings__toys')
    let favoriteNumLocal: string[] = JSON.parse(localStorage.getItem('favorite') as string)
    let favoriteCountLocal: string[] = JSON.parse(localStorage.getItem('favoriteCount') as string)
    
    // Перебираем контейнеры для игрушек
    toysContainer.forEach((el, i): void => {
      
      // Если в избранном игрушек нет то добавляем первые 20 игрушек из data
      if (favoriteNumLocal.length === 0) {
        for (let elem of data) {
          if (+elem.num - 1 === i) {
            
            let k = 0
            // Добавляем карточки в контейнер столько раз, сколько их указано в количестве в data
            while (k < +elem.count) {
              let img = new Image()
              img.src = `../../assets/toys/${elem.num}.webp`
              img.classList.add('main__tree__settings_pic')

              el.append(img)
              if (k >= +elem.count) break
              k++
            }

            // Добавляем количество карточек в угол контейнера
            let count = document.createElement('div')
            count.classList.add('main__tree__settings_count')
            count.textContent = elem.count
            el.append(count)
          }
          
        }
      }
      // Иначе добавляем игрушки из избранного
      else {
        // Если индекс контейнера для карточки равен количеству избранных карточек
        if (i >= favoriteCountLocal.length) return

        let k = 0
         // Добавляем карточки в контейнер столько раз, сколько их указано в количестве в local
        while (k < +favoriteCountLocal[i]) {
          let img = new Image()
          img.src = `../../assets/toys/${favoriteNumLocal[i]}.webp`
          img.classList.add('main__tree__settings_pic')

          el.append(img)
          k++
        }

        let count = document.createElement('div')
        count.classList.add('main__tree__settings_count')
        count.textContent = favoriteCountLocal[i]
        el.append(count)
      }
    })
  }

  choiseBackground(): void {
    let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.main__tree__bg_img')
    let background: HTMLDivElement = document.querySelector('.main__tree__window') as HTMLDivElement

    elements.forEach(item => {
      item.addEventListener('click', () => {
        background.style.backgroundImage = `url('../../assets/bg/${item.dataset.bg}.webp')`
      })
    })
  }

  choiseTree(): void {
    let container: HTMLDivElement = document.querySelector('.main__tree__window') as HTMLDivElement
    let trees: NodeListOf<HTMLElement> = document.querySelectorAll('.main__tree__img')

    trees.forEach(item => {
      item.addEventListener('click', () => {
        let img = new Image()
        img.src = `../../assets/tree/${item.dataset.tree}.webp`

        container.innerHTML = ''
        container.append(img)
      })
    })

  }
}

export default Tree