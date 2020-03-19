# JS作业(1) - 正式课(基础)
[TOC]
## 1. 写出下面代码的输出结果 :
### -1). 
```javascript
console.log(a); // undefined
var a = 12;
a = 13;
console.log(a); // 13
```

### -2). 
```javascript
console.log(a); // ReferenceError -> a is not defined
a = 13;
console.log(a);
```
=> 不带 var 的声明没有变量提升

### -3).
```javascript
console.log(a);
let a = 12;
a = 13;
console.log(a);
```
=> 不带 var 的声明和 let 声明都不会进行变脸提升

## 2. 写出下面代码输出的结果 （画图）
```javascript
console.log(a, b, c); // undefined undefined undefined
var a = 12,
    b = 13,
    c = 14;
function fn(a) {
    console.log(a, b, c); // 10, 13, 14
    a = 100;
    c = 200;
    console.log(a, b, c); // 100, 13, 200
}
b = fn(10);
console.log(a, b, c); // 12, undefined, 200
```
![第二题图片.png](https://upload-images.jianshu.io/upload_images/16761151-c638e369136e6411.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 3. 写出下面代码输出的结果 （画图）
```javascript
var ary = [12, 23];
function fn(ary) {
    console.log(ary); // [12, 23]
    ary[0] = 100;
    ary = [100];
    ary[0] = 0;
    console.log(ary); // [0]
}
fn(ary);
console.log(ary); // [100, 23]
```
![101.png](https://upload-images.jianshu.io/upload_images/16761151-b18214d009faef70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 4. 写出下面代码输出的结果 （画图）
```javascript
var i = 0;
function A() {
    var i = 10;
    function x() {
        console.log(i); 
    }
    return x;
}
var y = A();
y(); // // 10
function B() {
    var i = 20;
    y(); // // 10
}
B();
```
![第四题图片.png](https://upload-images.jianshu.io/upload_images/16761151-5beabb5efca564a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 5. 写出下面代码输出的结果 （画图）
```javascript
var a=1;
var obj ={
   "name":"tom"
}
function fn(){
   var a2 = a;  
   obj2 = obj;
   a2 =a;
   obj2.name =”jack”;
}
fn();
console.log(a); // 1
console.log(obj); // {name: "jack"}
```
![第五题图片.png](https://upload-images.jianshu.io/upload_images/16761151-eca278351dc6216e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 6. 写出下面代码输出的结果 （画图）
```javascript
var a = 1;
function fn(a){
    console.log(a)
    var a = 2;
    function a(){}
}
fn(a);
```
![第六题图片.png](https://upload-images.jianshu.io/upload_images/16761151-eae1bb064884db2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 7. 写出下面代码输出的结果 （画图）
### -1).
```javascript
console.log(a); // undefined
var a=12; 
function fn(){
    console.log(a); // undefined 
    var a=13;   
}
fn();   
console.log(a); // 12
```
![第七题第一问图片.png](https://upload-images.jianshu.io/upload_images/16761151-f076de798451e499.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### -2).
```javascript
console.log(a); // undefined    
var a=12;
function fn(){
    console.log(a); // 12
    a=13;
}
fn();
console.log(a); // 13
```
![第七题第二问图片.png](https://upload-images.jianshu.io/upload_images/16761151-f42bfad6269d20e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### -3).
```javascript
console.log(a); // 抛出 ReferenceError 异常
a=12;
function fn(){
    console.log(a);
    a=13;   
}
fn();
console.log(a);
```
![第七题第三问图片.png](https://upload-images.jianshu.io/upload_images/16761151-11fb45181d342a90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 8. 写出下面代码输出的结果 （画图）
```javascript
var foo=1; 
function bar(){
    if(!foo){
        var foo=10; 
    }
    console.log(foo);  // 10
}
bar();
```
![第八题图片.png](https://upload-images.jianshu.io/upload_images/16761151-0e3c6fe052999559.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 9. 写出下面代码输出的结果
```javascript
var a=10,b=11,c=12;
function test(a){
     a=1;
     var b=2;
     c=3;
}
test(10);
console.log(a); // 10  
console.log(b); // 11   
console.log(c); // 3
```

## 10. 写出下面代码输出的结果
```javascript
if(!("a" in window)){
   var a=1;
}
console.log(a); // undefined
```

## 11. 写出下面代码输出的结果
```javascript
var a=4;
function b(x,y,a) {    
     console.log(a); // 3 
     arguments[2]=10;        
     console.log(a); // 10
}
a=b(1,2,3);   
console.log(a); // undefined 
```

## 12. 写出下面代码输出的结果
```javascript
var foo='hello'; 
(function(foo){
   console.log(foo); // 'hello'
   var foo=foo||'world';  
   console.log(foo); // 'hello'
})(foo);
console.log(foo); // 'hello'
```
这道题, 主要是分析形参赋值与变量提升的时机, 上面有道画图题也考察了这个, 就是形参赋值要先于变量提升, 针对本题来说先是形参赋值，变量提升阶段忽略 var foo, 所以自执行函数中第一个打印处打印 'hello',  然后代码执行阶段执行到 var foo = foo || 'world' 时, 意思是如果 foo 现在是 undefined 我就给 foo 赋值 'world' 这其实是 ES5 及之前为函数设置默认值的方式, 但此前已经形参赋值是 a = 'hello', 所以自执行函数内第二个打印处也打印 'hello'。
 
小注 : 第二题与第三题的图片由于种种原因不清楚一点, 但是后面的图片都是清晰的!