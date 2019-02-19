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

// class Car {
//     constructor(number, name) {
//         this.number = number;
//         this.name = name;
//     }
// }

// class Kuaiche extends Car {
//     constructor(number, name) {
//         super(number, name)
//         this.price = 1
//     }
// }

// class Zhuanche extends Car {
//     constructor(number, name) {
//         super(number, name)
//         this.price = 2
//     }
// }

// class Trip {
//     constructor(car) {
//         this.car = car;
//     }
//     start() {
//         console.log(`行程开始，名称${this.car.name}, 车牌号：${this.car.number}`);
//     }
//     end() {
//         console.log(`行程结束，金额：${this.car.price * 5}`);
//     }
// }

// let car = new Kuaiche(100, '桑塔拉');
// let trip = new Trip(car);
// trip.start();
// trip.end();

// 车类
// class Car {
//     constructor(num) {
//         this.num = num // 车牌
//     }
// }

// // 摄像头类/记录车辆车牌和停车开始时间
// class Camera{
//     shot(car) {
//         return {
//             num: car.num,
//             inTime: Date.now()
//         }
//     }
// }

// // 显示停车信息
// class Screen {
//     show(car, inTime) {
//         console.log('车牌号：', car.num);
//         console.log('停车时间', Date.now() - inTime);
//     }
// }
// // 停车场
// class Park {
//     constructor(floors) {
//         this.floors = floors || []; // 层数
//         this.camera = new Camera(); // 摄像头
//         this.screen = new Screen(); // 显示
//         this.carList = {} // 摄像头拍摄的车辆信息
//     }
//     in(car){
//         // 摄像头获取到的信息
//         const info = this.camera.shot(car);
//         // 停到某个车位
//         const i = parseInt(Math.random() * 100 % 100)
//         const place = this.floors[0].places[i]
//         place.in()
//         info.place = place;
//         this.carList[car.num] = info;
//     }
//     out(car){
//         // 获取信息
//         const info = this.carList[car.num];
//         // 将停车位清空
//         const place = info.place;
//         place.out()
//         this.screen.show(car, info.inTime)
//         // 清空
//         delete this.carList[car.num]
//     }
//     emptyNum() {
//         return this.floors.map(floor => {
//             return `${floor.index} 层还有 ${floor.emptyPlaceNum()} 空闲车位`
//         }).join('\n');
//     }
// }

// // 层
// class  Floor{
//     constructor(index, places) {
//         this.index = index;
//         this.places = places || []; 
//     }
//     emptyPlaceNum() {
//         // 多少空车位
//         let num = 0;
//         this.places.forEach(item => {
//             if(item.empty) {
//                 num = num + 1;
//             }
//         });
//         return num;
//     }
// }

// class Place{
//     constructor() {
//         this.empty = true;
//     }
//     in() {
//         this.empty = false;
//     }
//     out() {
//         this.empty = true;
//     }
// }

// // c
// const floors = [];
// for(let i=0;i<3;i++) {
//     const places = [];
//     for(let j = 0; j< 100; j++) {
//         places[j] = new Place();
//     }
//     floors[i] = new Floor(i+1, places);
// }

// const park = new Park(floors);

// const car1 = new Car(100)
// const car2 = new Car(200)
// const car3 = new Car(300)
// console.log('第一辆进入')
// console.log(park.emptyNum());
// park.in(car1)
// console.log('第二辆进入')
// console.log(park.emptyNum())
// park.in(car2)
// console.log('第一辆离开')
// park.out(car1)
// console.log('第二辆离开')
// park.out(car2)
// console.log('第三辆进入')
// console.log(park.emptyNum());
// park.in(car3)
// console.log('第三辆离开')
// park.out(car3)

// 
// class SingleObject {
//     constructor() {
//     }
//     login() {
//         console.log('login...' + this.name)
//     }
// }

// SingleObject.getInstance = (function() {
//     let instance;
//     return function() {
//         if(!instance) {
//             instance = new SingleObject()
//         }
//         return instance
//     }
// })()

// let obj1 = SingleObject.getInstance();
// obj1.login();
// let obj2 = SingleObject.getInstance();
// obj2.login();
// console.log('obj1===obj2', obj1 === obj2)
// 单例模式
// class LoginForm {
//     constructor() {
//         this.state = 'hide'
//     }
//     show() {
//         if(this.state === 'show') {
//             alert('已经提示')
//             return;
//         }
//         this.state = 'show';
//         console.log('登录框显示成功')
//     }
//     hide() {
//         if(this.state === 'hide') {
//             alert('已经隐藏')
//             return;
//         }
//         this.state = 'hide';
//         console.log('登录框隐藏成功')
//     }
// }

