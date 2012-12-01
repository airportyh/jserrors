
function test(name, func){
    function cap(str){
        return str.substring(0, 1).toUpperCase() + str.substring(1)
    }


    function indent(str){
        var lines = str.split('\n').map(function(line){
            return '    ' + line
        })
        //lines = lines.slice(1, lines.length - 1)
        return lines.join('\n')
    }

    function stripFunc(str){
        var m = str.match(/^function ?\(\) ?\{\n([\s\S]+)\n\}$/)
        if (m){
            return m[1]
        }else{
            return str
        }
    }
    try{
        func()
        console.error(cap(name) + ': no error.')
    }catch(e){
        console.log(cap(name) + ':')
        console.log(stripFunc(func.toString()))
        console.log(e.name + ': ' + e.message + '\n ')
    }
}

test('accessing undefined variable', function(){
    foobar
})

test('dereferencing uninitialized variable', function(){
    var foobar
    foobar.baz
})

test('dereferenecing null variable', function(){
    var foobar = null
    foobar.baz
})

test('trying to call a non-function', function(){
    var foobar = 1
    foobar()
})

test('trying to call a non-existing method', function(){
    var foobar = {}
    foobar.baz()
})

test('trying to `new` a non-function', function(){
    new {}
})

test('trying to `new` eval', function(){
    new eval
})

test('syntax error', function(){
    eval('...')
})

test('eval runtime error', function(){
    eval('a.b')
})

test('invalid array length', function(){
    Array(-1)
})

test('invalid toFixed digits', function(){
    (4).toFixed(-1)
})

test('URIError', function(){
    decodeURIComponent("%")
})

