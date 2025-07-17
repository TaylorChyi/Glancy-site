# 格律词典网站

此仓库包含格律词典前端代码，采用 React + Vite 构建。

## 部署方式

通过 GitHub Actions 自动构建并将生成的静态文件同步到云服务器。你需要在仓库的 `Settings -> Secrets and variables -> Actions` 中设置以下几个 Secret：

- `DEPLOY_HOST`：服务器地址
- `DEPLOY_USER`：登录用户名
- `DEPLOY_KEY`：对应用户的私钥
- `DEPLOY_PATH`：文件同步到服务器上的目标目录

每次向 `main` 分支或以 `feature-` 开头的分支推送代码时，`部署到云服务器` 工作流程都会自动执行。

前端构建完成后只需将 `dist` 目录同步到服务器，通过 Nginx 托管即可。示例配置见 `nginx.conf.example`，后端服务独立运行在 `8080` 端口，通过 `/api` 前缀与前端通信。

## 版本管理

项目版本号记录在 `glancy-site/package.json` 中，采用 `主.次.补丁` 的格式。
默认每次合并后请将补丁号加一；只有当次版本号变化时，`deploy.yml` 工作流程才会执行自动部署。

开发环境下需要在 `vite.config.js` 中开启代理并设置相对路径：

```js
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

## 常见问题

### HTTP 503 错误

如果访问站点时返回 `HTTP ERROR 503`，通常是服务器未正确提供静态文件导致。可以按以下步骤排查：

1. 确认 GitHub Actions 构建任务是否执行成功，`dist` 目录是否同步到了服务器。
2. 在服务器上进入项目目录，运行 `npm run build` 后执行 `npm start`，使用内置的 Node 服务临时验证页面是否可以正常访问。
3. 建议使用 Nginx 等 Web 服务器直接托管 `dist` 目录，避免 Node 服务异常导致 503。

## 登录界面

首页已新增用户登录表单，提交信息后会调用后端 `/api/users/login` 接口进行验证。

## 用户注册

注册页通过 `/api/users/register` 创建新账号。

## 用户列表与删除

`/users` 页面展示所有用户，数据来自 `GET /api/users`。在列表中点击删除会调用
`DELETE /api/users/{id}`。

## 个人资料编辑

`/profile` 页面通过 `GET /api/users/profile` 载入信息，提交表单时向
`POST /api/users/profile` 上传昵称和头像；同时可点击绑定按钮触发
`/api/bind/third-party` 完成第三方账号绑定。

## 偏好设置

`/preferences` 先从 `GET /api/preferences` 获取当前配置，保存时发送
`POST /api/preferences`。

## 词汇查询

`/search` 调用 `/api/words?word=xxx` 获取单词释义，点击播放按钮则访问
`/api/words/audio?word=xxx` 播放语音。

## 通知中心

`/notifications` 页面通过 `GET /api/notifications` 获取通知列表，标记已读时调
用 `POST /api/notifications/{id}`。

## FAQ 页面

`/faq` 通过 `GET /api/faqs` 拉取常见问题内容。

## 联系表单

`/contact` 页面会把填写的信息提交到 `POST /api/contact`。

## 管理门户

管理员可在 `/portal/login` 使用 `/api/admin/login` 登录，登录后在 `/portal`
展示的统计数据来自 `GET /api/stats/users`。

## 服务状态

`/health` 页面会定期请求 `/api/ping` 检查服务是否可用。

## 用户总数

首页会调用 `/api/users/count` 显示当前注册人数，并提供刷新按钮重新获取。
