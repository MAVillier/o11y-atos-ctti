window.ATLES_DATA= {
  "cards": [
    {
      "id": "A1",
      "title": "Contracte de telemetria",
      "subtitle": "Un esquema executable comprova què arriba de cada servei i detecta quan el significat canvia.",
      "problem": "El Llibre Blanc ja aporta un catàleg extens. El pas següent és poder comprovar que cada proveïdor l’aplica de la mateixa manera. Una mètrica sense unitat, un servei amb dos noms o una traça sense entorn dificulten la correlació encara que els senyals arribin. La documentació ha de tenir una traducció que les eines puguin validar.",
      "proposal": "Proposem publicar un contracte versionat per família de servei: identitat estable, procés i àmbit consumidor, entorn, responsable funcional, operador tècnic, unitats, dimensions permeses, freqüència i tractament de camps sensibles. Les convencions d’OpenTelemetry en serien la base, amb extensions CTTI identificades. El mateix contracte alimentaria les plantilles de desplegament i un validador d’ingesta. Quan una font canviés, el sistema compararia mostres i detectaria incompatibilitats abans d’actualitzar les regles. Els registres incomplets quedarien identificats en una cua de correcció, amb tractament específic si contenen dades sensibles. El Centre de Control veuria quines dades pot fer servir amb confiança i quines necessiten revisió. L’Oficina d’Observabilitat i els responsables designats validarien el criteri aplicable; els equips de les fonts i de les eines mantindrien la seva implementació.",
      "flow": [
        "Definir el contracte del servei i la seva versió.",
        "Validar mostres a la integració i a la ingesta.",
        "Relacionar errors amb font i equip responsable.",
        "Publicar conformitat, excepcions i canvis de versió."
      ],
      "technology": [
        {
          "name": "OpenTelemetry Semantic Conventions",
          "role": "Aporten atributs compartits per descriure serveis i operacions; les extensions corporatives es documenten sense perdre la correspondència amb l’estàndard."
        },
        {
          "name": "JSON Schema, Weaver i proves de contracte",
          "role": "Comproven estructura i convencions amb exemples executables. La semàntica de negoci i el mapatge OTLP–CTTI necessiten proves pròpies."
        },
        {
          "name": "Collector i registre de contractes",
          "role": "Anoten la versió aplicada i fan arribar els errors de qualitat a un circuit visible de correcció."
        }
      ],
      "pilot": "Escollir una aplicació, un servei d’infraestructura i una integració entre proveïdors. Capturar mostres autoritzades, acordar els identificadors i preparar casos correctes i defectuosos. Provar una migració de nom o d’unitat mantenint les consultes anteriors. El lliurable serà el contracte, les proves i un informe de conformitat que cada equip pugui repetir amb les seves dades.",
      "tender": "Atos proposa mantenir contractes de telemetria llegibles per màquina, amb versions, exemples i proves de conformitat. La solució identifica els senyals que no els compleixen i en facilita la correcció, fent visibles les pèrdues de cobertura. Els canvis incompatibles preveuen una transició acordada. La proposta inclou esquemes, validadors i històric de canvis en formats reutilitzables per al CTTI.",
      "acceptance": [
        "Una mostra amb unitat incorrecta genera un error identificable.",
        "Un canvi d’esquema conserva o migra explícitament les consultes afectades.",
        "Cada senyal del pilot es relaciona amb servei, entorn i versió de contracte."
      ],
      "metrics": [
        "Mostres conformes / mostres verificades, per família.",
        "Temps de correcció d’un incompliment i nombre de recurrències."
      ],
      "dependencies": [
        "A6"
      ],
      "caution": "Validar l’estructura no demostra que una mesura representi bé el servei. Cal contrastar unitats, procedència i comportament amb casos coneguts. Els camps sensibles no s’han de copiar a un repositori d’errors sense control.",
      "evidence": [
        {
          "sourceId": "INT01",
          "relatedSourceIds": [
            "INT13"
          ],
          "claim": "Altinn documenta OpenTelemetry i un entorn local de prova. La guia pública brasilera també recomana formats oberts per reduir dependències.",
          "transfer": "Atos proposa aprofitar aquest patró per comprovar, abans de l’alta, identificadors, unitats i camps sensibles del servei. Un canvi de versió haurà de passar les mateixes proves i conservar la correspondència amb el catàleg CTTI. El precedent acredita una base tècnica; l’esquema executable i els criteris d’acceptació els concretaríem aquí."
        },
        {
          "sourceId": "R01",
          "claim": "eBay va comparar la captura antiga amb OpenTelemetry i va detectar diferències en noms i etiquetes abans de consolidar el canvi.",
          "transfer": "En podem traslladar la comprovació de paritat. Atos proposa concretar-la sobre el catàleg i els criteris corporatius, amb validació de l’Oficina d’Observabilitat i dels responsables designats."
        },
        {
          "sourceId": "R02",
          "claim": "OpenTelemetry publica convencions per descriure recursos, atributs i operacions amb una semàntica compartida.",
          "transfer": "Serveixen de base tècnica. Les famílies i versions escollides necessitaran validació amb el catàleg del CTTI."
        },
        {
          "sourceId": "TEC_WEAVER",
          "claim": "OpenTelemetry presenta Weaver per mantenir i comprovar convencions semàntiques.",
          "transfer": "Atos proposa provar-lo com a candidat al costat d’esquemes JSON i mostres CTTI; no pressuposa que OTLP sigui equivalent al JSON corporatiu."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada",
      "addendum": {
        "title": "Identitat útil des del desplegament",
        "paragraphs": [
          "Atos proposa relacionar la identitat de cada servei amb la criticitat, l’àmbit consumidor i el centre de cost del catàleg corporatiu. La comprovació s’executaria des del desplegament i continuaria a la ingesta. Els canvis de responsable o de centre de cost mantindrien la seva vigència, per interpretar correctament incidents i consums històrics."
        ],
        "evidence": [
          {
            "sourceId": "ATOS_WS_2026",
            "claim": "Arquitectura modular de telemetria, FinOps, instrumentació combinada i adopció progressiva d’AIOps amb validació operativa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "A2",
      "title": "Una ingesta sota control del CTTI",
      "subtitle": "Collectors amb estat i configuració coneguts separen les fonts dels destins i fan visibles les pèrdues de dades.",
      "problem": "Talaia, Montic, AppDynamics i les sondes descrites al servei d’eines són el punt de partida; la memòria també recull pilots d’integració AWS/Azure amb Talaia. Les eines de l’entorn CTTI tenen funcions diferents i han de poder conviure. Quan cada font envia directament a un únic destí, canviar d’eina obliga a tocar moltes integracions. També costa saber si un buit correspon al servei observat o a una fallada de recollida. La ingesta necessita identitat, capacitat mesurada i supervisió pròpia.",
      "proposal": "Atos proposa collectors prop de les fonts i passarel·les d’ingesta per domini o zona. Apliquen el contracte A1, filtren camps i envien cada senyal als destins autoritzats; un segon camí permet comparar eines. Cues persistents i reintents absorbeixen interrupcions dins d’un marge conegut, amb ocupació i descartats visibles. La flota té un inventari efectiu: operador, versió, capacitats i configuració real, contrastada amb la prevista. Els canvis es despleguen primer en un grup petit i es poden recuperar si fallen. La configuració, els certificats i les rutes queden disponibles per al CTTI. Els connectors de Talaia, OBM, Elastic i cloud es validen un a un. Cada tram identifica operador i suport; el CdC coneix la visibilitat perduda quan falla la recollida.",
      "flow": [
        "Recollir a cada zona amb la identitat del servei.",
        "Validar, filtrar i limitar el volum per font.",
        "Encaminar i retenir temporalment davant d’una interrupció.",
        "Mesurar lliurament, retard i dades descartades."
      ],
      "technology": [
        {
          "name": "OpenTelemetry Collector",
          "role": "Separa recepció, tractament i exportació de mètriques, logs i traces segons els components compatibles que s’hagin validat."
        },
        {
          "name": "Cues persistents i, si cal, Kafka",
          "role": "Aporten marge davant d’interrupcions. Kafka només s’incorpora si la durabilitat requerida justifica operar una capa addicional."
        },
        {
          "name": "Certificats i límits per emissor",
          "role": "Autentiquen cada connexió i eviten que una font descontrolada consumeixi tota la capacitat d’ingesta."
        },
        {
          "name": "OpAMP i gestió de collectors",
          "role": "Permeten consultar estat i gestionar configuracions en implementacions compatibles. Bindplane és una referència de mercat; el pilot valida versions, desplegament gradual i recuperació."
        }
      ],
      "pilot": "Connectar dues fonts representatives a una passarel·la i dos destins de prova. Mesurar càrrega normal i de pic, tallar temporalment un destí i reiniciar un collector. Comparar comptadors d’entrada, sortida i pèrdua amb un conjunt conegut. Lliurar configuració, model de capacitat i procediment de recuperació, incloent què passa quan el marge de cua s’esgota. Inventariar la configuració efectiva i provar un canvi gradual amb un collector incompatible. Tallar també el servidor de gestió i comprovar si la recollida continua amb la darrera configuració vàlida.",
      "tender": "Atos proposa una ingesta amb protocols documentats, configuració exportable i diversos destins autoritzats. El pilot comprova reinicis, saturació i indisponibilitat del receptor, amb pèrdues i retards visibles per font. La proposta inclou connectors i configuracions dins dels drets d’ús acordats. Els límits de capacitat i recuperació es concreten a partir de la càrrega mesurada al pilot.",
      "acceptance": [
        "Un destí aturat no impedeix l’enviament a l’altre dins del dimensionament acordat.",
        "Es reconcilien mostres enviades, rebudes, pendents i descartades.",
        "Es recupera la configuració en una instal·lació neta.",
        "Un collector incompatible queda identificat; el canvi s’atura en el grup pilot i es recupera la configuració anterior sense propagar-lo a tota la flota.",
        "La caiguda del servidor de gestió deixa una alarma i es comprova la continuïtat de recollida amb la configuració vigent."
      ],
      "metrics": [
        "Retard d’ingesta p95 i percentatge de senyals perduts.",
        "Ocupació de cua i consum de recursos per volum ingressat."
      ],
      "dependencies": [
        "A1",
        "F3",
        "A4",
        "B3"
      ],
      "caution": "Un collector també pot fallar. Les cues tenen límits i els reintents poden generar duplicats segons el protocol. Cal dimensionar cada salt i evitar que una aturada de telemetria freni la transacció del ciutadà.",
      "evidence": [
        {
          "sourceId": "MKT04",
          "claim": "OpenTelemetry documenta gestió d’agents amb OpAMP; les implementacions ofereixen capacitats diferents.",
          "transfer": "Atos proposa controlar la flota amb inventari efectiu, desplegament gradual i recuperació. La prova es repeteix amb cada distribució i versió admesa."
        },
        {
          "sourceId": "INT14",
          "relatedSourceIds": [
            "INT18"
          ],
          "claim": "StackOps ofereix observabilitat compartida al govern de Singapur. perfSONAR aporta un precedent de mesures que travessen xarxes de diferents organitzacions.",
          "transfer": "Atos proposa recollir cada senyal pel camí adequat i conservar-ne font, domini i responsable. Les mètriques d’aplicació conviurien amb les dels equips de xarxa i les evidències dels operadors de fibra. Els casos no acrediten compatibilitat amb totes les eines CTTI: el pilot ha de provar connectors, saturació, retards i recuperació."
        },
        {
          "sourceId": "R01",
          "claim": "eBay relata la substitució de la recollida de mètriques per OpenTelemetry mantenint el comportament que esperaven els seus equips.",
          "transfer": "És una referència de desacoblament progressiu, no una prova que tots els connectors CTTI siguin compatibles."
        },
        {
          "sourceId": "R03",
          "claim": "OpenTelemetry documenta cues, reintents i persistència, i identifica les situacions que encara poden causar pèrdua de dades.",
          "transfer": "Atos proposa provar aquests límits i fer visibles les pèrdues en les condicions assajades."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada",
      "addendum": {
        "title": "Del servidor al circuit de fibra",
        "paragraphs": [
          "La recollida també inclou la xarxa: routers, commutadors, tallafocs i accés Wi-Fi, amb els protocols i APIs que ofereixi cada equip. En els circuits de fibra es relacionaran alarmes, potència òptica i proves de l’operador amb els serveis afectats. eBPF aporta context des dels sistemes compatibles; la salut de l’equip i del medi físic requereix les seves pròpies fonts."
        ],
        "evidence": [
          {
            "sourceId": "RT09",
            "claim": "Defineix consulta de capacitats, recuperació d’estat i subscripcions a telemetria, amb mostreig o actualitzacions per canvi.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT10",
            "claim": "El model representa potència òptica d’entrada i sortida en components, transceptors i canals.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT11",
            "claim": "Descriu monitorització física de fibra amb equips OTDR situats en punts de la xarxa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT17",
            "claim": "Defineix el model de seguretat basat en usuaris per a SNMPv3.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT18",
            "claim": "Defineix l’exportació d’informació de fluxos IP des d’un punt d’observació a un col·lector.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "A3",
      "title": "Retenir segons l’ús de la dada",
      "subtitle": "Polítiques automàtiques separen consulta immediata, anàlisi històrica i evidència que s’ha de poder recuperar.",
      "problem": "El Llibre Blanc ja concreta retencions en algunes mètriques, però hi ha apartats generals pendents de tancar. Aplicar una mateixa durada a tot encareix l’operació i pot deixar fora informació útil. Cal decidir què es conserva íntegre, què s’agrega i què s’elimina, segons la pregunta que després voldrem respondre.",
      "proposal": "Cada família tindrà una política executable amb tres usos: operació, anàlisi i evidència. El sistema mantindrà accés ràpid a les dades recents, traslladarà o agregarà les històriques i preservarà el conjunt probatori seleccionat amb controls d’integritat. El catàleg indicarà resolució, finestra, ubicació, cost estimat i temps de recuperació. Les excepcions tindran propietari i revisió. Abans d’eliminar, es comprovaran dependències amb alertes, SLO i investigacions obertes. Les durades es fixaran amb els responsables de servei i de dades; una política de retenció no es dedueix només del preu del disc. El circuit de cada servei identificarà qui valida l’excepció i qui l’aplica; administrar l’eina no comporta per si sol autoritat per decidir la retenció.",
      "flow": [
        "Classificar senyals segons ús i sensibilitat.",
        "Aplicar retenció, agregació i moviment entre capes.",
        "Comprovar dependències abans de la purga.",
        "Recuperar periòdicament mostres i verificar-ne la integritat."
      ],
      "technology": [
        {
          "name": "Polítiques de cicle de vida, com ILM",
          "role": "Mouen i eliminen índexs segons regles, fent explícit el compromís entre velocitat de consulta i cost."
        },
        {
          "name": "Agregació de sèries temporals",
          "role": "Conserva tendències amb menys resolució; els comptadors i histogrames requereixen operacions que preservin el significat de les mesures."
        },
        {
          "name": "Emmagatzematge d’objectes amb bloqueig",
          "role": "Protegeix versions seleccionades durant la retenció configurada i permet comprovar-ne la integritat amb manifestos i sumes de verificació."
        }
      ],
      "pilot": "Triar logs d’operació, mètriques de capacitat i evidències d’un incident de prova. Fer una simulació de cicle de vida amb finestres curtes en un entorn separat. Mesurar consulta recent, recuperació històrica i resultat d’una purga. El pilot acabarà amb una matriu d’usos i costos, i una prova de lectura de les dades recuperades per una persona diferent de qui les va arxivar.",
      "tender": "Atos proposa polítiques de retenció segons l’ús, amb resolució, durada, integritat i recuperació documentades, revisables i exportables pel CTTI. La proposta inclou proves de recuperació i llegibilitat de les evidències, amb registre de purgues i excepcions autoritzades. Les dades per a SLO o investigacions actives es conserven segons les dependències i decisions acordades.",
      "acceptance": [
        "Una dada de cada capa es recupera i es consulta amb el seu context.",
        "La purga respecta una excepció vigent i s’executa després de resoldre-la.",
        "L’agregació conserva els resultats de les consultes de referència acordades."
      ],
      "metrics": [
        "Cost per volum i capa; proporció de dades amb política vigent.",
        "Temps de recuperació i percentatge de proves completades correctament."
      ],
      "dependencies": [
        "A1",
        "E3"
      ],
      "caution": "L’agregació és irreversible quan s’elimina el detall. Un arxiu immutable pot contenir dades incorrectes. Cal provar el significat de les consultes i la recuperació, i acordar la conservació abans de bloquejar o purgar.",
      "evidence": [
        {
          "sourceId": "INT04",
          "relatedSourceIds": [],
          "claim": "El Ministry of Justice britànic adverteix que els històrics de resolució reduïda poden deixar de servir per calcular disponibilitat en períodes llargs.",
          "transfer": "Atos proposa separar el detall de diagnosi de l’evidència necessària per reproduir un indicador. Abans de reduir o eliminar dades, repetiríem el càlcul amb el seu denominador, exclusions i versió. La guia té una revisió pendent; la seva advertència serveix per definir una prova, sense importar al CTTI una política concreta de retenció."
        },
        {
          "sourceId": "R04",
          "claim": "Uber va dissenyar M3 amb polítiques de retenció i agregació configurables per a les mètriques.",
          "transfer": "La lliçó és associar resolució i ús. Les finestres i els volums del CTTI s’han de mesurar."
        },
        {
          "sourceId": "R05",
          "claim": "Elastic documenta capes d’emmagatzematge amb recursos i velocitats de consulta diferents.",
          "transfer": "Aporta un mecanisme concret per materialitzar la política, subjecte a configuració, llicència i proves de recuperació."
        },
        {
          "sourceId": "R31",
          "claim": "Object Lock protegeix versions d’objectes durant el període configurat.",
          "transfer": "És una opció per preservar evidències; cal afegir comprovació d’integritat, inventari i proves de lectura."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "A4",
      "title": "Observabilitat com a codi",
      "subtitle": "Configuració versionada i context de cada desplegament per comprovar què ha canviat i amb quin resultat.",
      "problem": "La memòria ja descriu SIC/SIC+ i la incorporació d’observabilitat de cloud a Talaia. Atos proposa estendre aquest camí on sigui aplicable. Un canvi manual en una alerta pot resoldre una urgència i perdre’s quan es reinstal·la l’eina. Si les configuracions viuen només a les consoles, costa comparar entorns i entendre qui va canviar un llindar. Al CTTI, la convivència de proveïdors fa especialment útil disposar d’un paquet de configuració que es pugui revisar i repetir.",
      "proposal": "Atos proposa mantenir collectors, regles, sondes i dashboards com a codi, amb revisió i proves abans de publicar-los. Sobre SIC+, cada desplegament de la solució observada deixaria també un esdeveniment amb servei, entorn, versió, canvi autoritzat i resultat. Des d’una degradació es podria arribar a les proves del canvi proper i comparar el comportament abans i després. La proximitat temporal orienta la investigació; no acredita per si sola la causa. El circuit de canvi manté les aprovacions i els equips executors, i una finestra de manteniment no oculta qualsevol afectació. Quan la plataforma ho permeti, el resultat observat també pot condicionar el pas següent d’un desplegament: continuar, pausar o recuperar la versió autoritzada. Sense prou trànsit o amb telemetria absent, el resultat és inconcloent i requereix revisió.",
      "flow": [
        "Versionar configuració i proves.",
        "Validar i desplegar pel circuit corporatiu.",
        "Relacionar versió, canvi i senyals del servei.",
        "Comprovar el resultat i recuperar si cal."
      ],
      "technology": [
        {
          "name": "SIC+ i metadades de release",
          "role": "Relacionen components, versions i proves amb el canvi; cal validar-ne l’exportació cap a l’observabilitat."
        },
        {
          "name": "Git, Terraform i proves automàtiques",
          "role": "Versionen collectors, regles i sondes i comproven la configuració abans de publicar-la."
        },
        {
          "name": "Esdeveniments de canvi i línia temporal",
          "role": "Permeten investigar el comportament del servei amb context de desplegament, sense confondre correlació amb causa."
        },
        {
          "name": "Anàlisi de desplegaments, com Argo Rollouts",
          "role": "Contrasta mètriques abans d’ampliar un desplegament en plataformes compatibles. El patró es prova dins del circuit corporatiu, sense pressuposar Kubernetes a tot l’entorn."
        }
      ],
      "pilot": "Seguir un canvi correcte, un de fallit i un de cancel·lat en preproducció. Comprovar configuració d’observabilitat, versió de l’aplicació, proves MAT i referència del canvi. Comparar el servei abans i després i verificar la recuperació quan es desfaci un canvi autoritzat. En una plataforma compatible, provar una ampliació gradual amb resultat bo, dolent i sense dades suficients; el darrer cas ha de quedar pendent de revisió.",
      "tender": "Atos proposa versionar la configuració d’observabilitat i relacionar cada canvi de la solució amb el seu comportament abans i després. El pilot reutilitza SIC+, metadades, proves i circuit de canvi per identificar què es va desplegar, quina evidència queda i si s’ha recuperat el resultat funcional.",
      "acceptance": [
        "Un canvi deixa configuració, versió, entorn i evidència de les proves accessibles.",
        "Es distingeixen desplegament correcte, fallit, cancel·lat i prova omesa.",
        "La comparació abans/després mostra la recuperació funcional i les fonts que encara falten.",
        "Una anàlisi sense dades suficients no autoritza automàticament ampliar el desplegament; deixa el resultat inconcloent i una decisió pendent."
      ],
      "metrics": [
        "Canvis amb prova i revisió / canvis totals.",
        "Divergències obertes i temps necessari per recuperar una versió."
      ],
      "dependencies": [
        "A1",
        "E2"
      ],
      "caution": "Algunes eines exporten configuració incompleta o depenen d’identificadors interns. Cal provar la reconstrucció, no donar-la per feta perquè hi hagi un fitxer JSON. La reconciliació automàtica ha de respectar les intervencions d’emergència autoritzades.",
      "evidence": [
        {
          "sourceId": "INT03",
          "relatedSourceIds": [],
          "claim": "Cloud Pi Native, del Ministeri de l’Interior francès, sincronitza quadres i alertes dels projectes des de Git amb ArgoCD.",
          "transfer": "Atos proposa aplicar el mateix criteri als patrons acordats: canvi revisat, prova, desplegament i reversió amb historial. Cada regla tindria un mantenidor identificat i una comprovació sobre el servei que ha de protegir. La font també recorda que les alertes particulars no venen resoltes per defecte: disposar de plataforma no tanca la feina de definir-les."
        },
        {
          "sourceId": "R06",
          "claim": "OpenGitOps defineix un estat declarat, versionat i reconciliat contínuament amb el desplegament.",
          "transfer": "Podem aplicar aquests principis a l’observabilitat, adaptant el mecanisme a les interfícies reals de cada eina."
        },
        {
          "sourceId": "R26",
          "claim": "openDesk distribueix regles Prometheus i dashboards Grafana mitjançant configuració desplegable.",
          "transfer": "Mostra una pràctica pública reutilitzable. La cobertura publicada és desigual per component i s’hauria de comprovar al pilot."
        },
        {
          "sourceId": "MKT09",
          "claim": "Argo Rollouts permet condicionar el desplegament a una anàlisi de mètriques i pausar davant d’un resultat inconcloent.",
          "transfer": "Atos proposa provar aquest patró on sigui compatible amb SIC+/MAT i els circuits vigents, conservant aprovacions, evidències i recuperació autoritzada."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "A5",
      "title": "Serveis que neixen observats",
      "subtitle": "Les plantilles d’alta incorporen telemetria i comproven un recorregut real abans de donar el servei per preparat.",
      "problem": "SIC+/Talaia i els circuits corporatius d’alta ja ofereixen una base per incorporar observabilitat al desplegament. Atos proposa comprovar que aquesta alta deixa el servei preparat per al diagnòstic: identitat, dependències, senyals, responsable i camí d’escalat. Les excepcions han de mostrar què encara no es pot observar i com es revisarà.",
      "proposal": "La plantilla de servei genera identitat, configuració de telemetria, dashboard inicial, responsable d’alertes i enllaç al manual operatiu. La instrumentació automàtica cobreix protocols i llibreries compatibles; el codi afegeix els punts de negoci que falten. En sistemes Linux adequats, eBPF pot ajudar a descobrir dependències i rendiment mentre es completa la instrumentació. La prova d’alta executa un recorregut sintètic i verifica que es pot seguir entre components. Un servei heretat pot entrar amb una excepció de cobertura, amb una data de revisió i el deute associat. L’alta mostra què s’observa i què encara queda fora. La instrumentació seguiria els criteris de l’Oficina d’Observabilitat, inclòs el circuit d’activació d’APM. La gestió del servei, Arquitectura/Integració i el responsable funcional participarien en les validacions que corresponguin. En aplicacions compatibles, l’alta pot deixar preparat el perfilatge que relaciona una petició lenta amb les funcions que consumeixen recursos. També pot preveure punts de diagnòstic dinàmic: el mantenidor activa detall de codi durant la finestra limitada de C5, amb permisos i filtratge de dades sensibles.",
      "flow": [
        "Crear el servei amb una plantilla corporativa.",
        "Incorporar instrumentació segons plataforma i llenguatge.",
        "Executar un recorregut de prova i una fallada controlada.",
        "Publicar cobertura, responsable i excepcions d’alta."
      ],
      "technology": [
        {
          "name": "Plantilles de plataforma i CI/CD",
          "role": "Generen la configuració mínima i executen les proves d’observabilitat dins del mateix camí que publica l’aplicació."
        },
        {
          "name": "Agents i SDK OpenTelemetry",
          "role": "Capturen operacions compatibles i permeten afegir trams i atributs de negoci quan la instrumentació automàtica no els coneix."
        },
        {
          "name": "eBPF / OpenTelemetry OBI",
          "role": "Aporta visibilitat inicial en càrregues Linux compatibles; se’n comproven permisos, impacte i limitacions abans d’habilitar-lo."
        },
        {
          "name": "MAT i proves de visibilitat",
          "role": "Reutilitzen una operació funcional per comprovar emissió, recepció i consulta del senyal amb la identitat correcta."
        },
        {
          "name": "Perfils de codi i instrumentació dinàmica",
          "role": "Pyroscope relaciona traces i perfils en integracions compatibles; Lightrun és un exemple d’agent per afegir punts de diagnòstic en execució. Són capacitats complementàries, amb requisits i impacte propis."
        }
      ],
      "pilot": "Executar una operació correcta, una dependència lenta i un cas sense telemetria. L’informe ha de distingir prova superada, fallida, omesa i sense evidència, i assenyalar quin equip ha de resoldre cada buit. Es reutilitzaria una prova MAT i es contrastaria la cobertura amb el paquet corporatiu aplicable. En una aplicació compatible, seguir una petició lenta fins al perfil de codi. Comprovar també l’activació i retirada d’un punt de diagnòstic, amb filtratge de camps i càrrega mesurada.",
      "tender": "Atos proposa patrons d’instrumentació i plantilles d’alta per a les plataformes acordades. Cada alta comprova identitat, senyals mínims, encaminament d’alertes i traçabilitat del recorregut de prova. Les limitacions i excepcions tenen responsable i revisió. La proposta inclou actualització, desactivació i retirada dels agents, amb l’impacte sobre l’aplicació mesurat.",
      "acceptance": [
        "Una petició de prova es relaciona amb el servei i les dependències cobertes.",
        "Una fallada controlada arriba a l’equip assignat amb context útil.",
        "Es mesura la sobrecàrrega i es retira l’agent sense perdre la configuració base.",
        "L’alta diferencia prova superada, fallida, omesa i sense evidència; cap desplegament verd substitueix la prova de recepció dels senyals.",
        "El pilot identifica llenguatge, versió i instrumentació compatibles; quan no hi ha mostres de perfil o detall de codi, ho mostra com a buit de cobertura."
      ],
      "metrics": [
        "Altes que superen el mínim observable / altes revisades.",
        "Temps fins a la primera traça útil i sobrecàrrega per instrumentació."
      ],
      "dependencies": [
        "A1",
        "A2",
        "A4",
        "B7"
      ],
      "caution": "L’autoinstrumentació no entén un tràmit administratiu. eBPF té requisits de sistema i no cobreix totes les comunicacions. Cal descriure els buits i afegir instrumentació de negoci on el diagnòstic ho necessiti.",
      "evidence": [
        {
          "sourceId": "MKT03",
          "claim": "Pyroscope documenta la connexió entre traces i perfils de codi; Lightrun, punts de diagnòstic afegits mitjançant un agent.",
          "transfer": "Atos proposa validar aquestes capacitats amb els mantenidors: passar d’una petició lenta al detall que permet investigar-la, mesurant cobertura i impacte.",
          "relatedSourceIds": [
            "MKT02"
          ]
        },
        {
          "sourceId": "INT01",
          "relatedSourceIds": [
            "R08"
          ],
          "claim": "Nais integra observabilitat a la plataforma i documenta límits d’entorn i filtratge. Altinn ofereix un laboratori per provar la instrumentació OpenTelemetry.",
          "transfer": "Atos proposa que cada alta lliuri una traça comprensible, un error de prova visible i un responsable que n’accepti el manteniment. L’activació automàtica es faria només sobre entorns compatibles. El resultat funcional del tràmit continuaria necessitant esdeveniments propis; cap d’aquests casos demostra que afegir un agent cobreixi tot el servei."
        },
        {
          "sourceId": "R08",
          "claim": "Nais, la plataforma de NAV a Noruega, permet activar instrumentació OpenTelemetry des de la configuració de desplegament i verificar-ne les traces.",
          "transfer": "Aporta un patró públic d’alta observable; el suport concret s’ha de contrastar amb les plataformes CTTI."
        },
        {
          "sourceId": "R09",
          "claim": "OBI captura senyals d’aplicació i xarxa en entorns Linux compatibles sense modificar el codi.",
          "transfer": "És un complement per iniciar cobertura. La documentació reconeix que alguns atributs i esdeveniments necessiten instrumentació específica."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada",
      "addendum": {
        "title": "eBPF: on aporta i com el complementem",
        "paragraphs": [
          "Atos proposa ampliar la cobertura amb eBPF en servidors, màquines virtuals i nodes Linux compatibles, també fora de Kubernetes. OBI pot descobrir comunicacions i mesurar rendiment sense modificar el codi. A Windows, la base seran agents compatibles i ETW; eBPF for Windows s’avaluarà només si l’eina, la versió i el suport ho justifiquen. Per a macOS, es faran servir els mecanismes natius i la instrumentació disponible. Cada alta mostrarà la cobertura real i els punts que encara necessiten instrumentació."
        ],
        "evidence": [
          {
            "sourceId": "R09",
            "claim": "Documenta entorns Linux compatibles, requisits de nucli, arquitectura, BTF i privilegis, i captura automàtica d’activitat d’aplicació i xarxa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT01",
            "claim": "Projecte per executar eBPF sobre Windows 11 i Server 2022 o posteriors, amb compatibilitat de codi per als hooks compartits.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT02",
            "claim": "La versió v1.4.0 consultada està marcada com a prerelease; afegeix punts d’intercepció de xarxa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT03",
            "claim": "ETW recull esdeveniments de components d’usuari i controladors, amb activació i desactivació dinàmica.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT06",
            "claim": "Apple ofereix Network Extensions i Endpoint Security per a funcions de xarxa i observació d’esdeveniments de sistema des d’extensions.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "A6",
      "title": "Un llenguatge comú per llegir les dades",
      "subtitle": "Un catàleg semàntic relaciona serveis, senyals i consultes encara que la informació visqui en eines diferents.",
      "problem": "La memòria documenta la PTD i Neo4j Aura corporatiu, amb pilots al Centre de Control. Atos partiria d’aquesta base per contrastar-ne el model i la cobertura. Un llac de dades no resol per si sol que dues eines anomenin el mateix servei de manera diferent. La informació pot estar centralitzada i continuar sent difícil de relacionar. El CTTI necessita una vista coherent sobre les fonts actuals, amb coneixement de la procedència, la vigència i els permisos de cada dada.",
      "proposal": "Proposem una capa semàntica amb identificadors de servei, taules de correspondència, unitats i definicions de càlcul. El catàleg mostra d’on prové cada camp, quin tractament ha rebut i on es consulta. Els casos que necessiten resposta ràpida tindran dades normalitzades i preparades; les consultes menys freqüents podran federar fonts compatibles. Els mateixos identificadors uniran telemetria, catàleg de serveis, incidents i costos. Es conservaran el valor d’origen i la transformació quan calgui investigar discrepàncies. La decisió de copiar o federar cada conjunt dependrà del rendiment, el cost i els controls d’accés demostrats al pilot. El graf de dependències reutilitzaria les capacitats existents quan encaixin, amb origen i data de validació per a cada relació. Disposar de la plataforma no prova que el graf operatiu estigui complet.",
      "flow": [
        "Inventariar fonts, identificadors i definicions.",
        "Mapar cada dada al servei i a la seva semàntica.",
        "Preparar o federar consultes segons l’ús.",
        "Mostrar resultat, procedència, vigència i cobertura."
      ],
      "technology": [
        {
          "name": "Catàleg corporatiu i metadades SIC+",
          "role": "Relacionen servei, component i versió. Cada vincle conserva si prové de l’inventari, del desplegament o de l’activitat observada."
        },
        {
          "name": "SQL federat, com Trino",
          "role": "Permet consultar fonts compatibles des d’una capa comuna; la selecció de connectors depèn de versions, permisos i rendiment."
        },
        {
          "name": "Magatzem analític i pipelines de normalització",
          "role": "Preparen conjunts que requereixen consulta estable i ràpida, conservant la procedència i les regles de transformació."
        }
      ],
      "pilot": "Triar tres fonts: metadades de SIC+, inventari corporatiu i comunicacions observades. Comparar la consulta federada amb una vista preparada per al pilot, inclosa una font indisponible. Contrastar una dependència declarada sense trànsit recent, una comunicació no declarada i una font desactualitzada, conservant origen i vigència de cada relació.",
      "tender": "Atos proposa identificar cada servei amb un llenguatge comú i conservar la traça de les transformacions. Les consultes mostren cobertura i vigència i respecten els permisos de les fonts. La proposta inclou mapatges, definicions i interfícies exportables. La decisió de centralitzar o federar dades es contrasta amb proves de consistència, rendiment i comportament davant de fonts indisponibles.",
      "acceptance": [
        "El mateix servei es reconcilia entre les tres fonts del pilot.",
        "Una font absent es mostra com a informació incompleta, sense inventar un estat saludable.",
        "La consulta es reprodueix a partir de la versió del mapatge i les dades conservades.",
        "Una relació declarada que no s’ha observat manté la seva procedència i es mostra com a pendent de contrast."
      ],
      "metrics": [
        "Registres relacionats amb un servei inequívoc / registres tractats.",
        "Temps de consulta, antiguitat de la dada i discrepàncies entre fonts."
      ],
      "dependencies": [
        "A1",
        "F3"
      ],
      "caution": "Federar pot traslladar càrrega a sistemes operatius i produir resultats parcials. Cal limitar consultes i explicitar les finestres temporals. El registre de serveis necessita un responsable capaç de resoldre identitats duplicades.",
      "evidence": [
        {
          "sourceId": "R28",
          "relatedSourceIds": [
            "INT10"
          ],
          "claim": "X-tee relaciona intercanvis amb metadades operatives. GSA Site Scanning consolida fonts d’inventari per identificar i revisar webs federals.",
          "transfer": "Atos proposa reconciliar identitat tècnica, servei consumidor i responsable abans d’unir les dades. Un domini nou, un àlies o una dependència declarada requeririen comprovació i data de vigència. La vista comuna mostraria d’on surt cada relació i què falta confirmar. Aquests precedents no acrediten que tots els inventaris CTTI encaixin automàticament ni que calgui copiar totes les dades."
        },
        {
          "sourceId": "R04",
          "claim": "M3 permetia a Uber consultar mètriques entre regions mantenint dades locals i compatibilitat amb fonts anteriors.",
          "transfer": "El patró ajuda a discutir federació i continuïtat, però no resol la semàntica dels serveis CTTI."
        },
        {
          "sourceId": "R10",
          "claim": "Trino documenta un connector per consultar Elasticsearch amb SQL, amb requisits i limitacions concrets.",
          "transfer": "És una opció comprovable per a una part del pilot. No pressuposa accés universal a totes les eines."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada",
      "addendum": {
        "title": "Un mapa amb dependències observades",
        "paragraphs": [
          "El mapa de dependències es contrastarà amb comunicacions observades: OBI o Hubble en entorns compatibles, i telemetria de xarxa a la resta. Cada relació indicarà si prové de l’inventari, d’una configuració o de trànsit real, amb la data de l’última evidència. L’observació tècnica completa el mapa de servei; no substitueix la validació del responsable."
        ],
        "evidence": [
          {
            "sourceId": "RT07",
            "claim": "Hubble observa comunicacions als nodes Cilium; Relay agrega la visió i la interfície mostra dependències segons els fluxos visibles.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "B1",
      "title": "Maduresa amb evidències",
      "subtitle": "Un motor de comprovacions alimenta les trenta caselles de la matriu i explica cada puntuació.",
      "problem": "La matriu de l’Atles és útil si dues persones poden justificar una nota amb la mateixa evidència. Si s’omple només amb entrevistes, costa veure què ha canviat. Cal connectar-la al catàleg, a les proves i a l’ús real de l’observabilitat, mantenint la revisió humana on la mesura no és automàtica.",
      "proposal": "Conservem els cinc dominis: Infraestructura, Aplicació, Experiència d’Usuari, Negoci i Seguretat. Les sis dimensions són Cobertura, Profunditat, Qualitat de la dada, Alarmat, Adopció i Automatització. Un motor consulta les fonts i proposa un nivell d’1 a 5 segons rúbriques versionades. Cada resultat mostra abast, data i evidència; una dada absent apareix com a no avaluada. El responsable valida els punts que requereixen judici. Els pesos continuen sent configurables pel CTTI. Aquesta matriu és pròpia de l’Atles: es relacionaria amb les cinc famílies, els eixos i els paquets CTTI, sense substituir-los. PCN&ME ajudaria a prioritzar serveis i moments crítics; el calendari de la primera mesura s’acordaria al pilot.",
      "flow": [
        "Definir rúbriques, àmbit i evidència requerida.",
        "Executar comprovacions sobre fonts autoritzades.",
        "Revisar punts que necessiten criteri expert.",
        "Publicar matriu, canvis i accions associades."
      ],
      "technology": [
        {
          "name": "Motor de polítiques",
          "role": "Executa regles sobre dades de catàleg, instrumentació i operació, conservant el resultat i la versió de la rúbrica."
        },
        {
          "name": "Portal de serveis, com Backstage",
          "role": "Presenta la maduresa al costat del servei, els responsables i les accions que permeten millorar cada dimensió."
        },
        {
          "name": "Repositori d’evidències",
          "role": "Conserva referències datades per revisar una puntuació encara que l’estat del servei hagi canviat."
        }
      ],
      "pilot": "Avaluar dos serveis i fer que dos revisors puntuïn independentment una mostra de caselles. Comparar discrepàncies i ajustar els descriptors. Automatitzar primer cobertura, propietat i existència de proves; explicitar els criteris manuals d’adopció. El lliurable serà la matriu inicial, les regles i la concordança entre avaluadors.",
      "tender": "Atos proposa una matriu de cinc dominis i sis dimensions, amb nivells d’1 a 5, rúbriques ancorades i pesos configurables. La primera mesura es planteja dins del segon mes, amb repetició trimestral. Cada puntuació té evidència, àmbit i data; les comprovacions i els ajustos manuals són auditables. Els objectius de cada període es concreten sobre la mesura inicial.",
      "acceptance": [
        "Dos revisors poden reconstruir el motiu d’una puntuació.",
        "Una evidència caducada impedeix presentar la nota com a vigent.",
        "Una comprovació actualitza només les caselles que depenen d’ella."
      ],
      "metrics": [
        "Caselles amb evidència vigent / caselles avaluables.",
        "Concordança entre revisors i evolució per domini."
      ],
      "dependencies": [
        "A1",
        "A6"
      ],
      "caution": "La puntuació no ha de premiar volum de dades ni nombre d’eines. Cal separar manca de cobertura, manca d’evidència i incompliment, i revisar les rúbriques quan deixen de discriminar situacions rellevants.",
      "evidence": [
        {
          "sourceId": "INT10",
          "relatedSourceIds": [],
          "claim": "GSA Site Scanning revisa diàriament un inventari de webs federals i publica el motor i les dades que produeix.",
          "transfer": "Atos proposa contrastar la cobertura declarada amb els serveis que apareguin als inventaris corporatius i als dominis autoritzats. Una mostra manual distingiria serveis reals, àlies i actius retirats. Així, la valoració de maduresa mostraria també allò que queda fora del recompte. La revisió periòdica nord-americana inspira aquest control; no és una certificació de cobertura ni monitoratge continu."
        },
        {
          "sourceId": "R11",
          "claim": "Spotify descriu Soundcheck com una manera de comprovar components i mostrar el seu ajust als estàndards d’enginyeria.",
          "transfer": "Podem traslladar el vincle entre comprovació i servei. La matriu de trenta caselles continua sent la proposta de l’Atles."
        },
        {
          "sourceId": "R12",
          "claim": "Open Policy Agent permet provar polítiques amb casos d’entrada i resultats esperats.",
          "transfer": "Les rúbriques automatitzables es poden sotmetre a regressió abans de canviar la manera de puntuar."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "B2",
      "title": "El deute d’observabilitat, a la vista",
      "subtitle": "Les mancances es detecten amb regles i es converteixen en tasques amb caducitat i prova de tancament.",
      "problem": "Una aplicació sense traces, una alerta sense destinatari i una retenció indefinida no són mancances equivalents. Un inventari estàtic les acumula però no explica què cal resoldre primer. El CTTI necessita relacionar cada buit amb el servei afectat, el risc que introdueix i la prova que permetrà donar-lo per resolt.",
      "proposal": "El registre s’alimenta de B1, les altes d’A5 i les revisions d’incident. Cada entrada identifica regla incomplerta, impacte, propietari, dependències, esforç i revisió. Un identificador estable evita crear la mateixa tasca cada dia. Les excepcions aprovades continuen visibles amb motiu i caducitat. Quan l’equip indica que ha corregit el problema, el motor repeteix la comprovació i adjunta l’evidència. La priorització combina criticitat i dependències; els tancaments es llegeixen al costat de la cobertura recuperada. El registre permet agrupar correccions que resolen una mateixa causa. Cada entrada separaria l’equip que corregeix de qui pot validar una excepció. Un tancament administratiu no es comptaria com a cobertura recuperada sense la prova corresponent.",
      "flow": [
        "Detectar una mancança o rebre una excepció.",
        "Crear o actualitzar una única entrada amb responsable.",
        "Prioritzar i executar la correcció acordada.",
        "Repetir la prova i tancar o reobrir."
      ],
      "technology": [
        {
          "name": "Integració amb gestió de treball",
          "role": "Relaciona mancances amb tasques i terminis mitjançant API o intercanvi estructurat validat."
        },
        {
          "name": "Motor de polítiques i excepcions",
          "role": "Distingeix incompliments d’excepcions aprovades i torna a avaluar-los quan canvia l’estat o venç la revisió."
        },
        {
          "name": "Graf de dependències",
          "role": "Ajuda a identificar correccions que desbloquegen diverses capacitats, com resoldre la identitat de servei abans de correlacionar incidents."
        },
        {
          "name": "Registre corporatiu d’excepcions",
          "role": "Enllaça el deute amb decisió, responsable i vigència, segons el circuit aplicable a cada excepció."
        }
      ],
      "pilot": "Provar una correcció, una excepció vigent i una de caducada. Cada cas ha de conservar la decisió del circuit competent i separar el tancament de la tasca de la recuperació demostrada de cobertura.",
      "tender": "Atos proposa un registre de deute amb causa, servei, propietari, prioritat i prova de resolució. Les excepcions tenen aprovador, justificació i revisió. La proposta s’integra amb el circuit de treball acordat i controla duplicats. El tancament automàtic es basa en evidència reproduïble; les correccions que necessiten criteri expert incorporen una validació identificada.",
      "acceptance": [
        "Una detecció repetida actualitza la tasca sense duplicar-la.",
        "Una excepció vençuda torna a revisió i conserva l’històric.",
        "Una correcció fallida manté o reobre el deute amb la prova associada."
      ],
      "metrics": [
        "Antiguitat del deute per criticitat i percentatge amb responsable.",
        "Cobertura recuperada i deute reobert després d’un tancament."
      ],
      "dependencies": [
        "B1",
        "A5"
      ],
      "caution": "Les interfícies de CONTIC o altres eines s’han de validar. El venciment d’una excepció no ha de provocar una aturada de producció sense una política expressa per a aquell control.",
      "evidence": [
        {
          "sourceId": "INT10",
          "relatedSourceIds": [],
          "claim": "El programa Site Scanning de la GSA treballa amb inventaris consolidats i comprovacions periòdiques de webs federals.",
          "transfer": "Atos proposa convertir les diferències verificades en feina concreta: un servei nou sense sonda, una alerta vinculada a un actiu retirat o un responsable desactualitzat. Cada cas tindria propietari, prioritat i prova de tancament; les excepcions conservarien vigència i motiu. Trobar una discrepància no la converteix automàticament en deute: primer cal confirmar que l’actiu pertany a l’abast acordat."
        },
        {
          "sourceId": "R13",
          "claim": "Kyverno documenta excepcions explícites per recurs i política, amb condicions comprovables.",
          "transfer": "És un mecanisme útil per a part de l’entorn. El circuit de deute, aprovació i caducitat requereix disseny propi."
        },
        {
          "sourceId": "R11",
          "claim": "Les comprovacions de qualitat de Spotify fan visibles els punts que un component encara no compleix.",
          "transfer": "La proposta afegeix responsable, venciment i prova de tancament per convertir aquesta visibilitat en treball gestionable."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "B3",
      "title": "Mesurar la qualitat de l’observabilitat",
      "subtitle": "Senyals de prova i control de frescor detecten quan es perd visibilitat abans de donar un servei per sa.",
      "problem": "El servei d’eines ja preveu vigilar la seva salut, les integracions i la continuïtat. Atos proposa comprovar el recorregut complet, des de la font fins a la consulta i l’avís. Així, un quadre verd no s’interpreta com a servei saludable quan han deixat d’arribar dades. El CdC necessita saber quina visibilitat conserva si falla una peça.",
      "proposal": "Atos proposa provar la cadena d’observabilitat amb senyals controlats i comprovacions de frescor. El pròxim enviament esperat del format CTTI permet detectar fonts silencioses; una prova de recorregut completa comprovaria també recepció, consulta i avís. El sistema distingiria dada antiga, font inaccessible, manteniment previst i servei degradat. En un entorn acordat, una degradació coneguda permetria contrastar com reacciona l’Índex de Salut, a qui arriba l’alerta i quina prova acredita la recuperació. La qualitat es mesuraria per trams, amb responsables i cobertura explícits.",
      "flow": [
        "Definir cobertura esperada i punts de comprovació.",
        "Emetre senyals sintètics i recollir comptadors.",
        "Conciliar lliurament i mesurar retard i consulta.",
        "Alertar sobre el camí d’observació que ha fallat."
      ],
      "technology": [
        {
          "name": "Telemetria interna dels collectors",
          "role": "Mesura cues, errors i descartats per identificar el salt on s’ha degradat la recollida."
        },
        {
          "name": "Sondes i emissor sintètic",
          "role": "Comproven ingestió, consulta i recepció d’un avís conegut, exclòs dels SLO de negoci."
        },
        {
          "name": "Motor de càlcul versionat",
          "role": "Publica indicadors reproduïbles i identifica quina part de la mesura manca quan una font no està disponible."
        },
        {
          "name": "Pròxim enviament i proves de recorregut",
          "role": "Comproven la frescor de cada font i l’arribada efectiva dels senyals fins a la consulta i l’avís."
        }
      ],
      "pilot": "Retardar un enviament i interrompre un receptor en un entorn de prova. Afegir una degradació controlada del servei per comprovar que l’Índex de Salut i els avisos reaccionen segons les regles aplicables. Registrar detecció, acceptació, diagnòstic i recuperació, distingint servei afectat i pèrdua de telemetria.",
      "tender": "Atos proposa indicadors de qualitat amb definició, font i abast, i proves de cap a cap dels circuits acordats, incloent consulta i notificació. La solució fa visibles interrupcions, descartats i dades caducades. Els llindars es plantegen sobre una línia base i es revisen quan canvien el volum o l’arquitectura.",
      "acceptance": [
        "Una font silenciosa es detecta dins del marge acordat i s’assigna al tram responsable.",
        "Les dades antigues i els manteniments previstos no es presenten com a cobertura actual.",
        "Una degradació coneguda i la seva recuperació es reflecteixen en els senyals i en l’índex segons les regles CTTI."
      ],
      "metrics": [
        "Senyals de prova rebuts / emesos i retard p95.",
        "Cobertura amb dada vigent / cobertura esperada, per criticitat."
      ],
      "dependencies": [
        "A1",
        "A2",
        "B7"
      ],
      "caution": "Les sondes han d’exercitar camins representatius. Una ruta privilegiada pot amagar fallades del trànsit real. Cal separar el senyal en el càlcul sense donar-li un tractament que alteri el recorregut.",
      "evidence": [
        {
          "sourceId": "INT15",
          "relatedSourceIds": [
            "INT05"
          ],
          "claim": "NIRS va assajar el setembre de 2026 una fallada del transport de logs. GOV.UK documenta comprovacions de la cadena d’alerta.",
          "transfer": "Atos proposa provar què passa quan la supervisió deixa de rebre dades: el sistema ha de mostrar la visibilitat perduda i avisar pel camí acordat. L’exercici recorreria emissió, ingesta, consulta i recepció de l’avís. La font coreana acredita el simulacre; la detecció del silenci i el canal independent formen part de la nostra proposta."
        },
        {
          "sourceId": "R03",
          "claim": "OpenTelemetry recomana observar ocupació de cues, capacitat i errors d’enviament del Collector.",
          "transfer": "Permet construir la salut de la ingesta; la prova completa fins a l’operador s’ha d’afegir."
        },
        {
          "sourceId": "R19",
          "claim": "Notify diferencia el temps d’enviament de la recepció final del missatge.",
          "transfer": "És una lliçó útil per definir cada etapa. Rebre una alerta a la plataforma no equival a atendre-la."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "B4",
      "title": "Publicar informació que es pugui utilitzar",
      "subtitle": "Un servei de dades genera vistes coherents per a operació, seguiment i direcció, amb data i procedència.",
      "problem": "Quan cada reunió rep un full diferent, es dedica temps a reconciliar xifres. L’Atles demana acordar on es publica, en quin format i amb quina cadència. La peça tecnològica consisteix a produir les vistes des de definicions comunes i permetre que el destinatari arribi a la dada que les sustenta.",
      "proposal": "Proposem un producte de dades per servei amb lectures d’operació, seguiment de compromisos i decisió. Les vistes s’adrecen als destinataris corporatius —Proveïdors, Àmbits, CdC i Direcció— amb el detall i els permisos que necessiti cadascun. Un procés programat o per esdeveniments prepara conjunts, comprova qualitat i publica per API, dashboard i exportació. Cada vista informa de finestra, actualització i fonts absents. Els informes es conserven com a instantànies per reproduir el que es va presentar. Els permisos regulen el detall visible. La cadència es pacta per necessitat: la resposta a un incident i el balanç mensual no tenen el mateix ritme. Les definicions compartides eviten recalcular un indicador de manera diferent en cada canal. Cada indicador conserva fórmula, població, període, exclusions, responsable i versió. Els ANS mantenen les definicions i fonts de seguiment que els corresponen.",
      "flow": [
        "Acordar preguntes, indicadors i destinataris.",
        "Preparar dades amb definicions i permisos comuns.",
        "Publicar vistes i exportacions amb vigència.",
        "Conservar instantànies i revisar-ne l’ús."
      ],
      "technology": [
        {
          "name": "API de dades amb esquema documentat",
          "role": "Permet consumir els mateixos indicadors des de quadres i informes sense recalcular-los amb regles diferents."
        },
        {
          "name": "Planificador i controls de qualitat",
          "role": "Executen la publicació i marquen resultats parcials quan manca una font o falla una comprovació."
        },
        {
          "name": "Dashboards i informes versionats",
          "role": "Mostren el detall adequat per rol i conserven la versió presentada en cada seguiment."
        }
      ],
      "pilot": "Publicar un indicador de disponibilitat, un de qualitat i un de cost en una vista operativa i un informe. Provocar una font tardana i verificar que tots dos expliquen la mateixa limitació. Lliurar definicions, API de mostra i un informe reproduïble a partir de la seva instantània.",
      "tender": "Atos proposa publicar indicadors amb definició, abast, finestra i actualització. La solució combina formats reutilitzables, accés per rol i traçabilitat fins a les dades i les regles de càlcul. Les publicacions parcials o retardades s’identifiquen. La proposta concreta cadències i destinataris en el model de govern, amb informes de seguiment reproduïbles.",
      "acceptance": [
        "API, dashboard i exportació coincideixen per a la mateixa finestra.",
        "Una font tardana queda indicada en totes les vistes afectades.",
        "Un informe anterior es reconstrueix amb dades i definicions identificades."
      ],
      "metrics": [
        "Publicacions completes i puntuals / publicacions previstes.",
        "Discrepàncies entre canals i temps per localitzar l’origen."
      ],
      "dependencies": [
        "A6",
        "B3"
      ],
      "caution": "Publicar més sovint no corregeix una font desactualitzada. La vista de direcció ha de conservar prou context per evitar comparacions entre serveis amb finestres, càrregues o cobertures diferents.",
      "evidence": [
        {
          "sourceId": "R28",
          "relatedSourceIds": [
            "INT04"
          ],
          "claim": "X-tee diferencia informació operativa i dades públiques agregades. El Ministry of Justice explicita límits dels històrics quan es calcula disponibilitat.",
          "transfer": "Atos proposa publicar cada indicador amb població, finestra, cobertura i versió de la definició. El quadre, l’API i l’exportació haurien de donar el mateix resultat per al mateix període. Una rectificació conservaria explicació i historial. La publicació oberta es decidiria separadament del detall operatiu; tenir una dada disponible no significa que sigui interpretable o publicable."
        },
        {
          "sourceId": "R17",
          "claim": "GOV.UK Pay publica activitat amb transaccions, imports i serveis actius, indicant-ne l’actualització.",
          "transfer": "Podem traslladar la claredat d’abast i vigència i afegir-hi les mesures operatives que necessita el CTTI."
        },
        {
          "sourceId": "R18",
          "claim": "El marc australià vincula recollida i compartició de dades amb la millora dels serveis públics.",
          "transfer": "És una referència per al govern de les publicacions; no prescriu l’arquitectura d’aquesta proposta."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "B5",
      "title": "Aprendre de cada incident",
      "subtitle": "Un expedient reuneix la cronologia i converteix les accions de millora en comprovacions reutilitzables.",
      "problem": "Després d’un incident, reconstruir què va passar exigeix recórrer alertes, converses i canvis. Les conclusions poden quedar en un document que ningú torna a consultar. El CTTI necessita reduir aquest treball de reconstrucció i comprovar que una acció de millora corregeix el problema que la va originar.",
      "proposal": "El model 132 atribueix al CdC la coordinació i el lideratge dels problemes segons impacte i perfil. Cada equip tècnic investiga i intervé en el seu àmbit; Qualitat hi participa segons el circuit aplicable. El sistema obre un expedient amb identificador únic i hi associa alertes, canvis, traces i decisions. Ordena els esdeveniments segons temps d’origen i recepció, conservant discrepàncies de rellotge. Un assistent pot preparar la cronologia amb enllaços; els equips validen els fets i les causes contribuents. Cada acció resultant té responsable i una prova que es pot repetir. Les regles corregides passen al repositori compartit i els casos autoritzats alimenten la base de coneixement. La revisió continua sent col·laborativa i sense culpabilització, amb fets que permeten entendre per què es va prendre cada decisió. L’incident que cal restablir, el problema que cal investigar i el canvi que cal validar queden relacionats, amb estats i responsables diferents.",
      "flow": [
        "Agrupar esdeveniments en un expedient d’incident.",
        "Reconstruir cronologia amb enllaços a l’evidència.",
        "Validar causes contribuents i accions de millora.",
        "Repetir proves i incorporar l’aprenentatge al catàleg."
      ],
      "technology": [
        {
          "name": "Integració d’esdeveniments i gestió d’incidents",
          "role": "Uneix registres d’eines amb identificadors comuns, sense substituir l’original ni perdre els canvis d’estat."
        },
        {
          "name": "Cerca i assistent amb fonts",
          "role": "Preparen cronologies i recuperen precedents, distingint fets documentats d’hipòtesis pendents de validar."
        },
        {
          "name": "Repositori de proves de regressió",
          "role": "Conserva casos que comproven si una alerta, una configuració o un procediment continuen cobrint la fallada coneguda."
        }
      ],
      "pilot": "Reconstruir dos incidents autoritzats, un ben documentat i un amb buits. Comparar la cronologia generada amb la revisió dels participants. Convertir una acció en prova de regressió i verificar-ne el resultat després del canvi. Lliurar expedients, criteri de tractament dels buits i una prova incorporada al manteniment.",
      "tender": "Atos proposa revisions d’incident amb cronologia traçable, causes contribuents i accions amb responsable. La informació generada automàticament mostra les fonts i passa per validació. Cada millora té criteri de tancament i, quan és viable, una prova reproduïble. La proposta facilita la cerca de precedents respectant permisos i retenció de cada evidència. El seguiment reconeix el lideratge CdC previst per als problemes, amb participació dels resolutors i de Qualitat quan pertoqui, sense confondre coordinació i execució tècnica.",
      "acceptance": [
        "Una afirmació de la cronologia es pot contrastar amb la font.",
        "Un buit o un rellotge inconsistent queda indicat.",
        "Una acció tancada disposa de prova o validació identificada."
      ],
      "metrics": [
        "Temps de reconstrucció fins a una cronologia validada.",
        "Accions amb evidència de tancament i recurrència de la fallada."
      ],
      "dependencies": [
        "B8",
        "A6",
        "D2"
      ],
      "caution": "La correlació temporal no prova la causa. L’assistent pot ometre fets o relacionar-ne d’irrellevants. Cal conservar versions i validar les conclusions amb els equips que coneixen el servei.",
      "evidence": [
        {
          "sourceId": "INT05",
          "relatedSourceIds": [
            "INT09"
          ],
          "claim": "Login.gov assigna el registre cronològic de l’incident. GOV.UK ha explicat com va corregir fonts identificades de soroll als registres d’error.",
          "transfer": "Atos proposa reconstruir què es va observar, què es va decidir i amb quina evidència, distingint fets d’hipòtesis. Cada millora acordada acabaria en una prova repetible o en un canvi verificat. El relat britànic és un antecedent datat; no atribuiríem la mateixa millora al CTTI ni confondríem menys registres amb menys incidents."
        },
        {
          "sourceId": "R16",
          "claim": "Google descriu revisions sense culpabilització, elaborades de manera col·laborativa i orientades a corregir causes sistèmiques.",
          "transfer": "En podem traslladar el criteri de revisió. L’expedient integrat és la concreció tecnològica proposada per al CTTI."
        },
        {
          "sourceId": "R15",
          "claim": "Google utilitza un registre viu de l’incident i conserva la informació per a l’anàlisi posterior.",
          "transfer": "El registre es pot alimentar des de les eines CTTI, amb integracions i cobertura que s’hauran de comprovar."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "B6",
      "title": "Cooperació entre contractes",
      "subtitle": "Un contracte d’intercanvi connecta evidències i responsabilitats quan un incident travessa diversos proveïdors.",
      "problem": "Una incidència pot començar en una aplicació i dependre de xarxa, identitat o infraestructura gestionades per altres equips. Si cadascú conserva només el seu fragment, el Centre de Control acaba fent de pont manual. Cal poder compartir l’evidència necessària i seguir el treball sense esperar que tots utilitzin la mateixa eina.",
      "proposal": "En el model 132, el CdC condueix els incidents d’alt impacte que necessiten coordinació de proveïdors. Cada operador actua sobre la seva solució; el servei d’eines i el suport d’integrador o fabricant assumeixen els components que els corresponen. Proposem un model comú d’incident amb servei afectat, impacte, propietari actual, estat, temps i enllaços a evidències. Adaptadors publiquen i reben actualitzacions amb control de duplicats i confirmació de recepció. El context de traça es propaga entre components compatibles i ajuda a relacionar els fragments tècnics. Els permisos limiten què veu cada proveïdor. Les regles de col·laboració indiquen qui investiga cada dependència i què ha d’aportar abans d’un traspàs. El comandament de l’incident conserva una visió conjunta mentre els equips treballen en paral·lel. El cas mostra temps de treball i espera per tram, mantenint les definicions d’ANS. El temps complet de recuperació no s’atribueix íntegrament al CdC.",
      "flow": [
        "Relacionar l’incident amb serveis i contractes afectats.",
        "Compartir estat i evidències segons permisos.",
        "Confirmar recepció i assignar investigacions paral·leles.",
        "Consolidar la restauració i el tancament conjunt."
      ],
      "technology": [
        {
          "name": "API d’incident i adaptadors",
          "role": "Tradueixen estats entre eines, registren confirmacions i eviten que un reintent produeixi incidències duplicades."
        },
        {
          "name": "W3C Trace Context",
          "role": "Facilita la continuïtat dels identificadors de traça entre components compatibles, amb filtratge dels atributs que es comparteixen."
        },
        {
          "name": "Control d’accés per servei i contracte",
          "role": "Limita camps i evidències visibles i registra qui ha consultat o modificat cada part de l’expedient."
        }
      ],
      "pilot": "Simular una degradació que impliqui dos proveïdors i una dependència compartida. Fer que les eines intercanviïn estat, perdin una connexió i la recuperin. Revisar si cada equip rep prou informació per actuar. Lliurar el model d’intercanvi, els mapatges d’estat i el resultat de la prova de cooperació.",
      "tender": "Atos proposa un circuit compartit d’incident, amb interfícies i evidències aportades pels proveïdors. El model recull identitat, estat, responsabilitat, confirmació i temps d’actualització, i conserva context i històric als traspassos. La proposta inclou proves de duplicats, pèrdua de connexió i permisos. La matriu de cooperació i els terminis entre equips es concreten explícitament amb el CTTI. La resolució del servei observat, la de l’eina i la del mantenidor conserven responsable i prova pròpia, així com els temps que els corresponen.",
      "acceptance": [
        "Un reintent no duplica l’incident ni retrocedeix l’estat.",
        "Els dos equips treballen amb un mateix identificador i context coherent.",
        "Un proveïdor no accedeix a evidències fora del seu àmbit."
      ],
      "metrics": [
        "Temps entre petició de col·laboració i acceptació efectiva.",
        "Traspassos retornats per manca d’informació / traspassos totals."
      ],
      "dependencies": [
        "A1",
        "A6",
        "B8"
      ],
      "caution": "Les eines poden tenir estats i APIs incompatibles. Cal pactar el model mínim i resoldre conflictes de sincronització. El context compartit s’ha de limitar a allò necessari per investigar l’incident.",
      "evidence": [
        {
          "sourceId": "R28",
          "relatedSourceIds": [
            "INT18",
            "INT09"
          ],
          "claim": "X-tee comparteix metadades d’intercanvi; perfSONAR ajuda a diagnosticar entre xarxes. Login.gov diferencia coordinació i execució tècnica.",
          "transfer": "Atos proposa que els equips treballin sobre un mateix identificador d’incident i un paquet d’evidències amb permisos acotats. El traspàs indicaria què s’ha comprovat, què falta i qui accepta el pas següent. En una degradació de xarxa, cada operador aportaria el seu tram. Compartir diagnosi no traslladaria al Centre de Control l’autoritat d’intervenir sobre qualsevol component."
        },
        {
          "sourceId": "R30",
          "claim": "W3C defineix un format comú per propagar el context de traça entre sistemes compatibles.",
          "transfer": "Ajuda a unir fragments tècnics; no resol la responsabilitat contractual ni acredita causalitat."
        },
        {
          "sourceId": "R15",
          "claim": "La gestió d’incidents de Google separa comandament, operació, comunicació i planificació.",
          "transfer": "El CTTI pot adoptar rols clars en un entorn de diversos contractes, sense copiar-ne l’organització interna."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada"
    },
    {
      "id": "B7",
      "title": "Cap alerta sense responsable",
      "subtitle": "Un directori de serveis i guàrdies resol el destinatari i comprova que algú ha acceptat l’avís.",
      "problem": "PagerDuty ja figura al model del Centre de Control. La millora consisteix a comprovar que les rutes i els rols de la matriu d’escalats continuen funcionant. Una alerta enviada no és necessàriament una alerta atesa. Les llistes de correu caducades, els canvis de guàrdia i els serveis sense propietari creen buits difícils de veure fins que arriba una urgència. La proposta de l’Atles es pot convertir en una regla comprovable d’alta i en un circuit d’escalat mesurat.",
      "proposal": "Cada regla es vincula a un servei i a un equip responsable. El directori resol qui està de guàrdia, quin canal correspon i quin substitut actua si no hi ha acceptació. El sistema diferencia lliurament, acceptació i inici de diagnòstic. Una ruta invàlida es detecta amb avisos de prova. Les alertes òrfenes de serveis existents entren en una cua amb custòdia temporal i escalat acordats amb el CdC i la gestió del servei, i generen deute. La custòdia de l’avís no transfereix al CdC la responsabilitat tècnica final; les noves regles no s’activen sense ruta o excepció aprovada. Agrupar notificacions redueix repeticions sense eliminar el detall de l’incident. Els grups d’avisos SAU contrastats a G2 poden entrar al mateix circuit, conservant els tiquets d’origen, el servei i l’acceptació del traspàs. Agrupar avisos no n’assigna automàticament la gravetat.",
      "flow": [
        "Relacionar regla, servei i equip responsable.",
        "Resoldre guàrdia i canal vigents.",
        "Confirmar lliurament i acceptació.",
        "Escalar o corregir la ruta quan no funciona."
      ],
      "technology": [
        {
          "name": "Catàleg de serveis i directori de guàrdies",
          "role": "Mantenen propietaris, suplents i finestres horàries; els canvis de torn queden disponibles per al motor d’encaminament."
        },
        {
          "name": "Alertmanager o motor equivalent",
          "role": "Agrupa, encamina i inhibeix notificacions segons regles; l’acceptació humana s’integra amb el sistema de guàrdia o incidents."
        },
        {
          "name": "Proves de ruta i confirmacions",
          "role": "Verifiquen periòdicament els destinataris i registren els temps de cada etapa fins a l’acceptació."
        }
      ],
      "pilot": "Provar alertes de dos serveis en horari ordinari i fora d’horari. Simular baixa d’un destinatari, absència de resposta i canvi de torn. Comprovar el suplent i la cua d’alertes òrfenes. Lliurar el mapa de responsabilitats, les proves i l’històric complet dels avisos del pilot. Comprovar també un grup d’avisos SAU validat: el traspàs conserva les fonts i diferencia una incidència nova de més avisos d’una incidència ja oberta.",
      "tender": "Atos proposa associar cada alerta de l’abast a un servei, responsable, ruta, suplència i criteri d’escalat. Lliurament i acceptació es registren com a fets diferents. La proposta inclou proves periòdiques de les rutes i registre dels buits com a deute. Les altes i els canvis de regles incorporen validació de responsabilitat i tractament explícit de les excepcions. Les alertes sense titular tenen un circuit temporal de custòdia i assignació acordat, separat de la responsabilitat de resoldre la solució.",
      "acceptance": [
        "Un destinatari inactiu activa la suplència prevista.",
        "El canvi de guàrdia aplica la ruta correcta sense modificar cada alerta.",
        "Una alerta òrfena es fa visible i té un equip que en resol l’assignació.",
        "Un grup SAU validat arriba a l’equip adequat amb les fonts i l’acceptació del traspàs, sense duplicar una incidència existent."
      ],
      "metrics": [
        "Alertes amb ruta verificada / alertes actives.",
        "Temps fins a acceptació i percentatge d’escalats."
      ],
      "dependencies": [
        "A1",
        "B2"
      ],
      "caution": "Un clic d’acceptació no prova que s’hagi iniciat un diagnòstic. Cal observar les etapes sense convertir els temps en incentius per acceptar avisos que l’equip no pot atendre.",
      "evidence": [
        {
          "sourceId": "INT05",
          "relatedSourceIds": [
            "INT08"
          ],
          "claim": "GOV.UK prova periòdicament PagerDuty i manté un Watchdog separat. VA.gov demana avisos accionables, incloent fallades silencioses i trànsit inesperadament baix.",
          "transfer": "Atos proposa comprovar que l’alerta arriba a la guàrdia vigent, que algú l’accepta i que queda clar qui inicia la diagnosi. Una notificació lliurada no equival a una actuació començada. El pilot també inclouria una ruta sense responsable i un canvi de torn, perquè les incidències del mateix encaminament quedin visibles."
        },
        {
          "sourceId": "R14",
          "claim": "Uber va concentrar diferents fonts d’alerta en una plataforma amb gestió i canals de notificació compartits.",
          "transfer": "Aporta una arquitectura de referència. Atos proposa contrastar i provar les rutes, les guàrdies i l’acceptació amb PagerDuty i els circuits CTTI aplicables."
        },
        {
          "sourceId": "CG10",
          "claim": "Alertmanager documenta agrupació, encaminament, inhibició i silencis de notificacions.",
          "transfer": "És una peça possible del circuit, que necessita connexió amb responsables i confirmacions d’atenció."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "B8",
      "title": "Un comandament clar per a l’incident",
      "subtitle": "Una màquina d’estats ordena el treball, registra els traspassos i manté una cronologia compartida.",
      "problem": "SOSTIC, PCN&ME, les sales de treball i la comunicació d’incidents ja formen part de la base documentada. El model 132 atribueix al CdC el lideratge de les incidències d’alt impacte. Atos proposa donar continuïtat a aquesta coordinació entre eines, equips i torns, perquè cada acció assumida i cada comprovació pendent siguin visibles.",
      "proposal": "Proposem un expedient amb estats explícits i rols de comandament, diagnòstic i comunicació. En activar un incident rellevant, el sistema crea la sala de treball i associa el servei, les alertes i els canvis propers. Cada traspàs inclou context, accions fetes, hipòtesis i següent pas; l’equip receptor confirma que l’assumeix. Els temps d’espera es calculen a partir d’esdeveniments i separen diagnòstic, dependència externa i traspàs. La restauració s’acredita amb una comprovació del servei. El tancament administratiu i la revisió posterior queden com a etapes diferenciades. El CdC coordina; cada operador executa sobre el seu àmbit. El responsable funcional aporta el criteri de recuperació del procés quan pertoqui, i la comunicació segueix la validació prevista per a cada destinatari.",
      "flow": [
        "Activar l’expedient i assignar comandament.",
        "Relacionar proves, hipòtesis i tasques paral·leles.",
        "Confirmar cada traspàs amb context mínim.",
        "Verificar restauració i iniciar la revisió posterior."
      ],
      "technology": [
        {
          "name": "Motor de flux de treball",
          "role": "Aplica transicions, rols i confirmacions; conserva l’històric encara que es reassigni el treball o canviï el comandament."
        },
        {
          "name": "Cronologia integrada",
          "role": "Reuneix alertes, canvis i decisions amb enllaços i temps d’origen, sense confondre proximitat temporal amb causa."
        },
        {
          "name": "Analítica del procés d’incident",
          "role": "Calcula esperes i retorns entre equips a partir d’esdeveniments, mostrant cobertura i ambigüitats de les dades."
        }
      ],
      "pilot": "Fer un exercici amb dos equips, un canvi de comandament i una dependència que no respon. Mesurar si el receptor entén el següent pas i si el Centre de Control conserva la visió conjunta. Lliurar el flux, el model de traspàs i un informe de temps d’espera amb les causes revisades pels participants.",
      "tender": "Atos proposa gestionar els incidents rellevants amb comandament identificat, cronologia compartida i traspassos confirmats. La solució conserva context, tasques i evidències entre equips i eines. Els indicadors separen espera, diagnòstic i restauració segons definicions acordades. La restauració es comprova sobre el servei i la revisió posterior manté el vincle amb l’expedient original. La solució s’encaixaria amb SOSTIC, PCN&ME i els canals corporatius, diferenciant coordinació, intervenció tècnica i validació funcional.",
      "acceptance": [
        "Un traspàs no queda complet fins que el receptor l’accepta.",
        "Un canvi de comandament conserva tasques, proves i decisions.",
        "La restauració mostra una prova del servei i el moment de verificació."
      ],
      "metrics": [
        "Temps d’espera entre equips, separat del temps de diagnòstic.",
        "Traspassos amb context complet i incidències reobertes després de restaurar."
      ],
      "dependencies": [
        "B7",
        "A6"
      ],
      "caution": "Els temps només són comparables si els estats tenen el mateix significat. Les tasques paral·leles no s’han de sumar com si fossin temps transcorregut. Cal un camí alternatiu si falla la plataforma de coordinació.",
      "evidence": [
        {
          "sourceId": "INT09",
          "relatedSourceIds": [
            "INT07"
          ],
          "claim": "Login.gov separa direcció de situació, execució, comunicació i cronologia. El centre d’operacions de RIA manté la responsabilitat de cada institució sobre els seus serveis.",
          "transfer": "Atos proposa concretar aquest repartiment dins dels circuits CTTI: qui coordina, qui actua, qui valida la recuperació i qui comunica l’estat. Els relleus deixarien confirmació explícita i assumptes pendents. Els exemples aporten criteri organitzatiu; les competències de RIA i els temps del manual nord-americà no es traslladen automàticament."
        },
        {
          "sourceId": "R15",
          "claim": "Google documenta comandament explícit, registre viu i confirmació del traspàs entre responsables.",
          "transfer": "La proposta ho porta a estats i esdeveniments comprovables, adaptats als rols i eines que acordi el CTTI."
        },
        {
          "sourceId": "R33",
          "claim": "Cloud.gov exposa esdeveniments d’acció amb actor i temps mitjançant eines i API autoritzades.",
          "transfer": "Mostra com alimentar una cronologia amb dades d’origen; la cobertura del conjunt d’eines CTTI s’ha de validar."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "C1",
      "title": "Graduació d’autonomia de N0 a N3",
      "subtitle": "Una passarel·la de permisos i proves de regressió converteix els nivells d’autonomia en controls executables.",
      "problem": "El marc de l’Atles permet parlar d’autonomia per capacitat i criticitat, però una taula aprovada no impedeix que un agent cridi una eina inadequada. Al CTTI caldria vincular cada nivell a permisos efectius, versions conegudes i evidències d’operació. També cal distingir una caiguda gradual de qualitat d’una acció fora d’abast que exigeix aturada immediata.",
      "proposal": "Proposem aplicar el nivell a la passarel·la que executa eines. N0 observa en paral·lel; N1 formula propostes; N2 executa amb supervisió definida, confirmació prèvia o reversió immediata quan aquesta sigui realment possible; N3 executa dins d’un perímetre autoritzat. La decisió consulta identitat, servei, funció, versió i risc de l’acció. Abans d’ascendir, una bateria reproduïble compara casos històrics i fallades injectades amb criteris aprovats. Cada canvi de model, instruccions o permisos activa una nova validació. Una infracció greu revoca l’execució al moment; la degradació estadística provoca descens segons finestres i mostra suficient. El responsable conserva la decisió d’ampliar l’abast. Aquests nivells són una proposta de l’Atles. L’agent només actua amb els permisos de la funció autoritzada: l’automatització del CdC no amplia les seves competències sobre les solucions supervisades.",
      "flow": [
        "Registrar funció, versió, servei, nivell i eines permeses.",
        "Reproduir casos etiquetats i fallades en un entorn aïllat.",
        "Comprovar política i aprovació abans de cada acció.",
        "Registrar resultat i revocar permisos quan es compleixi una regla d’aturada."
      ],
      "technology": [
        {
          "name": "Motor de polítiques, com Open Policy Agent",
          "role": "Avalua regles versionades sobre identitat, criticitat i acció abans que la passarel·la accepti una petició d’execució."
        },
        {
          "name": "Banc de proves amb injecció de fallades",
          "role": "Reprodueix situacions conegudes i errors nous en un entorn separat per mesurar qualitat, límits i recuperació."
        },
        {
          "name": "Registre de versions i traça d’accions",
          "role": "Relaciona cada decisió amb model, instruccions, eines, aprovador i efecte observat, facilitant regressions i retorn a la versió anterior."
        }
      ],
      "pilot": "Triar una funció de classificació d’incidències i una actuació reversible en preproducció. Preparar exemples correctes, ambigus i fora d’abast a partir de l’històric autoritzat. Executar primer N0, revisar discrepàncies i habilitar N1. Per provar N2, simular permisos caducats, duplicació de peticions i fallada de l’eina. El lliurable serà la matriu d’autoritat, les regles executables i un informe de resultats que permeti decidir si s’amplia el pilot.",
      "tender": "Atos proposa controlar l’autonomia per funció, servei i versió abans d’executar accions. La proposta inclou polítiques exportables, catàleg de permisos, evidències de validació i procediments d’aturada i recuperació. L’ascens, el descens i la revocació es basen en criteris acordats, una línia base i una mostra suficient. El CTTI mantindria l’aprovació dels canvis d’abast i l’accés a l’històric complet de decisions i aprovacions.",
      "acceptance": [
        "Una acció fora de perímetre queda bloquejada encara que l’agent la demani.",
        "La repetició d’una petició no duplica l’efecte sobre el sistema.",
        "Una infracció greu revoca l’execució i deixa evidència consultable."
      ],
      "metrics": [
        "Accions conformes amb la política / total d’accions intentades.",
        "Temps entre la detecció d’una infracció i la revocació efectiva."
      ],
      "dependencies": [
        "C4"
      ],
      "caution": "Una reversió pot fallar o no compensar tots els efectes externs. El nivell admissible ha de dependre de l’acció concreta; una bona taxa mitjana d’encert no autoritza operacions amb conseqüències incompatibles amb el risc acceptat.",
      "evidence": [
        {
          "sourceId": "INT16",
          "relatedSourceIds": [
            "INT17"
          ],
          "claim": "Austràlia publica criteris de control d’agents. GovTech ha documentat un prototip amb eines acotades i accions traçables en preproducció.",
          "transfer": "Atos proposa començar amb assistència en lectura i autoritzar cada ampliació sobre proves de qualitat, permisos i resultat. Una acció amb efecte identificaria responsable, aprovació i manera d’aturar-la. Aquests precedents ajuden a dissenyar el control; no acrediten que una administració repari habitualment incidents TIC de forma autònoma ni justifiquen passar directament a N3."
        },
        {
          "sourceId": "CG02",
          "claim": "AIOpsLab aporta un entorn de recerca que combina aplicacions, càrrega, fallades i observació per provar agents al llarg del cicle d’incident. Permet estudiar comportaments que un qüestionari de text no reprodueix, incloent la interacció amb sistemes i eines.",
          "transfer": "En podem adoptar el mètode d’avaluació reproduïble. El banc experimental no acredita fiabilitat en els serveis CTTI ni determina els seus nivells d’autoritat."
        },
        {
          "sourceId": "CG01",
          "claim": "Gartner situa el registre d’agents, la propietat, les versions i els límits d’execució entre les competències bàsiques. També descriu l’avaluació contínua en producció i el control dels canvis que alteren el comportament sense modificar la infraestructura subjacent.",
          "transfer": "La proposta concreta aquests criteris en regles executables. Els nivells N0–N3 i les proves d’acceptació són disseny propi, no una escala prescrita per Gartner."
        }
      ],
      "effort": "mitjà",
      "readiness": "En evolució"
    },
    {
      "id": "C2",
      "title": "Catàleg d’agents definits per funció, no per marca",
      "subtitle": "Contractes d’entrada i sortida permeten substituir cada funció del flux d’incidència sense reconstruir les integracions.",
      "problem": "La memòria ja descriu capacitats agentives a la PTD. Atos proposa encaixar-hi les funcions del catàleg i els fluxos existents d’automatització. Les sis funcions de l’Atles poden acabar unides a un únic producte si comparteixen formats opacs, memòria inaccessible o permisos indiscriminats. En un entorn multiproveïdor com el descrit pel CTTI, aquesta dependència dificultaria provar una alternativa, transferir el servei o determinar quin component ha classificat malament una incidència i amb quina informació ho ha fet.",
      "proposal": "Cada funció disposaria d’un contracte versionat: classificació, correlació i context, creació del tiquet, notificació, seguiment i consolidació del coneixement. El contracte especifica camps obligatoris, fonts admeses, errors, termini de resposta i responsabilitat. Un orquestrador conserva l’estat del cas i activa només les eines necessàries. Crear un tiquet o enviar una notificació pot resoldre’s amb un flux determinista; el model s’utilitza on interpretar text aporta valor. Les funcions comuniquen resultats estructurats amb identificador d’incident i evidències. Un conjunt de proves de conformitat permet substituir un component i comprovar que respecta les mateixes interfícies. La publicació de coneixement continua requerint validació.",
      "flow": [
        "Rebre senyal amb identificador de servei i origen.",
        "Classificar i enriquir amb fonts autoritzades, conservant evidències.",
        "Crear o actualitzar el tiquet mitjançant una operació idempotent.",
        "Notificar, seguir l’estat i preparar coneixement per a revisió."
      ],
      "technology": [
        {
          "name": "OpenAPI i JSON Schema",
          "role": "Descriuen camps, tipus, errors i versions dels contractes perquè integradors diferents puguin comprovar compatibilitat de manera automatitzada."
        },
        {
          "name": "Model Context Protocol (MCP)",
          "role": "Ofereix una interfície d’eines descobribles i resultats estructurats; la passarel·la continua imposant autenticació, permisos i validació."
        },
        {
          "name": "Orquestrador amb estat persistent",
          "role": "Manté el progrés de cada incident, gestiona reintents i recupera el flux sense duplicar tiquets ni notificacions."
        }
      ],
      "pilot": "Construir un flux de classificació i creació de tiquets sobre incidències autoritzades, amb un entorn de proves de l’eina corporativa. Publicar els esquemes i implementar dues alternatives per a la classificació. Intercanviar-les sense modificar la resta del flux i comparar errors, evidències i temps de resposta. Simular interrupcions entre passos i reintents. El lliurable serà un catàleg funcional amb proves de substitució, contractes i manual d’operació transferible.",
      "tender": "Atos proposa capacitats amb interfícies documentades, esquemes exportables i proves de conformitat per funció. El disseny identifica les parts deterministes, les que depenen d’un model i els permisos de cadascuna. L’orquestració respecta els circuits corporatius i permet substituir components sense perdre l’estat dels casos. La proposta concreta els drets d’ús i lliurament de regles, configuracions, proves i coneixement produït.",
      "acceptance": [
        "Dues implementacions compleixen el mateix contracte de classificació.",
        "Un reinici entre passos conserva el cas i no duplica el tiquet.",
        "Una funció de consulta no pot executar una eina de modificació.",
        "Dos agents compatibles intercanvien una tasca amb identitat i traça del cas; un agent sense permís queda bloquejat i registrat."
      ],
      "metrics": [
        "Funcions amb contracte i prova de substitució superada / total.",
        "Errors d’integració i duplicats per cada mil casos processats."
      ],
      "dependencies": [
        "C1",
        "C3",
        "C4"
      ],
      "caution": "MCP i els esquemes comuns no garanteixen que dos components entenguin igual una prioritat o una causa. Cal compartir vocabulari, exemples i proves; també revisar les llicències dels components que es vulguin transferir.",
      "evidence": [
        {
          "sourceId": "INT17",
          "relatedSourceIds": [
            "INT16"
          ],
          "claim": "El prototip de GovTech utilitza agents especialitzats, MCP i traces. La guia australiana demana seguir les interaccions i els permisos dels agents.",
          "transfer": "Atos proposa definir cada assistent per la feina que pot fer, les eines que necessita i el responsable que n’accepta el resultat. IA Mesh descriuria aquí aquesta cooperació governada. El pilot provaria si diversos agents aporten més que un flux senzill i si se’n pot substituir un sense perdre control. La font no acredita una arquitectura pública universal."
        },
        {
          "sourceId": "CG03",
          "claim": "Anthropic descriu patrons separables d’encaminament, seqüenciació i orquestració, i explica que les interfícies d’eines requereixen disseny i proves específiques. Recomana incorporar complexitat quan millora un resultat mesurable, tenint en compte el cost i la latència.",
          "transfer": "Es trasllada la composició per funcions i la comprovació dels passos. La font no acredita el nostre flux de sis funcions en cap organisme públic."
        },
        {
          "sourceId": "CG04",
          "claim": "L’especificació tècnica MCP defineix descoberta i crida d’eines, esquemes JSON per a entrades i sortides i errors diferenciats. També estableix validació d’entrades i controls d’accés, i recomana que el client comprovi resultats i registri l’ús.",
          "transfer": "Aporta una interfície possible per al catàleg. El significat operatiu, els permisos i la substitució efectiva s’han de demostrar en el pilot CTTI."
        }
      ],
      "effort": "mitjà",
      "readiness": "En evolució",
      "addendum": {
        "title": "IA Mesh: cooperació amb límits",
        "paragraphs": [
          "La malla s’encaixaria amb el govern de dades i IA i amb les capacitats PTD que corresponguin. Quan col·laborin agents de plataformes diferents, Atos proposa una malla governada d’agents, eines i models (IA Mesh) sobre aquest catàleg. Cada agent declara què sap fer i amb quins permisos. MCP dona accés a eines; A2A pot formalitzar l’intercanvi de tasques entre agents compatibles. Les crides conserven l’identificador del cas i passen pels controls de C4 i F3. Ho provaríem amb dos components i una tasca concreta abans d’ampliar la malla. El terme descriu aquí un patró d’arquitectura en evolució, no un estàndard únic."
        ],
        "evidence": [
          {
            "sourceId": "RT16",
            "claim": "Especifica interaccions entre agents i un Agent Card amb capacitats, habilitats i requisits d’autenticació.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "RT14",
            "claim": "Combina identitat de càrrega, polítiques i observabilitat per a comunicacions d’agents, amb Istio i agentgateway.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [
          {
            "name": "A2A i catàleg d’agents autoritzats",
            "role": "Descriuen capacitats i intercanvi de tasques quan cal cooperació entre agents. Es fixen versions i es proven autenticació, errors i compatibilitat abans de connectar-los."
          }
        ],
        "proofs": []
      }
    },
    {
      "id": "C3",
      "title": "Base de coneixement operatiu consultable",
      "subtitle": "La cerca híbrida recupera procediments vigents amb permisos, cites verificables i abstenció quan falten evidències suficients.",
      "problem": "Els serveis 132 i 133 ja preveuen un repositori corporatiu de coneixement i la consulta amb Confluence, chatbot o IA. Atos proposa reforçar la confiança en la resposta: un document real pot donar una instrucció inadequada si correspon a una versió retirada o a un altre servei. Cal conservar permisos, responsable, vigència i context des de l’origen fins a la resposta.",
      "proposal": "Sobre els repositoris autoritzats existents, proposem un procés d’ingesta que conserva identificador, servei, versió, responsable, data de revisió i permisos de cada fragment. La cerca combina coincidència textual i similitud semàntica, després reordena els resultats segons la pregunta i la vigència. Un connector consulta l’estat actual del document abans de presentar procediments sensibles. La resposta mostra fragments citats, data i límits d’aplicació; si les fonts discrepen o no cobreixen la pregunta, deriva al responsable. Les consultes sense resposta alimenten una cua editorial. Un joc de preguntes conegudes comprova recuperació i fidelitat després de cada canvi d’índex o model. Els operadors validen el contingut que s’incorpora al coneixement compartit.",
      "flow": [
        "Ingerir documents amb permisos, propietari, versió i vigència.",
        "Recuperar fragments per text i significat, filtrant pel servei.",
        "Comprovar suport documental i possibles contradiccions.",
        "Mostrar resposta amb cites o derivar la pregunta a revisió."
      ],
      "technology": [
        {
          "name": "Cerca híbrida, com Elastic BM25 i vectors",
          "role": "Combina termes exactes de l’operació amb proximitat semàntica per recuperar documents que expressen el mateix problema amb paraules diferents."
        },
        {
          "name": "Connectors amb control d’accés",
          "role": "Propaguen permisos i canvis de versió dels repositoris corporatius fins a la recuperació, evitant que l’índex ampliï accessos."
        },
        {
          "name": "Avaluació de recuperació i resposta",
          "role": "Separa si s’ha trobat la font adequada de si la resposta la representa fidelment, amb preguntes revisades per operadors."
        }
      ],
      "pilot": "Seleccionar un servei i els seus procediments, arquitectura i incidències resoltes, amb el responsable del coneixement. Preparar preguntes habituals i casos on falten dades, hi ha versions contradictòries o l’usuari no té permís. Mesurar la cerca actual abans d’activar l’assistent. Fer proves amb operadors i incorporar correccions al repositori original. Lliurar l’índex reconstruïble, el catàleg de fonts, les preguntes de prova i un informe de cobertura i errors.",
      "tender": "Atos proposa recuperar coneixement de fonts autoritzades, respectant-ne els permisos, la versió i la vigència. Cada resposta enllaça els fragments de suport i identifica informació absent o contradictòria. La proposta inclou actualització de l’índex, retirada de documents, avaluació repetible i circuit editorial. El CTTI tindria contingut, metadades, proves i mecanismes d’exportació per reconstruir la base amb una altra implementació.",
      "acceptance": [
        "Un document retirat deixa de sustentar instruccions operatives.",
        "Dos usuaris amb permisos diferents només recuperen les seves fonts autoritzades.",
        "Una pregunta sense suport produeix abstenció i derivació, sense inventar un procediment."
      ],
      "metrics": [
        "Respostes amb suport documental correcte / mostra avaluada.",
        "Temps per trobar un procediment vigent davant la cerca actual."
      ],
      "dependencies": [
        "C4"
      ],
      "caution": "La data recent d’un document no garanteix que sigui correcte. La vigència necessita un responsable i un circuit de revisió; el sistema tampoc pot reconstruir coneixement tàcit que encara no s’ha documentat.",
      "evidence": [
        {
          "sourceId": "CG05",
          "claim": "GDS explica dos pilots públics de GOV.UK Chat i avalua les respostes amb experts, proves automatitzades i recerca amb usuaris. Les respostes es basen en contingut GOV.UK i faciliten comprovar la informació a la font original.",
          "transfer": "Demostra una aproximació pública amb avaluació i fonts comprovables. El cas és informatiu; no acredita procediments d’operació TIC ni substitueix la validació dels nostres continguts."
        },
        {
          "sourceId": "CG06",
          "claim": "Grab relata que va millorar la documentació de dades amb revisió dels responsables abans d’oferir un assistent intern de descoberta. Quan una pregunta requereix intervenció humana, la conversa pot ajudar a actualitzar la documentació que faltava.",
          "transfer": "Es pot adoptar el bucle consulta, buit i revisió editorial. Els conjunts de dades de Grab no són runbooks CTTI i no se’n transfereixen resultats quantitatius."
        },
        {
          "sourceId": "INT16",
          "relatedSourceIds": [],
          "claim": "La guia australiana inclou el seguiment de la memòria dels agents. És orientació institucional, no una implantació demostrada de coneixement operatiu.",
          "transfer": "Atos proposa completar la referència de GOV.UK Chat ja present amb una prova de vigència: retirar un procediment, substituir-ne la versió i comprovar què recupera l’assistent. La resposta hauria de citar la font vigent o explicar que manca suport. El propietari del coneixement valida el contingut; la plataforma ha de propagar també els canvis de permisos."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "C4",
      "title": "Observar la intel·ligència artificial que observa",
      "subtitle": "Traces d’execució, avaluació de resultats i pressupostos per cas permeten controlar la IA durant l’operació.",
      "problem": "La memòria recull capacitats d’IA i pilots als quals es pot donar seguiment. El portal PTD també anuncia monitorització d’IA com a pròxima disponibilitat; no la donem per desplegada. Latència baixa i respostes acceptades no demostren que un agent hagi resolt bé una incidència. Pot haver utilitzat context obsolet, excedit permisos o repetit accions costoses. El CTTI necessitaria observar tant les dependències tècniques com la qualitat del resultat i la trajectòria executada. La passarel·la de models ajuda a centralitzar controls, però també requereix continuïtat i supervisió pròpies.",
      "proposal": "Proposem relacionar cada execució amb l’incident, l’agent, el model, la versió d’instruccions, els documents consultats i les eines invocades. Les traces registren passos observables, errors i aprovacions; no cal conservar indiscriminadament contingut sensible ni suposar accés al raonament intern del model. Una passarel·la aplica permisos, filtratge, límits de consum i selecció de models autoritzats. Un avaluador separa qualitat del context, correcció del resultat i compliment de política. El quadre mostra costos per cas resolt, reintents, desacords i versions amb regressions. La supervisió tècnica de la passarel·la inclou indisponibilitat, cues i recuperació; una fallada manté disponible el procediment humà.",
      "flow": [
        "Associar cada execució amb agent, versió, servei i incident.",
        "Capturar crides, fonts, aprovacions, consum i resultat observable.",
        "Avaluar qualitat i política amb mostres i casos de referència.",
        "Mostrar desviacions i activar límits o retorn al flux humà."
      ],
      "technology": [
        {
          "name": "OpenTelemetry per a IA generativa",
          "role": "Connecta traces, mètriques i esdeveniments dels models i eines amb la telemetria del servei, fixant les versions semàntiques utilitzades."
        },
        {
          "name": "Via de consum d’IA autoritzada",
          "role": "Aplica identitat, permisos, quotes i traçabilitat. El disseny s’adapta a les capacitats disponibles; l’AI Gateway corporatiu encara consta en planificació."
        },
        {
          "name": "Avaluador independent del flux executiu",
          "role": "Compara resultats amb evidències i criteris operatius, distingint acceptació humana, correcció demostrada i compliment dels permisos."
        }
      ],
      "pilot": "Provar un assistent amb fonts caducades, una consulta fora del seu abast, reintents i un canvi de model. Cada resultat ha de conservar evidència i cost, respectar els permisos i permetre continuar pel procediment humà quan falli una dependència.",
      "tender": "Atos proposa observar la IA relacionant execució, fonts, permisos, versions, consum i resultat. Una passarel·la sota govern del CTTI, o una solució equivalent, incorpora configuració exportable i proves de continuïtat. La proposta concreta dades registrades, accessos i retenció segons la finalitat i els requisits aplicables. Cada canvi de model passa per una avaluació de regressió abans d’assumir el mateix abast operatiu.",
      "acceptance": [
        "Una execució es reconstrueix des del tiquet fins a fonts, eines i aprovacions.",
        "Un límit de consum interromp reintents sense perdre l’estat del cas.",
        "Una regressió de qualitat es detecta encara que la latència i l’acceptació siguin bones.",
        "Provar també un bucle de crides i una tasca que arriba al límit de cost, i comprovar l’aturada i el traspàs sense repetir accions ja executades."
      ],
      "metrics": [
        "Cost total per resultat validat, incloent reintents i revisió humana.",
        "Resultats incorrectes acceptats pels usuaris / mostra revisada."
      ],
      "dependencies": [],
      "caution": "El filtratge automàtic pot deixar escapar dades i també eliminar context útil. Cal provar-lo amb dades representatives. La propietat de la configuració no elimina dependències del model ni justifica conservar totes les converses completes.",
      "evidence": [
        {
          "sourceId": "INT16",
          "relatedSourceIds": [
            "INT17"
          ],
          "claim": "GovTech instrumenta el seu prototip amb Langfuse i OpenTelemetry. L’addenda australiana tracta errors d’eines, permisos, latència i consum.",
          "transfer": "Atos proposa registrar versió de l’agent, fonts, eines, aprovacions i resultat verificable, amb cost per tasca resolta. El quadre separaria funcionament tècnic, qualitat de la resposta i respecte de les regles. La traça ha de permetre revisar les accions observables; no és una còpia del raonament intern del model. El precedent de Singapur continua sent una prova en preproducció."
        },
        {
          "sourceId": "CG08",
          "claim": "Uber descriu una passarel·la interna de models que integra autenticació, mètriques, registres d’auditoria i atribució de cost, juntament amb tractament d’informació personal. La publicació identifica equips usuaris reals i explica l’arquitectura que unifica diversos proveïdors.",
          "transfer": "Aporta un cas operatiu de govern d’accés als models. Els mecanismes concrets de filtratge, la continuïtat i els resultats s’han de verificar a l’entorn CTTI."
        },
        {
          "sourceId": "CG07",
          "claim": "OpenTelemetry manté un repositori específic de convencions per a IA generativa amb traces, mètriques i esdeveniments, incloent clients de models i MCP. La separació en un repositori propi mostra que cal gestionar explícitament l’evolució i compatibilitat.",
          "transfer": "Permet proposar telemetria interoperable. No determina per si mateixa qualitat, retenció o permisos, ni garanteix que totes les eines implementin la mateixa versió."
        },
        {
          "sourceId": "CG01",
          "claim": "Gartner amplia l’observabilitat d’agents a rendiment, context, cost, comportament, governança i resultat. També situa l’avaluació i la fiabilitat entre les capacitats necessàries per operar agents, especialment quan canvien els models, les eines disponibles i els entorns d’execució.",
          "transfer": "La proposta trasllada aquestes dimensions a un quadre verificable. La classificació legal de cada ús s’ha d’analitzar separadament; el document no la resol."
        }
      ],
      "effort": "mitjà",
      "readiness": "En evolució",
      "addendum": {
        "title": "Controlar el cas complet, també entre agents",
        "paragraphs": [
          "Atos proposa seguir el cas complet entre agents: qui delega, quina eina es crida i què costa cada pas. Cada tasca té límits de cost, passos, reintents i temps. Si l’agent entra en un bucle o esgota el marge, el flux s’atura i traspassa el cas a una persona amb el context recollit."
        ],
        "evidence": [
          {
            "sourceId": "RT13",
            "claim": "Passarel·la per connectar models i aplicar encaminament, controls, seguiment d’ús i cost.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          },
          {
            "sourceId": "ATOS_WS_2026",
            "claim": "Arquitectura modular de telemetria, FinOps, instrumentació combinada i adopció progressiva d’AIOps amb validació operativa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "C5",
      "title": "Higiene del senyal i revisió d’elements sense ús",
      "subtitle": "Conservar els senyals que ajuden i activar més detall, només on cal i durant el temps necessari.",
      "problem": "El volum de mètriques del catàleg aportat justifica revisar l’ús, però no demostra que una regla sense activacions sigui inútil. Podria protegir una fallada rara i greu. La millora del CTTI hauria de relacionar alertes, consultes, informes i incidents amb el valor que aporten, mantenint els senyals necessaris per diagnosticar, auditar i verificar la disponibilitat dels serveis.",
      "proposal": "Atos proposa un registre de senyals amb propietari, propòsit, consum, consultes dependents i decisions que han ajudat a prendre. Les alertes s’agrupen per incident; els silenciaments es limiten als manteniments autoritzats. Abans de retirar dades o regles, es reprodueixen incidents coneguts i fallades rares, amb un canvi reversible i data de revisió. Una regla poc usada pot continuar sent necessària. Quan el diagnòstic requereix més detall, s’obre una finestra per a un servei concret: més mostres i, si és compatible, punts de diagnòstic dinàmic al codi. Té autorització, caducitat, límit de volum i càrrega, i retorn a la configuració habitual. El CdC coordina la necessitat; l’operador d’eines aplica la política i el mantenidor intervé sobre el codi. L’Oficina d’Observabilitat fixa els criteris comuns.",
      "flow": [
        "Creuar inventari, consultes, dependències, costos i incidents.",
        "Proposar agrupació, recalibratge o retirada amb una justificació concreta.",
        "Reproduir incidents i simular fallades que la regla ha de detectar.",
        "Aplicar canvi reversible i verificar cobertura i càrrega d’operació."
      ],
      "technology": [
        {
          "name": "Analítica de consultes i dependències",
          "role": "Relaciona cada mètrica o font amb dashboards, alertes i ús d’investigació, identificant consum directe i reutilització indirecta."
        },
        {
          "name": "Agrupació i inhibició de notificacions",
          "role": "Redueix avisos duplicats mantenint les alertes originals consultables i limita silenciaments al perímetre i període aprovats."
        },
        {
          "name": "Proves de regles sobre dades històriques",
          "role": "Compara la configuració vigent i la candidata amb incidents coneguts, i comprova detecció abans d’aplicar canvis reversibles."
        },
        {
          "name": "Mostreig temporal i diagnòstic amb caducitat",
          "role": "Una política canvia el detall d’un servei durant una finestra autoritzada i després torna al nivell habitual. Edge Delta documenta mostreig amb expiració; el detall de codi requereix instrumentació compatible."
        }
      ],
      "pilot": "Escollir un servei amb historial d’incidents i una font de telemetria de cost conegut. Inventariar alertes, dashboards i consum indirecte; revisar amb els operadors quines notificacions van provocar accions. Seleccionar canvis de baix risc i provar-los amb dades històriques i un exercici de fallada rara. Aplicar-los gradualment amb una configuració recuperable. Lliurar el registre de decisions, l’estalvi observat i les evidències que la cobertura necessària s’ha mantingut. Afegir una fallada intermitent i obrir una finestra de diagnòstic només per al servei afectat. Mesurar detall útil, volum, cost i càrrega; comprovar caducitat, retorn a la configuració habitual i filtratge de camps sensibles.",
      "tender": "Atos proposa revisar periòdicament la utilitat de senyals, regles i visualitzacions. Cada canvi identifica propietari, dependències, ús, risc i reversió; la manca d’activacions o consultes no justifica per si sola una retirada. La proposta inclou configuracions versionades, proves de cobertura i balanç de consum i notificacions abans i després. El CTTI validaria els canvis que afectin detecció, retenció o evidències operatives.",
      "acceptance": [
        "Una fallada rara prevista continua generant l’avís necessari després del canvi.",
        "L’agrupació permet consultar totes les alertes originals de l’incident.",
        "Una font amb dependències d’auditoria no es retira per manca de consultes recents.",
        "La finestra expira i recupera la configuració habitual; queda constància de qui l’ha activada, sobre quin servei i amb quin volum addicional.",
        "El detall ampliat respecta els límits de captura i filtratge, sense alterar silenciosament el càlcul dels indicadors de servei."
      ],
      "metrics": [
        "Notificacions que provoquen una acció útil / notificacions revisades.",
        "Consum evitat amb cobertura validada, separat de reducció bruta d’ingesta."
      ],
      "dependencies": [
        "C1",
        "A6",
        "A2",
        "A5",
        "F3"
      ],
      "caution": "Els logs de consulta poden ometre accessos indirectes i usos excepcionals. Cal conèixer informes, investigacions i obligacions de conservació abans de retirar dades; reduir avisos sense mesurar incidents perduts pot empitjorar el servei. Augmentar la captura no recupera el que ja s’ha descartat. Una mostra enriquida en errors no serveix directament per calcular un SLO sense corregir-ne el biaix.",
      "evidence": [
        {
          "sourceId": "MKT01",
          "claim": "Edge Delta documenta canvis de mostreig per servei amb caducitat i retorn automàtic al nivell habitual.",
          "transfer": "Atos proposa provar una finestra de diagnòstic amb permisos, pressupost i càrrega limitats. La instrumentació dinàmica és opcional i es valida separadament.",
          "relatedSourceIds": [
            "MKT02"
          ]
        },
        {
          "sourceId": "INT05",
          "relatedSourceIds": [],
          "claim": "GOV.UK va publicar el 2021 una reducció important dels esdeveniments d’error registrats després de corregir fonts concretes de soroll.",
          "transfer": "Atos proposa revisar duplicats, avisos sense ús i senyals que ja no representen el servei, mantenint una prova sobre incidents coneguts abans de retirar-los. Cada canvi deixaria motiu, responsable i possibilitat de tornar enrere. El cas britànic explica una millora dels registres; no demostra una reducció equivalent d’incidents ni permet fixar un percentatge d’estalvi per al CTTI."
        },
        {
          "sourceId": "CG09",
          "claim": "Google explica que una freqüència elevada d’avisos pot portar a ignorar incidents reals i defensa un camí d’alerta simple i comprensible. També diferencia el símptoma observat de les possibles causes que l’equip ha d’investigar després.",
          "transfer": "Aporta criteris per jutjar utilitat i càrrega humana. No fixa quantes alertes sobren al CTTI ni avala retirar una regla perquè mai s’ha activat."
        },
        {
          "sourceId": "CG10",
          "claim": "Prometheus documenta agrupació, deduplicació i encaminament de notificacions, així com inhibicions i silenciaments temporals. L’agrupació permet un avís compacte per un problema que afecta moltes instàncies, mantenint la informació dels elements afectats disponible per consultar-la.",
          "transfer": "Són mecanismes implementables amb eines diverses. La selecció de claus, finestres i dependències requereix proves pròpies i no representa una reducció de soroll garantida."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "C6",
      "title": "Intel·ligència artificial sobre els registres",
      "subtitle": "Consultes controlades i grafs de dependències produeixen hipòtesis contrastables, amb evidències i límits de confiança explícits.",
      "problem": "La memòria descriu AI-Powered Failure Prevention com una prova de concepte validada i lliurada com a MVP en fase inicial, i pilots de Neo4j Aura al CdC. Atos proposa contrastar aquesta base amb incidents reals i ampliar-ne la utilitat per al diagnòstic. L’assistent ha de distingir una coincidència temporal d’una causa i mostrar dades absents, hipòtesis i proves següents sense actuar sobre producció.",
      "proposal": "Proposem que l’assistent construeixi consultes limitades sobre dades normalitzades i un graf de servei alimentat per inventari i traces. Primer verifica cobertura, sincronització temporal i vigència de dependències. Després calcula canvis respecte de períodes comparables i identifica desplegaments o configuracions pròxims a l’incident. Un motor estadístic ordena candidats; el model redacta l’explicació utilitzant només els resultats retornats. Cada hipòtesi inclou evidències favorables, contradiccions, alternatives i una comprovació següent. La confiança es calibra amb casos resolts i s’indica quan no és estimable. El descobriment de patrons i la predicció s’introdueixen separadament, amb observació silenciosa abans de generar avisos. La primera resposta lliura el context útil disponible dins d’un temps acordat; la investigació pot continuar després, sense retardar l’avís original. Cada nova versió es contrasta amb un banc de casos que el CTTI pugui conservar i repetir, independent de l’assistent escollit. Les investigacions comparteixen quotes i prioritats per no saturar les mateixes fonts.",
      "flow": [
        "Comprovar cobertura de dades, rellotges i dependències del servei.",
        "Consultar logs, canvis i mètriques dins una finestra limitada.",
        "Ordenar hipòtesis i buscar proves que les confirmin o contradiguin.",
        "Lliurar expedient d’investigació amb consultes reproduïbles i següent comprovació."
      ],
      "technology": [
        {
          "name": "Cerca normalitzada i consultes restringides",
          "role": "Executa consultes de lectura amb límits de temps, volum i camps, mantenint l’enllaç al registre original de cada evidència."
        },
        {
          "name": "Graf de dependències amb vigència",
          "role": "Representa relacions entre serveis, desplegaments i dades; diferencia connexions observades, declarades i inferides amb data de comprovació."
        },
        {
          "name": "Models estadístics de diagnòstic",
          "role": "Classifiquen anomalies i candidats causals sobre mètriques; incorporen restriccions expertes i resultats de validació abans d’alimentar l’explicació."
        },
        {
          "name": "Banc d’incidents i proves de regressió",
          "role": "Conserva dades autoritzades, versions, preguntes i criteris de valoració per repetir la comparació entre assistents. Es mesuren errors, abstencions, temps fins a context útil i cost."
        }
      ],
      "pilot": "Escollir incidents resolts d’un servei amb dependències conegudes i dades suficients. Separar els casos usats per ajustar el sistema dels que serviran per avaluar-lo. Ocultar la conclusió final i demanar l’expedient a l’assistent. Els operadors contrastaran hipòtesis, contradiccions i fonts amb la investigació original. Afegir un incident de prova amb dades incompletes. El lliurable inclourà consultes, errors de diagnòstic, cobertura i decisions sobre quines funcions poden passar a assistència real. El punt de partida inclourà les funcions i les evidències disponibles del MVP existent, per comparar millora incremental i evitar duplicacions. Lliurar el banc de casos i les instruccions de repetició al CTTI. Incloure un canvi innocent, una hipòtesi plausible però errònia i diverses investigacions simultànies. Comparar temps fins a context útil, errors, abstencions adequades, cost i càrrega sobre les fonts.",
      "tender": "Atos proposa investigacions de lectura reproduïbles sobre telemetria, canvis i dependències autoritzades. Les hipòtesis mostren evidències, alternatives, dades absents i confiança justificada per avaluació, distingint correlació, inferència causal i confirmació humana. La proposta inclou consultes, models de dades, configuracions i proves exportables. La predicció es valida específicament en mode silenciós; disposar de diagnòstic assistit no n’activa l’ús.",
      "acceptance": [
        "Cada afirmació de l’expedient remet a una consulta o evidència verificable.",
        "Un canvi coincident però irrellevant no es presenta com una causa demostrada.",
        "La manca de traces o dependències apareix com a límit, sense completar-les amb invencions.",
        "Un segon equip repeteix l’avaluació amb els casos conservats i identifica millores o regressions entre versions, sense veure abans la resolució de cada incident.",
        "Les investigacions simultànies respecten les quotes de consulta i el primer context no retarda el circuit d’avís i resposta."
      ],
      "metrics": [
        "Incidents amb causa validada entre les primeres hipòtesis / incidents avaluables.",
        "Temps fins a una hipòtesi útil validada, comparat amb la investigació manual."
      ],
      "dependencies": [
        "A6",
        "C1",
        "C3",
        "C4"
      ],
      "caution": "Una topologia desactualitzada pot dirigir tota la investigació al component equivocat. Els grafs causals depenen d’hipòtesis i dades observables; l’explicació lingüística no converteix una correlació en demostració ni substitueix la comprovació operativa.",
      "evidence": [
        {
          "sourceId": "MKT07",
          "claim": "Datadog explica com reprodueix context d’incidents per detectar regressions del seu assistent de diagnòstic.",
          "transfer": "Atos proposa un banc de casos transferible al CTTI, amb els mateixos incidents i criteris per comparar versions i alternatives; es contrasta primer amb les capacitats existents."
        },
        {
          "sourceId": "CG11",
          "claim": "Meta descriu HawkEye com un flux guiat que relaciona degradació de producte, models, versions, característiques i llinatge de dades. La investigació recorre dependències i estadístiques per reduir el conjunt de candidats, amb informació de confiança per al personal de guàrdia.",
          "transfer": "Es trasllada el recorregut des del símptoma a evidències i dependències. El cas tracta sistemes d’aprenentatge automàtic i no prova un diagnòstic universal sobre logs."
        },
        {
          "sourceId": "CG12",
          "claim": "PyRCA ofereix mètodes de diagnòstic sobre mètriques, incloent grafs i restriccions de coneixement expert. El repositori distingeix els exemples adaptats d’usos interns de les comparacions sobre dades simulades, i indica que se centra principalment en mètriques.",
          "transfer": "Pot servir per explorar candidats estadístics amb dades CTTI. No s’ha de presentar com un lector de logs ni copiar la precisió dels seus experiments simulats."
        },
        {
          "sourceId": "INT14",
          "relatedSourceIds": [],
          "claim": "GovTech publica usos de StackOps per seguir fluxos i dependències. Els testimonis no acrediten diagnosi causal autònoma amb intel·ligència artificial.",
          "transfer": "Atos proposa mantenir aquesta idea com a pilot: ordenar evidències, relacionar canvis i suggerir comprovacions que un operador pugui repetir. La resposta distingiria observació, hipòtesi i causa confirmada. L’avaluació comptaria errors, contradiccions i temps net recuperat. El cas públic aporta context de servei; les referències tècniques ja presents continuen explicant el mecanisme d’anàlisi."
        }
      ],
      "effort": "alt",
      "readiness": "En evolució",
      "addendum": {
        "title": "El diagnòstic torna a l’expedient",
        "paragraphs": [
          "La integració amb l’eina d’incidents adjunta les hipòtesis i les evidències al mateix expedient. L’operador pot acceptar-les, corregir-les o descartar-les, i el resultat de la intervenció torna al sistema. Aquesta resposta ajuda a avaluar l’assistent, mantenint separades l’acceptació humana i la causa finalment demostrada."
        ],
        "evidence": [
          {
            "sourceId": "ATOS_WS_2026",
            "claim": "Arquitectura modular de telemetria, FinOps, instrumentació combinada i adopció progressiva d’AIOps amb validació operativa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "C7",
      "title": "Quadres de comandament generats i explicats",
      "subtitle": "Un model semàntic i visualitzacions declaratives permeten generar vistes que conserven definicions, filtres i evidències.",
      "problem": "La mateixa pregunta sobre disponibilitat pot produir xifres diferents segons el denominador, la finestra i el conjunt de serveis. La generació automàtica de gràfics ampliaria aquest problema si el model inventés camps o agregacions. Les vistes de Proveïdors, Àmbits, CdC i Direcció han de compartir definicions verificades, amb el detall i els permisos corresponents. Atos proposa facilitar aquesta lectura sense alterar el significat dels indicadors.",
      "proposal": "Proposem una capa semàntica que publica mètriques aprovades amb unitat, fórmula, dimensions, permisos i període. La pregunta es converteix en un pla de consulta que l’usuari pot revisar. Un validador rebutja camps inexistents, unions inadequades i agregacions que alteren el significat, com fer la mitjana de percentils. La consulta s’executa amb límits i el resultat alimenta una especificació declarativa del gràfic. L’explicació es redacta a partir de valors calculats i comparacions autoritzades, mostrant dades incompletes i origen. Les vistes freqüents es revisen i es converteixen en plantilles; les preguntes noves queden com a exploració fins que el responsable les valida.",
      "flow": [
        "Interpretar pregunta, destinatari i permisos sobre el catàleg semàntic.",
        "Validar mètrica, dimensions, denominador i finestra abans de consultar.",
        "Generar el gràfic des del resultat amb una especificació comprovable.",
        "Explicar variacions i límits, mostrant consulta i font de cada xifra."
      ],
      "technology": [
        {
          "name": "Capa semàntica de mètriques",
          "role": "Centralitza definicions, dimensions i regles d’agregació perquè totes les perspectives comparteixin el mateix significat dels indicadors utilitzats."
        },
        {
          "name": "Consultes SQL o API de mètriques validades",
          "role": "Restringeixen camps, funcions, volum i permisos abans d’executar el pla proposat pel model sobre les dades autoritzades."
        },
        {
          "name": "Vega-Lite o format declaratiu equivalent",
          "role": "Descriu gràfics en un document versionable i validable, separant els càlculs de dades de la seva representació visual."
        }
      ],
      "pilot": "Partir d’un petit conjunt de mètriques de servei aprovades i preguntes reals de dos col·lectius: operació i direcció. Preparar respostes de referència i casos amb ambigüitat, poca cobertura o dimensions restringides. Generar les vistes en un espai de revisió, comparar fórmules i resultats i corregir la capa semàntica quan falti informació. Lliurar les plantilles aprovades, les preguntes de prova i un registre de discrepàncies entre pregunta, consulta, gràfic i narrativa.",
      "tender": "Atos proposa generar visualitzacions des d’un catàleg de mètriques autoritzat, conservant consulta, fórmula, filtres, finestra i procedència. La solució valida permisos i agregacions abans d’executar i diferencia exploracions de vistes oficials. La proposta inclou capa semàntica, plantilles, esquemes de visualització i proves d’exactitud reutilitzables. Les explicacions distingeixen les causes demostrades de les simples correlacions.",
      "acceptance": [
        "Una pregunta equivalent retorna el mateix denominador en dues perspectives.",
        "Una mètrica o dimensió inventada és rebutjada abans de consultar.",
        "Cada número del resum coincideix amb el resultat i conserva període i unitat."
      ],
      "metrics": [
        "Preguntes amb consulta i resultat correctes / conjunt de referència.",
        "Temps per obtenir una vista validada davant la construcció manual actual."
      ],
      "dependencies": [
        "B3",
        "A6",
        "C4"
      ],
      "caution": "Un gràfic sintàcticament vàlid pot transmetre una lectura falsa per agregació o context. La validació visual i semàntica continua sent necessària; preguntes amb diverses interpretacions han de demanar precisió abans de generar una vista oficial.",
      "evidence": [
        {
          "sourceId": "CG13",
          "claim": "Uber explica que QueryGPT descompon la generació SQL en tasques especialitzades i avalua intenció, taules, execució i resultat. També reconeix consultes amb camps inventats i resultats variables, i descriu un desplegament limitat a equips d’operació i suport.",
          "transfer": "Es trasllada la validació per etapes i amb preguntes de referència. El cas genera SQL; no acredita dashboards automàtics ni narratives correctes per defecte."
        },
        {
          "sourceId": "CG14",
          "claim": "Vega-Lite defineix visualitzacions mitjançant objectes JSON amb dades, transformacions i composició de vistes. L’esquema facilita la validació formal i permet separar una especificació versionada del motor que la dibuixa, amb components reutilitzables entre diferents visualitzacions.",
          "transfer": "Aporta un format obert per conservar i revisar el gràfic. La definició de mètriques i les restriccions semàntiques són responsabilitat del disseny proposat al CTTI."
        },
        {
          "sourceId": "INT04",
          "relatedSourceIds": [],
          "claim": "El Ministry of Justice documenta límits dels històrics agregats per calcular disponibilitat. És una advertència de qualitat de dades, no un cas de quadres generats amb IA.",
          "transfer": "Atos proposa que cada quadre generat mostri consulta, definició, període i dades que el sostenen. Abans de passar a ús operatiu, es compararia amb preguntes de resultat conegut i permisos reals. Mantindríem les referències de generació ja presents; afegir un cas públic poc comparable faria aquesta fitxa menys precisa."
        }
      ],
      "effort": "mitjà",
      "readiness": "En evolució"
    },
    {
      "id": "D1",
      "title": "Autoservei amb comprovació del resultat",
      "subtitle": "Un portal converteix peticions habituals en operacions guiades, amb permisos, límits i una resposta verificable.",
      "problem": "Àtom/SIC i l’evolució de l’autoservei ja aporten canals per tramitar i seguir peticions. Atos proposa encaixar-hi les operacions repetibles d’observabilitat, distingint l’atenció a l’usuari de l’autoservei tècnic dels proveïdors. El valor es comprova quan una petició autoritzada acaba en el resultat demanat i amb un mantenidor identificat.",
      "proposal": "Proposem un catàleg curt d’operacions: alta de font, quadre inicial, regla d’alerta i canvi de retenció dins de límits aprovats. El formulari recupera identitat i responsable del servei, calcula l’abast i comprova permisos i quota. Un flux executa els passos amb reintents segurs i verificació final. Les excepcions passen a revisió amb la informació ja recollida. El sol·licitant veu estat, cost estimat quan sigui calculable i evidència del resultat. El mateix servei es pot consumir per API, mantenint controls i registre idèntics. Cada operació s’oferiria al canal corporatiu que li correspongui. L’aprovació de negoci o la validació de l’Oficina s’incorporaria quan pertoqui; el traspàs a administració inclouria documentació, formació i tractament de les excepcions.",
      "flow": [
        "Triar una operació i el servei destinatari.",
        "Comprovar permisos, quota i política aplicable.",
        "Executar passos i gestionar errors parcials.",
        "Verificar el resultat i lliurar-ne l’evidència."
      ],
      "technology": [
        {
          "name": "Portal de desenvolupadors, com Backstage",
          "role": "Ofereix catàleg i plantilles relacionades amb serveis, documentació i responsables, sense substituir els controls d’execució."
        },
        {
          "name": "Motor de flux de treball i adaptadors",
          "role": "Connecta les eines existents, gestiona reintents i registra el resultat de cada pas amb possibilitat de recuperació."
        },
        {
          "name": "Polítiques i quotes",
          "role": "Apliquen límits de dades, permisos i canvis permesos abans de crear recursos o modificar configuracions."
        }
      ],
      "pilot": "Automatitzar l’alta d’una font i el seu dashboard. Provar una petició correcta, una sense permisos i una amb error a mig procés. Comparar temps d’espera i intervencions manuals amb la manera actual. Lliurar el catàleg inicial i el procediment per recuperar peticions incompletes.",
      "tender": "Atos proposa un autoservei d’operacions catalogades amb permisos, límits, estat i prova de resultat. La interfície i l’API apliquen les mateixes validacions. La proposta inclou reintents sense efectes duplicats, tractament d’errors parcials i plantilles exportables. Les peticions fora de política passen a un circuit explícit de revisió.",
      "acceptance": [
        "Una petició repetida no crea recursos duplicats.",
        "Una fallada parcial deixa estat i camí de recuperació clars.",
        "La petició només es completa després de verificar el resultat."
      ],
      "metrics": [
        "Temps de petició fins a resultat verificat.",
        "Operacions completades sense intervenció manual / operacions elegibles."
      ],
      "dependencies": [
        "A4",
        "A5",
        "B7"
      ],
      "caution": "El portal depèn de les APIs i permisos reals de les eines. Automatitzar un procediment ambigu multiplica els errors. Cal començar per operacions estables i conservar una via de recuperació manual.",
      "evidence": [
        {
          "sourceId": "INT01",
          "relatedSourceIds": [
            "R08",
            "INT14"
          ],
          "claim": "Altinn ofereix un entorn de prova; Nais i StackOps incorporen observabilitat a plataformes compartides per equips de serveis públics.",
          "transfer": "Atos proposa un paquet d’alta que es demani pels canals corporatius aplicables i acabi amb instrumentació, quadre, alerta i accés comprovats. El responsable rebria una prova del resultat i les dades necessàries per mantenir-lo. L’autoservei reduiria passos repetits, però no donaria l’alta per feta només perquè una petició o un desplegament hagin acabat sense error."
        },
        {
          "sourceId": "R24",
          "claim": "LinkedIn explica com Nuage va evolucionar de l’autoservei a un control del cicle de vida amb propietat, permisos i polítiques.",
          "transfer": "El patró útil és governar l’operació completa. La implementació per al CTTI requerirà adaptadors propis."
        },
        {
          "sourceId": "R25",
          "claim": "Backstage presenta catàleg, plantilles i integracions per centralitzar el treball dels equips.",
          "transfer": "Aporta patrons de catàleg i plantilles que es poden encaixar amb els canals corporatius. El pilot reutilitzaria els controls aplicables i afegiria la comprovació del resultat, sense donar per fet que cal un portal nou."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada"
    },
    {
      "id": "D2",
      "title": "Regles que els equips poden compartir",
      "subtitle": "Un repositori prova, versiona i distribueix deteccions reutilitzables amb les seves dades de prova i dependències.",
      "problem": "Dos equips poden detectar el mateix problema amb regles diferents i tornar a descobrir els mateixos falsos positius. Compartir fitxers ajuda poc si no sabem per a quines versions o serveis funcionen. El CTTI pot convertir les bones deteccions en paquets mantinguts i comprovables que altres equips puguin adoptar.",
      "proposal": "Cada paquet conté regla, explicació, senyals necessaris, àmbit, versions compatibles, proves i responsable de manteniment. Les aportacions passen revisió i s’executen amb exemples positius i negatius. El portal mostra on s’utilitza cada versió i quines incidències té obertes. Abans d’activar-la en un nou servei, es prova en paral·lel per observar soroll i cobertura. Les adaptacions locals queden declarades i poden tornar al paquet comú. La distribució incorpora retirada i retorn a la versió anterior si una actualització degrada la detecció.",
      "flow": [
        "Proposar una regla amb exemples i dependències.",
        "Revisar i executar proves positives i negatives.",
        "Observar-la en paral·lel al servei destinatari.",
        "Distribuir la versió i recollir-ne els resultats."
      ],
      "technology": [
        {
          "name": "Repositori Git i catàleg de paquets",
          "role": "Conserven versions, propietaris i dependències, i permeten saber quins serveis hauria d’actualitzar una correcció."
        },
        {
          "name": "promtool i banc de sèries",
          "role": "Comproven alertes sobre dades conegudes i eviten regressions abans de distribuir canvis."
        },
        {
          "name": "Desplegament progressiu",
          "role": "Activa regles per àmbits i permet observar-ne el comportament abans d’estendre-les a més serveis."
        }
      ],
      "pilot": "Recollir tres deteccions de dos equips i preparar exemples de fallada i normalitat. Provar-ne la portabilitat en un tercer servei compatible. Mesurar falsos positius i casos que no detecten. Lliurar els paquets, el criteri d’acceptació de contribucions i una prova de retirada de versió.",
      "tender": "Atos proposa paquets de regles amb explicació, dependències, compatibilitats i proves. El circuit inclou revisió de contribucions, versions, distribució progressiva i retirada. La proposta preveu els drets necessaris perquè el CTTI els reutilitzi i adapti, amb excepcions locals registrades i un responsable de manteniment per versió.",
      "acceptance": [
        "Una regla supera casos de fallada i de normalitat abans de publicar-se.",
        "El catàleg identifica serveis afectats per una versió defectuosa.",
        "La retirada recupera una versió provada sense perdre la traça del canvi."
      ],
      "metrics": [
        "Regles reutilitzades amb proves / regles compartides.",
        "Falsos positius i cobertura dels casos coneguts per versió."
      ],
      "dependencies": [
        "A1",
        "A4",
        "B5"
      ],
      "caution": "Una regla sintàcticament correcta pot tenir un llindar inadequat per a un altre servei. Les dades de prova han de cobrir càrregues i temporades diferents. Cal pressupostar el manteniment del repositori compartit.",
      "evidence": [
        {
          "sourceId": "INT03",
          "relatedSourceIds": [
            "INT13"
          ],
          "claim": "Cloud Pi Native sincronitza alertes i quadres des de Git. La guia brasilera recomana comprovar cobertura i comportament de les alertes.",
          "transfer": "Atos proposa distribuir patrons amb versió, exemples correctes i defectuosos, dependències i mantenidor. Un equip podria reutilitzar la regla sabent què observa, en quines condicions funciona i com tornar a la versió anterior. La publicació francesa descriu una implantació; la brasilera és una guia. Cap de les dues eximeix de provar cada patró sobre el servei receptor."
        },
        {
          "sourceId": "R26",
          "claim": "openDesk distribueix regles Prometheus pròpies i de col·laboradors, juntament amb dashboards i una matriu de cobertura.",
          "transfer": "Ofereix una referència pública per empaquetar deteccions, mostrant també on la cobertura encara és incompleta."
        },
        {
          "sourceId": "R07",
          "claim": "Prometheus permet provar regles amb sèries d’entrada i resultats esperats mitjançant promtool.",
          "transfer": "És una base concreta per a la validació del paquet; la notificació i l’ús real requereixen proves addicionals."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "D3",
      "title": "Adopció que es nota en el treball",
      "subtitle": "Un espai de pràctica connecta formació, ajuda entre equips i ús real de les capacitats d’observabilitat.",
      "problem": "Els serveis ja preveuen formació i adopció, i Àtom acompanya l’evolució del SAU. Atos proposa reforçar aquest treball amb pràctiques lligades als rols i als canvis concrets. La formació pot acabar amb moltes assistències i poc canvi en la manera d’operar. Els referents dels equips necessiten exemples propers i temps per resoldre casos reals. El CTTI pot vincular la xarxa de persones impulsores a plantilles, entorns de pràctica i evidències d’ús, sense convertir-la en un rànquing individual.",
      "proposal": "Proposem itineraris curts per rol: seguir una traça, crear una alerta útil, revisar un incident i donar d’alta un servei. Cada itinerari té un entorn de pràctica amb una fallada reproduïble i un resultat que cal demostrar. El portal relaciona materials, referents i sessions d’ajuda. Les dades d’ús agregades mostren on els equips s’encallen; una consulta breu recull per què. Les millores que surten de les sessions es converteixen en plantilles o regles compartides. La coordinació dedica capacitat explícita a mantenir materials i atendre dubtes.",
      "flow": [
        "Triar una tasca real i el rol destinatari.",
        "Practicar-la en un entorn amb fallada coneguda.",
        "Resoldre dubtes amb un referent i millorar el material.",
        "Comprovar l’adopció al servei i compartir el resultat."
      ],
      "technology": [
        {
          "name": "Portal de coneixement i catàleg",
          "role": "Relaciona cada tasca amb instruccions, plantilles, versions i persones de suport del domini corresponent."
        },
        {
          "name": "Entorns efímers de pràctica",
          "role": "Reprodueixen casos sense exposar dades de producció i es poden reconstruir per repetir l’aprenentatge."
        },
        {
          "name": "Analítica agregada d’adopció",
          "role": "Mesura finalització de tasques i ús de capacitats per equip, complementant el comportament amb comentaris dels participants."
        }
      ],
      "pilot": "Treballar amb dos equips sobre una traça i una alerta del seu àmbit. Preparar la pràctica, observar els punts de bloqueig i revisar el material amb els referents. Comprovar després que poden repetir la tasca en un servei autoritzat. Lliurar dos itineraris i les millores de plantilla que n’hagin sortit.",
      "tender": "Atos proposa itineraris pràctics per rol, entorns de prova i ajuda entre equips, amb materials versionats i reutilitzables. L’adopció es mesura combinant ús agregat i tasques demostrades. La proposta concreta amb els equips la dedicació dels referents, el manteniment dels materials i la incorporació de millores al catàleg comú.",
      "acceptance": [
        "Un participant resol la tasca en un entorn reconstruït.",
        "Un bloqueig recurrent genera una millora del material o de l’eina.",
        "L’informe d’adopció mostra equips i tasques sense exposar activitat individual innecessària."
      ],
      "metrics": [
        "Equips que demostren la tasca / equips participants.",
        "Bloqueigs repetits i temps fins a resoldre’ls."
      ],
      "dependencies": [
        "D1",
        "D2"
      ],
      "caution": "La manca d’ús pot respondre a una eina inadequada, permisos insuficients o falta de temps. Les mètriques d’adopció han d’ajudar a millorar el servei intern i s’han de llegir amb els equips.",
      "evidence": [
        {
          "sourceId": "INT15",
          "relatedSourceIds": [
            "INT01"
          ],
          "claim": "NIRS va executar un simulacre de fallada del transport de logs. Altinn permet preparar un entorn local d’instrumentació i prova.",
          "transfer": "Atos proposa treballar l’adopció amb situacions que cada rol hagi de resoldre: trobar la manca de senyal, interpretar-la, avisar i comprovar la recuperació. El traspàs al mantenidor inclouria aquesta pràctica i les dificultats detectades. Els precedents mostren exercici i entorn disponible; l’aprenentatge i la reducció d’errors s’haurien de comprovar amb els equips CTTI."
        },
        {
          "sourceId": "R27",
          "claim": "Backstage Learn ofereix recorreguts pràctics per desplegar la plataforma, incorporar programari i crear plantilles.",
          "transfer": "Podem aplicar la mateixa lògica a tasques d’observabilitat, amb casos i entorns propis del CTTI."
        },
        {
          "sourceId": "R11",
          "claim": "Spotify descriu intercanvi de coneixement entre equips i mesures d’ús i satisfacció de la plataforma.",
          "transfer": "Són referències per combinar ajuda i feedback; no proven per si soles un guany d’adopció al CTTI."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "E1",
      "title": "Mesurar el que li passa al servei",
      "subtitle": "Seguir una operació fins al resultat funcional evita donar per acabat un tràmit que només s’ha acceptat.",
      "problem": "PCN&ME recull processos crítics i moments d’estrès, i Patró ja recull informació de negoci d’aplicacions segons el model del servei d’eines. Atos proposa connectar aquesta base amb traces i dependències. La definició funcional és decisiva: un intent, un reintent i una finalització no poden acabar comptant com tres operacions satisfactòries.",
      "proposal": "Atos proposa relacionar l’experiència tècnica amb el resultat que defineix el responsable funcional: una operació acceptada, pendent, completada o fallida. En fluxos asíncrons, la confirmació d’API o del broker es contrastaria amb el consumidor i la font transaccional. Identificadors d’operació i regles de conciliació permetrien tractar reintents, duplicats i resultats tardans. El quadre mostraria temps fins a la finalització, volum pendent i trams sense evidència. Els equips tècnics instrumenten el recorregut i el negoci valida què significa èxit; no cal capturar el contingut personal del tràmit. Una vista compartida pot reunir resultat, rendiment i dificultats comunicades pels usuaris. Per comparar serveis, el responsable funcional acorda recorreguts i canals equivalents; accessibilitat, satisfacció i incidència tècnica es mantenen com a dimensions diferents.",
      "flow": [
        "Acordar el recorregut i què vol dir completar-lo.",
        "Emetre esdeveniments amb identificadors opacs.",
        "Deduplicar i reconciliar amb la font transaccional.",
        "Relacionar resultats amb rendiment i dependències."
      ],
      "technology": [
        {
          "name": "Esdeveniments de negoci i instrumentació",
          "role": "Registren passos i resultats significatius per al servei, afegint el context que les mètriques d’infraestructura no poden deduir."
        },
        {
          "name": "Processament de fluxos i conciliació",
          "role": "Relaciona esdeveniments tardans i repetits, i contrasta totals amb el registre transaccional autoritzat."
        },
        {
          "name": "Capa semàntica i dashboard de servei",
          "role": "Comparteixen definicions d’èxit, temps i excepció, amb versió i detall suficient per investigar desviacions."
        },
        {
          "name": "Esdeveniments i conciliació de resultats",
          "role": "Relacionen productor, transport i consumidor; recuperen resultats tardans sense comptar duplicats."
        }
      ],
      "pilot": "Escollir una integració asíncrona real i provar un consumidor aturat, un reintent i una recuperació. El recompte d’operacions úniques i el resultat final han de coincidir amb la font transaccional, sense donar per acabat el que només s’ha acceptat. Afegir al quadre el retorn d’usuaris disponible i revisar amb el responsable funcional què es pot comparar i què necessita context propi.",
      "tender": "Atos proposa observar el resultat de negoci de cada recorregut, des de l’acceptació fins a la finalització validada. La solució diferencia operacions pendents, completades i fallides, concilia reintents i relaciona les desviacions amb els equips del tram afectat.",
      "acceptance": [
        "Una operació acceptada però no completada continua visible com a pendent.",
        "Els reintents no inflen el recompte d’operacions úniques.",
        "El resultat final coincideix amb la font transaccional i té validació funcional.",
        "La vista separa resultat funcional, qualitat percebuda i problema tècnic; una comparació entre serveis explicita canal, període i criteri equivalent."
      ],
      "metrics": [
        "Tràmits completats / intents elegibles, amb exclusions explícites.",
        "Temps p95 de finalització i discrepància amb la font transaccional."
      ],
      "dependencies": [
        "A1",
        "A6",
        "G2"
      ],
      "caution": "L’abandonament pot tenir causes alienes a la tecnologia. Una caiguda de finalitzacions necessita context de demanda i calendari. Els identificadors opacs també requereixen controls d’accés i una retenció justificada.",
      "evidence": [
        {
          "sourceId": "MKT08",
          "claim": "WOGAA reuneix rendiment, retorn d’usuaris i comparació de serveis públics en una vista compartida per a les agències de Singapur.",
          "transfer": "Atos proposa aprofitar aquest enfocament amb els responsables funcionals, conservant la conciliació de cada tràmit i evitant una classificació de serveis que no siguin comparables."
        },
        {
          "sourceId": "INT08",
          "relatedSourceIds": [
            "INT11"
          ],
          "claim": "VA.gov tracta les fallades silencioses de sol·licituds. GC Notify diferencia acceptació, processament i lliurament de missatges.",
          "transfer": "Atos proposa seguir les fites del tràmit i detectar casos que queden pendents més enllà del temps esperat, encara que l’aplicació respongui. La conciliació consideraria reintents, duplicats i finalitzacions tardanes, amb identificadors que evitin exposar dades personals. El responsable funcional definiria què vol dir acabar. El precedent orienta la mesura; els objectius i el circuit de recuperació es concretarien per servei."
        },
        {
          "sourceId": "R17",
          "claim": "GOV.UK Pay publica transaccions, import processat i serveis que utilitzen la plataforma.",
          "transfer": "Mostra com expressar activitat en termes del servei; la correlació tècnica i el recorregut CTTI són treball addicional."
        },
        {
          "sourceId": "R18",
          "claim": "El marc australià orienta la mesura a l’efectivitat del servei i a les necessitats de les persones.",
          "transfer": "Ajuda a seleccionar preguntes útils amb negoci, sense importar obligacions ni indicadors inadequats per al CTTI."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada"
    },
    {
      "id": "E2",
      "title": "Objectius de servei i pressupost d’error",
      "subtitle": "Un càlcul reproduïble relaciona experiència, fiabilitat i decisions de canvi sense amagar el detall.",
      "problem": "L’índex de salut ofereix una lectura conjunta, però pot amagar una degradació important darrere d’altres components saludables. L’Atles proposa complementar-lo amb objectius de servei. Cal calcular-los sobre un recorregut i explicar quins esdeveniments compten, quina finestra s’utilitza i què passa quan manquen dades.",
      "proposal": "Cada servei seleccionat tindrà indicadors de disponibilitat, latència o resultat i un objectiu acordat. El pressupost d’error expressa el marge de fallades admissible dins de la finestra. El motor calcula consum i velocitat de consum amb diverses finestres per detectar degradacions sostingudes i ràpides. El quadre conserva l’índex de salut i permet veure quin objectiu s’ha degradat. Les decisions de prioritzar fiabilitat o limitar canvis es vinculen a una política explícita. Un període sense telemetria es tracta com a informació desconeguda segons el criteri acordat, no com a èxit. El resultat del procés s’acorda amb el responsable funcional i es relaciona amb PCN&ME i Patró quan correspongui. Els ANS i el seguiment a CONTIC conserven les seves fórmules: es mostren separats els temps del prestador i del mantenidor, i l’SLO proposat no els substitueix.",
      "flow": [
        "Definir indicador, objectiu, finestra i exclusions.",
        "Calcular resultat i pressupost d’error amb dades verificades.",
        "Detectar consum anormal en finestres complementàries.",
        "Aplicar la política de revisió o canvi acordada."
      ],
      "technology": [
        {
          "name": "Motor de SLO i regles de càlcul",
          "role": "Manté definicions versionades i calcula objectius i marge d’error a partir de les mateixes dades que es poden auditar."
        },
        {
          "name": "Alertes de consum de pressupost",
          "role": "Combinen finestres temporals per distingir degradacions ràpides de soroll breu, amb llindars validats sobre la línia base."
        },
        {
          "name": "Integració amb gestió de canvis",
          "role": "Mostra el marge disponible abans d’un canvi i registra les excepcions que el responsable decideix assumir."
        },
        {
          "name": "Exemplars i detall del senyal",
          "role": "Permeten passar d’una mètrica compatible a una traça de mostra. Un índex agregat necessita identificar primer el senyal que explica el canvi."
        }
      ],
      "pilot": "Escollir un servei i definir un indicador amb el seu responsable. Reproduir dades de normalitat, degradació breu, fallada sostinguda i absència de telemetria. Comparar les alertes i decisions que en sortirien. Lliurar la definició versionada, el càlcul contrastat i la política proposada, sense activar bloqueigs de canvi abans d’acordar-los.",
      "tender": "Atos proposa objectius de servei amb indicador, població, finestra, exclusions i tractament de dades absents. La proposta inclou definicions exportables, proves de càlcul i traçabilitat d’alertes i decisions sobre el pressupost d’error. Es fa explícita la relació amb l’índex de salut i els compromisos contractuals: un SLO intern només s’equipara a un SLA si hi ha acord.",
      "acceptance": [
        "El càlcul es reprodueix amb un conjunt de dades conegut.",
        "La falta de dades es diferencia de l’èxit i de l’error del servei.",
        "Una alerta indica objectiu, finestra i consum que l’han activada.",
        "Quan l’eina ho permet, una mètrica condueix a una traça de mostra i indica el límit de mostreig; l’Índex de Salut manté les seves regles."
      ],
      "metrics": [
        "Compliment del SLO i pressupost restant per finestra.",
        "Precisió dels avisos de consum i cobertura de dades del càlcul."
      ],
      "dependencies": [
        "E1",
        "B3"
      ],
      "caution": "Un objectiu inadequat pot generar soroll o tolerar una experiència dolenta. Els serveis amb poc trànsit necessiten un tractament específic. Els llindars es contrastaran amb la línia base i la criticitat abans d’aplicar-los al servei.",
      "evidence": [
        {
          "sourceId": "INT11",
          "relatedSourceIds": [
            "INT04"
          ],
          "claim": "GC Notify publica objectius i estats diferenciats de missatge. El Ministry of Justice adverteix sobre la pèrdua de resolució dels històrics.",
          "transfer": "Atos proposa definir cada objectiu amb resultat, població, finestra i exclusions, i guardar l’evidència que permet repetir el càlcul. La falta de telemetria apareixeria com a desconeixement, no com a èxit. No traslladaríem els percentatges d’altres serveis. El pressupost d’error ajudaria a prioritzar actuacions sense substituir els ANS ni els circuits corporatius de validació."
        },
        {
          "sourceId": "R19",
          "claim": "Notify explica que el 95% dels emails i SMS s’envien en deu segons, i diferencia aquest pas de la recepció final.",
          "transfer": "La referència ajuda a delimitar un objectiu mesurable. El CTTI haurà d’acordar el seu recorregut i els seus valors."
        },
        {
          "sourceId": "CG21",
          "claim": "Google SRE desenvolupa alertes basades en consum de pressupost d’error i finestres múltiples.",
          "transfer": "Podem adoptar el mètode de càlcul, ajustant objectius, mostra i resposta al context de cada servei."
        },
        {
          "sourceId": "TEC_EXEMPLARS",
          "claim": "El model de mètriques d’OpenTelemetry preveu exemplars per conservar context d’observacions seleccionades.",
          "transfer": "Atos proposa comprovar un salt des del senyal que explica una degradació fins a una traça autoritzada; la mostra no representa totes les peticions."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "E3",
      "title": "El cost de cada servei observat",
      "subtitle": "Relacionar cost, activitat i consum del codi ajuda a decidir on optimitzar i comprovar si la millora es nota.",
      "problem": "La memòria documenta FinOps a la PTD i al núvol. Atos proposa ampliar-ne la lectura al servei observat, al cost de la telemetria i al resultat obtingut. Cal conciliar primer les fonts existents, separar costos atribuïbles, compartits i encara no assignats, i comparar alternatives amb la mateixa cobertura.",
      "proposal": "Proposem unir facturació normalitzada, consum d’ingesta, emmagatzematge, consulta i catàleg de serveis. El model atribueix cost directe quan hi ha mesura i reparteix costos compartits amb criteris publicats. Manté una categoria no assignada perquè el quadre no ofereixi una precisió falsa. Permet simular canvis de retenció, mostreig o cardinalitat i mostrar-ne l’efecte sobre cobertura i recuperació. S’hi incorporen llicències, transferències i operació dins de l’abast acordat. El responsable pot comparar cost per servei i per unitat d’activitat, tenint present que els serveis tenen criticitats diferents. Les xifres es concilien amb la base FinOps aplicable abans de publicar una nova atribució, amb la gestió del servei i els responsables de seguiment econòmic. Quan l’aplicació ho permeti, el perfilatge relaciona una operació lenta amb les funcions que consumeixen CPU o memòria. El mantenidor pot comparar versions amb càrrega equivalent i comprovar consum per operació i temps de resposta. L’estalvi de recursos es mostra separat de l’estalvi de factura, que depèn de la capacitat contractada i de com es facturi.",
      "flow": [
        "Normalitzar factures i recollir consum per servei.",
        "Separar cost directe, compartit i no assignat.",
        "Simular alternatives amb cobertura comparable.",
        "Reconciliar totals i validar les decisions."
      ],
      "technology": [
        {
          "name": "FinOps de la PTD i FOCUS",
          "role": "Aporten una base corporativa de cost amb abast conegut. Cal comprovar correspondència de serveis i imports compartits o sense assignar."
        },
        {
          "name": "FOCUS i model de facturació",
          "role": "Normalitzen conceptes de cost i ús entre fonts compatibles; les dades corporatives completen els conceptes que falten."
        },
        {
          "name": "OpenCost per a Kubernetes",
          "role": "Atribueix costos de càrregues i identifica capacitat ociosa; es complementa amb costos fora del clúster."
        },
        {
          "name": "Model analític de consum i simulació",
          "role": "Relaciona volum, retenció i consultes amb servei, i calcula escenaris amb hipòtesis visibles i sensibilitat als preus."
        },
        {
          "name": "Perfilatge continu vinculat a traces",
          "role": "Pyroscope és una opció per relacionar una petició amb perfils de codi, segons llenguatge i instrumentació. Ajuda a provar una optimització; no calcula per si sol la factura atribuïda al servei."
        }
      ],
      "pilot": "Conciliar un període de dos serveis amb cost directe, compartit i no assignat. Qualsevol escenari de reducció ha de mostrar l’efecte sobre la cobertura i la qualitat del servei, a més de l’import. En una aplicació compatible, localitzar una funció costosa i comparar dues versions amb càrrega equivalent. Mesurar CPU o memòria per operació, latència, sobrecàrrega del profiler i efecte real o estimat sobre la despesa.",
      "tender": "Atos proposa un model de costos reproduïble per servei i capacitat d’observabilitat. Separa costos directes, compartits i no assignats i reconcilia els totals amb la facturació. Les simulacions mostren hipòtesis i efectes sobre cobertura. La proposta inclou dades i regles exportables, amb el tractament acordat de llicències, transferències i operació.",
      "acceptance": [
        "La suma de categories reconcilia amb la factura o explica la diferència.",
        "Un canvi de repartiment mostra el seu efecte sense alterar el cost total.",
        "Un escenari d’estalvi identifica la cobertura o resolució que es perd.",
        "Una optimització de codi es contrasta amb càrrega equivalent; es distingeix consum de recursos, cost atribuït i estalvi de factura efectivament observat."
      ],
      "metrics": [
        "Cost per servei i percentatge de cost encara no assignat.",
        "Cost per unitat d’activitat i desviació entre simulació i consum observat."
      ],
      "dependencies": [
        "A3",
        "A6",
        "E1",
        "A5"
      ],
      "caution": "El repartiment dels costos comuns és una convenció que s’ha d’acordar. FOCUS no aporta la identitat del servei per art de màgia. Les tarifes i els descomptes poden canviar el resultat dels escenaris.",
      "evidence": [
        {
          "sourceId": "MKT03",
          "claim": "Els perfils associats a traces de Pyroscope permeten relacionar una operació amb mostres de consum del codi.",
          "transfer": "Atos proposa fer servir aquesta evidència per orientar una correcció i comprovar-ne l’efecte, mantenint separats consum tècnic, atribució de cost i despesa facturada."
        },
        {
          "sourceId": "INT12",
          "relatedSourceIds": [],
          "claim": "British Columbia ofereix monitoratge de la plataforma i demana evidència d’ús per justificar ampliacions de quota.",
          "transfer": "Atos proposa relacionar consum, reserva de capacitat i cost atribuït al servei abans de decidir un ajust. Els recursos compartits i les dades sense assignació quedarien visibles, també en el cost de la telemetria. El precedent acredita una decisió amb dades, però no un estalvi publicat. La mesura pròpia permetria valorar si reduir volum manté la cobertura i la capacitat de diagnosi."
        },
        {
          "sourceId": "R21",
          "claim": "FOCUS normalitza dades de facturació i ús de diversos proveïdors en un format compartit.",
          "transfer": "És la base per comparar costos; cal unir-la a catàleg i consum real per atribuir-los a serveis."
        },
        {
          "sourceId": "R22",
          "claim": "OpenCost separa costos de càrregues, capacitat ociosa i costos generals de Kubernetes.",
          "transfer": "Aporta una peça concreta del model, que s’ha de completar amb llicències, persones i sistemes fora del clúster."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada",
      "addendum": {
        "title": "Cost per tasca i resultat",
        "paragraphs": [
          "En els serveis amb IA, el cost es relaciona també amb la tasca i el resultat validat. Inclou crides fallides, reintents i revisió humana, i es compara amb els límits d’execució de C4. Així es pot veure si una resposta aparentment barata només ha traslladat feina a l’operador."
        ],
        "evidence": [
          {
            "sourceId": "ATOS_WS_2026",
            "claim": "Arquitectura modular de telemetria, FinOps, instrumentació combinada i adopció progressiva d’AIOps amb validació operativa.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "E4",
      "title": "Reinvertir el temps que recuperem",
      "subtitle": "Un registre de treball repetitiu mesura l’estalvi net i el vincula a millores comprovables del servei.",
      "problem": "Els dos serveis ja exigeixen valorar cost, benefici i resultat de les millores. Atos proposa fer aquest benefici reproduïble després del pilot. Automatitzar una tasca pot estalviar minuts d’execució i afegir hores de manteniment. Si només es compten actuacions automàtiques, el retorn sembla més gran del que és. El CTTI pot vincular la reducció de treball repetitiu a capacitat recuperada i a millores concretes, amb una mesura compartida pels equips.",
      "proposal": "Proposem un registre de tasques recurrents amb freqüència, temps manual observat i causa. Les automatitzacions publiquen execucions, errors i intervencions necessàries. El càlcul compara períodes equivalents i descompta construcció, manteniment i recuperacions. Les hores estimades s’identifiquen com a estimació fins que hi ha observació suficient. El govern del servei acorda en quines millores es reinverteix la capacitat: cobertura, proves o deute prioritari. El quadre relaciona cada millora amb el seu resultat i evita comptar dues vegades un mateix estalvi. El balanç inclou també excepcions i supervisió humana. Cada flux identifica qui l’executa, qui el manté i quin resultat revisa el govern del servei.",
      "flow": [
        "Mesurar una tasca repetida i la seva freqüència.",
        "Automatitzar-la i registrar intervencions i errors.",
        "Calcular el temps net recuperat amb hipòtesis visibles.",
        "Vincular la capacitat a una millora i comprovar-la."
      ],
      "technology": [
        {
          "name": "Registre de tasques i execucions",
          "role": "Relaciona peticions, automatitzacions i temps d’intervenció a partir d’esdeveniments i mostres acordades amb l’equip."
        },
        {
          "name": "Analítica de flux de treball",
          "role": "Separa temps d’espera i treball actiu per no presentar una cua més curta com a hores de dedicació estalviades."
        },
        {
          "name": "Cartera de millores vinculada al deute",
          "role": "Mostra on s’ha destinat la capacitat recuperada i quines comprovacions de servei han millorat."
        }
      ],
      "pilot": "Mesurar dues tasques repetitives, com preparar un informe i donar d’alta una font. Automatitzar-ne una i observar un període comparable, incloent errors i manteniment. Revisar el càlcul amb l’equip i dedicar part de la capacitat a una mancança de cobertura. Lliurar el balanç net i la prova de la millora.",
      "tender": "Atos proposa identificar treball repetitiu i mesurar les automatitzacions amb una línia base acordada. El balanç separa espera, dedicació manual, construcció i manteniment, distingint estimacions de resultats observats. La capacitat recuperada es planteja reinvertir en millores, amb revisió al govern del servei, evidència del resultat i sense dobles recomptes.",
      "acceptance": [
        "El càlcul es reconstrueix a partir de les tasques i mostres utilitzades.",
        "Les fallades i el manteniment es descompten del retorn declarat.",
        "Una millora finançada amb capacitat recuperada té resultat verificat."
      ],
      "metrics": [
        "Hores netes recuperades, distingint estimació i observació.",
        "Capacitat reinvertida i millores que superen la prova acordada."
      ],
      "dependencies": [
        "D1",
        "B2",
        "E3"
      ],
      "caution": "Els canvis de demanda poden distorsionar la comparació. Cal acordar mostres i valorar el manteniment a llarg termini. Recuperar capacitat no equival automàticament a reduir la dotació del servei.",
      "evidence": [
        {
          "sourceId": "INT14",
          "relatedSourceIds": [],
          "claim": "GovTech publica testimonis de millora del temps de tractament d’incidents amb StackOps, sense detallar una base comparativa suficient.",
          "transfer": "Atos proposa mesurar aquí el temps dedicat a una tasca repetida abans i després del canvi. Del temps recuperat es descomptarien manteniment, excepcions, revisió humana i errors. Només el saldo comprovable serviria per decidir en què reinvertir capacitat. La referència justifica fer l’experiment; no permet prometre una xifra ni atribuir automàticament el benefici a una eina o a la IA."
        },
        {
          "sourceId": "R23",
          "claim": "Google SRE distingeix el treball repetitiu i automatitzable de les activitats que produeixen millores duradores.",
          "transfer": "La distinció ajuda a mesurar el retorn; la dedicació i els compromisos del CTTI s’han d’acordar localment."
        },
        {
          "sourceId": "R24",
          "claim": "LinkedIn descriu com Nuage redueix coordinacions manuals de recursos mitjançant autoservei i polítiques.",
          "transfer": "Aporta un tipus de tasca candidata. No importem xifres d’estalvi ni un retorn garantit al CTTI."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "F1",
      "title": "Provar la sortida abans de necessitar-la",
      "subtitle": "Un assaig anual reconstrueix un servei observat en un destí alternatiu i identifica què impedeix el canvi.",
      "problem": "Disposar d’una exportació no garanteix que una altra eina pugui utilitzar-la. Els dashboards poden dependre de consultes propietàries, les regles de funcions específiques i les dades d’identificadors interns. L’assaig de reversibilitat de l’Atles ha de comprovar que un equip pot tornar a operar un àmbit del servei amb el material lliurat.",
      "proposal": "Proposem un assaig anual amb un servei representatiu i un destí alternatiu. El paquet de sortida inclou contractes, configuracions, dades de mostra, regles, consultes, documentació i dependències de llicència. La ingesta duplica temporalment el flux autoritzat i permet comparar resultats. Un equip diferent reconstrueix les funcions acordades amb el paquet, registra les adaptacions i executa casos coneguts. El resultat identifica temps, cost, pèrdua de funcions i elements no transferibles. Les mancances entren al deute amb acció correctora. La prova amplia l’abast progressivament per cobrir perfils diferents.",
      "flow": [
        "Preparar el paquet i els casos de referència.",
        "Enviar un flux autoritzat al destí alternatiu.",
        "Reconstruir funcions amb un equip diferent.",
        "Comparar resultats i corregir dependències de sortida."
      ],
      "technology": [
        {
          "name": "Ingesta amb diversos destins",
          "role": "Permet comparar recepció i contingut durant l’assaig sense haver de reinstrumentar totes les aplicacions."
        },
        {
          "name": "Paquet de configuració i proves",
          "role": "Agrupa esquemes, regles, consultes i dependències amb versions, inventari i verificacions de paritat funcional."
        },
        {
          "name": "Entorn alternatiu reproduïble",
          "role": "Executa la reconstrucció i registra adaptacions, recursos necessaris i funcions que no es poden traslladar directament."
        }
      ],
      "pilot": "Fer la prova anual sobre un servei representatiu: un segon equip recupera un període de dades, les regles, el binari i la configuració de la versió escollida. Comprovar consultes, permisos, dependències i resultat funcional en un entorn separat. Documentar què no es pot reconstruir i l’esforç necessari per corregir-ho.",
      "tender": "Atos proposa un pla de reversibilitat amb inventari de dades, configuracions, drets i dependències. Inclou una prova anual de reconstrucció sobre un àmbit acordat, amb destí alternatiu i criteris de paritat funcional. Les diferències, adaptacions i costos es fan explícits. El CTTI tindria el paquet actualitzat i els resultats de les proves, amb un pla de correcció de les mancances.",
      "acceptance": [
        "Un equip diferent reconstrueix les funcions acordades amb el paquet.",
        "La comparació explica diferències de dades, consultes i detecció.",
        "El pla inclou dependències i costos de sortida, també els no resolts.",
        "El binari i la configuració de la versió escollida existeixen i es poden recuperar; conservar una etiqueta no és suficient."
      ],
      "metrics": [
        "Funcions reconstruïdes / funcions incloses en l’assaig.",
        "Temps, cost i adaptacions necessaris per servei provat."
      ],
      "dependencies": [
        "A1",
        "A2",
        "A4"
      ],
      "caution": "OTLP facilita transportar telemetria, però no migra automàticament dashboards, permisos ni semàntica de consultes. Les llicències i els drets de reutilització s’han d’acordar abans de valorar una funció com a reversible.",
      "evidence": [
        {
          "sourceId": "INT13",
          "relatedSourceIds": [
            "INT01"
          ],
          "claim": "El govern brasiler recomana formats oberts per reduir dependències. Altinn documenta instrumentació OpenTelemetry que es pot provar en un entorn local.",
          "transfer": "Atos proposa demostrar la sortida amb un servei representatiu: enviar dades a una segona destinació i reconstruir una consulta, una alerta i els accessos necessaris. Registraríem conversions, pèrdues i esforç. El protocol obert facilita el transport; no garanteix equivalència de funcions. La guia brasilera és un criteri d’arquitectura, no una prova de migració superada."
        },
        {
          "sourceId": "R01",
          "claim": "eBay va conservar el comportament esperat dels equips i va comparar la recollida antiga amb la nova durant la migració.",
          "transfer": "És una referència de paritat funcional. L’assaig anual contractual és una proposta pròpia per al CTTI."
        },
        {
          "sourceId": "R32",
          "claim": "Cloud.gov permet enviar logs d’aplicació a un destí propi per connexions xifrades, amb un abast documentat.",
          "transfer": "Mostra una sortida tècnica concreta i els seus límits: el camí descrit no inclou tota l’auditoria ni tots els serveis."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada"
    },
    {
      "id": "F2",
      "title": "Dades obertes amb un ús i un límit clars",
      "subtitle": "Una cadena separada prepara, revisa i publica indicadors agregats sense exposar la telemetria operativa.",
      "problem": "L’operació produeix informació que pot ajudar a explicar l’ús i la qualitat dels serveis públics. Publicar-la requereix decidir quina pregunta resol i quin detall és adequat. Les dades tècniques poden revelar patrons sensibles fins i tot quan no contenen noms, i una agregació petita pot permetre deduccions no desitjades.",
      "proposal": "Proposem una cadena de publicació separada de l’entorn operatiu. Parteix d’indicadors aprovats, elimina camps no necessaris, agrega per períodes i suprimeix grups petits segons criteris revisats. Pot aplicar retard de publicació i regles contra combinacions que permetin reconstruir detalls. Un responsable valida contingut, qualitat i risc abans de publicar. El conjunt porta diccionari, cobertura, cadència i llicència acordada, i conserva versions per corregir errors. La vista pública explica què mesura i quines dades queden excloses. Els primers casos poden ser volum d’ús i evolució de disponibilitat amb prou context.",
      "flow": [
        "Acordar indicadors, finalitat i detall publicable.",
        "Agregar, filtrar i provar risc de reconstrucció.",
        "Revisar qualitat i aprovar el conjunt.",
        "Publicar versions i gestionar correccions."
      ],
      "technology": [
        {
          "name": "Pipeline de dades agregades",
          "role": "Prepara conjunts separats i comprovables, amb regles de supressió, retard i tractament de canvis de cobertura."
        },
        {
          "name": "Controls de divulgació",
          "role": "Revisen grups petits i combinacions entre publicacions; les tècniques addicionals es trien segons el risc del conjunt."
        },
        {
          "name": "Catàleg i API de dades obertes",
          "role": "Publiquen definicions, versions i actualitzacions, amb un procediment per corregir dades o retirar una publicació defectuosa."
        }
      ],
      "pilot": "Preparar un conjunt d’activitat d’un servei amb dades de prova. Introduir grups petits i intentar reconstruir detalls combinant dues publicacions. Revisar també la interpretació amb una persona aliena a l’operació. Lliurar el conjunt candidat, les regles i el registre de revisió abans de qualsevol publicació real.",
      "tender": "Atos proposa publicar dades amb finalitat, indicadors i detall aprovats. La preparació és reproduïble i separada de la consulta operativa, amb controls de qualitat i divulgació, diccionari, cobertura, versions i correcció. Cadència, retard i exclusions es justifiquen per conjunt. L’obertura es planteja sempre subjecta a l’aprovació del responsable designat pel CTTI.",
      "acceptance": [
        "Els camps exclosos no apareixen en dades, metadades ni exportacions.",
        "Les combinacions de prova no recuperen el detall que s’havia decidit protegir.",
        "Una publicació es reconstrueix i es corregeix mantenint-ne la versió."
      ],
      "metrics": [
        "Conjunts publicats amb revisió i metadades completes.",
        "Incidències de qualitat i temps de correcció de la publicació."
      ],
      "dependencies": [
        "A3",
        "B4",
        "F3"
      ],
      "caution": "Un retard o un arrodoniment no acrediten anonimització universal. Cal analitzar el conjunt i les seves combinacions. La dada oberta necessita explicació perquè volum d’ús i qualitat del servei no es confonguin.",
      "evidence": [
        {
          "sourceId": "R28",
          "relatedSourceIds": [
            "INT10"
          ],
          "claim": "X-tee publica agregats de metadades d’intercanvi. GSA Site Scanning ofereix dades, API i exportacions de les seves comprovacions.",
          "transfer": "Atos proposa escollir quina informació de servei té utilitat pública i publicar-la amb definició, actualització, cobertura i límits coneguts. El detall operatiu restringit tindria un circuit diferent. Abans d’obrir dades, se’n comprovarien l’autorització i els possibles efectes de combinar-les. Els precedents mostren que una publicació útil pot ser parcial i agregada; no obliguen a exposar traces ni contingut dels tràmits."
        },
        {
          "sourceId": "R17",
          "claim": "GOV.UK Pay ofereix una vista pública de l’activitat de la plataforma i la seva cobertura.",
          "transfer": "Ajuda a començar per magnituds comprensibles del servei, amb definicions i actualització visibles."
        }
      ],
      "effort": "mitjà",
      "readiness": "En evolució"
    },
    {
      "id": "F3",
      "title": "Control sobre les dades i els accessos",
      "subtitle": "Identitats, polítiques de consulta i rutes d’ingesta fan comprovables la ubicació i l’ús de la telemetria.",
      "problem": "Una ubicació d’emmagatzematge acordada no explica tots els accessos, còpies o enviaments que es poden produir. La telemetria pot contenir identificadors, fragments de peticions o informació interna del servei. El CTTI necessita saber quines dades travessen cada frontera i qui pot consultar-les, també durant suport i administració.",
      "proposal": "Proposem classificar senyals i aplicar polítiques a la ingesta, l’emmagatzematge i la consulta. Les fonts i els processos s’identifiquen amb credencials de curta durada quan sigui viable. Les rutes permeten només destins autoritzats; el filtratge redueix camps sensibles abans de sortir de la zona. Els accessos de persones passen pel sistema d’identitat corporatiu i per permisos de servei. Les operacions privilegiades tenen traça i revisió. El mapa de dades inclou rèpliques, còpies, suport i subencarregats declarats. Les proves intenten exportar i consultar fora de l’àmbit permès i comproven el bloqueig.",
      "flow": [
        "Classificar senyals, actors i destins autoritzats.",
        "Filtrar camps i autenticar cada emissor.",
        "Aplicar permisos a rutes, còpies i consultes.",
        "Auditar accessos i provar intents fora de política."
      ],
      "technology": [
        {
          "name": "Identitat corporativa i SPIFFE/SPIRE quan encaixi",
          "role": "Relacionen persones i càrregues amb identitats verificables; les identitats de servei es renoven i es revoquen segons política."
        },
        {
          "name": "Control d’egress i polítiques d’accés",
          "role": "Limiten els destins de sortida i el detall consultable per servei, incloent comptes de suport i automatitzacions."
        },
        {
          "name": "Filtratge d’ingesta i auditoria independent",
          "role": "Redueixen camps sensibles i conserven evidència d’accés i canvi de polítiques en un àmbit protegit de l’operació ordinària."
        }
      ],
      "pilot": "Seleccionar una font amb camps sensibles simulats i dos perfils d’accés. Comprovar filtratge, consulta per servei, renovació de credencials i bloqueig d’un destí no autoritzat. Revisar el camí de còpies i suport. Lliurar el mapa de dades i un informe de proves que identifiqui excepcions i responsabilitats.",
      "tender": "Atos proposa documentar ubicació, fluxos, còpies i accessos de la telemetria, amb identitat, filtratge i autorització a les rutes i consultes acordades. La proposta inclou traça d’administració, revocació i proves de segregació, i explicita suport i tractaments externs. Sobirania i conservació es concreten amb el CTTI segons les dades, els serveis i el marc aplicable.",
      "acceptance": [
        "Un perfil d’un servei no consulta dades restringides d’un altre.",
        "Un destí no autoritzat queda bloquejat i l’intent és visible.",
        "Una credencial revocada deixa de funcionar dins del límit comprovat."
      ],
      "metrics": [
        "Fluxos i accessos coberts per política comprovada / fluxos inventariats.",
        "Temps de revocació efectiva i intents fora de política."
      ],
      "dependencies": [
        "A1",
        "A2"
      ],
      "caution": "La identitat tècnica no resol tota la sobirania. Les còpies, el suport remot i els drets contractuals requereixen comprovacions pròpies. El xifrat ha d’anar acompanyat d’un model clar de custòdia i accés a les claus.",
      "evidence": [
        {
          "sourceId": "R28",
          "relatedSourceIds": [
            "R08"
          ],
          "claim": "X-tee diferencia vistes d’operador, membres i informació pública. Nais incorpora instruccions de filtratge de dades sensibles a l’observació del navegador.",
          "transfer": "Atos proposa provar els permisos sobre consulta, exportació i suport, amb les mateixes restriccions que corresponguin a la font. Un equip rebria prou evidència per investigar sense obtenir per això accés d’intervenció. El pilot inclouria retirada de permisos i comprovació del resultat. Els exemples orienten el disseny; la classificació i les autoritzacions s’han de validar al CTTI."
        },
        {
          "sourceId": "R29",
          "claim": "SPIFFE defineix identitats criptogràfiques de curta durada per autenticar càrregues entre entorns heterogenis.",
          "transfer": "És una opció per al control d’emissors i processos. La ubicació i l’autorització de dades necessiten polítiques addicionals."
        },
        {
          "sourceId": "R33",
          "claim": "Cloud.gov documenta esdeveniments d’acció amb actor i temps, consultables per API segons permisos.",
          "transfer": "Aporta una referència pública d’auditoria exportable, sense acreditar per si sola tots els requisits de sobirania CTTI."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada",
      "addendum": {
        "title": "La delegació no amplia els permisos",
        "paragraphs": [
          "A la malla d’agents de C2, un agent també és una identitat amb permisos limitats. La delegació d’una tasca no amplia l’accés a dades ni a eines. Atos proposa comprovar-ho amb una crida permesa, una de denegada i una revocació, mantenint la traça i el procediment de recuperació."
        ],
        "evidence": [
          {
            "sourceId": "RT16",
            "claim": "Especifica interaccions entre agents i un Agent Card amb capacitats, habilitats i requisits d’autenticació.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "G1",
      "title": "Seguretat segons exposició explotable i context de servei",
      "subtitle": "El graf d’exposició combina actius, identitats i mitigacions per prioritzar camins d’atac amb impacte operatiu verificable.",
      "problem": "Els eixos de seguretat i obsolescència del model aportat poden guanyar utilitat si expliquen quins serveis continuen exposats i per què. Comptar vulnerabilitats ajuda a conèixer el volum pendent, però no identifica una ruta accessible fins a un actiu crític. Tampoc una mitigació declarada demostra que el camí s’hagi tancat ni que l’actiu obsolet hagi deixat de requerir tractament.",
      "proposal": "Proposem un cicle de gestió contínua de l’exposició a amenaces (CTEM), coordinat amb els responsables de ciberseguretat. L’inventari relaciona actius, versions, identitats, accessos de xarxa i serveis de negoci. S’hi afegeixen vulnerabilitats d’explotació coneguda i probabilitat estimada, mantenint aquests conceptes separats. El graf identifica camins plausibles i els ordena segons abast, criticitat i controls actius. Cada proposta de correcció o mitigació porta una comprovació prevista i una data de revisió. Les validacions autoritzades poden contrastar una mostra de camins en entorns controlats. L’Índex de Salut rep exposicions confirmades, desconegudes i mitigades, juntament amb antiguitat i cobertura, conservant els recomptes originals com a context.",
      "flow": [
        "Relacionar actius i identitats amb vulnerabilitats i serveis.",
        "Distingir explotació coneguda, probabilitat i accessibilitat observada.",
        "Prioritzar camins i assignar correcció o mitigació amb responsable.",
        "Comprovar el control i actualitzar exposició, antiguitat i estat del tractament."
      ],
      "technology": [
        {
          "name": "Graf d’actius, identitats i accessos",
          "role": "Relaciona inventari, permisos i connectivitat amb els serveis afectats, diferenciant connexions comprovades i hipòtesis pendents de validació."
        },
        {
          "name": "Catàleg CISA KEV i model FIRST EPSS",
          "role": "Aporten senyals diferents sobre explotació coneguda i probabilitat futura per enriquir la priorització, sense substituir el context de cada actiu."
        },
        {
          "name": "Emulació d’adversari amb Caldera o equivalent",
          "role": "Permet verificar controls sobre escenaris acordats en un entorn autoritzat, conservant evidències de detecció i de bloqueig."
        },
        {
          "name": "SBOM i declaracions VEX",
          "role": "Relacionen components i afectació declarada amb la versió real desplegada. La vigència i l’exposició efectiva s’han de validar."
        }
      ],
      "pilot": "Seleccionar un component comú i el seu conjunt limitat d’actius, amb els responsables d’operació i seguretat. Revisar versions, connectivitat, identitats i controls que ja existeixen. Construir uns quants camins representatius, contrastar-los amb els responsables i validar-ne una mostra sense afectar el servei. Lliurar una cua prioritzada de tractaments i una proposta d’indicadors que mostri per separat exposició, mitigació, correcció definitiva i informació encara desconeguda.",
      "tender": "Atos proposa relacionar actius, identitats, vulnerabilitats, controls i serveis en un model exportable, amb fonts i data de comprovació. La solució distingeix explotació coneguda, probabilitat estimada i exposició validada, i documenta la priorització. Cada mitigació manté responsable, vigència i prova d’eficàcia. Les validacions actives es limiten a l’abast autoritzat. El CTTI tindria el model, els resultats i el registre de decisions sobre el risc.",
      "acceptance": [
        "Una mitigació caducada torna a situar el camí en revisió.",
        "Un valor EPSS elevat no es presenta com explotació local confirmada.",
        "El quadre distingeix actius corregits, mitigats i sense prou informació."
      ],
      "metrics": [
        "Dies d’exposició oberta per servei i nivell de criticitat.",
        "Camins prioritzats amb controls comprovats / camins seleccionats."
      ],
      "dependencies": [
        "B3"
      ],
      "caution": "El graf pot ometre actius o permisos i donar una falsa sensació de tancament. Una mitigació compensatòria limita determinats camins; no elimina necessàriament la vulnerabilitat ni resol l’obsolescència del component que continua pendent.",
      "evidence": [
        {
          "sourceId": "CG15",
          "claim": "CISA manté un repositori oficial del catàleg KEV amb formats CSV i JSON i esquema publicat, actualitzat en relació amb la font canònica. És una entrada estructurada útil per reconèixer vulnerabilitats amb explotació coneguda i seguir canvis del catàleg.",
          "transfer": "Es pot integrar com a senyal extern de priorització. La presència o absència d’una vulnerabilitat al catàleg no determina l’exposició real d’un actiu CTTI."
        },
        {
          "sourceId": "CG16",
          "claim": "FIRST defineix EPSS com una probabilitat estimada d’explotació d’una CVE durant els trenta dies següents. Publica valors diaris, percentils i mecanismes d’accés oberts, facilitant-ne la incorporació a processos de tractament de vulnerabilitats basats en dades.",
          "transfer": "Ajuda a ordenar treball juntament amb criticitat i accessibilitat. El seu valor no és una probabilitat específica d’atac reeixit contra un servei del CTTI."
        },
        {
          "sourceId": "CG17",
          "claim": "MITRE descriu Caldera com una plataforma oberta d’emulació d’adversaris basada en ATT&CK per provar defenses i anuncia el trasllat a Apache Incubator el 2026. La documentació acredita el mecanisme de validació, sense quantificar eficàcia en el nostre entorn.",
          "transfer": "Es pot considerar una eina de prova acotada, o equivalent. La proposta no pressuposa autorització per executar-la ni pressuposa la selecció d’aquest producte."
        },
        {
          "sourceId": "TEC_SBOM",
          "claim": "CISA descriu l’ús d’inventaris de components com a base de transparència del programari.",
          "transfer": "Atos proposa relacionar-los amb la versió desplegada i l’exposició del servei; una declaració de vulnerabilitat no substitueix la comprovació del context."
        },
        {
          "sourceId": "INT07",
          "relatedSourceIds": [],
          "claim": "El centre d’operacions de RIA agrega una visió de servei, mentre cada institució manté responsabilitats pròpies. RIA també té competències de ciberseguretat.",
          "transfer": "Atos proposa relacionar exposició, component i servei afectat perquè els responsables competents puguin prioritzar amb context. El CdC compartiria evidències dins del seu abast, mantenint els circuits amb seguretat i operadors. El cas estonià ajuda a explicar la coordinació; no acredita el nostre model de priorització ni justifica atribuir al CdC funcions de l’Agència o del SOC."
        }
      ],
      "effort": "alt",
      "readiness": "Consolidada",
      "addendum": {
        "title": "Activitat real al costat del context de seguretat",
        "paragraphs": [
          "En Linux compatible, Atos proposa contrastar una part del graf amb esdeveniments d’execució i connexions recollits amb eBPF, per exemple amb Tetragon. Això aporta evidència d’activitat real associada al servei. El pilot començarà en observació i compartirà les evidències amb l’equip de seguretat, sense activar bloqueigs automàtics ni duplicar les funcions ja cobertes per les eines actuals."
        ],
        "evidence": [
          {
            "sourceId": "RT08",
            "claim": "Utilitza eBPF per observar execucions, crides de sistema i activitat de xarxa i fitxers en Linux, amb context Kubernetes quan s’hi desplega.",
            "transfer": "Atos pren aquesta capacitat com a referència per al pilot, amb compatibilitat i abast per validar."
          }
        ],
        "technology": [],
        "proofs": []
      }
    },
    {
      "id": "G2",
      "title": "Experiència d’ús i monitorització sintètica",
      "subtitle": "Seguir el recorregut des de la seu fins al tràmit i contrastar-lo amb allò que els usuaris expliquen al SAU.",
      "problem": "Una comprovació HTTP correcta pot conviure amb un tràmit que falla en identificar-se o adjuntar un document. Les sondes existents al context CTTI ofereixen una base, però els recorreguts s’han de relacionar amb finalització efectiva, dependències i tipus d’accés. Els tràmits de poc volum necessiten observació programada; els de gran ús requereixen contrastar-la amb l’experiència real de col·lectius diversos.",
      "proposal": "Atos proposa recorreguts per servei i criticitat, amb passos, comptes de prova i èxit funcional definit. Les sondes executen des de punts independents i separen DNS, connexió, autenticació, dependències i resposta de l’aplicació. Comparar seu, Internet i núvol ajuda a delimitar una afectació parcial; les mesures dels equips i operadors completen el camí de xarxa. Les dades reals de navegació es recullen amb minimització, sense contingut dels formularis, i separades del trànsit sintètic. Un pilot complementari agrupa avisos SAU autoritzats per servei, temps i ubicació: els contrasta amb les fonts disponibles i fa explícita l’absència de telemetria, sense retardar el circuit ordinari d’avís i escalat. El SAU aporta el context, el CdC el contrasta i coordina la resposta, i els responsables funcionals valoren l’impacte. Si falla una sonda, se’n comprova també la salut.",
      "flow": [
        "Definir recorregut crític, passos i dades de prova controlades.",
        "Executar sondes des de punts independents i mesurar cada pas.",
        "Contrastar amb navegació real agregada per context d’accés.",
        "Relacionar degradació, dependències i evidència amb l’objectiu del servei."
      ],
      "technology": [
        {
          "name": "Navegador automatitzat, com Playwright o Selenium",
          "role": "Executa passos reals de la interfície amb comptes de prova, registra errors i permet identificar on s’interromp el recorregut."
        },
        {
          "name": "Monitorització d’usuaris reals i mètriques web",
          "role": "Mesura navegació i interacció amb minimització de dades, diferenciant dispositius i canals per detectar degradacions que el laboratori no reprodueix."
        },
        {
          "name": "Correlació amb traces distribuïdes",
          "role": "Connecta la petició de prova o sessió autoritzada amb les dependències del servei, accelerant el diagnòstic del pas que falla."
        },
        {
          "name": "Sondes de xarxa i dependències externes",
          "role": "Eines com ThousandEyes, Kentik o perfSONAR aporten mesures des de punts diferents. La cobertura real depèn de la ubicació de les sondes, les proves admeses i les dades disponibles de cada operador."
        },
        {
          "name": "Agrupació d’avisos SAU amb revisió humana",
          "role": "Relaciona informes semblants i els contrasta amb el servei, el temps i la telemetria. Utilitza tiquets autoritzats i minimitzats; conserva l’enllaç restringit a la font per poder verificar l’avís."
        }
      ],
      "pilot": "Triar amb el responsable funcional un recorregut crític documentat a PCN&ME, amb identitat o notificació compartida. Acordar comptes, dades de prova i neteja de registres. Executar-lo des d’una seu, un punt extern i l’entorn de destinació; provar en un entorn autoritzat una fallada de DNS, retard de xarxa, bloqueig d’accés i error d’aplicació. Comparar amb dades reals agregades, comprovar una fallada de sonda i l’accés posterior a un canvi de certificat o identitat. Com a segona fase, reproduir un període de tiquets SAU minimitzats: valorar si els grups d’avisos haurien ajudat a detectar incidents coneguts i quins falsos avisos generen. Lliurar scripts, passos, punts cecs i resultats verificables.",
      "tender": "Atos proposa recorreguts crítics versionats, amb èxit funcional definit, punts d’execució independents i mesures per pas. La solució separa trànsit sintètic i real, controla comptes i dades de prova i observa les sondes. La recollida s’ajusta a la finalitat de diagnòstic. La proposta inclou scripts, configuracions, resultats exportables i documentació perquè el CTTI els mantingui davant de canvis d’aplicació o proveïdor.",
      "acceptance": [
        "Una resposta HTTP correcta amb tràmit incomplet es detecta com a fallada funcional.",
        "Una avaria de la sonda no es publica com una caiguda confirmada del servei.",
        "Les transaccions sintètiques queden separades del càlcul d’ús real.",
        "Si el recorregut inclou renovació de certificat o canvi d’identitat, es comprova l’accés funcional posterior amb els equips responsables.",
        "La prova distingeix un servei que respon al CPD d’un accés que falla en una seu, i mostra quins trams tenen evidència i quins queden sense observar.",
        "Un grup d’avisos SAU es pot contrastar amb les fonts autoritzades, fent explícita l’absència de telemetria i sense retardar el circuit ordinari. El nombre de queixes no determina automàticament gravetat ni causa."
      ],
      "metrics": [
        "Recorreguts crítics amb comprovació funcional completa / recorreguts prioritzats.",
        "Taxa de finalització i latència per pas, separades per font i context.",
        "Temps d’anticipació i falsos avisos del pilot SAU, comparats amb incidents confirmats."
      ],
      "dependencies": [
        "B3",
        "A6",
        "B7",
        "F3"
      ],
      "caution": "Els robots poden quedar bloquejats per autenticació multifactor, proteccions antiabús o canvis d’interfície. Les dades reals tenen biaixos de mostra; cal explicar cobertura i no extrapolar un dispositiu o navegador a tota la ciutadania. Les sondes no acrediten una avaria física de fibra: calen mesures òptiques o proves de l’operador. Els avisos SAU tenen biaix de participació i poden duplicar el mateix problema.",
      "evidence": [
        {
          "sourceId": "MKT06",
          "claim": "Detectr agrupa informes d’usuaris i suport com a complement de la detecció tècnica interna de Google.",
          "transfer": "Atos proposa començar amb un pilot de tiquets SAU autoritzats, sense rastrejar canals personals. El CdC contrastaria els grups amb les fonts disponibles, fent explícita l’absència de telemetria i sense retardar el circuit ordinari d’avís i escalat."
        },
        {
          "sourceId": "MKT05",
          "claim": "Els tribunals escocesos expliquen l’ús de ThousandEyes per completar el monitoratge d’audiències virtuals i treball híbrid.",
          "transfer": "Atos proposa contrastar el mateix recorregut des de punts diferents i compartir les evidències entre CdC, telecomunicacions i aplicacions, amb els límits de visibilitat declarats."
        },
        {
          "sourceId": "INT08",
          "relatedSourceIds": [
            "INT18"
          ],
          "claim": "VA.gov observa fallades silencioses de sol·licituds. perfSONAR contrasta latència, pèrdua i ruta entre xarxes gestionades per organitzacions diferents.",
          "transfer": "Atos proposa seguir un recorregut representatiu des d’una seu, Internet i la destinació, i relacionar-ne els símptomes amb el resultat funcional. Les sondes ajudarien a delimitar un tram degradat; els operadors aportarien les evidències de xarxa i fibra. Una resposta tècnica correcta no tancaria la comprovació del tràmit. Les proves actives tindrien freqüència i càrrega acordades."
        },
        {
          "sourceId": "CG18",
          "claim": "El manual de serveis de GOV.UK recomana mesurar el percentatge d’usuaris que completa una tasca i combinar comprovacions internes i externes. Explica que l’observació externa ha de continuar funcionant encara que caigui la infraestructura del servei monitoritzat.",
          "transfer": "Aporta criteris funcionals i d’independència de les sondes. La selecció de tràmits, comptes de prova i llindars d’acceptació correspon al CTTI."
        },
        {
          "sourceId": "CG19",
          "claim": "El cas de Mercado Libre publicat a web.dev explica l’ús de WebPageTest i Lighthouse per investigar bloquejos d’interacció, aplicar canvis i contrastar-ne l’efecte amb dades de persones reals. Distingueix explícitament mesures de laboratori i d’ús.",
          "transfer": "Es trasllada aquesta doble comprovació. És un cas comercial històric basat en FID; les mètriques actuals i els objectius dels tràmits s’han de definir de nou."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    },
    {
      "id": "G3",
      "title": "Pàgina d’estat dels components comuns",
      "subtitle": "Una màquina d’estats transforma evidències de servei en comunicacions coherents, amb historial i subscripció per component.",
      "problem": "Una pàgina d’estat només ajuda si reflecteix el servei que consumeixen els departaments i s’actualitza durant la incidència. Un indicador agregat verd pot ocultar una fallada territorial o d’una funció concreta. Al CTTI caldria acordar què significa cada estat, qui el confirma i com es publica quan la mateixa plataforma d’observabilitat o comunicació està afectada.",
      "proposal": "Proposem una màquina d’estats per component i funció amb funcionament normal, degradació, interrupció, manteniment i informació insuficient. Rep resultats de sondes, indicadors de servei i incidents validats. Les regles combinen impacte actual, persistència i cobertura de dades; el consum del pressupost d’error ajuda a prioritzar, però no converteix per si sol un incompliment històric en una caiguda actual. El CdC aporta l’estat operatiu; l’Àrea TIC, la gestió del servei i el responsable funcional participen en la validació segons el destinatari. El circuit diferencia seguiment intern, comunicació departamental i eventual publicació oberta, amb autoria i canvis registrats. Les subscripcions permeten triar components i rebre esdeveniments amb identificador estable. El canal de publicació manté una dependència mínima dels components que informa i disposa d’un procediment manual. La vista s’integraria amb els canals existents d’Àtom i SOSTIC quan correspongui; un dispositiu preventiu de PCN&ME no es presentaria com una incidència activa.",
      "flow": [
        "Rebre indicadors recents, sondes i incidents del component.",
        "Aplicar regles d’impacte, persistència i qualitat de la informació.",
        "Confirmar i publicar l’estat amb abast, hora i propera actualització.",
        "Notificar subscriptors i conservar historial de canvis i recuperació."
      ],
      "technology": [
        {
          "name": "Màquina d’estats versionada",
          "role": "Defineix transicions verificables i evita oscil·lacions, diferenciant degradació confirmada, manteniment i manca d’informació quan falla la telemetria."
        },
        {
          "name": "API d’estat i esdeveniments per webhook",
          "role": "Publica canvis amb identificadors i reintents controlats perquè altres sistemes puguin consumir-los sense duplicar comunicacions o perdre actualitzacions."
        },
        {
          "name": "Indicadors SLI i regles sobre SLO",
          "role": "Relacionen impacte actual i pressupost d’error amb la prioritat de resposta, mantenint separades disponibilitat present i fiabilitat acumulada."
        }
      ],
      "pilot": "Seleccionar dos components compartits i definir amb els departaments les funcions que necessiten veure. Construir una pàgina interna i provar estats amb incidències històriques, una fallada parcial i absència de telemetria. Registrar una subscripció de prova i simular errors d’entrega. Assajar una actualització manual quan cau la font de dades. El lliurable serà la pàgina, l’API, les regles de transició i un procediment de comunicació amb responsabilitats i criteris de recuperació.",
      "tender": "Atos proposa mostrar l’estat per component i funció, amb definicions acordades, evidència temporal, historial, manteniments i subscripcions. La solució distingeix absència de dades d’indisponibilitat i permet actualitzacions manuals amb autoria. Inclou API documentada, regles versionades, historial exportable i proves de continuïtat del canal. L’abast inicial és intern; la publicació externa i el contingut visible es decideixen segons el govern de comunicació del CTTI.",
      "acceptance": [
        "Una fallada parcial identifica la funció afectada sense marcar tot el conjunt com a caigut.",
        "La falta de telemetria produeix estat desconegut o informació insuficient.",
        "La recuperació genera un únic esdeveniment identificable i queda a l’historial."
      ],
      "metrics": [
        "Temps entre impacte confirmat i primera actualització útil.",
        "Canvis d’estat sense evidència o corregits posteriorment / total publicat."
      ],
      "dependencies": [
        "B3",
        "G2",
        "E2"
      ],
      "caution": "La disponibilitat històrica i l’estat present responen preguntes diferents. Un pressupost d’error esgotat pot conviure amb un servei recuperat; les regles han d’evitar comunicar una caiguda actual només per un indicador acumulat.",
      "evidence": [
        {
          "sourceId": "INT09",
          "relatedSourceIds": [
            "INT11"
          ],
          "claim": "Login.gov publica un circuit per actualitzar l’estat del servei. GC Notify descriu incidents i diferencia estats de missatge.",
          "transfer": "Atos proposa mostrar quin component està afectat, des de quan, quins consumidors poden notar-ho i quan s’ha comprovat la informació. La recuperació tècnica i els casos pendents de completar tindrien seguiment diferenciat. Qui comunica l’estat disposaria d’evidència validada i d’un canal alternatiu si falla la plataforma principal. Els exemples no converteixen una estimació d’impacte en una xifra confirmada."
        },
        {
          "sourceId": "CG20",
          "claim": "La pàgina operativa de GOV.UK Notify separa API, web, enviament i recepció de notificacions, mostra incidències passades i permet subscriure’s a canvis per diversos canals, incloent webhook i feeds. És un servei públic compartit amb consumidors identificables.",
          "transfer": "Aporta un exemple concret de comunicació per component. La font no revela com calcula els estats; la nostra màquina d’estats és una proposta pròpia."
        },
        {
          "sourceId": "CG21",
          "claim": "Google explica alertes basades en la velocitat de consum del pressupost d’error i diverses finestres temporals. També descriu problemes de mostres petites en serveis amb poc trànsit i diferencia avisos urgents de treball que pot esperar.",
          "transfer": "En podem adoptar el vincle entre senyal i urgència. El capítol tracta alertes, de manera que no prescriu els estats ni el procés editorial de la pàgina."
        }
      ],
      "effort": "mitjà",
      "readiness": "Consolidada"
    }
  ],
  "sources": [
    {
      "id": "R01",
      "title": "Why and How eBay Pivoted to OpenTelemetry",
      "publisher": "eBay Engineering",
      "url": "https://innovation.ebayinc.com/stories/why-and-how-ebay-pivoted-to-opentelemetry/",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Migració de la recollida de mètriques cap a OpenTelemetry amb equivalència funcional i comparació entre camins de captura.",
      "limitation": "La migració dels logs encara era en curs a la data del relat; no documenta una sortida contractual completa.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R02",
      "title": "OpenTelemetry semantic conventions",
      "publisher": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/specs/semconv/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Convencions compartides per representar recursos, operacions i atributs de telemetria.",
      "limitation": "L’estabilitat varia entre famílies. Cal fixar versions i provar les migracions.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R03",
      "title": "Resiliency",
      "publisher": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/collector/resiliency/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Cues, reintents, persistència i supervisió del Collector per gestionar interrupcions de la ingesta.",
      "limitation": "Una cua plena, un disc avariat o un temps de reintent esgotat poden provocar pèrdua de dades.",
      "date": "2026-01-14",
      "accessed": "2026-09-09"
    },
    {
      "id": "R04",
      "title": "M3: Uber’s Open Source, Large-scale Metrics Platform for Prometheus",
      "publisher": "Uber Engineering",
      "url": "https://www.uber.com/in/en/blog/m3/",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Plataforma de mètriques amb retenció i agregació configurables, compatibilitat amb sistemes anteriors i consulta entre regions.",
      "limitation": "Cas històric de 2018; la dimensió d’Uber no és una hipòtesi de càrrega del CTTI.",
      "date": "2018-08-07",
      "accessed": "2026-09-09"
    },
    {
      "id": "R05",
      "title": "Elasticsearch data tiers",
      "publisher": "Elastic",
      "url": "https://www.elastic.co/docs/manage-data/lifecycle/data-tiers",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Classes d’emmagatzematge que ajusten velocitat de consulta i recursos a l’ús de les dades.",
      "limitation": "El cost, les llicències i el temps real de recuperació depenen del desplegament.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R06",
      "title": "GitOps Principles",
      "publisher": "OpenGitOps / CNCF",
      "url": "https://opengitops.dev/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Estat desitjat declarat, versionat i reconciliat automàticament amb el desplegament.",
      "limitation": "Principis d’implementació, no prova d’una adopció concreta al CTTI.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R07",
      "title": "Unit testing for rules",
      "publisher": "Prometheus",
      "url": "https://prometheus.io/docs/prometheus/latest/configuration/unit_testing_rules/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Proves de regles a partir de sèries d’entrada i resultats esperats amb promtool.",
      "limitation": "Les proves de regles no comproven per si soles la recepció de l’avís ni la resposta humana.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R08",
      "title": "Nais: l’observabilitat forma part de la plataforma",
      "publisher": "NAV / equip Nais",
      "url": "https://doc.nais.io/observability/frontend/",
      "country": "Noruega",
      "kind": "Cas operatiu",
      "summary": "Nais combina OpenTelemetry amb eines per a logs, traces, mètriques i experiència de navegador. La guia de frontend documenta Faro, instruccions de filtratge de dades sensibles i un abast que exclou els clústers on-premises.",
      "limitation": "La disponibilitat de la plataforma no acredita cobertura universal. Els límits de cada entorn s’han de conservar; la instrumentació no defineix el resultat administratiu.",
      "date": "2026-07-06",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Actualització documentada al catàleg de recerca",
      "relatedLinks": [
        "https://doc.nais.io/observability/how-to/auto-instrumentation/",
        "https://docs.nav.cloud.nais.io/observability/index.html",
        "https://nais.io/log/"
      ]
    },
    {
      "id": "R09",
      "title": "OpenTelemetry eBPF Instrumentation",
      "publisher": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/zero-code/obi/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Documenta entorns Linux compatibles, requisits de nucli, arquitectura, BTF i privilegis, i captura automàtica d’activitat d’aplicació i xarxa.",
      "limitation": "No suporta Windows ni macOS i no substitueix tota la instrumentació de llenguatge o de negoci. Cal comprovar cada protocol i runtime.",
      "date": "2026-08-25",
      "accessed": "2026-09-15"
    },
    {
      "id": "R10",
      "title": "Elasticsearch connector",
      "publisher": "Trino",
      "url": "https://trino.io/docs/current/connector/elasticsearch.html",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Connector que permet consultar dades d’Elasticsearch des de SQL a Trino.",
      "limitation": "Cal comprovar versions, tipus de dades, permisos i cost de les consultes federades.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R11",
      "title": "Shipping Spotify’s Culture: 5 Plugins (and 4 Principles) for Supercharging Developer Experience at Scale",
      "publisher": "Spotify Engineering",
      "url": "https://engineering.atspotify.com/2022/12/shipping-spotifys-culture-5-plugins-and-4-principles-for-supercharging-developer-experience-at-scale",
      "country": "Suècia",
      "kind": "Cas operatiu",
      "summary": "Explica comprovacions de qualitat, intercanvi de coneixement i participació dels equips a Backstage.",
      "limitation": "Combina experiència interna amb presentació comercial de plugins; no tots tenen el mateix origen.",
      "date": "2022-12-15",
      "accessed": "2026-09-09"
    },
    {
      "id": "R12",
      "title": "Policy Testing",
      "publisher": "Open Policy Agent",
      "url": "https://www.openpolicyagent.org/docs/policy-testing",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Proves reproduïbles de polítiques, casos parametritzats i informes de resultats i cobertura.",
      "limitation": "Una política ben provada encara depèn de la qualitat i vigència de les dades d’entrada.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R13",
      "title": "Policy Exceptions",
      "publisher": "Kyverno",
      "url": "https://kyverno.io/docs/guides/exceptions/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Excepcions explícites per recurs i política, amb condicions i registre dels resultats.",
      "limitation": "L’aprovació, la caducitat i el circuit de deute s’han de dissenyar; no són una funció automàtica completa.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R14",
      "title": "Observability at Scale: Building Uber’s Alerting Ecosystem",
      "publisher": "Uber Engineering",
      "url": "https://www.uber.com/gb/en/blog/observability-at-scale/",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Plataforma compartida d’alertes que combina mètriques, comprovacions de hosts i canals de notificació.",
      "limitation": "Relat de 2018. Les regles de responsabilitat i escalat proposades per al CTTI són pròpies.",
      "date": "2018-11-20",
      "accessed": "2026-09-09"
    },
    {
      "id": "R15",
      "title": "Managing Incidents",
      "publisher": "Google SRE",
      "url": "https://sre.google/sre-book/managing-incidents/",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Rols diferenciats, registre viu de l’incident i traspàs explícit del comandament.",
      "limitation": "La pràctica organitzativa no aporta per si sola una integració amb les eines del CTTI.",
      "date": "2016",
      "accessed": "2026-09-09"
    },
    {
      "id": "R16",
      "title": "Postmortem Culture: Learning from Failure",
      "publisher": "Google SRE",
      "url": "https://sre.google/sre-book/postmortem-culture/",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Revisió col·laborativa d’incidents centrada en causes contribuents i accions de millora.",
      "limitation": "És experiència publicada per l’operador, no una garantia de reducció d’incidents en un altre entorn.",
      "date": "2016",
      "accessed": "2026-09-09"
    },
    {
      "id": "R17",
      "title": "Performance data",
      "publisher": "GOV.UK Pay",
      "url": "https://www.payments.service.gov.uk/performance/",
      "country": "Regne Unit",
      "kind": "Cas operatiu",
      "summary": "Publicació de serveis actius, transaccions i imports processats per una plataforma pública de pagaments.",
      "limitation": "Les magnituds d’activitat no demostren disponibilitat ni experiència satisfactòria per si soles.",
      "date": "2026-09-07",
      "accessed": "2026-09-09",
      "sectorPublic": true
    },
    {
      "id": "R18",
      "title": "Digital Performance Standard",
      "publisher": "Digital Transformation Agency",
      "url": "https://www.digital.gov.au/policy/digital-experience/digital-performance-standard",
      "country": "Austràlia",
      "kind": "Marc públic",
      "summary": "Marc públic per mesurar, compartir i utilitzar el rendiment dels serveis digitals en la seva millora.",
      "limitation": "És una política australiana, no una obligació del CTTI ni evidència d’una arquitectura desplegada.",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "sectorPublic": true
    },
    {
      "id": "R19",
      "title": "Delivery times",
      "publisher": "GOV.UK Notify",
      "url": "https://www.notifications.service.gov.uk/using-notify/delivery-times",
      "country": "Regne Unit",
      "kind": "Cas operatiu",
      "summary": "Compromisos d’enviament de missatges i distinció entre enviament al proveïdor i recepció al destinatari.",
      "limitation": "El 95% en deu segons descriu enviament d’email i SMS, no lliurament final garantit.",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "sectorPublic": true
    },
    {
      "id": "R21",
      "title": "What is FOCUS?",
      "publisher": "FinOps Foundation",
      "url": "https://focus.finops.org/what-is-focus/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Especificació comuna per normalitzar dades de facturació i ús de tecnologia.",
      "limitation": "Calen fonts operatives addicionals per calcular el cost de cada servei observat.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R22",
      "title": "OpenCost Specification",
      "publisher": "OpenCost",
      "url": "https://opencost.io/docs/specification/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Model de costos de Kubernetes que separa recursos, càrregues, capacitat ociosa i costos generals.",
      "limitation": "No cobreix automàticament llicències, persones ni tot l’entorn fora de Kubernetes.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R23",
      "title": "Eliminating Toil",
      "publisher": "Google SRE",
      "url": "https://sre.google/sre-book/eliminating-toil/",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Defineix el treball operatiu manual i repetitiu i explica la reserva de capacitat per fer millores duradores.",
      "limitation": "El model de dedicació de Google no és un dimensionament contractual transferible.",
      "date": "2016",
      "accessed": "2026-09-09"
    },
    {
      "id": "R24",
      "title": "Journey of next generation control plane for data systems",
      "publisher": "LinkedIn Engineering",
      "url": "https://www.linkedin.com/blog/engineering/infrastructure/journey-of-next-generation-control-plane-for-data-systems",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Nuage evoluciona de l’autoservei a la gestió del cicle de vida dels recursos amb propietat, polítiques i auditoria.",
      "limitation": "L’arquitectura reflecteix necessitats de LinkedIn; no és un producte llest per integrar al CTTI.",
      "date": "2025-03-21",
      "accessed": "2026-09-09"
    },
    {
      "id": "R25",
      "title": "Backstage 101",
      "publisher": "Spotify for Backstage",
      "url": "https://backstage.spotify.com/discover/backstage-101/",
      "country": "Suècia",
      "kind": "Documentació tècnica",
      "summary": "Presentació del catàleg de programari, les plantilles i les integracions d’un portal de desenvolupadors.",
      "limitation": "La plataforma s’ha de configurar i operar; un portal per si sol no automatitza les eines existents.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R26",
      "title": "Monitoring",
      "publisher": "openDesk / ZenDiS",
      "url": "https://docs.opendesk.eu/operations/monitoring/",
      "country": "Alemanya",
      "kind": "Documentació tècnica",
      "summary": "El projecte públic openDesk distribueix integració Prometheus, regles d’alerta i dashboards Grafana configurables.",
      "limitation": "La cobertura varia per component, tal com mostra la matriu publicada.",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "sectorPublic": true
    },
    {
      "id": "R27",
      "title": "Knowledge is power: Introducing Backstage Learn",
      "publisher": "Spotify for Backstage",
      "url": "https://backstage.spotify.com/discover/blog/knowledge-is-power-introducing-backstage-learn",
      "country": "Suècia",
      "kind": "Documentació tècnica",
      "summary": "Formació pràctica per posar en marxa Backstage, integrar programari i crear plantilles.",
      "limitation": "La documentació formativa no prova una millora quantitativa d’adopció.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R28",
      "title": "X-tee: dependències visibles amb metadades d’intercanvi",
      "publisher": "RIA / NIIS / membres de X-tee",
      "url": "https://github.com/nordic-institute/X-Road-Metrics",
      "country": "Estònia / cooperació nòrdica",
      "kind": "Cas operatiu",
      "summary": "X-tee publica mètriques dels intercanvis a partir de metadades operatives. El sistema diferencia les vistes de l’operador i dels membres; les dades públiques agregades no són el contingut dels missatges.",
      "limitation": "L’exportació pública no és un canal d’incidents en temps real. El model estonià no determina els permisos ni la classificació de dades del CTTI.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació i repositoris documentats",
      "dateNote": "Consulta de repositori i portal operatiu; sense data única de publicació",
      "relatedLinks": [
        "https://logs.x-tee.ee/EE/"
      ]
    },
    {
      "id": "R29",
      "title": "SPIFFE Overview",
      "publisher": "SPIFFE",
      "url": "https://spiffe.io/docs/latest/spiffe-about/overview/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Identitats criptogràfiques de curta durada per autenticar càrregues de treball entre entorns.",
      "limitation": "L’autenticació no decideix sola on resideixen les dades ni qui està autoritzat a consultar-les.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R30",
      "title": "Trace Context",
      "publisher": "W3C",
      "url": "https://www.w3.org/TR/trace-context/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Estàndard per transmetre context de traça entre components i proveïdors compatibles.",
      "limitation": "Un identificador comú no acredita causalitat ni completa les traces que no s’han recollit.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R31",
      "title": "Locking objects with Object Lock",
      "publisher": "Amazon Web Services",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Protecció de versions d’objectes contra eliminació o sobreescriptura durant la retenció configurada.",
      "limitation": "Requereix versionat i permisos correctes; immutable no vol dir correcte, complet ni recuperable.",
      "date": "s.d.",
      "accessed": "2026-09-09"
    },
    {
      "id": "R32",
      "title": "Log drains",
      "publisher": "Cloud.gov / GSA",
      "url": "https://docs.cloud.gov/platform/logs/log-drains/",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "summary": "La plataforma pública permet enviar logs d’aplicació a un destí propi per syslog-TLS o HTTPS.",
      "limitation": "El camí documentat exclou esdeveniments d’auditoria i logs dels serveis gestionats.",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "sectorPublic": true
    },
    {
      "id": "R33",
      "title": "Auditing activity",
      "publisher": "Cloud.gov / GSA",
      "url": "https://docs.cloud.gov/platform/compliance/auditing-activity/",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "summary": "Esdeveniments d’acció amb actor i temps, consultables o exportables per API segons permisos.",
      "limitation": "La cobertura depèn de l’àmbit d’esdeveniment i dels permisos; no és una traça universal de tota activitat.",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "sectorPublic": true
    },
    {
      "id": "CG01",
      "title": "Emerging Skills for Agentic AI Operations",
      "publisher": "Gartner",
      "url": "",
      "date": "2026-08-26",
      "accessed": "2026-09-09",
      "country": "Internacional",
      "kind": "Recerca",
      "summary": "Organitza AgentOps en governança, orquestració i optimització; incorpora cicle de vida, observabilitat, avaluació, identitat, costos i fiabilitat.",
      "limitation": "Document privat aportat: Emerging Skills for Agentic AI Operations.pdf. Marc analític; no acredita desplegaments al CTTI."
    },
    {
      "id": "CG02",
      "title": "AIOpsLab: A Holistic Framework for Evaluating AI Agents for Enabling Autonomous Cloud",
      "publisher": "Microsoft Research i investigadors de UIUC, UC Berkeley i IISc",
      "url": "https://www.microsoft.com/en-us/research/uploads/prod/2024/10/AIOpsLab-6705feab5dcdb.pdf",
      "date": "2024-10",
      "accessed": "2026-09-09",
      "country": "Estats Units / Índia",
      "kind": "Recerca",
      "summary": "Entorn per avaluar agents d’operacions amb càrrega, injecció de fallades, telemetria i interacció amb aplicacions de microserveis.",
      "limitation": "Avaluació experimental; els resultats del banc de proves no equivalen a fiabilitat demostrada en producció."
    },
    {
      "id": "CG03",
      "title": "Building effective agents",
      "publisher": "Anthropic",
      "url": "https://www.anthropic.com/engineering/building-effective-agents",
      "date": "2024-12-19",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "summary": "Explica composició de funcions, encaminament, punts de comprovació, interfícies d’eines i límits d’iteració.",
      "limitation": "Patrons d’enginyeria; els exemples no són un servei desplegat al CTTI."
    },
    {
      "id": "CG04",
      "title": "Tools",
      "publisher": "Model Context Protocol",
      "url": "https://modelcontextprotocol.io/specification/2025-11-25/server/tools",
      "date": "2025-11-25",
      "accessed": "2026-09-09",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Defineix descoberta i invocació d’eines, esquemes d’entrada i sortida, errors i controls d’accés.",
      "limitation": "Una interfície comuna no assegura semàntica equivalent ni autoritza les accions que exposa."
    },
    {
      "id": "CG05",
      "title": "5 things we learned testing GOV.UK Chat: an AI assistant for government",
      "publisher": "Government Digital Service",
      "url": "https://insidegovuk.blog.gov.uk/2026/03/16/5-things-we-learned-testing-gov-uk-chat-an-ai-assistant-for-government/",
      "date": "2026-03-16",
      "accessed": "2026-09-09",
      "country": "Regne Unit",
      "kind": "Cas operatiu",
      "summary": "Resultats de dos pilots públics: avaluació amb experts i usuaris, comprovació de fonts, qualitat, confiança i latència.",
      "limitation": "Assistència informativa pública; no és automatització del centre de control ni garantia d’absència d’errors.",
      "sectorPublic": true
    },
    {
      "id": "CG06",
      "title": "We simplified data discovery with LLMs. Here’s how.",
      "publisher": "Grab",
      "url": "https://www.grab.com/inside-grab/stories/internal-data-llms-engineering-software/",
      "date": "2024-10-03",
      "accessed": "2026-09-09",
      "country": "Singapur",
      "kind": "Cas operatiu",
      "summary": "Descriu documentació generada amb revisió dels responsables i un assistent RAG intern de descoberta de dades.",
      "limitation": "Descoberta de dades corporatives; no acredita diagnòstic d’incidències ni les millores quantitatives del nostre pilot."
    },
    {
      "id": "CG07",
      "title": "OpenTelemetry GenAI Semantic Conventions",
      "publisher": "OpenTelemetry",
      "url": "https://github.com/open-telemetry/semantic-conventions-genai",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Repositori de convencions de traces, mètriques i esdeveniments per a IA generativa, clients de models i MCP.",
      "limitation": "Especificació en evolució. Cal fixar versions i comprovar compatibilitat dels instruments utilitzats."
    },
    {
      "id": "CG08",
      "title": "Navigating the LLM Landscape: Uber’s Innovation with GenAI Gateway",
      "publisher": "Uber Engineering",
      "url": "https://www.uber.com/us/en/blog/genai-gateway/",
      "date": "2024-07-11",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Passarel·la usada internament per accedir a diversos models amb autorització, mètriques, atribució de costos i filtratge de dades.",
      "limitation": "Arquitectura pròpia d’Uber; no avala intercanvi de models sense reavaluar-ne el comportament."
    },
    {
      "id": "CG09",
      "title": "Monitoring Distributed Systems",
      "publisher": "Google SRE",
      "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
      "date": "2016",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Experiència SRE sobre senyals útils, efectes del soroll i simplicitat del camí que activa la resposta humana.",
      "limitation": "Criteris d’operació, no percentatge universal de reducció del soroll."
    },
    {
      "id": "CG10",
      "title": "Alertmanager",
      "publisher": "Prometheus",
      "url": "https://prometheus.io/docs/alerting/latest/alertmanager/",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Documenta agrupació, deduplicació, encaminament, inhibició i silenciaments temporals de notificacions.",
      "limitation": "Capacitats de programari; la correcció de cada regla depèn del servei i de la configuració."
    },
    {
      "id": "CG11",
      "title": "AI debugging at Meta with HawkEye",
      "publisher": "Meta Engineering",
      "url": "https://engineering.fb.com/2023/12/19/data-infrastructure/hawkeye-ai-debugging-meta/",
      "date": "2023-12-19",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Relaciona anomalies de producte amb models, versions, característiques i llinatge de dades en fluxos de diagnòstic guiats.",
      "limitation": "Cas d’infraestructura d’aprenentatge automàtic; no un agent general que resol qualsevol incidència."
    },
    {
      "id": "CG12",
      "title": "PyRCA: A Python library for Root Cause Analysis",
      "publisher": "Salesforce",
      "url": "https://github.com/salesforce/PyRCA",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "summary": "Biblioteca de diagnòstic sobre mètriques, grafs causals i coneixement expert; inclou comparacions amb dades simulades.",
      "limitation": "El repositori se centra en mètriques. Els resultats simulats no demostren precisió sobre logs de producció."
    },
    {
      "id": "CG13",
      "title": "QueryGPT – Natural Language to SQL Using Generative AI",
      "publisher": "Uber Engineering",
      "url": "https://www.uber.com/gb/en/blog/query-gpt/",
      "date": "2024-09-19",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Cas operatiu",
      "summary": "Descriu agents especialitzats per interpretar preguntes i generar SQL, i avaluacions d’intenció, taules, execució i resultat.",
      "limitation": "Desplegament limitat relatat el 2024; persisteixen al·lucinacions i no acredita generació autònoma de dashboards fiables."
    },
    {
      "id": "CG14",
      "title": "Vega-Lite View Specification",
      "publisher": "Vega-Lite",
      "url": "https://vega.github.io/vega-lite/docs/spec.html",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Especificació declarativa de visualitzacions en JSON, amb dades, transformacions, composició i esquema validable.",
      "limitation": "La validesa de l’esquema no comprova que un gràfic respongui correctament la pregunta de negoci."
    },
    {
      "id": "CG15",
      "title": "Welcome to kev-data",
      "publisher": "CISA",
      "url": "https://github.com/cisagov/kev-data",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Marc públic",
      "summary": "Repositori oficial amb dades i esquema del catàleg de vulnerabilitats d’explotació coneguda en CSV i JSON.",
      "limitation": "L’absència al catàleg no demostra absència d’explotació ni seguretat d’un actiu concret."
    },
    {
      "id": "CG16",
      "title": "Exploit Prediction Scoring System (EPSS)",
      "publisher": "FIRST",
      "url": "https://www.first.org/epss/",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Internacional",
      "kind": "Recerca",
      "summary": "Model que estima diàriament la probabilitat d’explotació d’una CVE durant els trenta dies següents i publica API i dades.",
      "limitation": "La probabilitat global no és una prova d’explotabilitat ni d’impacte a la infraestructura del CTTI."
    },
    {
      "id": "CG17",
      "title": "MITRE Contributes Caldera to Apache Incubator to Expand Open Cybersecurity",
      "publisher": "MITRE",
      "url": "https://caldera.mitre.org/",
      "date": "2026-05-20",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "summary": "Descriu l’emulació d’adversaris basada en ATT&CK i la transferència de Caldera a Apache Incubator.",
      "limitation": "Capacitat de validació en entorns autoritzats; no acredita un desplegament concret de gestió d’exposició."
    },
    {
      "id": "CG18",
      "title": "Monitoring the status of your service",
      "publisher": "Government Digital Service",
      "url": "https://www.gov.uk/service-manual/technology/monitoring-the-status-of-your-service",
      "date": "2024-10-23",
      "accessed": "2026-09-09",
      "country": "Regne Unit",
      "kind": "Marc públic",
      "summary": "Recomana mesurar finalització de tasques i combinar comprovacions internes i externes que sobrevisquin a la infraestructura monitoritzada.",
      "limitation": "Guia de servei britànica; els llindars i recorreguts s’han de decidir per cada servei CTTI.",
      "sectorPublic": true
    },
    {
      "id": "CG19",
      "title": "How Mercado Libre optimized for Web Vitals (TBT/FID)",
      "publisher": "Google web.dev, amb el cas de l’equip de Mercado Libre",
      "url": "https://web.dev/case-studies/how-mercadolibre-optimized-web-vitals",
      "date": "2020-09-21",
      "accessed": "2026-09-09",
      "country": "Argentina / Amèrica Llatina",
      "kind": "Cas publicat pel proveïdor",
      "summary": "Descriu diagnòstic amb WebPageTest i Lighthouse, modificacions de JavaScript i contrast del resultat amb mesures d’usuaris reals.",
      "limitation": "Cas històric basat en FID; no s’ha de presentar aquesta mètrica com l’indicador actual d’interacció."
    },
    {
      "id": "CG20",
      "title": "GOV.UK Notify Status",
      "publisher": "Government Digital Service",
      "url": "https://status.notifications.service.gov.uk/",
      "date": "s.d.",
      "accessed": "2026-09-09",
      "country": "Regne Unit",
      "kind": "Cas operatiu",
      "summary": "Pàgina operativa amb estat separat per component, historial i subscripció per correu, missatge, feeds i webhook.",
      "limitation": "La pàgina no publica la regla interna que transforma telemetria o SLO en estat comunicat.",
      "sectorPublic": true
    },
    {
      "id": "CG21",
      "title": "Alerting on SLOs",
      "publisher": "Google SRE",
      "url": "https://sre.google/workbook/alerting-on-slos/",
      "date": "2018",
      "accessed": "2026-09-09",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "summary": "Desenvolupa alertes per consum de pressupost d’error amb diverses finestres i exposa dificultats en serveis amb poc trànsit.",
      "limitation": "No és una especificació de pàgina d’estat; la traducció a estats comunicats és disseny proposat."
    },
    {
      "id": "RT01",
      "title": "eBPF for Windows — README i compatibilitat",
      "publisher": "Microsoft",
      "url": "https://github.com/microsoft/ebpf-for-windows",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Projecte per executar eBPF sobre Windows 11 i Server 2022 o posteriors, amb compatibilitat de codi per als hooks compartits.",
      "limitation": "Treball en curs; no declara paritat amb Linux. HVCI requereix el camí natiu amb drivers signats, no JIT."
    },
    {
      "id": "RT02",
      "title": "eBPF for Windows — versions publicades",
      "publisher": "Microsoft",
      "url": "https://github.com/microsoft/ebpf-for-windows/releases",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "La versió v1.4.0 consultada està marcada com a prerelease; afegeix punts d’intercepció de xarxa.",
      "limitation": "L’existència d’una versió no acredita suport de qualsevol agent d’observabilitat. Cal validar l’eina concreta."
    },
    {
      "id": "RT03",
      "title": "Event Tracing for Windows Simplified",
      "publisher": "Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/troubleshoot/windows-server/system-management-components/event-tracing-for-windows-simplified",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "ETW recull esdeveniments de components d’usuari i controladors, amb activació i desactivació dinàmica.",
      "limitation": "Cal seleccionar proveïdors, volum i tractament dels esdeveniments. ETW no converteix automàticament qualsevol aplicació en una traça distribuïda."
    },
    {
      "id": "RT06",
      "title": "System Extensions and DriverKit",
      "publisher": "Apple Developer",
      "url": "https://developer.apple.com/system-extensions/",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Apple ofereix Network Extensions i Endpoint Security per a funcions de xarxa i observació d’esdeveniments de sistema des d’extensions.",
      "limitation": "Les capacitats tenen permisos i requisits d’Apple; no equivalen a tota l’observabilitat d’aplicació ni a eBPF Linux."
    },
    {
      "id": "RT07",
      "title": "Network Observability with Hubble",
      "publisher": "Cilium",
      "url": "https://docs.cilium.io/en/stable/observability/hubble/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Hubble observa comunicacions als nodes Cilium; Relay agrega la visió i la interfície mostra dependències segons els fluxos visibles.",
      "limitation": "La cobertura depèn de Cilium, dels nodes i de la configuració. No representa tota la xarxa física ni garanteix visibilitat L7 de qualsevol protocol."
    },
    {
      "id": "RT08",
      "title": "Tetragon Overview",
      "publisher": "Cilium Tetragon",
      "url": "https://tetragon.io/docs/overview/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "2023-12-01",
      "accessed": "2026-09-15",
      "summary": "Utilitza eBPF per observar execucions, crides de sistema i activitat de xarxa i fitxers en Linux, amb context Kubernetes quan s’hi desplega.",
      "limitation": "També pot aplicar bloqueigs, però la proposta es limita a observar. Necessita validació de polítiques, càrrega i coordinació amb les eines de seguretat."
    },
    {
      "id": "RT09",
      "title": "gRPC Network Management Interface (gNMI) specification",
      "publisher": "OpenConfig",
      "url": "https://openconfig.net/docs/gnmi/gnmi-specification/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Defineix consulta de capacitats, recuperació d’estat i subscripcions a telemetria, amb mostreig o actualitzacions per canvi.",
      "limitation": "La presència del protocol no garanteix els mateixos models o camps a cada fabricant. Les subscripcions tampoc no són una instantània atòmica de tot l’equip."
    },
    {
      "id": "RT10",
      "title": "OpenConfig platform model — transceptors i canals òptics",
      "publisher": "OpenConfig",
      "url": "https://openconfig.net/projects/models/schemadocs/yangdoc/openconfig-platform.html",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "El model representa potència òptica d’entrada i sortida en components, transceptors i canals.",
      "limitation": "Només es podrà recollir allò que implementi i exposi l’equip; una alarma òptica no localitza per si sola el punt físic d’una avaria."
    },
    {
      "id": "RT11",
      "title": "Remote Fiber Testing and Monitoring",
      "publisher": "EXFO",
      "url": "https://www.exfo.com/en/solutions/fixed-and-cable-operators/remote-fiber-testing-and-monitoring/",
      "country": "Canadà",
      "kind": "Documentació de fabricant",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Descriu monitorització física de fibra amb equips OTDR situats en punts de la xarxa.",
      "limitation": "És una opció d’instrumentació del fabricant, no evidència que el CTTI disposi d’aquests equips o hagi d’adquirir-los. Prioritzar les fonts que ofereixi l’operador."
    },
    {
      "id": "RT13",
      "title": "The Dataiku LLM Mesh",
      "publisher": "Dataiku",
      "url": "https://www.dataiku.com/product/llm-mesh",
      "country": "Internacional",
      "kind": "Documentació de fabricant",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Passarel·la per connectar models i aplicar encaminament, controls, seguiment d’ús i cost.",
      "limitation": "Descripció comercial d’un producte. No acredita un resultat al CTTI ni eliminació completa de dependències."
    },
    {
      "id": "RT14",
      "title": "About agentic mesh",
      "publisher": "Solo.io",
      "url": "https://docs.solo.io/istio/1.30.x/agentic-mesh/about/",
      "country": "Estats Units",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Combina identitat de càrrega, polítiques i observabilitat per a comunicacions d’agents, amb Istio i agentgateway.",
      "limitation": "La pàgina la marca com a Enterprise Alpha. Exemple emergent de fabricant, no estàndard universal ni desplegament públic contrastat."
    },
    {
      "id": "RT16",
      "title": "Agent2Agent (A2A) Protocol Specification",
      "publisher": "A2A Protocol",
      "url": "https://a2a-protocol.org/latest/specification/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Especifica interaccions entre agents i un Agent Card amb capacitats, habilitats i requisits d’autenticació.",
      "limitation": "Un protocol no substitueix l’autorització efectiva, la semàntica de negoci, l’avaluació o les proves de compatibilitat. Fixar versions al pilot."
    },
    {
      "id": "RT17",
      "title": "SNMPv3 — User-based Security Model (RFC 3414)",
      "publisher": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc3414",
      "country": "Internacional",
      "kind": "Estàndard tècnic",
      "date": "2002-12",
      "accessed": "2026-09-15",
      "summary": "Defineix el model de seguretat basat en usuaris per a SNMPv3.",
      "limitation": "Defineix seguretat de protocol, no la cobertura de mètriques. Cal validar algoritmes i MIB implementats als equips."
    },
    {
      "id": "RT18",
      "title": "IP Flow Information Export (IPFIX) Protocol Specification (RFC 7011)",
      "publisher": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc7011",
      "country": "Internacional",
      "kind": "Estàndard tècnic",
      "date": "2013-09",
      "accessed": "2026-09-15",
      "summary": "Defineix l’exportació d’informació de fluxos IP des d’un punt d’observació a un col·lector.",
      "limitation": "Els fluxos reflecteixen el punt de mesura i els camps exportats; no equivalen a una captura completa ni a la salut de tots els components."
    },
    {
      "id": "SCOPE05",
      "title": "IBM Z Observability Connect",
      "publisher": "IBM",
      "url": "https://www.ibm.com/products/z-observability-connect",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "IBM documenta connectors que apropen senyals z/OS a plataformes d’observabilitat utilitzant OpenTelemetry.",
      "limitation": "Cal comprovar components, versions, llicències i configuració de cada entorn. No prova que el CTTI en disposi."
    },
    {
      "id": "SCOPE06",
      "title": "Redfish Telemetry White Paper",
      "publisher": "DMTF",
      "url": "https://www.dmtf.org/sites/default/files/standards/documents/DSP2051_1.0.0.pdf",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Redfish descriu informes de mètriques i lliurament asíncron per esdeveniments per a maquinari compatible.",
      "limitation": "Les mètriques exposades depenen de la implementació de l’equip. La presència d’un CPD no n’acredita suport."
    },
    {
      "id": "SCOPE07",
      "title": "Get serviceHealth — Microsoft Graph v1.0",
      "publisher": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/graph/api/servicehealth-get?view=graph-rest-1.0",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "date": "s.d.",
      "accessed": "2026-09-15",
      "summary": "Microsoft Graph permet consultar l’estat de salut d’un servei de Microsoft 365 per a un tenant amb els permisos corresponents.",
      "limitation": "L’estat publicat pel proveïdor no substitueix una prova d’experiència de l’usuari ni indica l’estat de tots els dispositius."
    },
    {
      "id": "ATOS_WS_2026",
      "title": "ATOS. WorkShop Observability 17 Sept 2026 v4.1_EN",
      "publisher": "Atos",
      "url": "",
      "country": "Internacional",
      "kind": "Document de treball aportat",
      "date": "2026-09-17 (data del nom del fitxer)",
      "accessed": "2026-09-15",
      "summary": "Arquitectura modular de telemetria, FinOps, instrumentació combinada i adopció progressiva d’AIOps amb validació operativa.",
      "limitation": "Material de proposta i formació. No acredita resultats al CTTI. Les puntuacions de fabricants i les xifres de mercat no aporten aquí una metodologia reproduïble ni totes les fonts primàries. La data del workshop és posterior al dia de revisió."
    },
    {
      "id": "GARTNER_HC_2026",
      "title": "Hype Cycle for Monitoring and Observability, 2026",
      "publisher": "Gartner",
      "url": "https://www.gartner.com/en/documents/8151629",
      "country": "Internacional",
      "kind": "Referència analítica",
      "date": "2026-07-21",
      "accessed": "2026-09-15",
      "summary": "La imatge de juliol de 2026 situa tecnologies d’observabilitat en moments diferents d’expectatives i adopció. L’abstract oficial presenta l’evolució cap a operacions assistides per IA, optimització de costos i autonomia.",
      "limitation": "S’ha revisat la imatge aportada i l’abstract públic, no les recomanacions detallades de l’informe complet. La posició al gràfic no acredita el resultat d’un producte concret ni determina el calendari del CTTI."
    },
    {
      "id": "CTTI_MEM2025",
      "title": "Memòria CTTI 2025",
      "date": "2026-07",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Memòria institucional",
      "summary": "Activitat de 2025. Es distingeixen implantacions, pilots i previsions; no acredita cobertura general.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_LB2026",
      "title": "Llibre Blanc d’Observabilitat · agost de 2026",
      "date": "2026-08",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Documentació CTTI aportada",
      "summary": "Marc de mesura i funcions concretes de l’Oficina d’Observabilitat; la configuració real es contrasta per servei.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_POL2026",
      "title": "Estàndards i polítiques d’observabilitat",
      "date": "2026",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/estandards/",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Marc corporatiu",
      "summary": "Cinc famílies oficials. Els deu àmbits de l’Atles serveixen per explorar cobertura i no substitueixen aquesta classificació.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_T132",
      "title": "Centre de Control · abast tècnic del servei 132",
      "date": "2026",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Model de servei documentat",
      "summary": "Lideratge i coordinació dins l’abast definit. Els requisits no acrediten implantació actual de tot el model.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_I132",
      "title": "Centre de Control · calendari previst del servei 132",
      "date": "2026",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Document de servei aportat",
      "summary": "La invitació 132, versió catalana v2, p. 9, situa l’execució requerida a partir de 2027.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_T133",
      "title": "Gestió d’eines d’observabilitat · abast tècnic del servei 133",
      "date": "2026",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Model de servei documentat",
      "summary": "Projectes i administració d’eines. No atribueix automàticament al prestador totes les decisions corporatives d’observabilitat.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_ANS132",
      "title": "Centre de Control · definicions de seguiment i ANS",
      "date": "2026",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Model de mesura documentat",
      "summary": "Distingir temps d’informe, resolució i seguiment. La proposta Atos no modifica fórmules ni llindars d’ANS.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_ANS133",
      "title": "Eines d’observabilitat · definicions de seguiment i ANS",
      "date": "2026",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Model de mesura documentat",
      "summary": "Diferencia intervenció de l’adjudicatari i del mantenidor; les definicions es validen abans d’automatitzar el càlcul.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_ESC2026",
      "title": "Matriu d’escalats de proveïdors · 8 de maig de 2026",
      "date": "2026-05-08",
      "url": "",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Referència operativa aportada",
      "summary": "Base per relacionar serveis, equips i rutes. Els contactes no es publiquen; vigència i responsabilitats es contrasten per servei.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_AUDIENCES",
      "title": "Plataforma corporativa d’observabilitat · destinataris",
      "date": "s.d.",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/plat_obs_corp/",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Proveïdors, Àmbits, Centre de Control i Direcció, amb necessitats i detall diferents.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_MQS",
      "title": "Model de Qualitat de Solucions · manual d’explotació",
      "date": "s.d.",
      "url": "https://qualitat.solucions.gencat.cat/procediments/manual_explotacio/",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Procediment corporatiu",
      "summary": "La validació funcional i l’acceptació operativa tenen participants diferents; s’aplica el circuit que correspongui.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_PTD",
      "title": "PTD · serveis transversals d’analítica avançada i IA",
      "date": "s.d.",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ptd/5.-Serveis-Transversals-dAnal%C3%ADtica-avan%C3%A7ada-i-IA/",
      "publisher": "CTTI",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Capacitats corporatives per aprofitar. La monitorització amb Neuraltrust hi consta com a pròxima disponibilitat, no com a desplegament acreditat.",
      "limitation": "Base per a l’encaix de la proposta; no acredita per si sola la cobertura de tot el parc.",
      "accessed": "2026-09-15",
      "contextSource": true
    },
    {
      "id": "CTTI_CG01",
      "title": "CTTI — Regles corporatives de validació d’API i producte",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/related/apim/3292_AMT_ERQ_Regles-Validacio_MRR.pdf",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Disseny funcional publicat el juliol de 2026; precedent basat en Spectral, no validador de telemetria acreditat.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG02",
      "title": "CTTI — FAQ d’API Manager",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/apim/faq/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Comportament documentat: errors que bloquegen i avisos que es registren; no s’han inspeccionat execucions productives.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG03",
      "title": "CTTI — Observabilitat al Cloud",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/obs_cloud_protected/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Arquitectura contrastada amb la còpia aportada, §§1–2; l’entrada pública és protegida i no se n’ha verificat el contingut vigent.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG04",
      "title": "CTTI — Llibre Blanc d’observabilitat i catàleg de mètriques",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Llibre-Blanc_protected/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Criteris contrastats amb el Llibre Blanc i el catàleg v1.1 aportats; contingut protegit vigent no contrastat i configuracions productives no inspeccionades.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG05",
      "title": "CTTI — Repositori d’artefactes",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-repositori-artefactes/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Polítiques de cicle de vida publicades per a artefactes; són diferents de les polítiques de retenció de telemetria.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG06",
      "title": "CTTI — Nou orquestrador de releases disponible a SIC+",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/noticies/2026-07-29-orquestrador-de-releases/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Disponibilitat anunciada el 29 de juliol de 2026; no acredita adopció universal.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG07",
      "title": "CTTI — Orquestrador de releases",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-orquestrador-releases/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Guia de metadades, versions i plans; no s’han inspeccionat repositoris ni desplegaments reals.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG08",
      "title": "CTTI — Integració amb Remedy",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-remedy-integration/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Circuit de canvi documentat; la versió i la modalitat aplicables s’han de verificar abans d’automatitzar-les.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG09",
      "title": "CTTI — Construcció de la mesura",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/construccio_mesura/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Paquets i criteris publicats; no demostren compliment de cada aplicació.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG10",
      "title": "CTTI — Integració amb el MAT",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-mat-integration/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Proves i tractament de tests no informats documentats; sense inspecció de resultats reals.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG11",
      "title": "CTTI — Dades de Referència",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/dadesref/dadesref/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Govern funcional i tècnic publicat; el catàleg de referència no substitueix el catàleg de mètriques.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG12",
      "title": "CTTI — Nivells de mesura",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/monit_DIS_CAP/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Model publicat de nivells; no és una mesura de cobertura desplegada.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG13",
      "title": "CTTI — Procediment de gestió d’excepcions d’arquitectura",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/arquitectura/procedimentGestioExcepcionsArquitectura/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Procediment publicat; no atribueix a Arquitectura totes les excepcions de retenció, seguretat o negoci.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG14",
      "title": "CTTI — Suport d’API Manager",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/apim/suport/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Guia de suport que diferencia projecte i servei; no acredita per si sola el propietari contractual vigent de cada component.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG15",
      "title": "CTTI — Suport d’EventHub",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/eventhub/Suport/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Oficina, administració i autoritzacions documentades; els compromisos del fabricant no equivalen al temps de restauració de tota la cadena.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG16",
      "title": "CTTI — Normativa tècnica d’intel·ligència artificial vigent",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/arquitectura/IA/normativa_IA_CTTI/vigent/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG17",
      "title": "CTTI — Introducció a EventHub",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/eventhub/Introduccio/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Servei corporatiu Kafka/Confluent descrit; no acredita que una aplicació concreta l’utilitzi ni que ja se’n conciliï el resultat funcional.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG18",
      "title": "CTTI — Mòduls de la PTD: FinOps",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ptd/2.-Moduls-de-la-PTD/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Capacitat descrita per al perímetre indicat; no s’han verificat factures, estalvis ni atribució a tots els serveis.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG19",
      "title": "CTTI — Welcome pack de la PTD, pàgina 34",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ptd/related/PDF/PTD_welcome_pack.pdf#page=34",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Document de maig de 2025 que corrobora el precedent FinOps; no és un balanç d’estalvi mesurat.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "CTTI_CG20",
      "title": "CTTI — Tipologies d’integració amb GICAR",
      "publisher": "CTTI · Canigó",
      "url": "https://canigo.ctti.gencat.cat/plataformes/gicar/integracions/tipologies-integracio/",
      "country": "Catalunya",
      "kind": "Documentació oficial",
      "summary": "Matriu d’integracions publicada; no acredita un únic recorregut d’identitat per a totes les aplicacions.",
      "limitation": "La font descriu un marc o una capacitat; la cobertura del pilot s’ha de comprovar.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "contextSource": true
    },
    {
      "id": "TEC_WEAVER",
      "title": "OpenTelemetry Weaver: contractes i convencions",
      "publisher": "OpenTelemetry",
      "url": "https://opentelemetry.io/blog/2025/otel-weaver/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Eina per definir i comprovar convencions semàntiques; cal acordar versió, proves i adaptació al format CTTI.",
      "limitation": "",
      "date": "s.d.",
      "accessed": "2026-09-16"
    },
    {
      "id": "TEC_EXEMPLARS",
      "title": "OpenTelemetry · Exemplars",
      "publisher": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/specs/otel/metrics/data-model/#exemplars",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Mostres que poden vincular una observació d’una mètrica amb el context d’una traça.",
      "limitation": "",
      "date": "s.d.",
      "accessed": "2026-09-16"
    },
    {
      "id": "TEC_SBOM",
      "title": "CISA · Framing Software Component Transparency",
      "publisher": "CISA",
      "url": "https://www.cisa.gov/sites/default/files/2024-10/SBOM%20Framing%20Software%20Component%20Transparency%202024.pdf",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Marc sobre inventari de components i transparència de programari; no acredita afectació explotable d’un servei concret.",
      "limitation": "",
      "date": "s.d.",
      "accessed": "2026-09-16"
    },
    {
      "id": "INT01",
      "title": "Altinn: provar la instrumentació abans d’arribar a producció",
      "publisher": "Digdir / Altinn",
      "url": "https://docs.altinn.studio/en/altinn-studio/v8/guides/administration/monitor-and-instrument/",
      "country": "Noruega",
      "kind": "Cas operatiu",
      "summary": "Altinn documenta instrumentació OpenTelemetry i un entorn local amb Collector i Grafana. La mateixa guia situa Azure Monitor a producció. El repositori permet examinar com es prepara l’entorn de prova.",
      "limitation": "La presència de Grafana al laboratori no acredita una migració acabada de producció. No es publica una millora comparable de temps d’alta.",
      "date": "2025-09-29",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Capacitat operativa documentada",
      "dateNote": "Actualització de la guia",
      "relatedLinks": [
        "https://github.com/Altinn/app-localtest"
      ]
    },
    {
      "id": "INT03",
      "title": "Cloud Pi Native: quadres i alertes desplegats des de Git",
      "publisher": "Ministère de l’Intérieur et des Outre-mer / Cloud Pi Native",
      "url": "https://cloud-pi-native.fr/agreement/observability",
      "country": "França",
      "kind": "Cas operatiu",
      "summary": "Cloud Pi Native sincronitza quadres i alertes de projecte des de Git mitjançant ArgoCD. La guia adverteix que les alertes específiques de cada projecte no venen definides per defecte.",
      "limitation": "Tenir la plataforma activa no demostra que les alertes del servei siguin suficients. No retenim la xifra de retenció perquè les versions consultades discrepen.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Consulta de documentació viva, sense data única de publicació",
      "relatedLinks": [
        "https://github.com/cloud-pi-native/socle"
      ]
    },
    {
      "id": "INT04",
      "title": "MoJ: conservar un històric no sempre conserva el càlcul",
      "publisher": "Ministry of Justice / Cloud Platform",
      "url": "https://dev.developer-portal.service.justice.gov.uk/docs/cloud-platform/concepts/how-cloud-platform-meet-the-service-standard",
      "country": "Regne Unit",
      "kind": "Cas operatiu",
      "summary": "La Cloud Platform documenta Prometheus i Thanos. La guia assenyala que els històrics de resolució reduïda no serveixen per a determinats càlculs de disponibilitat mensual, trimestral o anual.",
      "limitation": "L’inventari recent confirma components, però no revalida tota la guia. El cas justifica comprovar el càlcul; no imposar una retenció concreta al CTTI.",
      "date": "2025-03-05",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada; guia amb revisió pendent",
      "dateNote": "Revisió de la guia; contrast d’inventari del 2026-06-11",
      "relatedLinks": [
        "https://reports.cloud-platform.service.justice.gov.uk/namespace/monitoring",
        "https://github.com/ministryofjustice/cloud-platform-infrastructure"
      ]
    },
    {
      "id": "INT05",
      "title": "GOV.UK: comprovar l’alerta i corregir el soroll",
      "publisher": "Government Digital Service / equips GOV.UK",
      "url": "https://docs.publishing.service.gov.uk/manual/pagerduty.html",
      "country": "Regne Unit",
      "kind": "Cas operatiu",
      "summary": "GOV.UK descriu una prova setmanal de PagerDuty i, separadament, un Watchdog continu de Prometheus cap a Alertmanager. Un article de 2021 explica com l’equip va corregir fonts concretes de soroll als registres d’error.",
      "limitation": "La prova periòdica i el Watchdog són mecanismes diferents. La reducció històrica d’esdeveniments registrats no equival a una reducció d’incidents ni a un resultat d’IA.",
      "date": "2026-09-07",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Actualització del procediment; antecedent de soroll del 2021-06-28",
      "relatedLinks": [
        "https://technology.blog.gov.uk/2021/06/28/how-we-reduced-errors-on-gov-uk/"
      ]
    },
    {
      "id": "INT07",
      "title": "RIA: un centre comú amb responsabilitats distribuïdes",
      "publisher": "RIA / Centre d’operacions",
      "url": "https://www.ria.ee/en/ria-operations-centre-begins-work",
      "country": "Estònia",
      "kind": "Cas operatiu",
      "summary": "RIA situa l’inici del seu centre d’operacions l’1 de juny de 2025. Les institucions mantenen la responsabilitat sobre els seus serveis. El febrer de 2026 encara es planteja automatitzar l’entrada d’estat d’institucions durant l’any.",
      "limitation": "No s’ha acreditat que l’ampliació anunciada estigui completada. Les competències de ciberseguretat de RIA no es poden atribuir al Centre de Control del CTTI.",
      "date": "2026-02-11",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Centre en funcionament; ampliacions previstes",
      "dateNote": "Publicació; inici operatiu declarat el 2025-06-01",
      "relatedLinks": [
        "https://www.ria.ee/en/cyber-security-estonia-2026"
      ]
    },
    {
      "id": "INT08",
      "title": "VA.gov: detectar sol·licituds que es perden sense avisar",
      "publisher": "Department of Veterans Affairs / VA.gov Platform",
      "url": "https://depo-platform-documentation.scrollhelp.site/developer-docs/endpoint-monitoring",
      "country": "EUA",
      "kind": "Cas operatiu",
      "summary": "VA.gov documenta el seguiment de fallades silencioses de sol·licituds i de trànsit inesperadament baix, amb Datadog, mètriques, registres i sondes. Els avisos han de permetre actuar i no han d’incloure dades personals o sanitàries.",
      "limitation": "La guia acredita criteris d’operació, no una reducció quantificada de tràmits perduts. No importem els percentatges de disponibilitat: el resum i la taula discrepen en la finestra temporal.",
      "date": "2024-10-07",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació i pautes documentades",
      "dateNote": "Actualització de la guia; contrast de fonts el 2026-09-16",
      "relatedLinks": [
        "https://depo-platform-documentation.scrollhelp.site/developer-docs/core-service-level-indicators-and-objectives-for-v",
        "https://depo-platform-documentation.scrollhelp.site/developer-docs/managing-signal-to-noise-ratio"
      ]
    },
    {
      "id": "INT09",
      "title": "Login.gov: qui coordina, qui repara i qui comunica",
      "publisher": "GSA / Login.gov",
      "url": "https://handbook.login.gov/articles/incident-response-guide.html",
      "country": "EUA",
      "kind": "Cas operatiu",
      "summary": "Login.gov separa direcció de situació, execució tècnica, comunicació i registre cronològic. Documenta sondes New Relic Synthetics connectades amb Statuspage i comprovacions per contrastar falsos positius abans de corregir l’estat.",
      "limitation": "Els temps d’observació del procediment no són resultats de recuperació. El repartiment és una referència funcional; l’adaptació ha de respectar les competències CTTI.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Consulta de manuals operatius sense data d’actualització inequívoca",
      "relatedLinks": [
        "https://handbook.login.gov/articles/statuspage-process.html",
        "https://status.login.gov/"
      ]
    },
    {
      "id": "INT10",
      "title": "GSA Site Scanning: descobrir què queda fora de l’inventari",
      "publisher": "General Services Administration",
      "url": "https://digital.gov/guides/site-scanning",
      "country": "EUA",
      "kind": "Cas operatiu",
      "summary": "GSA Site Scanning revisa diàriament un inventari federal de webs mitjançant navegador automatitzat. Publica resultats, API i exportacions, i documenta com consolida fonts d’inventari i fa les comprovacions.",
      "limitation": "Una revisió diària de característiques web no és APM ni monitoratge continu de disponibilitat. Un domini trobat necessita validació abans d’atribuir-li propietari o servei.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Consulta de documentació i repositori; sense data única de publicació",
      "relatedLinks": [
        "https://digital.gov/guides/site-scanning/technical-details",
        "https://github.com/GSA/site-scanning-engine"
      ]
    },
    {
      "id": "INT11",
      "title": "GC Notify: acceptat, processat i lliurat són fites diferents",
      "publisher": "Canadian Digital Service / GC Notify",
      "url": "https://documentation.notification.canada.ca/en/status.html",
      "country": "Canadà",
      "kind": "Cas operatiu",
      "summary": "GC Notify diferencia acceptació, processament i lliurament dels missatges. Publica objectius i incidents amb abast declarat. Això permet distingir una plataforma disponible d’un conjunt de notificacions que no ha arribat al seu destinatari.",
      "limitation": "Alguns objectius utilitzen expressions sense percentil precís. Les dades d’un incident acrediten impacte, no una millora del servei. L’estat de lliurament té l’abast que informa cada canal.",
      "date": "s.d.",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Consulta de l’API; SLO del 2024-01-25 i acord del 2026-06-03",
      "relatedLinks": [
        "https://notification.canada.ca/service-level-objectives",
        "https://notification.canada.ca/system-status",
        "https://notification.canada.ca/service-level-agreement"
      ]
    },
    {
      "id": "INT12",
      "title": "British Columbia: ampliar capacitat amb evidència d’ús",
      "publisher": "Govern de British Columbia / CSBC Platform Services",
      "url": "https://digital.gov.bc.ca/technology/cloud/private/products-tools/sysdig/",
      "country": "Canadà",
      "kind": "Cas operatiu",
      "summary": "British Columbia ofereix Sysdig als equips de la seva plataforma OpenShift i utilitza evidència d’ús per justificar ampliacions de quota. La mesura forma part de les decisions sobre capacitat del servei compartit.",
      "limitation": "Les fonts no quantifiquen estalvis atribuïbles al monitoratge ni aporten un model complet de cost per servei. Ús, capacitat reservada i factura s’han de conciliar.",
      "date": "2024-03-19",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Operació documentada",
      "dateNote": "Fitxa del servei; contrast amb catàleg del 2026-06-16",
      "relatedLinks": [
        "https://digital.gov.bc.ca/technology/cloud/private/products-tools/"
      ]
    },
    {
      "id": "INT13",
      "title": "Brasil: mantenir la telemetria transportable entre proveïdors",
      "publisher": "Secretaria de Governo Digital / Governo Digital",
      "url": "https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/ambiente-tecnologico/nuvem/materiais-de-apoio/boas-praticas-para-minimizar-aprisionamento-em-nuvem",
      "country": "Brasil",
      "kind": "Marc públic",
      "summary": "La guia brasilera inclou OpenTelemetry/OTLP, Prometheus, Grafana, Git i infraestructura com a codi. Recomana comprovar cobertura i comportament de les alertes com a part d’una arquitectura amb menys dependència del proveïdor.",
      "limitation": "És una guia, no una plataforma nacional acreditada. OTLP no trasllada automàticament consultes, permisos, regles ni totes les funcions pròpies d’un producte.",
      "date": "2026-06-19",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Guia institucional",
      "dateNote": "Actualització de la guia publicada el 2025-06-10",
      "relatedLinks": []
    },
    {
      "id": "INT14",
      "title": "StackOps: observabilitat compartida per a serveis de govern",
      "publisher": "GovTech Singapore",
      "url": "https://www.developer.tech.gov.sg/products/categories/devops/stackops/overview",
      "country": "Singapur",
      "kind": "Cas operatiu",
      "summary": "StackOps ofereix logs, mètriques, traces, APM, dependències i sondes. GovTech descriu usos en transferència de fitxers, APIs i eines de desenvolupament. Els testimonis expliquen millores de temps en determinats equips.",
      "limitation": "Els testimonis no detallen mostra ni període comparatiu. No permeten prometre al CTTI el mateix estalvi, atribuir-lo a IA ni equiparar disponibilitat de plataforma amb èxit del tràmit.",
      "date": "2026-07-02",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Servei gestionat en producció declarada",
      "dateNote": "Actualització de la descripció; testimonis del 2025-08-21",
      "relatedLinks": [
        "https://www.developer.tech.gov.sg/products/categories/devops/stackops/how-it-works",
        "https://www.developer.tech.gov.sg/products/categories/devops/stackops/customer-stories"
      ]
    },
    {
      "id": "INT15",
      "title": "NIRS: assajar la fallada del transport de logs",
      "publisher": "National Information Resources Service / Daejeon",
      "url": "https://www.nirs.go.kr/ncia_MJS/board/dev/board/board.jsp?id=data_301&idx=4746&menu_num=3014&mode=view",
      "country": "Corea del Sud",
      "kind": "Cas operatiu",
      "summary": "NIRS va simular una fallada del component intermedi de transport de logs a nSIMS i va revisar el circuit de comunicació i recuperació. El cas posa a prova una peça de la mateixa infraestructura que permet supervisar els serveis.",
      "limitation": "No es publica temps de recuperació ni s’explica com es detectava el silenci de logs. El canal independent i la prova completa són propostes d’Atos.",
      "date": "2026-09-08",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Simulacre executat sobre sistema operatiu",
      "dateNote": "Data del simulacre i de la notícia institucional",
      "relatedLinks": []
    },
    {
      "id": "INT16",
      "title": "Austràlia: observar agents, eines i permisos",
      "publisher": "Digital Transformation Agency",
      "url": "https://www.digital.gov.au/policy/ai/agentic-ai-addendum-statements-monitor",
      "country": "Austràlia",
      "kind": "Marc públic",
      "summary": "L’addenda australiana tracta el seguiment d’agents i interaccions, errors d’eines, memòria, permisos, latència i consum. Recomana una visió de control comuna i responsabilitat humana al llarg del cicle de vida.",
      "limitation": "No acredita una torre nacional d’agents desplegada ni un assistent operatiu de diagnosi TIC. Les traces d’accions no donen accés al raonament intern complet del model.",
      "date": "2026-06-04",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Guia tècnica institucional",
      "dateNote": "Publicació de l’addenda institucional",
      "relatedLinks": [
        "https://www.digital.gov.au/policy/ai/agentic-ai-addendum",
        "https://www.digital.gov.au/policy/ai/agentic-ai-addendum-statements-whole-ai-lifecycle"
      ]
    },
    {
      "id": "INT17",
      "title": "GovTech: un prototip d’agents amb accions traçables",
      "publisher": "GovTech AI Practice / Cybersecurity Group",
      "url": "https://blog.ai.gov.sg/scaling-the-pentesting-team-with-ai/",
      "country": "Singapur",
      "kind": "Recerca",
      "summary": "El prototip de GovTech combina agents especialitzats, control d’eines, MCP, Langfuse autohostat i traces OpenTelemetry. Es va provar amb sistemes de staging a finals de 2025. L’article d’abril de 2026 anuncia la construcció del sistema productiu.",
      "limitation": "El cas és de proves de ciberseguretat. No demostra resolució autònoma d’incidents TIC, desplegament productiu complet ni superioritat d’una arquitectura anomenada IA Mesh.",
      "date": "2026-04-21",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Prototip i prova en preproducció",
      "dateNote": "Publicació; prova de finals de 2025",
      "relatedLinks": []
    },
    {
      "id": "INT18",
      "title": "perfSONAR: seguir la degradació entre xarxes",
      "publisher": "ESnet / consorci perfSONAR",
      "url": "https://www.es.net/network-r-and-d/perfsonar/",
      "country": "EUA / Europa / Brasil",
      "kind": "Cas operatiu",
      "summary": "perfSONAR combina mesures actives de latència, pèrdua, capacitat i ruta entre dominis. ESnet explica el seu ús per diagnosticar problemes que travessen xarxes administrades per organitzacions diferents.",
      "limitation": "És una referència d’infraestructura pública científica, no de tots els serveis d’una administració. Les proves consumeixen capacitat i no substitueixen alarmes òptiques ni diagnosi física de fibra.",
      "date": "2025-04-02",
      "accessed": "2026-09-16",
      "sectorPublic": true,
      "status": "Desplegament sostingut en xarxes de recerca",
      "dateNote": "Referència d’adopció del consorci; documentació ESnet consultada el 2026-09-15",
      "relatedLinks": [
        "https://www.perfsonar.net/ps20.html"
      ]
    },
    {
      "id": "MKT01",
      "title": "Més detall durant un incident, amb retorn automàtic",
      "publisher": "Edge Delta",
      "url": "https://docs.edgedelta.com/flow-control/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "La documentació descriu un mostreig per servei que consulta una taxa i una data de caducitat. Quan la finestra expira, torna a la taxa habitual.",
      "limitation": "Capacitat descrita pel fabricant. Els percentatges comercials d’estalvi no són una previsió per al CTTI. Augmentar la captura no recupera dades descartades anteriorment.",
      "date": "s.d.",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Funcionalitat de producte documentada",
      "relatedLinks": []
    },
    {
      "id": "MKT02",
      "title": "Diagnòstic dinàmic dins d’una aplicació en execució",
      "publisher": "Lightrun",
      "url": "https://docs.lightrun.com/actions/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Lightrun documenta logs, mètriques i captures de diagnòstic afegits a punts del codi mitjançant un agent, mentre l’aplicació continua executant-se.",
      "limitation": "Cal validar llenguatge, versió, agent, permisos i impacte. L’accés a variables exigeix filtratge de dades sensibles; no implica compatibilitat universal ni cost de captura nul.",
      "date": "s.d.",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Instrumentació dinàmica de producte",
      "relatedLinks": [
        "https://docs.lightrun.com/datasecurity/overview/"
      ]
    },
    {
      "id": "MKT03",
      "title": "Relacionar una petició lenta amb el consum del codi",
      "publisher": "Grafana Pyroscope",
      "url": "https://grafana.com/docs/pyroscope/latest/configure-client/trace-span-profiles/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Els perfils associats a spans permeten examinar quines funcions s’executen durant un tram de la petició i relacionar traces amb mostres de consum.",
      "limitation": "La cobertura depèn del llenguatge i del profiler; un tram molt curt pot no tenir mostres. La via concreta OTel eBPF Profiler–Pyroscope via OTLP manté advertiments de desenvolupament i compatibilitat.",
      "date": "s.d.",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Capacitat documentada; suport variable per integració",
      "relatedLinks": [
        "https://grafana.com/docs/pyroscope/latest/configure-client/opentelemetry/ebpf-profiler/"
      ]
    },
    {
      "id": "MKT04",
      "title": "Gestionar una flota de collectors amb OpAMP",
      "publisher": "OpenTelemetry",
      "url": "https://opentelemetry.io/docs/collector/management/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "OpenTelemetry presenta OpAMP per gestionar agents i mostra com consultar-ne l’estat i canviar configuracions. Bindplane documenta opcions de gestió de collectors i desplegament gradual.",
      "limitation": "El suport de gestió es valida per distribució, component i versió. Utilitzar OpenTelemetry no garanteix que tots els collectors admetin les mateixes ordres ni el mateix mecanisme de recuperació.",
      "date": "2026-07-17",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Protocol i implementacions amb compatibilitat per validar",
      "relatedLinks": [
        "https://docs.bindplane.com/feature-guides"
      ],
      "dateNote": "Darrera modificació indicada a la guia d’OpenTelemetry"
    },
    {
      "id": "MKT05",
      "title": "Escòcia: observar audiències virtuals i treball híbrid",
      "publisher": "Scottish Courts and Tribunals Service",
      "url": "https://www.scotcourts.gov.uk/about-us/news/news/2024/february/success-for-scts-at-international-technology-awards/",
      "country": "Regne Unit · Escòcia",
      "kind": "Cas operatiu",
      "summary": "Els tribunals escocesos expliquen que van utilitzar ThousandEyes per complementar el monitoratge de les audiències virtuals i donar suport al treball híbrid.",
      "limitation": "Font del mateix organisme, publicada arran d’un premi del fabricant. No detalla una comparació quantitativa ni acredita diagnòstic físic de fibra.",
      "date": "2024-02-21",
      "accessed": "2026-09-17",
      "sectorPublic": true,
      "status": "Ús operatiu declarat per l’organisme",
      "relatedLinks": []
    },
    {
      "id": "MKT06",
      "title": "Detectr: detectar problemes a partir dels avisos d’usuaris",
      "publisher": "Google SRE",
      "url": "https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/",
      "country": "EUA",
      "kind": "Cas operatiu",
      "summary": "Google descriu Detectr, que agrupa informes d’usuaris i suport per identificar possibles incidències que el monitoratge tècnic pot haver passat per alt.",
      "limitation": "Experiència interna de Google, no un producte ofert al CTTI. La transferència proposada parteix de tiquets autoritzats; volum o sentiment no demostren per si sols gravetat ni causa.",
      "date": "s.d.",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Experiència operativa publicada per l’organització",
      "relatedLinks": []
    },
    {
      "id": "MKT07",
      "title": "Reproduir incidents per avaluar un assistent de diagnòstic",
      "publisher": "Datadog Engineering",
      "url": "https://www.datadoghq.com/blog/engineering/bits-ai-eval-platform/",
      "country": "Internacional",
      "kind": "Cas operatiu",
      "summary": "Datadog explica com va construir entorns d’avaluació repetibles amb context d’incidents per detectar regressions del seu assistent entre versions.",
      "limitation": "Experiència d’enginyeria publicada pel fabricant. No és una avaluació independent ni una mesura de precisió transferible al CTTI.",
      "date": "2026-04-07",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Plataforma interna d’avaluació descrita",
      "relatedLinks": []
    },
    {
      "id": "MKT08",
      "title": "WOGAA: una vista compartida de la qualitat dels serveis públics",
      "publisher": "GovTech Singapore",
      "url": "https://www.tech.gov.sg/products-and-services/for-government-agencies/informational-services/wogaa/",
      "country": "Singapur",
      "kind": "Cas operatiu",
      "summary": "WOGAA reuneix analítica de webs i serveis públics, retorn d’usuaris, informes i comparacions en una vista comuna per a les agències.",
      "limitation": "Inspect Plus, el resum de comentaris amb IA i el comprovador d’enllaços consten com a beta. Comparar serveis requereix criteris equivalents; la fitxa no acredita conciliació transaccional de tots els tràmits.",
      "date": "s.d.",
      "accessed": "2026-09-17",
      "sectorPublic": true,
      "status": "Servei públic disponible amb ampliacions beta",
      "relatedLinks": [
        "https://home.wogaa.sg/"
      ]
    },
    {
      "id": "MKT09",
      "title": "Decidir el pas següent d’un desplegament amb mesures",
      "publisher": "Argo Rollouts",
      "url": "https://argoproj.github.io/argo-rollouts/features/analysis/",
      "country": "Internacional",
      "kind": "Documentació tècnica",
      "summary": "Argo Rollouts documenta anàlisis de mètriques que condicionen un desplegament progressiu. Un resultat inconcloent pot deixar-lo en pausa per a una decisió posterior.",
      "limitation": "És una capacitat de desplegament en Kubernetes. El patró es pot estudiar amb altres eines, però la integració amb SIC+/MAT i amb cada plataforma CTTI s’ha de demostrar.",
      "date": "s.d.",
      "accessed": "2026-09-17",
      "sectorPublic": false,
      "status": "Funcionalitat de projecte obert documentada",
      "relatedLinks": []
    }
  ]
};
