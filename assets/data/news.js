/**
 * お知らせ一覧。
 * 日付は 'YYYY-MM-DD'。表示順は各ページ側で新しい日付順に並べ替える。
 * 増やすときはこの配列に1件足すだけでよい（トップの一覧・お知らせページの両方に反映される）。
 *
 * 予約投稿：publishAt に 'YYYY-MM-DDTHH:mm'（ローカル時刻）を入れておくと、
 * その日時を過ぎるまで一覧に出さずにおける。無ければ常に表示される。
 * 例）8/20 18:00 に公開したいなら publishAt: '2026-08-20T18:00'
 *
 * ただしこれは表示時の絞り込みでしかなく、データ自体は公開前でも
 * リポジトリを見れば読める（隠しファイルではない）。
 */
/**
 * EOH（END OF HOPE:21xx - Last Call）の更新お知らせを組み立てる。
 * 話数・話タイトル・公開日（'YYYY-MM-DD'）だけ渡せば、決まった文面で1件作れる。
 */
function eohUpdate(episode, episodeTitle, date, pageNumber = episode) {
  const dotDate = date.replaceAll('-', '.');

  return {
    date,
    publishAt: `${date}T19:00`,
    title: `【更新】END OF HOPE:21xx - Last Call 第${episode}話`,
    message: `第${episode}話「${episodeTitle}」を公開しました。\n\nEND OF HOPE:21xx - Last Call\n更新日：${dotDate}`,
    link: {
      label: `第${episode}話を読む`,
      href: `https://ncode.syosetu.com/n2974kb/${pageNumber}`,
    },
  };
}

export const NEWS = [
  {
    date: '2026-08-16',
    title: 'お知らせページを公開しました',
    message: 'CryStar Studioからのお知らせをこのページでまとめて確認できるようになりました。',
  },
  eohUpdate(90, '氷解の後に残る温もり - 1', '2026-08-15', 284),
  eohUpdate(90, '氷解の後に残る温もり - 2', '2026-08-16', 285),
  eohUpdate(90, '氷解の後に残る温もり - 3', '2026-08-22', 286),
  eohUpdate(91, '名を呼べどもう声は返らない - 1', '2026-08-23', 287),
  eohUpdate(91, '名を呼べどもう声は返らない - 2', '2026-08-29', 288),
  eohUpdate(91, '名を呼べどもう声は返らない - 3', '2026-08-30', 289),
  eohUpdate(91, '名を呼べどもう声は返らない - 4', '2026-09-05', 290),
  eohUpdate(92, '行き場を失いし嘆きは世界を飲み込む - 1', '2026-09-06', 291),
  eohUpdate(92, '行き場を失いし嘆きは世界を飲み込む - 2', '2026-09-12', 292),
  eohUpdate(92, '行き場を失いし嘆きは世界を飲み込む - 3', '2026-09-13', 293),
  eohUpdate(92, '行き場を失いし嘆きは世界を飲み込む - 4', '2026-09-19', 294),
  eohUpdate('x', '手放した温もりはもう二度と', '2026-09-20', 295),
  {
    date: '2026-09-22',
    title: '『END OF HOPE:21xx - Last Call』用語集ページを公開しました',
    message: '『END OF HOPE:21xx - Last Call』の用語集ページを公開しました。\n\nWorldブロック内に追加されたボタンからご覧いただけます。\n物語の進行にあわせて、用語や人物の情報を順次追加・更新していきます。',
  },
  {
    date: '2026-09-22',
    title: '『END OF HOPE:21xx - Last Call』リンクについてのお知らせ',
    message: '現在、『END OF HOPE:21xx - Last Call』の改稿作業を行っています。\n\n改稿に伴いページ番号が前後するため、更新お知らせ内のリンクが正しい話数へ遷移しない場合があります。\nご不便をおかけしますが、あらかじめご了承ください。',
  },
  eohUpdate(93, '白焔帰虚 - 1', '2026-09-26', 296),
  eohUpdate(93, '白焔帰虚 - 2', '2026-09-27', 297),
  eohUpdate(93, '白焔帰虚 - 3', '2026-10-03', 298),
  eohUpdate(94, '暗緑の夜明け、書庫にて - 1', '2026-10-04', 299),
  eohUpdate(94, '暗緑の夜明け、書庫にて - 2', '2026-10-10', 300),
];
