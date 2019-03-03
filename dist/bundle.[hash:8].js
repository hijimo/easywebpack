(function(modules) {
    var installedModules = {};
  
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      });
  
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
  
      module.l = true;
  
      return module.exports;
    }
    __webpack_require__.d = function(exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, { enumerable: true, get: getter });
      }
    };
    __webpack_require__.r = function(exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
    __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    return __webpack_require__((__webpack_require__.s = "./src/index.js"));
  })({
    
    "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval(
        `// import Person from './modules/person'
// let p = new Person()
// p.info()
// import { printInfo } from './modules/a'
// let  printInfo  = require('./modules/a')
let q = __webpack_require__("./src/index.less");

let Person = __webpack_require__("./src/modules/person.js");

let p = new Person();
p.info(); // printInfo()`
      );
    },
    
    "./src/index.less": function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval(
        `let style = document.createElement('style');
style.innerHTML = "body {\\n  color: #f00;\\n}\\nbody #app {\\n  width: 100px;\\n  height: 100px;\\n  border: solid 1px;\\n}\\n";
document.head.appendChild(style);`
      );
    },
    
    "./src/modules/person.js": function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval(
        `// import { printInfo } from './a'
let printInfo = __webpack_require__("./src/modules/a.js");

class Person {
  // age = 18
  constructor() {// console.lo(' ho ho ho')
  }

  info() {
    printInfo();
  }

}

module.exports = Person;`
      );
    },
    
    "./src/modules/a.js": function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval(
        `module.exports = function printInfo() {
  console.log('a.js');
};`
      );
    },
    
  
  });
  