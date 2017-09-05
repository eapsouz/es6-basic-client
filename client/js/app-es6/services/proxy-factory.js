export class ProxyFactory {
    
    static create(objeto, props, action) {
     
        return new Proxy(objeto, {
                
                get(target, prop, receiver) {
                    
                    if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                        
                        return function() {
                            
                            console.log(`interceptando ${prop}`);
                            let res = Reflect.apply(target[prop], target, arguments);
                            action(target);
                            return res;
                        }
                    }
                    
                    return Reflect.get(target, prop, receiver);
                },
                
                set(target, prop, value, receiver) {
                    
                    let res = Reflect.set(target, prop, value, receiver);
                    if(props.includes(prop)) action(target);
                    return res;
                }
        });
    }
    
    static _isFunction(func) {
        
        return typeof(func) == typeof(Function);
    }
}