import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import logo from "./assets/Logo transparent.png";
import heroProduct from "./assets/stor-hex-rosa.png";
import processIllustration from "./assets/saadan-foregaar-det.png";
import headerBillede from "./assets/Header-billede.png";
import anledningerBlomster from "./assets/anledninger-blomster.png";
import product01 from "./assets/produkt-01.png";
import product02 from "./assets/produkt-02.png";
import product03 from "./assets/produkt-03.png";
import product04 from "./assets/produkt-04.png";
import product05 from "./assets/produkt-05.png";
import product06 from "./assets/produkt-06.png";
import product07 from "./assets/produkt-07.png";
import product08 from "./assets/produkt-08.png";
import product09 from "./assets/produkt-09.png";
import product10 from "./assets/produkt-10.png";
import product11 from "./assets/produkt-11.png";
import product12 from "./assets/produkt-12.png";
import product13 from "./assets/produkt-13.png";
import product14 from "./assets/produkt-14.png";
import product15 from "./assets/produkt-15.png";
import signature from "./assets/Min signatur.png";
import historienGren from "./assets/historien-gren.png";
import historienOmMig from "./assets/historien-om-mig.png";



type Product = {
  name: string;
  image: string;
  size?: string;
  price?: string;
  note?: string;
};

const products: Product[] = [
  { name: "Hexagon stor", image: heroProduct, size: "24 × 21 × 3,5 cm", price: "Fra 3.250 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Hexagon lille", image: product02, size: "17 × 17 × 3,5 cm", price: "Fra 2.800 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Hjerte stor", image: product03, size: "19 × 22 × 5 cm", price: "Fra 2.995 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Hjerte lille", image: product04, size: "12 × 12 × 3,5 cm", price: "Fra 2.700 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Arc stor", image: product05, size: "16 × 21 × 3,5 cm", price: "Fra 3.095 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Arc lille", image: product06, size: "12 × 17 × 3,5 cm", price: "Fra 2.700 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Sommerfugl", image: product07, size: "18 × 16 × 3,5 cm", price: "Fra 1.600 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Bogstøtte", image: product08, size: "17 × 17 × 3,5 cm", price: "Fra 1.400 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Sfære stor", image: product09, size: "15 × 15 × 15 cm", price: "Fra 1.150 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Sfære mellem", image: product10, size: "12 × 12 × 12 cm", price: "Fra 950 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Sfære lille", image: product11, size: "10 × 10 × 10 cm", price: "Fra 750 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Hjerte dyb", image: product12, size: "12 × 12 × 3,5 cm", price: "Fra 550 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Hjerte", image: product13, size: "10 × 10 × 3 cm", price: "Fra 450 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Coaster", image: product14, size: "10 × 10 × 1,5 cm", price: "Fra 550 kr.", note: "Skabes individuelt med dine egne blomster." },
  { name: "Ringholder (kegle)", image: product15, size: "10 × 5,5 cm", price: "Fra 550 kr.", note: "Skabes individuelt med dine egne blomster." },
];

const occasions = [
  {
    title: "Brylluppet",
    text: "Forevig blomsterne fra en af livets største dage i et personligt værk, der kan følge jer videre gennem livet.",
  },
  {
    title: "Et menneske, du savner",
    text: "Bevar blomster fra en afsked eller mindestund som et nænsomt og varigt minde om et menneske, der betyder noget.",
  },
  {
    title: "Livets særlige øjeblikke",
    text: "Blomster fra jubilæer, dåb, fødselsdage og andre begivenheder kan få nyt liv som et unikt epoxyminde.",
  },
];

const steps = [
  ["01", "Modtagelse", "Din buket ankommer til Tidskapslen og bliver forsigtigt pakket ud, registreret og gennemgået."],
  ["02", "Forberedelse", "Blomsterne udvælges og forberedes nænsomt, så så meget som muligt af deres form og udtryk bevares."],
  ["03", "Design", "Blomsterne sammensættes med udgangspunkt i den form, du har valgt, og de ønsker, vi har aftalt."],
  ["04", "Forevigelse", "Blomsterne indstøbes omhyggeligt i epoxy lag for lag. Processen tager tid og kan ikke forhastes."],
  ["05", "Sidste finish", "Når epoxyen er færdighærdet, får dit minde den sidste finish, inden det pakkes omhyggeligt og er klar til at komme hjem til dig."],
];

