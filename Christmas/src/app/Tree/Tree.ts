import './Tree.scss'
import data from '../../data'
import { canvasSnow } from '../models/particlesOptions'
import { ITree } from '../models/Models'

class Tree implements ITree {
  // Метод для запуска всех методов класса
  initTree(): void {
    if (!localStorage.getItem('favoriteCount')) {
      localStorage.setItem('favoriteCount', JSON.stringify([]))
      localStorage.setItem('favorite', JSON.stringify([])) 
    } 
    this.choiseBackground()
    this. renderToys()
    this.choiseTree()
    this.musicControl()
    this.snowControl()
    this.dragAndDropToysOnTheTree()
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
            // Добавляем игрушки в контейнер столько раз, сколько их указано в количестве в data
            while (k < +elem.count) {
              let img = new Image()
              img.src = `../../assets/toys/${elem.num}.webp`
              img.classList.add('main__tree__settings_pic')
              img.setAttribute('draggable', 'true')
              img.setAttribute('data-num', `${elem.num}`)
              img.setAttribute('index', `${i}`)

              el.append(img)
              if (k >= +elem.count) break
              k++
            }

            // Добавляем количество карточек в угол контейнера
            let count = document.createElement('div')
            count.classList.add('main__tree__settings_count')
            count.textContent = `${el.childNodes.length}`
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
          img.setAttribute('draggable', 'true')
          img.setAttribute('data-num', `${favoriteNumLocal[i]}`)
          img.setAttribute('index', `${i}`)

          el.append(img)
          k++
        }

