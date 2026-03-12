const markdownEl = document.getElementById('markdown');
const previewEl = document.getElementById('preview');
const statusEl = document.getElementById('status');
const fileInput = document.getElementById('fileInput');
const themeSelect = document.getElementById('themeSelect');
const fontScaleSelect = null; // removed, replaced by +/- buttons
let fontSizeOffset = 0; // px offset from default, can be negative or positive
const fontSizeLabel = document.getElementById('fontSizeLabel');
const fontSizeDown = document.getElementById('fontSizeDown');
const fontSizeUp = document.getElementById('fontSizeUp');
const modeToggleBtn = document.getElementById('modeToggleBtn');

marked.setOptions({ breaks: true, gfm: true });

const themes = {
  simple: { section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#222;', styles: {
    h1:'font-size:24px;line-height:1.6;font-weight:700;margin:24px 0 16px;color:#111;',h2:'font-size:20px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#111;',h3:'font-size:17px;line-height:1.6;font-weight:700;margin:20px 0 12px;color:#222;',h4:'font-size:15px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#222;',h5:'font-size:14px;line-height:1.6;font-weight:700;margin:14px 0 8px;color:#333;',h6:'font-size:13px;line-height:1.6;font-weight:700;margin:12px 0 8px;color:#333;',p:'font-size:14px;line-height:1.85;margin:10px 0;color:#222;text-align:justify;',blockquote:'margin:14px 0;padding:10px 14px;border-left:4px solid #3e7bfa;background:#f4f7ff;color:#3a4a77;font-size:13px;line-height:1.8;',ul:'margin:10px 0;padding-left:24px;line-height:1.85;color:#222;font-size:14px;',ol:'margin:10px 0;padding-left:24px;line-height:1.85;color:#222;font-size:14px;',li:'margin:6px 0;',a:'color:#276ef1;text-decoration:none;border-bottom:1px solid #8eb2ff;',img:'max-width:100%;display:block;margin:16px auto;border-radius:6px;',pre:'background:#f6f8fa;border:1px solid #e2e8f0;border-radius:8px;padding:12px;overflow:auto;line-height:1.6;font-size:12px;',code:'background:#f1f4f8;padding:2px 5px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #d9e2f0;padding:8px;background:#f7faff;text-align:left;',td:'border:1px solid #d9e2f0;padding:8px;',hr:'border:none;border-top:1px solid #dbe3ef;margin:24px 0;'
  }},
  tech: { section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#1a2433;', styles: {
    h1:'font-size:25px;line-height:1.55;font-weight:800;margin:26px 0 16px;color:#0b3b8b;border-bottom:2px solid #dce9ff;padding-bottom:8px;',h2:'font-size:21px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#1456c5;',h3:'font-size:17px;line-height:1.6;font-weight:700;margin:18px 0 10px;color:#1d3f6f;',h4:'font-size:15px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#1d3f6f;',p:'font-size:14px;line-height:1.9;margin:10px 0;color:#1f2d3d;text-align:justify;',blockquote:'margin:14px 0;padding:12px 14px;border-left:4px solid #5b8dff;background:#f5f8ff;color:#2a4f8a;font-size:13px;line-height:1.85;',ul:'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f2d3d;font-size:14px;',ol:'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f2d3d;font-size:14px;',li:'margin:6px 0;',a:'color:#1456c5;text-decoration:none;border-bottom:1px dashed #7aa2ff;',img:'max-width:100%;display:block;margin:18px auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.08);',pre:'background:#eef6ff;color:#1b3f75;border:1px solid #cfe2ff;border-radius:8px;padding:12px;overflow:auto;line-height:1.65;font-size:12px;',code:'background:#eef4ff;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#174ea6;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #d3e3ff;padding:8px;background:#edf3ff;text-align:left;color:#1d3f6f;',td:'border:1px solid #d3e3ff;padding:8px;',hr:'border:none;border-top:1px solid #dce6ff;margin:24px 0;'
  }},
  edu: { section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#2b2b2b;', styles: {
    h1:'font-size:25px;line-height:1.6;font-weight:800;margin:24px 0 16px;color:#2e5b1f;',h2:'font-size:21px;line-height:1.6;font-weight:700;margin:22px 0 14px;color:#3f7f2f;',h3:'font-size:17px;line-height:1.6;font-weight:700;margin:18px 0 10px;color:#4a6b2f;',h4:'font-size:15px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#4a6b2f;',p:'font-size:14px;line-height:1.95;margin:10px 0;color:#2f2f2f;text-align:justify;',blockquote:'margin:14px 0;padding:12px 14px;border-left:4px solid #7abf45;background:#f6fbef;color:#486a30;font-size:13px;line-height:1.85;',ul:'margin:10px 0;padding-left:24px;line-height:1.9;color:#2f2f2f;font-size:14px;',ol:'margin:10px 0;padding-left:24px;line-height:1.9;color:#2f2f2f;font-size:14px;',li:'margin:6px 0;',a:'color:#3f7f2f;text-decoration:none;border-bottom:1px solid #9fd57a;',img:'max-width:100%;display:block;margin:16px auto;border-radius:6px;',pre:'background:#f6f8f0;border:1px solid #d8e6c6;border-radius:8px;padding:12px;overflow:auto;line-height:1.6;font-size:12px;',code:'background:#eef5e7;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#496e2d;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #d5e4c5;padding:8px;background:#f2f8ea;text-align:left;color:#496e2d;',td:'border:1px solid #d5e4c5;padding:8px;',hr:'border:none;border-top:1px solid #dbe8cf;margin:24px 0;'
  }},
  news: { section: 'font-family:Georgia,"PingFang SC","Microsoft YaHei",serif;word-break:break-word;color:#1f1f1f;', styles: {
    h1:'font-size:28px;line-height:1.45;font-weight:700;margin:26px 0 16px;color:#111;',h2:'font-size:22px;line-height:1.5;font-weight:700;margin:22px 0 14px;color:#1b1b1b;',h3:'font-size:18px;line-height:1.55;font-weight:700;margin:18px 0 10px;color:#2b2b2b;',h4:'font-size:16px;line-height:1.55;font-weight:700;margin:16px 0 10px;color:#2b2b2b;',p:'font-size:15px;line-height:2;margin:10px 0;color:#1f1f1f;text-align:justify;',blockquote:'margin:14px 0;padding:10px 14px;border-left:4px solid #999;background:#f8f8f8;color:#444;font-size:13px;line-height:1.85;',ul:'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f1f1f;font-size:15px;',ol:'margin:10px 0;padding-left:24px;line-height:1.9;color:#1f1f1f;font-size:15px;',li:'margin:6px 0;',a:'color:#1155cc;text-decoration:underline;',img:'max-width:100%;display:block;margin:18px auto;',pre:'background:#f5f5f5;border:1px solid #e3e3e3;border-radius:4px;padding:12px;overflow:auto;line-height:1.6;font-size:12px;',code:'background:#f0f0f0;padding:2px 5px;border-radius:3px;font-size:90%;font-family:Menlo,Consolas,monospace;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #ddd;padding:8px;background:#f7f7f7;text-align:left;',td:'border:1px solid #ddd;padding:8px;',hr:'border:none;border-top:1px solid #ddd;margin:24px 0;'
  }},
  magazine: { section: 'font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;word-break:break-word;color:#27272a;', styles: {
    h1:'font-size:30px;line-height:1.5;font-weight:800;margin:24px 0 14px;color:#7a1f1f;text-align:center;',h2:'font-size:22px;line-height:1.6;font-weight:700;margin:20px 0 12px;color:#992d2d;',h3:'font-size:18px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#ad3a3a;',h4:'font-size:16px;line-height:1.6;font-weight:700;margin:14px 0 10px;color:#ad3a3a;',p:'font-size:15px;line-height:1.95;margin:12px 0;color:#2f2f33;text-align:justify;letter-spacing:.2px;',blockquote:'margin:16px 0;padding:12px 16px;border-left:0;background:#fff3f2;color:#8a2c2c;font-size:14px;line-height:1.9;border-radius:10px;',ul:'margin:10px 0;padding-left:24px;line-height:1.9;color:#2f2f33;font-size:15px;',ol:'margin:10px 0;padding-left:24px;line-height:1.9;color:#2f2f33;font-size:15px;',li:'margin:6px 0;',a:'color:#c23a3a;text-decoration:none;border-bottom:1px dashed #d67f7f;',img:'max-width:100%;display:block;margin:20px auto;border-radius:12px;box-shadow:0 8px 20px rgba(120,30,30,.12);',pre:'background:#fff6f6;border:1px solid #f2d9d9;border-radius:10px;padding:12px;overflow:auto;line-height:1.7;font-size:12px;',code:'background:#ffeef0;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#9c2f3a;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #f0d1d1;padding:8px;background:#fff7f7;text-align:left;',td:'border:1px solid #f0d1d1;padding:8px;',hr:'border:none;border-top:1px dashed #e8c2c2;margin:24px 0;'
  }},
  minimal: { section: 'font-family:Inter,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#111827;', styles: {
    h1:'font-size:26px;line-height:1.45;font-weight:700;margin:30px 0 18px;color:#111827;',h2:'font-size:21px;line-height:1.5;font-weight:700;margin:24px 0 14px;color:#1f2937;',h3:'font-size:17px;line-height:1.6;font-weight:600;margin:20px 0 10px;color:#374151;',h4:'font-size:15px;line-height:1.6;font-weight:600;margin:16px 0 8px;color:#374151;',p:'font-size:15px;line-height:2.05;margin:14px 0;color:#111827;',blockquote:'margin:16px 0;padding:0 0 0 14px;border-left:3px solid #111827;background:transparent;color:#374151;font-size:14px;line-height:1.95;',ul:'margin:12px 0;padding-left:22px;line-height:2;color:#111827;font-size:15px;',ol:'margin:12px 0;padding-left:22px;line-height:2;color:#111827;font-size:15px;',li:'margin:6px 0;',a:'color:#111827;text-decoration:underline;',img:'max-width:100%;display:block;margin:22px auto;border-radius:2px;',pre:'background:#fafafa;border:1px solid #ececec;border-radius:6px;padding:12px;overflow:auto;line-height:1.65;font-size:12px;',code:'background:#f3f4f6;padding:2px 5px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border-bottom:1px solid #d1d5db;padding:8px 6px;text-align:left;',td:'border-bottom:1px solid #e5e7eb;padding:8px 6px;',hr:'border:none;border-top:1px solid #e5e7eb;margin:28px 0;'
  }},
  retro: { section: 'font-family:Georgia,"Times New Roman","PingFang SC",serif;word-break:break-word;color:#2d2418;', styles: {
    h1:'font-size:28px;line-height:1.5;font-weight:700;margin:24px 0 14px;color:#4a3215;',h2:'font-size:22px;line-height:1.55;font-weight:700;margin:20px 0 12px;color:#5f3f17;',h3:'font-size:18px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#704a1a;',h4:'font-size:16px;line-height:1.6;font-weight:700;margin:14px 0 8px;color:#704a1a;',p:'font-size:15px;line-height:2;margin:12px 0;color:#2f261b;text-align:justify;',blockquote:'margin:16px 0;padding:12px 14px;border-left:4px solid #8b6a35;background:#f8f2e8;color:#5a4423;font-size:14px;line-height:1.9;',ul:'margin:10px 0;padding-left:24px;line-height:1.95;color:#2f261b;font-size:15px;',ol:'margin:10px 0;padding-left:24px;line-height:1.95;color:#2f261b;font-size:15px;',li:'margin:6px 0;',a:'color:#7a4e14;text-decoration:none;border-bottom:1px solid #c8a870;',img:'max-width:100%;display:block;margin:20px auto;border:6px solid #f0e3cc;border-radius:2px;',pre:'background:#f8f2e8;border:1px solid #e4d1ad;border-radius:6px;padding:12px;overflow:auto;line-height:1.65;font-size:12px;',code:'background:#f2e7d4;padding:2px 5px;border-radius:3px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#704a1a;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #d7c19a;padding:8px;background:#f7ebd6;text-align:left;',td:'border:1px solid #d7c19a;padding:8px;',hr:'border:none;border-top:1px solid #d7c19a;margin:24px 0;'
  }},
  night: { section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#cbd5ff;background:#0f1220;padding:14px;border-radius:12px;', styles: {
    h1:'font-size:27px;line-height:1.5;font-weight:800;margin:24px 0 14px;color:#9ec5ff;',h2:'font-size:22px;line-height:1.55;font-weight:700;margin:20px 0 12px;color:#84f0ff;',h3:'font-size:18px;line-height:1.6;font-weight:700;margin:16px 0 10px;color:#b9a3ff;',h4:'font-size:16px;line-height:1.6;font-weight:700;margin:14px 0 8px;color:#b9a3ff;',p:'font-size:15px;line-height:1.95;margin:12px 0;color:#d5dbff;text-align:justify;',blockquote:'margin:16px 0;padding:12px 14px;border-left:4px solid #7c8cff;background:#171b2f;color:#aebcff;font-size:14px;line-height:1.85;',ul:'margin:10px 0;padding-left:24px;line-height:1.9;color:#d5dbff;font-size:15px;',ol:'margin:10px 0;padding-left:24px;line-height:1.9;color:#d5dbff;font-size:15px;',li:'margin:6px 0;',a:'color:#7de3ff;text-decoration:none;border-bottom:1px dashed #7de3ff;',img:'max-width:100%;display:block;margin:20px auto;border-radius:10px;box-shadow:0 0 0 1px #2c3255,0 8px 24px rgba(0,0,0,.35);',pre:'background:#171b2f;border:1px solid #2f3763;border-radius:8px;padding:12px;overflow:auto;line-height:1.65;font-size:12px;color:#d6e0ff;',code:'background:#23294a;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#9ec5ff;',table:'border-collapse:collapse;width:100%;margin:12px 0;font-size:12px;',th:'border:1px solid #2f3763;padding:8px;background:#1f2440;text-align:left;color:#9ec5ff;',td:'border:1px solid #2f3763;padding:8px;color:#d5dbff;',hr:'border:none;border-top:1px solid #2f3763;margin:24px 0;'
  }},
  elegant: { section: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;word-break:break-word;color:#333;', styles: {
    h1:'font-size:24px;line-height:1.6;font-weight:800;margin:56px 0 32px;color:#1a1a1a;text-align:center;',h2:'font-size:20px;line-height:1.6;font-weight:700;margin:48px 0 28px;color:#1a1a1a;text-align:center;',h3:'font-size:17px;line-height:1.6;font-weight:700;margin:40px 0 22px;color:#1a1a1a;text-align:center;',h4:'font-size:15px;line-height:1.6;font-weight:700;margin:32px 0 18px;color:#333;text-align:center;',h5:'font-size:14px;line-height:1.6;font-weight:700;margin:26px 0 14px;color:#333;text-align:center;',h6:'font-size:13px;line-height:1.6;font-weight:700;margin:22px 0 12px;color:#444;text-align:center;',p:'font-size:15px;line-height:2;margin:16px 0;color:#333;text-align:justify;letter-spacing:.3px;',strong:'color:#1a6dcc;font-weight:700;',blockquote:'margin:20px 0;padding:14px 18px;border-left:4px solid #1a6dcc;background:#f0f6ff;color:#2c5a8f;font-size:14px;line-height:1.9;border-radius:0 8px 8px 0;',ul:'margin:14px 0;padding-left:24px;line-height:2;color:#333;font-size:15px;',ol:'margin:14px 0;padding-left:24px;line-height:2;color:#333;font-size:15px;list-style:none;counter-reset:li;',li:'margin:8px 0;',a:'color:#1a6dcc;text-decoration:none;border-bottom:1px solid #8cb8e8;',img:'max-width:100%;display:block;margin:24px auto;border-radius:8px;',pre:'background:#f5f7fa;border:1px solid #e0e6ef;border-radius:8px;padding:14px;overflow:auto;line-height:1.65;font-size:13px;',code:'background:#edf1f7;padding:2px 6px;border-radius:4px;font-size:90%;font-family:Menlo,Consolas,monospace;color:#1a6dcc;',table:'border-collapse:collapse;width:100%;margin:16px 0;font-size:13px;',th:'border:1px solid #d6e0ef;padding:10px;background:#f0f5ff;text-align:left;color:#1a4a7a;',td:'border:1px solid #d6e0ef;padding:10px;',hr:'border:none;border-top:1px solid #d6e0ef;margin:32px 0;'
  }}
};

