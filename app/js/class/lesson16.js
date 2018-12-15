//修饰器是个函数，用于改变类的行为，扩展类的功能，只能在类的范畴内使用
//需要安装 babel-plugin-transform-decorator-legacy --save-dev插件,才能解析
//修改bacel.rc加入插件"plugins":["transform-decorators-legacy"]才可以支持
{
  //readonly修饰器是个函数定义如下，三个参数，用于显示某个属性只读，target修改类本身不是实例，修改属性名，描述对象
  let readonly=function(target,name,descriptor){
    descriptor.writable=false; //描述对象可写设置false
    return descriptor
  };

  //方式一: 定义类，只能在类上设置修饰器
  class Test{
    @readonly  //使用修饰器只读的，保证属性不能修改
    time(){
      return '2017-03-11'
    }
  }

  let test=new Test();

  // test.time=function(){  //此时修改time 属性，则报错显示只读不能修改
  //   console.log('reset time');
  // };
  
  //测试输出
  console.log(test.time());  
}


{
  //方式二: 定义修饰器，在类外上面使用修饰器,target 是类本身，所以下面target.myname是类的静态属性
  let typename=function(target,name,descriptor){
    target.myname='hello';  //类.静态属性='hello'
  }

  @typename
  class Test{

  }

  console.log('类修饰符',Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators 直接使用即 import引入使用即可@xxx
}

//前端业务埋点，如广告业务，采集点击和展示函数中进行埋点记录日志信息发送后端
{
  let log=(type)=>{
    return function(target,name,descriptor){
      let src_method=descriptor.value;  //获取方法名，在注释中定义的
      descriptor.value=(...arg)=>{   //获取方法参数
        src_method.apply(target,arg); //先执行原来方式
        console.info(`log ${type}`);  //然后模拟打印日志实现埋点功能
      }
    }
  }
  //埋点系统抽离出变成可复用模块，若埋点接口变了，只对上面的log修饰器方法改变即可
  //从业务代码中抽离源代码变的简洁
  class AD{
    @log('show')  //使用修饰器在类方法中定义
    show(){
      console.info('ad is show')
    }
    @log('click')
    click(){
      console.info('ad is click');
    }
  }

  let ad=new AD();
  ad.show();
  ad.click();
}
