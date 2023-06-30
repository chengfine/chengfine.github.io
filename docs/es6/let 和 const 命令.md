	## let 命令
	---
	用来声明变量，类似于 `var` ，但是所声明的变量只在 `let` 命令所在的代码块内有效 (块级作用域)
	
	```javascript
	{
		let a = 10;
		var b = 100;
	}
	a // ReferenceError: a is not defined
	b // 100
	```
	>  上面代码在代码块中，用 `var` 和 `let` 声明两个变量，最后在代码块外面调用，结果 `var` 声明的变量返回正确值，`let` 直接报错。说明，`let` 声明的变量只在它所在的代码块有效。
	
	```javascript
	经典案例：for 循环
	for (let i = 0; i < 10; i++) {
	  // ...
	}
	console.log(i);// ReferenceError: i is not defined
	```
	
	> 上面代码中，计数器 `i` 只在 `for` 循环体内有效，在循环体外就报错。
	
	```javascript
	var a = [];
	for (var i = 0; i < 10; i++) {
	  a[i] = function () {
	    console.log(i);
	  };
	}
	a[6](); // 10
	```
	> 上面的代码，变量 `i` 是 `var` 命令声明的，在全局范围都有效，所以全局只有一个变量 `i`。每一次循环，变量 `i` 的值到会发生改变，而循环内被赋给数组 `a` 的函数内部的 `console.log(i)`，里面的 `i`  都会变