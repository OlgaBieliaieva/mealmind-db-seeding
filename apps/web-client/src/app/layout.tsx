import "./globals.css";
import { Providers } from "./providers";
import { AppContainer } from "@/shared/ui/layout/AppContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-dvh overflow-hidden">
        <Providers>
          <AppContainer>{children}</AppContainer>
        </Providers>
      </body>
    </html>
  );
}
