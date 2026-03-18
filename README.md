# MarkNice

Markdown / Word 转微信公众号排版格式的 Web 应用。

## 功能

- 粘贴或上传 Markdown（`.md / .markdown / .txt`），实时预览转换结果
- 导入 Word 文档（`.docx`），自动识别标题编号、有序/无序列表、合并单元格表格、OMML 数学公式、图片、文本格式
- 数学公式通过 KaTeX 渲染为 HTML
- 11 种公众号排版主题：简洁、雅致、科技、教育、新闻、杂志、琥珀橙、活力紫、极简留白、复古专栏、暗夜霓虹
- 字号与段距自由调节
- 一键复制富文本（`text/html` + `text/plain`），直接粘贴到公众号编辑器
- 另存为 HTML 文件
- 桌面 / 手机预览模式切换
- 深色 / 浅色主题，支持跟随系统
- 移动端触屏优化

## 项目结构

```text
marknice/
├── index.html            # 入口页面
├── src/
│   ├── main.js           # 业务逻辑（转换、模板、复制、Word 导入、HTML 导出）
│   ├── docx-parser.js    # 自定义 DOCX 解析器（编号、合并单元格、公式、图片）
│   └── styles.css        # 页面样式（含移动端响应式）
└── README.md
```

## 外部依赖（CDN）

- [marked](https://github.com/markedjs/marked) — Markdown 解析
- [JSZip](https://stuk.github.io/jszip/) — DOCX 文件解压
- [KaTeX](https://katex.org/) — 数学公式渲染

## 本地预览

纯静态项目，用任意 HTTP 服务器打开即可：

```bash
# 1. Clone 仓库到本地并进入该目录
git clone https://github.com/willmove/marknice.git
cd marknice

# 2.使用 Python 内置HTTP服务器
python3 -m http.server 8080

# 2. 或使用 Node.js 的HTTP服务器
npx serve .
```

然后访问 `http://localhost:8080`。

## 部署

页面资源使用相对路径，可直接部署到任意静态托管服务。

手动同步示例：

```bash
sudo rsync -av --delete /path/to/marknice/ /var/www/marknice/
```

## 🤝 联系我们

如果您有任何建议、反馈或合作意向，欢迎通过以下方式联系我们：

- 📧 邮箱: willmove#163.com (# 替换为 @)
- 💬 GitHub: [https://github.com/willmove/]
- 📱 微信: [willmove]


**关注公众号**，分享更多 AI 产品实践技巧：

![alt text](qr_code.jpg)


