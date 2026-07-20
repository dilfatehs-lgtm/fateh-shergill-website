import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

/** Structured data — helps Google show the right person/brokerage in results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  telephone: site.phone,
  areaServed: site.areas.map((a) => ({ "@type": "Place", name: a })),
  worksFor: { "@type": "Organization", name: site.brokerage },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.officeAddress.line1,
    addressLocality: site.city,
    addressRegion: "BC",
    postalCode: site.officeAddress.postal,
    addressCountry: "CA",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Stats />
        <Portfolio />
        <About />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
