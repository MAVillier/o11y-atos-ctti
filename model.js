window.ATLES_MODEL={
  "schemaVersion": 1,
  "updated": "2026-09-16",
  "title": "Actors i processos de referència",
  "intro": "Una mateixa lectura per entendre la proposta i situar cada equip. Les responsabilitats concretes de cada pilot es contrastaran amb el CTTI.",
  "assignmentNote": "Encaix funcional proposat per Atos, basat en les fonts. No és un organigrama ni una nova assignació formal de competències.",
  "states": {
    "documentat": "Base documentada",
    "model_previst": "Model de servei previst",
    "proposta": "Proposta d’Atos"
  },
  "sourceNote": "Les fonts distingeixen directrius, capacitats descrites i elements en planificació. El pilot comprova l’abast real de cada servei.",
  "roles": [
    {
      "id": "govern_ctti",
      "name": "CTTI · govern i decisions",
      "group": "Decidir i validar",
      "role": "Fixa les directrius i designa qui aprova criteris, excepcions i canvis d’abast.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 10",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 11",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "funcional",
      "name": "Responsable funcional",
      "group": "Decidir i validar",
      "role": "Defineix el resultat del procés, la criticitat i els moments sensibles; valida el resultat funcional.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26",
          "state": "documentat"
        },
        {
          "id": "CTTI_MQS",
          "locator": "Validació i manual d’explotació",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "area_tic",
      "name": "Àrea TIC / àmbit",
      "group": "Coordinar el servei",
      "role": "Relaciona les necessitats del departament amb el seguiment del servei i la comunicació d’afectacions.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 25–27",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 5",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "gestio_servei",
      "name": "Gestió del servei i de l’entrega",
      "group": "Coordinar el servei",
      "role": "Connecta compromisos, equips i acceptació operativa, segons el circuit de cada servei.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 112–113",
          "state": "documentat"
        },
        {
          "id": "CTTI_MQS",
          "locator": "Acceptació operativa",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "oficina_o11y",
      "name": "Oficina d’Observabilitat",
      "group": "Decidir i validar",
      "role": "Intervé en estàndards, freqüències, excepcions i activació d’APM segons el llibre blanc. No s’equipara automàticament al prestador d’eines.",
      "sources": [
        {
          "id": "CTTI_LB2026",
          "locator": "§5.3 i §8",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 11 i 13",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "cdc",
      "name": "Centre de Control",
      "group": "Coordinar el servei",
      "role": "El model 132 li assigna el lideratge d’incidents d’alt impacte i la coordinació de problemes. Els equips de cada solució executen les intervencions tècniques.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 3–5, 10 i 18",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "eines_o11y",
      "name": "Gestió d’eines d’observabilitat",
      "group": "Operar i resoldre",
      "role": "Desenvolupa integracions i administra les eines del seu abast; resol o escala al suport de producte quan correspon.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 3–6 i 12–13",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "operadors",
      "name": "Equips de les solucions observades",
      "group": "Operar i resoldre",
      "role": "Els equips d’aplicació instrumenten i intervenen en la seva solució; les oficines i operadors de plataformes compartides ho fan sobre API Manager, EventHub, identitat o altres serveis segons abast. Cada tram conserva la seva responsabilitat tècnica.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5 i 10",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG14",
          "locator": "Guia de suport que diferencia projecte i servei; no acredita per si sola el propietari contractual vigent de cada component.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG15",
          "locator": "Oficina, administració i autoritzacions documentades; els compromisos del fabricant no equivalen al temps de restauració de tota la cadena.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "suport_producte",
      "name": "Integradors i fabricants",
      "group": "Operar i resoldre",
      "role": "Aporten suport especialitzat i manteniment segons component, amb traspàs, acceptació i prova de recuperació.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ANS133",
          "locator": "CO-INC03/04, p. 18–19",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "sau",
      "name": "Atenció i suport a l’usuari",
      "group": "Operar i resoldre",
      "role": "Rep afectacions i peticions, aporta context d’ús i comunica pels canals previstos.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 27–29",
          "state": "documentat"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "arquitectura",
      "name": "Arquitectura i Integració",
      "group": "Aportar criteri transversal",
      "role": "Relaciona disseny, dependències i cicle de vida amb els patrons corporatius. Intervé en les excepcions d’arquitectura i en la validació d’usos d’IA fora de les condicions aprovades.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 39 i 46",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG13",
          "locator": "Procediment publicat; no atribueix a Arquitectura totes les excepcions de retenció, seguretat o negoci.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "qualitat",
      "name": "Qualitat",
      "group": "Aportar criteri transversal",
      "role": "Aporta criteris, proves i suport a diagnòstic i millora segons procediment. No dirigeix per defecte tots els problemes.",
      "sources": [
        {
          "id": "CTTI_MQS",
          "locator": "Proves i operació",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 18",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "dada_ia",
      "name": "Govern de dades i IA",
      "group": "Aportar criteri transversal",
      "role": "El govern funcional de dades, la gestió tècnica del CTTI i els propietaris de cada dada tenen responsabilitats diferenciades. La normativa d’IA concreta els catàlegs i el consum governat; Arquitectura valora les excepcions aplicables.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 37 i 39–42",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 7–8",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG07",
          "locator": "Estructura i dependències de desplegament documentades; no equivalen a comunicacions observades en producció.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG11",
          "locator": "Govern funcional i tècnic publicat; el catàleg de referència no substitueix el catàleg de mètriques.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "propietari_dada",
      "name": "Responsable de la dada",
      "group": "Decidir i validar",
      "role": "Aporta la definició, la qualitat esperada i les condicions d’ús del conjunt de dades que es vol mesurar o compartir.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 7–8",
          "state": "model_previst"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 42",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "seguretat",
      "name": "Seguretat CTTI, Agència i SOC",
      "group": "Aportar criteri transversal",
      "role": "Acorden l’intercanvi i la resposta de seguretat segons competències, permisos i necessitat de cada cas.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 47 i 62",
          "state": "documentat"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "direccio",
      "name": "Direcció i seguiment econòmic",
      "group": "Decidir i validar",
      "role": "Decideixen prioritats i recursos amb indicadors reproduïbles i el suport de les capacitats FinOps aplicables.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 40, 47 i 113",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 22–24",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "externs",
      "name": "Organismes i serveis externs",
      "group": "Dependències amb govern propi",
      "role": "Aporten serveis, evidències i punts de contacte dins d’un abast acordat; cal mostrar el límit de visibilitat i actuació del CTTI.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 27 i 80–82",
          "state": "documentat"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        }
      ]
    }
  ],
  "processes": [
    {
      "id": "govern_mesura",
      "name": "Governar la mesura",
      "description": "Acordar què representa servei prestat, com es mesura i qui valida els canvis."
    },
    {
      "id": "alta_canvi",
      "name": "Donar d’alta i canviar amb garanties",
      "description": "Passar del disseny a una operació preparada, amb proves, excepcions i mantenidor."
    },
    {
      "id": "telemetria",
      "name": "Recollir i conservar dades fiables",
      "description": "Relacionar fonts, ingesta, retenció i consulta amb responsables i permisos."
    },
    {
      "id": "qualitat_cobertura",
      "name": "Comprovar cobertura i corregir mancances",
      "description": "Distingir una falta de dades d’una fallada del servei i tancar el deute amb proves."
    },
    {
      "id": "incidents",
      "name": "Coordinar la recuperació del servei",
      "description": "Conduir el cas, assignar cada intervenció i demostrar la recuperació abans del tancament."
    },
    {
      "id": "problemes",
      "name": "Investigar causes i evitar recurrències",
      "description": "Vincular el problema amb l’incident, les accions correctores i la prova de tancament."
    },
    {
      "id": "escalats",
      "name": "Traspassar treball i confirmar-ne l’acceptació",
      "description": "Mantenir context, cobertura horària i responsable fins que el següent equip assumeix la tasca."
    },
    {
      "id": "coneixement",
      "name": "Mantenir coneixement i capacitat d’ús",
      "description": "Reutilitzar fonts vigents i comprovar que cada rol pot resoldre la seva part del cas."
    },
    {
      "id": "agents",
      "name": "Governar i observar els agents",
      "description": "Delimitar funcions, permisos, versions, resultat i retorn al procediment humà."
    },
    {
      "id": "autoservei",
      "name": "Atendre peticions repetibles",
      "description": "Executar operacions aprovades des del canal corresponent i comprovar-ne el resultat."
    },
    {
      "id": "resultat_servei",
      "name": "Mesurar resultat i experiència",
      "description": "Relacionar procés públic, moments crítics, qualitat percebuda i dependències tècniques."
    },
    {
      "id": "seguiment_valor",
      "name": "Explicar el servei i prioritzar millores",
      "description": "Publicar dades reproduïbles i contrastar compromisos, cost i benefici net."
    },
    {
      "id": "dades_accessos",
      "name": "Compartir dades amb control",
      "description": "Validar finalitat, destinataris, accés i detall abans de compartir o publicar."
    },
    {
      "id": "reversibilitat",
      "name": "Transferir sense perdre la capacitat d’operar",
      "description": "Provar que un equip receptor pot reconstruir les funcions acordades."
    },
    {
      "id": "exposicio",
      "name": "Coordinar el context de seguretat",
      "description": "Relacionar exposició i controls amb els serveis, respectant el circuit de ciberseguretat."
    },
    {
      "id": "comunicacio",
      "name": "Comunicar l’estat segons el destinatari",
      "description": "Confirmar què funciona, què està afectat i qui valida cada missatge."
    }
  ],
  "sources": [
    {
      "id": "CTTI_MEM2025",
      "title": "Memòria CTTI 2025",
      "date": "2026-07",
      "url": "",
      "kind": "Memòria institucional",
      "state": "documentat",
      "note": "Activitat de 2025. Es distingeixen implantacions, pilots i previsions; no acredita cobertura general."
    },
    {
      "id": "CTTI_LB2026",
      "title": "Llibre Blanc d’Observabilitat · agost de 2026",
      "date": "2026-08",
      "url": "",
      "kind": "Documentació CTTI aportada",
      "state": "documentat",
      "note": "Marc de mesura i funcions concretes de l’Oficina d’Observabilitat; la configuració real es contrasta per servei."
    },
    {
      "id": "CTTI_POL2026",
      "title": "Estàndards i polítiques d’observabilitat",
      "date": "2026",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/estandards/",
      "kind": "Marc corporatiu",
      "state": "documentat",
      "note": "Cinc famílies oficials. Els deu àmbits de l’Atles serveixen per explorar cobertura i no substitueixen aquesta classificació."
    },
    {
      "id": "CTTI_T132",
      "title": "Centre de Control · abast tècnic del servei 132",
      "date": "2026",
      "url": "",
      "kind": "Model de servei documentat",
      "state": "model_previst",
      "note": "Lideratge i coordinació dins l’abast definit. Els requisits no acrediten implantació actual de tot el model."
    },
    {
      "id": "CTTI_I132",
      "title": "Centre de Control · calendari previst del servei 132",
      "date": "2026",
      "url": "",
      "kind": "Document de servei aportat",
      "state": "model_previst",
      "note": "La invitació 132, versió catalana v2, p. 9, situa l’execució requerida a partir de 2027."
    },
    {
      "id": "CTTI_T133",
      "title": "Gestió d’eines d’observabilitat · abast tècnic del servei 133",
      "date": "2026",
      "url": "",
      "kind": "Model de servei documentat",
      "state": "model_previst",
      "note": "Projectes i administració d’eines. No atribueix automàticament al prestador totes les decisions corporatives d’observabilitat."
    },
    {
      "id": "CTTI_ANS132",
      "title": "Centre de Control · definicions de seguiment i ANS",
      "date": "2026",
      "url": "",
      "kind": "Model de mesura documentat",
      "state": "model_previst",
      "note": "Distingir temps d’informe, resolució i seguiment. La proposta Atos no modifica fórmules ni llindars d’ANS."
    },
    {
      "id": "CTTI_ANS133",
      "title": "Eines d’observabilitat · definicions de seguiment i ANS",
      "date": "2026",
      "url": "",
      "kind": "Model de mesura documentat",
      "state": "model_previst",
      "note": "Diferencia intervenció de l’adjudicatari i del mantenidor; les definicions es validen abans d’automatitzar el càlcul."
    },
    {
      "id": "CTTI_ESC2026",
      "title": "Matriu d’escalats de proveïdors · 8 de maig de 2026",
      "date": "2026-05-08",
      "url": "",
      "kind": "Referència operativa aportada",
      "state": "documentat",
      "note": "Base per relacionar serveis, equips i rutes. Els contactes no es publiquen; vigència i responsabilitats es contrasten per servei."
    },
    {
      "id": "CTTI_AUDIENCES",
      "title": "Plataforma corporativa d’observabilitat · destinataris",
      "date": "",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/plat_obs_corp/",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Proveïdors, Àmbits, Centre de Control i Direcció, amb necessitats i detall diferents."
    },
    {
      "id": "CTTI_MQS",
      "title": "Model de Qualitat de Solucions · manual d’explotació",
      "date": "",
      "url": "https://qualitat.solucions.gencat.cat/procediments/manual_explotacio/",
      "kind": "Procediment corporatiu",
      "state": "documentat",
      "note": "La validació funcional i l’acceptació operativa tenen participants diferents; s’aplica el circuit que correspongui."
    },
    {
      "id": "CTTI_PTD",
      "title": "PTD · serveis transversals d’analítica avançada i IA",
      "date": "",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ptd/5.-Serveis-Transversals-dAnal%C3%ADtica-avan%C3%A7ada-i-IA/",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Capacitats corporatives per aprofitar. La monitorització amb Neuraltrust hi consta com a pròxima disponibilitat, no com a desplegament acreditat."
    },
    {
      "id": "CTTI_CG01",
      "title": "CTTI — Regles corporatives de validació d’API i producte",
      "url": "https://canigo.ctti.gencat.cat/related/apim/3292_AMT_ERQ_Regles-Validacio_MRR.pdf",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Disseny funcional publicat el juliol de 2026; precedent basat en Spectral, no validador de telemetria acreditat."
    },
    {
      "id": "CTTI_CG02",
      "title": "CTTI — FAQ d’API Manager",
      "url": "https://canigo.ctti.gencat.cat/plataformes/apim/faq/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Comportament documentat: errors que bloquegen i avisos que es registren; no s’han inspeccionat execucions productives."
    },
    {
      "id": "CTTI_CG03",
      "title": "CTTI — Observabilitat al Cloud",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/obs_cloud_protected/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Arquitectura contrastada amb la còpia aportada, §§1–2; l’entrada pública és protegida i no se n’ha verificat el contingut vigent."
    },
    {
      "id": "CTTI_CG04",
      "title": "CTTI — Llibre Blanc d’observabilitat i catàleg de mètriques",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Llibre-Blanc_protected/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Criteris contrastats amb el Llibre Blanc i el catàleg v1.1 aportats; contingut protegit vigent no contrastat i configuracions productives no inspeccionades."
    },
    {
      "id": "CTTI_CG05",
      "title": "CTTI — Repositori d’artefactes",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-repositori-artefactes/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Polítiques de cicle de vida publicades per a artefactes; són diferents de les polítiques de retenció de telemetria."
    },
    {
      "id": "CTTI_CG06",
      "title": "CTTI — Nou orquestrador de releases disponible a SIC+",
      "url": "https://canigo.ctti.gencat.cat/noticies/2026-07-29-orquestrador-de-releases/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Disponibilitat anunciada el 29 de juliol de 2026; no acredita adopció universal."
    },
    {
      "id": "CTTI_CG07",
      "title": "CTTI — Orquestrador de releases",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-orquestrador-releases/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Guia de metadades, versions i plans; no s’han inspeccionat repositoris ni desplegaments reals."
    },
    {
      "id": "CTTI_CG08",
      "title": "CTTI — Integració amb Remedy",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-remedy-integration/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Circuit de canvi documentat; la versió i la modalitat aplicables s’han de verificar abans d’automatitzar-les."
    },
    {
      "id": "CTTI_CG09",
      "title": "CTTI — Construcció de la mesura",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/construccio_mesura/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Paquets i criteris publicats; no demostren compliment de cada aplicació."
    },
    {
      "id": "CTTI_CG10",
      "title": "CTTI — Integració amb el MAT",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ghec/gh-mat-integration/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Proves i tractament de tests no informats documentats; sense inspecció de resultats reals."
    },
    {
      "id": "CTTI_CG11",
      "title": "CTTI — Dades de Referència",
      "url": "https://canigo.ctti.gencat.cat/plataformes/dadesref/dadesref/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Govern funcional i tècnic publicat; el catàleg de referència no substitueix el catàleg de mètriques."
    },
    {
      "id": "CTTI_CG12",
      "title": "CTTI — Nivells de mesura",
      "url": "https://canigo.ctti.gencat.cat/plataformes/observabilitat/Informacio_general/monit_DIS_CAP/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Model publicat de nivells; no és una mesura de cobertura desplegada."
    },
    {
      "id": "CTTI_CG13",
      "title": "CTTI — Procediment de gestió d’excepcions d’arquitectura",
      "url": "https://canigo.ctti.gencat.cat/arquitectura/procedimentGestioExcepcionsArquitectura/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Procediment publicat; no atribueix a Arquitectura totes les excepcions de retenció, seguretat o negoci."
    },
    {
      "id": "CTTI_CG14",
      "title": "CTTI — Suport d’API Manager",
      "url": "https://canigo.ctti.gencat.cat/plataformes/apim/suport/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Guia de suport que diferencia projecte i servei; no acredita per si sola el propietari contractual vigent de cada component."
    },
    {
      "id": "CTTI_CG15",
      "title": "CTTI — Suport d’EventHub",
      "url": "https://canigo.ctti.gencat.cat/plataformes/eventhub/Suport/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Oficina, administració i autoritzacions documentades; els compromisos del fabricant no equivalen al temps de restauració de tota la cadena."
    },
    {
      "id": "CTTI_CG16",
      "title": "CTTI — Normativa tècnica d’intel·ligència artificial vigent",
      "url": "https://canigo.ctti.gencat.cat/arquitectura/IA/normativa_IA_CTTI/vigent/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació."
    },
    {
      "id": "CTTI_CG17",
      "title": "CTTI — Introducció a EventHub",
      "url": "https://canigo.ctti.gencat.cat/plataformes/eventhub/Introduccio/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Servei corporatiu Kafka/Confluent descrit; no acredita que una aplicació concreta l’utilitzi ni que ja se’n conciliï el resultat funcional."
    },
    {
      "id": "CTTI_CG18",
      "title": "CTTI — Mòduls de la PTD: FinOps",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ptd/2.-Moduls-de-la-PTD/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Capacitat descrita per al perímetre indicat; no s’han verificat factures, estalvis ni atribució a tots els serveis."
    },
    {
      "id": "CTTI_CG19",
      "title": "CTTI — Welcome pack de la PTD, pàgina 34",
      "url": "https://canigo.ctti.gencat.cat/plataformes/ptd/related/PDF/PTD_welcome_pack.pdf#page=34",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Document de maig de 2025 que corrobora el precedent FinOps; no és un balanç d’estalvi mesurat."
    },
    {
      "id": "CTTI_CG20",
      "title": "CTTI — Tipologies d’integració amb GICAR",
      "url": "https://canigo.ctti.gencat.cat/plataformes/gicar/integracions/tipologies-integracio/",
      "date": "s.d.",
      "kind": "Documentació oficial",
      "state": "documentat",
      "note": "Matriu d’integracions publicada; no acredita un únic recorregut d’identitat per a totes les aplicacions."
    }
  ],
  "cards": [
    {
      "id": "A1",
      "processId": "govern_mesura",
      "relatedProcessIds": [],
      "coordinator": [
        "oficina_o11y"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "oficina_o11y",
        "funcional",
        "propietari_dada"
      ],
      "assignmentState": "proposta",
      "evidence": "Validar mostres correctes i defectuoses de dos tipus de servei i provar un canvi de versió. La prova ha de detectar els errors previstos, explicar-los i demostrar que les consultes afectades es conserven o es migren.",
      "baseCtti": "El CTTI ja publica regles executables per validar contractes d’API, amb severitat i criteris d’acceptació. És un precedent concret per portar els formats d’observabilitat a comprovacions que els equips puguin repetir.",
      "contribution": "Atos proposa preparar esquemes de telemetria versionats, exemples vàlids i proves que detectin camps absents, unitats incorrectes o canvis de significat. Cada error tindria responsable i tractament acordat, preservant la visibilitat dels senyals crítics mentre es corregeix.",
      "sources": [
        {
          "id": "CTTI_LB2026",
          "locator": "§5.3 i §8",
          "state": "documentat"
        },
        {
          "id": "CTTI_POL2026",
          "locator": "Famílies, eixos i paquets de mesura",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 7–11",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG01",
          "locator": "Disseny funcional publicat el juliol de 2026; precedent basat en Spectral, no validador de telemetria acreditat.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG02",
          "locator": "Comportament documentat: errors que bloquegen i avisos que es registren; no s’han inspeccionat execucions productives.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "A2",
      "processId": "telemetria",
      "relatedProcessIds": [],
      "coordinator": [
        "eines_o11y"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "suport_producte"
      ],
      "validators": [
        "oficina_o11y",
        "arquitectura",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Comparar dues fonts representatives i interrompre’n una en un entorn de prova. El resultat ha de separar dades actuals, dades antigues i font inaccessible, i comprovar què es recupera quan torna la connexió.",
      "baseCtti": "La guia Cloud aportada descriu una arquitectura federada de Talaia per a AWS i Azure, amb repositoris Elastic a cada entorn i consulta amb Cross-Cluster Search. Aquesta base permet estudiar què convé consultar on ja és i què necessita un camí d’ingesta addicional.",
      "contribution": "Atos proposa provar cada connector i cada tram de recollida abans d’ampliar l’arquitectura. La comparació faria visibles permisos, retard, pèrdues i cost, amb un responsable per tram i el CdC informat quan es perdi visibilitat.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 6 i 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 46",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG03",
          "locator": "Arquitectura contrastada amb la còpia aportada, §§1–2; l’entrada pública és protegida i no se n’ha verificat el contingut vigent.",
          "state": "documentat"
        },
        {
          "id": "CTTI_AUDIENCES",
          "locator": "Capacitats corporatives descrites; la font no quantifica cobertura efectiva ni rendiment.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "A3",
      "processId": "telemetria",
      "relatedProcessIds": [],
      "coordinator": [
        "oficina_o11y"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "propietari_dada",
        "gestio_servei",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Escollir una mètrica, un conjunt de logs i una evidència d’incident, i simular-ne el cicle de vida en un entorn separat. La prova ha de demostrar què continua consultable, amb quina resolució i en quant de temps es recupera.",
      "baseCtti": "El Llibre Blanc i el catàleg aportats ja contenen criteris de retenció, amb durades concretes i altres que necessiten precisió. El punt de partida és conciliar-los amb la configuració aplicada i amb les necessitats de cada servei.",
      "contribution": "Atos proposa comparar la durada acordada, la configurada i la dada que realment es pot recuperar. Cada diferència tindria responsable, justificació i una prova de correcció, mantenint separades la retenció de telemetria i la dels artefactes de programari.",
      "sources": [
        {
          "id": "CTTI_LB2026",
          "locator": "Retenció i catàleg de mètriques",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 5–6",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG04",
          "locator": "Criteris contrastats amb el Llibre Blanc i el catàleg v1.1 aportats; contingut protegit vigent no contrastat i configuracions productives no inspeccionades.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG05",
          "locator": "Polítiques de cicle de vida publicades per a artefactes; són diferents de les polítiques de retenció de telemetria.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "A4",
      "processId": "alta_canvi",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "oficina_o11y",
        "arquitectura",
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Seguir un canvi correcte, un de fallit i un de cancel·lat en un entorn de prova. Des de la consulta del servei s’ha de poder recuperar la versió, la petició de canvi i l’evidència disponible, amb els buits identificats.",
      "baseCtti": "SIC+ publica un orquestrador de releases que relaciona components, dependències, proves MAT i una petició de canvi compartida. Les guies aporten versions i resultats de desplegament, però no acrediten que aquest context ja arribi automàticament a Talaia.",
      "contribution": "Atos proposa convertir cada desplegament en un esdeveniment consultable des de l’observabilitat, amb servei, entorn, versió, canvi i resultat. L’equip podria passar d’una degradació a les proves del canvi proper, conservant la diferència entre coincidència temporal i causa comprovada.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 46",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 3–6",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG06",
          "locator": "Disponibilitat anunciada el 29 de juliol de 2026; no acredita adopció universal.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG07",
          "locator": "Guia de metadades, versions i plans; no s’han inspeccionat repositoris ni desplegaments reals.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG08",
          "locator": "Circuit de canvi documentat; la versió i la modalitat aplicables s’han de verificar abans d’automatitzar-les.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "A5",
      "processId": "alta_canvi",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "operadors",
        "eines_o11y"
      ],
      "validators": [
        "funcional",
        "oficina_o11y",
        "arquitectura"
      ],
      "assignmentState": "proposta",
      "evidence": "Executar una operació correcta, una dependència lenta i un cas sense telemetria. L’informe ha de distingir prova superada, fallida, omesa i sense evidència, i assenyalar quin equip ha de resoldre cada buit.",
      "baseCtti": "Els paquets CTTI defineixen què s’ha d’observar segons el servei, i MAT ja aporta proves funcionals, de rendiment i d’API. Una prova no informada es pot ometre; acabar el desplegament no acredita tota la cobertura.",
      "contribution": "Atos proposa afegir a una prova MAT existent la comprovació que el senyal s’emet, arriba i es consulta amb la identitat correcta. L’alta mostraria quines parts del paquet aplicable estan provades i quines queden pendents o amb excepció.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26 i 46",
          "state": "documentat"
        },
        {
          "id": "CTTI_LB2026",
          "locator": "§5.3",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 5–6 i 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG09",
          "locator": "Paquets i criteris publicats; no demostren compliment de cada aplicació.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG10",
          "locator": "Proves i tractament de tests no informats documentats; sense inspecció de resultats reals.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "A6",
      "processId": "telemetria",
      "relatedProcessIds": [],
      "coordinator": [
        "arquitectura"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "dada_ia"
      ],
      "validators": [
        "propietari_dada",
        "oficina_o11y"
      ],
      "assignmentState": "proposta",
      "evidence": "Contrastar les relacions declarades d’un servei amb el seu inventari i una mostra d’activitat autoritzada. Cada relació ha de tenir procedència i data, i els punts sense evidència suficient han de quedar marcats per revisar.",
      "baseCtti": "Les metadades de SIC+ descriuen components, versions i dependències de desplegament. Canigó també separa la propietat funcional de les dades de la seva gestió tècnica, una distinció útil per mantenir les correspondències entre serveis.",
      "contribution": "Atos proposa conservar l’origen, la data i el tipus de cada relació: declarada en el desplegament, registrada a l’inventari o observada en execució. El mapa faria visibles les discrepàncies sense convertir automàticament una dependència de desplegament en una dependència funcional.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 39",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 7–11",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG07",
          "locator": "Estructura i dependències de desplegament documentades; no equivalen a comunicacions observades en producció.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG11",
          "locator": "Govern funcional i tècnic publicat; el catàleg de referència no substitueix el catàleg de mètriques.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "B1",
      "processId": "qualitat_cobertura",
      "relatedProcessIds": [],
      "coordinator": [
        "oficina_o11y"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "gestio_servei",
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Valorar dos serveis amb paquets diferents i fer revisar una mostra per dos avaluadors. El resultat ha de mostrar les proves utilitzades, els desacords i les caselles que no es poden avaluar.",
      "baseCtti": "El CTTI publica set nivells de mesura i paquets avançat, bàsic i estàndard. Aquests criteris permeten contextualitzar la matriu de maduresa de l’Atles segons el tipus de servei.",
      "contribution": "Atos proposa relacionar cada valoració amb el paquet aplicable, l’evidència trobada i la seva data. La puntuació es mantindria com una mesura de maduresa de l’Atles, diferenciada del compliment corporatiu i de l’Índex de Salut.",
      "sources": [
        {
          "id": "CTTI_POL2026",
          "locator": "Famílies, eixos i paquets de mesura",
          "state": "documentat"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG12",
          "locator": "Model publicat de nivells; no és una mesura de cobertura desplegada.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG09",
          "locator": "Criteris publicats de paquets per a les solucions; classificació concreta pendent de confirmar al pilot.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "B2",
      "processId": "qualitat_cobertura",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "operadors",
        "eines_o11y"
      ],
      "validators": [
        "oficina_o11y",
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Provar una correcció, una excepció vigent i una de caducada. Cada cas ha de conservar la decisió del circuit competent i separar el tancament de la tasca de la recuperació demostrada de cobertura.",
      "baseCtti": "El procediment d’excepcions d’arquitectura ja diferencia qui prepara la petició, qui accepta el risc i qui en gestiona la valoració i la vigència. Aquest circuit és aplicable a les mancances que requereixin una excepció d’arquitectura.",
      "contribution": "Atos proposa enllaçar el deute d’observabilitat amb l’excepció corporativa que correspongui, conservant responsable, termini i criteri de revisió. El sistema avisaria quan caduqui i només comptaria cobertura recuperada després d’una comprovació satisfactòria.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 7–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 8–11",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG13",
          "locator": "Procediment publicat; no atribueix a Arquitectura totes les excepcions de retenció, seguretat o negoci.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "B3",
      "processId": "qualitat_cobertura",
      "relatedProcessIds": [],
      "coordinator": [
        "eines_o11y",
        "cdc"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "suport_producte"
      ],
      "validators": [
        "oficina_o11y",
        "gestio_servei"
      ],
      "assignmentState": "proposta",
      "evidence": "Retardar un enviament, interrompre un receptor i simular un manteniment en un entorn de prova. S’ha de detectar la pèrdua de visibilitat dins del marge acordat, localitzar el tram i comprovar-ne la recuperació.",
      "baseCtti": "El format de la guia Cloud aportada permet indicar quan s’espera el pròxim enviament d’una dada. Això ofereix una base per detectar silenci, sense confondre’l amb la caiguda del servei observat.",
      "contribution": "Atos proposa comprovar el venciment dels enviaments i afegir senyals de prova que recorrin recollida, consulta i avís. El resultat diferenciaria font silenciosa, dada antiga, manteniment previst i servei degradat, amb el responsable de cada tram.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 5–6",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 10",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ANS133",
          "locator": "CO-INC03/04, p. 18–19",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG03",
          "locator": "Camp de pròxim enviament documentat a la còpia aportada, §6.1; no acredita que tots els emissors ni totes les alertes l’utilitzin.",
          "state": "documentat"
        },
        {
          "id": "CTTI_AUDIENCES",
          "locator": "Funcions corporatives descrites; eficàcia i cobertura no quantificades.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "B4",
      "processId": "seguiment_valor",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "propietari_dada"
      ],
      "validators": [
        "oficina_o11y",
        "direccio"
      ],
      "assignmentState": "proposta",
      "evidence": "Indicador amb fórmula, font, població, període i versió; informe passat reproduïble.",
      "baseCtti": "La plataforma distingeix Proveïdors, Àmbits, CdC i Direcció; el model ja exigeix informes i comprovació de dades.",
      "contribution": "Servir vistes diferents des d’una mateixa definició i fer que el destinatari pugui comprovar la xifra.",
      "sources": [
        {
          "id": "CTTI_AUDIENCES",
          "locator": "Destinataris",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 7–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 9–11",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "B5",
      "processId": "problemes",
      "relatedProcessIds": [
        "incidents",
        "alta_canvi"
      ],
      "coordinator": [
        "cdc"
      ],
      "executors": [
        "operadors",
        "eines_o11y",
        "suport_producte"
      ],
      "validators": [
        "gestio_servei",
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Cronologia validada, problema vinculat, acció amb responsable i prova de no recurrència.",
      "baseCtti": "El 132 assigna al CdC la coordinació i el lideratge de problemes segons impacte i perfil; cada equip intervé en el seu àmbit.",
      "contribution": "Reduir la reconstrucció manual i verificar que l’acció corregeix la causa, distingint incident, problema i canvi.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5, 10 i 18",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ANS132",
          "locator": "Seguiment i resolució de problemes, p. 15–23",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "B6",
      "processId": "incidents",
      "relatedProcessIds": [
        "escalats"
      ],
      "coordinator": [
        "cdc"
      ],
      "executors": [
        "operadors",
        "eines_o11y",
        "suport_producte",
        "externs"
      ],
      "validators": [
        "gestio_servei",
        "funcional"
      ],
      "assignmentState": "proposta",
      "evidence": "Simular una degradació entre una aplicació i una plataforma compartida amb dos equips resolutors. Cada traspàs ha de quedar acceptat, amb evidència accessible i una prova de recuperació tècnica i funcional.",
      "baseCtti": "Les guies d’API Manager i EventHub identifiquen equips consumidors, oficines tècniques i circuits de suport propis. El suport a una plataforma compartida s’ha de relacionar amb l’operador de cada aplicació i amb la coordinació de l’incident.",
      "contribution": "Atos proposa que cada traspàs inclogui el tram afectat, les comprovacions fetes i l’evidència que necessita l’equip receptor. El mapa distingiria consumidor, plataforma i backend, reutilitzant els circuits vigents i els responsables confirmats a la matriu d’escalats.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5 i 10",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ANS133",
          "locator": "CO-INC03/04, p. 18–19",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG14",
          "locator": "Guia de suport que diferencia projecte i servei; no acredita per si sola el propietari contractual vigent de cada component.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG15",
          "locator": "Oficina, administració i autoritzacions documentades; els compromisos del fabricant no equivalen al temps de restauració de tota la cadena.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "B7",
      "processId": "escalats",
      "relatedProcessIds": [
        "qualitat_cobertura"
      ],
      "coordinator": [
        "cdc",
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "sau"
      ],
      "validators": [
        "gestio_servei"
      ],
      "assignmentState": "proposta",
      "evidence": "Ruta provada fins a acceptació, amb suplència i tractament de l’alerta sense titular.",
      "baseCtti": "PagerDuty figura al model 132 i la matriu aporta rutes i franges de cobertura.",
      "contribution": "Provar l’encaminament complet. La custòdia temporal d’un avís no transfereix la responsabilitat tècnica de la solució.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 11–12",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "B8",
      "processId": "incidents",
      "relatedProcessIds": [
        "escalats",
        "comunicacio",
        "problemes"
      ],
      "coordinator": [
        "cdc"
      ],
      "executors": [
        "operadors",
        "eines_o11y",
        "suport_producte"
      ],
      "validators": [
        "funcional",
        "gestio_servei"
      ],
      "assignmentState": "proposta",
      "evidence": "Expedient coherent entre torns, tasques assumides i comprovació de recuperació del servei.",
      "baseCtti": "SOSTIC, PCN&ME, sales i comunicació ja tenen base documentada. El 132 atribueix el lideratge d’alt impacte al CdC.",
      "contribution": "Conservar context i decisions entre equips i torns, separant recuperació, tancament i revisió posterior.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 25–26",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5, 10–12 i 18",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "C1",
      "processId": "agents",
      "relatedProcessIds": [],
      "coordinator": [
        "govern_ctti"
      ],
      "executors": [
        "dada_ia",
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "govern_ctti",
        "gestio_servei",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Permís efectiu per tasca, aprovació registrada i prova de revocació o retorn al flux humà.",
      "baseCtti": "Hi ha capacitats corporatives d’IA i automatització. El 132 separa coordinació CdC i execució sobre les solucions.",
      "contribution": "Aplicar els nivells N0–N3 de l’Atles a permisos reals. Un agent no amplia les competències de l’equip que l’utilitza.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 37 i 40–42",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 10",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 5–6 i 11",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "C2",
      "processId": "agents",
      "relatedProcessIds": [],
      "coordinator": [
        "dada_ia"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "govern_ctti",
        "arquitectura",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Dues implementacions superen el mateix contracte i es substitueixen sense perdre el cas.",
      "baseCtti": "La normativa d’IA ja diferencia models, sistemes i components i fixa condicions de consum. El catàleg operatiu d’agents ha de concretar les funcions i permisos dins d’aquest marc.",
      "contribution": "Organitzar funcions interoperables. IA Mesh és la proposta d’Atos per cooperar amb límits quan el cas ho requereixi.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 40–42",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 4–6 i 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "C3",
      "processId": "coneixement",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "cdc",
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "qualitat",
        "propietari_dada"
      ],
      "assignmentState": "proposta",
      "evidence": "Resposta amb cites vigents i permisos; un document retirat deixa de donar instruccions.",
      "baseCtti": "Els dos serveis ja preveuen repositori corporatiu i consulta amb Confluence, chatbot o IA.",
      "contribution": "Aportar cerca amb context, retirada efectiva del contingut caducat i proves de fidelitat de la resposta.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 7–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 7–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "C4",
      "processId": "agents",
      "relatedProcessIds": [],
      "coordinator": [
        "dada_ia"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "gestio_servei",
        "qualitat",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Provar un assistent amb fonts caducades, una consulta fora del seu abast, reintents i un canvi de model. Cada resultat ha de conservar evidència i cost, respectar els permisos i permetre continuar pel procediment humà quan falli una dependència.",
      "baseCtti": "La normativa tècnica d’IA del CTTI ja defineix consum governat, models, sistemes i components. L’AI Gateway i la nova arquitectura agèntica hi figuren en planificació i pendents de validació.",
      "contribution": "Atos proposa convertir aquest marc en proves sobre permisos, versions, fonts, eines invocades i cost de cada cas. La instrumentació s’adaptaria a la via corporativa autoritzada i deixaria explícit quines funcions depenen encara de components planificats.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 37 i 40–42",
          "state": "documentat"
        },
        {
          "id": "CTTI_PTD",
          "locator": "Serveis i disponibilitat anunciada",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "C5",
      "processId": "qualitat_cobertura",
      "relatedProcessIds": [],
      "coordinator": [
        "oficina_o11y",
        "cdc"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "gestio_servei"
      ],
      "assignmentState": "proposta",
      "evidence": "Canvi d’alerta provat contra incidents coneguts i fallades rares que cal conservar.",
      "baseCtti": "El catàleg i les funcions de prevenció i millora aporten la base per revisar senyals.",
      "contribution": "Reduir repeticions i cost sense perdre detecció útil ni amagar una segona avaria.",
      "sources": [
        {
          "id": "CTTI_LB2026",
          "locator": "Catàleg de mètriques",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5 i 8–9",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "C6",
      "processId": "problemes",
      "relatedProcessIds": [
        "incidents",
        "agents"
      ],
      "coordinator": [
        "cdc"
      ],
      "executors": [
        "operadors",
        "eines_o11y",
        "dada_ia"
      ],
      "validators": [
        "gestio_servei",
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Hipòtesi amb fonts, contradiccions i següent prova, comparada amb casos resolts.",
      "baseCtti": "AI-Powered Failure Prevention consta com a MVP validat en fase inicial; Neo4j Aura té pilots al CdC.",
      "contribution": "Contrastar i ampliar aquesta base amb diagnòstic reproduïble, dependències vigents i supervisió humana.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 37 i 39",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5 i 18",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "C7",
      "processId": "seguiment_valor",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "dada_ia"
      ],
      "validators": [
        "propietari_dada",
        "oficina_o11y"
      ],
      "assignmentState": "proposta",
      "evidence": "Consulta, fórmula, filtres i resultat conservats; exploració diferenciada de vista validada.",
      "baseCtti": "El model exigeix indicadors calculables i informació coherent; hi ha destinataris corporatius identificats.",
      "contribution": "Generar i explicar vistes de Proveïdors, Àmbits, CdC i Direcció sense inventar definicions.",
      "sources": [
        {
          "id": "CTTI_AUDIENCES",
          "locator": "Destinataris",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 7–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 9–11",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "D1",
      "processId": "autoservei",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "sau"
      ],
      "validators": [
        "oficina_o11y",
        "funcional"
      ],
      "assignmentState": "proposta",
      "evidence": "Petició amb permisos comprovats, estat final verificat i mantenidor identificat.",
      "baseCtti": "Àtom/SIC i l’evolució d’autoservei ja aporten canals; el 133 preveu tasques bàsiques procedimentades.",
      "contribution": "Automatitzar operacions repetibles dins del canal adequat, amb aprovació quan pertoqui i sense crear un segon portal per defecte.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26–29 i 46",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 3–6",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "D2",
      "processId": "alta_canvi",
      "relatedProcessIds": [],
      "coordinator": [
        "oficina_o11y"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "qualitat",
        "gestio_servei"
      ],
      "assignmentState": "proposta",
      "evidence": "Paquet amb mantenidor, versions, proves positives i negatives i retorn a versió anterior.",
      "baseCtti": "La base preveu evolució, proves d’acceptació i traspàs del projecte a l’administració.",
      "contribution": "Compartir deteccions mantingudes i provar-ne l’encaix abans d’activar-les en un altre servei.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 3–6 i 9–10",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "D3",
      "processId": "coneixement",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "cdc",
        "eines_o11y",
        "operadors",
        "sau"
      ],
      "validators": [
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Cada rol resol un cas de pràctica i aporta l’evidència que necessita el següent equip.",
      "baseCtti": "El 133 preveu formació i adopció; Àtom acompanya l’evolució del SAU i dels canals de suport.",
      "contribution": "Acompanyar els canvis amb exercicis per rol i millores als materials a partir de les dificultats observades.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 27–29",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 10–11",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "E1",
      "processId": "resultat_servei",
      "relatedProcessIds": [],
      "coordinator": [
        "funcional",
        "area_tic"
      ],
      "executors": [
        "operadors",
        "eines_o11y"
      ],
      "validators": [
        "funcional",
        "propietari_dada"
      ],
      "assignmentState": "proposta",
      "evidence": "Escollir una integració asíncrona real i provar un consumidor aturat, un reintent i una recuperació. El recompte d’operacions úniques i el resultat final han de coincidir amb la font transaccional, sense donar per acabat el que només s’ha acceptat.",
      "baseCtti": "Els nivells CTTI inclouen mesura de negoci, i EventHub documenta una via corporativa d’intercanvi asíncron. La confirmació del transport i la finalització del procés consumidor són resultats diferents.",
      "contribution": "Atos proposa seguir una operació des de l’acceptació fins al resultat que valida el responsable funcional. El quadre distingiria pendent, completada i fallida, reconciliant reintents i duplicats amb la font de negoci.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG12",
          "locator": "Mesura de negoci inclosa en el model publicat; no fixa el criteri d’èxit de cada tràmit.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG17",
          "locator": "Servei corporatiu Kafka/Confluent descrit; no acredita que una aplicació concreta l’utilitzi ni que ja se’n conciliï el resultat funcional.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "E2",
      "processId": "resultat_servei",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei",
        "funcional"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "oficina_o11y",
        "funcional"
      ],
      "assignmentState": "proposta",
      "evidence": "SLO reproduïble, dada absent explícita i relació documentada amb índex de salut i ANS.",
      "baseCtti": "El CTTI disposa d’índex de salut, ANS i seguiment a CONTIC; PCN&ME i Patró aporten context de negoci.",
      "contribution": "Afegir objectius de resultat i marge d’error, mantenint separats servei prestat, temps de cada equip i compromisos contractuals.",
      "sources": [
        {
          "id": "CTTI_POL2026",
          "locator": "Famílies, eixos i paquets de mesura",
          "state": "documentat"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ANS132",
          "locator": "Fonts i càlcul, p. 3–8",
          "state": "model_previst"
        },
        {
          "id": "CTTI_ANS133",
          "locator": "CO-INC03/04, p. 18–19",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "E3",
      "processId": "seguiment_valor",
      "relatedProcessIds": [],
      "coordinator": [
        "direccio"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "gestio_servei",
        "propietari_dada"
      ],
      "assignmentState": "proposta",
      "evidence": "Conciliar un període de dos serveis amb cost directe, compartit i no assignat. Qualsevol escenari de reducció ha de mostrar l’efecte sobre la cobertura i la qualitat del servei, a més de l’import.",
      "baseCtti": "El mòdul FinOps de la PTD descriu seguiment d’Azure, MongoDB, Databricks i Denodo, normalització FOCUS i anàlisi amb MicroStrategy. És una base concreta amb abast delimitat, sense cobertura universal ni cost per tràmit acreditats.",
      "contribution": "Atos proposa relacionar les dades de cost disponibles amb el servei i el seu resultat, conservant costos compartits i imports pendents d’assignar. Les estimacions prèvies d’un desplegament es mostrarien separades de la despesa observada.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 40 i 47",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG18",
          "locator": "Capacitat descrita per al perímetre indicat; no s’han verificat factures, estalvis ni atribució a tots els serveis.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG19",
          "locator": "Document de maig de 2025 que corrobora el precedent FinOps; no és un balanç d’estalvi mesurat.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "E4",
      "processId": "seguiment_valor",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "cdc",
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "direccio"
      ],
      "assignmentState": "proposta",
      "evidence": "Benefici net contrastat després de descomptar excepcions, supervisió i manteniment.",
      "baseCtti": "Els dos serveis ja exigeixen anàlisi cost/benefici i comprovació del resultat de la millora.",
      "contribution": "Mesurar capacitat recuperada amb una línia base i relacionar-ne la reinversió amb una millora demostrada.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 8–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 9–10",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "F1",
      "processId": "reversibilitat",
      "relatedProcessIds": [],
      "coordinator": [
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "suport_producte"
      ],
      "validators": [
        "govern_ctti",
        "arquitectura"
      ],
      "assignmentState": "proposta",
      "evidence": "Demanar a un equip diferent que reconstrueixi les funcions acordades a partir del paquet, en un entorn autoritzat. Ha de recuperar la versió prevista, executar els casos coneguts i registrar temps, adaptacions i elements que falten.",
      "baseCtti": "Canigó publica un repositori corporatiu d’artefactes amb polítiques de cicle de vida. Conservar una etiqueta de versió no garanteix que continuïn disponibles el binari i la configuració necessaris per reconstruir-la.",
      "contribution": "Atos proposa que el paquet de sortida inclogui una comprovació de disponibilitat i integritat dels artefactes, configuracions i dependències. La prova hauria d’explicar què es pot reconstruir, què necessita adaptació al destí i quins efectes no es poden revertir.",
      "sources": [
        {
          "id": "CTTI_T132",
          "locator": "p. 7–9",
          "state": "model_previst"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 3–6",
          "state": "model_previst"
        },
        {
          "id": "CTTI_CG05",
          "locator": "Repositori i polítiques de conservació documentats; no acredita disponibilitat d’un artefacte concret ni reconstrucció en un altre producte.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "F2",
      "processId": "dades_accessos",
      "relatedProcessIds": [],
      "coordinator": [
        "propietari_dada"
      ],
      "executors": [
        "eines_o11y",
        "dada_ia"
      ],
      "validators": [
        "govern_ctti",
        "propietari_dada",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Conjunt aprovat amb finalitat, diccionari, agregació, exclusions i procés de correcció.",
      "baseCtti": "La memòria i el 133 identifiquen govern i propietaris de dades; disposar de PTD no implica poder publicar-les.",
      "contribution": "Provar una publicació acotada només quan el responsable autoritzi el contingut i el detall.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 42",
          "state": "documentat"
        },
        {
          "id": "CTTI_T133",
          "locator": "p. 7–8",
          "state": "model_previst"
        }
      ]
    },
    {
      "id": "F3",
      "processId": "dades_accessos",
      "relatedProcessIds": [],
      "coordinator": [
        "propietari_dada",
        "seguretat"
      ],
      "executors": [
        "eines_o11y",
        "operadors"
      ],
      "validators": [
        "govern_ctti",
        "propietari_dada",
        "seguretat"
      ],
      "assignmentState": "proposta",
      "evidence": "Consulta o exportació fora d’abast bloquejada; accessos privilegiats traçables.",
      "baseCtti": "El 133 preveu permisos i accessos de les eines, i relació amb propietaris i govern de dades.",
      "contribution": "Aplicar el mateix límit des de la font fins a consulta, suport i compartició; validar cada frontera.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 5–8",
          "state": "model_previst"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 42 i 62",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG16",
          "locator": "Normativa publicada, v2.0 del 3 de setembre de 2026; AI Gateway i nova arquitectura agèntica declarats en planificació i pendents de validació.",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "G1",
      "processId": "exposicio",
      "relatedProcessIds": [],
      "coordinator": [
        "seguretat"
      ],
      "executors": [
        "operadors",
        "eines_o11y"
      ],
      "validators": [
        "seguretat",
        "gestio_servei"
      ],
      "assignmentState": "proposta",
      "evidence": "Exposició contrastada i mitigació comprovada amb impacte de servei visible.",
      "baseCtti": "El CTTI, l’Agència i el SOC tenen circuits de seguretat; el model de mesura inclou seguretat i obsolescència.",
      "contribution": "Relacionar exposició, dependències i servei dins del circuit de ciberseguretat, sense traspassar-ne funcions al CdC.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 47 i 62",
          "state": "documentat"
        },
        {
          "id": "CTTI_POL2026",
          "locator": "Famílies, eixos i paquets de mesura",
          "state": "documentat"
        },
        {
          "id": "CTTI_ESC2026",
          "locator": "Rols, serveis i rutes d’escalat",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "G2",
      "processId": "resultat_servei",
      "relatedProcessIds": [],
      "coordinator": [
        "funcional",
        "gestio_servei"
      ],
      "executors": [
        "eines_o11y",
        "operadors",
        "suport_producte"
      ],
      "validators": [
        "funcional",
        "qualitat"
      ],
      "assignmentState": "proposta",
      "evidence": "Provar un accés correcte, un permís denegat i una operació acceptada que queda pendent al consumidor. La sonda ha d’identificar el pas afectat i comprovar també la seva pròpia salut abans d’atribuir la fallada al servei.",
      "baseCtti": "GICAR publica modalitats d’integració diferents segons l’aplicació, i EventHub disposa d’un circuit propi per autoritzar l’accés dels consumidors. Les sondes han de seguir el recorregut real del servei, inclosa la finalització diferida quan existeixi. La Memòria 2025 descriu Keyfactor Command per automatitzar certificats; les proves poden partir d’aquesta capacitat.",
      "contribution": "Atos proposa una prova de recorregut que distingeixi autenticació, autorització, crida tècnica i resultat funcional. La sonda utilitzaria comptes i dades de prova, amb correlació entre passos quan sigui possible i neteja dels registres generats.",
      "sources": [
        {
          "id": "CTTI_T133",
          "locator": "p. 6 i 12–13",
          "state": "model_previst"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 26",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG20",
          "locator": "Matriu d’integracions publicada; no acredita un únic recorregut d’identitat per a totes les aplicacions.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG15",
          "locator": "Circuit d’autorització del gestor o propietari de producte i de l’oficina tècnica; el recorregut concret s’ha de confirmar al pilot.",
          "state": "documentat"
        },
        {
          "id": "CTTI_CG10",
          "locator": "Base de proves reutilitzable quan sigui compatible; una execució en preproducció no substitueix una sonda periòdica en producció.",
          "state": "documentat"
        },
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 17 · Keyfactor Command i automatització de certificats",
          "state": "documentat"
        }
      ]
    },
    {
      "id": "G3",
      "processId": "comunicacio",
      "relatedProcessIds": [
        "incidents"
      ],
      "coordinator": [
        "cdc",
        "area_tic"
      ],
      "executors": [
        "eines_o11y",
        "sau",
        "operadors"
      ],
      "validators": [
        "gestio_servei",
        "funcional"
      ],
      "assignmentState": "proposta",
      "evidence": "Estat amb origen i hora; missatge validat per destinatari i alternativa manual provada.",
      "baseCtti": "La memòria i el 132 descriuen comunicació d’incidents, sales i coordinació amb Àrees TIC.",
      "contribution": "Publicar una vista coherent des d’aquests canals, separant seguiment intern, avís departamental i eventual comunicació pública.",
      "sources": [
        {
          "id": "CTTI_MEM2025",
          "locator": "p. 25–29",
          "state": "documentat"
        },
        {
          "id": "CTTI_T132",
          "locator": "p. 4–5",
          "state": "model_previst"
        }
      ]
    }
  ],
  "scopePatch": {
    "scope.intro": "El mapa relaciona el procés públic amb el servei TIC, les dependències i els equips que hi intervenen. Parteix de la memòria, el llibre blanc, la matriu d’escalats i els models dels serveis 132 i 133. Atos proposa comprovar aquest encaix amb cada servei i fer que totes les fitxes comparteixin els mateixos actors i processos.",
    "scope.relation": "Procés i moment crític → servei TIC → aplicacions i dependències → responsables → mesura i resposta → recuperació i millora. Les eines donen suport a aquest recorregut; no són actors.",
    "scope.limit": "Els deu àmbits són una lectura de cobertura de l’Atles, diferenciada de les cinc famílies oficials del CTTI. Les assignacions de cada pilot es validaran amb els responsables; els models 132/133 no acrediten implantació general avui. Cobertura i disponibilitat horària es comproven per servei.",
    "scope.source": "Síntesi de la Memòria CTTI 2025, documentació d’observabilitat d’agost de 2026, matriu d’escalats de maig de 2026 i models de servei 132/133. Revisió: 15 de setembre de 2026. No es publiquen documents originals ni dades de contacte.",
    "scope.validation": "Relacionar família oficial, servei, procés crític i responsable amb l’inventari vigent. Escollir mostres representatives per criticitat i dependències. Comprovar senyals esperats, frescor, identificadors, rutes, acceptació i recuperació. Distingir fallada de servei i pèrdua de visibilitat. Mostrar «no avaluat» quan falti evidència i vincular cada mancança a B2."
  },
  "domainCardAdditions": {
    "01": [
      "B5",
      "B8",
      "C1",
      "C2",
      "C3",
      "C4",
      "C7",
      "D1",
      "D2",
      "F2"
    ],
    "02": [
      "A3",
      "C2",
      "C7",
      "F2",
      "F3"
    ],
    "03": [
      "A3",
      "B2",
      "C1",
      "C2",
      "D2",
      "E4"
    ],
    "04": [
      "A3",
      "D2"
    ],
    "05": [
      "D2",
      "F3"
    ],
    "06": [
      "D2",
      "G3"
    ],
    "07": [
      "A3",
      "C7",
      "D2"
    ],
    "08": [
      "C4",
      "D2"
    ],
    "09": [
      "D2",
      "G3"
    ],
    "10": [
      "A3",
      "C1",
      "C2",
      "C3",
      "C4",
      "C7",
      "D1",
      "D2",
      "D3",
      "E2",
      "F2",
      "F3",
      "G3"
    ]
  },
  "domainPatches": {
    "02": {
      "assets": "Oracle i SQL Server; integracions i SFTP corporatiu; dades mestres i Plataforma Transversal de Dades; Neo4j Aura corporatiu i pilots al CdC; analítica avançada i IA; identitats i AD."
    },
    "03": {
      "assets": "Lots CPD1–CPD4 i serveis cloud; AWS, Azure i Google Cloud segons l’abast del servei; OpenShift i virtualització; emmagatzematge Isilon i ECA; còpies i restauració; dependències d’alimentació com el SAI d’Olímpia. Els lots no equivalen al nombre de centres físics."
    },
    "08": {
      "actors": "Seguretat del CTTI; Agència de Ciberseguretat i SOC; enginyeria de seguretat; responsables d’identitat; equips operatius del servei."
    },
    "10": {
      "assets": "Gestió de servei amb Àtom/Helix i els circuits corporatius aplicables; SOSTIC, PCN&ME i PagerDuty; gestió de canvis, problemes i incidents; eines d’observabilitat i canals d’avís; CONTIC per al seguiment corresponent; escalats de nivell 0 a nivell 4.",
      "actors": "Centre de Control; gestió del servei i de l’entrega; Àrees TIC; SAU; gestió d’eines d’observabilitat; equips resolutors, integradors i fabricants; responsables funcionals quan el cas ho requereixi."
    }
  },
  "domainRoleIds": {
    "01": [
      "funcional",
      "area_tic",
      "gestio_servei",
      "operadors",
      "externs"
    ],
    "02": [
      "propietari_dada",
      "dada_ia",
      "arquitectura",
      "operadors",
      "eines_o11y"
    ],
    "03": [
      "operadors",
      "eines_o11y",
      "suport_producte",
      "arquitectura"
    ],
    "04": [
      "operadors",
      "suport_producte",
      "eines_o11y"
    ],
    "05": [
      "operadors",
      "eines_o11y",
      "externs",
      "gestio_servei"
    ],
    "06": [
      "operadors",
      "suport_producte",
      "gestio_servei"
    ],
    "07": [
      "sau",
      "operadors",
      "suport_producte",
      "gestio_servei"
    ],
    "08": [
      "seguretat",
      "operadors",
      "eines_o11y"
    ],
    "09": [
      "operadors",
      "suport_producte",
      "funcional",
      "externs"
    ],
    "10": [
      "cdc",
      "gestio_servei",
      "area_tic",
      "sau",
      "eines_o11y",
      "operadors",
      "suport_producte"
    ]
  },
  "coverageNote": "Els operadors es despleguen als deu àmbits tècnics de cobertura. SAU, gestió del servei i Àrea TIC tenen funcions diferents. Les validacions poden ser funcionals, operatives o de criteri; no totes són necessàries en cada actuació."
};
