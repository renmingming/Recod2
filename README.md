# Recod2
设计模型记录

## 五大设计原则SOLID

  s、单一职责原则：一个类只提供一种功能
  
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
