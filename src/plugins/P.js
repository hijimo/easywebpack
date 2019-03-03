class P{
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function() {
            console.log('emit')
        })
    }
}

module.exports = P