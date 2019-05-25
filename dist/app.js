(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory();
	else
		root["app"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const options = {\n  displayLength: 6000,\n  inDuration: 400,\n  outDuration: 200,\n  activationPercent: 1,\n  classes: 'toast-customization'\n};\n\nconst createHtml = ({\n  message,\n  name,\n  url,\n  image\n}) => \"\\n<div style=\\\"display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;\\\">\\n  <div style=\\\"margin: 5px; padding: 5px; width: 75px;\\\">\\n    <img width=\\\"60px\\\" src=\\\"\".concat(image, \"\\\" alt=\\\"\\\" class=\\\"circle responsive\\\">\\n  </div>\\n  <div style=\\\"opacity: 1.0; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; color: white;\\\" class=\\\"vvv\\\">\\n    <div style=\\\"font-size:14px; font-weight:700; font-family:Comic Sans MS, cursive, sans-serif; display: flex; align-items: center; justify-content: center;\\\">\\n      <a style=\\\"color: white; padding: 3px; margin: 3px;\\\" href=\\\"\").concat(url, \"\\\" target=\\\"_blank\\\">\").concat(name, \"</a>\\n    </div>\\n    <div style=\\\"height: 50px; line-height: 1.2; display: flex; justify-content: center; margin-right: 3px;\\\">\\n      <span style=\\\"font-size:10px; font-weight:300; font-family:Lucida Console, Monaco, monospace; overflow: hidden; text-overflow: ellipsis;\\\">\\n        \").concat(message, \"\\n      </span>\\n    </div>\\n  </div>\\n</div>\\n\");\n\nwindow.createToast = ({\n  message,\n  name,\n  url,\n  image\n}) => M.toast({ ...options,\n  html: console.log('html: ', createHtml({\n    message,\n    name,\n    url,\n    image\n  })) || createHtml({\n    message,\n    name,\n    url,\n    image\n  })\n});\n\nconst exampleSocket = new WebSocket('ws://localhost:3000/stream?q=love');\n\nexampleSocket.onmessage = function (event) {\n  const data = JSON.parse(event.data);\n  window.createToast(data);\n};\n\n//# sourceURL=webpack://%5Bname%5D/./client/index.js?");

/***/ })

/******/ });
});