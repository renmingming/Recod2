# Recod2
设计模型记录

## 综合案例-src目录-demo

## 五大设计原则SOLID

  S、单一职责原则：一个类只提供一种功能
  
  O:开放封闭原则:对扩展开放，对修改封闭，增加需求，扩展代码，而非修改就代码
  
  L:李氏置换原则：子类能覆盖父类，父类能出现的地方，子类也能出现
  
  I:接口独立原则：保持接口的单一独立
  
  D:依赖倒置原则：//面向接口编程，依赖于抽象而不依赖具体
　　　　　　　　//使用方只关注接口而不关注具体类的实现

## 设计模式

1、工程模式:

    根据不同的参数产生不同的实例，这些实例有一些共性，使用者只需要使用调用产品，不需要知道产品的创建细节
  
优点： 

    工厂类集中了所有对象的创建，便于对象创建的统一管理

    对象的使用者仅仅是使用产品，实现了单一职责

    便于扩展，如新增一种业务，只需增加相关业务对象类和工厂类中的生产业务对象的方法，不需要修改其他地方

实例：

  ```
  class JQuery{
      constructor(seletor) {
          let slice = Array.prototype.slice
          let dom = slice.call(document.querySelectorAll(seletor))
          console.log(document.querySelectorAll(seletor))
          let len = dom ? dom.length : 0
          for(let i = 0; i < len; i++) {
              this[i] = dom[i]
          }
          this.length = len
          this.seletor = seletor || ''
      }
      append(node) {

      }
      addClass(name) {

      }
      html(data) {

      }
  }

  window.$ = function(selector) {
      // 工程模式
      return new JQuery(selector)
  }
  var $p = $('p');
  console.log($p);
  console.log($p.addClass)
  ```

2、单例模式:vuex中的store-state就是
  
    生产单例的类必须保证只有一个实例存在
    购物车场景
实例：

  ```
  class LoginForm {
      constructor() {
          this.state = 'hide'
      }
      show() {
          if(this.state === 'show') {
              alert('已经提示')
              return;
          }
          this.state = 'show';
          console.log('登录框显示成功')
      }
      hide() {
          if(this.state === 'hide') {
              alert('已经隐藏')
              return;
          }
          this.state = 'hide';
          console.log('登录框隐藏成功')
      }
  }
  // 静态方法
  LoginForm.getInstance = (function() {
      let instance;
      return function() {
      // 如果已经存在，return存在的，否则new
          if(!instance) {
              instance = new LoginForm()
          }
          return instance
      }
  })()

  let login1 = LoginForm.getInstance();
  login1.show()

  let login2 = LoginForm.getInstance();
  login2.hide()

  login1 === login2 true
  ```
  
3、适配器模式
    提供一个不同的接口
  
经典案例：封装就接口ajax；vue的computed
  ```
  // 自己封装的ajax，新需要的格式
  ajax({
      url: '/getData',
      type: 'POST',
      dataType: 'json',
      data: {
          id: '123'
      }
  })
  // 旧代码全都是一下这种
    $.ajax({})
  // 避免手动全部替换，做一层适配器
    var $ = {
        ajax: function(options) {
            return ajax(options)
        }
    }
  ```
4、装饰器模式
    · 为对象添加新功能
    · 不改变其原有的结构和功能
  第三方装饰类：core-decorators
  es7 中的 decorator需要babel插件：babel-plugin-transform-decorators-legacy
