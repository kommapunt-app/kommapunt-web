import { ValueGuideCategoryId, ValueGuideEntry } from "./types";
import { CONFLICTING_VALUES } from "./conflicting-values";

export const ALL_VALUES_FILTER_LABEL = "Alle waardes";

type ValueGuideEntryInput = Omit<ValueGuideEntry, "conflictingValues">;

const VALUE_GUIDE_ENTRIES: ValueGuideEntryInput[] = [
  {
    id: "certainty",
    nameAf: "Sekerheid",
    nameEn: "Certainty",
    category: "safety-security",
    definitionAf: "Sekerheid gaan oor voorspelbaarheid en om te weet waar jy staan. Dit help jou om rustiger besluite te neem.",
    significanceAf: "Wanneer dinge onseker voel, gee sekerheid vir jou grond onder jou voete. Dit maak dit makliker om met vertroue vorentoe te beweeg.",
    healthyExpressionAf: "Jy beplan vooruit en bou roetines wat jou dra. Jy bly oop vir verandering, maar verloor nie jou anker nie.",
    overdoneRiskAf: "As dit te ver gaan, raak jy vas in beheer en vrees vir die onbekende. Dan mis jy geleenthede wat buite jou plan lê.",
    reflectionQuestionAf: "Waar in my lewe soek ek sekerheid omdat ek eintlik bang is vir verandering?",
  },
  {
    id: "control",
    nameAf: "Beheer",
    nameEn: "Control",
    category: "safety-security",
    definitionAf: "Beheer beteken om aktief leiding te neem oor wat jy kan beïnvloed. Dit help jou om nie net passief te dryf nie.",
    significanceAf: "Dit gee jou 'n gevoel van agentskap in moeilike tye. Jy onthou dat jou keuses steeds saak maak.",
    healthyExpressionAf: "Jy fokus op jou eie optrede en grense. Jy laat ook plek vir ander mense se keuses en die lewe se onvoorspelbaarheid.",
    overdoneRiskAf: "Te veel beheer maak jou styf en oorwaaksaam. Verhoudings kan swaar raak as alles volgens jou plan moet gebeur.",
    reflectionQuestionAf: "Wat probeer ek nou beheer wat ek eerder met vertroue kan hanteer?",
  },
  {
    id: "financial-stability",
    nameAf: "Finansiele stabiliteit",
    nameEn: "Financial Stability",
    category: "safety-security",
    definitionAf: "Finansiele stabiliteit is die gevoel dat jou geldsake genoegsaam en volhoubaar is. Dit bring minder druk in jou dag-tot-dag lewe.",
    significanceAf: "Geld-onsekerheid raak emosies, verhoudings en gesondheid vinnig. Stabiliteit skep ruimte vir beter langtermyn-keuses.",
    healthyExpressionAf: "Jy begroot realisties en bou stadig 'n veiligheidsnet. Jy gebruik geld as 'n hulpmiddel, nie as jou identiteit nie.",
    overdoneRiskAf: "As dit oorneem, kan elke besluit net oor geld begin gaan. Jy kan dan vreugde, gee en spontaneiteit verloor.",
    reflectionQuestionAf: "Hoe kan ek my geldwysheid versterk sonder om uit vrees te leef?",
  },
  {
    id: "health",
    nameAf: "Gesondheid",
    nameEn: "Health",
    category: "safety-security",
    definitionAf: "Gesondheid is om jou liggaam en gees met sorg te behandel. Dit sluit rus, beweging, voeding en emosionele welstand in.",
    significanceAf: "Wanneer jou gesondheid sterk is, dra dit elke ander deel van jou lewe. Dit gee jou energie om voluit op te daag.",
    healthyExpressionAf: "Jy luister na jou liggaam en hou by volhoubare gewoontes. Jy kies balans eerder as perfeksie.",
    overdoneRiskAf: "Te veel fokus kan in obsessie en skuld ontaard. Dan raak gesondheid 'n bron van angs in plaas van lewe.",
    reflectionQuestionAf: "Watter klein gewoonte sal my gesondheid nou die meeste dien?",
  },
  {
    id: "job-security",
    nameAf: "Werksekerheid",
    nameEn: "Job Security",
    category: "safety-security",
    definitionAf: "Werksekerheid is die behoefte aan stabiele werk en betroubare inkomste. Dit gee rustigheid oor môre.",
    significanceAf: "As werk onseker voel, raak dit jou selfbeeld en jou huis se stabiliteit. Sekuriteit help jou om met meer kalmte te leef.",
    healthyExpressionAf: "Jy bou vaardighede en verhoudings wat jou inzetbaar hou. Jy dink vooruit sonder om in paniek te leef.",
    overdoneRiskAf: "As dit te groot raak, bly jy dalk vas in werk wat jou uitput. Dan kies jy veiligheid bo betekenis.",
    reflectionQuestionAf: "Watter skuif kan ek maak om veiliger te voel sonder om myself te verlaat?",
  },
  {
    id: "peace",
    nameAf: "Vrede",
    nameEn: "Peace",
    category: "safety-security",
    definitionAf: "Vrede is innerlike en uiterlike kalmte te midde van spanning. Dit is die ruimte waar jy weer asemhaal.",
    significanceAf: "Sonder vrede raak alles gejaag en rou. Met vrede kan jy helderder dink en sagter reageer.",
    healthyExpressionAf: "Jy beskerm jou ritme en kies gesprek bo konflik wanneer moontlik. Jy skep ook stil oomblikke om te herstel.",
    overdoneRiskAf: "As vrede alles oorheers, begin jy moeilike gesprekke vermy. Dan lyk dit rustig bo-op, maar onder lê onuitgesproke spanning.",
    reflectionQuestionAf: "Waar kies ek nou stilte terwyl eerlike waarheid nodig is?",
  },
  {
    id: "privacy",
    nameAf: "Privaatheid",
    nameEn: "Privacy",
    category: "safety-security",
    definitionAf: "Privaatheid is die reg om sekere dele van jou lewe beskerm te hou. Dit gee jou ruimte om veilig en eerlik te wees.",
    significanceAf: "Sonder privaatheid kan jy oorbloot en kwesbaar voel. Gesonde grense help vertroue groei.",
    healthyExpressionAf: "Jy deel doelbewus en hou sensitiewe dinge in veilige ruimtes. Jy respekteer ook ander se grense.",
    overdoneRiskAf: "Te veel privaatheid kan mense wegstoot en verhoudings vlak hou. Dan word beskerming maklik isolasie.",
    reflectionQuestionAf: "Watter grens beskerm my regtig, en watter een hou mense net op 'n afstand?",
  },
  {
    id: "security",
    nameAf: "Sekuriteit",
    nameEn: "Security",
    category: "safety-security",
    definitionAf: "Sekuriteit is die behoefte om veilig te voel teen bedreiging en verlies. Dit gaan oor beskerming op praktiese en emosionele vlak.",
    significanceAf: "As jy veilig voel, ontspan jou senuweestelsel en kan jy beter funksioneer. Dit bou 'n basis vir groei en verbondenheid.",
    healthyExpressionAf: "Jy neem wyse voorsorg en bou ondersteuning rondom jou. Jy leef waaksaam, maar nie bang nie.",
    overdoneRiskAf: "As sekuriteit te sterk word, kan alles soos 'n risiko begin voel. Dan krimp jou wêreld en jou drome saam.",
    reflectionQuestionAf: "Waar kan ek wys voorsorg tref en steeds oop bly vir lewe?",
  },
  {
    id: "trust",
    nameAf: "Vertroue",
    nameEn: "Trust",
    category: "safety-security",
    definitionAf: "Vertroue is die bereidheid om op iemand of iets te steun. Dit groei waar woorde en dade oor tyd ooreenstem.",
    significanceAf: "Sonder vertroue is verhoudings swaar en vol twyfel. Met vertroue voel samewerking ligter en veiliger.",
    healthyExpressionAf: "Jy bou vertroue stadig met konsekwentheid en eerlikheid. Jy gee ook tweede kanse met gesonde grense.",
    overdoneRiskAf: "Blinde vertroue kan jou kwesbaar laat vir seerkry of misbruik. Dan ignoreer jy rooi vlae wat aandag vra.",
    reflectionQuestionAf: "Wie of wat het my vertroue verdien, en waar moet ek dit heronderhandel?",
  },
  {
    id: "acceptance",
    nameAf: "Aanvaarding",
    nameEn: "Acceptance",
    category: "love-belonging",
    definitionAf: "Aanvaarding is om jouself en ander te ontvang soos julle nou is. Dit beteken nie jy gee op groei nie, maar jy begin sonder veroordeling.",
    significanceAf: "Aanvaarding bring sagte ruimte in verhoudings. Dit help mense voel hulle behoort, selfs wanneer hulle nog leer.",
    healthyExpressionAf: "Jy sien mense volledig, met sterkpunte en breuke. Jy hou waarheid en genade saam in een gesprek.",
    overdoneRiskAf: "As dit te ver gaan, kan jy skadelike gedrag verskoon. Dan word grense vaag in die naam van vrede.",
    reflectionQuestionAf: "Waar kan ek meer aanvaarding bring sonder om my standaarde te verloor?",
  },
  {
    id: "compassion",
    nameAf: "Deernis",
    nameEn: "Compassion",
    category: "love-belonging",
    definitionAf: "Deernis is om iemand se pyn raak te sien en met sagte hart te reageer. Dit beweeg jou van oordeel na menslikheid.",
    significanceAf: "Deernis maak verhoudings veiliger en warmer. Dit herinner ons dat niemand heeltyd sterk is nie.",
    healthyExpressionAf: "Jy luister aandagtig en bied hulp wat werklik dien. Jy hou deernis vir ander en vir jouself in balans.",
    overdoneRiskAf: "As dit oordoen word, dra jy almal se laste en brand uit. Dan raak jou eie behoeftes onsigbaar.",
    reflectionQuestionAf: "Hoe kan ek vandag deernis wys sonder om myself te verloor?",
  },
  {
    id: "family",
    nameAf: "Familie",
    nameEn: "Family",
    category: "love-belonging",
    definitionAf: "Familie gaan oor mense by wie jy tuis voel en saam lewe deel. Dit kan bloedfamilie of gekose familie wees.",
    significanceAf: "Sterk familieband gee ondersteuning wanneer die lewe swaar raak. Dit bou identiteit en kontinuteit oor tyd.",
    healthyExpressionAf: "Jy maak tyd vir mekaar en hou kommunikasie oop. Jy eer ook individuele verskille binne die familie.",
    overdoneRiskAf: "As familie alles word, kan ander verhoudings en jou eie roeping ly. Dan raak lojaliteit soms druk.",
    reflectionQuestionAf: "Watter familie-ritueel kan ons nader aan mekaar bring hierdie maand?",
  },
  {
    id: "forgiveness",
    nameAf: "Vergifnis",
    nameEn: "Forgiveness",
    category: "love-belonging",
    definitionAf: "Vergifnis is om die greep van bitterheid los te maak. Dit herstel nie altyd vertroue onmiddellik nie, maar dit bevry jou hart.",
    significanceAf: "Sonder vergifnis bly ou pyn die hede bestuur. Met vergifnis kry genesing kans om te begin.",
    healthyExpressionAf: "Jy noem wat seergemaak het en kies dan om nie in wrok vas te bly nie. Jy hou steeds duidelike grense waar nodig.",
    overdoneRiskAf: "Te vinnige vergifnis kan onreg wegpraat. Dan word diep wonde toegeplak sonder werklike herstel.",
    reflectionQuestionAf: "Wat het ek nodig om op 'n gesonde manier te vergewe?",
  },
  {
    id: "friendship",
    nameAf: "Vriendskap",
    nameEn: "Friendship",
    category: "love-belonging",
    definitionAf: "Vriendskap is wederkerige nabyheid, pret en getrouheid tussen mense. Dit is waar jy gesien en geken voel.",
    significanceAf: "Goeie vriende dra jou in seisoene van vreugde en swaarkry. Hulle help jou onthou wie jy is.",
    healthyExpressionAf: "Jy wees op met teenwoordigheid, eerlikheid en lojaliteit. Julle gee mekaar ruimte om te groei.",
    overdoneRiskAf: "As dit oorneem, kan jy konflik vermy om die band te beskerm. Dan word oppervlakkige vrede belangriker as waarheid.",
    reflectionQuestionAf: "Watter vriend kan ek hierdie week doelbewus bemoedig?",
  },
  {
    id: "honesty",
    nameAf: "Eerlikheid",
    nameEn: "Honesty",
    category: "love-belonging",
    definitionAf: "Eerlikheid is om waarheid te praat en reguit te leef. Dit vra dat jou binne- en buitewêreld bymekaar pas.",
    significanceAf: "Eerlikheid bou diep vertroue oor tyd. Sonder dit raak nabyheid broos en onseker.",
    healthyExpressionAf: "Jy sê die waarheid met respek en tydsberekening. Jy is oop oor foute sonder selfvernietiging.",
    overdoneRiskAf: "Brutale eerlikheid kan seermaak en verhoudings beskadig. Waarheid sonder liefde word hard.",
    reflectionQuestionAf: "Waar moet ek nou meer eerlik wees, en hoe kan ek dit met sagtheid doen?",
  },
  {
    id: "love",
    nameAf: "Liefde",
    nameEn: "Love",
    category: "love-belonging",
    definitionAf: "Liefde is om iemand se goed opreg te soek in woord en daad. Dit is warm, dapper en volgehoue teenwoordigheid.",
    significanceAf: "Liefde skep die diepste gevoel van behoort. Dit verander hoe ons onsself en ander sien.",
    healthyExpressionAf: "Jy wys liefde deur aandag, getrouheid en praktiese sorg. Jy kies nabyheid met gesonde grense.",
    overdoneRiskAf: "As liefde met selfverwaarlosing gemeng word, raak dit ongesond. Dan gee jy alles weg en verloor jouself.",
    reflectionQuestionAf: "Hoe lyk liefde in aksie in my lewe vandag?",
  },
  {
    id: "loyalty",
    nameAf: "Lojaliteit",
    nameEn: "Loyalty",
    category: "love-belonging",
    definitionAf: "Lojaliteit is om by mense en verbintenisse te staan oor tyd. Dit wys dat jou woord dra.",
    significanceAf: "Dit bring stabiliteit en vertroue in verhoudings en spanne. Mense voel veiliger as hulle weet jy hou koers.",
    healthyExpressionAf: "Jy bly getrou sonder om jou gewete af te skakel. Jy kan lojaal wees en tog eerlik aanspreek.",
    overdoneRiskAf: "Blindelingse lojaliteit kan jou in ongesonde patrone vashou. Dan beskerm jy die band bo die waarheid.",
    reflectionQuestionAf: "Waar vra lojaliteit van my om dapper en eerlik te wees?",
  },
  {
    id: "religion",
    nameAf: "Geloof",
    nameEn: "Religion",
    category: "love-belonging",
    definitionAf: "Geloof is om jou lewe te oriënteer rondom 'n geestelike oortuiging en praktyk. Dit gee betekenis, ritme en rigting.",
    significanceAf: "Geloof help baie mense om hoop en moed te hou in moeilike tye. Dit bou ook gemeenskap en gedeelde waardes.",
    healthyExpressionAf: "Jy leef jou geloof met nederigheid en liefde. Jou oortuiging vorm jou dade, nie net jou woorde nie.",
    overdoneRiskAf: "As dit hard of rigied raak, kan oordeel en uitsluiting groei. Dan raak geloof 'n muur eerder as 'n brug.",
    reflectionQuestionAf: "Hoe kan my geloof meer liefde en minder vrees in my verhoudings bring?",
  },
  {
    id: "teamwork",
    nameAf: "Spanwerk",
    nameEn: "Teamwork",
    category: "love-belonging",
    definitionAf: "Spanwerk is om saam met ander te bou aan 'n gedeelde doel. Dit vra vertroue, rolhelderheid en samewerking.",
    significanceAf: "Saam kan ons dikwels meer bereik as alleen. Spanwerk skep ook verbondenheid en gedeelde trots.",
    healthyExpressionAf: "Jy dra jou deel en luister na ander se bydrae. Julle hou die doel groter as enige ego.",
    overdoneRiskAf: "As spanwerk oordrewe word, kan individue se stemme wegraak. Dan word inpas belangriker as waarheid.",
    reflectionQuestionAf: "Hoe kan ek my span sterker maak sonder om myself stil te maak?",
  },
  {
    id: "tradition",
    nameAf: "Tradisie",
    nameEn: "Tradition",
    category: "love-belonging",
    definitionAf: "Tradisie is waardes en praktyke wat oor geslagte gedra word. Dit gee 'n gevoel van wortels en identiteit.",
    significanceAf: "Tradisie help ons onthou waar ons vandaan kom. Dit kan troos en samehorigheid in gemeenskappe bring.",
    healthyExpressionAf: "Jy eer die goeie van die verlede en pas wys aan vir die hede. Tradisie bly lewendig, nie vasgevries nie.",
    overdoneRiskAf: "As tradisie onaantasbaar word, blokkeer dit groei en nuwe insigte. Dan word behoud belangriker as waarheid.",
    reflectionQuestionAf: "Watter tradisie wil ek behou, en watter een moet ek herbedink?",
  },
  {
    id: "appreciation",
    nameAf: "Waardering",
    nameEn: "Appreciation",
    category: "esteem",
    definitionAf: "Waardering is om die goed in mense en oomblikke raak te sien en te benoem. Dit maak die alledaagse voller en ligter.",
    significanceAf: "Mense blom waar hulle opreg raakgesien voel. Waardering bou motivering en verbondenheid.",
    healthyExpressionAf: "Jy gee spesifieke, eerlike erkenning. Jy ontvang ook waardering sonder vals beskeidenheid.",
    overdoneRiskAf: "As jy waardering net van buite soek, raak jou selfwaarde broos. Dan bepaal applous jou gemoed.",
    reflectionQuestionAf: "Wie verdien vandag opregte waardering uit my mond?",
  },
  {
    id: "authority",
    nameAf: "Outoriteit",
    nameEn: "Authority",
    category: "esteem",
    definitionAf: "Outoriteit is die vermoë om leiding te gee en rigting te bepaal. Dit dra verantwoordelikheid, nie net status nie.",
    significanceAf: "Goeie outoriteit bring orde en duidelikheid. Dit help groepe beweeg wanneer dinge onseker is.",
    healthyExpressionAf: "Jy lei met diens, wysheid en konsekwentheid. Jy gebruik mag om ander sterker te maak.",
    overdoneRiskAf: "As outoriteit oorheers, raak dit beheer en dominasie. Dan verdwyn vertroue en eienaarskap by ander.",
    reflectionQuestionAf: "Hoe kan ek my invloed gebruik om mense op te lig, nie te verklein nie?",
  },
  {
    id: "beauty",
    nameAf: "Skoonheid",
    nameEn: "Beauty",
    category: "esteem",
    definitionAf: "Skoonheid is die waardering van wat mooi, elegant of harmonieus is. Dit kan in mense, kuns, natuur en eenvoud leef.",
    significanceAf: "Skoonheid herinner jou dat lewe meer as net funksie is. Dit bring verwondering en herstel vir die hart.",
    healthyExpressionAf: "Jy skep en geniet skoonheid wat lewe gee. Jy sien ook innerlike skoonheid, nie net oppervlakkige beeld nie.",
    overdoneRiskAf: "As dit te veel oor voorkoms gaan, groei vergelyking en onsekerheid. Dan raak beeld belangriker as karakter.",
    reflectionQuestionAf: "Waar bring ek vandag skoonheid wat mense laat asemhaal?",
  },
  {
    id: "competence",
    nameAf: "Bevoegdheid",
    nameEn: "Competence",
    category: "esteem",
    definitionAf: "Bevoegdheid is om iets goed en betroubaar te kan doen. Dit groei deur oefening, terugvoer en volharding.",
    significanceAf: "Dit bou selfvertroue en geloofwaardigheid. Mense vertrou jou makliker wanneer jy konsekwent lewer.",
    healthyExpressionAf: "Jy slyp jou vaardighede en vra hulp waar nodig. Jy meet vooruitgang eerder as perfeksie.",
    overdoneRiskAf: "As bevoegdheid 'n obsessie raak, vrees jy foute en leer stadiger. Dan word presteer belangriker as groei.",
    reflectionQuestionAf: "Watter vaardigheid moet ek nou doelbewus verdiep?",
  },
  {
    id: "courage",
    nameAf: "Moed",
    nameEn: "Courage",
    category: "esteem",
    definitionAf:
      "Die bereidheid om op te tree ten spyte van vrees, onsekerheid of risiko.",
    significanceAf: "Moed maak verandering en waarheid moontlik. Dit help jou trou bly aan jou waardes onder druk.",
    healthyExpressionAf: "Jy neem berekende risiko's en praat op die regte tyd. Jy tree ferm op met respek vir mense.",
    overdoneRiskAf: "As moed roekeloos word, ignoreer jy wysheid en gevolge. Dan noem jy impulsiwiteit sommer dapperheid.",
    reflectionQuestionAf: "Watter een stap vra nou moed van my?",
  },
  {
    id: "fame",
    nameAf: "Roem",
    nameEn: "Fame",
    category: "esteem",
    definitionAf: "Roem is die begeerte om wyd bekend en raakgesien te word. Dit gaan oor publieke erkenning op groot skaal.",
    significanceAf: "Sigbaarheid kan deure oopmaak vir invloed en geleenthede. Dit kan ook jou stem groter maak vir goeie dinge.",
    healthyExpressionAf: "Jy gebruik jou platform met verantwoordelikheid en integriteit. Jou identiteit bly geanker buite applous.",
    overdoneRiskAf: "As roem jou dryfkrag word, raak jy vas in beeldbestuur. Dan verloor jy maklik privaatheid en innerlike rus.",
    reflectionQuestionAf: "As niemand kyk nie, sal ek steeds hierdie pad kies?",
  },
  {
    id: "influence",
    nameAf: "Invloed",
    nameEn: "Influence",
    category: "esteem",
    definitionAf: "Invloed is die vermoë om denke, besluite en kultuur te vorm. Dit werk deur voorbeeld, taal en teenwoordigheid.",
    significanceAf: "Invloed gee jou kans om goeie verandering te help bou. Dit laat jou bydrae verder reik as jouself.",
    healthyExpressionAf: "Jy beïnvloed met integriteit en luister ook na terugvoer. Jy gebruik jou stem om ander te bemagtig.",
    overdoneRiskAf: "As invloed oorheers, begin beheer en manipulasie insluip. Dan word uitkoms belangriker as mense.",
    reflectionQuestionAf: "Watter soort invloed wil ek hê op die mense naaste aan my?",
  },
  {
    id: "popularity",
    nameAf: "Gewildheid",
    nameEn: "Popularity",
    category: "esteem",
    definitionAf: "Gewildheid is om deur baie mense aanvaar en gehou te word. Dit bring sosiale bevestiging en sigbaarheid.",
    significanceAf: "Aanvaar voel is menslik en sterk motiverend. Gewildheid kan deure oopmaak en netwerke versterk.",
    healthyExpressionAf: "Jy bou goeie verhoudings sonder om jou waardes te verkoop. Jy bly vriendelik en eg, ook onder druk.",
    overdoneRiskAf: "As gewildheid te belangrik raak, begin jy mense plesier ten koste van waarheid. Dan verloor jy maklik jou stem.",
    reflectionQuestionAf: "Waar pas ek in net om aanvaar te bly?",
  },
  {
    id: "reputation",
    nameAf: "Reputasie",
    nameEn: "Reputation",
    category: "esteem",
    definitionAf: "Reputasie is hoe mense jou karakter en werk oor tyd beleef. Dit is gebou op herhaalde dade.",
    significanceAf: "Goeie reputasie skep vertroue en geloofwaardigheid. Dit maak samewerking makliker in werk en lewe.",
    healthyExpressionAf: "Jy leef konsekwent met jou waardes, ook wanneer niemand kyk nie. Jy herstel vinnig as jy verkeerd was.",
    overdoneRiskAf: "As reputasie 'n afgod word, raak beeld belangriker as waarheid. Dan begin jy moeilike maar regte keuses vermy.",
    reflectionQuestionAf: "Beskerm ek nou my beeld, of bou ek werklik my karakter?",
  },
  {
    id: "respect",
    nameAf: "Respek",
    nameEn: "Respect",
    category: "esteem",
    definitionAf: "Respek is om jouself en ander met waardigheid te behandel. Dit wys in hoe jy luister, praat en optree.",
    significanceAf: "Respek skep veilige ruimtes vir verskil en gesprek. Dit is die basis vir gesonde verhoudings.",
    healthyExpressionAf: "Jy stel grense, hou jou woord en erken ander se menswaardigheid. Jy kan verskil sonder om af te breek.",
    overdoneRiskAf: "As respek verkeerd verstaan word, kan jy onreg nie aanspreek nie. Dan word stilte verwar met waardigheid.",
    reflectionQuestionAf: "Hoe kan ek vandag respek wys in 'n moeilike gesprek?",
  },
  {
    id: "uniqueness",
    nameAf: "Uniekheid",
    nameEn: "Uniqueness",
    category: "esteem",
    definitionAf: "Uniekheid is die waarde van jou eie besondere stem en styl. Dit vier dat jy nie 'n kopie hoef te wees nie.",
    significanceAf: "Wanneer jy jou uniekheid leef, bring jy vars bydraes. Dit maak ruimte vir kreatiwiteit en egte selfvertroue.",
    healthyExpressionAf: "Jy staan in jou eie identiteit sonder om ander te verklein. Jy bly leerbaar terwyl jy getrou aan jouself leef.",
    overdoneRiskAf: "As uniekheid te ver gaan, raak jy teenoorgesteld net om anders te wees. Dan ly samewerking en nederigheid.",
    reflectionQuestionAf: "Waar hou ek terug uit vrees om uit te staan?",
  },
  {
    id: "wealth",
    nameAf: "Welvaart",
    nameEn: "Wealth",
    category: "esteem",
    definitionAf: "Welvaart is die opbou van finansiele oorvloed en hulpbronne. Dit kan vryheid en keuses vergroot.",
    significanceAf: "Geld kan stabiliteit bring en jou in staat stel om goed te doen. Dit skep ook buffer in onseker tye.",
    healthyExpressionAf: "Jy bou welvaart met integriteit en verantwoordelike bestuur. Jy gebruik jou oorvloed om te geniet en te deel.",
    overdoneRiskAf: "As welvaart jou maatstaf word, raak mense en betekenis tweede. Dan groei gierigheid en vergelyking maklik.",
    reflectionQuestionAf: "Hoe kan my geld my waardes dien, nie beheer nie?",
  },
  {
    id: "accountability",
    nameAf: "Aanspreeklikheid",
    nameEn: "Accountability",
    category: "growth",
    definitionAf: "Aanspreeklikheid is om eienaarskap te neem vir jou keuses en gevolge. Dit bou volwassenheid en vertroue.",
    significanceAf: "Sonder aanspreeklikheid bly groei oppervlakkig. Met dit leer jy vinniger en herstel jy sterker.",
    healthyExpressionAf: "Jy erken foute vroeg en maak reg waar moontlik. Jy skep ook strukture wat jou verantwoordbaar hou.",
    overdoneRiskAf: "As dit te hard raak, leef jy onder konstante selfkritiek. Dan verloor jy genade en menslikheid.",
    reflectionQuestionAf: "Waar moet ek vandag eienaarskap neem sonder verskonings?",
  },
  {
    id: "adventure",
    nameAf: "Avontuur",
    nameEn: "Adventure",
    category: "growth",
    definitionAf: "Avontuur is die soeke na nuwe ervarings en onbekende paaie. Dit bring energie, ontdekking en lewenslus.",
    significanceAf: "Avontuur breek roetine en maak jou wêreld groter. Dit help jou groei buite gemaksones.",
    healthyExpressionAf: "Jy kies avontuur met wysheid en voorbereiding. Jy maak ruimte vir ontdekking sonder om roekeloos te wees.",
    overdoneRiskAf: "As avontuur alles oorheers, raak stabiliteit en verpligtinge afgeskeep. Dan word opwinding belangriker as volhoubaarheid.",
    reflectionQuestionAf: "Watter nuwe ervaring sal my nou laat groei sonder om my kern te verloor?",
  },
  {
    id: "ambition",
    nameAf: "Ambisie",
    nameEn: "Ambition",
    category: "growth",
    definitionAf: "Ambisie is die dryfkrag om hoer te mik en meer te bereik. Dit gee fokus en momentum vir vooruitgang.",
    significanceAf: "Ambisie help jou drome in beweging sit. Dit kan jou laat volhou wanneer die pad lank is.",
    healthyExpressionAf: "Jy stel doelwitte met integriteit en hou mense belangriker as prestasie. Jy vier vordering, nie net eindlyne nie.",
    overdoneRiskAf: "Te veel ambisie kan jou uitbrand en verhoudings skade doen. Dan raak sukses 'n afgod wat nooit genoeg is nie.",
    reflectionQuestionAf: "Is my ambisie tans gedryf deur roeping of deur bewysdrang?",
  },
  {
    id: "challenge",
    nameAf: "Uitdaging",
    nameEn: "Challenge",
    category: "growth",
    definitionAf: "Uitdaging is die waarde om jouself te rek deur moeilike take. Dit hou jou skerp en leerbaar.",
    significanceAf: "Sonder uitdaging stagneer jy maklik. Met dit ontwikkel jy veerkragtigheid en nuwe kapasiteit.",
    healthyExpressionAf: "Jy kies uitdagings wat sinvol en haalbaar is. Jy kombineer dapperheid met realistiese ondersteuning.",
    overdoneRiskAf: "As elke ding 'n toets word, raak jy moeg en ongeduldig. Dan verloor jy ritme en vreugde.",
    reflectionQuestionAf: "Watter uitdaging sal my nou laat groei op 'n gesonde tempo?",
  },
  {
    id: "curiosity",
    nameAf: "Nuuskierigheid",
    nameEn: "Curiosity",
    category: "growth",
    definitionAf: "Nuuskierigheid is die begeerte om te leer, te vra en te verstaan. Dit hou jou oop vir nuwe idees.",
    significanceAf: "Nuuskierigheid dryf innovasie en dieper begrip. Dit maak jou minder vinnig om te oordeel.",
    healthyExpressionAf: "Jy vra goeie vrae en luister met opregte belangstelling. Jy toets idees sonder om jou kernwaardes te verloor.",
    overdoneRiskAf: "As dit ongerig raak, spring jy net van een ding na die volgende. Dan sukkel jy om te fokus en af te rond.",
    reflectionQuestionAf: "Watter vraag moet ek vandag vra om dieper te verstaan?",
  },
  {
    id: "aanpasbaarheid",
    nameAf: "Aanpasbaarheid",
    nameEn: "Adaptability",
    category: "growth",
    definitionAf:
      "Aanpasbaarheid is die vermoë om buigsaam te wees en doeltreffend te reageer op verandering, uitdagings en nuwe omstandighede.",
    significanceAf:
      "Die lewe verander voortdurend. Aanpasbaarheid help jou om uitdagings te hanteer en geleenthede te gryp sodat jy kan aanhou groei.",
    healthyExpressionAf:
      "Jy bly kalm en oop vir verandering, pas jou benadering aan wanneer nodig, en sien uitdagings as geleenthede.",
    overdoneRiskAf:
      "As jy te wispelturig raak, verander jy planne sonder rigting. Dan word oppervlakkigheid en gebrek aan toewyding 'n valkuil.",
    reflectionQuestionAf:
      "Waar in my lewe kan ek meer buigsaam wees – sonder om my rigting of waardes te verloor?",
  },
  {
    id: "ontdekking",
    nameAf: "Ontdekking",
    nameEn: "Discovery",
    category: "growth",
    definitionAf:
      "Ontdekking is die begeerte om die onbekende te verken, nuwe dinge te sien en diepte te vind waar ander net verbygaan.",
    significanceAf:
      "Ontdekking breek roetine, verbreed perspektief en hou jou nuuskierig en lewendig. Dit bring vars insigte en inspireer kreatiewe denke.",
    healthyExpressionAf:
      "Jy vra vrae, verken nuwe idees en plekke, en bly oop vir verrassing sonder om jou ankers te verloor.",
    overdoneRiskAf:
      "As jy net nuut soek sonder om af te rond, raak jy rusteloos en oorweldig. Dan word ontdekking ontsnapping van fokus.",
    reflectionQuestionAf:
      "Wat nuuts is ek bereid om te ontdek wat my kan help om te groei en my wêreld te verruim?",
  },
  {
    id: "openheid",
    nameAf: "Wees oopkop",
    nameEn: "Openness",
    category: "growth",
    definitionAf:
      "Die bereidheid om nuwe idees, perspektiewe en ervarings te oorweeg sonder om te vinnig te oordeel.",
    significanceAf:
      "Oopkopheid help jou leer, verbind en groei in onbekende ruimtes. Dit hou jou denke vars en veerkragtig.",
    healthyExpressionAf:
      "Jy luister, ondersoek en oorweeg voordat jy sluit. Jy bly nuuskierig sonder om jou grense te verloor.",
    overdoneRiskAf:
      "As jy alles moet oorweeg, uitstel jy besluite en verloor fokus. Dan word oopheid ontsnapping van verbintenis.",
    reflectionQuestionAf:
      "Gebruik ek oopkopheid om te verstaan en te groei – of om van fokus en dieper toewyding te ontsnap?",
  },
  {
    id: "determination",
    nameAf: "Vasberadenheid",
    nameEn: "Determination",
    category: "growth",
    definitionAf: "Vasberadenheid is die volgehoue besluit om aan te hou, selfs wanneer dit moeilik raak. Dit is grit met rigting.",
    significanceAf: "Dit help jou deurbreek wanneer motivering laag is. Vasberadenheid bou vertroue in jouself oor tyd.",
    healthyExpressionAf: "Jy hou aan met wys aanpassings langs die pad. Jy weet wanneer om vol te hou en wanneer om te herkalibreer.",
    overdoneRiskAf: "As dit koppigheid word, ignoreer jy waarskuwings en terugvoer. Dan hou jy vas aan paaie wat nie meer lewe gee nie.",
    reflectionQuestionAf: "Waar moet ek volhou, en waar moet ek wys verander?",
  },
  {
    id: "discipline",
    nameAf: "Dissipline",
    nameEn: "Discipline",
    category: "growth",
    definitionAf: "Dissipline is om konsekwent te kies wat op die lang termyn goed is. Dit maak goeie bedoelings prakties.",
    significanceAf: "Dissipline bou momentum in klein daaglikse stappe. Dit dra resultate wanneer emosies wissel.",
    healthyExpressionAf: "Jy skep roetines wat realisties en volhoubaar is. Jy bly ferm, maar nie hard teenoor jouself nie.",
    overdoneRiskAf: "As dissipline te streng raak, verdwyn vreugde en buigsaamheid. Dan word prestasie belangriker as menswees.",
    reflectionQuestionAf: "Watter eenvoudige ritme kan ek volhou om my doel te dien?",
  },
  {
    id: "excellence",
    nameAf: "Uitnemendheid",
    nameEn: "Excellence",
    category: "growth",
    definitionAf: "Uitnemendheid is die strewe om kwaliteit werk te lewer met sorg en trots. Dit gaan oor jou beste, nie foutloosheid nie.",
    significanceAf: "Dit lig standaarde en bou vertroue in wat jy doen. Uitnemendheid eer mense wat op jou staatmaak.",
    healthyExpressionAf: "Jy fokus op vakmanskap en voortdurende verbetering. Jy aanvaar terugvoer as brandstof vir groei.",
    overdoneRiskAf: "As uitnemendheid perfeksionisme word, raak jy vas en moeg. Dan steel die vrees vir fout jou kreatiwiteit.",
    reflectionQuestionAf: "Hoe lyk uitnemendheid hier sonder om onrealisties te wees?",
  },
  {
    id: "growth",
    nameAf: "Groei",
    nameEn: "Growth",
    category: "growth",
    definitionAf: "Groei is die proses om te ontwikkel in karakter, vaardigheid en perspektief. Dit gebeur stap vir stap oor tyd.",
    significanceAf: "Groei hou jou lewendig en oop vir nuwe moontlikhede. Dit help jou om pyn in leer te omskep.",
    healthyExpressionAf: "Jy reflekteer gereeld en pas jou koers aan waar nodig. Jy vier klein winsies langs die pad.",
    overdoneRiskAf: "As groei 'n konstante projek word, rus jy nooit in die hede nie. Dan voel jy altyd agter en nooit genoeg nie.",
    reflectionQuestionAf: "Waar sien ek reeds groei wat ek nog nie erken het nie?",
  },
  {
    id: "intelligence",
    nameAf: "Intelligensie",
    nameEn: "Intelligence",
    category: "growth",
    definitionAf: "Intelligensie is die vermoë om te verstaan, te redeneer en slim verbindings te maak. Dit sluit logika en insig in.",
    significanceAf: "Dit help jou om beter besluite te neem in komplekse situasies. Intelligensie maak leer vinniger en dieper.",
    healthyExpressionAf: "Jy gebruik jou verstand met nederigheid en nuuskierigheid. Jy maak plek vir ander vorme van wysheid ook.",
    overdoneRiskAf: "As slim wees jou identiteit word, kyk jy neer op ander. Dan blokkeer trots ware leer.",
    reflectionQuestionAf: "Hoe kan ek vandag slim dink en steeds leerbaar bly?",
  },
  {
    id: "success",
    nameAf: "Sukses",
    nameEn: "Success",
    category: "growth",
    definitionAf: "Sukses is om betekenisvolle doelwitte te bereik wat vir jou saak maak. Dit kan persoonlik, professioneel of relationeel wees.",
    significanceAf: "Sukses gee momentum en bevestig dat jou moeite vrug dra. Dit kan ook nuwe geleenthede oopmaak.",
    healthyExpressionAf: "Jy definieer sukses op jou eie waardes en nie net op vergelyking nie. Jy vier dit met dankbaarheid en balans.",
    overdoneRiskAf: "As sukses alles word, leef jy voortdurend in prestasiedruk. Dan raak rus, verhoudings en vreugde tweede.",
    reflectionQuestionAf: "Hoe lyk sukses vir my as ek dit aan my diepste waardes koppel?",
  },
  {
    id: "variety",
    nameAf: "Verskeidenheid",
    nameEn: "Variety",
    category: "growth",
    definitionAf: "Verskeidenheid is die behoefte aan afwisseling, nuwe prikkels en vars ervarings. Dit hou lewe interessant en dinamies.",
    significanceAf: "Dit voorkom verveling en maak kreatiewe denke wakker. Verskeidenheid help jou aanpas by verandering.",
    healthyExpressionAf: "Jy bring doelbewuste afwisseling in jou week en werk. Jy hou steeds 'n paar vaste ankers in plek.",
    overdoneRiskAf: "As alles nuut moet wees, sukkel jy met volhoubaarheid en toewyding. Dan word dieper groei verruil vir konstante nuutheid.",
    reflectionQuestionAf: "Waar het ek nou varsheid nodig, en waar het ek stabiliteit nodig?",
  },
  {
    id: "wisdom",
    nameAf: "Wysheid",
    nameEn: "Wisdom",
    category: "growth",
    definitionAf: "Wysheid is om kennis, ervaring en insig goed toe te pas. Dit sien die groter prentjie en die regte tyd.",
    significanceAf: "Wysheid help jou om nie net slim nie, maar reg te kies. Dit bring balans tussen waarheid, liefde en gevolge.",
    healthyExpressionAf: "Jy luister diep, dink stadig en kies doelbewus. Jy leer uit foute sonder om daarin vas te bly.",
    overdoneRiskAf: "As wysheid 'n masker word, kan dit passiwiteit of afstand skep. Dan wag jy vir perfekte sekerheid en mis momentum.",
    reflectionQuestionAf: "Watter besluit vra nou vir stadige, wyse onderskeiding?",
  },
  {
    id: "authenticity",
    nameAf: "Outentiekheid",
    nameEn: "Authenticity",
    category: "self-actualisation",
    definitionAf: "Outentiekheid is om eerlik en getrou aan jou ware self te leef. Jou binne- en buitewêreld pas bymekaar.",
    significanceAf: "Dit bring innerlike vrede en dieper verhoudings. Mense vertrou jou makliker wanneer jy eg opdaag.",
    healthyExpressionAf: "Jy praat jou waarheid met respek en selfkennis. Jy bly oop vir groei sonder om toneel te speel.",
    overdoneRiskAf: "As dit ongeremd raak, kan jy ander se konteks ignoreer. Dan word 'ek is net eerlik' 'n verskoning vir hardheid.",
    reflectionQuestionAf: "Waar leef ek tans uit rolspel eerder as egtheid?",
  },
  {
    id: "commitment",
    nameAf: "Toewyding",
    nameEn: "Commitment",
    category: "self-actualisation",
    definitionAf: "Toewyding is om doelbewus by 'n mens, roeping of pad te bly. Dit gee diepte aan wat jy kies.",
    significanceAf: "Toewyding bou vertroue en vrug oor tyd. Groot dinge word dikwels deur volgehoue trou gebou.",
    healthyExpressionAf: "Jy kies met bedoeling en hou koers met buigsaamheid. Jy hernu jou ja met oop oë.",
    overdoneRiskAf: "As toewyding rigied raak, bly jy vas in wat nie meer lewe gee nie. Dan raak trou belangriker as waarheid.",
    reflectionQuestionAf: "Waaraan is ek regtig verbind, en wys my kalender dit?",
  },
  {
    id: "contribution",
    nameAf: "Bydrae",
    nameEn: "Contribution",
    category: "self-actualisation",
    definitionAf: "Bydrae is die begeerte om iets waardevol te gee wat ander se lewe verbeter. Dit skuif fokus van net self na ons.",
    significanceAf: "Bydrae gee diep betekenis en verbondenheid. Dit laat jou voel jou lewe tel vir meer as prestasie.",
    healthyExpressionAf: "Jy gee uit jou sterkpunte op 'n volhoubare manier. Jy onthou dat klein, getroue dade ook saak maak.",
    overdoneRiskAf: "As jy oorbydra, raak jy leeg en resentvol. Dan gee jy uit skuld in plaas van uit oorvloed.",
    reflectionQuestionAf: "Waar kan ek nou bydra op 'n manier wat ook volhoubaar vir my is?",
  },
  {
    id: "vernuwing",
    nameAf: "Vernuwing",
    nameEn: "Innovation",
    category: "self-actualisation",
    definitionAf:
      "Vernuwing is die moed om nuwe idees in die werklikheid te bring. Dit beteken ons verbeter, verander en vind slim maniere om dinge beter te doen.",
    significanceAf:
      "Vernuwing help om vasgevatte patrone te breek, probleme op te los en geleenthede te skep. Dit dryf vooruitgang en 'n beter toekoms.",
    healthyExpressionAf:
      "Jy sien moontlikhede waar ander probleme sien, toets idees en neem berekende risiko's wat waarde skep.",
    overdoneRiskAf:
      "As jy te veel idees jaag, verloor jy fokus en laat mense agter. Dan word verandering roekeloos eerder as doelgerig.",
    reflectionQuestionAf:
      "Watter idee of verandering kan ek vandag begin wat môre 'n positiewe verskil kan maak?",
  },
  {
    id: "creativity",
    nameAf: "Kreatiwiteit",
    nameEn: "Creativity",
    category: "self-actualisation",
    definitionAf: "Kreatiwiteit is om nuwe idees, uitdrukkings en oplossings te vorm. Dit verbind verbeelding met realiteit.",
    significanceAf: "Kreatiwiteit bring varsheid en hoop in vasgeloopte plekke. Dit help jou om lewe op nuwe maniere te sien.",
    healthyExpressionAf: "Jy gee jouself tyd om te speel, toets en bou. Jy balanseer inspirasie met afhandeling.",
    overdoneRiskAf: "As kreatiwiteit net idees bly, gebeur min in die praktyk. Dan raak nuutheid belangriker as impak.",
    reflectionQuestionAf: "Watter idee moet ek nou uit my kop en in die wêreld kry?",
  },
  {
    id: "equality",
    nameAf: "Gelykheid",
    nameEn: "Equality",
    category: "self-actualisation",
    definitionAf: "Gelykheid is die oortuiging dat elke mens dieselfde waardigheid en reg op geleentheid het. Dit verwerp bevoordeling op grond van status of agtergrond.",
    significanceAf: "Gelykheid bou regverdiger gemeenskappe en sterker samewerking. Mense floreer waar hulle billik behandel word.",
    healthyExpressionAf: "Jy bevorder insluiting en spreek onbillikheid prakties aan. Jy luister na stemme wat maklik misgehoor word.",
    overdoneRiskAf: "As gelykheid simplisties toegepas word, word verskille in konteks misken. Dan verloor mens soms onderskeiding oor verantwoordelikheid.",
    reflectionQuestionAf: "Waar kan ek vandag meer billikheid in my invloedssfeer bring?",
  },
  {
    id: "ethics",
    nameAf: "Etiek",
    nameEn: "Ethics",
    category: "self-actualisation",
    definitionAf: "Etiek is om moreel reg te handel, selfs wanneer dit jou kos. Dit vra integriteit in die klein en die groot.",
    significanceAf: "Etiek beskerm mense teen skade en bou langtermyn vertroue. Dit hou jou gewete helder.",
    healthyExpressionAf: "Jy toets besluite teen beginsels en gevolge vir ander. Jy kies die regte pad, nie net die maklikste nie.",
    overdoneRiskAf: "As etiek moralisties word, kyk jy neer op ander se pad. Dan raak beginsels 'n wapen eerder as 'n kompas.",
    reflectionQuestionAf: "Watter besluit vra nou vir integriteit al is dit ongerieflik?",
  },
  {
    id: "excitement",
    nameAf: "Opwinding",
    nameEn: "Excitement",
    category: "self-actualisation",
    definitionAf: "Opwinding is die energie van nuutheid, beweging en intense lewenslus. Dit bring sprankel in die alledaagse.",
    significanceAf: "Opwinding kan motivering aansteek en jou uit passiwiteit trek. Dit herinner jou dat lewe ook gevier mag word.",
    healthyExpressionAf: "Jy maak ruimte vir vreugdevolle ervarings binne gesonde grense. Jy geniet die oomblik sonder om koers te verloor.",
    overdoneRiskAf: "As jy net op opwinding jaag, raak gewone ritmes vaal. Dan maak jy impulsiewe keuses vir die rush.",
    reflectionQuestionAf: "Hoe kan ek meer lewenslus kies sonder om onwys te raak?",
  },
  {
    id: "freedom",
    nameAf: "Vryheid",
    nameEn: "Freedom",
    category: "self-actualisation",
    definitionAf: "Vryheid is die ruimte om keuses te maak in lyn met jou waardes. Dit gaan oor verantwoordelike selfbeskikking.",
    significanceAf: "Vryheid laat jou groei in eienaarskap en kreatiwiteit. Dit maak outentieke leef moontlik.",
    healthyExpressionAf: "Jy gebruik jou vryheid met wysheid en verantwoordelikheid. Jy respekteer ook ander se vryheid.",
    overdoneRiskAf: "As vryheid net oor self gaan, vermy jy verbintenis en verantwoordelikheid. Dan word onafhanklikheid isolasie.",
    reflectionQuestionAf: "Watter vorm van vryheid sal my regtig nader aan my waardes bring?",
  },
  {
    id: "helpfulness",
    nameAf: "Behulpsaamheid",
    nameEn: "Helpfulness",
    category: "self-actualisation",
    definitionAf: "Behulpsaamheid is die bereidheid om prakties en vriendelik by te staan. Dit maak omgee tasbaar.",
    significanceAf: "Klein dade van hulp bou vertroue en gemeenskap. Dit herinner mense dat hulle nie alleen is nie.",
    healthyExpressionAf: "Jy help uit liefde, nie uit skuld nie. Jy bied ondersteuning op maniere wat werklik nuttig is.",
    overdoneRiskAf: "As jy almal altyd red, put jy jouself uit en hou jy ander klein. Dan word hulp maklik beheer.",
    reflectionQuestionAf: "Waar kan ek vandag help op 'n manier wat bemagtig, nie afhanklik maak nie?",
  },
  {
    id: "independence",
    nameAf: "Onafhanklikheid",
    nameEn: "Independence",
    category: "self-actualisation",
    definitionAf: "Onafhanklikheid is om op eie voete te kan staan en self besluite te neem. Dit bou selfvertroue en eienaarskap.",
    significanceAf: "Dit help jou verantwoordelik leef sonder oorafhanklikheid. Onafhanklikheid gee ruimte vir jou unieke roeping.",
    healthyExpressionAf: "Jy neem self leiding, maar bly oop vir hulp en samewerking. Jy kies volwassenheid bo alleenheid.",
    overdoneRiskAf: "As dit te ver gaan, vermy jy kwesbaarheid en ondersteuning. Dan raak jy afgesonder al lyk jy sterk.",
    reflectionQuestionAf: "Waar het ek selfstandigheid nodig, en waar het ek verbinding nodig?",
  },
  {
    id: "inner-harmony",
    nameAf: "Innerlike harmonie",
    nameEn: "Inner Harmony",
    category: "self-actualisation",
    definitionAf: "Innerlike harmonie is die gevoel van belyning tussen jou gedagtes, emosies en waardes. Dit bring rustige helderheid binne-in jou.",
    significanceAf: "Sonder innerlike harmonie leef jy maklik in voortdurende innerlike spanning. Met dit voel besluite meer geïntegreerd en rustig.",
    healthyExpressionAf: "Jy reflekteer eerlik en maak tyd vir herstel en stilte. Jy leef in lyn met wat vir jou regtig saak maak.",
    overdoneRiskAf: "As harmonie alles word, begin jy ongemak en konflik te veel vermy. Dan word groei wat skuur maklik uitgestel.",
    reflectionQuestionAf: "Wat in my lewe is tans buite belyning met my kernwaardes?",
  },
  {
    id: "justice",
    nameAf: "Geregtigheid",
    nameEn: "Justice",
    category: "self-actualisation",
    definitionAf: "Geregtigheid is die strewe na wat reg en billik is vir almal. Dit roep jou om onreg raak te sien en aan te spreek.",
    significanceAf: "Geregtigheid beskerm waardigheid en bou gesonde gemeenskappe. Dit gee stem aan mense wat maklik gemarginaliseer word.",
    healthyExpressionAf: "Jy staan op teen onreg met moed en wysheid. Jy soek herstel, nie net vergelding nie.",
    overdoneRiskAf: "As dit hard en ongenaakbaar raak, verdwyn deernis en nuanse. Dan word mense net etikette in 'n geveg.",
    reflectionQuestionAf: "Waar roep geregtigheid my om vandag op te staan?",
  },
  {
    id: "meaningful-work",
    nameAf: "Betekenisvolle werk",
    nameEn: "Meaningful Work",
    category: "self-actualisation",
    definitionAf: "Betekenisvolle werk is werk wat vir jou doel, waardes en bydrae laat ontmoet. Dit voel soos meer as net 'n salaris.",
    significanceAf: "Wanneer werk betekenis dra, bring dit energie en volhoubare motivering. Dit help jou om met groter sin te leef.",
    healthyExpressionAf: "Jy soek alignment tussen jou sterkpunte en impak. Jy maak ook vrede met gewone take wat die groter doel dien.",
    overdoneRiskAf: "As elke dag absoluut betekenisvol moet voel, raak jy rusteloos. Dan miskyk jy waarde in eenvoudige getrouheid.",
    reflectionQuestionAf: "Wat maak my huidige werk vir my regtig betekenisvol?",
  },
  {
    id: "passion",
    nameAf: "Passie",
    nameEn: "Passion",
    category: "self-actualisation",
    definitionAf: "Passie is intense entoesiasme vir iets wat jou diep aanraak. Dit gee vuur en rigting aan jou energie.",
    significanceAf: "Passie help jou volhou en skep momentum in uitdagende tye. Dit maak jou werk en lewe meer lewendig.",
    healthyExpressionAf: "Jy kanaliseer jou passie met ritme en fokus. Jy laat dit ander dien, nie net jou ego voed nie.",
    overdoneRiskAf: "As passie onbeheers raak, brand jy vinnig uit. Dan word balans en verhoudings maklik opgeoffer.",
    reflectionQuestionAf: "Hoe kan ek my passie op 'n volhoubare manier leef?",
  },
  {
    id: "pleasure",
    nameAf: "Plesier",
    nameEn: "Pleasure",
    category: "self-actualisation",
    definitionAf: "Plesier is die genieting van wat goed, lekker en lewensgee is. Dit bring ligtheid en herstel in jou ritme.",
    significanceAf: "Gesonde plesier verfris jou en voorkom uitbranding. Dit herinner jou dat vreugde ook waardevol is.",
    healthyExpressionAf: "Jy kies plesier wat jou opbou en nie skade doen nie. Jy geniet sonder skuld, met balans en dankbaarheid.",
    overdoneRiskAf: "As plesier die stuur oorneem, skuif verantwoordelikheid opsy. Dan kies jy korttermyn lekker bo langtermyn goed.",
    reflectionQuestionAf: "Watter vorm van plesier gee my regtig lewe, nie net afleiding nie?",
  },
  {
    id: "spirituality",
    nameAf: "Spiritualiteit",
    nameEn: "Spirituality",
    category: "self-actualisation",
    definitionAf: "Spiritualiteit is die soeke na dieper betekenis, verbondenheid en transcendente perspektief. Dit verbind jou met meer as net die onmiddellike.",
    significanceAf: "Dit kan innerlike anker en hoop bring in onseker tye. Spiritualiteit help baie mense om met groter doel te leef.",
    healthyExpressionAf: "Jy beoefen ritmes wat jou hart en gewete vorm. Jy bly nederig, leerbaar en oop vir misterie.",
    overdoneRiskAf: "As spiritualiteit ontvlugting word, vermy jy praktiese verantwoordelikheid. Dan praat jy diep, maar leef afgesny van realiteit.",
    reflectionQuestionAf: "Watter praktyk kan my spiritualiteit hierdie week meer gegrond maak?",
  },
  {
    id: "tolerance",
    nameAf: "Verdraagsaamheid",
    nameEn: "Tolerance",
    category: "self-actualisation",
    definitionAf: "Verdraagsaamheid is om ruimte te maak vir verskil sonder minagting. Dit kies respek selfs wanneer jy nie saamstem nie.",
    significanceAf: "Verdraagsaamheid maak samelewing en spanwerk moontlik in diversiteit. Dit verminder onnodige polarisasie.",
    healthyExpressionAf: "Jy luister om te verstaan en reageer sonder aanval. Jy hou jou oortuigings ferm met 'n oop houding.",
    overdoneRiskAf: "As dit grensloos raak, word belangrike waarheid en grense vaag. Dan noem jy alles aanvaarbaar al is dit skadelik.",
    reflectionQuestionAf: "Hoe kan ek verskil met respek sonder om my kernwaardes te verloën?",
  },
  {
    id: "regverdigheid",
    nameAf: "Regverdigheid",
    nameEn: "Fairness",
    category: "safety-security",
    definitionAf:
      "Regverdigheid is om mense billik, eerlik en met waardigheid te behandel. Dit gee elkeen 'n eerlike kans.",
    significanceAf:
      "Regverdigheid bou vertroue en vrede in verhoudings en gemeenskappe. Mense floreer waar hulle met respek behandel word.",
    healthyExpressionAf:
      "Jy maak onbevooroordeelde besluite en luister na alle kante. Jy streef na billikheid, nie net na gemak nie.",
    overdoneRiskAf:
      "As regverdigheid te rigied raak, word reëls belangriker as mense. Dan mis jy genade, konteks en verhouding.",
    reflectionQuestionAf:
      "Neem ek besluite op grond van wat reg en billik is vir almal, of op grond van wat vir my of my mense maklik is?",
  },
  {
    id: "nederigheid",
    nameAf: "Nederigheid",
    nameEn: "Humility",
    category: "growth",
    definitionAf:
      "Nederigheid is om jou plek te ken, ander te erken en met 'n oop hart te leer. Dit sien elke mens se waardigheid.",
    significanceAf:
      "Nederigheid bou vertroue, hou jou leerbaar en help jou om foute te erken. Dit maak ware leierskap en verbinding moontlik.",
    healthyExpressionAf:
      "Jy gee erkenning, luister meer as wat jy praat, en behandel almal met respek. Jy bly dankbaar en leerbaar.",
    overdoneRiskAf:
      "As nederigheid te ver gaan, ontken jy jou eie waarde of laat ander oor jou loop. Dan verloor jy stem en moed.",
    reflectionQuestionAf:
      "Hoe kan ek nederiger wees sonder om my waarde of stem te verloor?",
  },
  {
    id: "doelgerigheid",
    nameAf: "Doelgerigtheid",
    nameEn: "Purposefulness",
    category: "self-actualisation",
    definitionAf:
      "Doelgerigtheid is om met bedoeling te leef, te weet wat vir jou saak maak, en na 'n doel groter as jouself te streef.",
    significanceAf:
      "Doelgerigtheid gee rigting aan jou keuses en betekenis aan jou dae. Dit help jou om gefokus en volhardend te bly.",
    healthyExpressionAf:
      "Jy weet wat die belangrikste is en neem daaglikse stappe daarnaartoe. Jy bly trou aan jou hoekom, ook wanneer dit moeilik is.",
    overdoneRiskAf:
      "As doelgerigtheid obsessief raak, verwaarloos jy verhoudings en rus. Dan word jy te hard op jouself en verloor balans.",
    reflectionQuestionAf: "Wat is my hoekom — en leef ek vandag daarna?",
  },
  {
    id: "status",
    nameAf: "Status",
    nameEn: "Status",
    category: "esteem",
    definitionAf:
      "Status is die erkenning en posisie wat jy in 'n groep, gemeenskap of samelewing het. Dit gaan oor hoe ander jou sien en die respek wat daarmee gepaard gaan.",
    significanceAf:
      "Status kan waardigheid, invloed en geleenthede bring. Dit motiveer jou om uit te blink en 'n plek in die wêreld te vind.",
    healthyExpressionAf:
      "Jy is trots, maar bly nederig. Jy gebruik jou posisie om 'n positiewe verskil te maak en erken ander se bydrae ook.",
    overdoneRiskAf:
      "As status te belangrik word, raak jy arrogant, vergelykend of oneg. Dan word erkenning belangriker as karakter.",
    reflectionQuestionAf:
      "Waar laat ek toe dat die behoefte aan status my besluite beïnvloed — en waar kan ek eerder getrou en nederig bly?",
  },
  {
    id: "stabiliteit",
    nameAf: "Stabiliteit",
    nameEn: "Stability",
    category: "safety-security",
    definitionAf:
      "Stabiliteit is die waarde van konsekwentheid, balans en standvastigheid. Dit bou 'n stewige fondament waarop jy en ander veilig kan groei.",
    significanceAf:
      "Stabiliteit bring gemoedsrus, fokus en vertroue. Dit verminder stres en skep ruimte vir herstel en groei.",
    healthyExpressionAf:
      "Jy het roetines en grense wat werk. Jy bly konsekwent in woorde en dade, ook wanneer verandering kom.",
    overdoneRiskAf:
      "As stabiliteit te rigied raak, weerstaan jy nodige verandering en raak beheer obsessief. Dan word veiligheid 'n tronk.",
    reflectionQuestionAf:
      "Waar in my lewe soek ek meer stabiliteit — en waar kan ek buigsaamheid toelaat om te groei?",
  },
  {
    id: "diens",
    nameAf: "Diens",
    nameEn: "Service",
    category: "self-actualisation",
    definitionAf:
      "Diens is om jou tyd, talente en hulp bewustelik aan ander en die groter gemeenskap te gee. Dit maak 'n verskil deur mense te ondersteun.",
    significanceAf:
      "Diens bou sterker gemeenskappe, gee lewe betekenis en kweek empatie. Klein dade kan groot impak hê.",
    healthyExpressionAf:
      "Jy sien behoeftes en reageer met waardigheid. Jy dien sonder om erkenning te soek en dink aan die groter prentjie.",
    overdoneRiskAf:
      "As diens te ver gaan, put jy jouself uit, ignoreer jy eie behoeftes of probeer jy ander red. Dan word gee 'n las.",
    reflectionQuestionAf:
      "Waar en hoe kan ek my tyd, talente en hulp gebruik om 'n verskil te maak — sonder om myself te verloor?",
  },
  {
    id: "leer",
    nameAf: "Leer",
    nameEn: "Learning",
    category: "growth",
    definitionAf:
      "Leer is die waarde van nuuskierigheid, kennis en begrip. Dit gaan oor nuwe dinge ontdek en jou denke elke dag te verbreed.",
    significanceAf:
      "Leer voed nuuskierigheid, verbeter besluite en bou selfvertroue. Dit hou jou denke oop en help jou om jou potensiaal te bereik.",
    healthyExpressionAf:
      "Jy vra vrae, is oop vir nuwe idees en leer uit foute. Jy deel wat jy leer en help ander ook om te groei.",
    overdoneRiskAf:
      "As leer uit balans is, kan dit lei tot analise-paralise, perfeksionisme of konstante ontevredenheid oor wat jy nie weet nie.",
    reflectionQuestionAf:
      "Wat wil ek leer, en hoe kan ek leer op 'n manier wat my én ander help om te groei?",
  },
  {
    id: "selfbeheersing",
    nameAf: "Selfbeheersing",
    nameEn: "Self-Control",
    category: "growth",
    definitionAf:
      "Selfbeheersing is om jouself te rig en te beheer sodat jy jou doelwitte bereik. Dit gaan oor deursettingsvermoë, fokus en selfbeheer — ook wanneer dit moeilik is.",
    significanceAf:
      "Selfbeheersing help jou om vandag die regte dinge te doen sodat jy môre die lewe kan hê wat jy wil hê. Dit bou karakter en goeie gewoontes.",
    healthyExpressionAf:
      "Jy dink voor jy handel, sê nee tot afleidings en bly kalm onder druk. Jy bly op koers sonder om jouself te hard te wees.",
    overdoneRiskAf:
      "As selfbeheersing te streng raak, word jy te hard op jouself, onderdruk emosies of verloor vreugde en spontaniteit.",
    reflectionQuestionAf:
      "Wat wil ek beheer — my impulse of my toekoms?",
  },
  {
    id: "verantwoordelikheid",
    nameAf: "Verantwoordelikheid",
    nameEn: "Responsibility",
    category: "love-belonging",
    definitionAf:
      "Verantwoordelikheid is om eienaarskap te neem vir jou keuses, pligte en die impak van jou woorde en dade. Dit maak jou betroubaar en betrokke.",
    significanceAf:
      "Verantwoordelikheid bou vertroue en stabiliteit in verhoudings en gemeenskappe. Dit help jou om doelgerig en betroubaar te leef.",
    healthyExpressionAf:
      "Jy neem eienaarskap, hou jou woord en leer uit foute. Jy dink aan hoe jou keuses ander raak.",
    overdoneRiskAf:
      "As verantwoordelikheid te ver gaan, blameer jy jouself vir alles, raak jy uitgeput of probeer jy alles beheer.",
    reflectionQuestionAf:
      "Waar in my lewe kan ek meer eienaarskap neem — met balans en wysheid?",
  },
  {
    id: "prestasie",
    nameAf: "Prestasie",
    nameEn: "Achievement",
    category: "esteem",
    definitionAf:
      "Prestasie is die strewe om doelwitte te bereik, hoë standaarde te handhaaf en meetbare resultate te lewer. Dit gaan oor jou vermoëns ten volle te gebruik.",
    significanceAf:
      "Prestasie gee rigting en dryfkrag. Dit help jou om te groei, by te dra en jou potensiaal te verwesenlik.",
    healthyExpressionAf:
      "Jy stel uitdagende maar realistiese doelwitte, fokus goed en vier vordering. Jy gee jou beste sonder om jouself te verloor.",
    overdoneRiskAf:
      "As prestasie alles oorneem, kan dit lei tot uitbranding, perfeksionisme, verwaarlosing van verhoudings en vrees vir mislukking.",
    reflectionQuestionAf:
      "Watter doelwitte is vir my regtig die moeite werd — en wat is ek bereid om prys te gee om dit te bereik?",
  },
  {
    id: "gemeenskap",
    nameAf: "Gemeenskap",
    nameEn: "Community",
    category: "love-belonging",
    definitionAf:
      "Gemeenskap is die mense rondom ons met wie ons verbondenheid, ondersteuning en 'n gedeelde doel het. Dit is waar ons saamleef en mekaar help.",
    significanceAf:
      "Gemeenskap gee behoort, veiligheid en geleenthede om saam iets groters te bou. Mense floreer waar hulle ondersteun word.",
    healthyExpressionAf:
      "Jy neem deel, wys omgee en respekteer verskille. Jy dra by tot die welstand van jou gemeenskap en bou vertroue.",
    overdoneRiskAf:
      "As gemeenskap te ver gaan, kan groepsdruk, verlies van eie stem of uitputting deur te veel verantwoordelikheid vir ander volg.",
    reflectionQuestionAf:
      "Hoe dra ek by tot my gemeenskap — en hoe bly ek steeds myself terwyl ek deel van iets groters is?",
  },
  {
    id: "integriteit",
    nameAf: "Integriteit",
    nameEn: "Integrity",
    category: "love-belonging",
    definitionAf:
      "Integriteit is om in lyn te leef met jou waardes en oortuigings, ook wanneer niemand kyk nie. Dit is eerlik, regverdig en konsekwent wees.",
    significanceAf:
      "Integriteit bou vertroue in jouself en by ander. Dit gee karakter en rigting in 'n komplekse wêreld.",
    healthyExpressionAf:
      "Jy doen die regte ding, hou jou beloftes en is eerlik en deursigtig. Jy behandel ander regverdig en neem verantwoordelikheid.",
    overdoneRiskAf:
      "As integriteit te rigied raak, word reëls belangriker as mense. Dan mis jy buigsaamheid, genade en kompromie.",
    reflectionQuestionAf:
      "Waar in my lewe wil ek getrou bly aan wat ek reg dink — ook wanneer dit moeilik is?",
  },
];