const navItems = [
  { label: "Hjem", path: "/" },

  { label: "Historien", path: "/historien" },
  { label: "Anledninger", path: "/anledninger" },
  { label: "Produkter & priser", path: "/produkter" },
  { label: "Sådan foregår det", path: "/processen" },
  { label: "FAQ", path: "/faq" },
  { label: "Kontakt", path: "/kontakt" },
];

function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="site">
      <header className="header">
        <nav className="nav" aria-label="Hovedmenu">
          {navItems.map((item) => (
            <button key={item.path} type="button" onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {children}

      <footer className="footer">
        <div>
          <strong>Tidskapslen</strong>
          <span>Livets blomster foreviget i epoxy</span>
          <span>CVR: 46677528</span>
        </div>
        <div className="footer-links">
          <button type="button" onClick={() => navigate("/handelsbetingelser")}>Handelsbetingelser</button>
          <button type="button" onClick={() => navigate("/privatlivspolitik")}>Privatlivspolitik</button>
          <button type="button" onClick={() => navigate("/cookiepolitik")}>Cookiepolitik</button>
        </div>
      </footer>
    </div>
  );
}

function HeroDepthImage() {
  const frameRef = useRef<HTMLDivElement>(null);

  function moveImage(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = frameRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    frame.style.setProperty("--hero-rotate-y", `${(x - 0.5) * 2.4}deg`);
    frame.style.setProperty("--hero-rotate-x", `${(0.5 - y) * 1.8}deg`);
    frame.style.setProperty("--hero-light-x", `${x * 100}%`);
    frame.style.setProperty("--hero-light-y", `${y * 100}%`);
  }

  function resetImage() {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty("--hero-rotate-y", "0deg");
    frame.style.setProperty("--hero-rotate-x", "0deg");
    frame.style.setProperty("--hero-light-x", "68%");
    frame.style.setProperty("--hero-light-y", "55%");
  }

  return (
    <div
      ref={frameRef}
      className="hero-depth-frame"
      onPointerMove={moveImage}
      onPointerLeave={resetImage}
    >
      <div className="hero-depth-card">
        <img
          src={headerBillede}
          alt="Tidskapslen – Livets blomster foreviget"
          className="hero-full-image"
        />
        <div className="hero-depth-light" aria-hidden="true" />
        <div className="hero-sparkles" aria-hidden="true">
          <i className="hero-sparkle sparkle-one" />
          <i className="hero-sparkle sparkle-two" />
          <i className="hero-sparkle sparkle-three" />
          <i className="hero-sparkle sparkle-four" />
          <i className="hero-sparkle sparkle-five" />
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <main id="top">
<section className="hero-image-only">
  <HeroDepthImage />
</section>
    </main>
  );
}

function StoryPage() {
  return (
    <main className="history-page">
      <section id="historien" className="story section">
<img className="historie-gren" src={historienGren} alt="" />

        <div className="section-kicker">Tidskapslen</div>
        <div className="story-grid">
          <h2>Blomster bærer på historier</h2>
          <div>
            <p>
              En brudebuket. Blomsterne fra en afsked. En buket fra et øjeblik,
              der ændrede noget. Nogle blomster fortjener mere end at visne.
            </p>
            <p>
              I Tidskapslen foreviges dine egne blomster i epoxy – ikke som en
              masseproduceret vare, men som et personligt unika, skabt omkring
              din historie og dine ønsker.
            </p>
          </div>
        </div>
      </section>

      <section className="about-person section">
<img
  src={historienOmMig}
  className="historien-om-mig"
  alt=""
/>
        <div className="about-person-content">
          <p className="about-person-detail">✦</p>
          <h2 className="about-person-label">MENNESKET BAG TIDSKAPSLEN</h2>
          <p className="about-person-title">Jeg hedder Stinna, og Tidskapslen er mit lille kreative univers.</p>
          <p>
            Jeg har altid haft en kærlighed til blomster, smukke detaljer og ting,
            der har en særlig betydning. Med Tidskapslen får jeg lov til at forene
            det med noget, jeg holder meget af: at skabe noget med hænderne.
          </p>
          <p>
            For mig er en buket sjældent bare blomster. Den kan være brudebuketten
            fra en af livets største dage, blomster fra et menneske, man savner,
            eller fra en begivenhed, man gerne vil kunne holde fast i lidt længere.
          </p>
          <p>
            Når jeg modtager dine blomster, ved jeg derfor også, at jeg får noget
            værdifuldt betroet. Hvert værk bliver lavet af mig, i hånden og i mit
            eget lille værksted, og jeg bruger den tid, der skal til.
          </p>
          <p>Resultatet skal ikke ligne noget, der er kommet fra en fabrik.</p>
          <p>Det skal føles som dit.</p>
          <div className="about-person-signature">
            <img src={signature} alt="Stinna" />
          </div>
        </div>
      </section>
    </main>
  );
}

function OccasionsPage() {
  return (
    <main>
      <section id="anledninger" className="occasions section">
        <div className="section-heading">
          <img
  className="anledninger-blomster"
  src={anledningerBlomster}
  alt=""
/>
          <p className="eyebrow">Når blomster betyder mere</p>
          <h2>Et minde kan begynde med en enkelt blomst.</h2>
        </div>
        <div className="occasion-grid">
          {occasions.map((item) => (
            <article className="occasion-card" key={item.title}>
              <span className="petal">✦</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductsPage() {
  const navigate = useNavigate();

  return (
    <main>
      <section id="produkter" className="products section">
        <div className="section-heading products-heading">
          <p className="eyebrow">Produkter & priser</p>
          <h2>Vælg den form, der passer til dit minde.</h2>
          <p className="products-intro">
            Alle værker er unika og skabes med dine egne blomster. Produktkortene
            viser de aktuelle modeller, mål og priser. Der er ingen “læg i kurv” –
            vi begynder altid med en personlig dialog.
          </p>
          <p className="products-intro">Alle viste priser er inkl. moms.</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article
              className={`product-card${product.name === "Arc stor" ? " product-card--arc-stor" : ""}`}
              key={product.name}
            >
              <div className="product-image-frame">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-card-footer">
                <h3>{product.name}</h3>
                {product.size && <p>{product.size}</p>}
                {product.price && <strong>{product.price} (inkl. moms)</strong>}
                <button type="button" className="product-link" onClick={() => navigate("/kontakt", { state: { productName: product.name } })}>
                  Spørg til dette produkt
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="add-ons section">
        <div className="section-heading">
          <p className="eyebrow">Personlige tilvalg</p>
          <h2>Gør dit værk endnu mere personligt.</h2>
          <p className="products-intro">
            Afhængigt af produktet kan vi tale om muligheder som tekst, navn eller
            dato, aske, et fotografi eller en lille personlig genstand. De konkrete
            muligheder aftales altid individuelt, så resultatet passer til dit minde.
          </p>
        </div>
        <div className="add-on-grid">
          {["Tekst, navn & dato", "Aske", "Fotografi", "En personlig genstand"].map((item) => (
            <article className="add-on-card" key={item}>
              <span>✦</span>
              <h3>{item}</h3>
              <p>Spørg til muligheder og pris i den personlige dialog.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <blockquote>“Det, vi holder af, behøver ikke forsvinde, bare fordi øjeblikket er forbi.”</blockquote>
      </section>
    </main>
  );
}

function ProcessPage() {
  return (
    <main>
      <section id="processen" className="process section">
        <div className="section-heading process-heading">
          <p className="eyebrow">Sådan foregår det</p>
          <h2>Fra din buket til et minde for livet</h2>
          <p className="products-intro process-intro">
            Hver buket bærer på en historie. Når dine blomster ankommer til Tidskapslen,
            bliver de behandlet med omhu gennem hele processen – fra den første gennemgang
            til det færdige minde.
          </p>
        </div>
        <div className="process-layout">
          <div className="process-illustration-wrap">
            <img className="process-illustration" src={processIllustration} alt="" />
          </div>
          <div className="process-copy-stack">
            {steps.map(([number, title, text]) => (
              <div className="process-step" key={number}>
                <div className="process-step-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqPage() {
  return (
    <main>
      <section id="faq" className="faq section">
        <div className="section-heading">
          <p className="eyebrow">Ofte stillede spørgsmål</p>
          <h2>Det er helt naturligt at have spørgsmål.</h2>
          <p className="products-intro">
            Hvert værk er unikt, og dine blomster har deres egen historie.
            Her er svar på nogle af de spørgsmål, kunder oftest har, inden vi taler sammen.
          </p>
        </div>

        <div className="faq-grid">
          <article className="faq-card">
            <h3>Hvor hurtigt skal blomsterne frem?</h3>
            <p>Jo friskere blomsterne er, når de kommer frem, desto bedre udgangspunkt har vi. Kontakt mig gerne så tidligt som muligt, så vi kan aftale den bedste løsning.</p>
          </article>
          <article className="faq-card">
            <h3>Kan jeg sende blomsterne med posten?</h3>
            <p>Ja. Vi aftaler sammen, hvordan de pakkes og sendes mest nænsomt. Du får en enkel vejledning, så blomsterne er bedst muligt beskyttet under transporten.</p>
          </article>
          <article className="faq-card">
            <h3>Bliver farverne præcis som i den friske buket?</h3>
            <p>Naturlige blomster ændrer sig, når de tørres og bevares. Nuancer kan derfor ændre sig, og små variationer er en naturlig del af det håndlavede og unikke resultat.</p>
          </article>
          <article className="faq-card">
            <h3>Kan alle blomster bruges?</h3>
            <p>Mange blomster egner sig rigtig fint, men nogle arter og former kræver særlige hensyn. Jeg vurderer altid blomsterne individuelt. Hvis enkelte blomster eller plantedele ved modtagelsen er angrebet af råd eller mug, kraftigt nedbrudte eller på anden måde ikke egner sig til konservering, kan de blive frasorteret og kasseret for at beskytte kvaliteten af det færdige værk.</p>
          </article>
          <article className="faq-card">
            <h3>Hvor lang tid tager det?</h3>
            <p>Processen kan ikke forhastes. Blomsterne skal først tørres og klargøres, og epoxyarbejdet udføres i flere trin. Du får et realistisk forventet tidsforløb, når vi har talt om dit projekt.</p>
          </article>
          <article className="faq-card">
            <h3>Kan jeg få aske, tekst eller en personlig genstand med?</h3>
            <p>I mange tilfælde ja. Mulighederne afhænger af produktets størrelse og udformning. Vi aftaler altid personlige tilvalg sammen, før arbejdet sættes i gang.</p>
          </article>
          <article className="faq-card">
            <h3>Er en forespørgsel en bestilling?</h3>
            <p>Nej. Når du sender kontaktformularen, starter du blot en uforpligtende dialog. Først når vi sammen har aftalt produkt, pris og detaljer, går vi videre.</p>
          </article>
          <article className="faq-card">
            <h3>Er to værker nogensinde helt ens?</h3>
            <p>Nej – og det er netop en del af Tidskapslens idé. Blomsternes form, farve og placering gør hvert eneste værk til et unikt minde.</p>
          </article>
        </div>

        <div className="practical-note">
          <p className="eyebrow">Vigtigt at vide</p>
          <h3>Dit værk skabes af naturmaterialer.</h3>
          <p>Små farveændringer, luftbobler og naturlige variationer kan forekomme. Det er ikke masseproduktion – det er håndværk, skabt omkring dine egne blomster.</p>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "Bryllup",
    eventDate: "",
    productInterest: (location.state as { productName?: string } | null)?.productName ?? "",
    addOns: [] as string[],
    message: "",
    website: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const selectedProduct = (location.state as { productName?: string } | null)?.productName;
    if (selectedProduct) {
      setForm((current) => ({ ...current, productInterest: selectedProduct }));
    }
  }, [location.state]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleAddOn = (value: string) => {
    setForm((current) => ({
      ...current,
      addOns: current.addOns.includes(value)
        ? current.addOns.filter((item) => item !== value)
        : [...current.addOns, value],
    }));
  };

  const submitInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.website) {
      setFormStatus("success");
      setFormMessage("Tak for din henvendelse.");
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormStatus("error");
      setFormMessage("Udfyld venligst navn, e-mail og din besked.");
      return;
    }

    if (!supabase) {
      setFormStatus("error");
      setFormMessage("Kontaktformularen er endnu ikke koblet til Supabase på denne installation.");
      return;
    }

    setFormStatus("sending");
    setFormMessage("Sender din henvendelse...");

    const { error } = await supabase.from("website_inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      occasion: form.occasion,
      event_date: form.eventDate || null,
      product_interest: form.productInterest || null,
      add_ons: form.addOns,
      message: form.message.trim(),
      status: "ny",
    });

    if (error) {
      setFormStatus("error");
      setFormMessage(error.message);
      return;
    }

    setFormStatus("success");
    setFormMessage("Tak. Din henvendelse er sendt til Tidskapslen. Jeg vender tilbage så hurtigt som muligt.");
    setForm({
      name: "",
      email: "",
      phone: "",
      occasion: "Bryllup",
      eventDate: "",
      productInterest: "",
      addOns: [],
      message: "",
      website: "",
    });
  };

  return (
    <main>
      <section id="kontakt" className="contact section">
        <div className="contact-layout">
          <div className="contact-intro">
            <p className="eyebrow">Lad os tale om dine blomster</p>
            <h2>Fortæl mig lidt om dit minde.</h2>
            <p>
              Hvert projekt begynder med en personlig dialog. Formularen er en
              uforpligtende forespørgsel – ikke en bindende bestilling.
            </p>
            <p>
              Du behøver ikke vide præcis, hvilket produkt du ønsker endnu.
              Fortæl blot lidt om dine blomster og dine tanker, så finder vi
              den rigtige løsning sammen.
            </p>
          </div>

          <form className="inquiry-form" onSubmit={submitInquiry}>
            {form.productInterest && (
              <div className="selected-product-note">
                <strong>Du spørger til: {form.productInterest}</strong>
                <span>Jeg hjælper dig gerne med mulighederne for netop dette værk.</span>
              </div>
            )}

            <div className="form-grid">
              <label>
                <span>Navn *</span>
                <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Dit navn" />
              </label>

              <label>
                <span>E-mail *</span>
                <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="din@email.dk" />
              </label>

              <label>
                <span>Telefon</span>
                <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Telefonnummer" />
              </label>

              <label>
                <span>Anledning</span>
                <select value={form.occasion} onChange={(event) => updateField("occasion", event.target.value)}>
                  <option>Bryllup</option>
                  <option>Minde / afsked</option>
                  <option>Jubilæum</option>
                  <option>Dåb / navngivning</option>
                  <option>Anden særlig begivenhed</option>
                </select>
              </label>

              <label>
                <span>Dato for begivenheden, hvis du kender den</span>
                <input type="date" value={form.eventDate} onChange={(event) => updateField("eventDate", event.target.value)} />
              </label>

              <label>
                <span>Produkt du overvejer</span>
                <select value={form.productInterest} onChange={(event) => updateField("productInterest", event.target.value)}>
                  <option value="">Jeg er ikke sikker endnu</option>
                  {products.map((product) => (
                    <option key={product.name} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="add-on-options">
              <legend>Er der noget personligt, du gerne vil have med?</legend>
              {["Tekst, navn & dato", "Aske", "Fotografi", "En personlig genstand"].map((item) => (
                <label key={item} className="checkbox-label">
                  <input type="checkbox" checked={form.addOns.includes(item)} onChange={() => toggleAddOn(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </fieldset>

            <label className="message-field">
              <textarea rows={6} value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Skriv din besked her..." />
            </label>

            <label className="honeypot" aria-hidden="true">
              <span>Website</span>
              <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => updateField("website", event.target.value)} />
            </label>

            <button type="submit" className="primary submit-button" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Sender..." : "Send uforpligtende forespørgsel"}
            </button>

            {formMessage && <p className={`form-message ${formStatus}`}>{formMessage}</p>}

            <small className="form-note">Ved at sende formularen accepterer du, at Tidskapslen må kontakte dig om din forespørgsel.</small>
          </form>
        </div>
      </section>

    </main>
  );
}
function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main>
      <section className="legal section">
        <div className="section-heading">
          <p className="eyebrow">Praktisk & juridisk</p>
          <h2>{title}</h2>
        </div>

        {children}
      </section>
    </main>
  );
}

function HandelsbetingelserPage() {
  return (
    <LegalPage title="Handelsbetingelser">
      <article className="legal-card">
        <p className="eyebrow">Handelsbetingelser</p>
          <h3>Handelsbetingelser for Tidskapslen</h3>
          <h4>1. Virksomhedsoplysninger</h4>
          <p>Tidskapslen · CVR: 46677528 · E-mail: tidskapslenepoxyminder@gmail.com · Telefon: 40 92 23 14.</p>
          <h4>2. Forespørgsel og aftale</h4>
          <p>En henvendelse via hjemmesiden er uforpligtende og udgør ikke en bindende bestilling. En aftale indgås først, når Tidskapslen og kunden skriftligt har aftalt det konkrete produkt, pris, eventuelle tilvalg, levering og øvrige relevante forhold.</p>
          <h4>3. Unika og naturmaterialer</h4>
          <p>Alle værker fremstilles individuelt med kundens egne blomster og andre aftalte materialer. Farver, form og udtryk kan ændre sig under tørring og indstøbning. Små luftbobler, nuanceforskelle og naturlige variationer kan forekomme og er en del af det håndlavede udtryk.</p>
          <h4>4. Pris og betaling</h4>
          <p>Den konkrete pris aftales før arbejdet påbegyndes. Eventuelle “fra-priser” er vejledende minimumspriser. Kunden informeres om den samlede aftalte pris og eventuelle leveringsomkostninger inden bindende aftale. Betalingsmetode og betalingstidspunkt fremgår af den konkrete ordrebekræftelse.</p>
          <h4>5. Levering og tidsforløb</h4>
          <p>Den normale leveringstid er ca. 3–4 måneder fra modtagelsen af blomsterne. Tidsforløbet kan variere afhængigt af blomsternes tilstand, tørretid, det valgte produkt og arbejdets omfang. Da processen består af flere håndværksmæssige trin, herunder tørring, klargøring og støbning, kan den ikke forhastes. Et forventet tidsforløb oplyses i forbindelse med den konkrete aftale. Forsinkelser kan forekomme, hvis materialerne kræver ekstra behandling, eller hvis uforudsete forhold opstår.</p>
          <h4>6. Kundens blomster og indleverede genstande</h4>
          <p>Kunden er ansvarlig for, at blomster og eventuelle personlige genstande er lovlige at sende og indlevere. Tidskapslen behandler materialerne så nænsomt som muligt, men naturmaterialer er skrøbelige, og resultatet afhænger af materialernes tilstand ved modtagelsen. Ved modtagelsen vurderer Tidskapslen blomsternes tilstand og egnethed til konservering og indstøbning. Tidskapslen forbeholder sig retten til at frasortere og kassere enkelte blomster eller plantedele, hvis de vurderes at være i en stand, hvor de ikke kan anvendes forsvarligt i det færdige værk, eksempelvis på grund af råd, mug, kraftig nedbrydning eller anden beskadigelse.</p>
          <h4>7. Fortrydelsesret og specialfremstillede varer</h4>
          <p>Da Tidskapslens værker fremstilles individuelt efter kundens specifikationer og med kundens egne blomster, kan reglerne om undtagelse fra den almindelige 14-dages fortrydelsesret for specialfremstillede eller tydeligt personlige varer være relevante. Kunden får oplysning om dette, før en bindende aftale indgås.</p>
          <h4>8. Reklamation</h4>
          <p>Hvis du mener, at der er en mangel ved det leverede værk, skal du kontakte Tidskapslen hurtigst muligt med en beskrivelse og gerne billeder. Dine ufravigelige rettigheder efter dansk forbrugerret gælder fortsat.</p>
          <h4>9. Tvister</h4>
          <p>Eventuelle uenigheder forsøges først løst i dialog. Oplysninger om relevant klageadgang tilføjes, når virksomhedens registrering og salgsmodel er endeligt fastlagt.</p>
      </article>
    </LegalPage>
  );
}

function PrivatlivspolitikPage() {
  return (
    <LegalPage title="Privatlivspolitik">
      <article className="legal-card">
        <p className="eyebrow">Privatlivspolitik</p>
        <h3>Sådan behandler Tidskapslen dine oplysninger</h3>
        <h4>1. Dataansvarlig</h4>
        <p>Tidskapslen / Tidskapslen, CVR: 46677528, er dataansvarlig for de personoplysninger, du sender via hjemmesiden eller giver i forbindelse med en kundehenvendelse. Kontakt: email; tidskapslenepoxyminder@gmail.com Telefon: 40922314.</p>
        <h4>2. Hvilke oplysninger behandles?</h4>
        <p>Vi kan behandle navn, e-mailadresse, telefonnummer, anledning, dato for begivenhed, produktinteresse, tilvalg og den besked, du selv skriver i kontaktformularen. Senere i kundeforløbet kan vi også behandle oplysninger, der er nødvendige for tilbud, aftale, betaling, levering og dokumentation.</p>
        <h4>3. Formål</h4>
        <p>Oplysningerne bruges til at besvare din henvendelse, rådgive dig om muligheder, udarbejde tilbud og – hvis du bliver kunde – administrere den aftalte ordre og kundedialog.</p>
        <h4>4. Retsgrundlag</h4>
        <p>Behandling i forbindelse med en konkret forespørgsel sker for at kunne besvare din henvendelse og tage skridt på din anmodning før en eventuel aftale. Oplysninger, der er nødvendige for en indgået aftale, behandles for at kunne opfylde aftalen. Eventuelle lovpligtige oplysninger opbevares efter gældende regler.</p>
        <h4>5. Opbevaring</h4>
        <p>Henvendelser opbevares kun så længe, det er relevant for dialogen og eventuel opfølgning. Kunde- og regnskabsoplysninger kan blive opbevaret længere, når lovgivningen kræver det. En mere præcis slettefrist fastsættes, før hjemmesiden lanceres offentligt.</p>
        <h4>6. Databehandlere og hosting</h4>
        <p>Hjemmesiden kan anvende tekniske leverandører til hosting og datalagring, herunder Vercel og Supabase. Disse leverandører behandler kun oplysninger som led i den tekniske drift og efter gældende databeskyttelseskrav.</p>
        <h4>7. Dine rettigheder</h4>
        <p>Du kan blandt andet have ret til indsigt, rettelse, sletning, begrænsning og indsigelse afhængigt af situationen. Du kan kontakte Tidskapslen via [indsæt e-mail]. Du kan også klage til Datatilsynet, hvis du mener, at dine personoplysninger behandles i strid med reglerne.</p>
      </article>
    </LegalPage>
  );
}

function CookiepolitikPage() {
  return (
    <LegalPage title="Cookiepolitik">
      <article className="legal-card">
        <p className="eyebrow">Cookiepolitik</p>
        <h3>Cookies på Tidskapslens hjemmeside</h3>
        <h4>1. Nødvendige tekniske funktioner</h4>
        <p>Den nuværende version af hjemmesiden er bygget uden markedsføringscookies og uden analyseværktøjer. Hvis hjemmesiden alene bruger teknisk nødvendige funktioner, kræves der som udgangspunkt ikke samtykke til statistik- eller markedsføringscookies, fordi sådanne cookies ikke sættes.</p>
        <h4>2. Hvis vi senere tilføjer statistik eller markedsføring</h4>
        <p>Hvis Tidskapslen senere tilføjer statistik, annoncering, Meta Pixel, Google Analytics eller andre ikke-nødvendige cookies eller lignende teknologier, vil der blive indført en samtykkeløsning, før disse teknologier aktiveres.</p>
        <h4>3. Ændringer</h4>
        <p>Cookiepolitikken opdateres, hvis hjemmesidens tekniske opsætning ændres.</p>
      </article>
    </LegalPage>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
      <Route path="/historien" element={<SiteLayout><StoryPage /></SiteLayout>} />
      <Route path="/anledninger" element={<SiteLayout><OccasionsPage /></SiteLayout>} />
      <Route path="/produkter" element={<SiteLayout><ProductsPage /></SiteLayout>} />
      <Route path="/processen" element={<SiteLayout><ProcessPage /></SiteLayout>} />
      <Route path="/faq" element={<SiteLayout><FaqPage /></SiteLayout>} />
      <Route path="/kontakt" element={<SiteLayout><ContactPage /></SiteLayout>} />
      <Route path="/handelsbetingelser" element={<SiteLayout><HandelsbetingelserPage /></SiteLayout>} />
      <Route path="/privatlivspolitik" element={<SiteLayout><PrivatlivspolitikPage /></SiteLayout>} />
      <Route path="/cookiepolitik" element={<SiteLayout><CookiepolitikPage /></SiteLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
