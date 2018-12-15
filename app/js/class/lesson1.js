//全局，函数，块作用域(let,const)
function test(){
  // for(let i=1;i<3;i++){
  //   console.log(i);
  // }
  //1. let定义的i在此处报错，在上面块作用域执行完就结束了
  //2. es6 开启严格模式的，es5要使用"user strict",所以变量未声明，则会报引用错误
  // console.log(i);  
  //3.let不能重复定义赋值
    let a = 1;
  // let a = 2;
}

function last(){
  //PI为常量不能修改，声明时必须赋值否则报错，只读属性，在块作用域与let相同
  const PI=3.1415926;
  const k={ //定义常量对象，里面的属性是可以修改的
    a:1
  }
  k.b=3;
  console.log(PI,k);
}


// test();
last();
