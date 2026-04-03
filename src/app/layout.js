export const metadata = {
  title: "North Lake Advisory | Strategic Financial Leadership",
  description:
    "North Lake Advisory Ltd provides professional accounting, tax, and business advisory services to individuals, entrepreneurs, contractors, and growing businesses across the UK.",
  keywords:
    "accounting, tax planning, business advisory, financial reporting, HMRC compliance, North Lake Advisory, UK accountants, CIS returns, VAT compliance",
  authors: [{ name: "North Lake Advisory Ltd" }],
  openGraph: {
    title: "North Lake Advisory | Strategic Financial Leadership",
    description:
      "Professional accounting, tax, and business advisory services for individuals and growing businesses.",
    url: "https://northlakeadvisory.com",
    siteName: "North Lake Advisory",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Lake Advisory",
    description: "Professional accounting, tax, and business advisory services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bebas+Neue&family=Montserrat:wght@700;800;900&family=DM+Sans:wght@300;400;500&family=Josefin+Sans:wght@400;600;700&family=Raleway:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