// LoginForm.getInstance = (function() {
//     let instance;
//     return function() {
//         if(!instance) {
//             instance = new LoginForm()
//         }
//         return instance
//     }
// })()

// let login1 = LoginForm.getInstance();
// login1.show()

// let login2 = LoginForm.getInstance();
// login2.hide()


// 适配器
// class Adaptee {
//     specificRequest() {
//         return '德国标准插头'
//     }
// }

// class Target {
//     constructor() {
//         this.adaptee = new Adaptee()
//     }
//     request() {
//         let info = this.adaptee.specificRequest();
//         return `${info} - 转换器 - 中国标准插头`
//     }
// }

// let target = new Target()
// console.log(target.request());
// // 自己封装的ajax，新需要的
// ajax({
//     url: '/getData',
//     type: 'POST',
//     dataType: 'json',
//     data: {
//         id: '123'
//     }
// })
// .done(function(){})
// // 旧代码全都是一下这种
//     $.ajax({})
// // 适配
// let $ = {
//     ajax: function(optiona) {
//         return ajax(optiona)
//     }
// }

// 装饰器
// class Circle{
//     draw() {
//         console.log('画一个圆形')
//     }
// }

// class Decorator{
//     constructor(circle) {
//         this.circle = circle
//     }
//     draw() {
//         this.circle.draw()
//         this.setRedBorder(circle)
//     }
//     setRedBorder(circle) {
//         console.log('设置红色边框')
//     }
// }

// let circle = new Circle();

// let dec = new Decorator(circle);
// dec.draw()

// 参数形式
// function testDec(isDec) {
//     return function (target) {
//         target.isDec =isDec
//     }
// }

// @testDec(false)
// class Demo {}

// alert(Demo.isDec)

// mixin混合
// function mixins (...list) {
//     return function (target) {
//         Object.assign(target.prototype, ...list)
//     }
// }

// const Foo = {
//     foo() {
//         alert('foo')
//     }
// }

// @mixins(Foo)

// class MyClass {
// }
// let obj = new MyClass()
// obj.foo()

// // 类方法装饰器只读
// function  readonly(target, name, descriptor) {
//     descriptor.writable = false // 关闭写
//     return descriptor;
// }

// class Person {
//     constructor() {
//         this.first = 'A'
//         this.last = 'B'
//     }

//     @readonly
//     name() {
//         return `${this.first}: ${this.last}`
//     }
// }

// let p = new Person()
// console.log(p.name())

// 类方法装饰 ：log
// function log(target, name, descriptor) {
    // descriptor {
    //     value: specifiedFunction, // 属性值
    //     enumerable: false, // 是否可枚举
    //     configurable: true, // 是否可配置
    //     writable: true // 是否可写
    // }
//     let oldValue = descriptor.value;
//     descriptor.value = function () {
//         console.log(`calling ${name} width`,arguments)
//         return oldValue.apply(this, arguments)
//     }
//     return descriptor
// }

// class Math {
//     @log
//     add(a,b) {
//         return a+b
//     }
// }

// let math = new Math()
// const result = math.add(1,2)
// console.log(result)

// let star = {
//     name: 'mign',
//     age: 25,
//     phone: '13111123123'
// }

// // 经纪人
// let agent = new Proxy(star, {
//     get: function(target, key) {
//         if(key === 'phone') {
//             // 返回经纪人自己的电话
//             return '12342323242'
//         }
//         if(key === 'price') {
//             //经纪人报价
//             return 120000
//         }
//         return target[key]
//     },
//     set: function(target, key, val) {
//         if(key === 'customPrice') {
//             if(val < 100000) {
//                 throw new Error('价格太低')
//             }else{
//                 target[key] = val
//                 return true
//             }
//         }
//     }
// })

// console.log(agent.name)
// console.log(agent.age)
// console.info(agent.phone)
// console.log(agent.price)
// agent.customPrice = 90000;
// console.log('customPrice:'+agent.customPrice)

// 观察者模式
// 主题，保存状态，状态变化之后触发所有观察者模式
// class Subject {
//     constructor() {
//         this.state = 0
//         this.observers = []
//     }
//     getState() {
//         return this.state
//     }
//     setState(state) {
//         this.state = state
//         this.notifyAllObservers()
//     }
//     notifyAllObservers() {
//         this.observers.forEach(observer => {
//             observer.update()
//         })
//     }
//     attach(observer) {
//         this.observers.push(observer)
//     }
// }
// // 观察者
// class Observer{
//     constructor(name, subject) {
//         this.name = name
//         this.subject = subject
//         this.subject.attach(this)
//     }
//     update() {
//         console.log(`${this.name} update, state: ${this.subject.getState()}`)
//     }
// }

// // 测试
// let s = new Subject()
// let o1 = new Observer('o1', s)
// let o2 = new Observer('o2', s)
// let o3 = new Observer('o3', s)

