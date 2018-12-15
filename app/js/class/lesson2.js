//讲解解构赋值按js类型分，左边一种解构，右边一种解构，一一赋值
//下面每个例子都是用{}块作用域隔开的，这样每个块中相同的变量名就不受影响
//数组解构函数类型，替代let a=1,b=2; 
{ 
  let a,b,rest;
  [a,b]=[1,2];
  console.log(a,b);
}

//数组解构函数类型 1,2，最后变成数组【3,4,5，6】
{
  let a,b,rest;
  [a,b,...rest]=[1,2,3,4,5,6];
  console.log(a,b,rest);
}

//对象解构赋值,输出1,2
{
  let a,b;
  ({a,b}={a:1,b:2})
  console.log(a,b);
}

//输出1,2,3 ,若c=3不赋值，则输出1,2,undefine,所以c=3为缺省值
{
  let a,b,c,rest;
  [a,b,c=3]=[1,2];
  console.log(a,b,c);
}

//应用场景 变量交换
{
  let a=1;
  let b=2;
  [a,b]=[b,a];
  console.log(a,b);
}

//输出1,2，函数返回直接赋值，避免设置var xx= f(); a= xx 赋值
{
  function f(){
    return [1,2]
  }
  let a,b;
  [a,b]=f();
  console.log(a,b);
}

//输出1,4，数组解构赋值匹配方式，只获取我想要的值,逗号直接的数组都被去除了
{
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,,b]=f();
  console.log(a,b);
}

//只关心第一个，其余以数组返回 ，输出1,[3,4,5]，逗号之间数值被过滤了
{
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,...b]=f();
  console.log(a,b);
}

//对象解构赋值，输出42,true
{
  let o={p:42,q:true};
  let {p,q}=o;
  console.log(p,q);
}

//对象输出3,5 ，对象a属性被覆盖
{
  let {a=10,b=5}={a:3};
  console.log(a,b);
}

//对象解构赋值场景，前端和后端通信jason对象
{
  //模拟metaData 对象为服务端传递过来的json对象
  let metaData={
    title:'abc',
    test:[{
      title:'test',
      desc:'description'
    }]
  }
  //左边解构与上面解构相同，获取里面要的属性值,输出abc,test
  let {title:esTitle,test:[{title:cnTitle}]}=metaData;
  console.log(esTitle,cnTitle);
}
