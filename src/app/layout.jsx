import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: {
    default: "StudyNook - Premium Study Room Booking",
    template: "%s | StudyNook",
  },
  description:
    "Book premium study rooms with modern amenities. Find your perfect study space for focused learning and collaboration.",
  keywords: ["study room", "booking", "study space", "coworking", "library"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