```
//原理
@decorator
class A{}
//等同于
class A{}
A = decorator(A) || A;

// 参数形式
function testDec(isDec) {
    // 装饰器是一个函数
    return function (target) {
        target.isDec =isDec
    }
}
@testDec(false)
class Demo {}
alert(Demo.isDec)

//mixins混合模式
function minxins (...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}
const Foo = {
    foo() {
        alert('foo')
    }
}
@minxins(Foo)
class MyClass {
}
let obj = new MyClass()
obj.foo()

// 类方法装饰器只读
function  readonly(target, name, descriptor) {
    // descriptor {
    //     value: specifiedFunction, // 属性值
    //     enumerable: false, // 是否可枚举
    //     configurable: true, // 是否可配置
    //     writable: true // 是否可写
    // }
    descriptor.writable = false // 关闭写
    return descriptor;
}
class Person {
    constructor() {
        this.first = 'A'
        this.last = 'B'
    }
    // 不能对name重新修改
    @readonly
    name() {
        return `${this.first}: ${this.last}`
    }
}

let p = new Person()
console.log(p.name())

// 类方法装饰 ：log
function log(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function () {
        console.log(`calling ${name} width`,arguments)
        return oldValue.apply(this, arguments)
    }
    return descriptor
}

class Math {
    @log
    add(a,b) {
        return a+b
    }
}

let math = new Math()
const result = math.add(1,2)
// 先打印log在输出值
console.log(result)
```

5、代理模式
    提供一模一样的接口
$.proxy()

```
$('.btn').click(function(){
  var fn = function(){
    $(this).css('color','#fff');
  }
  fn = $.proxy(fn,this);
  setTimeout(fn,1000)
})
```
ES6 Proxy
```
// 明星
let star = {
    name: 'mign',
    age: 25,
    phone: '13111123123'
}

// 经纪人
let agent = new Proxy(star, {
    get: function(target, key) {
        if(key === 'phone') {
            // 返回经纪人自己的电话
            return '12342323242'
        }
        if(key === 'price') {
            //经纪人报价
            return 120000
        }
        return target[key]
    },
    set: function(target, key, val) {
        if(key === 'customPrice') {
            if(val < 100000) {
                throw new Error('价格太低')
            }else{
                target[key] = val
                return true
            }
        }
    }
})

console.log(agent.name)
console.log(agent.age)
console.info(agent.phone)
console.log(agent.price)
agent.customPrice = 90000;
console.log('customPrice:'+agent.customPrice)
```

6、外观模式

    为子系统中的一组接口提供了一个高层接口
    
    使用者使用这个高层接口

7、观察者模式：发布和订阅，一对n
    
    主题和观察者分离，被动监听

```
  // 观察者模式
  // 主题，保存状态，状态变化之后触发所有观察者模式
  class Subject {
      constructor() {
          this.state = 0
          this.observers = []
      }
      getState() {
          return this.state
      }
      setState(state) {
          this.state = state
          this.notifyAllObservers()
      }
      notifyAllObservers() {
          this.observers.forEach(observer => {
              observer.update()
          })
      }
      attach(observer) {
          this.observers.push(observer)
      }
  }
  // 观察者
  class Observer{
      constructor(name, subject) {
          this.name = name
          this.subject = subject
          this.subject.attach(this)
      }
      update() {
          console.log(`${this.name} update, state: ${this.subject.getState()}`)
      }
  }

  // 测试
  let s = new Subject()
  let o1 = new Observer('o1', s)
  let o2 = new Observer('o2', s)
  let o3 = new Observer('o3', s)

  s.setState(1)
```
场景：

    vue生命周期、watch

    网页事件绑定

    promise

    $.Callbacks
    
      // 自定义事件，自定义回调
      var callbacks = $.Callbacks();
      callbacks.add(function(info) {
          console.log('fn1', info)
      })
      callbacks.add(function(info) {
          console.log('fn2', info)
      })
      callbacks.add(function(info) {
          console.log('fn3', info)
      })
      callbacks.fire('gogo')
      
  8、迭代器模式：顺序遍历有序集合；使用者不必知道集合的内部结构
  
  示例：jquery
    ```
    var arr = [1,2,3];
    var nodeList = document.getElementsByTagName('a');
    var $a = $('a');
    function each(data) {
      var $data = $(data); // 生成迭代器
      $data.each(function(key,val){
        console.log(key,val);
      })
    }
    each(arr);
    each(nodeList);
    each($a);
    ```
  示例2:
  ```
  class Iterator {
      constructor(container) {
          this.list = container.list
          this.index = 0
      }
      next() {
          if(this.hasNext()) {
              return this.list[this.index++]
          }
          return null
      }
      hasNext() {
          if(this.index == this.list.length) {
              return false
          }
          return true
      }
  }

  class Container {
      constructor(list) {
          this.list = list
      }

      // 生成迭代器
      getIterator() {
          return new Iterator(this)
      }
  }

  var arr = [1,2,3,4,5,6]
  let container = new Container(arr)
  let iterator = container.getIterator()
  while(iterator.hasNext()) {
      console.log(iterator.next())
  }
```
  场景3:
  ```
    function each(data) {
        // 生成迭代器
        let iterator = data[Symbol.iterator]() //{value:'',done:false}

        let item = {done: false}

        while(!item.done) {
            item = iterator.next()
            if(!item.done) {
                console.log(item.value)
            }
        }

    }

    function each(data) {
        // data带有遍历器特性的对象：data[Symbol.itertaor] 有值,才能使用for。。。of
        for(let item of data) {
          console.log(item)
        }
    }
  ```
    
  9、状态模式
    状态改变执行对应逻辑
    promise就是一个有限状态机
    有限状态机的函数库javascript-state-machine
    
