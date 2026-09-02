import { useEffect, useMemo, useState, type FormEvent } from "react";
import giftCardTemplate from "./assets/tidskapslen-gavekort.png";
import { supabase } from "./supabase";

const fixedAmounts = [500, 1000, 1500] as const;

type DeliveryTarget = "Køber" | "Modtager";

function formatAmount(value: number) {
  return `${value.toLocaleString("da-DK")} kr.`;
}

export function GiftCardPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(500);
  const [customAmount, setCustomAmount] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [deliveryTarget, setDeliveryTarget] = useState<DeliveryTarget>("Køber");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const amount = useMemo(
    () => selectedAmount === "custom" ? Number(customAmount.replace(",", ".")) : selectedAmount,
    [customAmount, selectedAmount],
  );

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = "Gavekort til et personligt epoxyminde | Tidskapslen";
    description?.setAttribute(
      "content",
      "Bestil et gavekort til et personligt værk hos Tidskapslen og giv mulighed for at forevige særlige blomster i epoxy.",
    );
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setConfirmationNumber("");

    if (!supabase) {
      setErrorMessage("Bestillingsformularen er midlertidigt utilgængelig. Prøv igen lidt senere.");
      return;
    }
    if (!Number.isFinite(amount) || amount < 100 || amount > 100000) {
      setErrorMessage("Vælg et beløb mellem 100 og 100.000 kr.");
      return;
    }
    if (deliveryTarget === "Modtager" && !recipientEmail.trim()) {
      setErrorMessage("Indtast modtagers e-mail, når gavekortet skal sendes direkte til modtageren.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.rpc("create_gift_card_order", {
      p_buyer_name: buyerName,
      p_buyer_email: buyerEmail,
      p_buyer_phone: buyerPhone,
      p_recipient_name: recipientName,
      p_recipient_email: recipientEmail,
      p_personal_message: personalMessage,
      p_delivery_target: deliveryTarget,
      p_amount: amount,
    });
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message || "Bestillingen kunne ikke gemmes. Prøv igen.");
      return;
    }

    const created = Array.isArray(data) ? data[0] : data;
    setConfirmationNumber(created?.gift_card_number ?? "");
  }

  return (
    <main className="gift-card-page">
      <section className="gift-card-hero section-shell">
        <div className="gift-card-hero-copy">
          <p className="eyebrow">Gavekort</p>
          <h1>Giv et minde, der varer ved</h1>
          <p>
            Et gavekort til Tidskapslen kan bruges til et personligt værk skabt med modtagerens egne
            blomster. Det er en nænsom gave til bryllup, jubilæum, fødselsdag eller et andet særligt øjeblik.
          </p>
          <a className="primary gift-card-order-link" href="#bestil-gavekort">Bestil gavekort</a>
        </div>
        <figure className="gift-card-template-frame">
          <img
            src={giftCardTemplate}
            alt="Tidskapslens gavekort i rosa nuancer med blomster og Tidskapslens logo"
          />
        </figure>
      </section>

      <section id="bestil-gavekort" className="gift-card-order-section section-shell">
        <div className="gift-card-order-heading">
          <p className="eyebrow">Bestilling</p>
          <h2>Bestil dit gavekort</h2>
          <p>Der er ingen onlinebetaling endnu. Når bestillingen er modtaget, sender jeg betalingsoplysningerne personligt.</p>
        </div>

        {confirmationNumber ? (
          <div className="gift-card-confirmation" role="status">
            <span aria-hidden="true">✦</span>
            <h2>Tak for din bestilling</h2>
            <p>Jeg sender betalingsoplysninger og gavekortet til dig hurtigst muligt.</p>
            <small>Din reference er {confirmationNumber}.</small>
          </div>
        ) : (
          <form className="gift-card-form" onSubmit={submitOrder}>
            <fieldset className="gift-card-amount-fieldset">
              <legend>Gavekortets beløb</legend>
              <div className="gift-card-amount-options">
                {fixedAmounts.map((option) => (
                  <label key={option} className={selectedAmount === option ? "selected" : ""}>
                    <input
                      type="radio"
                      name="gift-card-amount"
                      value={option}
                      checked={selectedAmount === option}
                      onChange={() => setSelectedAmount(option)}
                    />
                    {formatAmount(option)}
                  </label>
                ))}
                <label className={selectedAmount === "custom" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="gift-card-amount"
                    checked={selectedAmount === "custom"}
                    onChange={() => setSelectedAmount("custom")}
                  />
                  Valgfrit beløb
                </label>
              </div>
              {selectedAmount === "custom" && (
                <label className="gift-card-custom-amount">
                  <span>Beløb i kr. *</span>
                  <input
                    type="number"
                    min="100"
                    max="100000"
                    step="1"
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                    required
                  />
                </label>
              )}
            </fieldset>

            <div className="gift-card-form-grid">
              <label><span>Købers navn *</span><input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} required /></label>
              <label><span>Købers e-mail *</span><input type="email" value={buyerEmail} onChange={(event) => setBuyerEmail(event.target.value)} required /></label>
              <label><span>Telefonnummer</span><input type="tel" value={buyerPhone} onChange={(event) => setBuyerPhone(event.target.value)} /></label>
              <label><span>Modtagers navn</span><input value={recipientName} onChange={(event) => setRecipientName(event.target.value)} /></label>
              <label className="gift-card-field-full">
                <span>Hvem skal gavekortet sendes til? *</span>
                <select value={deliveryTarget} onChange={(event) => setDeliveryTarget(event.target.value as DeliveryTarget)}>
                  <option value="Køber">Send til køber</option>
                  <option value="Modtager">Send direkte til modtager</option>
                </select>
              </label>
              {deliveryTarget === "Modtager" && (
                <label className="gift-card-field-full">
                  <span>Modtagers e-mail *</span>
                  <input type="email" value={recipientEmail} onChange={(event) => setRecipientEmail(event.target.value)} required />
                </label>
              )}
              <label className="gift-card-field-full">
                <span>Personlig besked</span>
                <textarea rows={5} value={personalMessage} onChange={(event) => setPersonalMessage(event.target.value)} maxLength={800} />
              </label>
            </div>

            {errorMessage && <p className="gift-card-form-error" role="alert">{errorMessage}</p>}
            <button className="primary" type="submit" disabled={submitting}>
              {submitting ? "Gemmer bestillingen…" : "Bestil gavekort"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
