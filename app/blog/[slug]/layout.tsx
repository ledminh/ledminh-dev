import Breadcrumb from "../../components/Breadcrumb";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="mdx-article">{children}</article>;
}
