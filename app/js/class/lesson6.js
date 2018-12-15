//数组扩展

{
  //数组定义
  let arr = Array.of(3,4,7,9,11);
  console.log('arr=',arr);

  //若不放任何参数，返回空数组 []
  let empty=Array.of();
  console.log('empty',empty);
}

{
  //获取index.ejs页面中标签，获取所有p元素标签
  let p=document.querySelectorAll('p');
  let pArr=Array.from(p);  //将集合转换为数组
  pArr.forEach(function(item){
    console.log(item.textContent); //textContent是js原生获取节点内容
  });
  //Array.from 映射功能，通过传入的函数对象
  console.log(Array.from([1,3,5],function(item){return item*2}));
}

{
  console.log('fill-7',[1,'a',undefined].fill(7));  //数组都被替换为7数组  7,7,7
  console.log('fill,pos',['a','b','c'].fill(7,1,3)); //数组都被填充7,从第一个到第三个，输出 a,7,7
}

{
  //数组遍历
  for(let index of ['1','c','ks'].keys()){
    console.log('keys',index);
  }
  //values() es6是不支持的，必须引入import 'babel-polyfill' 支持该兼容性问题
  for(let value of ['1','c','ks'].values()){
    console.log('values',value);
  }
  for(let [index,value] of ['1','c','ks'].entries()){
    console.log('values',index,value);
  }
}
 
{
  //参数：替换哪个位置元素，读取哪个位置元素数据替换，截取到哪个位置输出
  console.log([1,2,3,4,5].copyWithin(0,3,4));
}

{
  //查找数组中元素是否存在，通过函数进行帅选，只找到第一个符合成员就返回了
  console.log([1,2,3,4,5,6].find(function(item){return item>3})); //输出4
  //返回下标值
  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3}));
}

{
  //判断是否包含某个元素
  console.log('number',[1,2,NaN].includes(1)); //返回true
  //可以对NAN进行判断 
  console.log('number',[1,2,NaN].includes(NaN));  //返回true es6是NaN是可以做相等运算的
}
