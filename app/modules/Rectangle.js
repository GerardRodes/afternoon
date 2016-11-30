import Shape from 'Shape'

export default class Line extends Shape {
  
  constructor(id, fromX, fromY, toX, toY){
    super(id, fromX, fromY)
    
    this.type = 'rectangle'
    this.coor.end = {
      x: toX,
      y: toY
    }
    
  }
  
}