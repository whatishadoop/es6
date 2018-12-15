//es6模块化，新引入的js模块，nodejs引入require实现模块化
//es6主要是export 以及import实现模块化
//导出方式一
// export let A=123;  //导出变量给其它模块使用
//
// export function test(){ //导出函数给其它模块使用
//   console.log('test');
// }
//
// export class Hello{  //导出类给其它模块使用
//   test(){
//     console.log('class');
//   }
// }

//其它js通过import {A,test,Hello} form './class/lesson17'来使用 ,定位到lesson17.js 其中.js可以省略
//通过调用conosle.log(A,test,Hello)；


//引入解决方式一
//1.导出的文件很多,全部引入方式为import * as lesson form './class/lesson17'  *表示所有，用lesson代表别名，使用lesson.A来分别获取conosle.log(lesson.A,lesson.test,lesson.Hello)；
//2.只需要导出文件中的几个，通过{}引入自己所需的对象或变量即可如之引入import {A} form './class/lesson17'，


//导出方式二，export default表示给导出对象不起名字，给引入方取名字
let A=123;
let test=function(){
  console.log('test',test);
}
class Hello{
  test(){
    console.log('class');
  }
}

//导出时没指定名称，推荐这种方式，控制需要导出的变量，比较安全
//并且由引入方取导出对象名字
export default {
  A,
  test,
  Hello
}
