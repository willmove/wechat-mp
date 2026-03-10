# wechat-mp

Markdown 转微信公众号编辑器兼容格式的 Web 应用。

## 项目结构

```text
wechat-mp/
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
cd /root/.openclaw/workspace/projects/wechat-mp
python3 -m http.server 8080
# 然后访问 http://127.0.0.1:8080
```

## 部署说明

当前线上目录：

- `/var/www/wechat-mp`

说明：页面内置了自动 base-path 识别逻辑，会根据当前 URL 自动拼接资源路径，因此既可直接本地静态预览，也可部署到 `/wechat-mp` 这类子路径下访问。

发布方式（手动同步）：

```bash
sudo rsync -av --delete /root/.openclaw/workspace/projects/wechat-mp/ /var/www/wechat-mp/
```

> 注意：线上 Caddy 已配置 `https://app.willmove.cn/wechat-mp`。
