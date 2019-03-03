let babel = require('@babel/core')
let loaderUtils = require('loader-utils')

function loader (source) {
    // console.log(source)
    let options = loaderUtils.getOptions(this)
    // 将该Loader设置成异步loader
    // 异步Loader只能通过cb(err, source) 返回结果。
    let cb = this.async()
    
    babel.transform(source, {
        ...options,
        sourceMap: true
    }, function(err, result) {
        console.log(result.code)
        cb(err, result.code, result.map)
    })

    // return source
}

module.exports = loader