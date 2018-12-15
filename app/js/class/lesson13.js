//promise 是异步编程解决方案，与传统回调方法是不同的
{
  // 基本定义，通过定时器 模拟前端发送ajax的过程,es5用法
  let ajax=function(callback){
    console.log('执行');
    setTimeout(function () {
      callback&&callback.call()  //callback.call()回调函数调用方法， callback&& 判断是否为空，不空再执行后面调用
    }, 1000);
  };
  //测试项ajax函数中传递回调函数,1 秒后执行回调函数
  ajax(function(){
    console.log('timeout1');
  })
}

/*
callback&&callback.call() 意思
如果存在回调函数就执行！,这是利用了 JS &&符号的一个小技巧&& 符号在前面为假时就不会执行后面的语句了,所以这个就相当于
if(callback){
    callback();
}
*/

//promise解决 回调后继续要触发新的异步回调，这样会造成程序复杂，而且回调执行顺序很难看出
//上面的案例promise写法，比上面es5可读性，科维护性清晰
{
  let ajax=function(){
    console.log('执行2');
    //promise实例创建回调，resolve 表示执行下面操作，reject拒绝下面操作函数
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve() //只有执行该方法才能执行下面的console.log('promise','timeout2');
      }, 1000);
    })
  };

  //通过then来触发执行，把回调逻辑函数不放在上面定义中，使上面逻辑简单
  ajax().then(function(){
    console.log('promise','timeout2'); //上面的resolve() 触发执行
  })         //},function(){})   后面的函数表示上面的reject() 触发执行
}

{
  //演示 a回调 -> b回调 -> c回调 串联操作效果
  let ajax=function(){  //a回调
    console.log('执行3');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax()
    .then(function(){  //b回调
    return new Promise(function(resolve,reject){ 
      setTimeout(function () {
        resolve()
      }, 2000);
    });
  })
    .then(function(){  //c回调
    console.log('timeout3'); 
  })
}

{  
  //若串行执行过程出现错误，使用catch进行处理
  let ajax=function(num){
    console.log('执行4');
    return new Promise(function(resolve,reject){
      if(num>5){  //若num大于5则执行下一步
        resolve()
      }else{
        throw new Error('出错了') //模拟错误
      }
    })
  }

  ajax(6).then(function(){
    console.log('log',6);
  }).catch(function(err){ 
    console.log('catch',err);
  });

  ajax(3).then(function(){
    console.log('log',3);
  }).catch(function(err){ //catch处理promise错误信息
    console.log('catch',err); //输出错误信息
  });
}

{
  // 所有图片加载完再添加到页面
  //创建promise实例
  function loadImg(src){
    return new Promise((resolve,reject)=>{ //箭头函数
      let img=document.createElement('img');
      img.src=src;
      img.onload=function(){ //图片加载完成执行方法onload
        resolve(img); //返回参数对象img
      }
      img.onerror=function(err){ //失败了就error
        reject(err);
      }
    })
  }

  //将图片添加到body中
  function showImgs(imgs){  //传递多个img
    imgs.forEach(function(img){
      document.body.appendChild(img);
    })
  }

  //把下面多个promise实例当做一个新的promise实例，下面多个promise状态(正确或错误都可以)都完成
  //以后才会触发新的promise的then方法执行showImgs，Promise.all创建新的实例，同时显示,若有个图片还在
  //加载中就不会显示到页面上来
  Promise.all([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
    loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
  ]).then(showImgs)

}

{
  // 有一个图片加载完就添加到页面，Promise.race与上面all相反，只要有一个到了就进行显示，其它就不处理了
  function loadImg(src){
    return new Promise((resolve,reject)=>{
      let img=document.createElement('img');
      img.src=src;
      img.onload=function(){
        resolve(img);
      }
      img.onerror=function(err){
        reject(err);
      }
    })
  }

  function showImgs(img){ //只传递一个img
    let p=document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p)
  }

  Promise.race([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
    loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
  ]).then(showImgs)

}