function scaledStyle(styleText, offset = 0) {
  if (!offset) return styleText;
  return styleText.replace(/font-size:(\d+)px/g, (_, n) => `font-size:${Math.max(Number(n) + offset, 9)}px`);
}

function applyInlineStyles(container, styleMap, offset = 0) {
  Object.entries(styleMap).forEach(([tag, style]) => {
    const styleWithScale = scaledStyle(style, offset);
    container.querySelectorAll(tag).forEach(el => {
      const prev = el.getAttribute('style') || '';
      el.setAttribute('style', prev ? `${prev};${styleWithScale}` : styleWithScale);
    });
  });
}

function sanitizeForWechat(html) {
  const theme = themes[themeSelect.value] || themes.simple;
  const offset = fontSizeOffset;
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
  applyInlineStyles(root, theme.styles, offset);
  // Reset code styles inside pre blocks to avoid extra indentation
  root.querySelectorAll('pre code').forEach(el => {
    el.setAttribute('style', 'background:none;padding:0;border-radius:0;font-size:inherit;font-family:Menlo,Consolas,monospace;');
  });
  // For elegant theme: style ordered list numbers with colored counters
  if (themeSelect.value === 'elegant') {
    root.querySelectorAll('ol').forEach(ol => {
      ol.setAttribute('style', (ol.getAttribute('style') || '') + ';list-style:none;padding-left:8px;');
      ol.querySelectorAll(':scope > li').forEach((li, i) => {
        const num = String(i + 1).padStart(2, '0');
        const marker = `<span style="color:#1a6dcc;font-size:22px;font-weight:800;margin-right:8px;font-style:italic;">${num}.</span>`;
        li.innerHTML = marker + li.innerHTML;
      });
    });
  }
  return root.outerHTML;
}

