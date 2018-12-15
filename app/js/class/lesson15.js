//generator是es6高级用法，一种异步编程解决方法，以前回调，promise,比promise高级
//next函数 ,yield ,多个步骤遇到yield或return就结束了，调用next执行下一步
{
  // genertaor基本定义，函数funciton多个* ,函数内部用yield进行定义，需要bacelfill.poly进行定义
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c'
  };

  //执行该函数，并调用next方法4次 ，与iteroer接口相同
  //next在遇到yield停下来执行第一个yild或return之前的语句
  let k=tell();

  console.log(k.next());  //value:a done false
  console.log(k.next());  //value:b done false
  console.log(k.next());  //value:c done false
  console.log(k.next());  //value:undefine done true  结束循环 
}

//generator函数与iterator接口关系，一般都部署到obj[Symbol.iterator]
//通过generator函数实现obj遍历器，比较简单，obj[Symbol.iterator]表示函数属性定义
{
  let obj={};
  obj[Symbol.iterator]=function* (){
    yield 1;
    yield 2;
    yield 3;
  }

  //测试generator函数 实现的iteroter接口
  for(let value of obj){
    console.log('value',value);
  }
}

{
  //generator函数实现状态机 a->b->c 循环，控制每个步骤
  let state=function* (){
    while(1){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status=state();
  //调用next 不断用于打印a,b,c，a,b,c
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}

// {
//   let state=async function (){  //只是语法不同async function等价于function*  await等价于yield
//     while(1){
//       await 'A';
//       await 'B';
//       await 'C';
//     }
//   }
//   let status=state();
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
// }
//

//场景一: genertor 实现抽奖逻辑应用，抽奖次数限制，前后端都要实现
//一般全局变量，修改次数不全局，不要把数据都放在全局变量上影响性能
{
  let draw=function(count){
    //具体抽奖逻辑
    console.info(`剩余${count}次`)
  }

  //generator函数定义
  let residue=function* (count){
    while (count>0) {
      count--;
      yield draw(count); //next执行后条用 draw方法
    }
  }

  
  let star=residue(5);  //调用generator函数实现实例化，是异步执行的，代码会继续往下运行
  let btn=document.createElement('button');
  btn.id='start';
  btn.textContent='抽奖';
  document.body.appendChild(btn);
  //绑定按钮事件，超过5次就不再执行draw方法了
  document.getElementById('start').addEventListener('click',function(){
    star.next();
  },false)
}

{
  //场景二: 长轮询应用，服务端状态不断变化，客户端需要定义获取其装填
  //http是无状态，一种是http长轮询，一种是websocket连接但性能不好
  //下面是generator与promise的结合使用
  let ajax=function* (){
    yield new Promise(function(resolve,reject){
      setTimeout(function () { //模拟请求服务端耗时
        resolve({code:0})//成功返回resolve,拿到服务端码值
      }, 200);
    })
  }

  let pull=function(){   
    let genertaor=ajax();  //实现generator函数实例化
    let step=genertaor.next(); //运行第一次yield 实例，向后端服务发送请求
    step.value.then(function(d){  //step.value 是promise实例 ，因为step对象结构为 value:a done:false，function(d)为resolve({code:0})传入的对象
      if(d.code!=0){  //不等于0就再次请求，没一秒请求一次
        setTimeout(function () {
          console.info('wait'); // 日志console.log()，console.info在chrome控制台显示前缀i
          pull()
        }, 1000);
      }else{  //否则就直接打印
        console.info(d);
      }
    })
  }

  pull(); //执行实例，code=1不断打印wait的长轮询
}
