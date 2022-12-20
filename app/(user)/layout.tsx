import Banner from "../../components/Banner";
import Header from "../../components/Header";
import "../../styles/globals.css";
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="mx-auto max-w-7xl">
        {" "}
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
