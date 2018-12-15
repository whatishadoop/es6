//Symbol是es6新增加的类型 ，可以提供一个独一无二的值
{
  // 方式1 声明变量a1 ,变量a2 两个都独一无二 ，永远不相等
  let a1=Symbol(); 
  let a2=Symbol();
  console.log(a1===a2);  //输出为false
  //声明方式2 
  let a3=Symbol.for('a3');  //这里的'a3'为key值,Symbol.for 定义会先全局搜索 是否有注册过，有则返回那个值，否则新创建以a3的独一无二的值
  let a4=Symbol.for('a3');
  console.log(a3===a4); //输出为true a3 和 a4的key值相同
}

//用在什么场景下使用，解决一种是当前对象重复key值 abc 定义 ，一种是对象继承时新增属性名 abc 这些都会造成后面会定义会覆盖前面定义的属性
{
  let a1=Symbol.for('abc'); //解决下面obj对象冲突问题
  let obj={
    [a1]:'123',  //输出Symbol(abc)
    'abc':345,
    'c':456
  };
  console.log('obj',obj);

  //用of遍历对象是不能获取Symbol 定义 key的值
  for(let [key,value] of Object.entries(obj)){
    console.log('let of',key,value);//输出345,456
  }

  //只能打印symbol定义的key 对象的值，其中Object.getOwnPropertySymbols(obj) 返回是个数组
  Object.getOwnPropertySymbols(obj).forEach(function(item){
    console.log(obj[item]);  //输出123
  })

  //通过Reflect 新增对象解决返回symbol变量定义的key以及非symbol定义的key的值 
  Reflect.ownKeys(obj).forEach(function(item){
    console.log('ownkeys',item,obj[item]);
  })
}
