export default class Control {
  
  constructor(containerSelector, canvas){
    this.container = document.querySelector(containerSelector)
    this.canvas = canvas
    this.shapes = [... document.querySelectorAll(containerSelector+' .shape')]
    this.shapesModes = this.shapes.map(shape => shape.getAttribute('data-shape'))
    this.actions = [... document.querySelectorAll(containerSelector+' .action')]
    this.stateContainer = document.querySelector('#state-status')
    this.state = {}
    
    this.setState('status', 'init')
    this.bindButtons()
    this.setState('status', 'ready')
  }
  
  bindButtons(){
    this.shapes.forEach(shape => {
      let type = shape.getAttribute('data-shape')
      shape.addEventListener('click', () => {
        this.setState('mode', type)
        this.update()
      })
    })
    
    
    this.actions
    .find(action => action.getAttribute('data-action') == 'clear')
    .addEventListener('click', () => {
      this.setState('mousepath', [])
      this.canvas.clear()
    })
    
    this.canvas.element
    .addEventListener('mousedown',(e) => {
      this.setState('mousedown', {x: e.x, y: e.y})
      this.setState('mousepath', [{x: e.x, y: e.y}])
      this.setState('mouseIs', 'down')
      
      if (this.shapesModes.indexOf(this.state.mode) > -1) {
        this.setState('status', 'drawing') 
      }
      
    })
    
    this.canvas.element
    .addEventListener('mouseup',(e) => {
      this.setState('mouseup', {x: e.x, y: e.y})
      this.setState('mouseIs', 'up')
      
      if (this.state.status == 'drawing') {
        this.askCanvasToDraw()
        this.setState('status', 'ready')
      }
    })
    
    this.canvas.element
    .addEventListener('mousemove',(e) => {
      this.setState('mouse', {x: e.x, y: e.y})
      
      if (this.state.mouseIs == 'down') {
        this.setState('mousepath', this.state.mousepath.concat({x: e.x, y: e.y}))
      }
      
      if (this.state.status == 'drawing') {
        this.renderPreview()
      }
      
    })
  }
  
  renderPreview(){
    let overrideConfig = {}
    
    switch (this.state.mode) {
      case 'line':
      case 'rectangle':
        overrideConfig.to = this.state.mouse
        break
      case 'circle':
        let radiusX = this.state.mousedown.x - this.state.mouse.x >= 0 ?
                      this.state.mousedown.x - this.state.mouse.x :
                      this.state.mouse.x     - this.state.mousedown.x,
            radiusY = this.state.mousedown.y - this.state.mouse.y >= 0 ?
                      this.state.mousedown.y - this.state.mouse.y :
                      this.state.mouse.y   - this.state.mousedown.y
                     
        overrideConfig.radius = radiusX >= radiusY ? radiusX : radiusY
        break
    }
    
    this.askCanvasToDraw(this.fuseObjects(overrideConfig, {attributes: {volatile: true}}))
  }
  
  askCanvasToDraw(extraOptions){
    switch(this.state.mode){
      case 'line':
        this.canvas.draw('line', this.fuseObjects({
          from: this.state.mousedown,
          to: this.state.mouseup
        }, extraOptions))
        break
      case 'rectangle':
        this.canvas.draw('rectangle', this.fuseObjects({
          from: this.state.mousedown,
          to: this.state.mouseup
        }, extraOptions))
        break
      case 'circle':
        let radius
        if (this.state.mouseup) {
        let radiusX = this.state.mousedown.x - this.state.mouseup.x >= 0 ?
                      this.state.mousedown.x - this.state.mouseup.x :
                      this.state.mouseup.x   - this.state.mousedown.x,
            radiusY = this.state.mousedown.y - this.state.mouseup.y >= 0 ?
                      this.state.mousedown.y - this.state.mouseup.y :
                      this.state.mouseup.y   - this.state.mousedown.y
                      
        radius = radiusX >= radiusY ? radiusX : radiusY
        }
                     
        this.canvas.draw('circle', this.fuseObjects({
          at: this.state.mousedown,
          radius: radius
        }, extraOptions))
        break
      case 'free':
        this.canvas.draw('free', this.fuseObjects({
          path: this.state.mousepath
        }, extraOptions))
        break
    }
  }
  
  update(){
    this.shapes.forEach(shape => {
      this.state.mode == shape.getAttribute('data-shape') ? shape.classList.add('active') : shape.classList.remove('active')
    })
  }
  
  renderState(){
    for(let prop in this.state) {
      let propDiv = document.querySelector('#'+this.stateContainer.getAttribute('id')+' #'+prop)
      
      if (propDiv == null) {
        propDiv = document.createElement('div')
        propDiv.setAttribute('id', prop)
        this.stateContainer.appendChild(propDiv)
      }
      
      let value = ''
      switch(typeof this.state[prop]){
        case 'string':
          value = this.state[prop]
          break
        case 'object':
          value = JSON.stringify(this.state[prop])
          if ((this.state[prop]).constructor == Array) {
            value += ' - length:'+this.state[prop].length
          }
          break
      }
    
      let newHTML = '<div class="prop-wrapper"><div>'+prop+':</div></div><div class="value-wrapper"><span class="prop-value" >'+value+'<span></div>'
      
      if (newHTML != propDiv.innerHTML) {
        propDiv.innerHTML = newHTML
      }
    }
  }
  
  setState(prop, value){
    this.state[prop] = value
    this.renderState()
  }
  
  fuseObjects(target, source){
    let newObject = {}
    
    for (let prop in target) {
      newObject[prop] = target[prop]
    }
    
    for (let prop in source) {
      if (
          newObject[prop] !== undefined &&
          (newObject[prop]).constructor == (source[prop]).constructor &&
          (newObject[prop]).constructor === Object
        ) {
        newObject[prop] = this.fuseObjects(newObject[prop], source[prop])
      } else {
        newObject[prop] = source[prop]
      }
    }
    
    return newObject
  }
  
}