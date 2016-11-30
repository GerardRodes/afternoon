import Shape from 'Shape'

export default class Circle extends Shape {
  
  constructor(id, centerX, centerY, radius){
    super(id, centerX, centerY)
    
    this.type = 'circle'
    this.radius = radius
    
  }
  
}