# Vue2 Admin Template

**依赖**

- vuex 官方状态管理
- vue-router 官方路由
- element-ui 饿了么出品的vue2.0 pc UI框架
- axios 一个现在主流并且很好用的请求库 支持Promise
- js-cookie 一个轻量的JavaScript库来处理cookie
- normalize.css 格式化css
- nprogress 轻量的全局进度条控制

## 项目目录

```
- root
|- public
|- src
    |- components // 公共组件
    |- mock       // 数据模拟
    |- router     // 路由
    |- store      // 数据
    |- utils      // 工具方法
    |- views      // 页面
    |- App.vue    // 根组件
    |- main.js
```

## 项目架构

### Mock 方法

使用 mockjs

### 一、权限控制实现

**登录流程**
- 登录成功，获取 token 并存储在 cookie 中（保证刷新页面后能记住用户的登录状态）
- 通过 token  拉取用户详细信息(用户权限，用户名，头像等)
- 权限验证: 通过 **role_code_list** 动态根据用户的 role 算出其对应有权限的路由, 通过 router.addRoutes 动态挂载路由


#### (1) 路由权限控制

#### (2) 侧边栏路由权限控制

#### (3) 按钮权限控制

#### (4) axios拦截器