import type { ValueConflict } from "./types";

export const CONFLICTING_VALUES: Record<string, ValueConflict[]> = {
  "certainty": [
    { name: "Avontuur", reason: "Sekerheid soek stabiliteit; avontuur vra beweging, risiko en nuwe ervarings." },
    { name: "Verskeidenheid", reason: "Sekerheid hou van voorspelbaarheid; verskeidenheid soek verandering." },
    { name: "Opwinding", reason: "Sekerheid wil beskerm; opwinding wil voel, waag en ervaar." },
  ],
  "control": [
    { name: "Vryheid", reason: "Beheer wil rigting hou; vryheid wil ruimte om self te kies." },
    { name: "Vertroue", reason: "Beheer neem die stuur; vertroue gee dit weer aan ander of aan die proses." },
    { name: "Spanwerk", reason: "Beheer fokus op jou plan; spanwerk vra gedeelde besluite." },
  ],
  "financial-stability": [
    { name: "Avontuur", reason: "Finansiele stabiliteit soek sekerheid; avontuur kan onvoorspelbare koste vra." },
    { name: "Vryheid", reason: "Stabiliteit vra beplanning; vryheid wil soms spontane keuses." },
    { name: "Plesier", reason: "Stabiliteit spaar en beplan; plesier geniet nou, soms sonder langtermyn rekening." },
  ],
  "health": [
    { name: "Plesier", reason: "Gesondheid vra dissipline; plesier soek lekker en ontspanning." },
    { name: "Opwinding", reason: "Gesondheid hou ritme; opwinding jaag na intensiteit." },
    { name: "Sukses", reason: "Gesondheid vra rus; sukses vra dikwels tempo en druk." },
  ],
  "job-security": [
    { name: "Groei", reason: "Werksekerheid soek stabiliteit; groei vra soms nuwe paaie en risiko." },
    { name: "Avontuur", reason: "Werksekerheid hou aan wat bekend is; avontuur soek verandering." },
    { name: "Betekenisvolle werk", reason: "Werksekerheid kies veilig; betekenisvolle werk kan 'n skuif of sprong vra." },
  ],
  "peace": [
    { name: "Moed", reason: "Vrede soek kalmte; moed stap soms reguit die moeilike gesprek in." },
    { name: "Uitdaging", reason: "Vrede wil rus; uitdaging rek jou doelbewus." },
    { name: "Aanspreeklikheid", reason: "Vrede vermy konflik; aanspreeklikheid vra dat jy moeilike waarheid op die tafel sit." },
  ],
  "privacy": [
    { name: "Eerlikheid", reason: "Privaatheid beskerm; eerlikheid vra openheid." },
    { name: "Liefde", reason: "Privaatheid hou afstand; liefde soek nabyheid en deel." },
    { name: "Spanwerk", reason: "Privaatheid hou dinge vir jouself; spanwerk leef van gedeelde inligting." },
  ],
  "security": [
    { name: "Avontuur", reason: "Sekuriteit wil beskerm; avontuur wil die onbekende verken." },
    { name: "Vryheid", reason: "Sekuriteit soek veiligheid; vryheid soek ruimte en risiko." },
    { name: "Verskeidenheid", reason: "Sekuriteit hou aan wat bekend is; verskeidenheid soek nuutheid." },
  ],
  "trust": [
    { name: "Beheer", reason: "Vertroue gee oor; beheer neem terug." },
    { name: "Privaatheid", reason: "Vertroue deel; privaatheid beskerm." },
    { name: "Sekerheid", reason: "Vertroue laat los; sekerheid wil alles eers bevestig." },
  ],
  "acceptance": [
    { name: "Uitnemendheid", reason: "Aanvaarding sê jy is genoeg; uitnemendheid streef hoër." },
    { name: "Dissipline", reason: "Aanvaarding rus in die huidige; dissipline druk aan vir verandering." },
    { name: "Aanspreeklikheid", reason: "Aanvaarding omhels; aanspreeklikheid vra verantwoording." },
  ],
  "compassion": [
    { name: "Geregtigheid", reason: "Deernis sien die mens; geregtigheid vra ook vir reg en rekenskap." },
    { name: "Dissipline", reason: "Deernis versag; dissipline hou firm aan grense." },
    { name: "Grense", reason: "Deernis gee; grens stel perke om volhoubaar te bly." },
  ],
  "family": [
    { name: "Onafhanklikheid", reason: "Familie bind; onafhanklikheid soek eie pad." },
    { name: "Avontuur", reason: "Familie vra aanwesigheid; avontuur trek jou elders heen." },
    { name: "Betekenisvolle werk", reason: "Familie vra tyd saam; betekenisvolle werk kan ook groot eise stel." },
  ],
  "forgiveness": [
    { name: "Geregtigheid", reason: "Vergifnis laat los; geregtigheid vra dat onreg erken word." },
    { name: "Aanspreeklikheid", reason: "Vergifnis maak ruimte; aanspreeklikheid vra dat iemand antwoord gee." },
    { name: "Respek", reason: "Vergifnis herstel; respek kan eers vra dat grense respekteer word." },
  ],
  "friendship": [
    { name: "Eerlikheid", reason: "Vriendskap wil harmonie; eerlikheid kan ongemak bring." },
    { name: "Ambisie", reason: "Vriendskap vra tyd; ambisie vra fokus en tempo." },
    { name: "Grense", reason: "Vriendskap verbind; grense beskerm jou energie." },
  ],
  "honesty": [
    { name: "Vrede", reason: "Eerlikheid sê die waarheid; vrede soek soms stilte." },
    { name: "Aanvaarding", reason: "Eerlikheid is duidelik; aanvaarding omarm sonder oordeel." },
    { name: "Gewildheid", reason: "Eerlikheid kan skuur; gewildheid soek goedkeuring." },
  ],
  "love": [
    { name: "Onafhanklikheid", reason: "Liefde bind; onafhanklikheid soek eie ruimte." },
    { name: "Beheer", reason: "Liefde gee; beheer kan oorneem." },
    { name: "Ambisie", reason: "Liefde vra tyd; ambisie vra fokus elders." },
  ],
  "loyalty": [
    { name: "Eerlikheid", reason: "Lojaliteit bly by; eerlikheid kan die groep of vriend konfronteer." },
    { name: "Geregtigheid", reason: "Lojaliteit hou aan mense; geregtigheid vra ook vir reg." },
    { name: "Outentiekheid", reason: "Lojaliteit volg die groep; outentiekheid volg jou waarheid." },
  ],
  "religion": [
    { name: "Verdraagsaamheid", reason: "Geloof hou vas aan oortuiging; verdraagsaamheid maak ruimte vir verskil." },
    { name: "Vryheid", reason: "Geloof gee riglyne; vryheid soek eie keuse." },
    { name: "Opwinding", reason: "Geloof soek heiligheid; opwinding soek intensiteit." },
  ],
  "teamwork": [
    { name: "Uniekheid", reason: "Spanwerk soek een rigting; uniekheid wil uitstaan." },
    { name: "Onafhanklikheid", reason: "Spanwerk deel; onafhanklikheid doen alleen." },
    { name: "Outoriteit", reason: "Spanwerk is gelyk; outoriteit lei van voor." },
  ],
  "tradition": [
    { name: "Kreatiwiteit", reason: "Tradisie hou aan wat was; kreatiwiteit soek nuut." },
    { name: "Groei", reason: "Tradisie erf; groei verander." },
    { name: "Outentiekheid", reason: "Tradisie volg die groep; outentiekheid volg jou eie stem." },
  ],
  "appreciation": [
    { name: "Onafhanklikheid", reason: "Waardering erken ander; onafhanklikheid staan op eie bene." },
    { name: "Nederigheid", reason: "Waardering sê dankie; nederigheid wil nie die aandag hê nie." },
    { name: "Outentiekheid", reason: "Waardering sê mooi; outentiekheid kan weier om te toneel." },
  ],
  "authority": [
    { name: "Gelykheid", reason: "Outoriteit lei; gelykheid deel mag." },
    { name: "Vryheid", reason: "Outoriteit stel rigting; vryheid weerstaan bevel." },
    { name: "Spanwerk", reason: "Outoriteit besluit; spanwerk besluit saam." },
  ],
  "beauty": [
    { name: "Outentiekheid", reason: "Skoonheid soek estetika; outentiekheid soek egtheid." },
    { name: "Eenvoud", reason: "Skoonheid kan verfyn; eenvoud hou minimaal." },
    { name: "Finansiele stabiliteit", reason: "Skoonheid kos; stabiliteit spaar." },
  ],
  "competence": [
    { name: "Nederigheid", reason: "Bevoegdheid ken jou sterkte; nederigheid bly leerbaar." },
    { name: "Avontuur", reason: "Bevoegdheid bou op wat jy ken; avontuur spring in die onbekende." },
    { name: "Verskeidenheid", reason: "Bevoegdheid fokus; verskeidenheid versprei." },
  ],
  "courage": [
    { name: "Vrede", reason: "Moed stap in; vrede wil eers kalmeer." },
    { name: "Sekerheid", reason: "Moed waag; sekerheid wil eers weet." },
    { name: "Sekuriteit", reason: "Moed neem risiko; sekuriteit beskerm." },
  ],
  "fame": [
    { name: "Privaatheid", reason: "Roem wil gesien word; privaatheid wil wegsteek." },
    { name: "Outentiekheid", reason: "Roem speel vir die gehoor; outentiekheid speel vir waarheid." },
    { name: "Innerlike harmonie", reason: "Roem jaag eksterne bevestiging; innerlike harmonie soek belyning binne." },
  ],
  "influence": [
    { name: "Nederigheid", reason: "Invloed lei; nederigheid dien." },
    { name: "Gelykheid", reason: "Invloed het mag; gelykheid deel mag." },
    { name: "Verdraagsaamheid", reason: "Invloed stuur; verdraagsaamheid luister." },
  ],
  "popularity": [
    { name: "Eerlikheid", reason: "Gewildheid soek goedkeuring; eerlikheid kan mense ontstel." },
    { name: "Outentiekheid", reason: "Gewildheid pas by; outentiekheid staan alleen indien nodig." },
    { name: "Moed", reason: "Gewildheid vermy konflik; moed konfronteer." },
  ],
  "reputation": [
    { name: "Outentiekheid", reason: "Reputasie kyk na beeld; outentiekheid kyk na waarheid." },
    { name: "Moed", reason: "Reputasie beskerm; moed kan dit op die spel sit." },
    { name: "Eerlikheid", reason: "Reputasie wil lyk; eerlikheid sê wat is." },
  ],
  "respect": [
    { name: "Opwinding", reason: "Respek is ordentlik; opwinding is impulsief." },
    { name: "Uitdaging", reason: "Respek hou grense; uitdaging druk daarop." },
    { name: "Eerlikheid", reason: "Respek is sag; eerlikheid kan hard wees." },
  ],
  "uniqueness": [
    { name: "Tradisie", reason: "Uniekheid staan uit; tradisie volg die groep." },
    { name: "Spanwerk", reason: "Uniekheid is anders; spanwerk pas in." },
    { name: "Gewildheid", reason: "Uniekheid kan skuur; gewildheid soek aanvaarding." },
  ],
  "wealth": [
    { name: "Bydrae", reason: "Welvaart spaar en bou; bydrae gee weg." },
    { name: "Deernis", reason: "Welvaart fokus op eie lewe; deernis fokus op ander se nood." },
    { name: "Eenvoud", reason: "Welvaart meer; eenvoud minder." },
  ],
  "accountability": [
    { name: "Aanvaarding", reason: "Aanspreeklikheid vra rekenskap; aanvaarding omarm." },
    { name: "Vrede", reason: "Aanspreeklikheid konfronteer; vrede vermy." },
    { name: "Deernis", reason: "Aanspreeklikheid is hard; deernis is sag." },
  ],
  "adventure": [
    { name: "Sekerheid", reason: "Avontuur soek die onbekende; sekerheid soek stabiliteit." },
    { name: "Werksekerheid", reason: "Avontuur kan 'n skuif vra; werksekerheid hou aan wat veilig is." },
    { name: "Tradisie", reason: "Avontuur breek nuut; tradisie hou aan erfenis." },
  ],
  "ambition": [
    { name: "Vrede", reason: "Ambisie jaag; vrede rus." },
    { name: "Familie", reason: "Ambisie vra tyd; familie vra ook jou teenwoordigheid." },
    { name: "Innerlike harmonie", reason: "Ambisie druk aan; innerlike harmonie soek belyning." },
  ],
  "challenge": [
    { name: "Vrede", reason: "Uitdaging rek; vrede kalmeer." },
    { name: "Sekuriteit", reason: "Uitdaging waag; sekuriteit beskerm." },
    { name: "Plesier", reason: "Uitdaging is moeilik; plesier is lekker." },
  ],
  "curiosity": [
    { name: "Sekerheid", reason: "Nuuskierigheid vra; sekerheid wil eers weet." },
    { name: "Dissipline", reason: "Nuuskierigheid spring; dissipline volg plan." },
    { name: "Tradisie", reason: "Nuuskierigheid vra nuwe vrae; tradisie hou aan antwoorde." },
  ],
  "aanpasbaarheid": [
    { name: "Stabiliteit", reason: "Aanpasbaarheid buig; stabiliteit hou vas." },
    { name: "Doelgerigtheid", reason: "Aanpasbaarheid pas aan; doelgerigtheid hou koers." },
    { name: "Toewyding", reason: "Aanpasbaarheid verander; toewyding bly." },
  ],
  "ontdekking": [
    { name: "Stabiliteit", reason: "Ontdekking soek nuut; stabiliteit hou vas." },
    { name: "Dissipline", reason: "Ontdekking verken; dissipline voltooi." },
    { name: "Fokus", reason: "Ontdekking versprei; fokus kies een ding." },
  ],
  "openheid": [
    { name: "Sekerheid", reason: "Oopkopheid oorweeg die nuut; sekerheid sluit vinnig." },
    { name: "Tradisie", reason: "Oopkopheid ondersoek; tradisie beskerm die beproefde." },
    { name: "Dissipline", reason: "Oopkopheid bly oop; dissipline kies en voltooi." },
  ],
  "determination": [
    { name: "Vrede", reason: "Vasberadenheid hou aan; vrede laat los." },
    { name: "Buigsaamheid", reason: "Vasberadenheid hou koers; buigsaamheid pas aan." },
    { name: "Deernis", reason: "Vasberadenheid is hard; deernis is sag." },
  ],
  "discipline": [
    { name: "Plesier", reason: "Dissipline stuur; plesier geniet." },
    { name: "Verskeidenheid", reason: "Dissipline hou roetine; verskeidenheid soek afwisseling." },
    { name: "Opwinding", reason: "Dissipline is konsekwent; opwinding is spontaan." },
  ],
  "excellence": [
    { name: "Vrede", reason: "Uitnemendheid streef; vrede rus in genoeg." },
    { name: "Aanvaarding", reason: "Uitnemendheid wil beter; aanvaarding sê jy is genoeg." },
    { name: "Spoed", reason: "Uitnemendheid neem tyd; spoed wil vinnig klaar." },
  ],
  "growth": [
    { name: "Aanvaarding", reason: "Groei verander; aanvaarding omarm wat is." },
    { name: "Vrede", reason: "Groei rek; vrede kalmeer." },
    { name: "Tradisie", reason: "Groei skuif; tradisie erf." },
  ],
  "intelligence": [
    { name: "Nederigheid", reason: "Intelligensie weet; nederigheid leer." },
    { name: "Deernis", reason: "Intelligensie analiseer; deernis voel saam." },
    { name: "Spanwerk", reason: "Intelligensie kan alleen dink; spanwerk dink saam." },
  ],
  "success": [
    { name: "Vrede", reason: "Sukses jaag; vrede rus." },
    { name: "Familie", reason: "Sukses vra tyd; familie vra ook jou teenwoordigheid." },
    { name: "Plesier", reason: "Sukses werk; plesier geniet." },
  ],
  "variety": [
    { name: "Dissipline", reason: "Verskeidenheid soek nuut; dissipline hou roetine." },
    { name: "Sekerheid", reason: "Verskeidenheid verander; sekerheid stabiliseer." },
    { name: "Tradisie", reason: "Verskeidenheid breek; tradisie erf." },
  ],
  "wisdom": [
    { name: "Opwinding", reason: "Wysheid dink stadig; opwinding reageer vinnig." },
    { name: "Impulsiwiteit", reason: "Wysheid wag; impulsiwiteit spring." },
    { name: "Roem", reason: "Wysheid is diep; roem is oppervlakkig." },
  ],
  "authenticity": [
    { name: "Gewildheid", reason: "Outentiekheid is eg; gewildheid pas by." },
    { name: "Tradisie", reason: "Outentiekheid kies self; tradisie volg die groep." },
    { name: "Lojaliteit", reason: "Outentiekheid sê waar; lojaliteit bly stil." },
  ],
  "commitment": [
    { name: "Verskeidenheid", reason: "Toewyding bly; verskeidenheid soek nuut." },
    { name: "Avontuur", reason: "Toewyding bind; avontuur los." },
    { name: "Vryheid", reason: "Toewyding sê ja; vryheid hou opsies oop." },
  ],
  "contribution": [
    { name: "Selfsorg", reason: "Bydrae gee; selfsorg herlaai." },
    { name: "Plesier", reason: "Bydrae dien; plesier geniet." },
    { name: "Finansiele stabiliteit", reason: "Bydrae gee weg; stabiliteit bou reserwe." },
  ],
  "creativity": [
    { name: "Tradisie", reason: "Kreatiwiteit breek; tradisie erf." },
    { name: "Dissipline", reason: "Kreatiwiteit speel; dissipline volg plan." },
    { name: "Sekerheid", reason: "Kreatiwiteit is onvoorspelbaar; sekerheid wil weet." },
  ],
  "vernuwing": [
    { name: "Stabiliteit", reason: "Vernuwing verander; stabiliteit hou vas." },
    { name: "Orde", reason: "Vernuwing breek patrone; orde hou struktuur." },
    { name: "Lojaliteit", reason: "Vernuwing jaag vorentoe; lojaliteit bly by mense." },
  ],
  "equality": [
    { name: "Outoriteit", reason: "Gelykheid deel mag; outoriteit konsentreer mag." },
    { name: "Tradisie", reason: "Gelykheid vra nuwe reëls; tradisie hou aan ou orde." },
    { name: "Roem", reason: "Gelykheid is gemeenskap; roem is uitstaan." },
  ],
  "ethics": [
    { name: "Gewildheid", reason: "Etiek doen reg; gewildheid soek goedkeuring." },
    { name: "Wins", reason: "Etiek vra integriteit; wins soek voordeel." },
    { name: "Lojaliteit", reason: "Etiek sê waar; lojaliteit bly stil." },
  ],
  "excitement": [
    { name: "Vrede", reason: "Opwinding jaag; vrede kalmeer." },
    { name: "Dissipline", reason: "Opwinding is spontaan; dissipline is konsekwent." },
    { name: "Sekuriteit", reason: "Opwinding waag; sekuriteit beskerm." },
  ],
  "freedom": [
    { name: "Toewyding", reason: "Vryheid hou opsies oop; toewyding sê ja." },
    { name: "Tradisie", reason: "Vryheid kies self; tradisie volg erfenis." },
    { name: "Spanwerk", reason: "Vryheid is alleen; spanwerk is saam." },
  ],
  "helpfulness": [
    { name: "Grense", reason: "Behulpsaamheid gee; grense beskerm." },
    { name: "Onafhanklikheid", reason: "Behulpsaamheid help; onafhanklikheid doen self." },
    { name: "Selfsorg", reason: "Behulpsaamheid gee uit; selfsorg herlaai." },
  ],
  "independence": [
    { name: "Spanwerk", reason: "Onafhanklikheid alleen; spanwerk saam." },
    { name: "Familie", reason: "Onafhanklikheid los; familie bind." },
    { name: "Liefde", reason: "Onafhanklikheid hou afstand; liefde soek nabyheid." },
  ],
  "inner-harmony": [
    { name: "Uitdaging", reason: "Innerlike harmonie rus; uitdaging rek." },
    { name: "Ambisie", reason: "Innerlike harmonie is kalm; ambisie jaag." },
    { name: "Moed", reason: "Innerlike harmonie wag; moed stap in." },
  ],
  "justice": [
    { name: "Vergifnis", reason: "Geregtigheid vra reg; vergifnis laat los." },
    { name: "Vrede", reason: "Geregtigheid konfronteer; vrede vermy." },
    { name: "Lojaliteit", reason: "Geregtigheid sê waar; lojaliteit bly stil." },
  ],
  "meaningful-work": [
    { name: "Werksekerheid", reason: "Betekenisvolle werk volg roeping; werksekerheid kies veilig." },
    { name: "Familie", reason: "Betekenisvolle werk vra tyd; familie vra ook jou teenwoordigheid." },
    { name: "Plesier", reason: "Betekenisvolle werk is ernstig; plesier is lig." },
  ],
  "passion": [
    { name: "Vrede", reason: "Passie brand; vrede kalmeer." },
    { name: "Dissipline", reason: "Passie jaag; dissipline hou ritme." },
    { name: "Familie", reason: "Passie vra fokus; familie vra tyd saam." },
  ],
  "pleasure": [
    { name: "Dissipline", reason: "Plesier geniet nou; dissipline dink langtermyn." },
    { name: "Sukses", reason: "Plesier rus; sukses werk." },
    { name: "Finansiele stabiliteit", reason: "Plesier spandeer; stabiliteit spaar." },
  ],
  "spirituality": [
    { name: "Materialisme", reason: "Spiritualiteit soek dieper sin; materialisme soek dinge." },
    { name: "Opwinding", reason: "Spiritualiteit is stil; opwinding is luid." },
    { name: "Roem", reason: "Spiritualiteit is innerlik; roem is eksterne bevestiging." },
  ],
  "tolerance": [
    { name: "Etiek", reason: "Verdraagsaamheid maak ruimte; etiek stel grens by skade." },
    { name: "Geregtigheid", reason: "Verdraagsaamheid luister; geregtigheid konfronteer onreg." },
    { name: "Geloof", reason: "Verdraagsaamheid omarm verskil; geloof hou vas aan oortuiging." },
  ],
  "regverdigheid": [
    { name: "Lojaliteit", reason: "Regverdigheid vra wat reg is vir almal; lojaliteit beskerm soms net jou mense." },
    { name: "Vryheid", reason: "Regverdigheid wil gelyke reëls; vryheid wil ruimte om self te kies." },
    { name: "Vergeefnis", reason: "Regverdigheid vra wat iemand verdien; vergeefnis kies genade bo verdiens." },
  ],
  "nederigheid": [
    { name: "Status", reason: "Nederigheid erken ander; status wil erkenning en posisie." },
    { name: "Prestasie", reason: "Nederigheid bly leerbaar; prestasie wil uitblink en uitlig." },
    { name: "Vryheid van mening", reason: "Nederigheid luister; vryheid van mening wil duidelik staan." },
  ],
  "doelgerigheid": [
    { name: "Vryheid", reason: "Doelgerigtheid hou fokus; vryheid wil spontaan en oop wees." },
    { name: "Veiligheid", reason: "Doelgerigtheid jaag groot doelwitte; veiligheid soek sekerheid en gemak." },
    { name: "Verhoudings", reason: "Doelgerigtheid vra tyd vir doel; verhoudings vra tyd vir mense." },
  ],
  "status": [
    { name: "Egtheid", reason: "Status wil indruk maak; egtheid wil getrou bly aan wie jy is." },
    { name: "Gemeenskap", reason: "Status wil uitstaan; gemeenskap wil gelyk en saam behoort." },
    { name: "Nederigheid", reason: "Status soek erkenning; nederigheid dien sonder erkenning te soek." },
  ],
  "stabiliteit": [
    { name: "Avontuur", reason: "Stabiliteit soek roetine; avontuur soek risiko en verandering." },
    { name: "Vernuwing", reason: "Stabiliteit hou aan wat werk; vernuwing soek nuwe paaie." },
    { name: "Groei", reason: "Stabiliteit wil veilig bly; groei vra beweging en ontwikkeling." },
  ],
  "diens": [
    { name: "Egtheid", reason: "Diens vra uitreik na ander; egtheid vra getrou bly aan jouself." },
    { name: "Vryheid", reason: "Diens vra toewyding; vryheid vra om jou eie pad te kies." },
    { name: "Prestasie", reason: "Diens fokus op ander; prestasie fokus op jou eie bereiking." },
  ],
  "leer": [
    { name: "Status", reason: "Leer soek begrip; status soek erkenning en applous." },
    { name: "Prestasie", reason: "Leer waardeer die reis; prestasie jaag na resultate." },
    { name: "Gemeenskap", reason: "Leer soek eie waarheid; gemeenskap vra aanpas en behoort." },
  ],
  "selfbeheersing": [
    { name: "Vryheid", reason: "Selfbeheersing stel grense; vryheid wil keuse en spontaniteit." },
    { name: "Vertroue", reason: "Selfbeheersing fokus op jouself; vertroue gee beheer aan ander of die proses." },
    { name: "Aanpasbaarheid", reason: "Selfbeheersing hou koers; aanpasbaarheid vra buigsaamheid." },
  ],
  "verantwoordelikheid": [
    { name: "Vryheid", reason: "Verantwoordelikheid vra pligte; vryheid wil ruimte om te kies." },
    { name: "Spontaniteit", reason: "Verantwoordelikheid vra beplanning; spontaniteit leef in die oomblik." },
    { name: "Self-sorg", reason: "Verantwoordelikheid vir ander kan self-sorg verdring." },
  ],
  "prestasie": [
    { name: "Welstand", reason: "Prestasie jaag resultate; welstand vra rus en herstel." },
    { name: "Familie", reason: "Prestasie vra tyd vir doelwitte; familie vra tyd vir mense." },
    { name: "Aanvaarding", reason: "Prestasie streef na uitnemendheid; aanvaarding omheem wat is." },
  ],
  "gemeenskap": [
    { name: "Onafhanklikheid", reason: "Gemeenskap vra bydrae; onafhanklikheid kies jou eie pad." },
    { name: "Egtheid", reason: "Gemeenskap vra inpas; egtheid vra om jouself te wees." },
    { name: "Privaatheid", reason: "Gemeenskap vra beskikbaarheid; privaatheid vra spasie en rus." },
  ],
  "integriteit": [
    { name: "Lojaliteit", reason: "Integriteit vra regverdigheid; lojaliteit kan kant kies bo waarheid." },
    { name: "Deernis", reason: "Integriteit vra waarheid; deernis vra sagtheid en begrip." },
    { name: "Praktiese gerief", reason: "Integriteit hou vas aan beginsels; praktiese gerief soek vinnige oplossings." },
  ],
};
