import '../../../app/globals.scss';
import Sidebar from "../../../ui/molecules/common/Sidebar";
import AuthGuard from './dashboard/guard/authGuard';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section className="layout">
      <Sidebar />
      <article className="content">
        <AuthGuard>
          {children}
        </AuthGuard>
      </article>
    </section>
  );
}
