//es6 数据结构 主要分为map 以及set, set看成数组里面元素不能重复，map
//与object比较类似，map的key可以是任意类型如数组，对象， 而obj的key只能是字符串

//对数据结构比较复杂优先使用map,对数据唯一性才考虑set,放弃使用array,object

{
  let list = new Set();
  list.add(5);
  list.add(7);
  //打印元素的长度 ，输出2
  console.log('size',list.size);
}

{
  let arr = [1,2,3,4,5];
  //在初始化时进行对象赋值
  let list = new Set(arr);  //这里Set类似于函数传入参数arr

  console.log('size',list.size);
}

{
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);//重复元素无法添加进去，用于去重

  console.log('list',list);

  let arr=[1,2,3,1,'2'];
  let list2=new Set(arr);

  console.log('unique',list2); //去重特性，不会做数据类型转换， 2和字符串2不一样
}

{
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);

  //判断集合中是否有add元素，返回true
  console.log('has',list.has('add'));
  //删除add 返回true表示成功
  console.log('delete',list.delete('add'),list);
  //清空集合元素
  list.clear();
  console.log('list',list);
}

{
  //set集合的遍历
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);

  //keys 打印的是value值
  for(let key of list.keys()){
    console.log('keys',key);
  }
  //list.values() 与list 等价
  for(let value of list.values()){
    console.log('value',value);
  }
  for(let [key,value] of list.entries()){
    console.log('entries',key,value);
  }

  //for each遍历
  list.forEach(function(item){console.log(item);})
}


//weakset 的类型只能是对象类型，weakset的对象是弱引用，不能检测该对象是否引用在其它地方
//是地址拷贝，并不会检测该地址的有效性，没有size属性，clear , set ，不能遍历
{
  let weakList=new WeakSet();
  let arg={}; //空对象
  weakList.add(arg);
  // weakList.add(2);

  console.log('weakList',weakList);
}

//map集合讲解
{
  let map = new Map();
  let arr=['123'];

  map.set(arr,456); //map的key是任意类型

  console.log('map',map,map.get(arr)); //取arr变量作为key
}

{
  //数组中的元素还是数组 ，自动转换为 a :123 b : 456
  let map = new Map([['a',123],['b',456]]);
  console.log('map args',map);
  console.log('size',map.size); //size大小
  console.log('delete',map.delete('a'),map); //删除
  console.log('clear',map.clear(),map); //清空
}

//weakmap类型只能是对象，用法和weakset一样
{
  let weakmap=new WeakMap();

  let o={};
  weakmap.set(o,123);
  console.log(weakmap.get(o));
}

{
  // 数据结构横向对比，增，查，改，删
  //Map与array对比
  let map=new Map();
  let array=[];
  // 增
  map.set('t',1);
  array.push({t:1});

  console.info('map-array',map,array);

  // 查
  let map_exist=map.has('t');
  let array_exist=array.find(item=>item.t); //查找元素item对象中带t属性的值，返回的是对象
  console.info('map-array',map_exist,array_exist);

  // 改
  map.set('t',2); //map修改比较容易
  array.forEach(item=>item.t?item.t=2:'');
  console.info('map-array-modify',map,array);

  // 删
  map.delete('t');
  let index=array.findIndex(item=>item.t); //先查找对象包含 t属性的 索引位置
  array.splice(index,1); //根据索引位置进行删除
  console.info('map-array-empty',map,array);
}

{
  // set和array的对比
  let set=new Set();
  let array=[];

  // 增
  set.add({t:1});
  array.push({t:1});

  console.info('set-array',set,array);

  // 查
  let set_exist=set.has({t:1}); //这里是对象引用，输出是false,若引用对象定义存在上面直接用has()是可以查到的
  let array_exist=array.find(item=>item.t);
  console.info('set-array',set_exist,array_exist);

  // 改
  set.forEach(item=>item.t?item.t=2:''); //若item=>item.t存在,则修改item.t=2
  array.forEach(item=>item.t?item.t=2:'');
  console.info('set-array-modify',set,array);

  // 删
  set.forEach(item=>item.t?set.delete(item):''); //set.delete删除必须找到集合里面的值
  let index=array.findIndex(item=>item.t);
  array.splice(index,1);
  console.info('set-array-empty',set,array);
}

{
  // map,set,object对比
  let item={t:1};
  let map=new Map();
  let set=new Set();
  let obj={};

  // 增
  map.set('t',1);
  set.add(item);
  obj['t']=1;

  console.info('map-set-obj',obj,map,set);

  // 查
  console.info({
    map_exist:map.has('t'),
    set_exist:set.has(item),
    obj_exist:'t' in obj  //查询t返回true
  })

  // 改
  map.set('t',2);
  item.t=2;  //set存储的是引用，直接修改对象即可
  obj['t']=2; //obj中属性修改
  console.info('map-set-obj-modify',obj,map,set);

  // 删除
  map.delete('t');
  set.delete(item);  //set必须根据对象进行删除，若没有对象需要遍历一遍
  delete obj['t'];
  console.info('map-set-obj-empty',obj,map,set);
}
