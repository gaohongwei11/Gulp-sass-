<!--
 * @Description: 
 * @Author: GaoHongwei
 * @Date: 2020-04-12 18:05:38
 * @LastEditTime: 2020-04-15 11:43:51
 * @LastEditors: GaoHongwei
 -->
# gulp-sass
Gulp+sass 多页面脚手架，适用于多页面网站开发

# 配置项目基本目录结构

index.html文件可提取至pages同级目录，或者放在pages目录下都没问题，对应修改gulpfile.json内配置文件即可。

> |-gulp-lesson
> 
>     |-assets               -------   静态资源文件
> 
>         |-css                  -------   第三方css文件
> 
>         |-images               -------   项目图片文件
> 
>         |-js                   -------   第三方js文件
> 
>     |-js                   -------   自己的js文件
> 
>     |-lib                  -------   scss框架文件
> 
>         base.scss          -------   全局base定义，可以使用在任何地方
> 
>         classes.scss       -------   scss函数的定义
> 
>         function.scss      -------   自定义全局函数
> 
>         reset.scss         ------    重置mobile及高级浏览器上常见的异常
> 
>         variables.scss     ------    全局variables，基础变量map
> 
>     |-node_modules         -------   模块依赖文件
> 
>     |-scss                 -------   自己的scss文件
> 
>     |-pages                -------   项目结构文件
> 
>         detail.html         -------   详情页面   -----  吸顶效果、放大效果、详情介绍，加购物画车
> 
>         【index.html】          -------   首页       -----  菜单，楼梯效果，轮播图
> 
>         login.html          -------   登录页面   -----  必须表单验证，后天可用php验证
> 
>         register.html       -------   注册页面   -----  必须表单验证，后天可用php验证
> 
>     【index.html】          -------   首页       -----  菜单，楼梯效果，轮播图
> 
>     gulpfile.json           -------   gulp项目配置文件   
> 
>     package.json            -------   项目基础配置文件

# 执行项目

> 安装依赖
> 
> npm install
> 
> 启动服务
> 
> gulp