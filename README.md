# Glancy 网站

此仓库包含 Glancy 电子词典官网的前端代码，采用 React + Vite 构建。

## 部署方式

通过 GitHub Actions 自动构建并将生成的静态文件同步到云服务器。你需要在仓库的 `Settings -> Secrets and variables -> Actions` 中设置以下几个 Secret：

- `DEPLOY_HOST`：服务器地址
- `DEPLOY_USER`：登录用户名
- `DEPLOY_KEY`：对应用户的私钥
- `DEPLOY_PATH`：文件同步到服务器上的目标目录

每次向 `main` 分支或以 `feature-` 开头的分支推送代码时，`部署到云服务器` 工作流程都会自动执行。

## 常见问题

### HTTP 503 错误

如果访问站点时返回 `HTTP ERROR 503`，通常是服务器未正确提供静态文件导致。可以按以下步骤排查：

1. 确认 GitHub Actions 构建任务是否执行成功，`dist` 目录是否同步到了服务器。
2. 在服务器上进入项目目录，运行 `npm run build` 后执行 `npm start`，使用内置的 Node 服务临时验证页面是否可以正常访问。
3. 建议使用 Nginx 等 Web 服务器直接托管 `dist` 目录，避免 Node 服务异常导致 503。

## 登录界面

首页已新增用户登录表单，提交信息后会调用后端 `/api/users/login` 接口进行验证。
