export default class Control {
  
  constructor(containerSelector, canvas){
    this.container = document.querySelector(containerSelector)
    this.canvas = canvas
    this.shapes = [... document.querySelectorAll(containerSelector+' .shape')]
    this.actions = [... document.querySelectorAll(containerSelector+' .action')]
    this.state = {
      status: 'init'
    }
    
    this.bindButtons()
  }
  
  bindButtons(){
    this.shapes.forEach(shape => {
      let type = shape.getAttribute('data-shape')
      shape.addEventListener('click', () => {
        this.state.mode = type
        this.update()
      })
    })
    
    
    this.actions.forEach(action => {
      let type = action.getAttribute('data-action')
      action.addEventListener('click', () => {
        this.canvas[type]()
      })
    })
  }
  
  update(){
    this.shapes.forEach(shape => {
      this.state.mode == shape.getAttribute('data-shape') ? shape.classList.add('active') : shape.classList.remove('active')
    })
  }
  
}