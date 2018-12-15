//数值处理 扩展
{
  console.log('B',0B111110111);  //二进制0B/0b
  console.log(0o767);  //八进制 0o/0O
}

//判断数值是否有效
{
  console.log('15',Number.isFinite(15));
  console.log('NaN',Number.isFinite(NaN)); //false  NaN不是数字
  console.log('1/0',Number.isFinite('true'/0)); //true
  console.log('NaN',Number.isNaN(NaN));  //输出为true NaN非数值
  console.log('0',Number.isNaN(0));// 输出false

}

{
  console.log('25',Number.isInteger(25)); //true 判断是否整数
  console.log('25.0',Number.isInteger(25.0)); //true 
  console.log('25.1',Number.isInteger(25.1)); //false
  console.log('25.1',Number.isInteger('25')); //false
}

{
  //数值最大，最小范围内
  console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);
  console.log('10',Number.isSafeInteger(10)); //true
  console.log('a',Number.isSafeInteger('a')); //false
}

{
  //返回小数的整数部分
  console.log(4.1,Math.trunc(4.1)); //4
  console.log(4.9,Math.trunc(4.9)); //4
}

{ 
  //通过sign判断返回的数值是正数，负数，零 (1,-1,0)
  console.log('-5',Math.sign(-5));//-1 
  console.log('0',Math.sign(0)); //0
  console.log('5',Math.sign(5)); //1
  console.log('50',Math.sign('50')); //字符串转化为正数 返回1
  console.log('foo',Math.sign('foo')); //不能转换的字符串 返回NAN
}


{
  //立方根计算
  console.log('-1',Math.cbrt(-1)); //-1的立方根 1
  console.log('8',Math.cbrt(8));  // 8的立方根 2
}

//参看 js中NAN、NULL、undefined的区别