function render() {
  const md = markdownEl.value || '';
  const html = sanitizeForWechat(marked.parse(md));
  previewEl.innerHTML = html;
  previewEl.dataset.html = html;
  statusEl.textContent = md.trim()
    ? `已转换（${themeSelect.options[themeSelect.selectedIndex].text}｜字号 ${fontSizeOffset >= 0 ? '+' : ''}${fontSizeOffset}）`
    : '';
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

function systemMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateModeUi(mode) {
  document.body.setAttribute('data-mode', mode);
  modeToggleBtn.textContent = mode === 'dark' ? '切到浅色模式' : '切到深色模式';
}

function applyMode(mode, persist = true) {
  const safe = mode === 'dark' ? 'dark' : 'light';
  updateModeUi(safe);
  if (persist) localStorage.setItem('ui-mode', safe);
}

const savedMode = localStorage.getItem('ui-mode');
if (savedMode) {
  applyMode(savedMode, false);
} else {
  updateModeUi(systemMode());
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!localStorage.getItem('ui-mode')) updateModeUi(systemMode());
});
modeToggleBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-mode') || systemMode();
  applyMode(current === 'light' ? 'dark' : 'light', true);
});
modeToggleBtn.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  localStorage.removeItem('ui-mode');
  updateModeUi(systemMode());
  statusEl.textContent = '已切回跟随系统模式';
});

