window.ATLES_RELATION_PLATFORMS=[
  {
    "id": "sic_plus",
    "name": "SIC+",
    "label": "Base documentada",
    "cards": [
      {
        "id": "A4",
        "use": "Plans de release amb components, versions, dependències i proves. Atos proposa fer consultables la versió, els components i el resultat del canvi des de l’observabilitat. Les dependències del pla no demostren comunicacions en execució ni finalització funcional.",
        "sourceId": "CTTI_CG06",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG06",
            "document": "Nou orquestrador de releases disponible a SIC+",
            "locator": "Anunci de disponibilitat del 29 de juliol de 2026"
          }
        ]
      },
      {
        "id": "A6",
        "use": "Plans de release amb components, versions, dependències i proves. Atos proposa contrastar el pla amb inventari i comunicacions observades, preservant origen i vigència. Les dependències del pla no demostren comunicacions en execució ni finalització funcional.",
        "sourceId": "CTTI_CG07",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG07",
            "document": "Orquestrador de releases",
            "locator": "Introducció; components principals; application.yaml i release-plan.yaml"
          }
        ]
      }
    ]
  },
  {
    "id": "mat",
    "name": "MAT",
    "label": "Base documentada",
    "cards": [
      {
        "id": "A4",
        "use": "Proves funcionals, de regressió, rendiment i API vinculades a la release. Atos proposa conservar quines proves es van executar i el resultat que van donar. Les proves no informades s’ometen. Una prova de desplegament no equival a una sonda contínua ni comprova per si sola la recepció de telemetria.",
        "sourceId": "CTTI_CG10",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG10",
            "document": "Integració amb el MAT",
            "locator": "Marc d’Automatització de Testing; tipus de proves; configuració de release-plan.yaml"
          }
        ]
      },
      {
        "id": "B5",
        "use": "Proves funcionals, de regressió, rendiment i API vinculades a la release. Atos proposa convertir una acció validada de la revisió en una prova reutilitzable quan MAT sigui compatible. Les proves no informades s’ometen. Una prova de desplegament no equival a una sonda contínua ni comprova per si sola la recepció de telemetria.",
        "sourceId": "CTTI_CG10",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG10",
            "document": "Integració amb el MAT",
            "locator": "Marc d’Automatització de Testing; tipus de proves; configuració de release-plan.yaml"
          }
        ]
      }
    ]
  },
  {
    "id": "atom_remedy",
    "name": "Àtom / Remedy",
    "label": "Base documentada",
    "cards": [
      {
        "id": "A4",
        "use": "Peticions i incidències; integració del canvi amb SIC+ mitjançant CRQ. Atos proposa relacionar versió, finestra i referència del canvi seguint el circuit aplicable. Els circuits de casos i aprovacions varien segons la modalitat, l’entorn i la configuració.",
        "sourceId": "CTTI_CG08",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG08",
            "document": "Integració amb Remedy",
            "locator": "Integració amb gestió de canvis; workflow unitari vs. orquestrat; marxa enrere"
          }
        ]
      },
      {
        "id": "B5",
        "use": "Peticions i incidències; integració del canvi amb SIC+ mitjançant CRQ. Atos proposa conservar el vincle entre els casos i les evidències, amb estats i responsables diferenciats. Els circuits de casos i aprovacions varien segons la modalitat, l’entorn i la configuració.",
        "sourceId": "CTTI_CG08",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG08",
            "document": "Integració amb Remedy",
            "locator": "Integració amb gestió de canvis; workflow unitari vs. orquestrat; marxa enrere"
          }
        ]
      },
      {
        "id": "B8",
        "use": "Peticions i incidències a través d’Àtom / Remedy per a aplicacions en servei. Atos proposa relacionar l’expedient i els traspassos confirmats amb el circuit corporatiu de casos. L’encaix amb Àtom es concretaria amb els canals de SOSTIC, PCN&ME, les sales i la comunicació del servei.",
        "sourceId": "CTTI_CG14",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG14",
            "document": "Canals de suport d’API Manager",
            "locator": "Aplicacions en servei; peticions i incidències via Àtom/Remedy"
          }
        ]
      }
    ]
  },
  {
    "id": "talaia",
    "name": "Talaia",
    "label": "Base documentada",
    "cards": [
      {
        "id": "B8",
        "use": "Observabilitat corporativa. La guia Cloud descriu consulta federada sobre repositoris Elastic i presentació amb Grafana. Atos proposa enllaçar les evidències disponibles amb el cas d’incident i mostrar els punts sense visibilitat. És un encaix proposat; no una integració automàtica demostrada entre Talaia i la gestió de casos.",
        "sourceId": "CTTI_CG03",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG03",
            "document": "Observabilitat al Cloud",
            "locator": "Còpia aportada, §§1–2; el contingut protegit vigent no s’ha contrastat"
          },
          {
            "sourceId": "CTTI_MEM2025",
            "document": "Memòria CTTI 2025",
            "locator": "p. 46 · Talaia, CI/CD i pilots AWS/Azure"
          }
        ]
      },
      {
        "id": "E2",
        "use": "Observabilitat corporativa. La guia Cloud descriu consulta federada sobre repositoris Elastic i presentació amb Grafana. Atos proposa contrastar els senyals disponibles amb el càlcul SLO i explicar què falta. El càlcul SLO i el pressupost d’error formen part de la proposta que es vol provar; la documentació no acredita aquestes funcions ja desplegades a Talaia.",
        "sourceId": "CTTI_CG03",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG03",
            "document": "Observabilitat al Cloud",
            "locator": "Còpia aportada, §§1–2; el contingut protegit vigent no s’ha contrastat"
          }
        ]
      }
    ]
  },
  {
    "id": "contic",
    "name": "CONTIC",
    "label": "Base de seguiment",
    "cards": [
      {
        "id": "E2",
        "use": "Seguiment corporatiu dels compromisos i ANS dins de l’abast corresponent. Atos proposa mostrar la relació amb els compromisos corporatius conservant fórmules, finestres i responsables. La font de càlcul documentada no prova una integració desplegada amb el motor de SLO. Els ANS i el pressupost d’error han de conservar les seves definicions.",
        "sourceId": "CTTI_ANS132",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_ANS132",
            "document": "Centre de Control · definicions de seguiment i ANS",
            "locator": "Fonts i càlcul, p. 3–8; model.cards[E2].baseCtti"
          }
        ]
      }
    ]
  },
  {
    "id": "ptd",
    "name": "PTD",
    "label": "Base documentada",
    "cards": [
      {
        "id": "E3",
        "use": "Virtualització amb Denodo, graf amb Neo4j AuraDB i FinOps en un perímetre definit. Atos proposa relacionar costos disponibles amb el servei, mantenint imports compartits i no assignats. El graf corporatiu o la virtualització disponibles no impliquen un mapa complet de dependències ni que tota la telemetria s’hagi de copiar a la PTD.",
        "sourceId": "CTTI_CG18",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG18",
            "document": "Mòduls de la PTD",
            "locator": "Connexió/Ingesta; Emmagatzematge i dominis d’informació; Publicació; FinOps"
          }
        ]
      }
    ]
  },
  {
    "id": "apim",
    "name": "API Manager",
    "label": "Precedent corporatiu",
    "cards": [
      {
        "id": "A1",
        "use": "Validació d’API/producte i circuits de suport que separen projecte i servei. Atos proposa aprofitar el precedent de regles, severitats i excepcions per definir el validador de telemetria. El validador d’APIs existent no és un validador de telemetria.",
        "sourceId": "CTTI_CG02",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG02",
            "document": "FAQ d’API Manager",
            "locator": "Regles de validació, errors i avisos; catàlegs i publicació"
          }
        ]
      },
      {
        "id": "B6",
        "use": "Circuits de suport que separen les aplicacions en projecte i en servei. Atos proposa relacionar consumidor, plataforma i backend amb els equips i les evidències del traspàs. La presència d’una API al catàleg no demostra una traça completa, un SLO funcional ni la identitat del resolutor vigent de tots els trams.",
        "sourceId": "CTTI_CG14",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_CG14",
            "document": "Canals de suport d’API Manager",
            "locator": "Oficina tècnica; aplicacions en fase de projecte; aplicacions en servei"
          }
        ]
      }
    ]
  },
  {
    "id": "keyfactor",
    "name": "Keyfactor Command",
    "label": "Base documentada",
    "cards": [
      {
        "id": "G2",
        "use": "Gestió i automatització del cicle de vida de certificats. Atos proposa comprovar el recorregut funcional després d’una renovació de certificat quan formi part del cas. La cobertura de certificats i la prova de connexió posterior no estan acreditades per a tots els serveis.",
        "sourceId": "CTTI_MEM2025",
        "state": "proposta",
        "references": [
          {
            "sourceId": "CTTI_MEM2025",
            "document": "Memòria CTTI 2025",
            "locator": "p. 17 · Keyfactor Command i automatització de certificats"
          }
        ]
      }
    ]
  }
];
