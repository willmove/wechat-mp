const markdownEl = document.getElementById('markdown');
const previewEl = document.getElementById('preview');
const statusEl = document.getElementById('status');
const fileInput = document.getElementById('fileInput');
const themeSelect = document.getElementById('themeSelect');
const fontScaleSelect = document.getElementById('fontScaleSelect');
const modeToggleBtn = document.getElementById('modeToggleBtn');

marked.setOptions({ breaks: true, gfm: true });

const themes = {
  simple: {
    section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#222;',
    styles: {
      h1: 'font-size:24px;line-height:1.6;font-weight:700;margin:24px 0 16px;color:#111;',
      h2: 'font-size:20px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#111;',
      h3: 'font-size:17px;line-height:1.6;font-weight:700;margin:20px 0 12px;color:#222;',
      h4: 'font-size:15px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#222;',
      h5: 'font-size:14px;line-height:1.6;font-weight:700;margin:14px 0 8px;color:#333;',
      h6: 'font-size:13px;line-height:1.6;font-weight:700;margin:12px 0 8px;color:#333;',
      p: 'font-size:14px;line-height:1.85;margin:10px 0;color:#222;text-align:justify;',
      blockquote: 'margin:14px 0;padding:10px 14px;border-left:4px solid #3e7bfa;background:#f4f7ff;color:#3a4a77;font-size:13px;line-height:1.8;',
      ul: 'margin:10px 0;padding-left:24px;line-height:1.85;color:#222;font-size:14px;',
      ol: 'margin:10px 0;padding-left:24px;line-height:1.85;color:#222;font-size:14px;',
      li: 'margin:6px 0;',
      a: 'color:#276ef1;text-decoration:none;border-bottom:1px solid #8eb2ff;',
      img: 'max-width:100%;display:block;margin:16px auto;border-radius:6px;',
      pre: 'background:#f6f8fa;border:1px solid #e2e8f0;border-radius:8px;padding:12px;overflow:auto;line-height:1.6;font-size:12px;',
      code: 'background:#f1f4f8;padding:2px 5px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;',
      table: 'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',
      th: 'border:1px solid #d9e2f0;padding:8px;background:#f7faff;text-align:left;',
      td: 'border:1px solid #d9e2f0;padding:8px;',
      hr: 'border:none;border-top:1px solid #dbe3ef;margin:24px 0;'
    }
  },
  tech: {
    section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#1a2433;',
    styles: {
      h1: 'font-size:25px;line-height:1.55;font-weight:800;margin:26px 0 16px;color:#0b3b8b;border-bottom:2px solid #dce9ff;padding-bottom:8px;',
      h2: 'font-size:21px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#1456c5;',
      h3: 'font-size:17px;line-height:1.6;font-weight:700;margin:18px 0 10px;color:#1d3f6f;',
      h4: 'font-size:15px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#1d3f6f;',
      p: 'font-size:14px;line-height:1.9;margin:10px 0;color:#1f2d3d;text-align:justify;',
      blockquote: 'margin:14px 0;padding:12px 14px;border-left:4px solid #5b8dff;background:#f5f8ff;color:#2a4f8a;font-size:13px;line-height:1.85;',
      ul: 'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f2d3d;font-size:14px;',
      ol: 'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f2d3d;font-size:14px;',
      li: 'margin:6px 0;',
      a: 'color:#1456c5;text-decoration:none;border-bottom:1px dashed #7aa2ff;',
      img: 'max-width:100%;display:block;margin:18px auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.08);',
      pre: 'background:#eef6ff;color:#1b3f75;border:1px solid #cfe2ff;border-radius:8px;padding:12px;overflow:auto;line-height:1.65;font-size:12px;',
      code: 'background:#eef4ff;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#174ea6;',
      table: 'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',
      th: 'border:1px solid #d3e3ff;padding:8px;background:#edf3ff;text-align:left;color:#1d3f6f;',
      td: 'border:1px solid #d3e3ff;padding:8px;',
      hr: 'border:none;border-top:1px solid #dce6ff;margin:24px 0;'
    }
  },
  edu: {
    section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#2b2b2b;',
    styles: {
      h1: 'font-size:25px;line-height:1.6;font-weight:800;margin:24px 0 16px;color:#2e5b1f;',
      h2: 'font-size:21px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#3f7f2f;',
      h3: 'font-size:17px;line-height:1.6;font-weight:700;margin:18px 0 10px;color:#4a6b2f;',
      h4: 'font-size:15px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#4a6b2f;',
      p: 'font-size:14px;line-height:1.95;margin:10px 0;color:#2f2f2f;text-align:justify;',
      blockquote: 'margin:14px 0;padding:12px 14px;border-left:4px solid #7abf45;background:#f6fbef;color:#486a30;font-size:13px;line-height:1.85;',
      ul: 'margin:10px 0;padding-left:24px;line-height:1.9;color:#2f2f2f;font-size:14px;',
      ol: 'margin:10px 0;padding-left:24px;line-height:1.9;color:#2f2f2f;font-size:14px;',
      li: 'margin:6px 0;',
      a: 'color:#3f7f2f;text-decoration:none;border-bottom:1px solid #9fd57a;',
      img: 'max-width:100%;display:block;margin:16px auto;border-radius:6px;',
      pre: 'background:#f6f8f0;border:1px solid #d8e6c6;border-radius:8px;padding:12px;overflow:auto;line-height:1.6;font-size:12px;',
      code: 'background:#eef5e7;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#496e2d;',
      table: 'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',
      th: 'border:1px solid #d5e4c5;padding:8px;background:#f2f8ea;text-align:left;color:#496e2d;',
      td: 'border:1px solid #d5e4c5;padding:8px;',
      hr: 'border:none;border-top:1px solid #dbe8cf;margin:24px 0;'
    }
  },
  news: {
    section: 'font-family:Georgia,"PingFang SC","Microsoft YaHei",serif;word-break:break-word;color:#1f1f1f;',
    styles: {
      h1: 'font-size:28px;line-height:1.45;font-weight:700;margin:26px 0 16px;color:#111;',
      h2: 'font-size:22px;line-height:1.5;font-weight:700;margin:22px 0 14px;color:#1b1b1b;',
      h3: 'font-size:18px;line-height:1.55;font-weight:700;margin:18px 0 10px;color:#2b2b2b;',
      h4: 'font-size:16px;line-height:1.55;font-weight:700;margin:16px 0 10px;color:#2b2b2b;',
      p: 'font-size:15px;line-height:2;margin:10px 0;color:#1f1f1f;text-align:justify;',
      blockquote: 'margin:14px 0;padding:10px 14px;border-left:4px solid #999;background:#f8f8f8;color:#444;font-size:13px;line-height:1.85;',
      ul: 'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f1f1f;font-size:15px;',
      ol: 'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f1f1f;font-size:15px;',
      li: 'margin:6px 0;',
      a: 'color:#1155cc;text-decoration:underline;',
      img: 'max-width:100%;display:block;margin:18px auto;',
      pre: 'background:#f5f5f5;border:1px solid #e3e3e3;border-radius:4px;padding:12px;overflow:auto;line-height:1.6;font-size:12px;',
      code: 'background:#f0f0f0;padding:2px 5px;border-radius:3px;font-size:90%;font-family:Menlo,Consolas,monospace;',
      table: 'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',
      th: 'border:1px solid #ddd;padding:8px;background:#f7f7f7;text-align:left;',
      td: 'border:1px solid #ddd;padding:8px;',
      hr: 'border:none;border-top:1px solid #ddd;margin:24px 0;'
    }
  }
};

