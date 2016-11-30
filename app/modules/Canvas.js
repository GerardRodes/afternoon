import Line from 'Line'
import Circle from 'Circle'
import Rectangle from 'Rectangle'

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
        id = this.shapes.length
    
    switch(type){
      case 'line':
        shape = new Line(id, params.from[0], params.from[1], params.to[0], params.to[1])
        break;
      
      case 'circle':
        shape = new Circle(id, params.at[0], params.at[1], params.radius)
        break;
        
      case 'rectangle':
        shape = new Rectangle(id, params.from[0], params.from[1], params.to[0], params.to[1])
        break;
    }
    
    this.shapes.push(shape)
    this.update()
  }
  
  update(){
    this.clear()
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
          this.ctx.rect(shape.coor.start.x, shape.coor.start.y, shape.coor.end.x, shape.coor.end.y)
          this.ctx.stroke()
          break
      }
    })
  }
  
  clear(){
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
  }
  
}