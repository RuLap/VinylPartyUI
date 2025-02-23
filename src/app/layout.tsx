import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import NavBar from "./components/NavBar";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Vinyl Party",
  description: "App for vinyl parties",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider enableSystem={false}>
          <NavBar />
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  )
}