document.getElementById('convertBtn').addEventListener('click', render);
themeSelect.addEventListener('change', render);
fontSizeDown.addEventListener('click', () => {
  fontSizeOffset = Math.max(fontSizeOffset - 1, -6);
  fontSizeLabel.textContent = fontSizeOffset;
  render();
});
fontSizeUp.addEventListener('click', () => {
  fontSizeOffset = Math.min(fontSizeOffset + 1, 6);
  fontSizeLabel.textContent = fontSizeOffset;
  render();
});
markdownEl.addEventListener('input', () => {
  clearTimeout(window.__renderTimer);
  window.__renderTimer = setTimeout(render, 250);
});
document.getElementById('copyBtn').addEventListener('click', async () => {
  const html = previewEl.dataset.html || '';
  if (!html.trim()) return (statusEl.textContent = '请先输入并转换内容');
  try {
    await copyRichHtml(html);
    statusEl.textContent = '复制成功，可去公众号编辑器粘贴';
  } catch {
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
  markdownEl.value = await file.text();
  render();
});

render();

// ===== Phone/Desktop preview mode toggle =====
const previewContainer = document.getElementById('previewContainer');
const desktopModeBtn = document.getElementById('desktopModeBtn');
const phoneModeBtn = document.getElementById('phoneModeBtn');

desktopModeBtn.addEventListener('click', () => {
  previewContainer.classList.remove('phone-mode');
  desktopModeBtn.classList.add('active');
  phoneModeBtn.classList.remove('active');
});

phoneModeBtn.addEventListener('click', () => {
  previewContainer.classList.add('phone-mode');
  phoneModeBtn.classList.add('active');
  desktopModeBtn.classList.remove('active');
});
