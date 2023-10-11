# 志同道合（伙伴匹配系统）

> 为大学生组队、交友等社交场景提供便利匹配的系统
>
> 该系统为H5移动端，Java + Vue 全栈项目
>
> 前端代码:[zqywuxie/Study_Partner_fronted: 志同道合(伙伴匹配系统前端代码) (github.com)](https://github.com/zqywuxie/Study_Partner_fronted)
>
> 后端代码:[zqywuxie/Study_Partner_backed: 志同道合(伙伴匹配系统后端代码) (github.com)](https://github.com/zqywuxie/Study_Partner_backed)

## 项目介绍

该系统为大学生提供一个方便的交友平台，用户可以设置自己的标签来快速的匹配与自己相符的伙伴，并且可以创建队伍来进行组队打比赛等。极大的减小了找寻合适的伙伴成本。



该项目后端采用主流的Java语言，适用spring boot框架快速搭建，前端采用Vue框架，适用Vant组件库进行搭建H5移动界面。采用单机架构开发，适用于小型应用程序，减少复杂性和维护成本，当然开发者可以选择进行微服务架构开发。



## 项目背景

目前QQ、Wechat等社交平台虽然也有类似的功能，但是不是很满足大学生的需求。并且通过王者荣耀的伙伴招募，组队等功能启发，决定开发出一个适用于大学生伙伴匹配的系统。目前大学生缺少竞赛组队、日常交友的渠道，如果经过他人介绍也会花很大成本去了解一个人，所以搭建一个伙伴匹配的平台，为大学生提供一个更方便，全面的交友组队平台。



## 技术栈

### 前端技术栈

- 开发框架：Vue
- 构建工具： Vite(比webpack速度要快)

- 组件库：Vant(移动端组件库)
- 语法拓展：typescript，less
- 代码规范：Prettier，Eslint

### 后端技术栈：

- 主语言：Java
- 框架：Springboot，ssm，mybatis-plus
- 数据库：Mysql8.0
- 缓存：Redis
- 项目管理工具：maven



## 快速上手

### 前端

环境要求：nodejs >= 14

~~~sh
git clone https://github.com/zqywuxie/Study_Partner_fronted.git
cd Study_Partner_fronted-master
~~~

安装依赖

```sh
yarn / npm install
```

启动项目

```sh
vite
```

或打开package.json，点击`scripts/dev` 旁边的箭头启动

## 功能模块

### 前端界面功能

- 用户、管理员
  - 登录，注册
  - 主页：(随机展示用户)，打开匹配模式后根据最短路径算法开始匹配
  - 队伍页：展示公开队伍，用户可以创建队伍
  - 搜索页：根据标签进行搜索
  - 个人页：个人信息的修改
  - 管理员：队伍管理（包括私密队伍）



### 后端模块

#### 配置信息修改

- 阿里云OSS配置

用于用户头像的上传

```yaml
aliyun:
  oss:
    file:
      endpoint:  xx
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





## 项目展示

![image-20230207145250862](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145250862.png)



2.主页(匹配模式) 当前登录用户标签进行匹配

![image-20230207145312139](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145312139.png)

3.队伍页

![image-20230207145337975](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145337975.png)



![image-20230207145347058](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145347058.png)

加入队伍

![image-20230207145418608](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145418608.png)



添加队伍



![image-20230207145436960](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145436960.png)



搜索用户(后续补充标签)

![image-20230207145504934](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145504934.png)



个人页

![image-20230207145551748](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145551748.png)



修改信息

![image-20230207145609833](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230207145609833.png)

已加队伍

![image-20230530210716063](https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/05/19/image-20230530210716063.png)
