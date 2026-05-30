let mode = 'ast';

document.querySelectorAll('.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    mode = btn.dataset.mode;
    const input = document.getElementById('input');
    input.placeholder =
      mode === 'compose'
        ? '[{"name":"App","html":"..."}]'
        : mode === 'split'
          ? 'HTML with data-component attributes (or leave empty to use sample file)'
          : 'Paste HTML…';
  });
});

document.getElementById('load-template').addEventListener('click', async () => {
  const res = await fetch('/fixtures/template.html');
  document.getElementById('input').value = await res.text();
});

document.getElementById('load-compose').addEventListener('click', async () => {
  const res = await fetch('/fixtures/components.sample.json');
  document.getElementById('input').value = await res.text();
});

document.getElementById('run').addEventListener('click', async () => {
  const raw = document.getElementById('input').value;
  const out = document.getElementById('output');
  const btn = document.getElementById('run');
  out.textContent = 'Loading…';
  btn.disabled = true;
  try {
    let res;
    if (mode === 'compose') {
      const body = JSON.parse(raw);
      res = await fetch('/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      out.textContent = await res.text();
    } else if (mode === 'react') {
      res = await fetch('/parse/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: raw }),
      });
      out.textContent = await res.text();
    } else if (mode === 'split') {
      if (raw.trim()) {
        res = await fetch('/parse/ast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: raw }),
        });
        const ast = await res.json();
        if (!res.ok) throw new Error(ast.error || 'Parse failed');
        const names = [];
        const walk = (n) => {
          if (n && typeof n === 'object') {
            if (n.attrs) {
              const comp = n.attrs.find((a) => a.key === 'data-component');
              if (comp) names.push(comp.value);
            }
            (n.children || []).forEach(walk);
          }
        };
        walk(ast);
        out.textContent = JSON.stringify({ components: names }, null, 2);
      } else {
        res = await fetch('/split?file=fixtures/template.html');
        out.textContent = JSON.stringify(await res.json(), null, 2);
      }
    } else {
      res = await fetch('/parse/ast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: raw }),
      });
      out.textContent = JSON.stringify(await res.json(), null, 2);
    }
    if (res && !res.ok && mode !== 'split') {
      out.textContent = `Error: ${out.textContent}`;
    }
  } catch (e) {
    out.textContent = e.message;
  } finally {
    btn.disabled = false;
  }
});
