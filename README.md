# marknice

Markdown 转微信公众号编辑器兼容格式的 Web 应用。

## 项目结构

```text
marknice/
├── index.html          # 入口页面
├── src/
│   ├── main.js         # 业务逻辑（转换、模板、复制、清理样式）
│   └── styles.css      # 页面样式
├── assets/             # 静态资源目录（预留）
└── README.md
```

## 功能

- 粘贴或上传 Markdown（`.md/.markdown/.txt`）
- 转换为公众号可粘贴的内联样式 HTML
- 模板切换：简洁 / 科技 / 教育 / 新闻
- 一键复制（text/html + text/plain）
- 清理微信编辑器残留样式

## 本地预览

直接用静态服务器打开即可，例如：

```bash
cd /root/.openclaw/workspace/projects/marknice
python3 -m http.server 8080 # or python -m http.server 8080
# 然后访问 http://127.0.0.1:8080
```

## 部署说明

当前线上目录：

- `/var/www/marknice`

说明：页面资源使用相对路径，适合直接在项目目录下本地静态预览；如果部署到 `/marknice` 子路径，建议让 Web 服务器把整个项目目录映射到该路径。

发布方式（手动同步）：

```bash
sudo rsync -av --delete /path/to/your/projects/marknice/ /var/www/marknice/
```

> 注意：线上 Caddy 可配置 `https://app.yourdomain.com/marknice`。
