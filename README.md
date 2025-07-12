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

如果访问站点时返回 `HTTP ERROR 503`，通常是服务器未正确提供静态文件导致。可以按以下步骤排查并定位问题：

1. 确认 GitHub Actions 构建任务执行成功，`dist` 目录已同步到服务器。
2. 在服务器上运行 `npm run build && npm start`，通过内置的 Node 服务验证页面能否正常访问。
3. 如果 Node 服务可访问但通过域名仍返回 503，检查 Nginx 配置是否指向正确的 `dist` 路径，并查看 `/var/log/nginx/error.log` 是否有报错信息。
4. Nginx 示例配置：

   ```nginx
   server {
     listen 80;
     server_name glancy.xyz;
     root /path/to/dist;
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

5. 调整配置并重载 Nginx 后再次访问页面，确认问题是否解决。
