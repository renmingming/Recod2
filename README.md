# Recod2
设计模型记录

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

7、观察者模式：订阅

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

    网页事件绑定

    promise

    $.Callbacks
    
      ```
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
      ```
