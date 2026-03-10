const markdownEl = document.getElementById('markdown');
const previewEl = document.getElementById('preview');
const statusEl = document.getElementById('status');
const fileInput = document.getElementById('fileInput');

marked.setOptions({ breaks: true, gfm: true });

const styleMap = {
  h1: 'font-size:26px;line-height:1.6;font-weight:700;margin:24px 0 16px;color:#111;',
  h2: 'font-size:22px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#111;',
  h3: 'font-size:19px;line-height:1.6;font-weight:700;margin:20px 0 12px;color:#222;',
  h4: 'font-size:17px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#222;',
  h5: 'font-size:16px;line-height:1.6;font-weight:700;margin:14px 0 8px;color:#333;',
  h6: 'font-size:15px;line-height:1.6;font-weight:700;margin:12px 0 8px;color:#333;',
  p: 'font-size:16px;line-height:1.85;margin:10px 0;color:#222;text-align:justify;',
  blockquote: 'margin:14px 0;padding:10px 14px;border-left:4px solid #3e7bfa;background:#f4f7ff;color:#3a4a77;font-size:15px;line-height:1.8;',
  ul: 'margin:10px 0 10px 0;padding-left:24px;line-height:1.85;color:#222;font-size:16px;',
  ol: 'margin:10px 0 10px 0;padding-left:24px;line-height:1.85;color:#222;font-size:16px;',
  li: 'margin:6px 0;',
  a: 'color:#276ef1;text-decoration:none;border-bottom:1px solid #8eb2ff;',
  img: 'max-width:100%;display:block;margin:16px auto;border-radius:6px;',
  pre: 'background:#f6f8fa;border:1px solid #e2e8f0;border-radius:8px;padding:12px;overflow:auto;line-height:1.6;font-size:14px;',
  code: 'background:#f1f4f8;padding:2px 5px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;',
  table: 'border-collapse:collapse;width:100%;margin:12px 0;font-size:14px;',
  th: 'border:1px solid #d9e2f0;padding:8px;background:#f7faff;text-align:left;',
  td: 'border:1px solid #d9e2f0;padding:8px;',
  hr: 'border:none;border-top:1px solid #dbe3ef;margin:24px 0;'
};

function applyInlineStyles(container) {
  Object.entries(styleMap).forEach(([tag, style]) => {
    container.querySelectorAll(tag).forEach(el => {
      const prev = el.getAttribute('style') || '';
      el.setAttribute('style', prev ? `${prev};${style}` : style);
    });
  });
}

function sanitizeForWechat(html) {
  const doc = new DOMParser().parseFromString(`<section>${html}</section>`, 'text/html');
  const root = doc.body.firstElementChild;
  root.setAttribute('style', 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#222;');

  root.querySelectorAll('script,style,iframe,object,embed').forEach(n => n.remove());
  root.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      const n = attr.name.toLowerCase();
      if (n.startsWith('on') || n === 'class' || n === 'id') el.removeAttribute(attr.name);
    });
  });

  applyInlineStyles(root);
  return root.outerHTML;
}

function render() {
  const md = markdownEl.value || '';
  const rawHtml = marked.parse(md);
  const html = sanitizeForWechat(rawHtml);
  previewEl.innerHTML = html;
  previewEl.dataset.html = html;
  statusEl.textContent = md.trim() ? '已转换' : '';
}

async function copyRichHtml(html) {
  if (navigator.clipboard && window.ClipboardItem) {
    const blobHtml = new Blob([html], { type: 'text/html' });
    const blobText = new Blob([previewEl.innerText], { type: 'text/plain' });
    await navigator.clipboard.write([new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })]);
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(previewEl);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  document.execCommand('copy');
  sel.removeAllRanges();
}

document.getElementById('convertBtn').addEventListener('click', render);
markdownEl.addEventListener('input', () => {
  clearTimeout(window.__renderTimer);
  window.__renderTimer = setTimeout(render, 250);
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  const html = previewEl.dataset.html || '';
  if (!html.trim()) {
    statusEl.textContent = '请先输入并转换内容';
    return;
  }
  try {
    await copyRichHtml(html);
    statusEl.textContent = '复制成功，可去公众号编辑器粘贴';
  } catch (e) {
    statusEl.textContent = '复制失败，请手动全选预览区复制';
  }
});

document.getElementById('sampleBtn').addEventListener('click', () => {
  markdownEl.value = `# 公众号排版标题\n\n这是一段**正文**，用于测试粘贴到微信公众号编辑器后的样式。\n\n## 二级标题\n\n- 列表项一\n- 列表项二\n\n> 这是引用区块，可以用于金句或重点提示。\n\n\`\`\`js\nconsole.log('hello wechat');\n\`\`\`\n\n[一个链接](https://mp.weixin.qq.com)`;
  render();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  markdownEl.value = '';
  previewEl.innerHTML = '';
  previewEl.dataset.html = '';
  statusEl.textContent = '';
});

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  markdownEl.value = text;
  render();
});

render();
