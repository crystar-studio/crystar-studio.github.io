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
function eohUpdate(episode, episodeTitle, date) {
  const dotDate = date.replaceAll('-', '.');

  return {
    date,
    publishAt: `${date}T19:00`,
    title: `【更新】END OF HOPE:21xx - Last Call 第${episode}話`,
    message: `第${episode}話「${episodeTitle}」を公開しました。\n\nEND OF HOPE:21xx - Last Call\n更新日：${dotDate}`,
    link: { label: `第${episode}話を読む`, href: `https://ncode.syosetu.com/n2974kb/${episode}` },
  };
}

export const NEWS = [
  {
    date: '2026-08-16',
    title: 'お知らせページを公開しました',
    message: 'CryStar Studioからのお知らせをこのページでまとめて確認できるようになりました。',
  },
  eohUpdate(282, '氷解の後に残る温もり - 1', '2026-08-15'),
  eohUpdate(283, '氷解の後に残る温もり - 2', '2026-08-16'),
  eohUpdate(284, '氷解の後に残る温もり - 3', '2026-08-22'),
  eohUpdate(285, '名を呼べどもう声は返らない - 1', '2026-08-23'),
  eohUpdate(286, '名を呼べどもう声は返らない - 2', '2026-08-29'),
  eohUpdate(287, '名を呼べどもう声は返らない - 3', '2026-08-30'),
  eohUpdate(288, '名を呼べどもう声は返らない - 4', '2026-09-05'),
  eohUpdate(289, '行き場を失いし嘆きは世界を飲み込む - 1', '2026-09-06'),
  eohUpdate(290, '行き場を失いし嘆きは世界を飲み込む - 2', '2026-09-12'),
  eohUpdate(291, '行き場を失いし嘆きは世界を飲み込む - 3', '2026-09-13'),
  eohUpdate(292, '行き場を失いし嘆きは世界を飲み込む - 4', '2026-09-19'),
  {
    date: '2026-09-22',
    title: '『END OF HOPE:21xx - Last Call』用語集ページを公開しました',
    message: '『END OF HOPE:21xx - Last Call』の用語集ページを公開しました。\\n\\nWorldブロック内に追加されたボタンからご覧いただけます。\\n物語の進行にあわせて、用語や人物の情報を順次追加・更新していきます。',
  },
];
