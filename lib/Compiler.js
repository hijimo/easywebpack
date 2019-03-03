let path = require('path')
let fs = require('fs')
let babylon = require('babylon')
let traverse = require('@babel/traverse').default
let babelTyeps = require('@babel/types')
let generator = require('@babel/generator').default
let { SyncHook } = require('tapable')
let ejs = require('ejs')


// babylon 主要把源码转ast
// @babel/traverse 节点遍历
// @babel/types 节点替换
// @babel/generator 生成新代码。
class Compiler{
    constructor(config) {
        this.config = config
        // 保存入口文件
        this.entryId ;
        // 保存所有的模块依赖
        this.modules = {}
        // 工作路径
        this.root = process.cwd()
        this.entry = config.entry
        this.initHooks()
        this.progressPlugins()
    }

    
    buildModule(modulePath, isEntry) {
        // 读取模块内容
        let source = this.getSource(modulePath)
        // 构建模块Id
        let moduleName = './' + path.relative(this.root, modulePath)

        if (isEntry) {
            this.entryId = moduleName
        }
        // 对源代码进行改造，并返回依赖列表。
        let {sourceCode, deps} = this.parse(source, path.dirname(moduleName))
        
        this.modules[moduleName] = sourceCode
        // 递归加载依赖模块。
        deps.forEach((dep) => {
            this.buildModule(path.join(this.root, dep), false)
        })
        
    }
    
    emitFile() {
        // 渲染模版并生成文件。
        let { output } = this.config
        let main = path.join(output.path, output.filename)
        let tpl = this.getSource('./src/tpl.ejs')


        let code = ejs.render(tpl, {
            entryId: this.entryId,
            modules: this.modules,
        })
        this.assets = {}
        this.assets[main] = code;
        fs.writeFileSync(main, code)
    }
    getSource(path) {
        let content = fs.readFileSync(path, 'utf8')
        // return content
        return this.progressLoaders(path, content)
    }
    initHooks() {
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        }
    }
    progressPlugins() {
        // 处理插件
        let { plugins } = this.config
        if (Array.isArray(plugins)) {

            plugins.forEach((plugin) => {
                plugin.apply(this)
            })
            this.hooks.afterPlugins.call(this)
        }
    }
    progressLoaders(modulePath, content){
        let rules = this.config.module.rules
        
        

        rules.forEach((rule) => {
            const { test:match, use} = rule
            let len = use.length - 1
            
            function normalLoader() {
                let p = use[len]
                let moduleName = p.loader ? p.loader : p
                let loader = require(moduleName) 
                content = loader(content)
                
            }

            if (match.test(modulePath)) {
                
                do {
                    normalLoader()    
                    len--
                    
                } while (len >= 0)
                
            }
        })
        
        return content
    }
    parse(source, parentPath) {// Ast 语法解析
        // 将源代码解析成 ast语法树
        let deps = []
        let ast = babylon.parse(source)
        // 遍历ast节点
        traverse(ast, {
            CallExpression(p) {
                let node = p.node
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    // 构建新的模块路径(模块名)
                    
                    let moduleName = node.arguments[0].value
                    // 这里作了简化处理，可能引用的还有其他模块 。
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js') // ./a.js
                    moduleName = './' + path.join(parentPath, moduleName) // ./src/a.js
                    deps.push(moduleName)
                    // 替换node arguments 的值
                    node.arguments = [babelTyeps.stringLiteral(moduleName)]
                    
                }
            }
        })
        let sourceCode = generator(ast).code
        return { sourceCode, deps}
    }
    run() {
        // 执行并创建模块的依赖关系
        this.hooks.run.call(this)
        this.hooks.compile.call(this)
        this.buildModule(path.resolve(this.root, this.entry), true)
        this.hooks.afterCompile.call(this)
        // 发射 打包后的文件。
        this.emitFile()
        this.hooks.emit.call(this)
        this.hooks.done.call(this)
    }
    
}

module.exports = Compiler