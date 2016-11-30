import Shape from 'Shape'

export default class Line extends Shape {
  
  constructor(id, fromX, fromY, toX, toY){
    super(id, fromX, fromY)
    
    this.type = 'line'
    this.coor.end = {
      x: toX,
      y: toY
    }
    
  }
  
}