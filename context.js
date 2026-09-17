window.ATLES_CONTEXT= {
  "scope": {
    "intro": "El mapa relaciona el procés públic amb el servei TIC, les dependències i els equips que hi intervenen. Parteix de la memòria, el llibre blanc, la matriu d’escalats i els models dels serveis 132 i 133. Atos proposa comprovar aquest encaix amb cada servei i fer que totes les fitxes comparteixin els mateixos actors i processos.",
    "actors": [
      {
        "id": "govern_ctti",
        "name": "CTTI · govern i decisions",
        "role": "Fixa les directrius i designa qui aprova criteris, excepcions i canvis d’abast."
      },
      {
        "id": "funcional",
        "name": "Responsable funcional",
        "role": "Defineix el resultat del procés, la criticitat i els moments sensibles; valida el resultat funcional."
      },
      {
        "id": "area_tic",
        "name": "Àrea TIC / àmbit",
        "role": "Relaciona les necessitats del departament amb el seguiment del servei i la comunicació d’afectacions."
      },
      {
        "id": "gestio_servei",
        "name": "Gestió del servei i de l’entrega",
        "role": "Connecta compromisos, equips i acceptació operativa, segons el circuit de cada servei."
      },
      {
        "id": "oficina_o11y",
        "name": "Oficina d’Observabilitat",
        "role": "Intervé en estàndards, freqüències, excepcions i activació d’APM segons el llibre blanc. No s’equipara automàticament al prestador d’eines."
      },
      {
        "id": "cdc",
        "name": "Centre de Control",
        "role": "El model 132 li assigna el lideratge d’incidents d’alt impacte i la coordinació de problemes. Els equips de cada solució executen les intervencions tècniques."
      },
      {
        "id": "eines_o11y",
        "name": "Gestió d’eines d’observabilitat",
        "role": "Desenvolupa integracions i administra les eines del seu abast; resol o escala al suport de producte quan correspon."
      },
      {
        "id": "operadors",
        "name": "Equips de les solucions observades",
        "role": "Instrumenten, diagnostiquen i intervenen sobre aplicacions, dades, CPD, cloud, xarxa, comunicacions i lloc de treball dins del seu àmbit."
      },
      {
        "id": "suport_producte",
        "name": "Integradors i fabricants",
        "role": "Aporten suport especialitzat i manteniment segons component, amb traspàs, acceptació i prova de recuperació."
      },
      {
        "id": "sau",
        "name": "Atenció i suport a l’usuari",
        "role": "Rep afectacions i peticions, aporta context d’ús i comunica pels canals previstos."
      },
      {
        "id": "arquitectura",
        "name": "Arquitectura i Integració",
        "role": "Relaciona dependències, disseny i cicle de vida amb les plataformes i els patrons corporatius."
      },
      {
        "id": "qualitat",
        "name": "Qualitat",
        "role": "Aporta criteris, proves i suport a diagnòstic i millora segons procediment. No dirigeix per defecte tots els problemes."
      },
      {
        "id": "dada_ia",
        "name": "Govern de dades i IA",
        "role": "Encaixa els usos de dades i agents amb les capacitats i el govern corporatius: OGD, PTD i serveis transversals d’IA segons funció."
      },
      {
        "id": "propietari_dada",
        "name": "Responsable de la dada",
        "role": "Aporta la definició, la qualitat esperada i les condicions d’ús del conjunt de dades que es vol mesurar o compartir."
      },
      {
        "id": "seguretat",
        "name": "Seguretat CTTI, Agència i SOC",
        "role": "Acorden l’intercanvi i la resposta de seguretat segons competències, permisos i necessitat de cada cas."
      },
      {
        "id": "direccio",
        "name": "Direcció i seguiment econòmic",
        "role": "Decideixen prioritats i recursos amb indicadors reproduïbles i el suport de les capacitats FinOps aplicables."
      },
      {
        "id": "externs",
        "name": "Organismes i serveis externs",
        "role": "Aporten serveis, evidències i punts de contacte dins d’un abast acordat; cal mostrar el límit de visibilitat i actuació del CTTI."
      }
    ],
    "relation": "Procés i moment crític → servei TIC → aplicacions i dependències → responsables → mesura i resposta → recuperació i millora. Les eines donen suport a aquest recorregut; no són actors.",
    "limit": "Els deu àmbits són una lectura de cobertura de l’Atles, diferenciada de les cinc famílies oficials del CTTI. Les assignacions de cada pilot es validaran amb els responsables; els models 132/133 no acrediten implantació general avui. Cobertura i disponibilitat horària es comproven per servei.",
    "domains": [
      {
        "code": "01",
        "name": "Aplicacions i serveis a la ciutadania",
        "assets": "Justícia i eJCAT; ATRI i recursos humans; Portals GECO i gestió documental; Tributs, ajuts, educació i salut; Dependències AOC: Vàlid, e-NOTUM, signador i PSIS.",
        "actors": "Equips d’aplicació AM01–AM23; Responsables funcionals dels departaments; Equips d’entitats i serveis externs.",
        "observation": "Traces i mètriques d’aplicació, logs, proves de recorregut i resultat de negoci. Incloure les crides a serveis externs i el límit de visibilitat de cada dependència. SDK i instrumentació automàtica OpenTelemetry. Sondes funcionals amb Playwright. Esdeveniments de negoci. API d’estat de dependències quan estigui disponible. Perfilatge i diagnòstic dinàmic en aplicacions compatibles, amb permisos, límit temporal i impacte mesurat.",
        "cards": [
          "A1",
          "A5",
          "B5",
          "B8",
          "C1",
          "C2",
          "C3",
          "C4",
          "C7",
          "D1",
          "D2",
          "E1",
          "E2",
          "F2",
          "G2",
          "G3",
          "C5",
          "E3"
        ],
        "check": "Continuïtat de traça, permisos i visibilitat de les dependències externes.",
        "roleIds": [
          "funcional",
          "area_tic",
          "gestio_servei",
          "operadors",
          "externs"
        ]
      },
      {
        "code": "02",
        "name": "Dades, integracions i serveis comuns",
        "assets": "Oracle i SQL Server; integracions i SFTP corporatiu; dades mestres i Plataforma Transversal de Dades; Neo4j Aura corporatiu i pilots al CdC; analítica avançada i IA; identitats i AD.",
        "actors": "Equips de dades i components transversals; Oficines tècniques; Responsables d’identitat i integració.",
        "observation": "Latència i errors de consultes, bloquejos, cues, execució de processos de dades, frescor, identitat i propagació de context entre integracions. Per a IA, versions, consum i resultats de les eines. Mètriques natives de bases de dades. Instrumentació de missatgeria i integracions. Collectors i adaptadors. OpenTelemetry per a IA quan sigui compatible.",
        "cards": [
          "A1",
          "A2",
          "A3",
          "A6",
          "B3",
          "C2",
          "C3",
          "C4",
          "C6",
          "C7",
          "F2",
          "F3"
        ],
        "check": "Versions, permisos de consulta, frescor i propagació d’identificadors.",
        "roleIds": [
          "propietari_dada",
          "dada_ia",
          "arquitectura",
          "operadors",
          "eines_o11y"
        ]
      },
      {
        "code": "03",
        "name": "CPD, cloud i plataformes",
        "assets": "Lots CPD1–CPD4 i serveis cloud; AWS, Azure i Google Cloud segons l’abast del servei; OpenShift i virtualització; emmagatzematge Isilon i ECA; còpies i restauració; dependències d’alimentació com el SAI d’Olímpia. Els lots no equivalen al nombre de centres físics.",
        "actors": "Operadors dels lots CPD1–CPD4; CS Cloud; Equips de plataforma; Responsables d’infraestructura física.",
        "observation": "Capacitat, saturació, disponibilitat, errors, desplegaments i cost. Relacionar les càrregues amb els servidors, l’emmagatzematge, la xarxa i la dependència elèctrica. Per a còpies, recollir també proves de restauració. Exporters i agents de sistema. API de plataforma i cloud. Telemetria Kubernetes/OpenShift. eBPF en hosts Linux compatibles. Redfish o SNMP per a maquinari compatible.",
        "cards": [
          "A2",
          "A3",
          "A4",
          "A5",
          "B1",
          "B2",
          "B3",
          "C1",
          "C2",
          "D2",
          "E3",
          "E4",
          "F1"
        ],
        "check": "Maquinari i API compatibles, fonts físiques disponibles i prova de restauració.",
        "roleIds": [
          "operadors",
          "eines_o11y",
          "suport_producte",
          "arquitectura"
        ]
      },
      {
        "code": "04",
        "name": "Mainframe i entorns heretats",
        "assets": "Manteniment de maquinari i programari IBM Mainframe; Host departamental central; DB2 Connect; Impressió host; Comunicacions i allotjaments del CPD Nucli.",
        "actors": "Equips Nucli 1 i Nucli 2; Responsables d’aplicacions host; Operadors especialitzats.",
        "observation": "Recollir les mètriques i els registres natius, els treballs batch i les transaccions. Relacionar-los amb les crides de les aplicacions distribuïdes, indicant on no hi ha continuïtat de traça. Mètriques i registres natius de l’entorn host. SMF/RMF en sistemes z/OS compatibles. Connectors OpenTelemetry per a IBM Z segons versió i component.",
        "cards": [
          "A1",
          "A2",
          "A3",
          "A5",
          "A6",
          "B2",
          "D2",
          "F1"
        ],
        "check": "Sistemes i components reals, versions, llicències i enllaç amb les traces distribuïdes.",
        "roleIds": [
          "operadors",
          "suport_producte",
          "eines_o11y"
        ]
      },
      {
        "code": "05",
        "name": "Xarxa, connectivitat i fibra",
        "assets": "LAN i WLAN Educació; GESLAN, monitoratge i logs LAN C6; NUS, CATNIX, Xarxa SARA i anella sanitària; DNS, DHCP, NTP, ISE i VPN; Ethernet i transport transparent; Fibra fosca, canalitzacions i inventari de torres. Classes d’actius a contrastar: routers, commutadors (switches), tallafocs, punts d’accés Wi-Fi i transceptors.",
        "actors": "Equips LAN/Wi-Fi i C6; Operadors GESNUS i connectivitat; Operadors de transport; Responsables de Xarxa País i fibra.",
        "observation": "Estat i errors de ports, pèrdua, latència, jitter, saturació, canvis de ruta i configuració. Per a fibra, relacionar el circuit amb el tram físic i combinar potència òptica disponible, alarmes de l’operador i proves de camp. SNMPv3 i MIB disponibles. gNMI/OpenConfig quan el dispositiu ho suporti. Syslog. IPFIX o NetFlow segons compatibilitat. DOM dels transceptors compatibles. API d’operador, inventari geogràfic i resultats OTDR quan es disposi d’aquests. Sondes des de seu, Internet i destinació per diferenciar DNS, connexió i aplicació; els trams sense dades es mostren explícitament.",
        "cards": [
          "A1",
          "A2",
          "A6",
          "B3",
          "B7",
          "C5",
          "C6",
          "D2",
          "E2",
          "F3",
          "G3",
          "G2"
        ],
        "check": "Models, MIB i protocols disponibles; inventari de circuits i proves òptiques de l’operador.",
        "roleIds": [
          "operadors",
          "eines_o11y",
          "externs",
          "gestio_servei"
        ]
      },
      {
        "code": "06",
        "name": "Veu, mòbil i comunicacions",
        "assets": "Plataforma de comunicacions; Veu fixa; Telefonia mòbil; Numeració especial; Videoconferència; SMS i M2M.",
        "actors": "Operadors de comunicacions unificades; Equips de veu i mobilitat; Centres de suport dels operadors.",
        "observation": "Disponibilitat, establiment i qualitat de comunicació, retard i errors d’entrega, capacitat i afectació per ubicació o servei, amb dades agregades. API i alarmes de plataforma o operador. Estadístiques de sessió o entrega disponibles. Sondes autoritzades. Correlació amb xarxa i incident.",
        "cards": [
          "A1",
          "A2",
          "B6",
          "B7",
          "D2",
          "E1",
          "E2",
          "G2",
          "G3"
        ],
        "check": "Mètriques i alarmes disponibles, permisos de prova i qualitat per servei.",
        "roleIds": [
          "operadors",
          "suport_producte",
          "gestio_servei"
        ]
      },
      {
        "code": "07",
        "name": "Lloc de treball i col·laboració",
        "assets": "Equips Windows i desplegament de dispositius; Intune; VDI i IsardVDI; M365, OneDrive i eines de col·laboració; Impressió, multifunció i digitalització.",
        "actors": "SAU tècnics i funcionals; Equips ESB1–ESB4; Proveïdors de maquinari i impressió; Equip de plataforma de col·laboració.",
        "observation": "Temps d’inici de sessió, resposta del lloc de treball, salut de l’agent, connexió i disponibilitat de VDI, cues d’impressió i estat de serveis SaaS. Relacionar experiència i tiquets sense seguir l’activitat personal. Agents i registres Windows. API d’Intune i plataforma VDI segons permisos. Microsoft Graph Service Health per a M365. SNMP o API d’impressió. Mètriques d’experiència agregades.",
        "cards": [
          "A2",
          "A3",
          "B1",
          "B3",
          "C7",
          "D1",
          "D2",
          "D3",
          "E1",
          "F3",
          "G2"
        ],
        "check": "Cobertura dels agents, permisos del tenant i agregació de dades d’experiència.",
        "roleIds": [
          "sau",
          "operadors",
          "suport_producte",
          "gestio_servei"
        ]
      },
      {
        "code": "08",
        "name": "Seguretat i identitat",
        "assets": "Seguretat del perímetre; IPS; Protecció d’endpoint; SIEM i automatització de seguretat; Gestió de vulnerabilitats; Certificats digitals; Control d’accés de xarxa.",
        "actors": "Seguretat del CTTI; Agència de Ciberseguretat i SOC; enginyeria de seguretat; responsables d’identitat; equips operatius del servei.",
        "observation": "Relacionar disponibilitat i rendiment dels controls amb incidents, identitats, vulnerabilitats i serveis afectats. Compartir el context necessari amb el SOC mantenint responsabilitats i permisos. Integració controlada amb SIEM/SOAR i EDR. Syslog i API de dispositiu. Inventari de certificats i comprovacions de caducitat. Graf d’actius i identitats. Polítiques d’accés i auditoria. La Memòria CTTI 2025 recull Keyfactor Command. Atos proposa contrastar-ne la cobertura i comprovar la renovació efectiva amb una connexió posterior, incloent-hi errors i certificats fora del circuit automatitzat.",
        "cards": [
          "B6",
          "B8",
          "C1",
          "C4",
          "D2",
          "F3",
          "G1",
          "G2"
        ],
        "check": "Responsabilitats del SOC, permisos i separació de la informació operativa.",
        "roleIds": [
          "seguretat",
          "operadors",
          "eines_o11y"
        ]
      },
      {
        "code": "09",
        "name": "Ràdio, audiovisuals i equips especialitzats",
        "assets": "RESCAT i xarxa/àudio TETRA; Difusió TDT i FM; Sales de vista ARCONTE; Serveis d’emergències 112/PISE; Panells, robòtica i audiovisuals educatius.",
        "actors": "Operadors de ràdio i difusió; Equips d’emergències; Responsables d’equipament educatiu; Proveïdors especialitzats.",
        "observation": "Integrar estat, alarmes, qualitat disponible i avisos del proveïdor, relacionats amb ubicació i servei. Incorporar cada família segons criticitat, suport del fabricant i utilitat operativa. API o passarel·la del fabricant. SNMP quan existeixi. Esdeveniments d’operador. Sondes o proves de servei autoritzades. Integració amb inventari i ITSM.",
        "cards": [
          "A1",
          "A2",
          "B1",
          "B2",
          "B7",
          "D2",
          "E2",
          "G3"
        ],
        "check": "Suport del fabricant, criticitat i senyals útils per a cada família.",
        "roleIds": [
          "operadors",
          "suport_producte",
          "funcional",
          "externs"
        ]
      },
      {
        "code": "10",
        "name": "Centre de Control i cadena de resposta",
        "assets": "Gestió de servei amb Àtom/Helix i els circuits corporatius aplicables; SOSTIC, PCN&ME i PagerDuty; gestió de canvis, problemes i incidents; eines d’observabilitat i canals d’avís; CONTIC per al seguiment corresponent; escalats de nivell 0 a nivell 4.",
        "actors": "Centre de Control; gestió del servei i de l’entrega; Àrees TIC; SAU; gestió d’eines d’observabilitat; equips resolutors, integradors i fabricants; responsables funcionals quan el cas ho requereixi.",
        "observation": "Relacionar detecció, servei afectat, responsable, escalat, acceptació, intervenció i restauració. Mesurar també si falla l’eina de monitoratge o el camí de notificació. Connectors ITSM amb confirmació i deduplicació. Directori de responsabilitats versionat. Motor d’encaminament i guàrdies. Cronologia d’incident. Sondes de la cadena d’observació. Agrupació de tiquets SAU autoritzats com a senyal a contrastar. Banc d’incidents per repetir l’avaluació dels assistents de diagnòstic.",
        "cards": [
          "A3",
          "A6",
          "B3",
          "B4",
          "B5",
          "B6",
          "B7",
          "B8",
          "C1",
          "C2",
          "C3",
          "C4",
          "C7",
          "D1",
          "D2",
          "D3",
          "E2",
          "E4",
          "F2",
          "F3",
          "G3",
          "G2",
          "C6"
        ],
        "check": "Vigència dels responsables, rutes, franges de cobertura i acceptació de l’escalat.",
        "roleIds": [
          "cdc",
          "gestio_servei",
          "area_tic",
          "sau",
          "eines_o11y",
          "operadors",
          "suport_producte"
        ]
      }
    ],
    "validation": "Relacionar família oficial, servei, procés crític i responsable amb l’inventari vigent. Escollir mostres representatives per criticitat i dependències. Comprovar senyals esperats, frescor, identificadors, rutes, acceptació i recuperació. Distingir fallada de servei i pèrdua de visibilitat. Mostrar «no avaluat» quan falti evidència i vincular cada mancança a B2.",
    "source": "Síntesi de la Memòria CTTI 2025, documentació d’observabilitat d’agost de 2026, matriu d’escalats de maig de 2026 i models de servei 132/133. Revisió: 15 de setembre de 2026. No es publiquen documents originals ni dades de contacte.",
    "cardNotes": {
      "A1": "Atos proposa adaptar aquest contracte a cada família: una transacció d’aplicació, un port de switch, un circuit de fibra o un treball batch no expressen la salut de la mateixa manera. Tots comparteixen identitat de servei i responsable; cada família conserva les seves unitats, estats i límits.",
      "A2": "L’abast inclou les eines LAN C6, els serveis del NUS, els CPD, el mainframe i la col·laboració. Atos proposa aprofitar les fonts existents i incorporar adaptadors quan calguin, amb una prova d’entrada, pèrdua i recuperació per a cadascuna. Per al mainframe, es validarien fonts natives i connectors com IBM Z Observability Connect; per a M365, la informació de Service Health es contrastaria amb proves pròpies. La flota de collectors identifica versions i configuració real, amb desplegament gradual i recuperació provats per domini.",
      "A5": "Per als sistemes heretats i el mainframe, l’alta partiria de les fonts natives disponibles i mostraria on s’interromp la continuïtat amb la resta del servei. En incorporar equips o serveis nous, la prova d’alta comprovaria també responsable, senyals esperats i camí d’escalat. En aplicacions compatibles es comprovaria també el pas de la petició lenta al perfil de codi i el diagnòstic temporal autoritzat.",
      "A6": "Atos proposa relacionar aplicació, base de dades, servidor, seu, circuit i tram de xarxa amb l’equip que els opera. Les relacions de la matriu d’escalats són un punt de partida que cal contrastar amb l’inventari i la descoberta. Una dependència tindria origen i data de validació per evitar que el mapa presenti com a vigent una relació antiga.",
      "B1": "Dins de cada domini, la cobertura es llegiria per famílies: mainframe, CPD i cloud, xarxa i fibra, comunicacions, lloc de treball i serveis especialitzats. Així, una bona cobertura d’aplicacions no amagaria una mancança en un enllaç o en un servei de veu.",
      "B3": "Incloure una font de xarxa de C6, una aplicació, una font del mainframe i un servei SaaS. Una caiguda de l’adaptador o una dada sense actualitzar ha d’aparèixer com a pèrdua de visibilitat, encara que el servei continuï disponible.",
      "B6": "Un cas de prova útil travessa aplicació, CPD i operador de xarxa: cada equip aporta el fragment que pot acreditar i el traspàs conserva el mateix servei i incident. Les dependències AOC o d’altres organismes també han de tenir un punt de contacte funcional i un límit de visibilitat declarat.",
      "B7": "Atos proposa convertir la matriu d’escalats en una font versionada de rols i rutes, contrastada amb els responsables. Es conservaria la distinció entre incidència i petició, les franges de cobertura i els nivells d’escalat del proveïdor. Aquests nivells 0–4 són independents dels nivells d’autonomia dels agents de C1.",
      "B8": "El comandament ha de poder reunir aplicacions, CPD, telco, lloc de treball i SOC quan comparteixen afectació. La matriu ajuda a identificar els equips; l’incident registra qui participa, què ha acceptat i quina comprovació falta per donar el servei per recuperat.",
      "C5": "En una avaria de xarxa, la regla pot agrupar alarmes de ports i serveis dependents sense perdre el detall de les seus afectades. La inhibició s’ha de provar amb el mapa de dependències vigent per evitar que una segona avaria quedi amagada. Una finestra de diagnòstic podria augmentar el detall només en el servei afectat, amb caducitat, càrrega i cost controlats.",
      "C6": "Provar un incident amb impacte en diverses seus: contrastar errors d’aplicació, estat de ports, degradació òptica disponible i avisos de l’operador. L’assistent ha de distingir una hipòtesi sobre el tram físic d’una avaria confirmada.",
      "D1": "Les altes poden oferir plantilles diferents per a una aplicació, un equip de xarxa, una font Windows o una API de servei SaaS. El resultat sempre mostra què ha quedat connectat i quines proves s’han superat.",
      "D2": "Un paquet per a una base de dades, un switch o una plataforma VDI ha d’indicar versions, senyals i llindars aplicables. Compartir el paquet no significa aplicar el mateix llindar a tots els serveis.",
      "D3": "Els exercicis poden reproduir el mateix incident des del SAU, l’equip d’aplicació, el CPD, l’operador de xarxa i el SOC. Cada rol ha de trobar la seva evidència i saber com compartir-la.",
      "E1": "El recorregut pot ser un tràmit amb signatura i notificació, una sessió de treball amb VDI o l’establiment d’una comunicació. Atos proposa triar el resultat que representa servei prestat i relacionar-lo amb les dependències tècniques.",
      "E2": "Els indicadors s’adapten al servei: temps i èxit d’un tràmit, pèrdua i latència d’un circuit, establiment de trucada o disponibilitat d’un escriptori virtual. Es manté la mateixa disciplina de càlcul i es conserven les diferències entre famílies.",
      "E3": "Atos proposa llegir el cost per família i servei, incloent CPD, cloud, xarxa i eines de lloc de treball quan les dades ho permetin. El repartiment de recursos compartits, com un circuit o una plataforma, ha de quedar explicat. El perfilatge pot orientar millores de codi en plataformes compatibles; la reducció de consum es contrasta separadament amb la factura.",
      "F1": "La mostra ha d’anar incloent una aplicació, una font de xarxa, un entorn heretat i un servei cloud. Atos proposa registrar quins senyals o funcions depenen d’un connector o llicència que no es pot traslladar.",
      "F3": "Aquesta separació és especialment rellevant quan una mateixa vista combina dades d’operadors telco, equips d’aplicació i SOC, o informació d’experiència del lloc de treball. Cada rol consulta només el detall necessari per al seu servei.",
      "G1": "Atos proposa incorporar-hi la salut del perímetre, els certificats i el control d’accés de xarxa, coordinant el context amb l’Agència de Ciberseguretat. Un control de seguretat indisponible o una connexió caducada també pot explicar l’afectació d’un servei.",
      "G2": "Per al lloc de treball i les comunicacions, les proves han de sortir del navegador: entrada a VDI, accés a col·laboració o establiment de trucada, amb instruments compatibles. Les dades d’experiència s’agreguen per servei i ubicació per comprendre l’afectació sense seguir l’activitat personal. Els avisos SAU minimitzats poden aportar un senyal complementari: el pilot els agrupa i el CdC els contrasta amb les fonts disponibles, sense retardar el circuit ordinari d’avís i escalat encara que falti telemetria.",
      "G3": "La vista pot incloure components comuns com identitat, DNS, connectivitat del NUS i serveis de col·laboració, a més de les dependències externes. La informació d’un operador s’ha de distingir de les comprovacions pròpies."
    }
  },
  "guide": {
    "title": "Quatre situacions per començar",
    "intro": "Tria un problema recognoscible i segueix les fitxes que el resolen. Cada recorregut parteix de capacitats del CTTI i acaba amb una prova de resultat.",
    "steps": [
      {
        "label": "Alta",
        "title": "Una aplicació que neix observada",
        "text": "Reutilitzar el paquet CTTI, la instrumentació i les proves MAT. Comprovar que una operació genera dades vàlides i que el senyal es pot consultar. Un desplegament correcte i una alta observada han de quedar diferenciats.",
        "cards": [
          "A1",
          "A4",
          "A5",
          "B3",
          "D1"
        ]
      },
      {
        "label": "Canvi",
        "title": "El servei empitjora després d’un canvi",
        "text": "Relacionar la degradació amb versions, proves i finestra de desplegament. Comparar abans i després, comprovar la hipòtesi i validar la recuperació funcional.",
        "cards": [
          "A4",
          "A6",
          "B5",
          "B8",
          "E2"
        ]
      },
      {
        "label": "Resultat",
        "title": "El tràmit s’accepta però no acaba",
        "text": "Seguir productor, plataforma i consumidor. Fer visible una operació pendent, un reintent i el resultat final, sense comptar duplicats ni donar per completat el que només s’ha rebut.",
        "cards": [
          "A2",
          "A6",
          "B6",
          "E1",
          "G2"
        ]
      },
      {
        "label": "Assistència",
        "title": "Un assistent ajuda i deixa evidència",
        "text": "Provar el diagnòstic sobre fonts autoritzades. Comprovar permisos, context, versions i cost; la persona pot revisar el resultat i reprendre el procediment quan falla una dependència.",
        "cards": [
          "C1",
          "C2",
          "C3",
          "C4",
          "C6",
          "E3",
          "F3"
        ]
      }
    ],
    "limit": "Recorreguts proposats per Atos. El servei, els participants, les dades i els llindars es concretaran abans del pilot.",
    "sections": [
      {
        "title": "Com utilitzem el Hype Cycle",
        "text": "Gartner ajuda a situar expectatives de mercat; els seus horitzons no són terminis d’implantació per al CTTI. La prioritat d’aquests recorreguts depèn del problema, de la base disponible i de l’evidència que falti."
      },
      {
        "title": "La telemetria continua al centre",
        "text": "El gràfic situa OpenTelemetry i eBPF després del pic d’expectatives. Això convida a concretar compatibilitat, cost i esforç d’adopció en cada entorn."
      },
      {
        "title": "La IA exigeix mirar més enllà del rendiment",
        "text": "L’observabilitat de models i d’agents apareix en fases inicials. Cal observar la qualitat de les respostes i les accions, a més del consum i la latència."
      },
      {
        "title": "L’automatització té graus",
        "text": "La resposta automatitzada a incidents apareix més avançada que diverses categories d’IA. Una automatització delimitada i provada pot ser útil abans d’ampliar l’autonomia dels agents."
      },
      {
        "title": "Què aprofitem del workshop d’Atos",
        "text": "Metadades de servei des del desplegament (A1), límits per tasca d’agent (C4), diagnòstic amb resposta de l’operador (C6) i cost per resultat validat (E3). Són propostes per provar amb el CTTI; les xifres il·lustratives i les comparatives comercials del workshop no s’utilitzen com a resultats demostrats."
      }
    ],
    "sources": [
      {
        "title": "Gartner · Hype Cycle for Monitoring and Observability, 2026",
        "url": "https://www.gartner.com/en/documents/8151629",
        "note": "21 de juliol de 2026. Lectura de la imatge aportada i de l’abstract públic; l’informe complet pot requerir accés Gartner."
      },
      {
        "title": "Atos · WorkShop Observability 17 Sept 2026 v4.1_EN",
        "url": "",
        "note": "Document de treball aportat. Revisió de les 106 diapositives i de les notes disponibles; la data correspon al nom del fitxer. No s’adjunta l’original."
      }
    ]
  }
};
