//字符串用法， 安装babel-polyfill库，支持es7的相关方法 ,在index.js中 import 'babel-polyfill' 库 测试lesson4

{
  console.log('a',`\u0061`); //打印unicode编码，输出 a,a ，此时单个字节
  console.log('s',`\u20BB7`);  //打印码值超过两个字节字母时，打印s,输出乱码
 
  console.log('s',`\u{20BB7}`);  //es6上面必须用{}让整体作为一个字符编码,输出一个字符
}


{ 
  let s='𠮷';
  /*
  UTF-8, 都是由 1~4 字节组成的，有规则的， 至于是多少字节， 是根据第一个字节的内容判断的。
   UNICODE 是一个超集， 内包含 UTF-8， UTF-16， UTF-32， UTF-8 最少 1 字节
   参看 彻底弄懂 Unicode 编码
  */
  //如下是es5用法
  console.log('length',s.length); //输出2
  console.log('0',s.charAt(0)); //取一个位置字符
  console.log('1',s.charAt(1));
  console.log('at0',s.charCodeAt(0));  //取一个位置字符unicode位置码值，取两个字节
  console.log('at1',s.charCodeAt(1));

  //如下是es6用法
  let s1='𠮷a';
  console.log('length',s1.length); //3
  console.log('code0',s1.codePointAt(0)); //获取第一个位置码值 10进制显示 ，codePointAt 取四个字节
  console.log('code0',s1.codePointAt(0).toString(16)); //16进制显示
  console.log('code1',s1.codePointAt(1)); 
  console.log('code2',s1.codePointAt(2));
}

{
  console.log(String.fromCharCode("0x20bb7")); //es5方法，只能处理两个字节
  console.log(String.fromCodePoint("0x20bb7")); //es6方法，能处理大于两个字节unicode字符
}

//字符串遍历器接口
{
  let str='\u{20bb7}abc';
  for(let i=0;i<str.length;i++){  //es5遍历方式，遍历乱码 ,{20bb7}abc 属于unicode编码包括中文和字符(ascii),utf-8规则是unicode规范中一种，{20bb7}让整体作为一个字符编码
    console.log('es5',str[i]);
  }
  for(let code of str){   //es6遍历方式 ，正常输出
    console.log('es6',code);
  }
}

{
  let str="string";
  console.log('includes',str.includes("c"));
  console.log('start',str.startsWith('str'));
  console.log('end',str.endsWith('ng')); 
}

{
  let str="abc";
  console.log(str.repeat(2)); //重复两边
}

//模板字符串
{
  let name="list";
  let info="hello world";
  let m=`i am ${name},${info}`;
  console.log(m);
}

//es7语法，加bacelpoly库支持
{
  console.log('1'.padStart(2,'0')); //共两位，不足 补0， 01
  console.log('1'.padEnd(2,'0'));  //输出 10
}

//标签模板知识,输出   
//1.防止xss攻击时用这个处理
//2.处理多语言转换function abc 中处理
{
  let user={
    name:'list', 
    info:'hello world'
  };
  console.log(abc`i am ${user.name},${user.info}`);
  function abc(s,v1,v2){  //对输入的数据(i am,list,hello world)进行逻辑转换
    console.log(s,v1,v2);
    return s+v1+v2
  }
}

{
  console.log(String.raw`Hi\n${1+2}`);  //原始输出，在\前多加了\ 转义不生效
  console.log(`Hi\n${1+2}`);  //进行转义
}
