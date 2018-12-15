//proxy与reflect 介绍 , proxy是代理商 ，reflect是反射Object作用，放在一起是因为方法咿呀一样
//只是创建对象方法不一样
{
  let obj={  //作为原始对象存储原始数据
    time:'2017-03-11',
    name:'net',
    _r:123  
  };

  //创建代理对象，传入原始对象，在中间加入一些操作
  let monitor=new Proxy(obj,{
    // 拦截对象属性的读取方法
    get(target,key){
      return target[key].replace('2017','2018') //target[key] 类似obj[key]属性取值
    },
    // 拦截对象设置属性方法，target是object对象
    set(target,key,value){
      if(key==='name'){
        return target[key]=value; //只有name属性可以修改值
      }else{
        return target[key]; //其它属性直接返回
      }
    },
    // 拦截key in object操作 ，返回true / false
    has(target,key){
      if(key==='name'){
        return target[key]
      }else{
        return false;
      }
    },
    // 拦截delete
    deleteProperty(target,key){
      if(key.indexOf('_')>-1){
        delete target[key];  //删除属性值，返回true
        return true;
      }else{
        return target[key]  //直接返回
      }
    },
    // 拦截Symbol对象类型: Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
      //filter 为过滤函数,过滤掉time属性名
      return Object.keys(target).filter(item=>item!='time')
    }
  });
  
  //测试代理的读取方法
  console.log('get',monitor.time);

  //测试代理的修改方法
  monitor.time='2018';
  monitor.name='mukewang';
  //修改不起作用
  console.log('set',monitor.time,monitor);
  //keys in功能检测对象中是否有该属性， 返回 true 以及 false功能
  console.log('has','name' in monitor,'time' in monitor);
   
  //测试代理删除操作
  // delete monitor.time;
  // console.log('delete',monitor);
  //
  // delete monitor._r;
  // console.log('delete',monitor);
  //测试拦截symbol类型的 keys
  console.log('ownKeys',Object.keys(monitor));

}

{

  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };
  //使用反射读取obj属性，通过Reflect.get 读取属性值
  console.log('Reflect get',Reflect.get(obj,'time'));
  //修改值
  Reflect.set(obj,'name','mukewang');
  console.log(obj);
  //判断obj对象是否有这个属性
  console.log('has',Reflect.has(obj,'name'));
}

//新建一个块作用域，应用场景数据类型校验，实现和业务解耦的校验模块，创建如下proxy代理对象函数
//对象和校验墨迹隔离开
{
  function validator(target,validator){
    return new Proxy(target,{  //上面validator函数传入的参数
      _validator:validator,  
      //修改控制方法
      set(target,key,value,proxy){
        if(target.hasOwnProperty(key)){//是否有该属性key值
          let va=this._validator[key]; //有则直接返回
          if(!!va(value)){ //若值存在，用反射修改值
            return Reflect.set(target,key,value,proxy)
          }else{
            throw Error(`不能设置${key}到${value}`)
          }
        }else{
          //没有该属性则抛出异常，使用字符串模板
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  const personValidators={
    name(val){  //name属性值必须是string
      return typeof val==='string'
    },
    age(val){   //age属性值满足如下规则
      return typeof val === 'number' && val>18
    },
    mobile(val){
      
    }
    //以后在这边设置扩展属性即可
  }

  //创建class对象
  class Person{
    //构造函数
    constructor(name,age){
      this.name=name;
      this.age=age;
      this.mobile='1111';
      return validator(this,personValidators)  //返回的是proxy对象
    }
  }

  const person=new Person('lilei',30);

  console.info(person);
  //修改对象
  person.name='Han mei mei';

  console.info(person);
}
