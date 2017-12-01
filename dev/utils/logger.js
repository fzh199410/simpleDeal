/**
 * 日志打印工具：
 * 配置：
 * 在window全局配置： LoggerScope 可以决定是否打印日志，打印哪些模块的日志
 * 格式：'*' 打印所有日志, 'moduleA,moduleB' 仅仅打印moduleA moduleB 的日志
 * 
 * 使用：
 * Looger('moduleA').log     
 * .info
 * .error
 * .trace
 * .dir
 * .debug
 * 
 * 注意：调用.log 其实也是调用的.trace 目的是方便查看调用栈
 * 
 */

const consoles = {};

export {getAll};
export default getLogger;

function getLogger(scope){
    if(consoles[scope]){
        return consoles[scope];
    }
    return consoles[scope] = new Console(scope);
}

function getAll(){
    return {
        ...consoles  
    };
}

const methods = ['warn', 'error', 'trace', 'info', 'debug'];

for (var i = methods.length - 1; i >= 0; i--) {
    Console.prototype[methods[i]] = makeConsoleMethod(methods[i]);
}
// log 也用trace，保证能看到调用栈
Console.prototype.log = Console.prototype.trace;

Console.prototype.printAll = function(){
    var console = window.console;
    if(!console){
        return; 
    }
    var infos = this._infos;
    for(var i = 0; i < infos.length; i++){
        var m = infos[i][0];
        console[m].call(console, infos[i][1], infos[i][2].stack);
    }
};

function Console(scope){
    this._infos = [];
    this.scope = scope;
}

function makeConsoleMethod(method){
    var console = window.console;
    return function() {
        var loggerScope = window.LoggerScope;

        // 没有配置的有需要展示的scope，就直接不做任何操作
        if(!loggerScope){
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('【' + this.scope + '】\n');
        
        // 将所有输出信息缓存下来，方便调试查看
        this._infos.push([ method, args, new Error()]);

        if(!console){
            return;
        }
		// 如果指定了错误的打印方法，则默认为trace
        if(!console[method]){
            console.warn('CONSOLE：您填写的%s控制台方法不被支持已被调整为：console.trace', method);
            method = 'trace';
            return;
        }
	   // 检测 this.scope 是否在 允许显示的 scope 列表中
      	if(loggerScope && (loggerScope === '*' || loggerScope.indexOf(this.scope) > -1)){
            console[method].apply(console, args);
        }
    };
}