import './reset.css'
import 'normalize.css'
import './main.css'
import Canvas from 'modules/Canvas'
import Control from 'modules/Control'

const canvas = new Canvas('main'),
      control = new Control('#controls', canvas)


document.getElementById('app').append(canvas.element)
console.dir(canvas)
console.dir(control)