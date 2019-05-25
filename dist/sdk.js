(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sdk"] = factory();
	else
		root["sdk"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/sdk.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/sdk.js":
/*!***********************!*\
  !*** ./client/sdk.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Notificator {\n  constructor({\n    style = {\n      position: 'fixed',\n      width: '300px',\n      height: '420px',\n      right: '20px',\n      bottom: '20px'\n    },\n    search\n  } = {}) {\n    this.style = style;\n    this.search = search;\n    this.init();\n    this.isOpened = true;\n    this.toggle = this.toggle.bind(this);\n  }\n\n  toggle() {\n    this.isOpened = !this.isOpened;\n    const height = this.isOpened ? '420px' : '20px';\n    const text = this.isOpened ? '↓' : '↑';\n    this.container.style.height = height;\n    this.button.innerText = text;\n  }\n\n  init() {\n    const container = document.createElement('div');\n    Object.keys(this.style).forEach(prop => {\n      container.style[prop] = this.style[prop];\n    });\n    container.style.transition = 'height 1.5s ease-in-out';\n    const iframe = document.createElement('iframe');\n    iframe.frameBorder = '0';\n    iframe.style.width = '100%';\n    iframe.style.height = '100%';\n    iframe.src = \"http://localhost:3000?q=\".concat(this.search);\n    this.container = container;\n    this.iframe = iframe;\n    this.container.appendChild(this.iframe);\n    this.createButton();\n  }\n\n  createButton() {\n    const button = document.createElement('button');\n    button.innerText = '↓';\n    button.style.outline = 'none';\n    button.style.borderRadius = '8px';\n    button.style.width = '15px';\n    button.style.height = '15px';\n    button.style.position = 'absolute';\n    button.style.left = '3px';\n    button.style.top = '3px';\n    button.style.display = 'flex';\n    button.style.justifyContent = 'center';\n    button.style.fontSize = '10px';\n    button.style.fontWeight = '800';\n\n    button.onclick = () => this.toggle();\n\n    this.button = button;\n    this.container.appendChild(button);\n  }\n\n  render() {\n    document.body.appendChild(this.container);\n  }\n\n  terminate() {\n    document.body.removeChild(this.container);\n  }\n\n}\n\nwindow.Notificator = Notificator;\n\n//# sourceURL=webpack://%5Bname%5D/./client/sdk.js?");

/***/ })

/******/ });
});