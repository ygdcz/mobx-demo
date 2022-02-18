mobx可以有多个store
把状态和方法放到不同的Store
通过一个根Store统一管理所有的Store

CounterStore                      
                            ComponentA

CartStore
                            ComponentB

xxxxStore
