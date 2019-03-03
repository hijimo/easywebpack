#! /usr/bin/env node

let path = require('path')
let Compiler = require('../lib/Compiler.js')
//  1.找到当前执行路径， 拿到webpack.config.js

let config = require(path.resolve('webpack.config.js'))




let compiler = new Compiler(config)

compiler.hooks.entryOption.call(compiler)
// 开始执行，进入入口 解板模块
compiler.run()
