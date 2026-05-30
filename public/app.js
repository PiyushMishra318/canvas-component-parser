let mode = 'ast';
document.querySelectorAll('.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    mode = btn.dataset.mode;
  });
});

document.getElementById('run').addEventListener('click', async () => {
  const raw = document.getElementById('input').value;
  const out = document.getElementById('output');
  out.textContent = 'Loading…';
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
    } else {
      res = await fetch('/parse/ast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: raw }),
      });
      out.textContent = JSON.stringify(await res.json(), null, 2);
    }
    if (!res.ok) out.textContent = `Error: ${out.textContent}`;
  } catch (e) {
    out.textContent = e.message;
  }
});
