"use client";

import { Button } from "@/components/Button";
import { PREMIUM_UPGRADE_CONTACT_EMAIL } from "@/lib/premium/constants";

interface PremiumUpgradeCardProps {
  profileId?: string | null;
}

export function PremiumUpgradeCard({ profileId = null }: PremiumUpgradeCardProps) {
  const mailSubject = encodeURIComponent("KommaPunt Premium — Profielvergelyking");
  const mailBody = encodeURIComponent(
    profileId
      ? `Hallo KommaPunt,\n\nEk wil premium profielvergelyking ontsluit.\n\nMy profiel-ID: ${profileId}\n`
      : "Hallo KommaPunt,\n\nEk wil premium profielvergelyking ontsluit.\n",
  );

  return (
    <section className="rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-6 shadow-[6px_6px_0_0_#FF1493] sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-komma-black/55">
        Premium
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Ontsluit profielvergelyking
      </h2>
      <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-komma-black/75 sm:text-base">
        Jy kan die vergelykingservaring sien, maar resultate word net vir premium
        gebruikers oopgemaak. Premium sluit similarity scores, gedeelde waardes,
        verskille, Value Map-oorleg, en toekomstige AI-gesprekinsigte in.
      </p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          "Similarity score tussen twee profiele",
          "Gedeelde top waardes",
          "Grootste waarde-verskille",
          "Oorleg op die Value Map",
          "AI-gesprekinsigte (binnekort)",
        ].map((item) => (
          <li
            key={item}
            className="rounded-2xl border-4 border-komma-black bg-white px-4 py-3 text-sm font-bold shadow-[3px_3px_0_0_#000]"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          href={`mailto:${PREMIUM_UPGRADE_CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`}
          className="w-full px-6 py-4 text-base sm:w-auto sm:text-lg"
        >
          Vra premium-toegang
        </Button>
        <Button
          href="/bubbles"
          variant="secondary"
          className="w-full px-6 py-4 text-base sm:w-auto sm:text-lg"
        >
          Voltooi eers jou Bubbles
        </Button>
      </div>
    </section>
  );
}
