//es5类用法
{
  // 基本定义和生成实例
  class Parent{
    //构造函数
    constructor(name='mukewang'){
      this.name=name;  //作为类的属性
    }
  }
  let v_parent=new Parent('v');
  console.log('构造函数和实例',v_parent);
}

{
  // 继承
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }

  class Child extends Parent{

  }

  console.log('继承',new Child()); //打印父类的属性
}

{
  // 继承传递参数
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }

  class Child extends Parent{
    constructor(name='child'){
      super(name); //子类传递参数,覆盖父类默认值，super放在构造函数第一行
      this.type='child'; //若子类增加自己属性，调用this要放在super之后
    }
  }

  console.log('继承传递参数',new Child('hello'));//输出 hello,child
}

{
  // 类中的getter,setter
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    get longName(){   //这里是属性longName定义而不是方法
      return 'mk'+this.name
    }

    set longName(value){
      this.name=value;
    }
  }

  let v=new Parent();
  console.log('getter',v.longName);  //属性读取
  v.longName='hello';
  console.log('setter',v.longName);  //属性修改
}

{
  // 类的静态方法,都是挂载在类上的
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){    //定义的静态方法，通过类调用
      console.log('tell');
    }
  }

  Parent.tell();

}

{
  // 静态属性，先定义Parent 类
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){
      console.log('tell');
    }  
  }
  //然后给类直接添加静态属性并赋值
  Parent.type='test';
  console.log('静态属性',Parent.type);

}
