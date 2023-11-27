<p align="center">
<img src="https://wuxie-image.oss-cn-chengdu.aliyuncs.com/logo.png"/>
</p>
<h1 align="center"> 志同道合（伙伴匹配系统）</h1>
<div align="center">
    <img alt="Maven" src="https://raster.shields.io/badge/Maven-3.8.1-red.svg"/>
   <img alt="SpringBoot" src="https://raster.shields.io/badge/SpringBoot-2.67+-green.svg"/>
  <a href="https://github.com/qimu666/qi-api-sdk" target="_blank"><img src='https://img.shields.io/github/forks/zqywuxie/Study_Partner_backed' alt='GitHub forks' class="no-zoom"></a>
  <a href="https://github.com/qimu666/qi-api-sdk" target="_blank"><img src='https://img.shields.io/github/stars/zqywuxie/Study_Partner_backed' alt='GitHub stars' class="no-zoom"></a>
</div>

> 为大学生组队、交友等社交场景提供便利匹配的系统
>
> 该系统为H5移动端，SpringBoot + Vue 全栈项目
> 
> 前端代码:[zqywuxie/Study_Partner_fronted: 志同道合(伙伴匹配系统前端代码) (github.com)](https://github.com/zqywuxie/Study_Partner_fronted)
>
> 后端代码:[zqywuxie/Study_Partner_backed: 志同道合(伙伴匹配系统后端代码) (github.com)](https://github.com/zqywuxie/Study_Partner_backed)

## 项目介绍

该系统为**大学生**提供一个方便的交友平台，用户可以设置自己的标签来快速的匹配与自己相符的伙伴，并且可以创建队伍来进行组队打比赛等。极大的减小了找寻合适的伙伴成本。

该项目后端采用主流的Java语言，适用spring
boot框架快速搭建，前端采用Vue框架，适用Vant组件库进行搭建H5移动界面。采用单机架构开发，适用于小型应用程序，减少复杂性和维护成本，当然开发者可以选择进行微服务架构开发。

## 项目背景

目前QQ、Wechat等社交平台虽然也有类似的功能，但是不是很满足大学生的需求。并且通过王者荣耀的伙伴招募，组队等功能启发，决定开发出一个适用于大学生伙伴匹配的系统。目前大学生缺少竞赛组队、日常交友的渠道，如果经过他人介绍也会花很大成本去了解一个人，所以搭建一个伙伴匹配的平台，为大学生提供一个更方便，全面的交友组队平台。

## 技术栈

### 前端技术栈

- 开发框架：
    - Vue: 前端JavaScript框架，用于构建用户界面。
- 构建工具：
    - Vite: 用于构建、打包和开发前端项目的工具，相较于Webpack更快的构建速度。
- 组件库：
    - Vant: 移动端UI组件库，提供丰富的移动端UI组件，方便快速构建响应式移动应用。
- 语法拓展：
    - TypeScript: JavaScript的超集，添加了静态类型支持，提高了代码的可维护性和安全性。
    - Less: CSS预处理器，增强了CSS的编写和维护能力，支持变量、嵌套、混合等特性。
- 代码规范：
    - Prettier: 代码格式化工具，用于保持代码风格的一致性，自动格式化代码。
    - ESLint: JavaScript和TypeScript代码静态分析工具，用于发现和修复代码中的问题，强制代码规范。

### 后端技术栈：

- 主语言：
  Java
- 框架：
    - Spring Boot: 用于快速构建基于Spring的应用程序。
    - SSM（Spring + SpringMVC + MyBatis）: 传统的JavaWeb开发框架，整合了Spring、SpringMVC和MyBatis。
    - MyBatis-Plus: 在MyBatis基础上的增强工具，简化MyBatis的使用。
- 数据库：
    - MySQL 8.0: 关系型数据库，用于持久化数据。
- 缓存：
    - Redis: 内存缓存数据库，用于缓存数据，提高系统性能。
- 项目管理工具：
    - Maven: 项目管理和构建工具，用于统一管理项目的依赖、构建和部署。
- 其他技术和库：
    - HanLP: 自然语言处理库，用于中文分词、词性标注等。
    - Quartz: 用于任务调度和定时任务管理。
    - Alibaba Cloud OSS: 用于操作阿里云对象存储服务。
    - Knife4j: 基于Swagger的API文档生成工具。
    - Spring Session Data Redis: Spring框架对Redis的Session支持。
    - Redission: Redis分布式锁等功能的Java客户端。
    - Jakarta Mail (formerly JavaMail): 用于发送邮件的Java API。

## 快速上手

### 前端

1. 环境要求：nodejs >= 14

~~~sh
git clone https://github.com/zqywuxie/Study_Partner_fronted.git
cd Study_Partner_fronted-master
~~~

2. 安装依赖

```sh
yarn / npm install
```

3. 启动项目

```sh
vite
```

或打开package.json，点击`scripts/dev` 旁边的箭头启动

### 后端

1. 环境要求：JDK1.8,SpringBoot 2.3.7.RELEASE,Maven 3.8.1

注：不要轻易更改依赖版本，否则会导致错误

~~~sh
git clone https://github.com/zqywuxie/Study_Partner_backed.git
cd Study_Partner_fronted-master
~~~

2. 使用IDEA插件，`maven-helper`快速安装相关依赖
3. 找到StudyPartnerApplication 启动项目
4. 可在application.yml修改启动端口

```yaml
server:
  port: 8081
```



## 功能模块

### 前端界面功能

登录，注册

- (支持账号密码登录，邮箱登录)
- 后期接入QQ，微信登录 （待完善）

主页

- (随机展示用户)，打开匹配模式后根据编辑距离算法开始匹配
- 博客广场，查看博客

博客模块

- 评论，点赞(评论，博客)
- 发布博客

消息模块

- 根据新增评论，点赞，好友申请，关注给出消息数量提示

聊天模块

- 支持私聊，群聊，公共群聊

队伍模块

- 展示队伍，包含公开私密队伍
- 创建队伍
- 进入群聊

搜索模块

- 根据标签进行搜索用户
- 搜索队伍(待完成)
- 搜索标签的唯一性，比如性别年级只能选择一个(待完善)

个人信息模块

- 个人信息的修改
- 查看创建，加入的队伍；我的博文；好友列表；关注列表

管理员

- 考虑新写一个移动端或者PC端管理(待完善)

### 后端模块

#### 配置信息修改

- 阿里云OSS配置

用于用户头像的上传

```yaml
aliyun:
  oss:
    file:
      endpoint: xx
      keyid: xx
      keysecret: xx
      bucketname: xx
```

- 数据库配置

```yaml
  datasource:
    username: root
    password: wszqy123.
    # 
    url: jdbc:mysql://xxxx:3306/usercenter?useSSL=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
```

- Redis配置

```yaml
  redis:
    password: xx
    port: 6379
    host: xx
    database: 1
```

- server配置

```yaml
# 统一前缀 /api
server:
  servlet:
    context-path: /api
    # 定义cookie的域
    session:
      cookie:
        domain: localhost
        secure: true
```

- 邮箱功能配置

```yaml
  mail:
    # 配置SMTP服务器地址
    host: smtp.163.com
    # 配置端口号465或者25
    port: 25
    # 发送者邮箱（根据自己邮箱填写）
    username: xxx
    #  配置密码，注意是开启POP3/SMTP的授权密码(根据自己的授权密码填写)
    password: xxx

    properties:
      mail:
        smtp:
          auth: true
          enable: true
          ssl:
            # 设为true时 端口号设为 465 设为false时 端口号设为25
            # 注如果使用https域名，要设置为true
            enable: false
          socketFactoryClass: javax.net.ssl.SSLSocketFactory
        #表示开启 DEBUG 模式，这样，邮件发送过程的日志会在控制台打印出来，方便排查错误
        debug: true
    # 邮箱编码格式
    default-encoding: UTF-8
```



## 软硬件资源

- JDK
- IDEA
- tomcat
- nodejs，npm
- 浏览器
- 数据库（MySQL），缓存服务器（redis）

部署上线

- 阿里云服务器 （购买 100/年）
- 阿里云OSS存储
- 域名 （9/年）

## 部署

![image-20230918190150746](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/017/image-20230918190150746.png)

![image-20230918190324669](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/017/image-20230918190324669.png)

![image-20230918190451956](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/017/image-20230918190451956.png)

如果前端要进行跳转路由，就在配置文件里面添加如下代码

![image-20230918190546133](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/017/image-20230918190546133.png)

```nginx
location / {
    try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
    index  index.html index.htm;
}
#对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
#因此需要rewrite到index.html中，然后交给路由在处理请求资源
location @router {
    rewrite ^.*$ /index.html last;
}
```

## 项目展示

### 登录注册

![image-20231127164343353](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164343353.png)

![image-20231127164356455](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164356455.png)

![image-20231127164418067](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164418067.png)

### 主页

![image-20231127164445227](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164445227.png)

![image-20231127164519077](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164519077.png)

### 博文模块

![image-20231127164537135](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164537135.png)

![image-20231127164607046](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164607046.png)

### 队伍模块

![image-20231127164625763](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164625763.png)

![image-20231127164634323](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164634323.png)

### 消息模块

![image-20231127164655083](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164655083.png)

### 聊天模块

![image-20231127164714680](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164714680.png)

### 个人信息模块

![image-20231127164734415](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164734415.png)

![image-20231127164753055](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/image-20231127164753055.png)