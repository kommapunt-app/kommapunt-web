import { BUBBLE_CATEGORIES, BubbleCategoryId } from "./bubbles";

export type ValueLibraryEntry = {
  id: string;
  nameAf: string;
  nameEn: string;
  category: BubbleCategoryId;
  shortMeaningAf: string;
  definitionAf: string;
  whenBigAf: string;
  strengthAf: string;
  dangerAf: string;
  questionsAf: string[];
};

export type CategoryFilter = BubbleCategoryId | "all";

export const ALL_VALUES_FILTER_LABEL = "Alle waardes";

export const VALUE_LIBRARY: ValueLibraryEntry[] = [
  {
    id: "egtheid",
    nameAf: "Egtheid",
    nameEn: "Authenticity",
    category: "ek-identiteit",
    shortMeaningAf: "Om heelhartig jouself te wees, sonder maskers.",
    definitionAf:
      "Jy wil lewe vanuit wat vir jou waar is, eerder as om net verwagtinge te speel.",
    whenBigAf:
      "Jy praat eerlik oor wat jy voel en kies paaie wat by jou pas, al is dit nie gewild nie.",
    strengthAf: "Jy skep vertroue omdat mense weet hulle kry die regte jy.",
    dangerAf:
      "Jy kan hard of onbuigsaam raak as jy elke kompromie as oneg sien.",
    questionsAf: [
      "Waar in jou lewe hou jy nog terug oor wie jy is?",
      "Watter keuse hierdie week sal meer eg voel?",
      "Hoe kan jy eerlik wees sonder om ander af te sny?",
    ],
  },
  {
    id: "selfuitdrukking",
    nameAf: "Selfuitdrukking",
    nameEn: "Self-Expression",
    category: "ek-identiteit",
    shortMeaningAf: "Om jou stem, styl en idees sigbaar te maak.",
    definitionAf:
      "Jy heg waarde daaraan om te wys wat in jou aangaan deur woorde, kuns, werk of teenwoordigheid.",
    whenBigAf:
      "Jy kies ruimtes waar jy vry kan praat en skep, en jy steek nie jou unieke aanslag weg nie.",
    strengthAf: "Jy bring kleur, eerlikheid en vars perspektief na mense om jou.",
    dangerAf:
      "Jy kan aandag begin soek bo betekenis, of weerstand as verwerping lees.",
    questionsAf: [
      "Waar voel jy tans onverstaan of ongesien?",
      "Watter vorm van uitdrukking voed jou die meeste?",
      "Hoe bly jy oop vir terugvoer sonder om stil te word?",
    ],
  },
  {
    id: "onafhanklikheid",
    nameAf: "Onafhanklikheid",
    nameEn: "Independence",
    category: "ek-identiteit",
    shortMeaningAf: "Om op jou eie oordeel en voete te kan staan.",
    definitionAf:
      "Jy wil self verantwoordelik wees vir jou rigting, besluite en lewensbou.",
    whenBigAf:
      "Jy neem eienaarskap van jou keuses en wag nie dat ander jou lewe namens jou bepaal nie.",
    strengthAf: "Jy is veerkragtig en kan beweeg selfs wanneer hulp min is.",
    dangerAf:
      "Jy kan ondersteuning wegstoot en samewerking as swakheid sien.",
    questionsAf: [
      "Waar help onafhanklikheid jou om te groei?",
      "Waar maak dit jou onnodig alleen?",
      "Wie kan jy inlaat sonder om jou agentskap te verloor?",
    ],
  },
  {
    id: "vryheid",
    nameAf: "Vryheid",
    nameEn: "Freedom",
    category: "ek-identiteit",
    shortMeaningAf: "Ruimte om jou eie pad en ritme te kies.",
    definitionAf:
      "Jy waardeer keuses, beweegruimte en die vermoë om nie vasgevang te leef nie.",
    whenBigAf:
      "Jy ontwerp jou lewe met minder onnodige beperkinge en sê nee vir goed wat jou vasdruk.",
    strengthAf: "Jy bly lewendig, nuut en oop vir moontlikhede.",
    dangerAf:
      "Jy kan verbintenis vermy en alles wat struktuur vra as beheer beleef.",
    questionsAf: [
      "Watter vryheid soek jy eintlik: tyd, plek of innerlike rus?",
      "Wat bind jou nou wat nie meer hoef nie?",
      "Hoe lyk vryheid saam met verantwoordelikheid vir jou?",
    ],
  },
  {
    id: "kreatiwiteit",
    nameAf: "Kreatiwiteit",
    nameEn: "Creativity",
    category: "ek-identiteit",
    shortMeaningAf: "Om nuut te dink, te maak en te verbeeld.",
    definitionAf:
      "Jy word gedryf deur verbeelding en die vreugde om iets vars in die wêreld te bring.",
    whenBigAf:
      "Jy maak tyd vir idees en eksperimente, en jy soek meer as net die standaard antwoord.",
    strengthAf: "Jy sien moontlikhede waar ander net beperkings sien.",
    dangerAf:
      "Jy kan vassteek in begin sonder afronding, of struktuur heeltemal afwys.",
    questionsAf: [
      "Waar wil jy weer speel en eksperimenteer?",
      "Watter idee verdien nou klein aksie?",
      "Hoe kan jy kreatiwiteit volhou tot by voltooiing?",
    ],
  },
  {
    id: "nuuskierigheid",
    nameAf: "Nuuskierigheid",
    nameEn: "Curiosity",
    category: "ek-identiteit",
    shortMeaningAf: "Die drang om te vra, ontdek en beter verstaan.",
    definitionAf:
      "Jy leef met vrae en bly oop vir nuwe kennis, mense en ervarings.",
    whenBigAf:
      "Jy luister langer, vra dieper en verander makliker van plan wanneer nuwe insig opkom.",
    strengthAf: "Jy leer vinnig en bou brûe oor verskille.",
    dangerAf:
      "Jy kan in eindelose verkenning bly en besluitneming uitstel.",
    questionsAf: [
      "Watter vraag loop nou agter in jou kop?",
      "Waar het jy te vinnig aangeneem jy weet genoeg?",
      "Wat wil jy hierdie maand doelbewus leer?",
    ],
  },
  {
    id: "familie",
    nameAf: "Familie",
    nameEn: "Family",
    category: "mense-verhoudings",
    shortMeaningAf:
      "Mense en verhoudings wat vir jou die meeste gewig dra.",
    definitionAf:
      "Die mense wat vir jou die naaste staan — bloed, keuse of gemeenskap — en wie jy bewustelik wil beskerm en koester.",
    whenBigAf:
      "Jy neem besluite met jou geliefdes in gedagte. Jy beskerm tyd, lojaliteit en verantwoordelikheid teenoor jou mense.",
    strengthAf: "Jy bou sterk bande en gee mense 'n gevoel van behoort.",
    dangerAf:
      "Jy kan jouself verloor in ander mense se behoeftes, of moeilike grense vermy.",
    questionsAf: [
      "Wie dra die meeste gewig in jou besluite?",
      "Wat doen jy om jou mense te beskerm?",
      "Wanneer moet jy ook vir jouself kies?",
    ],
  },
  {
    id: "gemeenskap",
    nameAf: "Gemeenskap",
    nameEn: "Community",
    category: "mense-verhoudings",
    shortMeaningAf: "Om saam met ander te bou en te behoort.",
    definitionAf:
      "Jy glo mense floreer in verbondenheid, waar bydrae en omgee wedersyds is.",
    whenBigAf:
      "Jy maak tyd vir jou buurt, kerk, span of netwerk en help om ruimtes veiliger en warmer te maak.",
    strengthAf: "Jy skep samehorigheid en laat mense minder alleen voel.",
    dangerAf:
      "Jy kan groepsdruk bo gewete plaas of jou identiteit in die groep verloor.",
    questionsAf: [
      "In watter gemeenskap voel jy regtig tuis?",
      "Hoe dra jy prakties by waar jy behoort?",
      "Waar moet jy grens hou teen groepsdruk?",
    ],
  },
  {
    id: "respek",
    nameAf: "Respek",
    nameEn: "Respect",
    category: "mense-verhoudings",
    shortMeaningAf: "Om elke mens se waardigheid ernstig op te neem.",
    definitionAf:
      "Jy kies om mense met agting te hanteer, selfs wanneer jy verskil of teleurgesteld is.",
    whenBigAf:
      "Jy luister sonder afmaak, praat met deursigtigheid en beskerm ander se menswaardigheid in konflik.",
    strengthAf: "Jy bou gesonde verhoudings en veilige gesprekke.",
    dangerAf:
      "Jy kan moeilike waarheid versag uit vrees om as onrespekvol gesien te word.",
    questionsAf: [
      "Wie se waardigheid het jou optrede hierdie week versterk?",
      "Waar praat jy oor mense eerder as met hulle?",
      "Hoe lyk respek wanneer jy ferm moet wees?",
    ],
  },
  {
    id: "deernis",
    nameAf: "Deernis",
    nameEn: "Compassion",
    category: "mense-verhoudings",
    shortMeaningAf: "Om ander se pyn raak te sien en daarop te reageer.",
    definitionAf:
      "Jy laat jou hart beweeg deur mense se swaarkry en kies om teenwoordig en helpend te wees.",
    whenBigAf:
      "Jy luister met sagtheid, vra wat nodig is en wys liefde in konkrete dade.",
    strengthAf: "Jy bring genesing, troos en menslikheid in moeilike tye.",
    dangerAf:
      "Jy kan emosioneel uitbrand of ander red ten koste van jou eie gesondheid.",
    questionsAf: [
      "Wie het nou jou sagte teenwoordigheid nodig?",
      "Hoe kan jy help sonder om oor te neem?",
      "Watter self-sorg hou jou deernis volhoubaar?",
    ],
  },
  {
    id: "vriendelikheid",
    nameAf: "Vriendelikheid",
    nameEn: "Friendliness",
    category: "mense-verhoudings",
    shortMeaningAf: "Warmte en goedhartigheid in alledaagse ontmoetings.",
    definitionAf:
      "Jy kies 'n toon van menslikheid, respek en toeganklikheid in hoe jy met mense werk en leef.",
    whenBigAf:
      "Jy groet, bedank, maak plek en behandel mense met geduld, ook as jy gejaag is.",
    strengthAf: "Jy maak ruimtes ligter en bou vinnig vertroue.",
    dangerAf:
      "Jy kan konflik vermy of jou eie behoeftes stilmaak om almal gemaklik te hou.",
    questionsAf: [
      "Waar kan klein vriendelikheid vandag groot verskil maak?",
      "Wanneer gebruik jy vriendelikheid om eerlikheid te vermy?",
      "Hoe wys jy goedhartigheid ook teenoor jouself?",
    ],
  },
  {
    id: "lojaliteit",
    nameAf: "Lojaliteit",
    nameEn: "Loyalty",
    category: "mense-verhoudings",
    shortMeaningAf: "Om getrou te bly aan mense en verbintenisse.",
    definitionAf:
      "Jy heg waarde daaraan om teenwoordig te bly, ook in moeilike seisoene en ongemaklike waarhede.",
    whenBigAf:
      "Jy hou jou woord, staan by jou mense en werk deur spanning eerder as om net te verdwyn.",
    strengthAf: "Mense ervaar jou as betroubaar en standvastig.",
    dangerAf:
      "Jy kan verkeerde dinge verdedig uit trou, of te lank bly waar dit skadelik is.",
    questionsAf: [
      "Aan wie of wat is jy tans die diepste lojaal?",
      "Waar vra lojaliteit dat jy eerliker moet wees?",
      "Wanneer is wegstap gesonder as aanhou?",
    ],
  },
  {
    id: "behoortheid",
    nameAf: "Om te behoort",
    nameEn: "Belonging",
    category: "mense-verhoudings",
    shortMeaningAf:
      "Die behoefte om deel te voel van 'n groep of verhouding waar jy aanvaar word.",
    definitionAf:
      "Die behoefte om deel van 'n groep, familie, gemeenskap of verhouding te voel waar jy aanvaar en gewaardeer word.",
    whenBigAf:
      "Jy let op wie uitgesluit voel en bou doelbewus plek vir meer stemme en stories.",
    strengthAf: "Jy help mense ontspan en voluit deelneem.",
    dangerAf:
      "Jy kan aanvaarding soek deur jouself kleiner te maak of saam te praat teen jou gewete.",
    questionsAf: [
      "Waar voel jy tans werklik tuis?",
      "Wie in jou kring voel nog buite?",
      "Hoe kan jy behoort sonder om jouself te verloor?",
    ],
  },
  {
    id: "waarheid",
    nameAf: "Waarheid",
    nameEn: "Truth",
    category: "waarheid-beginsels",
    shortMeaningAf: "Om met feite en eerlikheid te leef.",
    definitionAf:
      "Jy verkies werklikheid bo gemak en wil die waarheid so helder moontlik soek en noem.",
    whenBigAf:
      "Jy ondersoek aannames, erken foute en kies eerlike gesprekke selfs wanneer dit ongemaklik is.",
    strengthAf: "Jy bring helderheid en geloofwaardigheid.",
    dangerAf:
      "Jy kan hard of simplisties raak as jy waarheid sonder empatie hanteer.",
    questionsAf: [
      "Watter waarheid stel jy nou uit om te benoem?",
      "Waar het jy meer feite nodig voor jy oordeel?",
      "Hoe kan jy waarheid met menslikheid kommunikeer?",
    ],
  },
  {
    id: "integriteit",
    nameAf: "Integriteit",
    nameEn: "Integrity",
    category: "waarheid-beginsels",
    shortMeaningAf: "Dat jou woorde, waardes en dade saamval.",
    definitionAf:
      "Jy streef na innerlike heelheid: dieselfde persoon in die lig en in die donker.",
    whenBigAf:
      "Jy hou by beginsels wanneer dit jou iets kos, en jy herstel reguit as jy skeef trap.",
    strengthAf: "Jy bou diep vertroue oor tyd.",
    dangerAf:
      "Jy kan moralisties raak teenoor ander of meedoënloos teenoor jouself.",
    questionsAf: [
      "Waar is daar tans 'n gaping tussen wat jy sê en doen?",
      "Watter klein herstelstap kan jy vandag neem?",
      "Hoe hou jy standaarde sonder om hard te word?",
    ],
  },
  {
    id: "geloof",
    nameAf: "Geloof",
    nameEn: "Faith",
    category: "waarheid-beginsels",
    shortMeaningAf: "Vertroue in iets groter as jouself.",
    definitionAf:
      "Jy leef vanuit oortuiging, hoop en betekenis wat nie net op onmiddellike bewyse rus nie.",
    whenBigAf:
      "Jy bid, reflekteer of vertrou doelbewus wanneer dinge onseker is, en jy laat dit jou keuses rig.",
    strengthAf: "Jy dra hoop en volharding deur swaar tye.",
    dangerAf:
      "Jy kan moeilike feite ignoreer of ander veroordeel vanuit sekerheid.",
    questionsAf: [
      "Wat anker jou wanneer jy onseker voel?",
      "Hoe vorm jou geloof jou alledaagse keuses?",
      "Waar vra geloof dat jy ook nederig moet luister?",
    ],
  },
  {
    id: "wysheid",
    nameAf: "Wysheid",
    nameEn: "Wisdom",
    category: "waarheid-beginsels",
    shortMeaningAf: "Diep insig oor wat regtig saak maak.",
    definitionAf:
      "Jy soek nie net kennis nie, maar goeie oordeel oor tyd, mense en gevolge.",
    whenBigAf:
      "Jy vertraag voor groot besluite, vra raad en onderskei wat nou reg is, nie net wat vinnig is nie.",
    strengthAf: "Jy bring kalmte en perspektief in kompleksiteit.",
    dangerAf:
      "Jy kan ooranaliseer en aksie uitstel terwyl jy op perfekte sekerheid wag.",
    questionsAf: [
      "Watter besluit vra nou meer stilte as spoed?",
      "Wie se raad vertrou jy vir hierdie seisoen?",
      "Wat wys ervaring jou wat impuls nie kan nie?",
    ],
  },
  {
    id: "geregtigheid",
    nameAf: "Geregtigheid",
    nameEn: "Justice",
    category: "waarheid-beginsels",
    shortMeaningAf: "Om op te staan vir wat reg is.",
    definitionAf:
      "Jy glo dat onreg aangespreek moet word en dat kwesbare mense beskerming en stem verdien.",
    whenBigAf:
      "Jy noem onreg, gebruik jou invloed verantwoordelik en kies aksies wat herstel en waardigheid bevorder.",
    strengthAf: "Jy bring moed en morele rigting in moeilike ruimtes.",
    dangerAf:
      "Jy kan verbitter of polariserend raak en mense reduseer tot kampe.",
    questionsAf: [
      "Watter onreg kan jy nie langer ignoreer nie?",
      "Wat is 'n realistiese volgende stap vir herstel?",
      "Hoe hou jy geregtigheid en menswaardigheid bymekaar?",
    ],
  },
  {
    id: "billikheid",
    nameAf: "Billikheid",
    nameEn: "Fairness",
    category: "waarheid-beginsels",
    shortMeaningAf: "Dat mense regverdig en konsekwent behandel word.",
    definitionAf:
      "Jy waardeer reëls en prosesse wat nie bevoordeel of benadeel op grond van mag of vooroordeel nie.",
    whenBigAf:
      "Jy toets besluite vir dubbele standaarde en pleit vir deursigtige, eweredige maatstawwe.",
    strengthAf: "Jy bou vertroue in stelsels en spanne.",
    dangerAf:
      "Jy kan konteks miskyk en streng reëlmatigheid bo menslikheid plaas.",
    questionsAf: [
      "Waar sien jy tans 'n dubbele standaard?",
      "Hoe kan jy 'n proses billiker maak?",
      "Wanneer vra billikheid ook ruimte vir konteks?",
    ],
  },
  {
    id: "verantwoordelikheid",
    nameAf: "Verantwoordelikheid",
    nameEn: "Responsibility",
    category: "waarheid-beginsels",
    shortMeaningAf: "Eienaarskap vir jou keuses en hul gevolge.",
    definitionAf:
      "Jy neem jou rol ernstig op en kies om aanspreeklik te wees, selfs wanneer dit ongemaklik is.",
    whenBigAf:
      "Jy voltooi wat jy belowe, erken wanneer jy mis en herstel waar jy skade gemaak het.",
    strengthAf: "Jy is betroubaar en stabiliseer mense om jou.",
    dangerAf:
      "Jy kan te veel dra, beheer oorneem of skuld ongesond internaliseer.",
    questionsAf: [
      "Waar moet jy nou meer eienaarskap neem?",
      "Wat dra jy wat nie joune is nie?",
      "Hoe lyk gesonde aanspreeklikheid vir jou?",
    ],
  },
  {
    id: "prestasie",
    nameAf: "Prestasie",
    nameEn: "Achievement",
    category: "prestasie-groei",
    shortMeaningAf: "Om doelwitte te bereik en vordering te sien.",
    definitionAf:
      "Jy kry energie uit resultate en die ervaring dat moeite in tasbare uitkomste verander.",
    whenBigAf:
      "Jy stel duidelike teikens, meet vordering en hou aan totdat die werk klaar is.",
    strengthAf: "Jy kry dinge oor die lyn en motiveer ander om te fokus.",
    dangerAf:
      "Jy kan jou waarde aan prestasie koppel en rus of verhoudings afskeep.",
    questionsAf: [
      "Watter doel is nou werklik belangrik?",
      "Hoe meet jy sukses op 'n gesonde manier?",
      "Wat moet saam met prestasie ook prioriteit bly?",
    ],
  },
  {
    id: "uitnemendheid",
    nameAf: "Uitnemendheid",
    nameEn: "Excellence",
    category: "prestasie-groei",
    shortMeaningAf: "Om werk met sorg en hoë standaard te doen.",
    definitionAf:
      "Jy streef na kwaliteit wat diep respek toon vir mense, tyd en vakmanskap.",
    whenBigAf:
      "Jy verfyn, toets en verbeter totdat die resultaat regtig sterk en betroubaar is.",
    strengthAf: "Jy lig die standaard van enige span of projek.",
    dangerAf:
      "Jy kan perfeksionisties raak en momentum verloor oor klein foute.",
    questionsAf: [
      "Waar vra jou werk nou 'n hoër standaard?",
      "Wat is goed genoeg, en wat vra nog slyp?",
      "Hoe keer jy dat perfeksie jou vordering steel?",
    ],
  },
  {
    id: "meriete",
    nameAf: "Meriete",
    nameEn: "Merit",
    category: "prestasie-groei",
    shortMeaningAf: "Dat moeite en vermoë eerlik erken word.",
    definitionAf:
      "Jy glo geleenthede en beloning moet sover moontlik op bydrae, werksetiek en bekwaamheid rus.",
    whenBigAf:
      "Jy bevorder duidelike maatstawwe en gee krediet waar dit verdien word.",
    strengthAf: "Jy moedig verantwoordelikheid en groei aan deur regverdige erkenning.",
    dangerAf:
      "Jy kan strukturele ongelykheid miskyk en mense tot prestasie reduseer.",
    questionsAf: [
      "Waar word bydrae tans nie reg erken nie?",
      "Hoe definieer jy meriete in hierdie konteks?",
      "Watter hindernisse moet ook in ag geneem word?",
    ],
  },
  {
    id: "groei",
    nameAf: "Groei",
    nameEn: "Growth",
    category: "prestasie-groei",
    shortMeaningAf: "Om stadig maar seker 'n beter weergawe te word.",
    definitionAf:
      "Jy sien ontwikkeling as 'n lewenslange pad van aanleer, afleer en volwasse word.",
    whenBigAf:
      "Jy soek terugvoer, neem nuwe uitdagings aan en gebruik foute as materiaal vir volgende stappe.",
    strengthAf: "Jy bly beweeg en raak met tyd sterker en wyser.",
    dangerAf:
      "Jy kan nooit tevrede wees nie en altyd voel jy is nog nie genoeg nie.",
    questionsAf: [
      "Waar het jy die laaste tyd werklik gegroei?",
      "Wat probeer jy nou afleer?",
      "Hoe vier jy vordering sonder om te stagneer?",
    ],
  },
  {
    id: "leer",
    nameAf: "Leer",
    nameEn: "Learning",
    category: "prestasie-groei",
    shortMeaningAf: "Om kennis en vaardighede doelbewus uit te bou.",
    definitionAf:
      "Jy waardeer begrip en ontwikkeling, en jy bly student van die lewe.",
    whenBigAf:
      "Jy lees, vra vrae, oefen nuwe vaardighede en maak tyd om insigte in praktyk te sit.",
    strengthAf: "Jy pas vinnig aan en bly relevant in veranderende tye.",
    dangerAf:
      "Jy kan kennis versamel sonder toepassing, of bly voorberei sonder begin.",
    questionsAf: [
      "Wat moet jy nou leer om jou volgende stap moontlik te maak?",
      "Waar kan jy leer deur te doen, nie net lees nie?",
      "Wie kan jou leerpad versnel?",
    ],
  },
  {
    id: "dissipline",
    nameAf: "Dissipline",
    nameEn: "Discipline",
    category: "prestasie-groei",
    shortMeaningAf: "Konsekwente keuses wat langtermyn doelwitte dien.",
    definitionAf:
      "Jy glo klein herhalende dade bou die karakter en resultate wat jy later wil sien.",
    whenBigAf:
      "Jy hou roetines, beskerm fokus en doen wat nodig is selfs wanneer motivering laag is.",
    strengthAf: "Jy bou momentum en betroubare progressie oor tyd.",
    dangerAf:
      "Jy kan rigied raak, rus demoniseer of ander met jou tempo meet.",
    questionsAf: [
      "Watter gewoonte dra nou die meeste vrug?",
      "Waar het jy meer konsekwentheid nodig?",
      "Hoe bou jy dissipline saam met herstel en rus?",
    ],
  },
  {
    id: "leierskap",
    nameAf: "Leierskap",
    nameEn: "Leadership",
    category: "prestasie-groei",
    shortMeaningAf: "Om rigting te gee en mense te laat groei.",
    definitionAf:
      "Jy neem verantwoordelikheid vir koers, kultuur en die ontwikkeling van ander.",
    whenBigAf:
      "Jy kommunikeer duidelik, neem moeilike besluite en skep ruimte vir ander om hul beste te bring.",
    strengthAf: "Jy mobiliseer mense rondom betekenisvolle doelwitte.",
    dangerAf:
      "Jy kan beheer oorneem, te veel sentraal raak of blind wees vir impak.",
    questionsAf: [
      "Watter voorbeeld stel jy tans deur jou optrede?",
      "Wie help jy nou doelbewus groei?",
      "Waar moet jy meer luister voor jy lei?",
    ],
  },
  {
    id: "sekuriteit",
    nameAf: "Sekuriteit",
    nameEn: "Security",
    category: "orde-stabiliteit",
    shortMeaningAf: "Die gevoel dat jy en jou mense veilig is.",
    definitionAf:
      "Jy heg waarde aan beskerming teen bedreiging en aan 'n basis van veiligheid vir die toekoms.",
    whenBigAf:
      "Jy beplan vir risiko, bou buffers en maak keuses wat fisiese, emosionele en finansiële veiligheid versterk.",
    strengthAf: "Jy skep rus en voorsorg in onseker tye.",
    dangerAf:
      "Jy kan vassteek in vrees en groei vermy om beheer te behou.",
    questionsAf: [
      "Waar het jy nou meer veiligheid nodig?",
      "Watter risiko is werklik, en watter is verbeel?",
      "Hoe beskerm jy sonder om jouself toe te sluit?",
    ],
  },
  {
    id: "stabiliteit",
    nameAf: "Stabiliteit",
    nameEn: "Stability",
    category: "orde-stabiliteit",
    shortMeaningAf: "Konsekwentheid en 'n vaste fondament vir die lewe.",
    definitionAf:
      "Jy waardeer ritme, voorspelbaarheid en betroubare strukture wat chaos temper.",
    whenBigAf:
      "Jy bou gewoontes, finansiële orde en duidelike prioriteite wat jou en jou mense dra.",
    strengthAf: "Jy bring kalmte en volhoubaarheid oor tyd.",
    dangerAf:
      "Jy kan verandering uitstel en nuwe geleenthede as bedreiging sien.",
    questionsAf: [
      "Wat gee jou tans die meeste grond onder die voete?",
      "Waar kort jou lewe nog stabiliserende ritmes?",
      "Watter verandering kan jy veilig toets?",
    ],
  },
  {
    id: "orde",
    nameAf: "Orde",
    nameEn: "Order",
    category: "orde-stabiliteit",
    shortMeaningAf: "Struktuur wat dinge helder en werkbaar maak.",
    definitionAf:
      "Jy glo duidelike reëls, rolle en prosesse help mense beter funksioneer.",
    whenBigAf:
      "Jy skep planne, definieer verwagtinge en hou stelsels netjies sodat energie nie verlore gaan nie.",
    strengthAf: "Jy verminder verwarring en verhoog betroubaarheid.",
    dangerAf:
      "Jy kan oorbeheer neem of mense bo proses vergeet.",
    questionsAf: [
      "Waar in jou lewe kort daar meer orde?",
      "Watter reël help regtig, en watter knel net?",
      "Hoe hou jy struktuur menslik?",
    ],
  },
  {
    id: "tradisie",
    nameAf: "Tradisie",
    nameEn: "Tradition",
    category: "orde-stabiliteit",
    shortMeaningAf: "Wysheid en rituele wat oor tyd dra.",
    definitionAf:
      "Jy waardeer gebruike en stories wat identiteit, kontinuïteit en betekenis aan gemeenskappe gee.",
    whenBigAf:
      "Jy bewaar rituele, vier erfgoed en gee waardevolle praktyke verantwoordelik aan volgende geslagte oor.",
    strengthAf: "Jy anker mense in identiteit en behoort.",
    dangerAf:
      "Jy kan verouderde patrone beskerm wat nie meer lewe gee nie.",
    questionsAf: [
      "Watter tradisies voed jou nog vandag?",
      "Wat moet bewaar bly, en wat moet verander?",
      "Hoe dra jy betekenisvol oor aan die volgende generasie?",
    ],
  },
  {
    id: "harmonie",
    nameAf: "Harmonie",
    nameEn: "Harmony",
    category: "orde-stabiliteit",
    shortMeaningAf: "Balans en vrede tussen mense en prioriteite.",
    definitionAf:
      "Jy verlang na verhoudings en omgewings waar spanning bestuur word sonder onnodige breuk.",
    whenBigAf:
      "Jy soek gemeenskaplike grond, bemiddel waar moontlik en bou ritmes wat konflik nie laat opgaar nie.",
    strengthAf: "Jy bring vrede en samewerking in gespanne situasies.",
    dangerAf:
      "Jy kan konflik onderdruk en belangrike waarheid stilmaak om rustigheid te hou.",
    questionsAf: [
      "Waar in jou lewe is balans nou uit?",
      "Watter gesprek moet gevoer word vir ware vrede?",
      "Hoe kies jy harmonie sonder om waarheid te verloor?",
    ],
  },
  {
    id: "bydrae",
    nameAf: "Bydrae",
    nameEn: "Contribution",
    category: "bydrae-verandering",
    shortMeaningAf: "Om iets betekenisvol terug te gee.",
    definitionAf:
      "Jy wil hê jou lewe en werk moet ander help en die groter geheel verbeter.",
    whenBigAf:
      "Jy vra gereeld hoe jou tyd, talente en hulpbronne werklik waarde vir ander kan skep.",
    strengthAf: "Jy leef met doel en maak impak buite jouself.",
    dangerAf:
      "Jy kan oorverantwoordelik voel en jou eie grense ignoreer.",
    questionsAf: [
      "Waar maak jou bydrae tans die grootste verskil?",
      "Wat kan jy gee wat net jy kan gee?",
      "Hoe hou jy bydrae volhoubaar vir die langtermyn?",
    ],
  },
  {
    id: "diens",
    nameAf: "Diens",
    nameEn: "Service",
    category: "bydrae-verandering",
    shortMeaningAf: "Om ander se welstand prakties te dien.",
    definitionAf:
      "Jy kies om jou krag en tyd in te span vir mense se werklike behoeftes, met nederigheid.",
    whenBigAf:
      "Jy sien wat nodig is, spring in sonder vertoon en help op maniere wat waardigheid behou.",
    strengthAf: "Jy maak liefde tasbaar deur konkrete dade.",
    dangerAf:
      "Jy kan ongesond opoffer of jou waarde net aan nuttigheid koppel.",
    questionsAf: [
      "Wie kan jy vandag prakties dien?",
      "Hoe dien jy met waardigheid, nie redderhouding nie?",
      "Waar het jy self hulp nodig om aan te hou dien?",
    ],
  },
  {
    id: "moed",
    nameAf: "Moed",
    nameEn: "Courage",
    category: "bydrae-verandering",
    shortMeaningAf:
      "Die bereidheid om op te tree ten spyte van vrees, onsekerheid of risiko.",
    definitionAf:
      "Die bereidheid om op te tree ten spyte van vrees, onsekerheid of risiko.",
    whenBigAf:
      "Jy spreek op, stel grense en vat moeilike stappe wat jy lank uitgestel het.",
    strengthAf: "Jy breek stiltes en maak verandering moontlik.",
    dangerAf:
      "Jy kan roekeloos raak of konflik soek net om sterk te voel.",
    questionsAf: [
      "Watter gesprek vra nou moed van jou?",
      "Wat is die volgende dapper maar wyse stap?",
      "Wie kan langs jou staan terwyl jy dit doen?",
    ],
  },
  {
    id: "vernuwing",
    nameAf: "Vernuwing",
    nameEn: "Innovation",
    category: "bydrae-verandering",
    shortMeaningAf: "Nuwe oplossings vir ou of groeiende probleme.",
    definitionAf:
      "Jy glo vooruitgang vra vars denke, eksperimente en die bereidheid om anders te probeer.",
    whenBigAf:
      "Jy toets idees vinnig, leer uit foute en bou verbeterings wat mense se werklikheid beter maak.",
    strengthAf: "Jy hou stelsels lewendig en relevant.",
    dangerAf:
      "Jy kan nuutheid bo dieper waarde kies of verandering te vinnig forseer.",
    questionsAf: [
      "Watter probleem vra nou 'n nuwe benadering?",
      "Wat kan jy klein toets voor groot uitrol?",
      "Hoe bly jy mensgesentreer terwyl jy vernuwe?",
    ],
  },
  {
    id: "volhoubaarheid",
    nameAf: "Volhoubaarheid",
    nameEn: "Sustainability",
    category: "bydrae-verandering",
    shortMeaningAf: "Keuses wat môre ook nog lewe moontlik maak.",
    definitionAf:
      "Jy wil hulpbronne, gemeenskappe en ekosisteme op maniere bestuur wat nie die toekoms uitput nie.",
    whenBigAf:
      "Jy dink langtermyn, verminder vermorsing en kies praktyke wat mens en aarde oor tyd dra.",
    strengthAf: "Jy bou verantwoordelike stelsels met blywende waarde.",
    dangerAf:
      "Jy kan oorweldig raak deur die omvang van probleme en in skuld vasval.",
    questionsAf: [
      "Watter gewoonte kan jy nou meer volhoubaar maak?",
      "Waar koop gemak vandag jou duur môre?",
      "Hoe kan jy ander saamnooi in realistiese stappe?",
    ],
  },
  {
    id: "inklusiwiteit",
    nameAf: "Inklusiwiteit",
    nameEn: "Inclusivity",
    category: "bydrae-verandering",
    shortMeaningAf: "Dat almal ruimte, stem en toegang kry.",
    definitionAf:
      "Jy werk doelbewus teen uitsluiting en skep omgewings waar verskillende mense werklik kan deelneem.",
    whenBigAf:
      "Jy toets wie afwesig is, pas prosesse aan en maak plek vir uiteenlopende ervarings en vermoëns.",
    strengthAf: "Jy verbreed deelname en versterk menswaardigheid.",
    dangerAf:
      "Jy kan in simboliese gebare vassteek sonder werklike verandering.",
    questionsAf: [
      "Wie word nog nie in hierdie ruimte gehoor nie?",
      "Watter praktiese hindernis kan jy nou verwyder?",
      "Hoe meet jy of inklusiwiteit werklik verbeter?",
    ],
  },
  {
    id: "gelykheid",
    nameAf: "Gelykheid",
    nameEn: "Equality",
    category: "bydrae-verandering",
    shortMeaningAf: "Dat elke mens dieselfde waardigheid en regte dra.",
    definitionAf:
      "Jy staan vir die beginsel dat niemand minder werd is op grond van agtergrond, identiteit of status nie.",
    whenBigAf:
      "Jy spreek diskriminasie aan, ondersteun billike toegang en gebruik jou stem vir gelyke behandeling.",
    strengthAf: "Jy bevorder menswaardigheid en regverdigheid op breë vlak.",
    dangerAf:
      "Jy kan mense se unieke konteks miskyk in 'n eenvormige benadering.",
    questionsAf: [
      "Waar sien jy ongelyke behandeling die duidelikste?",
      "Wat kan jy doen om gelyke toegang te verbeter?",
      "Hoe hou jy gelykheid en menslike verskille saam in balans?",
    ],
  },
];

const valueById = new Map(VALUE_LIBRARY.map((entry) => [entry.id, entry]));

export function getValueById(id: string): ValueLibraryEntry | undefined {
  return valueById.get(id);
}

export function searchValues(
  query: string,
  categoryFilter: CategoryFilter = "all",
): ValueLibraryEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  return VALUE_LIBRARY.filter((entry) => {
    const categoryMatches =
      categoryFilter === "all" || entry.category === categoryFilter;
    if (!categoryMatches) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      entry.id,
      entry.nameAf,
      entry.nameEn,
      entry.shortMeaningAf,
      entry.definitionAf,
      entry.whenBigAf,
      entry.strengthAf,
      entry.dangerAf,
      ...entry.questionsAf,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function groupValuesByCategory(
  values: ValueLibraryEntry[],
): { categoryId: BubbleCategoryId; categoryLabel: string; values: ValueLibraryEntry[] }[] {
  return BUBBLE_CATEGORIES.map((category) => ({
    categoryId: category.id,
    categoryLabel: category.label,
    values: values.filter((value) => value.category === category.id),
  })).filter((group) => group.values.length > 0);
}