        let count = document.createElement('div')
        count.classList.add('main__tree__settings_count')
        count.textContent = `${el.childNodes.length}`
        el.append(count)
      }
    })
  }

  choiseBackground(): void {
    let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.main__tree__bg_img')
    let background = document.querySelector('.main__tree__window') as HTMLDivElement

    elements.forEach(item => {
      item.addEventListener('click', () => {
        background.style.backgroundImage = `url('../../assets/bg/${item.dataset.bg}.webp')`
      })
    })
  }

  choiseTree(): void {
    let container = document.querySelector('.main__tree__window') as HTMLDivElement
    let trees: NodeListOf<HTMLElement> = document.querySelectorAll('.main__tree__img')

    // При клике по нужной ёлке создаём нужную картинку и нужные map и area
    trees.forEach(item => {
      item.addEventListener('click', () => {
        let img = new Image()
        img.src = `../../assets/tree/${item.dataset.tree}.webp`
        img.setAttribute('usemap', '#Tree')

        let defaltTree = document.querySelector('.main__tree__window img')

        defaltTree?.remove()
        container.append(img)

        this.dragAndDropToysOnTheTree()
      })
    })
  }

  musicControl(): void {
    let buttonMusic = document.querySelector('.main__tree__sound')
    let music = new Audio('../../assets/audio/audio.mp3')

    buttonMusic?.addEventListener('click', () => {
      music.paused ? music.play() : music.pause()
    })
  }

  snowControl(): void {
    let buttonSnow = document.querySelector('.main__tree__snow')
    
    buttonSnow?.addEventListener('click', () => {
      let canvas = document.querySelector('.tsparticles-canvas-el') as HTMLElement
      
      // Если снег идёт, то при клике удаляем, иначе создаём
      if (canvas) {
        canvas.remove()
      } 
      else {
        canvasSnow()
        let canvas = document.querySelector('.tsparticles-canvas-el') as HTMLElement
        canvas.style.position = 'absolute'
      }
    })
  }

  dragAndDropToysOnTheTree(): void {
    let toys: NodeListOf<HTMLElement> = document.querySelectorAll('.main__tree__settings_pic')
    let treeMap = document.querySelector('.area')

    treeMap?.addEventListener('dragover', (e) => e.preventDefault())

    // Координаты сброса игрушки на ёлку изначально
    let defoltX = 0
    let defoltY = 0

    toys.forEach(toy => {
      // toy.addEventListener('dragover', (e) => e.preventDefault())
      toy.addEventListener('dragstart', () => {})
      toy.addEventListener('dragend', (e) => {
        // Изменяем количество игрушек в ячейке
        let countElem = document.querySelectorAll('.main__tree__settings_count')
        let children = toy.parentElement?.childNodes as NodeListOf<HTMLElement>
        
        let arr: HTMLElement[] = []
        let index: number = +(toy.getAttribute('index') as string) 
        children?.forEach(child => {
          if (child.classList.contains('main__tree__settings_pic')) {
            arr.push(child)
          }
        })       
        
        // При сбросе игрушки мы отслеживаем элементы, находящиеся под ней
        toy.hidden = true
        let currentElem = document.elementFromPoint(e.clientX, e.clientY)
        toy.hidden = false
        
        // Если элемент под игрушкой ёлка, то мы удаляем игрушку и создаём новую
        // отправляя её в те координаты, где скинули начальную игрушку
        if (currentElem?.closest('.area')) {
          // Если игрушку сбросили над ёлкой, то уменьшаем количество на единицу
          countElem[index].textContent = `${arr.length - 1}`          
          
          defoltX = e.clientX
          defoltY = e.clientY

          let mainBody = document.querySelector('.main__tree') as HTMLDivElement
          let toyIndex: number = +(toy.getAttribute('index') as string)
          let toyNum = toy.getAttribute('data-num')

          let img = new Image()
          img.src = `../../assets/toys/${toy.getAttribute('data-num')}.webp`
          img.classList.add('new_toy_window')
          img.style.top = `${defoltY - 30}px`
          img.style.left = `${defoltX - 30}px`
          img.setAttribute('draggable', 'true')
          img.setAttribute('index', `${toyIndex}`)
          img.setAttribute('data-num', `${toyNum}`)

          toy.remove()
          mainBody.append(img)

          this.dragAndDropToysInCell()
        } else {
          // Если игрушку сбросили вне ёлки, то не изменяем количество
          countElem[index].textContent = `${arr.length}`
          return
        }
        
      })
    })
  }

  dragAndDropToysInCell(): void {
    let toysContainer = document.querySelectorAll('.main__tree__settings__toys')
    let toys: NodeListOf<HTMLElement> = document.querySelectorAll('.new_toy_window')
    
    toys.forEach(toy => {
      // toy.addEventListener('dragover', (e) => e.preventDefault())
      toy.addEventListener('dragstart', () => {})
      toy.addEventListener('dragend', (e) => {
        // При сбросе игрушки мы отслеживаем элементы, находящиеся под ней
        toy.hidden = true
        let currentElem = document.elementFromPoint(e.clientX, e.clientY)
        toy.hidden = false

        let toyIndex: number = +(toy.getAttribute('index') as string)
        
        // Если игрушка в пределах зоны, то разрешается двигать её
        if (currentElem?.closest('.area')) {
          toy.style.left = `${(e.clientX - 30)}px`
          toy.style.top = `${(e.clientY - 30)}px`
        } 
        // Иначе мы удаляем игрушку и создаём новую добавляя её в соответствующую ячейку
        else {
          toy.classList.remove('new_toy_window')
          toy.classList.add('main__tree__settings_pic')
          toy.removeAttribute('style')
          toysContainer[toyIndex].append(toy)

          let countElem = document.querySelectorAll('.main__tree__settings_count')
          let children = toy.parentElement?.childNodes as NodeListOf<HTMLElement>

          let arr: HTMLElement[] = []
          let index: number = +(toy.getAttribute('index') as string) 
          
          children?.forEach(child => {
            if (child.classList.contains('main__tree__settings_pic')) {
              arr.push(child)
            }
          })
          countElem[index].textContent = `${arr.length}`
          
          this.dragAndDropToysOnTheTree()
        }
      })
    })
  }
}

export default Tree
