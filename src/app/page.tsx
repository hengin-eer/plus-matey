import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <Link href='/about'>Plus Mateyとは</Link>
      <Link href='/bookmarked'>ブックマーク済み</Link>
      <Link href='/create'>イベント作成</Link>
      <Link href='/following'>フォロワー</Link>
      <Link href='/manage'>イベントの管理</Link>
      <Link href='/new'>新着イベント</Link>
      <Link href='/settings'>設定</Link>
    </div>
  );
}
