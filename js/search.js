// Site search over /index.json. Cmd-/ (or Ctrl-/) focuses the box, Esc closes, arrows move.
(() => {
  const input = document.getElementById('search');
  const results = document.getElementById('results');
  if (!input || !results) return;

  let index = null;

  const load = () => {
    if (!index) {
      index = fetch('/index.json').then(r => r.json()).catch(() => []);
    }
    return index;
  };

  const close = () => {
    results.hidden = true;
    results.replaceChildren();
  };

  const score = (entry, terms) => {
    const title = entry.title.toLowerCase();
    const tags = entry.tags.join(' ').toLowerCase();
    const text = entry.text.toLowerCase();
    let total = 0;
    for (const t of terms) {
      if (title.includes(t)) total += 10;
      else if (tags.includes(t)) total += 5;
      else if (text.includes(t)) total += 1;
      else return 0;
    }
    return total;
  };

  const show = async () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return close();
    const entries = await load();
    const hits = entries
      .map(e => ({ e, s: score(e, terms) }))
      .filter(h => h.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10);
    results.replaceChildren(...hits.map(({ e }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = e.link;
      a.textContent = e.title;
      if (e.tags.length) {
        const small = document.createElement('small');
        small.textContent = e.tags.join(', ');
        a.append(small);
      }
      li.append(a);
      return li;
    }));
    if (hits.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No results';
      li.style.padding = '8px 12px';
      li.style.color = '#808080';
      results.append(li);
    }
    results.hidden = false;
  };

  const links = () => [...results.querySelectorAll('a')];

  input.addEventListener('focus', load, { once: true });
  input.addEventListener('input', show);
  input.form.addEventListener('submit', e => {
    e.preventDefault();
    const first = links()[0];
    if (first) location.href = first.href;
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
      e.preventDefault();
      input.focus();
      input.select();
      return;
    }
    if (results.hidden) return;
    if (e.key === 'Escape') {
      close();
      input.blur();
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const all = links();
    if (all.length === 0) return;
    e.preventDefault();
    const i = all.indexOf(document.activeElement);
    const next = e.key === 'ArrowDown' ? Math.min(i + 1, all.length - 1) : i - 1;
    (next < 0 ? input : all[next]).focus();
  });

  document.addEventListener('click', e => {
    if (!input.form.contains(e.target)) close();
  });
})();
