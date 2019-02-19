import $ from 'jquery'
import getCart from '../ShoppingCart/Cart.js'
import StateMachine from 'javascript-state-machine'

export default class Item {
    constructor(list, data) {
        this.list = list
        this.data = data
        this.$el = $('<div>')
        this.cart = getCart()
    }

    initContent() {
        let $el = this.$el
        let data = this.data
        $el.append($(`<p>名称：${data.name}</p>`))
        $el.append($(`<p>价格：${data.price}</p>`))
    }

    initBtn() {
        let $el = this.$el
        let $btn = $('<button>')
        let _this = this
        let fsm = new StateMachine({
            init: '加入购物车',
            transitions: [
                {
                    name: 'addToCart',
                    from: '加入购物车',
                    to: '从购物车删除'
                },
                {
                    name: 'deleteFromCart',
                    from: '从购物车删除',
                    to: '加入购物车'
                }
            ],
            methods: {
                // 加入购物车
                onAddToCart: function() {
                    _this.addToCartHandle()
                    updateText()
                },
                // 从购物车删除
                onDeleteFromCart: function() {
                    _this.deleteFromCartHanle()
                    updateText()
                }
            }
        })

        function updateText() {
            $btn.text(fsm.state)
        }

        $btn.click(() => {
            if(fsm.is('加入购物车')){
                fms.addToCart()
            }else{
                fms.deleteFromCart()
            }
        })
        updateText()
        $el.append($btn)
    }

    addToCartHandle() {
        this.cart.add(this.data)
    }

    deleteFromCartHanle() {
        this.cart.del(this.data.id)
    }

    render() {
        // this.$el当前Item的容器
        // this.list为LIst实例，this.list.$el为List容器
        this.list.$el.append(this.$el)
    }

    init() {
        this.initContent()
        this.initBtn()
    }
}