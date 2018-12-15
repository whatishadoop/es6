//函数扩展
{
  // 简洁表示法
  let o = 1;
  let k = 2;
  let es5 = {
    o: o,
    k: k
  };
  //es6对象定义方法
  let es6 = {
    o,
    k
  };
  console.log(es5, es6);

  let es5_method = {
    hello: function() {
      console.log('hello');
    }
  };
  let es6_method = {
    hello() {
      console.log('hello');
    }
  };
  console.log(es5_method.hello(), es6_method.hello()); //打印对对象 
}

{
  // 属性表达式
  let a = 'b';
  let es5_obj = {
    a: 'c', //es5属性表达式a,b必须固定
    b: 'c'
  };

  let es6_obj = {
    [a]: 'c' //es6的属性可以是表达式可以变化，等价于 b: 'c'
  }

  console.log(es5_obj, es6_obj); //打印两个对象
}

{
  // 新增API
  //判断两个字符串是否相等与 === 等价， true
  console.log('字符串', Object.is('abc', 'abc'), 'abc' === 'abc');
  //数组是引用类型，是不同的地址 输出false
  console.log('数组', Object.is([], []), [] === []);

  //对象拷贝，属于浅拷贝，只是把引用地址给他， 深拷贝包括引用地址以及堆里面数据都拷贝，只会拷贝自身属性，不会拷贝继承的父属性
  console.log('拷贝', Object.assign({
    a: 'a'
  }, {
    b: 'b'
  }));

  //对象里键值属性通过Object.entries 进行解析
  let test = {
    k: 123,
    o: 456
  };
  for (let [key, value] of Object.entries(test)) {
    console.log([key, value]);
  }
}
/*
1.常见的基本数据类型
Number、String 、Boolean、Null和Undefined。基本数据类型是按值访问的，因为可以直接操作保存在栈变量中的实际值

2.引用类型数据
也就是对象类型Object type，比如：Object 、Array 、Function 、Data等。javascript的引用数据类型是保存在堆内存中的对象。
与其他语言的不同是，你不可以直接访问堆内存空间中的位置和操作堆内存空间。只能操作对象在栈内存中的引用地址。
所以，引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存中堆内存中的对象
*/

//数组时讲解扩展运算符，bacel对其支持不好，实际中也用不了
{
  // 扩展运算符
  // let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
  //最后c就是个对象
  // c={
  //   c:'ddd',
  //   d:'ccc'
  // }
}

/*
参看文章 -- js对象声明方式 
创建对象方式一
不知你注意到对象都是用 var 声明的没有，像上面的代码，就只是简单的声明一个对象，它只有一份拷贝，
你不能像实例化类对象一样对它采用new操作，像上面代码的注释部分。这样就极大的限制了对象的重用，
除非你建立的对象只需要一份拷贝，否则考虑用其他方法建立对象。
*/

//由一对大括号括起来对象方式1
{
  let emptyObj = {};
  let myObj = {
    'id': 1, //属性名用引号括起来，属性间由逗号隔开
    'name': 'myName'
  };

}

//由一对大括号括起来对象方式2，包括函数定义
{
  let myObj = {
    'id': 1,
    'fun': function() {
      document.writeln(this.id + '-' + this.name); //以"对象.属性"方式访问
    },
    'name': 'myObj',
    'fun1': function() {
      document.writeln(this['id'] + '+' + this['name']); //以集合方式访问
    }
  };
  myObj.fun();
  myObj.fun1();
  // 结果
  // 1-myObj 1+myObj 
}

/*
用 function 关键字模拟 class 通过new 方式创建对象可以复用
在 function 中用 this 引用当前对象，通过对属性的赋值来声明属性。
如果用var声明变量，则该变量为局部变量，只允许在类定义中调用
*/

{
  function myClass() {
    this.id = 5;
    this.name = 'myclass';
    this.getName = function() {
      return this.name;
    }
  }
  var my = new myClass();
  alert(my.id);
  alert(my.getName());
  // 结果
  // 5
  // myclass
}