function scaledStyle(styleText, step = 0) {
  if (!step) return styleText;
  return styleText.replace(/font-size:(\d+)px/g, (_, n) => {
    const base = Number(n);
    const scaled = Math.max(base - step * 2, 11);
    return `font-size:${scaled}px`;
  });
}

function applyInlineStyles(container, styleMap, scaleStep = 0) {
  Object.entries(styleMap).forEach(([tag, style]) => {
    const styleWithScale = scaledStyle(style, scaleStep);
    container.querySelectorAll(tag).forEach(el => {
      const prev = el.getAttribute('style') || '';
      el.setAttribute('style', prev ? `${prev};${styleWithScale}` : styleWithScale);
    });
  });
}

function sanitizeForWechat(html) {
  const theme = themes[themeSelect.value] || themes.simple;
  const scaleStep = Number(fontScaleSelect?.value || 0);
  const doc = new DOMParser().parseFromString(`<section>${html}</section>`, 'text/html');
  const root = doc.body.firstElementChild;
  root.setAttribute('style', theme.section);

  root.querySelectorAll('script,style,iframe,object,embed').forEach(n => n.remove());
  root.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      const n = attr.name.toLowerCase();
      if (n.startsWith('on') || n === 'class' || n === 'id') el.removeAttribute(attr.name);
    });
  });

  applyInlineStyles(root, theme.styles, scaleStep);
  return root.outerHTML;
}

function render() {
  const md = markdownEl.value || '';
  const rawHtml = marked.parse(md);
  const html = sanitizeForWechat(rawHtml);
  previewEl.innerHTML = html;
  previewEl.dataset.html = html;

  if (md.trim()) {
    const themeName = themeSelect.options[themeSelect.selectedIndex].text;
    const sizeName = fontScaleSelect.options[fontScaleSelect.selectedIndex].text;
    statusEl.textContent = `已转换（${themeName}｜${sizeName}）`;
  } else {
    statusEl.textContent = '';
  }
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
themeSelect.addEventListener('change', render);
fontScaleSelect.addEventListener('change', render);

function applyMode(mode) {
  const safeMode = mode === 'light' ? 'light' : 'dark';
  document.body.setAttribute('data-mode', safeMode);
  modeToggleBtn.textContent = safeMode === 'dark' ? '切到浅色模式' : '切到深色模式';
  localStorage.setItem('ui-mode', safeMode);
}

const savedMode = localStorage.getItem('ui-mode');
applyMode(savedMode || 'light');
modeToggleBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-mode') || 'light';
  applyMode(current === 'light' ? 'dark' : 'light');
});

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
