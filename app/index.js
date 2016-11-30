import 'normalize.css'
import './reset.css'
import './main.css'
import Canvas from 'Canvas'
import Control from 'Control'

const canvas = new Canvas('main'),
      control = new Control('#controls', canvas)


console.dir(canvas)
document.getElementById('app').append(canvas.element)