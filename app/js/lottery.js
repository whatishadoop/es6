import 'babel-polyfill';
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from './lottery/calculate.js';
import Interface from './lottery/interface.js';
import $ from 'jquery'; // 安装jquery --save-dev

//多重继承，需要深度拷贝方法 ，目标target  源对象source
const copyProperties=function(target,source){
  for(let key of Reflect.ownKeys(source)){ //映射用于object对象拿不到，Reflect.ownKeys获取所有属性
    if(key!=='constructor'&&key!=='prototype'&&key!=='name'){  //判断是否有构造，原型以及name,选择性拷贝
      let desc=Object.getOwnPropertyDescriptor(source,key);
      Object.defineProperty(target,key,desc); //es5方式实现深度拷贝
    }
  }
}

const mix=function(...mixins){
  class Mix{} //声明一个空的类
  for(let mixin of mixins){
    copyProperties(Mix,mixin); //实现深度拷贝对象
    copyProperties(Mix.prototype,mixin.prototype); //拷贝原型 
  }
  return Mix //返回类
}

//实现多个对象继承，传入不同的类
class Lottery extends mix(Base,Calculate,Interface,Timer){
  constructor(name='syy',cname='11选5',issue='**',state='**'){
    //super放在前面
    super(); 
    //下面是设置类属性并进行初始化
    this.name=name;
    this.cname=cname;
    this.issue=issue;
    this.state=state;
    this.el='';
    this.omit=new Map();
    this.open_code=new Set();
    this.open_code_list=new Set();
    this.play_list=new Map();
    this.number=new Set();
    this.issue_el='#curr_issue';
    this.countdown_el='#countdown';
    this.state_el='.state_el';
    this.cart_el='.codelist';
    this.omit_el='';
    this.cur_play='r5';
    //方法的初始化
    this.initPlayList();  //在base.js模块中
    this.initNumber();    //在base.js模块中
    this.updateState();
    this.initEvent();
  }

  /**
   * [updateState 状态更新]
   * @return {[type]} [description]
   */
  updateState(){
    let self=this;
    this.getState().then(function(res){
      self.issue=res.issue;
      self.end_time=res.end_time;
      self.state=res.state;
      $(self.issue_el).text(res.issue);
      self.countdown(res.end_time,function(time){
        $(self.countdown_el).html(time)
      },function(){
        setTimeout(function () {
          self.updateState();
          self.getOmit(self.issue).then(function(res){

          });
          self.getOpenCode(self.issue).then(function(res){

          })
        }, 500);
      })
    })
  }

  /**
   * [initEvent 初始化事件]
   * @return {[type]} [description]
   */
   //采用jquey方式绑定方法事件到当前对象上，避免在页面html上写方法
  initEvent(){
    let self=this;
    $('#plays').on('click','li',self.changePlayNav.bind(self));  
    $('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));
    $('#confirm_sel_code').on('click',self.addCode.bind(self));
    $('.dxjo').on('click','li',self.assistHandle.bind(self));
    $('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self));
  }
}

export default Lottery;