示例1:
```
import StateMachine from 'javascript-state-machine'
import $ from 'jquery'

// 初始化状态模型
let fsm = new StateMachine({
    init: '收藏',
    transitions: [
        {
            name: 'doStore',
            from: '收藏',
            to: '取消收藏'
        },{
            name: 'deleteStore',
            from: '取消收藏',
            to: '收藏'
        }
    ],
    methods: {
        // 监听执行收藏
        onDoStore: function() {
            alert('收藏成功') 
            updateText()
        },
        onDeleteStore: function() {
            alert('已经取消收藏')
            updateText()
        }
    }
})

let $btn = $('#btn1')
$btn.click(function() {
    if(fsm.is('收藏')) {
        fsm.doStore()
    }else{
        fsm.deleteStore()
    }
})

// 更新状态文案
function updateText() {
    $btn.text(fsm.state)
}

// 初始化文案
updateText()
```
    
示例2：promise
```
let fsm = new StateMachine({
    init: 'pending',
    transitions: [
        {
            name: 'resolve', //事件名称
            from:'pending',
            to: 'fullfilled'
        },{
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        onResolve: function(state, data) {
            // state当前状态机实例，data - fsm.resolve(xxx) 传递的参数
            // console.log(data)
            data.succesList.forEach(fn => fn());
        },
        onReject: function(state, data) {
            data.failList.forEach(fn => fn());
        }
    }
})

class MyPromise {
    constructor(fn) {
        this.succesList = []
        this.failList = []

        fn(() => {
            // resolve函数
            console.log(this)
            // 注意this指向问题
            fsm.resolve(this)
        }, () => {
            // reject函数
            fsm.reject(this)
        })
    }
    then(succesFn, failFn) {
        this.succesList.push(succesFn)
        this.failList.push(failFn)
    }
}

function loading(src) {
    const promise = new MyPromise(function(resolve, reject) {
        let img = document.createElement('img')
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject()
        }
        img.src = src
    })
    return promise
}

let src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550501692674&di=ed5756b11370ea8e93d6532be98eacab&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F84c90c914046d6de6ad78c222643a1b6f4c6aec0.jpg'
let result = loading(src)

result.then(function() {
    console.log('ok1')
}, function() {
    console.log('fail1')
})

result.then(function() {
    console.log('ok2')
}, function() {
    console.log('fail2')
})
```

10、原型模式
    clone自己，生成新的对象
    Object.create()


11、策略模式

    避免过多的if条件语句；
    提供了开放-封闭原则，使代码更容易理解和扩展；
    代码可复用

    如：
    ```
        var obj = {
            "a": function(salary) {
                return salary * 4;
            },
            "b": function(salary) {
                return salary * 3;
            },
            "c": function(salary) {
                return salary * 2;
            }
        }

        var calculateBouns = function(level, salary) {
            return obj[level](salary);
        }
        calculateBouns('a', 10000)
    ```
    
      