// s.setState(1)

// class Iterator {
//     constructor(container) {
//         this.list = container.list
//         this.index = 0
//     }
//     next() {
//         if(this.hasNext()) {
//             return this.list[this.index++]
//         }
//         return null
//     }
//     hasNext() {
//         if(this.index == this.list.length) {
//             return false
//         }
//         return true
//     }
// }

// class Container {
//     constructor(list) {
//         this.list = list
//     }

//     // 生成迭代器
//     getIterator() {
//         return new Iterator(this)
//     }
// }

// var arr = [1,2,3,4,5,6]
// let container = new Container(arr)
// let iterator = container.getIterator()
// while(iterator.hasNext()) {
//     console.log(iterator.next())
// }

// function each(data) {
//     // 生成迭代器
//     let iterator = data[Symbol.iterator]()

//     let item = {done: false}

//     while(!item.done) {
//         item = iterator.next()
//         if(!item.done) {
//             console.log(item.value)
//         }
//     }

// }
// var a = [1,2,3,4]
// each(a)

// 状态
// class State {
//     constructor(color) {
//         this.color = color
//     }
//     handle(context) {
//         console.log(`turn to ${this.color} light`)
//         context.seState(this)
//     }
// }
// // 主题
// class Context{
//     constructor() {
//         this.state = null
//     }
//     getState() {
//         return this.state
//     }
//     seState(state) {
//         this.state = state
//     }
// }

// let context = new Context()

// let green = new State('green')
// let yellow = new State('yellow')
// let red = new State('red')

// // 绿灯亮了
// green.handle(context)
// console.log(context.getState())

// yellow.handle(context)
// console.log(context.getState())

// red.handle(context)
// console.log(context.getState())

import StateMachine from 'javascript-state-machine'
// import $ from 'jquery'

// // 初始化状态模型
// let fsm = new StateMachine({
//     init: '收藏',
//     transitions: [
//         {
//             name: 'doStore',
//             from: '收藏',
//             to: '取消收藏'
//         },{
//             name: 'deleteStore',
//             from: '取消收藏',
//             to: '收藏'
//         }
//     ],
//     methods: {
//         // 监听执行收藏
//         onDoStore: function() {
//             alert('收藏成功') 
//             updateText()
//         },
//         onDeleteStore: function() {
//             alert('已经取消收藏')
//             updateText()
//         }
//     }
// })

// let $btn = $('#btn1')
// $btn.click(function() {
//     if(fsm.is('收藏')) {
//         fsm.doStore()
//     }else{
//         fsm.deleteStore()
//     }
// })

// // 更新状态文案
// function updateText() {
//     $btn.text(fsm.state)
// }

// // 初始化文案
// updateText()

// let fsm = new StateMachine({
//     init: 'pending',
//     transitions: [
//         {
//             name: 'resolve', //事件名称
//             from:'pending',
//             to: 'fullfilled'
//         },{
//             name: 'reject',
//             from: 'pending',
//             to: 'rejected'
//         }
//     ],
//     methods: {
//         onResolve: function(state, data) {
//             // state当前状态机实例，data - fsm.resolve(xxx) 传递的参数
//             // console.log(data)
//             data.succesList.forEach(fn => fn());
//         },
//         onReject: function(state, data) {
//             data.failList.forEach(fn => fn());
//         }
//     }
// })

// class MyPromise {
//     constructor(fn) {
//         this.succesList = []
//         this.failList = []

//         fn(() => {
//             // resolve函数
//             console.log(this)
//             // 注意this指向问题
//             fsm.resolve(this)
//         }, () => {
//             // reject函数
//             fsm.reject(this)
//         })
//     }
//     then(succesFn, failFn) {
//         this.succesList.push(succesFn)
//         this.failList.push(failFn)
//     }
// }

// function loading(src) {
//     const promise = new MyPromise(function(resolve, reject) {
//         let img = document.createElement('img')
//         img.onload = function() {
//             resolve(img)
//         }
//         img.onerror = function() {
//             reject()
//         }
//         img.src = src
//     })
//     return promise
// }

// let src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550501692674&di=ed5756b11370ea8e93d6532be98eacab&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F84c90c914046d6de6ad78c222643a1b6f4c6aec0.jpg'
// let result = loading(src)

// result.then(function() {
//     console.log('ok1')
// }, function() {
//     console.log('fail1')
// })

// result.then(function() {
//     console.log('ok2')
// }, function() {
//     console.log('fail2')
// })

// let prototype = {
//     getName: function() {
//         return this.first + ' ' + this.last
//     },
//     say: function() {
//         alert('hello')
//     }
// }

// let x =Object.create(prototype)
// x.first = 'a'
// x.last = 'b'
// alert(x.getName())