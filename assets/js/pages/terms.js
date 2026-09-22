import { findWork, sectionsOf, resourceCodeOf, bgOf, urlOf } from '../../data/works.config.js';
import { loadWorkData } from '../lib/work-data.js';
import { toParagraphs } from '../sections/story.js';

/**
 * 用語集ページ（terms.html?code=xxx）。
 * URLの code から作品を特定し、assets/data/works/(code).js の terms を描画する。
 *
 * 用語はシリーズ全体で共通の扱いにしているので、シリーズの中の1作品の code を
 * 渡された場合も、親作品（resourceCodeOf）の terms を読む。
 *
 * データの書き方は assets/data/works/(code).js の terms を参照。
 *   { term: '用語', reading: 'よみ', aliases: ['別名'], text: '説明',
 *     reveals: [{ label: '第一話以降', text: '…' }, …] }
 * reveals は書いた順に入れ子で開く（1段目を開くと、その中に2段目が現れる）。
 */

/** reveals に label を書かなかったときの表記 */
const DEFAULT_REVEAL_LABEL = 'この先の情報';

const code = new URLSearchParams(location.search).get('code') ?? '';
const work = findWork(code);

if (!work || work.status === 'preparation') {
  location.replace('works.html');
} else {
  init(work);
}

async function init(work) {
  // 用語を持っているのは親作品。シリーズ作品から来た場合もそちらを読む
  const owner = findWork(resourceCodeOf(work)) ?? work;
  const title = owner.title ?? owner.label;

  document.title = `用語集 — ${title} — CryStar Studio`;

  // 背景とタブは作品ページと揃える
  document.querySelector('page-bg')?.setAttribute('data-src', bgOf(work));
  const nav = document.querySelector('work-nav');
  nav?.setAttribute('data-current', resourceCodeOf(work));
  nav?.setAttribute('data-page', work.code);

  renderHead(work, title);

  const data = await loadWorkData(owner.code);
  renderTerms(data.terms ?? []);
}

/* ================= 描画 ================= */

/** 戻り先。WORLDブロックを持つ作品はその位置まで、持たない作品はページ先頭へ */
function backUrl(work) {
  const hasWorld = sectionsOf(work).some((section) => section.id === 'world');
  return hasWorld ? urlOf(work, 'world') : urlOf(work);
}

function renderHead(work, title) {
  const head = document.querySelector('[data-term-head]');
  if (!head) return;

  head.innerHTML = `
    <p class="eyebrow" data-reveal>Glossary</p>
    <h1 class="page-head__title" data-reveal style="--reveal-delay: 100ms">
      用語集
      <span class="page-head__ja">${title}</span>
    </h1>
    <p class="page-head__lead" data-reveal style="--reveal-delay: 200ms">
      作品に出てくる言葉の一覧です。物語の進行で意味が変わる語は、開くと続きが出ます。
    </p>
    <a class="term-back" href="${backUrl(work)}" data-reveal style="--reveal-delay: 260ms">
      作品ページへ戻る
    </a>
  `;
}

function renderTerms(terms) {
  const mount = document.querySelector('[data-term-body]');
  if (!mount) return;

  if (!terms.length) {
    mount.innerHTML = `<div class="placeholder">
                         <span class="placeholder__label">No data</span>
                         用語が未登録
                       </div>`;
    return;
  }

  // 検索用の文字列をあらかじめ作っておく（開く前の内容だけが対象）
  const list = terms.map((term) => ({ ...term, searchText: searchTextOf(term) }));

  mount.innerHTML = `
    <div class="term-search" data-reveal>
      <input class="term-search__input" type="search" data-term-search
             placeholder="用語・よみ・説明で絞り込む"
             aria-label="用語を絞り込む">
      <p class="term-count" data-term-count aria-live="polite"></p>
    </div>

    <dl class="term-list">
      ${list.map(renderRow).join('')}
    </dl>

    <p class="term-empty" hidden>該当する用語がありません</p>
  `;

  bind(mount, list);
}

const renderRow = (term) => `
  <div class="term-row" data-reveal>
    <dt class="term-row__name">
      ${term.term}
      ${term.reading ? `<span class="term-row__reading">${term.reading}</span>` : ''}
    </dt>
    <dd class="term-row__body">
      <div class="term-row__text">${toParagraphs(term.text)}</div>
      ${renderReveals(term.reveals ?? [])}
    </dd>
  </div>
`;

/**
 * 段階的に開く情報。
 * 配列の先頭から順に入れ子にするので、1段目を開くまで2段目は見えない。
 * 段数に上限は設けていない（5段でも書いたぶんだけ深くなる）。
 */
function renderReveals(reveals, depth = 0) {
  if (!reveals.length) return '';

  const [current, ...rest] = reveals;

  return `
    <details class="term-reveal" style="--term-depth: ${depth}">
      <summary class="term-reveal__head">${current.label ?? DEFAULT_REVEAL_LABEL}</summary>
      <div class="term-reveal__body">
        ${toParagraphs(current.text)}
        ${renderReveals(rest, depth + 1)}
      </div>
    </details>
  `;
}

/* ================= 操作 ================= */

/**
 * 検索対象は「開く前に見えている内容」だけにしている。
 * 隠してある続きまで拾うと、検索結果そのものがネタバレになるため。
 */
const searchTextOf = (term) =>
  [term.term, term.reading, ...(term.aliases ?? []), term.text]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

function bind(root, list) {
  const rows = [...root.querySelectorAll('.term-row')];
  const empty = root.querySelector('.term-empty');
  const count = root.querySelector('[data-term-count]');
  const input = root.querySelector('[data-term-search]');

  const apply = (query) => {
    rows.forEach((row, i) => {
      row.hidden = Boolean(query) && !list[i].searchText.includes(query);
    });

    const visible = rows.filter((row) => !row.hidden).length;
    empty.hidden = visible > 0;
    count.textContent = query ? `${visible} / ${rows.length} 件` : `${rows.length} 件`;
  };

  input?.addEventListener('input', () => apply(input.value.trim().toLowerCase()));

  apply('');
}
