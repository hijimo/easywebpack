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
      '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/a */ "./src/modules/a.js");\n// import Person from \'./modules/person\'\n\n// let p = new Person()\n// p.info()\n\n\nObject(_modules_a__WEBPACK_IMPORTED_MODULE_0__["printInfo"])()\n\n//# sourceURL=webpack:///./src/index.js?'
    );
  },

  "./src/modules/a.js": function(
    module,
    __webpack_exports__,
    __webpack_require__
  ) {
    "use strict";
    eval(
      "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"printInfo\", function() { return printInfo; });\nfunction printInfo() {\n    console.log('a.js')\n}\n\n//# sourceURL=webpack:///./src/modules/a.js?"
    );
  }
});
