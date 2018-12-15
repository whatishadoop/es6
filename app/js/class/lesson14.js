//Iterator 和for of 进行循环遍历 map,set,map,for of由不断调用interator循环实现
{
  let arr=['hello','world'];
  let map=arr[Symbol.iterator](); //数组自带iterator接口，[Symbol.iterator]()是方法名,arr是数组
  console.log(map.next()); //map有next方法  value：hello  done: false表示循环没有结束，，true表示截止
  console.log(map.next());
  console.log(map.next());
}

{
  //自定义实现object对象的iteroter接口，因为object里面对象解构无法知晓，所以要自己定义iterator接口，实现for of循环
  let obj={
    start:[1,3,2],
    end:[7,9,8],
    [Symbol.iterator](){  //声明intertor接口方法
      let self=this;
      let index=0;  //记住数组索引
      let arr=self.start.concat(self.end);  //concat数组合并，才能顺序输出
      let len=arr.length;  //记住数组长度
      return {  
        next(){  //返回一个对象，一定要定义next方法
          if(index<len){  //索引小于数组长度，返回数组值即可
            return {
              value:arr[index++], //一个是value值,index++ 索引加1
              done:false  //继续遍历
            }
          }else{
            return {
              value:arr[index++],
              done:true  //遍历结束
            }
          }
        }
      }
    }
  }
  //使用for of进行测试obj遍历
  for(let key of obj){
    console.log(key);
  }
}

//for of 遍历
{
  let arr=['hello','world'];
  for(let value of arr){
    console.log('value',value);
  }
}
