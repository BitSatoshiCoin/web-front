export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <div>关于我们{locale}</div>;
}
