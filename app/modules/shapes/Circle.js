import Shape from 'shapes/Shape'

export default class Circle extends Shape {
  
  constructor(id, attributes, centerX, centerY, radius){
    super(id, attributes, centerX, centerY)
    
    this.type = 'circle'
    this.radius = radius
    
  }
  
}