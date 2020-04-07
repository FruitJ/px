# JS 作业(7) - 正式课(基础)

[TOC]

## 1. 读取一个字符串中出现最多的字符以及次数
```javascript
void(() => {
	let str = "gf56gf78g8f185w^e^r^djw";
	// 排序(相同的元素排在一起)
    str = [...str].sort((a,b) => a.localeCompare(b)).join("");
    // 将相同的元素按每项放在数组中
    let res = str.match(/([^])\1*/g);
    // 将 res 映射为每项长度组成的数组
    let sizes = res.map((item) => item.length);
    // 求出最大值
    let max = Math.max(...sizes);
    let indexs = [];
    // 找到相同的最大索引
    for(let i = 0; i < sizes.length; i++) {
        if(max === sizes[i]) {
            indexs.push(i);
        }
    }
    let result = [];
    // 获取最终结果
    indexs.forEach((item, index) => {

        result.push({
            element: res[item],
            count: num,
        });
    });
    console.log(result);
})();
```
![image.png](https://upload-images.jianshu.io/upload_images/16761151-c8a326b2922861fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/16761151-b816df4495f651a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2. 实现一个千分符函数
```javascript
void(() => {
	function util(str) {
	return str.replace(/\B(?=(\d{3})+\b)/mg, ',');
}
console.log(util("123")); // 123
console.log(util("1231")); // 1,231
console.log(util("123 456")); // 123 456
console.log(util("1234 78965")); // 1,234 78,965
console.log(util("1234\n78965")); // 1,234【\n此处换行了】78,965
console.log(util("123s")); // 123s
})();
```
![image.png](https://upload-images.jianshu.io/upload_images/16761151-63c177d49d356db1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3. 结合 splice 实现 queryParams
```javascript
let url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd=%22The%20apple%20is%20red%20!%22.replace(%2C%20)&rsv_spt=1&oq=%25E6%25AD%25A3%25E5%2588%2599%25E5%258C%25B9%25E9%2585%258D%252016%2520%25E8%25BF%259B%25E5%2588%25B6%25E9%25A2%259C%25E8%2589%25B2&rsv_pq=93149ff2000acb15&rsv_t=503d7jBJOz1VH7dJGaVX2g2gq3ufvn3HPGdK21yfoXohSTRdwhjr%2FxXQ0rVjO2EftNC9&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=3&rsv_sug1=1&rsv_sug7=001&rsv_n=2&rsv_sug2=0&inputT=1665964&rsv_sug4=1666347&rsv_sug=9#id';
void((prop) => {
	
	function queryParams() {
		let obj = {};
		this.replace(/([^#&?=]+)=([^#&?=]+)/g, (_, $1, $2) => obj[$1] = $2);
		this.replace(/#([^#&?=]+)/, (_, $1) => obj['HASH'] = $1);
		return obj;
	}
	
	prop.queryParams = queryParams;
})(String.prototype);
console.log(url.queryParams());
```
![image.png](https://upload-images.jianshu.io/upload_images/16761151-19e9c0573b16ab6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/16761151-e1e03872f67c8fa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 关于支持正则表达式的 4 个方法情况, 稍后会更新一篇博文会提及到这块, 博文发出时同步更新地址 :
地址 : 

