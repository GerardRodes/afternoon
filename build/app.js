/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(5);

	__webpack_require__(7);

	var _Canvas = __webpack_require__(9);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	var _Control = __webpack_require__(15);

	var _Control2 = _interopRequireDefault(_Control);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = new _Canvas2.default('main'),
	    control = new _Control2.default('#controls', canvas);

	document.getElementById('app').append(canvas.element);
	console.dir(canvas);
	console.dir(control);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./reset.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js?minimize!./normalize.css", function() {
				var newContent = require("!!./../css-loader/index.js?minimize!./normalize.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}[hidden],template{display:none}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#app,body,html{width:100%;height:100%}html *{font-family:monospace}h2{font-size:1.5em;margin-bottom:10px}strong{font-weight:700}#app{position:relative;overflow:hidden}.is-canvas{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;z-index:0}#controls{background-color:rgba(0,0,0,.85);position:fixed;top:0;right:0;padding:8px 12px;box-shadow:0 0 2px #333;z-index:100}#controls .btn{background:transparent;color:#ccc;font-size:.9em;border:1px solid #555;border-radius:3px;transition:.15s;cursor:pointer}#controls .btn.active,#controls .btn:hover{background:#ccc;color:#333}#controls .btn:focus{outline:0}#controls #shapes{margin-bottom:5px}#state-status{position:fixed;bottom:0;left:0;padding:8px 12px;background-color:rgba(0,0,0,.85);box-shadow:0 0 2px #333;z-index:100;color:#ccc;font-size:.9em;letter-spacing:.05em;overflow-x:hidden;pointer-events:none}#state-status .value-wrapper{display:inline-block;width:310px;position:relative;margin-left:1rem;margin-bottom:5px}#state-status .value-wrapper .prop-value{white-space:nowrap;display:inline-block}#state-status #mousepath .value-wrapper{height:14px}#state-status #mousepath .value-wrapper .prop-value{position:absolute;height:14px;right:0;bottom:-1px}", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Line = __webpack_require__(10);

	var _Line2 = _interopRequireDefault(_Line);

	var _Free = __webpack_require__(12);

	var _Free2 = _interopRequireDefault(_Free);

	var _Circle = __webpack_require__(13);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Rectangle = __webpack_require__(14);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Canvas = function () {
	  function Canvas(id) {
	    _classCallCheck(this, Canvas);

	    this.element = this.createCanvas(id);
	    this.ctx = this.element.getContext('2d');
	    this.shapes = [];

	    this.bindEvents();
	    this.resizeCanvas();
	    this.update();
	  }

	  _createClass(Canvas, [{
	    key: 'createCanvas',
	    value: function createCanvas(id) {
	      var canvas = document.createElement('canvas');
	      canvas.setAttribute('id', id);
	      canvas.classList.add('is-canvas');
	      return canvas;
	    }
	  }, {
	    key: 'resizeCanvas',
	    value: function resizeCanvas() {
	      var data = this.ctx.getImageData(0, 0, this.element.width, this.element.height);

	      this.element.style.width = document.documentElement.clientWidth + 'px';
	      this.element.style.height = document.documentElement.clientHeight + 'px';
	      this.element.width = document.documentElement.clientWidth;
	      this.element.height = document.documentElement.clientHeight;

	      this.ctx.putImageData(data, 0, 0);
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;

	      window.addEventListener('load', function () {
	        return _this.resizeCanvas();
	      });
	      window.addEventListener('resize', function () {
	        return _this.resizeCanvas();
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(type, params) {
	      var shape = null,
	          id = this.shapes.length,
	          attributes = params.attributes ? params.attributes : {};

	      switch (type) {
	        case 'line':
	          shape = new _Line2.default(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y);
	          break;

	        case 'circle':
	          shape = new _Circle2.default(id, attributes, params.at.x, params.at.y, params.radius);
	          break;

	        case 'rectangle':
	          shape = new _Rectangle2.default(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y);
	          break;

	        case 'free':
	          shape = new _Free2.default(id, attributes, params.path);
	          break;
	      }

	      this.shapes.push(shape);
	      this.update();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this2 = this;

	      this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	      this.shapes.forEach(function (shape) {
	        switch (shape.type) {
	          case 'line':
	            _this2.ctx.beginPath();
	            _this2.ctx.moveTo(shape.coor.start.x, shape.coor.start.y);
	            _this2.ctx.lineTo(shape.coor.end.x, shape.coor.end.y);
	            _this2.ctx.stroke();
	            break;

	          case 'circle':
	            _this2.ctx.beginPath();
	            _this2.ctx.arc(shape.coor.start.x, shape.coor.start.y, shape.radius, 0, 2 * Math.PI);
	            _this2.ctx.stroke();
	            break;

	          case 'rectangle':
	            _this2.ctx.beginPath();
	            _this2.ctx.rect(shape.coor.start.x, shape.coor.start.y, shape.coor.end.x - shape.coor.start.x, shape.coor.end.y - shape.coor.start.y);
	            _this2.ctx.stroke();
	            break;

	          case 'free':
	            _this2.ctx.beginPath();
	            _this2.ctx.moveTo(shape.coor.start.x, shape.coor.start.y);
	            shape.coor.path.forEach(function (dot) {
	              _this2.ctx.lineTo(dot.x, dot.y);
	            });
	            _this2.ctx.stroke();
	            break;
	        }
	      });

	      this.shapes = this.shapes.filter(function (shape) {
	        return shape.attributes.volatile != true;
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.shapes = [];
	      this.update();
	    }
	  }]);

	  return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Line = function (_Shape) {
	  _inherits(Line, _Shape);

	  function Line(id, attributes, fromX, fromY, toX, toY) {
	    _classCallCheck(this, Line);

	    var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, id, attributes, fromX, fromY));

	    _this.type = 'line';
	    _this.coor.end = {
	      x: toX,
	      y: toY
	    };

	    return _this;
	  }

	  return Line;
	}(_Shape3.default);

	exports.default = Line;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shape = function Shape(id, attributes, x, y) {
	  _classCallCheck(this, Shape);

	  this.id = id;
	  this.attributes = attributes;
	  this.coor = {
	    start: {
	      x: x,
	      y: y
	    }
	  };
	};

	exports.default = Shape;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Free = function (_Shape) {
	  _inherits(Free, _Shape);

	  function Free(id, attributes, path) {
	    _classCallCheck(this, Free);

	    var _this = _possibleConstructorReturn(this, (Free.__proto__ || Object.getPrototypeOf(Free)).call(this, id, attributes, path[0].x, path[0].y));

	    _this.type = 'free';
	    _this.coor.path = path;
	    return _this;
	  }

	  return Free;
	}(_Shape3.default);

	exports.default = Free;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Circle = function (_Shape) {
	  _inherits(Circle, _Shape);

	  function Circle(id, attributes, centerX, centerY, radius) {
	    _classCallCheck(this, Circle);

	    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, id, attributes, centerX, centerY));

	    _this.type = 'circle';
	    _this.radius = radius;

	    return _this;
	  }

	  return Circle;
	}(_Shape3.default);

	exports.default = Circle;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rectangle = function (_Shape) {
	  _inherits(Rectangle, _Shape);

	  function Rectangle(id, attributes, fromX, fromY, toX, toY) {
	    _classCallCheck(this, Rectangle);

	    var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, id, attributes, fromX, fromY));

	    _this.type = 'rectangle';
	    _this.coor.end = {
	      x: toX,
	      y: toY
	    };

	    return _this;
	  }

	  return Rectangle;
	}(_Shape3.default);

	exports.default = Rectangle;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Control = function () {
	  function Control(containerSelector, canvas) {
	    _classCallCheck(this, Control);

	    this.container = document.querySelector(containerSelector);
	    this.canvas = canvas;
	    this.shapes = [].concat(_toConsumableArray(document.querySelectorAll(containerSelector + ' .shape')));
	    this.shapesModes = this.shapes.map(function (shape) {
	      return shape.getAttribute('data-shape');
	    });
	    this.actions = [].concat(_toConsumableArray(document.querySelectorAll(containerSelector + ' .action')));
	    this.stateContainer = document.querySelector('#state-status');
	    this.state = {};

	    this.setState('status', 'init');
	    this.bindButtons();
	    this.setState('status', 'ready');
	  }

	  _createClass(Control, [{
	    key: 'bindButtons',
	    value: function bindButtons() {
	      var _this = this;

	      this.shapes.forEach(function (shape) {
	        var type = shape.getAttribute('data-shape');
	        shape.addEventListener('click', function () {
	          _this.setState('mode', type);
	          _this.update();
	        });
	      });

	      this.actions.find(function (action) {
	        return action.getAttribute('data-action') == 'clear';
	      }).addEventListener('click', function () {
	        _this.setState('mousepath', []);
	        _this.canvas.clear();
	      });

	      this.canvas.element.addEventListener('mousedown', function (e) {
	        _this.setState('mousedown', { x: e.x, y: e.y });
	        _this.setState('mousepath', [{ x: e.x, y: e.y }]);
	        _this.setState('mouseIs', 'down');

	        if (_this.shapesModes.indexOf(_this.state.mode) > -1) {
	          _this.setState('status', 'drawing');
	        }
	      });

	      this.canvas.element.addEventListener('mouseup', function (e) {
	        _this.setState('mouseup', { x: e.x, y: e.y });
	        _this.setState('mouseIs', 'up');

	        if (_this.state.status == 'drawing') {
	          _this.askCanvasToDraw();
	          _this.setState('status', 'ready');
	        }
	      });

	      this.canvas.element.addEventListener('mousemove', function (e) {
	        _this.setState('mouse', { x: e.x, y: e.y });

	        if (_this.state.mouseIs == 'down') {
	          _this.setState('mousepath', _this.state.mousepath.concat({ x: e.x, y: e.y }));
	        }

	        if (_this.state.status == 'drawing') {
	          _this.renderPreview();
	        }
	      });
	    }
	  }, {
	    key: 'renderPreview',
	    value: function renderPreview() {
	      var overrideConfig = {};

	      switch (this.state.mode) {
	        case 'line':
	        case 'rectangle':
	          overrideConfig.to = this.state.mouse;
	          break;
	        case 'circle':
	          var radiusX = this.state.mousedown.x - this.state.mouse.x >= 0 ? this.state.mousedown.x - this.state.mouse.x : this.state.mouse.x - this.state.mousedown.x,
	              radiusY = this.state.mousedown.y - this.state.mouse.y >= 0 ? this.state.mousedown.y - this.state.mouse.y : this.state.mouse.y - this.state.mousedown.y;

	          overrideConfig.radius = radiusX >= radiusY ? radiusX : radiusY;
	          break;
	      }

	      this.askCanvasToDraw(this.fuseObjects(overrideConfig, { attributes: { volatile: true } }));
	    }
	  }, {
	    key: 'askCanvasToDraw',
	    value: function askCanvasToDraw(extraOptions) {
	      switch (this.state.mode) {
	        case 'line':
	          this.canvas.draw('line', this.fuseObjects({
	            from: this.state.mousedown,
	            to: this.state.mouseup
	          }, extraOptions));
	          break;
	        case 'rectangle':
	          this.canvas.draw('rectangle', this.fuseObjects({
	            from: this.state.mousedown,
	            to: this.state.mouseup
	          }, extraOptions));
	          break;
	        case 'circle':
	          var radius = void 0;
	          if (this.state.mouseup) {
	            var radiusX = this.state.mousedown.x - this.state.mouseup.x >= 0 ? this.state.mousedown.x - this.state.mouseup.x : this.state.mouseup.x - this.state.mousedown.x,
	                radiusY = this.state.mousedown.y - this.state.mouseup.y >= 0 ? this.state.mousedown.y - this.state.mouseup.y : this.state.mouseup.y - this.state.mousedown.y;

	            radius = radiusX >= radiusY ? radiusX : radiusY;
	          }

	          this.canvas.draw('circle', this.fuseObjects({
	            at: this.state.mousedown,
	            radius: radius
	          }, extraOptions));
	          break;
	        case 'free':
	          this.canvas.draw('free', this.fuseObjects({
	            path: this.state.mousepath
	          }, extraOptions));
	          break;
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this2 = this;

	      this.shapes.forEach(function (shape) {
	        _this2.state.mode == shape.getAttribute('data-shape') ? shape.classList.add('active') : shape.classList.remove('active');
	      });
	    }
	  }, {
	    key: 'renderState',
	    value: function renderState() {
	      for (var prop in this.state) {
	        var propDiv = document.querySelector('#' + this.stateContainer.getAttribute('id') + ' #' + prop);

	        if (propDiv == null) {
	          propDiv = document.createElement('div');
	          propDiv.setAttribute('id', prop);
	          this.stateContainer.appendChild(propDiv);
	        }

	        var value = '';
	        switch (_typeof(this.state[prop])) {
	          case 'string':
	            value = this.state[prop];
	            break;
	          case 'object':
	            value = JSON.stringify(this.state[prop]);
	            if (this.state[prop].constructor == Array) {
	              value += ' - length:' + this.state[prop].length;
	            }
	            break;
	        }

	        var newHTML = '<div class="prop-wrapper"><div>' + prop + ':</div></div><div class="value-wrapper"><span class="prop-value" >' + value + '<span></div>';

	        if (newHTML != propDiv.innerHTML) {
	          propDiv.innerHTML = newHTML;
	        }
	      }
	    }
	  }, {
	    key: 'setState',
	    value: function setState(prop, value) {
	      this.state[prop] = value;
	      this.renderState();
	    }
	  }, {
	    key: 'fuseObjects',
	    value: function fuseObjects(target, source) {
	      var newObject = {};

	      for (var prop in target) {
	        newObject[prop] = target[prop];
	      }

	      for (var _prop in source) {
	        if (newObject[_prop] !== undefined && newObject[_prop].constructor == source[_prop].constructor && newObject[_prop].constructor === Object) {
	          newObject[_prop] = this.fuseObjects(newObject[_prop], source[_prop]);
	        } else {
	          newObject[_prop] = source[_prop];
	        }
	      }

	      return newObject;
	    }
	  }]);

	  return Control;
	}();

	exports.default = Control;

/***/ }
/******/ ]);