// A template re-mounts on every navigation, so the wrapper below is new each
// time. Its direct children (the loading skeleton first, then the page itself)
// fade in as they appear; see .page-fade in globals.css.
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-fade">{children}</div>;
}
