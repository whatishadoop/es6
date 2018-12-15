//正则扩展
{
    // #构造函数#
    let regex = new RegExp('xyz', 'i'); //es5写法,第一个参数是字符串，第二个是修饰符i忽略大小写
    let regex2 = new RegExp(/xyz/i); //es5写法,第一个参数是正则表达式，不接受第二个参数，否则会报错
    console.log(regex.test('xyz123'), regex2.test('xyz123'));//输出true,true
    console.log(regex.test('xyZ123'), regex2.test('xyZ123'));

    //es6写法，可以输入两个参数，输出i
    let regex3 = new RegExp(/abc/ig, 'i');
    console.log(regex3.flags); //原有正则对象的修饰符是ig，它会被第二个参数i覆盖, regex3.flags 是es6中获取正则表达式的属性值

}

// 字符串对象的4个使用正则表达式的方法： match(),replace(),search(),split()这四个方法全部调用RegExp的实例的方法。

{
    let regex = new RegExp('xyz', 'ig');
    console.log(regex.test('xyz0XYZ1xyz2'), regex.exec('xyz0XYZ1xyz2'));
}

//y，g修饰符讲解,它们都是全局匹配 g从下一个字符一次匹配，y从bbb下一个匹配不到就为null，上面ig是es5的修饰符
{
    // y修饰符
    let s = 'bbbb_bbb_bb_b';
    var a1 = /b+/g;
    var a2 = /b+/y;

    console.log(a1.exec(s), a2.exec(s)); // 匹配后输出 ["bbbb"],["bbbb"]
    console.log(a1.exec(s), a2.exec(s)); // ["bbb"],null

    console.log(a1.sticky, a2.sticky); //表示是否开启了粘连模式（即是否y修饰符模式），输出false,true
}

//u修饰符,unicode的缩写处理unicode的，
{
    console.log('u修饰符',/^\uD83D/.test('\uD83D\uDC2A')); // true ，若没加u表示当成两个字符
    console.log('u修饰符',/^\uD83D/u.test('\uD83D\uDC2A')); // false，加u表示当成一个字符，匹配不成功
    // 大括号表示Unicode字符，只有加上u才能识别
    console.log(/\u{61}/.test('a')); // false  不加u 不识别
    console.log(/\u{61}/u.test('a')); // true  \u{61}加了u修饰符表示unicode编码61  \u表示转义
    console.log(/\u{20BB7}/u.test('𠮷')); // true
 
    // 点（.）原来在正则表示匹配任意字符，此处字符不能识别码点大于0xFFFF的Unicode字符即两个字节就无法识别了，必须加上u修饰符才是原始用法。
    let s = '𠮷'; //对应值为20BB7大于 0xFFFF ，测试下面点（.）
    /*
    有^时匹配必须从字符串开头开始，如 正则 "^abc" 可以匹配"abcd" 但不能匹配"dabc"
    有$时最后一个字符必须在字符串结尾
    同时有^和$表示必须匹配整个字符串如正则"^abc$"匹配字符串"abc"，但不能匹配"abcd"
    */
    console.log('大于0xFFFF的Unicode字符',/^.$/.test(s)); // false
    console.log('使用u字符',/^.$/u.test(s)); // true    加上u 修饰符就可以了，因为大于两个字节也可以处理

    // 使用u修饰符后，所有量词都会正确识别大于码点大于0xFFFF的Unicode字符。
    console.log('量词',/a{2}/.test('aa')); // true
    console.log('量词',/a{2}/u.test('aa')); // true
    console.log('量词',/𠮷{2}/.test('𠮷𠮷')); // false
    console.log('量词',/𠮷{2}/u.test('𠮷𠮷')); // true
} 

{
    // #正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外
    // U+000A 换行符（\n）
    // U+000D 回车符（\r）
    // U+2028 行分隔符（line separator）
    // U+2029 段分隔符（paragraph separator）
    // 只是一个提案目前还不支持
    // let reg=/test.go/s;
    // console.log(reg.test('test\ngo'));
    // console.log(reg.test('test\ngo'));
    console.log('s变通方法',/foo.bar/.test('foo\nbar'));
    console.log('s变通方法',/foo[^]bar/.test('foo\nbar'));
}