export const VALUE_GUIDE: ValueGuideEntry[] = VALUE_GUIDE_ENTRIES.map((entry) => ({
  ...entry,
  conflictingValues: CONFLICTING_VALUES[entry.id] ?? [],
}));

export function getValueGuideById(id: string) {
  const normalizedId = id.trim().toLowerCase();
  return VALUE_GUIDE.find((entry) => entry.id === normalizedId);
}

export function getValuesByCategory(category: ValueGuideCategoryId) {
  return VALUE_GUIDE.filter((entry) => entry.category === category);
}

export function searchValueGuide(
  query: string,
  categoryFilter: ValueGuideCategoryId | "all"
) {
  const normalizedQuery = query.trim().toLowerCase();
  const scopedValues =
    categoryFilter === "all"
      ? VALUE_GUIDE
      : VALUE_GUIDE.filter((entry) => entry.category === categoryFilter);

  if (!normalizedQuery) {
    return scopedValues;
  }

  return scopedValues.filter((entry) =>
    [
      entry.id,
      entry.nameAf,
      entry.nameEn,
      entry.definitionAf,
      entry.significanceAf,
      entry.healthyExpressionAf,
      entry.overdoneRiskAf,
      ...entry.conflictingValues.flatMap((conflict) => [
        conflict.name,
        conflict.reason,
      ]),
      entry.reflectionQuestionAf,
    ].some((field) => field.toLowerCase().includes(normalizedQuery))
  );
}
