let less = require('less')

function loader (source) {
    let css = ''
    
    less.render(source, function(err, result) {
        if (!err) {
            css = result.css
        } else {
            console.log(err)
        }
    })
    
    css = css.replace(/\n/g ,'\\n')
    return css
}

module.exports = loader