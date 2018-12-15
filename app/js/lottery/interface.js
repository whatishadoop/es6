import $ from 'jquery';

class Interface{
  /**
   * [getOmit 获取遗漏数据]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getOmit(issue){
    let self=this;  //将上下文this缓存到一个变量中，此处是Interferce类型实例上下文，若被lottery继承则是lottery类型实例上下文，方便下面的promise函数中，通过闭包方式调用this,避免直接调用this 错误
    return new Promise((resolve,reject)=>{  //箭头函数等价于 function(resolve,reject)
      $.ajax({
        url:'/get/omit',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          self.setOmit(res.data); //在被lottery继承后，此处的self指向lottery实例上下文，所以调用其继承其它类的setOmit方法传递数据，从而达到在整个上下文类实例中做到数据共享目的
          resolve.call(self,res) //函数执行有一个上下文环境，说白了就是this对象，call方法可以更改这个对象的指针为当前类实例上下文
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }
  /**
   * [getOpenCode 获取开奖号码]
   * @param  {string} issue [期号]
   * @return {[type]}       [description]
   */
  getOpenCode(issue){
    let self=this;
    return new Promise((resolve,rejet)=>{
      $.ajax({
        url:'/get/opencode',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          self.setOpenCode(res.data);
          resolve.call(self,res);
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }

  /**
   * [getState 获取当前状态]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getState(issue){
    let self=this;
    return new Promise((resolve,rejet)=>{
      $.ajax({
        url:'/get/state',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          resolve.call(self,res);
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }
}

export default Interface

/*
ajax相关知识点
知识点1：这个同步的意思是当JS代码加载到当前AJAX的时候会把页面里所有的代码停止加载，页面出去假死状态，当这个AJAX执行完毕后才会继续运行其他代码页面假死状态解除。 
而异步则这个AJAX代码运行中的时候其他代码一样可以运行。 jquery的async:false,这个属性 默认是true：异步，false：同步。

知识点2：
默认cache:true 会读缓存，假如上次到服务器上访问了a.html，第二次的时候得到的是上次访问的a.html的结果，而不是重新到服务器获取，此时
就是回调方法不执行。false的话会在url后面加一个时间缀，让它跑到服务器获取结果。cache只有GET方式的时候有效

知识点3:
type类型 默认值: "GET")。请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。

知识点4: 参看文章: js中var self=this的解释
1. 通常用法：将上下文this缓存到一个变量中,以便在本函数作用域内包含另一个函数作用域的情况下可以继续使用此
上下文对象this,如果省略var self=this; 这行，那么在嵌套函数作用域内就无法访问到本函数作用域的成员了
2. 实例成员与局部成员 问题
*/
