//函数扩展
{
  //es6新增函数参数默认值，默认值后面不能再有没有默认值变量test(x, y = 'world',c)
  function test(x, y = 'world'){
    console.log('默认值',x,y);
  }
  test('hello');
  test('hello','kill');
}

{
  //作用域 与函数参数值，输出kill,kill
  let x='test';
  function test2(x,y=x){  // y=x中x 取的是前面参数x的值  若是(c,y=x)则此处的x取的是test
    console.log('作用域',x,y);
  }
  test2('kill'); //若test2()不赋值则显示undefined,undefined
}

{
  //rest参数 输出1,2,3,4,a ,将输入参数转换成一个数组对象
  //arg后面不能再有参数了，否则报错
  function test3(...arg){
    for(let v of arg){
      console.log('rest',v);
    }
  }
  test3(1,2,3,4,'a');
}

{
  //扩展运算符
  console.log(...[1,2,4]);  //输出1,2,4 把数组转换三个离散值
  console.log('a',...[1,2,4]);
}

{
  //箭头函数,注意this绑定，有些适合，有些不适合
  let arrow = v => v*2;  //输出为6 函数名(arrow) = 参数(v) => 返回值(v*2)， 
  let arrow2 = () => 5;  //输出为5 函数名(arrow) = 无参数() => 返回值(v*2)，
  console.log('arrow',arrow(3));
  console.log(arrow2());

}

{
  //es6 尾调用，就是函数的最后一句话是不是函数
  function tail(x){
    console.log('tail',x);
  }

  function fx(x){
    return tail(x)  //最后一句是函数tail 才是尾调用，提升性能用于递归调用
  }
  fx(123)
}
