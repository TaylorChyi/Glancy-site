# Glancy 网站

此仓库包含 Glancy 电子词典官网的前端代码，采用 React + Vite 构建。

## 部署方式

通过 GitHub Actions 自动构建并将生成的静态文件同步到云服务器。你需要在仓库的 `Settings -> Secrets and variables -> Actions` 中设置以下几个 Secret：

- `DEPLOY_HOST`：服务器地址
- `DEPLOY_USER`：登录用户名
- `DEPLOY_KEY`：对应用户的私钥
- `DEPLOY_PATH`：文件同步到服务器上的目标目录

每次向 `main` 分支或以 `feature-` 开头的分支推送代码时，`部署到云服务器` 工作流程都会自动执行。
