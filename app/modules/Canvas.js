import Line from 'shapes/Line'
import Free from 'shapes/Free'
import Circle from 'shapes/Circle'
import Rectangle from 'shapes/Rectangle'

export default class Canvas {
  
  constructor(id) {
    this.element = this.createCanvas(id)
    this.ctx = this.element.getContext('2d')
    this.shapes = []
    
    this.bindEvents()
    this.resizeCanvas()
    this.update()
  }

  createCanvas(id){
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', id)
    canvas.classList.add('is-canvas')
    return canvas
  }
  
  resizeCanvas(){
    const data = this.ctx.getImageData(0, 0, this.element.width, this.element.height)
    
    this.element.style.width  = document.documentElement.clientWidth+'px'
    this.element.style.height = document.documentElement.clientHeight+'px'
    this.element.width  = document.documentElement.clientWidth
    this.element.height = document.documentElement.clientHeight
    
    this.ctx.putImageData(data, 0, 0)
  }
  
  bindEvents(){
    window.addEventListener('load', () => this.resizeCanvas())
    window.addEventListener('resize', () => this.resizeCanvas())
  }
  
  draw(type, params){
    let shape = null,
        id = this.shapes.length,
        attributes = params.attributes ? params.attributes : {}
  
    switch(type){
      case 'line':
        shape = new Line(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y)
        break
      
      case 'circle':
        shape = new Circle(id, attributes, params.at.x, params.at.y, params.radius)
        break
        
      case 'rectangle':
        shape = new Rectangle(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y)
        break
      
      case 'free':
        shape = new Free(id, attributes, params.path)
        break
    }
    
    this.shapes.push(shape)
    this.update()
  }
  
  update(){
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    this.shapes.forEach((shape) => {
      switch(shape.type){
        case 'line':
          this.ctx.beginPath()
          this.ctx.moveTo(shape.coor.start.x, shape.coor.start.y)
          this.ctx.lineTo(shape.coor.end.x, shape.coor.end.y)
          this.ctx.stroke()
          break
        
        case 'circle':
          this.ctx.beginPath()
          this.ctx.arc(shape.coor.start.x, shape.coor.start.y, shape.radius, 0, 2*Math.PI)
          this.ctx.stroke()
          break
          
        case 'rectangle':
          this.ctx.beginPath()
          this.ctx.rect(shape.coor.start.x, shape.coor.start.y, shape.coor.end.x - shape.coor.start.x, shape.coor.end.y - shape.coor.start.y)
          this.ctx.stroke()
          break
          
        case 'free':
          this.ctx.beginPath()
          this.ctx.moveTo(shape.coor.start.x, shape.coor.start.y)
          shape.coor.path.forEach(dot => {
            this.ctx.lineTo(dot.x, dot.y)
          })
          this.ctx.stroke()
          break
      }
    })
    
    this.shapes = this.shapes.filter(shape => shape.attributes.volatile != true)
  }
  
  clear(){
    this.shapes = []
    this.update()
  }
  
}