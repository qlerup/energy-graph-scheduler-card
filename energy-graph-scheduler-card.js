// Energy Graph Scheduler Card
// Note: avoid ESM imports so the card works when loaded as "javascript" resource in HA.

const EGS_CARD_TAG = "energy-graph-scheduler-card";
const EGS_EDITOR_TAG = "energy-graph-scheduler-card-editor";
const EGS_CARD_VERSION = "0.1.3";
const EGS_SYNC_DOMAIN = "energy_graph_scheduler";

// ---- energy-graph-scheduler i18n (namespaced) ----
// Languages match the Thermostat Pro Timeline card: en, da, sv, nb, de, es, fr, it, fi, cs, sl.
const EGS_I18N = {
  en: {
    'card.title_default': 'Energy Graph Scheduler',

    'hint.select_entity': 'Select an electricity price entity in the editor.',
    'hint.entity_not_found': 'Entity not found',
    'hint.no_price_data': 'No price data found in entity attributes',
    'hint.cannot_build_graph': 'Could not build graph from data.',

    'stats.min': 'Min',
    'stats.now': 'Now',
    'stats.max': 'Highest',
    'label.now_value': 'Now: {value} {unit}',
    'label.now_no_data': 'Now: No data',
    'label.no_data': 'No data',

    'sections.title': 'Cheapest times',

    'settings.open': 'Settings',
    'settings.title': 'Settings',
    'settings.close': 'Close',
    'settings.add_section': 'Add time section',
    'settings.name': 'Name',
    'settings.hours': 'Time interval',
    'settings.add': 'Add',
    'settings.sections': 'Sections',
    'settings.no_sections': 'No sections yet.',
    'settings.remove': 'Delete',
    'settings.item_hours': 'Time interval: {hours} hours',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Language',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Title (optional)',
    'editor.view_optional': 'View (optional)',
    'editor.view_label': 'What to show',
    'editor.view_show_all': 'Show all',
    'editor.view_graph_minmax': 'Show graph + min/max',
    'editor.view_graph_only': 'Show graph only',
    'editor.entity_label': 'Electricity price entity',
    'editor.entity_picker': 'Select entity',

    'editor.tomorrow_toggle': 'Use separate entity for tomorrow',
    'editor.tomorrow_desc': 'Enable if your setup splits today and tomorrow prices into separate sensors.',
    'editor.tomorrow_entity_label': 'Electricity price entity (tomorrow)',
    'editor.tomorrow_entity_picker': 'Select entity',
    'editor.sell_toggle': 'Use sell price sensor',
    'editor.sell_desc': 'Enable to show sell prices next to buy prices for each hour.',
    'editor.sell_entity_label': 'Sell price entity',
    'editor.sell_entity_picker': 'Select entity',
    'label.buy': 'Buy',
    'label.sell': 'Sell',
    'editor.sync_optional': 'Sync (optional)',
    'editor.sync_title': 'Share “cheapest times” between users',
    'editor.sync_desc': 'Store in Home Assistant (.storage) via integration',
  },
  da: {
    'card.title_default': 'Energy Graph Scheduler',

    'hint.select_entity': 'Vælg en strømpris-entity i editoren.',
    'hint.entity_not_found': 'Entity ikke fundet',
    'hint.no_price_data': 'Ingen pris-data fundet i entity attributes',
    'hint.cannot_build_graph': 'Kunne ikke opbygge graf fra data.',

    'stats.min': 'Min',
    'stats.now': 'Nu',
    'stats.max': 'Højeste',
    'label.now_value': 'Nu: {value} {unit}',
    'label.now_no_data': 'Nu: Ingen data',
    'label.no_data': 'Ingen data',

    'sections.title': 'Billigste tider',

    'settings.open': 'Indstillinger',
    'settings.title': 'Indstillinger',
    'settings.close': 'Luk',
    'settings.add_section': 'Tilføj time-sektion',
    'settings.name': 'Navn',
    'settings.hours': 'Timeinterval',
    'settings.add': 'Tilføj',
    'settings.sections': 'Sektioner',
    'settings.no_sections': 'Ingen sektioner endnu.',
    'settings.remove': 'Slet',
    'settings.item_hours': 'Timeinterval: {hours} timer',
    'settings.interval': 'Graf opløsning',
    'settings.quarter_hours': 'Brug 15-minutters intervaller',

    'editor.language': 'Sprog',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Titel (valgfri)',
    'editor.view_optional': 'Visning (valgfri)',
    'editor.view_label': 'Hvad skal vises',
    'editor.view_show_all': 'Vis alt',
    'editor.view_graph_minmax': 'Vis graf + min/maks',
    'editor.view_graph_only': 'Vis kun graf',
    'editor.entity_label': 'Strømpris entity',
    'editor.entity_picker': 'Vælg entity',

    'editor.tomorrow_toggle': 'Brug separat entity til i morgen',
    'editor.tomorrow_desc': 'Slå til hvis dine priser er delt op i dag og i morgen.',
    'editor.tomorrow_entity_label': 'Strømpris entity (i morgen)',
    'editor.tomorrow_entity_picker': 'Vælg entity',
    'editor.sell_toggle': 'Brug salgspris-sensor',
    'editor.sell_desc': 'Slå til for at vise salgspriser ved siden af købspriser for hver time.',
    'editor.sell_entity_label': 'Salgspris entity',
    'editor.sell_entity_picker': 'Vælg entity',
    'label.buy': 'Køb',
    'label.sell': 'Salg',
    'editor.sync_optional': 'Sync (valgfri)',
    'editor.sync_title': 'Del "billigste tider" mellem brugere',
    'editor.sync_desc': 'Gem i Home Assistant (.storage) via integration',
  },
  sv: {
    'card.title_default': 'Energigraf-schemaläggare',

    'hint.select_entity': 'Välj en elpris-entitet i editorn.',
    'hint.entity_not_found': 'Entitet hittades inte',
    'hint.no_price_data': 'Ingen prisdata hittades i entitetens attribut',
    'hint.cannot_build_graph': 'Kunde inte bygga graf från data.',

    'stats.min': 'Min',
    'stats.now': 'Nu',
    'stats.max': 'Högst',
    'label.now_value': 'Nu: {value} {unit}',
    'label.now_no_data': 'Nu: Ingen data',
    'label.no_data': 'Ingen data',

    'sections.title': 'Billigaste tider',

    'settings.open': 'Inställningar',
    'settings.title': 'Inställningar',
    'settings.close': 'Stäng',
    'settings.add_section': 'Lägg till tidssektion',
    'settings.name': 'Namn',
    'settings.hours': 'Tidsintervall',
    'settings.add': 'Lägg till',
    'settings.sections': 'Sektioner',
    'settings.no_sections': 'Inga sektioner ännu.',
    'settings.remove': 'Ta bort',
    'settings.item_hours': 'Tidsintervall: {hours} timmar',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Språk',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Titel (valfritt)',
    'editor.view_optional': 'Visning (valfritt)',
    'editor.view_label': 'Vad ska visas',
    'editor.view_show_all': 'Visa allt',
    'editor.view_graph_minmax': 'Visa graf + min/max',
    'editor.view_graph_only': 'Visa endast graf',
    'editor.entity_label': 'Elpris-entitet',
    'editor.entity_picker': 'Välj entitet',
    'editor.sell_toggle': 'Använd säljsensor för pris',
    'editor.sell_desc': 'Aktivera för att visa säljpriser bredvid köppriser för varje timme.',
    'editor.sell_entity_label': 'Säljpris-entitet',
    'editor.sell_entity_picker': 'Välj entitet',
    'label.buy': 'Köp',
    'label.sell': 'Sälj',
    'editor.sync_optional': 'Synk (valfritt)',
    'editor.sync_title': 'Dela “billigaste tider” mellan användare',
    'editor.sync_desc': 'Spara i Home Assistant (.storage) via integration',
  },
  nb: {
    'card.title_default': 'Energigraf-planlegger',

    'hint.select_entity': 'Velg en strømpris-entitet i redigereren.',
    'hint.entity_not_found': 'Entitet ikke funnet',
    'hint.no_price_data': 'Ingen prisdata funnet i entitetens attributter',
    'hint.cannot_build_graph': 'Kunne ikke bygge graf fra data.',

    'stats.min': 'Min',
    'stats.now': 'Nå',
    'stats.max': 'Høyest',
    'label.now_value': 'Nå: {value} {unit}',
    'label.now_no_data': 'Nå: Ingen data',
    'label.no_data': 'Ingen data',

    'sections.title': 'Billigste tider',

    'settings.open': 'Innstillinger',
    'settings.title': 'Innstillinger',
    'settings.close': 'Lukk',
    'settings.add_section': 'Legg til tidsseksjon',
    'settings.name': 'Navn',
    'settings.hours': 'Tidsintervall',
    'settings.add': 'Legg til',
    'settings.sections': 'Seksjoner',
    'settings.no_sections': 'Ingen seksjoner ennå.',
    'settings.remove': 'Slett',
    'settings.item_hours': 'Tidsintervall: {hours} timer',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Språk',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Tittel (valgfritt)',
    'editor.view_optional': 'Visning (valgfri)',
    'editor.view_label': 'Hva skal vises',
    'editor.view_show_all': 'Vis alt',
    'editor.view_graph_minmax': 'Vis graf + min/maks',
    'editor.view_graph_only': 'Vis kun graf',
    'editor.entity_label': 'Strømpris-entitet',
    'editor.entity_picker': 'Velg entitet',
    'editor.sell_toggle': 'Bruk salgsprissensor',
    'editor.sell_desc': 'Aktiver for å vise salgspriser ved siden av kjøpspriser for hver time.',
    'editor.sell_entity_label': 'Salgspris-entitet',
    'editor.sell_entity_picker': 'Velg entitet',
    'label.buy': 'Kjøp',
    'label.sell': 'Salg',
    'editor.sync_optional': 'Synk (valgfritt)',
    'editor.sync_title': 'Del “billigste tider” mellom brukere',
    'editor.sync_desc': 'Lagre i Home Assistant (.storage) via integrasjon',
  },
  de: {
    'card.title_default': 'Energiegraph-Planer',

    'hint.select_entity': 'Wähle im Editor eine Strompreis-Entität aus.',
    'hint.entity_not_found': 'Entität nicht gefunden',
    'hint.no_price_data': 'Keine Preisdaten in den Attributen der Entität gefunden',
    'hint.cannot_build_graph': 'Diagramm konnte aus den Daten nicht erstellt werden.',

    'stats.min': 'Min',
    'stats.now': 'Jetzt',
    'stats.max': 'Höchste',
    'label.now_value': 'Jetzt: {value} {unit}',
    'label.now_no_data': 'Jetzt: Keine Daten',
    'label.no_data': 'Keine Daten',

    'sections.title': 'Günstigste Zeiten',

    'settings.open': 'Einstellungen',
    'settings.title': 'Einstellungen',
    'settings.close': 'Schließen',
    'settings.add_section': 'Zeitabschnitt hinzufügen',
    'settings.name': 'Name',
    'settings.hours': 'Zeitintervall',
    'settings.add': 'Hinzufügen',
    'settings.sections': 'Abschnitte',
    'settings.no_sections': 'Noch keine Abschnitte.',
    'settings.remove': 'Löschen',
    'settings.item_hours': 'Zeitintervall: {hours} Stunden',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Sprache',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Titel (optional)',
    'editor.view_optional': 'Ansicht (optional)',
    'editor.view_label': 'Was anzeigen',
    'editor.view_show_all': 'Alles anzeigen',
    'editor.view_graph_minmax': 'Grafik + Min/Max anzeigen',
    'editor.view_graph_only': 'Nur Grafik anzeigen',
    'editor.entity_label': 'Strompreis-Entität',
    'editor.entity_picker': 'Entität auswählen',
    'editor.sell_toggle': 'Verkaufspreis-Sensor verwenden',
    'editor.sell_desc': 'Aktivieren, um Verkaufspreise neben Kaufpreisen pro Stunde anzuzeigen.',
    'editor.sell_entity_label': 'Verkaufspreis-Entität',
    'editor.sell_entity_picker': 'Entität auswählen',
    'label.buy': 'Kauf',
    'label.sell': 'Verkauf',
    'editor.sync_optional': 'Synchronisierung (optional)',
    'editor.sync_title': '„Günstigste Zeiten“ zwischen Benutzern teilen',
    'editor.sync_desc': 'In Home Assistant (.storage) über Integration speichern',
  },
  es: {
    'card.title_default': 'Programador de gráfico de energía',

    'hint.select_entity': 'Selecciona una entidad de precio de electricidad en el editor.',
    'hint.entity_not_found': 'Entidad no encontrada',
    'hint.no_price_data': 'No se encontraron datos de precio en los atributos de la entidad',
    'hint.cannot_build_graph': 'No se pudo construir el gráfico a partir de los datos.',

    'stats.min': 'Mín',
    'stats.now': 'Ahora',
    'stats.max': 'Máximo',
    'label.now_value': 'Ahora: {value} {unit}',
    'label.now_no_data': 'Ahora: Sin datos',
    'label.no_data': 'Sin datos',

    'sections.title': 'Horarios más baratos',

    'settings.open': 'Ajustes',
    'settings.title': 'Ajustes',
    'settings.close': 'Cerrar',
    'settings.add_section': 'Añadir sección de tiempo',
    'settings.name': 'Nombre',
    'settings.hours': 'Intervalo de tiempo',
    'settings.add': 'Añadir',
    'settings.sections': 'Secciones',
    'settings.no_sections': 'Aún no hay secciones.',
    'settings.remove': 'Eliminar',
    'settings.item_hours': 'Intervalo de tiempo: {hours} horas',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Idioma',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Título (opcional)',
    'editor.view_optional': 'Vista (opcional)',
    'editor.view_label': 'Qué mostrar',
    'editor.view_show_all': 'Mostrar todo',
    'editor.view_graph_minmax': 'Mostrar gráfico + mín/máx',
    'editor.view_graph_only': 'Mostrar solo gráfico',
    'editor.entity_label': 'Entidad de precio de electricidad',
    'editor.entity_picker': 'Seleccionar entidad',
    'editor.sell_toggle': 'Usar sensor de precio de venta',
    'editor.sell_desc': 'Activa para mostrar precios de venta junto a precios de compra para cada hora.',
    'editor.sell_entity_label': 'Entidad de precio de venta',
    'editor.sell_entity_picker': 'Seleccionar entidad',
    'label.buy': 'Compra',
    'label.sell': 'Venta',
    'editor.sync_optional': 'Sincronización (opcional)',
    'editor.sync_title': 'Compartir “horarios más baratos” entre usuarios',
    'editor.sync_desc': 'Guardar en Home Assistant (.storage) mediante la integración',
  },
  fr: {
    'card.title_default': 'Planificateur de graphique d’énergie',

    'hint.select_entity': 'Sélectionnez une entité de prix de l’électricité dans l’éditeur.',
    'hint.entity_not_found': 'Entité introuvable',
    'hint.no_price_data': 'Aucune donnée de prix trouvée dans les attributs de l’entité',
    'hint.cannot_build_graph': 'Impossible de construire le graphique à partir des données.',

    'stats.min': 'Min',
    'stats.now': 'Maintenant',
    'stats.max': 'Plus élevé',
    'label.now_value': 'Maintenant : {value} {unit}',
    'label.now_no_data': 'Maintenant : Aucune donnée',
    'label.no_data': 'Aucune donnée',

    'sections.title': 'Heures les moins chères',

    'settings.open': 'Paramètres',
    'settings.title': 'Paramètres',
    'settings.close': 'Fermer',
    'settings.add_section': 'Ajouter une plage horaire',
    'settings.name': 'Nom',
    'settings.hours': 'Intervalle de temps',
    'settings.add': 'Ajouter',
    'settings.sections': 'Sections',
    'settings.no_sections': 'Aucune section pour le moment.',
    'settings.remove': 'Supprimer',
    'settings.item_hours': 'Intervalle de temps : {hours} heures',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Langue',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Titre (optionnel)',
    'editor.view_optional': 'Affichage (optionnel)',
    'editor.view_label': 'Que montrer',
    'editor.view_show_all': 'Tout afficher',
    'editor.view_graph_minmax': 'Afficher graphique + min/max',
    'editor.view_graph_only': 'Afficher uniquement le graphique',
    'editor.entity_label': 'Entité de prix de l’électricité',
    'editor.entity_picker': 'Sélectionner une entité',
    'editor.sell_toggle': 'Utiliser un capteur de prix de vente',
    'editor.sell_desc': 'Activez pour afficher les prix de vente à côté des prix d’achat pour chaque heure.',
    'editor.sell_entity_label': 'Entité de prix de vente',
    'editor.sell_entity_picker': 'Sélectionner une entité',
    'label.buy': 'Achat',
    'label.sell': 'Vente',
    'editor.sync_optional': 'Synchronisation (optionnelle)',
    'editor.sync_title': 'Partager les “heures les moins chères” entre utilisateurs',
    'editor.sync_desc': 'Stocker dans Home Assistant (.storage) via l’intégration',
  },
  it: {
    'card.title_default': 'Pianificatore grafico energia',

    'hint.select_entity': "Seleziona un'entità del prezzo dell'elettricità nell'editor.",
    'hint.entity_not_found': 'Entità non trovata',
    'hint.no_price_data': "Nessun dato di prezzo trovato negli attributi dell'entità",
    'hint.cannot_build_graph': 'Impossibile creare il grafico dai dati.',

    'stats.min': 'Min',
    'stats.now': 'Ora',
    'stats.max': 'Massimo',
    'label.now_value': 'Ora: {value} {unit}',
    'label.now_no_data': 'Ora: Nessun dato',
    'label.no_data': 'Nessun dato',

    'sections.title': 'Orari più convenienti',

    'settings.open': 'Impostazioni',
    'settings.title': 'Impostazioni',
    'settings.close': 'Chiudi',
    'settings.add_section': 'Aggiungi sezione temporale',
    'settings.name': 'Nome',
    'settings.hours': 'Intervallo di tempo',
    'settings.add': 'Aggiungi',
    'settings.sections': 'Sezioni',
    'settings.no_sections': 'Nessuna sezione ancora.',
    'settings.remove': 'Elimina',
    'settings.item_hours': 'Intervallo di tempo: {hours} ore',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Lingua',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Titolo (opzionale)',
    'editor.view_optional': 'Vista (opzionale)',
    'editor.view_label': 'Cosa mostrare',
    'editor.view_show_all': 'Mostra tutto',
    'editor.view_graph_minmax': 'Mostra grafico + min/max',
    'editor.view_graph_only': 'Mostra solo grafico',
    'editor.entity_label': 'Entità prezzo elettricità',
    'editor.entity_picker': 'Seleziona entità',
    'editor.sell_toggle': 'Usa sensore prezzo di vendita',
    'editor.sell_desc': 'Abilita per mostrare i prezzi di vendita accanto ai prezzi di acquisto per ogni ora.',
    'editor.sell_entity_label': 'Entità prezzo di vendita',
    'editor.sell_entity_picker': 'Seleziona entità',
    'label.buy': 'Acquisto',
    'label.sell': 'Vendita',
    'editor.sync_optional': 'Sincronizzazione (opzionale)',
    'editor.sync_title': 'Condividi “orari più convenienti” tra utenti',
    'editor.sync_desc': 'Salva in Home Assistant (.storage) tramite integrazione',
  },
  fi: {
    'card.title_default': 'Energiagrafi-ajastin',

    'hint.select_entity': 'Valitse sähkön hinta -entiteetti editorissa.',
    'hint.entity_not_found': 'Entiteettiä ei löytynyt',
    'hint.no_price_data': 'Entiteetin attribuuteista ei löytynyt hintatietoja',
    'hint.cannot_build_graph': 'Graafia ei voitu muodostaa datasta.',

    'stats.min': 'Min',
    'stats.now': 'Nyt',
    'stats.max': 'Korkein',
    'label.now_value': 'Nyt: {value} {unit}',
    'label.now_no_data': 'Nyt: Ei dataa',
    'label.no_data': 'Ei dataa',

    'sections.title': 'Halvimmat ajat',

    'settings.open': 'Asetukset',
    'settings.title': 'Asetukset',
    'settings.close': 'Sulje',
    'settings.add_section': 'Lisää aikajakso',
    'settings.name': 'Nimi',
    'settings.hours': 'Aikaväli',
    'settings.add': 'Lisää',
    'settings.sections': 'Osiot',
    'settings.no_sections': 'Ei osioita vielä.',
    'settings.remove': 'Poista',
    'settings.item_hours': 'Aikaväli: {hours} tuntia',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Kieli',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Otsikko (valinnainen)',
    'editor.view_optional': 'Näkymä (valinnainen)',
    'editor.view_label': 'Mitä näytetään',
    'editor.view_show_all': 'Näytä kaikki',
    'editor.view_graph_minmax': 'Näytä kaavio + min/maks',
    'editor.view_graph_only': 'Näytä vain kaavio',
    'editor.entity_label': 'Sähkön hinta -entiteetti',
    'editor.entity_picker': 'Valitse entiteetti',
    'editor.sell_toggle': 'Käytä myyntihinta-anturia',
    'editor.sell_desc': 'Ota käyttöön, jotta myyntihinnat näkyvät ostohintojen vieressä jokaiselle tunnille.',
    'editor.sell_entity_label': 'Myyntihinnan entiteetti',
    'editor.sell_entity_picker': 'Valitse entiteetti',
    'label.buy': 'Osto',
    'label.sell': 'Myynti',
    'editor.sync_optional': 'Synkronointi (valinnainen)',
    'editor.sync_title': 'Jaa “halvimmat ajat” käyttäjien kesken',
    'editor.sync_desc': 'Tallenna Home Assistantiin (.storage) integraation kautta',
  },
  cs: {
    'card.title_default': 'Plánovač energetického grafu',

    'hint.select_entity': 'V editoru vyberte entitu ceny elektřiny.',
    'hint.entity_not_found': 'Entita nebyla nalezena',
    'hint.no_price_data': 'V atributech entity nebyla nalezena data o ceně',
    'hint.cannot_build_graph': 'Nepodařilo se vytvořit graf z dat.',

    'stats.min': 'Min',
    'stats.now': 'Nyní',
    'stats.max': 'Nejvyšší',
    'label.now_value': 'Nyní: {value} {unit}',
    'label.now_no_data': 'Nyní: Žádná data',
    'label.no_data': 'Žádná data',

    'sections.title': 'Nejlevnější časy',

    'settings.open': 'Nastavení',
    'settings.title': 'Nastavení',
    'settings.close': 'Zavřít',
    'settings.add_section': 'Přidat časový úsek',
    'settings.name': 'Název',
    'settings.hours': 'Časový interval',
    'settings.add': 'Přidat',
    'settings.sections': 'Úseky',
    'settings.no_sections': 'Zatím žádné úseky.',
    'settings.remove': 'Smazat',
    'settings.item_hours': 'Časový interval: {hours} hodin',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Jazyk',
    'editor.language_auto': 'Auto (Home Assistant)',
    'editor.title_optional': 'Název (volitelné)',
    'editor.view_optional': 'Zobrazení (volitelné)',
    'editor.view_label': 'Co zobrazit',
    'editor.view_show_all': 'Zobrazit vše',
    'editor.view_graph_minmax': 'Zobrazit graf + min/max',
    'editor.view_graph_only': 'Zobrazit pouze graf',
    'editor.entity_label': 'Entita ceny elektřiny',
    'editor.entity_picker': 'Vybrat entitu',
    'editor.sell_toggle': 'Použít senzor prodejní ceny',
    'editor.sell_desc': 'Povolte pro zobrazení prodejních cen vedle nákupních cen pro každou hodinu.',
    'editor.sell_entity_label': 'Entita prodejní ceny',
    'editor.sell_entity_picker': 'Vybrat entitu',
    'label.buy': 'Nákup',
    'label.sell': 'Prodej',
    'editor.sync_optional': 'Synchronizace (volitelné)',
    'editor.sync_title': 'Sdílet „nejlevnější časy“ mezi uživateli',
    'editor.sync_desc': 'Uložit do Home Assistant (.storage) přes integraci',
  },
  sl: {
    'card.title_default': 'Razporejevalnik energijskega grafa',

    'hint.select_entity': 'V urejevalniku izberite entiteto cene elektrike.',
    'hint.entity_not_found': 'Entiteta ni najdena',
    'hint.no_price_data': 'V atributih entitete ni podatkov o ceni',
    'hint.cannot_build_graph': 'Grafa ni bilo mogoče zgraditi iz podatkov.',

    'stats.min': 'Min',
    'stats.now': 'Zdaj',
    'stats.max': 'Najvišje',
    'label.now_value': 'Zdaj: {value} {unit}',
    'label.now_no_data': 'Zdaj: Ni podatkov',
    'label.no_data': 'Ni podatkov',

    'sections.title': 'Najcenejši časi',

    'settings.open': 'Nastavitve',
    'settings.title': 'Nastavitve',
    'settings.close': 'Zapri',
    'settings.add_section': 'Dodaj časovni odsek',
    'settings.name': 'Ime',
    'settings.hours': 'Časovni interval',
    'settings.add': 'Dodaj',
    'settings.sections': 'Odseki',
    'settings.no_sections': 'Zaenkrat ni odsekov.',
    'settings.remove': 'Izbriši',
    'settings.item_hours': 'Časovni interval: {hours} ur',
    'settings.interval': 'Graph resolution',
    'settings.quarter_hours': 'Use 15-minute intervals',

    'editor.language': 'Jezik',
    'editor.language_auto': 'Samodejno (Home Assistant)',
    'editor.title_optional': 'Naslov (neobvezno)',
    'editor.view_optional': 'Prikaz (neobvezno)',
    'editor.view_label': 'Kaj prikazati',
    'editor.view_show_all': 'Prikaži vse',
    'editor.view_graph_minmax': 'Prikaži graf + min/max',
    'editor.view_graph_only': 'Prikaži samo graf',
    'editor.entity_label': 'Entiteta cene elektrike',
    'editor.entity_picker': 'Izberi entiteto',
    'editor.sell_toggle': 'Uporabi senzor prodajne cene',
    'editor.sell_desc': 'Omogoči prikaz prodajnih cen poleg nakupnih cen za vsako uro.',
    'editor.sell_entity_label': 'Entiteta prodajne cene',
    'editor.sell_entity_picker': 'Izberi entiteto',
    'label.buy': 'Nakup',
    'label.sell': 'Prodaja',
    'editor.sync_optional': 'Sinhronizacija (neobvezno)',
    'editor.sync_title': 'Deli “najcenejše čase” med uporabniki',
    'editor.sync_desc': 'Shrani v Home Assistant (.storage) prek integracije',
  },
};

const EGS_LANG_ALIAS = { no: 'nb', cz: 'cs', dk: 'da' };

function egsGetLangFromHass(hass) {
  // Home Assistant can report locales like "da_DK"; normalize to BCP-47 ("da-DK").
  const raw =
    (typeof hass === 'string' ? hass : (hass?.locale?.language || hass?.language)) ||
    navigator.language ||
    'en';
  return String(raw).replace(/_/g, '-').toLowerCase();
}

function egsLocalize(key, langOrHass) {
  const raw = typeof langOrHass === 'string' ? langOrHass : egsGetLangFromHass(langOrHass);
  const lang = String(raw).replace(/_/g, '-').toLowerCase();
  const parts = lang.split('-');
  const candidates = [
    lang,
    parts[0],
    EGS_LANG_ALIAS[lang],
    EGS_LANG_ALIAS[parts[0]],
    'en',
  ].filter(Boolean);
  for (const c of candidates) {
    const dict = EGS_I18N[c];
    if (dict && dict[key]) return dict[key];
  }
  return (EGS_I18N.en && EGS_I18N.en[key]) || key;
}

function egsFormatTemplate(tpl, vars) {
  const s = (tpl ?? '').toString();
  const v = vars && typeof vars === 'object' ? vars : {};
  return s.replace(/\{([^}]+)\}/g, (_m, k) => (v[k] != null ? String(v[k]) : ''));
}

function egsGetUiLang(config, hass) {
  const forced = egsSafeText(config?.language || '').trim();
  return forced ? egsGetLangFromHass(forced) : egsGetLangFromHass(hass);
}
// ---- end i18n ----

/* ----------------- LIGHTWEIGHT PICKER (tt-entity-picker) -----------------
 * Use the same custom entity picker concept as used in other cards in this repo.
 */
if (!customElements.get("tt-entity-picker")) {
  class TTEntityPicker extends HTMLElement {
    static get observedAttributes() {
      return ["include-domains", "label", "disabled"];
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._hass = null;
      this._value = "";
      this._domains = [];
      this._disabled = false;
    }
    set hass(h) {
      this._hass = h;
      this._render();
    }
    get hass() {
      return this._hass;
    }
    set value(v) {
      this._value = v || "";
      this._render();
    }
    get value() {
      return this._value || "";
    }
    set disabled(v) {
      this._disabled = !!v;
      this._render();
    }
    get disabled() {
      return !!this._disabled;
    }
    attributeChangedCallback(name, _old, val) {
      if (name === "disabled") this._disabled = val !== null;
      this._render();
    }
    connectedCallback() {
      this._render();
    }
    _parseDomains() {
      try {
        const a = this.getAttribute("include-domains");
        if (!a) return [];
        const v = typeof a === "string" ? JSON.parse(a) : a;
        return Array.isArray(v) ? v.map((x) => String(x)) : [];
      } catch {
        return [];
      }
    }
    _render() {
      const label = this.getAttribute("label") || "";
      this._domains = this._parseDomains();

      const opts = [];
      try {
        const states = this._hass?.states || {};
        for (const id of Object.keys(states)) {
          const dom = id.split(".")[0];
          if (this._domains.length && !this._domains.includes(dom)) continue;
          const st = states[id];
          const name = st?.attributes?.friendly_name || id;
          opts.push({ id, name });
        }
      } catch {
        // ignore
      }
      opts.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

      const current = this._value || "";
      const hasCurrent = current && opts.some((o) => o.id === current);
      const extraCurrentOpt =
        current && !hasCurrent ? [`<option value="${current}">${current} (selected)</option>`] : [];

      const selOpts = [
        `<option value="">${label || "Select"}</option>`,
        ...extraCurrentOpt,
        ...opts.map((o) => `<option value="${o.id}">${o.name} (${o.id})</option>`),
      ];

      const css = `
        :host{ display:block; }
        .wrap{ width:100%; min-width:250px; }
        .sel{ position: relative; }
        select{ width:100%; height:36px; min-height:36px; appearance:none; -webkit-appearance:none; -moz-appearance:none; padding:6px 34px 6px 10px; border:1px solid var(--divider-color); border-radius:8px; background: var(--card-background-color); color: var(--primary-text-color); box-sizing: border-box; }
        select:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
        select:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
        select:disabled{ opacity:.6; cursor: not-allowed; }
        .dd-arrow{ position:absolute; right:12px; top:50%; transform: translateY(-50%); width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:6px solid var(--secondary-text-color); pointer-events:none; }
        select:disabled + .dd-arrow{ opacity:.6; }
      `;

      this.shadowRoot.innerHTML = `<style>${css}</style><div class="wrap"><div class="sel"><select aria-label="${label}">${selOpts.join(
        ""
      )}</select><span class="dd-arrow" aria-hidden="true"></span></div></div>`;

      const select = this.shadowRoot.querySelector("select");
      if (!select) return;
      try {
        select.value = current;
      } catch {
        // ignore
      }
      try {
        select.disabled = !!this._disabled;
      } catch {
        // ignore
      }

      // Signal picker open early (helps pause editor re-render while dropdown is open)
      try {
        select.addEventListener(
          "pointerdown",
          () => this.dispatchEvent(new CustomEvent("picker-opened", { bubbles: true, composed: true })),
          { passive: true }
        );
        select.addEventListener(
          "focus",
          () => this.dispatchEvent(new CustomEvent("picker-opened", { bubbles: true, composed: true })),
          { passive: true }
        );
      } catch {
        // ignore
      }

      select.onchange = (e) => {
        this._value = e.target.value || "";
        this.dispatchEvent(
          new CustomEvent("value-changed", {
            detail: { value: this._value },
            bubbles: true,
            composed: true,
          })
        );

        // Signal picker closed after a selection is made
        try {
          this.dispatchEvent(new CustomEvent("picker-closed", { bubbles: true, composed: true }));
        } catch {
          // ignore
        }
      };

      // Also signal closed on blur (if user clicks away without changing)
      try {
        select.addEventListener("blur", () => {
          this.dispatchEvent(new CustomEvent("picker-closed", { bubbles: true, composed: true }));
        });
      } catch {
        // ignore
      }
    }
  }

  // Avoid hard failures if another resource already defined the picker.
  try {
    if (!customElements.get("tt-entity-picker")) {
      customElements.define("tt-entity-picker", TTEntityPicker);
    }
  } catch {
    // ignore
  }
}

function egsSafeText(v) {
  return (v ?? "").toString();
}

function egsClamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function egsAsNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function egsParseDate(v) {
  const s = egsSafeText(v);
  if (!s) return null;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d : null;
}

function egsGet(obj, keys) {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k)) return obj[k];
  }
  return undefined;
}

function egsExtractSeries(stateObj, mode) {
  const attrs = stateObj?.attributes || {};

  const m = (mode || 'combined').toString();

  // Prefer combining today + tomorrow when available (common for electricity price sensors).
  const todayKeys = ["raw_today", "today", "prices", "price", "data", "values"];
  const tomorrowKeys = ["raw_tomorrow", "tomorrow"];

  let todayRaw = null;
  for (const key of todayKeys) {
    const v = attrs[key];
    if (Array.isArray(v) && v.length) {
      todayRaw = v;
      break;
    }
  }

  let tomorrowRaw = null;
  for (const key of tomorrowKeys) {
    const v = attrs[key];
    if (Array.isArray(v) && v.length) {
      tomorrowRaw = v;
      break;
    }
  }

  let raw = null;
  if (m === 'today') {
    raw = Array.isArray(todayRaw) && todayRaw.length ? todayRaw : tomorrowRaw;
  } else if (m === 'tomorrow') {
    raw = Array.isArray(tomorrowRaw) && tomorrowRaw.length ? tomorrowRaw : todayRaw;
  } else {
    // combined
    if (Array.isArray(todayRaw) && todayRaw.length) {
      raw = Array.isArray(tomorrowRaw) && tomorrowRaw.length ? [...todayRaw, ...tomorrowRaw] : todayRaw;
    } else {
      raw = tomorrowRaw;
    }
  }

  if (!Array.isArray(raw) || !raw.length) return { points: [], unit: attrs.unit_of_measurement || "" };

  const points = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];

    if (typeof item === "number") {
      points.push({ ts: null, value: item, idx: i });
      continue;
    }

    if (item && typeof item === "object") {
      let rawVal = egsGet(item, ["value", "price", "val", "v", "price_per_kwh", "total", "amount", "y"]);
      if (typeof rawVal === "string") rawVal = rawVal.replace(",", ".");
      const value = egsAsNumber(rawVal);
      if (value == null) continue;

      // Common timestamp keys across different electricity price sensors.
      // Energi Data Service exposes objects like: { hour: '2026-01-05T00:00:00+01:00', price: 1.2 }
      const start = egsGet(item, [
        "hour",
        "start",
        "start_time",
        "startTime",
        "from",
        "time",
        "date",
        "datetime",
        "begin",
        "t",
      ]);
      const d = egsParseDate(start);
      points.push({ ts: d ? d.getTime() : null, value, idx: i });
      continue;
    }
  }

  return { points, unit: attrs.unit_of_measurement || attrs.unit || "" };
}

function egsStartOfLocalDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function egsStartOfLocalHour(ts) {
  const d = new Date(ts);
  d.setMinutes(0, 0, 0);
  return d.getTime();
}

function egsStartOfLocalInterval(ts, intervalMinutes) {
  const m = egsClamp(Number(intervalMinutes) || 60, 1, 60);
  const d = new Date(ts);
  const mm = d.getMinutes();
  const floored = Math.floor(mm / m) * m;
  d.setMinutes(floored, 0, 0);
  return d.getTime();
}

function egsBuildTimeline(points, nowTs, intervalMinutes) {
  const src = Array.isArray(points) ? points : [];
  const intervalM = egsClamp(Number(intervalMinutes) || 60, 1, 60);
  const stepMs = intervalM * 60 * 1000;
  const hasTs = src.some((p) => p && p.ts != null);

  if (!hasTs) {
    // No timestamps: assume sequential hourly values for current local day.
    const dayStart = egsStartOfLocalDay(nowTs != null ? nowTs : Date.now());
    const hourly = src.map((p, i) => ({ ts: dayStart + i * 3600 * 1000, value: p?.value ?? null, idx: i }));
    if (intervalM === 60) return hourly;

    // Expand each hour value across sub-intervals.
    const out = [];
    const perHour = Math.max(1, Math.round(60 / intervalM));
    for (let i = 0; i < hourly.length; i++) {
      const base = hourly[i];
      for (let j = 0; j < perHour; j++) {
        out.push({ ts: base.ts + j * stepMs, value: base.value, idx: out.length });
      }
    }
    return out;
  }

  const map = new Map();
  let minTs = null;
  let maxTs = null;

  // Detect hourly-only datasets (all timestamps are on the hour).
  let hourlyOnly = true;
  for (const p of src) {
    if (!p || p.ts == null) continue;
    const d = new Date(p.ts);
    if (intervalM !== 60) {
      // In 15-min mode, consider the series hourly-only when all samples start at HH:00.
      if (d.getMinutes() !== 0) hourlyOnly = false;
    }

    const t = egsStartOfLocalInterval(p.ts, intervalM);
    map.set(t, p.value);
    if (minTs == null || t < minTs) minTs = t;
    if (maxTs == null || t > maxTs) maxTs = t;
  }
  if (minTs == null || maxTs == null) return [];

  // If hourly-only but interval is smaller, fill sub-intervals inside each hour with the hour value.
  if (intervalM !== 60 && hourlyOnly) {
    const perHour = Math.max(1, Math.round(60 / intervalM));
    const hourKeys = Array.from(map.keys()).sort((a, b) => a - b);
    for (const hourTs of hourKeys) {
      const v = map.get(hourTs);
      if (!map.has(hourTs) || !Number.isFinite(v)) continue;
      for (let j = 1; j < perHour; j++) {
        const t = hourTs + j * stepMs;
        if (!map.has(t)) map.set(t, v);
      }
    }
  }

  const out = [];
  for (let t = minTs; t <= maxTs; t += stepMs) {
    let v = map.has(t) ? map.get(t) : null;
    // For hourly-only data expanded to smaller intervals: keep the hour value within the hour.
    if (v == null && intervalM !== 60 && hourlyOnly) {
      const h0 = egsStartOfLocalHour(t);
      v = map.has(h0) ? map.get(h0) : null;
    }
    out.push({ ts: t, value: v, idx: out.length });
  }

  // Ensure the current interval exists in the view (helps show the "Nu" marker even if the feed is lagging).
  try {
    const nowSlot = egsStartOfLocalInterval(nowTs, intervalM);
    if (nowSlot > maxTs) {
      for (let t = maxTs + stepMs; t <= nowSlot; t += stepMs) {
        let v = map.has(t) ? map.get(t) : null;
        if (v == null && intervalM !== 60 && hourlyOnly) {
          const h0 = egsStartOfLocalHour(t);
          v = map.has(h0) ? map.get(h0) : null;
        }
        out.push({ ts: t, value: v, idx: out.length });
      }
    }
  } catch {
    // ignore
  }

  return out;
}

function egsNormalizeTo24(points, nowTs) {
  const out = [];
  const hasTs = points?.some?.((p) => p && p.ts != null);

  if (hasTs) {
    // Pick day based on first valid timestamp (fallback: today).
    const first = points.find((p) => p && p.ts != null);
    const dayStart = egsStartOfLocalDay(first?.ts ?? nowTs);
    const hours = new Array(24).fill(null);

    for (const p of points) {
      if (!p || p.ts == null) continue;
      const pDay = egsStartOfLocalDay(p.ts);
      if (pDay !== dayStart) continue;
      const h = new Date(p.ts).getHours();
      if (h < 0 || h > 23) continue;
      hours[h] = p.value;
    }

    for (let h = 0; h < 24; h++) {
      out.push({ ts: dayStart + h * 3600 * 1000, value: hours[h], idx: h });
    }
    return out;
  }

  // No timestamps: assume sequential hourly values.
  for (let h = 0; h < 24; h++) {
    const p = points[h];
    out.push({ ts: null, value: p ? p.value : null, idx: h });
  }
  return out;
}

function egsComputeTiers(values) {
  const nums = (values || []).filter((v) => Number.isFinite(v)).slice().sort((a, b) => a - b);
  const n = nums.length;
  if (!n) return { t1: null, t2: null };
  const i1 = Math.max(0, Math.min(n - 1, Math.floor((n - 1) * 0.33)));
  const i2 = Math.max(0, Math.min(n - 1, Math.floor((n - 1) * 0.66)));
  return { t1: nums[i1], t2: nums[i2] };
}

function egsTierClass(value, tiers) {
  if (!Number.isFinite(value)) return "bar-missing";
  const t1 = tiers?.t1;
  const t2 = tiers?.t2;
  if (!Number.isFinite(t1) || !Number.isFinite(t2)) return "bar-mid";
  if (value <= t1) return "bar-low";
  if (value <= t2) return "bar-mid";
  return "bar-high";
}

function egsPad2(n) {
  const v = Number(n);
  return v < 10 ? `0${v}` : `${v}`;
}

function egsFormatHourRange(startHour, hours) {
  const s = egsClamp(Number(startHour) || 0, 0, 23);
  const h = egsClamp(Number(hours) || 0, 1, 24);

  const startMin = s * 60;
  const endMinRaw = (s + h) * 60 - 1; // inclusive end (minus 1 minute)
  const endMin = egsClamp(endMinRaw, 0, 24 * 60 - 1);
  const endH = Math.floor(endMin / 60);
  const endM = endMin % 60;

  return `${egsPad2(s)}:00 - ${egsPad2(endH)}:${egsPad2(endM)}`;
}

function egsFormatDate(d) {
  try {
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" });
  } catch {
    const mm = egsPad2(d.getMonth() + 1);
    const dd = egsPad2(d.getDate());
    return `${dd}/${mm}`;
  }
}

function egsFormatDateByLang(d, langOrHass) {
  try {
    const loc = egsGetLangFromHass(langOrHass);
    return d.toLocaleDateString(loc || undefined, { day: '2-digit', month: '2-digit' });
  } catch {
    return egsFormatDate(d);
  }
}

function egsFormatRangeByTs(startTs, hours, nowTs, langOrHass) {
  if (startTs == null) return null;
  const h = egsClamp(Number(hours) || 0, 1, 240);
  const start = new Date(startTs);
  const end = new Date(startTs + h * 3600 * 1000 - 60 * 1000);

  const startH = egsPad2(start.getHours());
  const endH = egsPad2(end.getHours());
  const endM = egsPad2(end.getMinutes());

  const nowDay = nowTs != null ? egsStartOfLocalDay(nowTs) : null;
  const startDay = egsStartOfLocalDay(start.getTime());
  const endDay = egsStartOfLocalDay(end.getTime());

  if (nowDay != null && startDay === nowDay && endDay === nowDay) {
    return `${startH}:00 - ${endH}:${endM}`;
  }

  if (startDay === endDay) {
    return `${egsFormatDateByLang(start, langOrHass)} ${startH}:00 - ${endH}:${endM}`;
  }

  return `${egsFormatDateByLang(start, langOrHass)} ${startH}:00 - ${egsFormatDateByLang(
    end,
    langOrHass
  )} ${endH}:${endM}`;
}

function egsFindCheapestWindow(hourValues, hours, intervalMinutes) {
  const intervalM = egsClamp(Number(intervalMinutes) || 60, 1, 60);
  const perHour = Math.max(1, Math.round(60 / intervalM));
  const hoursInt = egsClamp(Number(hours) || 0, 1, 240);
  const steps = egsClamp(Math.round(hoursInt * perHour), 1, 240 * perHour);
  const vals = Array.isArray(hourValues) ? hourValues : [];
  if (vals.length < steps) return null;

  let best = null;
  for (let start = 0; start <= vals.length - steps; start++) {
    let sum = 0;
    let ok = true;
    for (let i = 0; i < steps; i++) {
      const v = vals[start + i];
      if (!Number.isFinite(v)) {
        ok = false;
        break;
      }
      sum += v;
    }
    if (!ok) continue;
    if (!best || sum < best.sum) best = { start, hours: hoursInt, steps, sum, avg: sum / steps };
  }
  return best;
}

function egsFindCheapestWindowFrom(hourValues, hours, startIndex, intervalMinutes) {
  const intervalM = egsClamp(Number(intervalMinutes) || 60, 1, 60);
  const perHour = Math.max(1, Math.round(60 / intervalM));
  const hoursInt = egsClamp(Number(hours) || 0, 1, 240);
  const steps = egsClamp(Math.round(hoursInt * perHour), 1, 240 * perHour);
  const vals = Array.isArray(hourValues) ? hourValues : [];
  const start = egsClamp(Number(startIndex) || 0, 0, vals.length);
  if (vals.length - start < steps) return null;

  let best = null;
  for (let s = start; s <= vals.length - steps; s++) {
    let sum = 0;
    let ok = true;
    for (let i = 0; i < steps; i++) {
      const v = vals[s + i];
      if (!Number.isFinite(v)) {
        ok = false;
        break;
      }
      sum += v;
    }
    if (!ok) continue;
    if (!best || sum < best.sum) best = { start: s, hours: hoursInt, steps, sum, avg: sum / steps };
  }
  return best;
}

function egsStorageKey(entityId) {
  return `egs.sections.v1.${egsSafeText(entityId)}`;
}

function egsSettingsKey(entityId) {
  return `egs.settings.v1.${egsSafeText(entityId)}`;
}

function egsNormalizeSettings(raw) {
  const obj = raw && typeof raw === 'object' ? raw : {};
  const m = Number(obj.interval_minutes);
  const interval_minutes = m === 15 ? 15 : 60;
  return { interval_minutes };
}

function egsNormalizeSections(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const s of raw) {
    if (!s || typeof s !== "object") continue;
    const name = egsSafeText(s.name).trim();
    if (!name) continue;
    const hours = egsClamp(Number(s.hours) || 0, 1, 24);
    out.push({ name, hours });
  }
  // De-dupe by name (first wins)
  const seen = new Set();
  const uniq = [];
  for (const s of out) {
    if (seen.has(s.name)) continue;
    seen.add(s.name);
    uniq.push(s);
  }
  return uniq.slice(0, 100);
}

function egsSyncEnabled(config) {
  return !!(config && config.sync);
}

function egsWsSend(hass, msg) {
  try {
    if (hass?.connection?.sendMessagePromise) {
      return hass.connection.sendMessagePromise(msg);
    }
  } catch {
    // ignore
  }
  try {
    if (typeof hass?.callWS === "function") {
      return hass.callWS(msg);
    }
  } catch {
    // ignore
  }
  return Promise.reject(new Error("No websocket available"));
}

function egsLoadSections(entityId) {
  try {
    const raw = localStorage.getItem(egsStorageKey(entityId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return egsNormalizeSections(parsed);
  } catch {
    return [];
  }
}

function egsSaveSections(entityId, sections) {
  try {
    localStorage.setItem(egsStorageKey(entityId), JSON.stringify(sections || []));
  } catch {
    // ignore
  }
}

function egsLoadSettings(entityId) {
  try {
    const raw = localStorage.getItem(egsSettingsKey(entityId));
    if (!raw) return egsNormalizeSettings(null);
    return egsNormalizeSettings(JSON.parse(raw));
  } catch {
    return egsNormalizeSettings(null);
  }
}

function egsSaveSettings(entityId, settings) {
  try {
    localStorage.setItem(egsSettingsKey(entityId), JSON.stringify(egsNormalizeSettings(settings)));
  } catch {
    // ignore
  }
}

function egsComputeBars(points, w, h, pad, extraValues) {
  const innerW = Math.max(1, w - pad.left - pad.right);
  const innerH = Math.max(1, h - pad.top - pad.bottom);

  const primaryValues = points.map((p) => p.value).filter((v) => Number.isFinite(v));
  const secondaryValues = Array.isArray(extraValues) ? extraValues.filter((v) => Number.isFinite(v)) : [];
  const values = [...primaryValues, ...secondaryValues];
  if (!values.length) return null;

  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const range = max - min;
  const yPad = range * 0.08;
  min -= yPad;
  max += yPad;

  const n = points.length;
  const toY = (v) => pad.top + (1 - (v - min) / (max - min)) * innerH;

  const baselineY = min < 0 && max > 0 ? toY(0) : max <= 0 ? pad.top : pad.top + innerH;

  const step = innerW / Math.max(1, n);
  // Keep bars from getting wider on large cards; use extra space as gap instead.
  const maxBarW = 24.5;
  const barW = Math.max(1, Math.min(step * 0.72, maxBarW));
  const barOffset = (step - barW) / 2;

  const pts = points.map((p, i) => {
    const v = Number.isFinite(p.value) ? p.value : null;
    const x = pad.left + i * step + barOffset;
    const xCenter = x + barW / 2;
    const yVal = toY(v ?? 0);
    const yTop = Math.min(yVal, baselineY);
    const yBottom = Math.max(yVal, baselineY);
    const heightPx = v == null ? 0 : Math.max(0, yBottom - yTop);
    return {
      i,
      ts: p.ts,
      value: v,
      x,
      xCenter,
      y: yTop,
      h: heightPx,
      w: barW,
    };
  });

  return { min, max, baselineY, pts };
}

function egsNearestIndexByTime(pts, nowTs) {
  if (!pts?.length || nowTs == null) return null;

  // If the series has timestamps, choose closest.
  const hasTs = pts.some((p) => p.ts != null);
  if (hasTs) {
    let bestI = 0;
    let bestDist = Infinity;
    for (let i = 0; i < pts.length; i++) {
      const t = pts[i].ts;
      if (t == null) continue;
      const dist = Math.abs(t - nowTs);
      if (dist < bestDist) {
        bestDist = dist;
        bestI = i;
      }
    }
    return bestI;
  }

  // Otherwise: assume hourly values for current day.
  const d = new Date(nowTs);
  const i = egsClamp(d.getHours(), 0, pts.length - 1);
  return i;
}

function egsMsToNextLocalBoundary(nowTs, intervalMinutes) {
  const intervalM = egsClamp(Number(intervalMinutes) || 60, 1, 60);
  const now = new Date(nowTs != null ? nowTs : Date.now());
  const next = new Date(now);

  if (intervalM === 60) {
    next.setMinutes(0, 0, 0);
    next.setHours(now.getHours() + 1);
  } else {
    const mm = now.getMinutes();
    const nextMin = Math.floor(mm / intervalM) * intervalM + intervalM;
    next.setMinutes(nextMin, 0, 0);
    if (nextMin >= 60) next.setHours(now.getHours() + 1);
  }

  return Math.max(250, next.getTime() - now.getTime());
}

function egsScrollGraphToNow(graphEl) {
  if (!graphEl) return false;
  try {
    const max = Math.max(0, (graphEl.scrollWidth || 0) - (graphEl.clientWidth || 0));
    // Only auto-scroll when a horizontal scrollbar is actually needed.
    if (max <= 0) return false;

    const svg = graphEl.querySelector('svg');
    const nowXAttr = svg?.getAttribute?.('data-now-x');
    const nowX = nowXAttr != null && nowXAttr !== '' ? Number(nowXAttr) : null;
    if (!Number.isFinite(nowX) || nowX == null) return false;

    // Center "now" in the visible viewport when possible.
    const desired = nowX - (graphEl.clientWidth || 0) / 2;
    graphEl.scrollLeft = egsClamp(desired, 0, max);
    return true;
  } catch {
    return false;
  }
}

class EnergyGraphSchedulerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
    this._settingsOpen = false;
    this._sections = [];
    this._selectedSectionIdx = null;
    this._graphScrollLeft = 0;
    this._graphScrollRatio = null;
    this._lastEntityId = "";
    this._lastEntityRenderKey = null;
    this._sectionsLoadKey = null;

    this._intervalMinutes = 60;

    this._syncUnsub = null;
    this._syncSubKey = null;

    this._syncSettingsUnsub = null;
    this._syncSettingsSubKey = null;

    this._syncPollTimer = null;
    this._syncPollKey = null;

    this._syncSettingsPollTimer = null;
    this._syncSettingsPollKey = null;

    this._nowFollowTimer = null;
    this._nowFollowKey = null;

    this._egsResizeObserver = null;
  }

  static getStubConfig() {
    return {
      type: `custom:${EGS_CARD_TAG}`,
      // Localize default title based on browser language; editor/runtime will further adapt to HA language
      title: egsLocalize('card.title_default', navigator.language || 'en'),
      entity: "",
      use_tomorrow_entity: false,
      tomorrow_entity: "",
      use_sell_entity: false,
      sell_entity: "",
      display_mode: "all", // all | graph_minmax | graph_only
      sync: false,
      language: "", // "" = auto (Home Assistant)
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object") throw new Error("Invalid configuration");
    const stub = EnergyGraphSchedulerCard.getStubConfig();
    const prevEntity = this._config?.entity || "";
    const prevUseTomorrow = !!this._config?.use_tomorrow_entity;
    const prevTomorrowEntity = this._config?.tomorrow_entity || "";
    const prevUseSell = !!this._config?.use_sell_entity;
    const prevSellEntity = this._config?.sell_entity || "";
    const prevSync = !!this._config?.sync;
    this._config = {
      ...stub,
      ...(config || {}),
      // Ensure entity/title defaults are always strings
      title: config.title ?? stub.title,
      entity: config.entity || "",
      use_tomorrow_entity: !!config.use_tomorrow_entity,
      tomorrow_entity: config.tomorrow_entity || "",
      use_sell_entity: !!config.use_sell_entity,
      sell_entity: config.sell_entity || "",
      display_mode: ['all', 'graph_minmax', 'graph_only'].includes(config.display_mode)
        ? config.display_mode
        : stub.display_mode,
      sync: !!config.sync,
      language: typeof config.language === 'string' ? config.language : stub.language,
      // Never lose type
      type: config.type || stub.type,
    };

    // If entity changed, allow re-render even if hass is spamming updates.
    const nextEntity = this._config?.entity || "";
    const nextUseTomorrow = !!this._config?.use_tomorrow_entity;
    const nextTomorrowEntity = this._config?.tomorrow_entity || "";
    const nextUseSell = !!this._config?.use_sell_entity;
    const nextSellEntity = this._config?.sell_entity || "";
    const nextSync = !!this._config?.sync;
    if (
      prevEntity !== nextEntity ||
      prevSync !== nextSync ||
      prevUseTomorrow !== nextUseTomorrow ||
      prevTomorrowEntity !== nextTomorrowEntity ||
      prevUseSell !== nextUseSell ||
      prevSellEntity !== nextSellEntity
    ) {
      this._lastEntityId = "";
      this._lastEntityRenderKey = null;
      this._sectionsLoadKey = null;

      this._intervalMinutes = 60;

      // Recreate websocket subscription if needed.
      this._syncSubKey = null;
      this._teardownSyncSubscription();

      this._syncSettingsSubKey = null;
      this._teardownSettingsSubscription();
      this._stopSettingsPolling();
    }
    this._render();
  }

  disconnectedCallback() {
    this._teardownSyncSubscription();
    this._stopSyncPolling();
    this._teardownSettingsSubscription();
    this._stopSettingsPolling();
    this._stopNowFollowTimer();
    try {
      if (this._egsResizeObserver) this._egsResizeObserver.disconnect();
    } catch {
      // ignore
    }
  }

  _stopNowFollowTimer() {
    if (this._nowFollowTimer) {
      clearTimeout(this._nowFollowTimer);
      this._nowFollowTimer = null;
    }
    this._nowFollowKey = null;
  }

  _startNowFollowTimer() {
    // Re-render around interval boundaries so "now" moves and we keep the view aligned.
    const useTomorrow = !!this._config?.use_tomorrow_entity;
    const tEnt = useTomorrow ? egsSafeText(this._config?.tomorrow_entity || '') : '';
    const useSell = !!this._config?.use_sell_entity;
    const sEnt = useSell ? egsSafeText(this._config?.sell_entity || '') : '';
    const key = `${egsSafeText(this._config?.entity || '')}|${tEnt}|${sEnt}|boundary|${this._intervalMinutes === 15 ? 15 : 60}`;
    if (this._nowFollowKey === key && this._nowFollowTimer) return;

    this._stopNowFollowTimer();
    this._nowFollowKey = key;

    const tick = () => {
      if (this._nowFollowKey !== key) return;
      // Don't steal focus while settings modal is open.
      if (!this._settingsOpen) this._render();
      this._nowFollowTimer = setTimeout(tick, egsMsToNextLocalBoundary(Date.now(), this._intervalMinutes));
    };

    this._nowFollowTimer = setTimeout(tick, egsMsToNextLocalBoundary(Date.now(), this._intervalMinutes));
  }

  async _teardownSyncSubscription() {
    const unsub = this._syncUnsub;
    this._syncUnsub = null;
    if (typeof unsub === "function") {
      try {
        await unsub();
      } catch {
        // ignore
      }
    }
  }

  async _teardownSettingsSubscription() {
    const unsub = this._syncSettingsUnsub;
    this._syncSettingsUnsub = null;
    if (typeof unsub === "function") {
      try {
        await unsub();
      } catch {
        // ignore
      }
    }
  }

  _stopSyncPolling() {
    if (this._syncPollTimer) {
      clearInterval(this._syncPollTimer);
      this._syncPollTimer = null;
    }
    this._syncPollKey = null;
  }

  _stopSettingsPolling() {
    if (this._syncSettingsPollTimer) {
      clearInterval(this._syncSettingsPollTimer);
      this._syncSettingsPollTimer = null;
    }
    this._syncSettingsPollKey = null;
  }

  _ensureSyncPolling(entityId) {
    const ent = egsSafeText(entityId);
    const sync = egsSyncEnabled(this._config);
    if (!sync || !ent || !this._hass) {
      this._stopSyncPolling();
      return;
    }

    const key = `${ent}|sync`;
    if (this._syncPollKey === key && this._syncPollTimer) return;

    this._stopSyncPolling();
    this._syncPollKey = key;

    const tick = () => {
      // Only poll while config is still the same
      if (this._syncPollKey !== key) return;
      if (!egsSyncEnabled(this._config)) return;
      if (egsSafeText(this._config?.entity) !== ent) return;

      egsWsSend(this._hass, { type: `${EGS_SYNC_DOMAIN}/get_sections`, entity_id: ent })
        .then((res) => {
          if (this._syncPollKey !== key) return;
          const secs = egsNormalizeSections(res?.sections);
          const cur = Array.isArray(this._sections) ? this._sections : [];
          // Cheap deep-eq for small arrays
          const a = JSON.stringify(cur);
          const b = JSON.stringify(secs);
          if (a === b) return;
          this._sections = secs;
          egsSaveSections(ent, secs);
          this._render();
        })
        .catch(() => {
          // ignore
        });
    };

    // Poll every 10s; cheap and avoids hard refresh.
    this._syncPollTimer = setInterval(tick, 10000);
  }

  _ensureSettingsPolling(entityId) {
    const ent = egsSafeText(entityId);
    const sync = egsSyncEnabled(this._config);
    if (!sync || !ent || !this._hass) {
      this._stopSettingsPolling();
      return;
    }

    const key = `${ent}|settings_sync`;
    if (this._syncSettingsPollKey === key && this._syncSettingsPollTimer) return;

    this._stopSettingsPolling();
    this._syncSettingsPollKey = key;

    const tick = () => {
      if (this._syncSettingsPollKey !== key) return;
      if (!egsSyncEnabled(this._config)) return;
      if (egsSafeText(this._config?.entity) !== ent) return;

      egsWsSend(this._hass, { type: `${EGS_SYNC_DOMAIN}/get_settings`, entity_id: ent })
        .then((res) => {
          if (this._syncSettingsPollKey !== key) return;
          const next = egsNormalizeSettings(res?.settings);
          const cur = egsNormalizeSettings({ interval_minutes: this._intervalMinutes });
          if (JSON.stringify(cur) === JSON.stringify(next)) return;
          this._intervalMinutes = next.interval_minutes === 15 ? 15 : 60;
          egsSaveSettings(ent, next);
          this._startNowFollowTimer();
          this._render();
        })
        .catch(() => {
          // ignore
        });
    };

    // Poll every 10s; cheap and avoids hard refresh.
    this._syncSettingsPollTimer = setInterval(tick, 10000);
  }

  async _ensureSyncSubscription(entityId) {
    const ent = egsSafeText(entityId);
    const sync = egsSyncEnabled(this._config);
    if (!sync || !ent || !this._hass?.connection?.subscribeMessage) {
      if (this._syncUnsub) this._teardownSyncSubscription();
      this._syncSubKey = null;
      return;
    }

    const key = `${ent}|sync`;
    if (this._syncSubKey === key && this._syncUnsub) return;

    await this._teardownSyncSubscription();
    this._syncSubKey = key;

    try {
      const conn = this._hass.connection;
      const unsub = await conn.subscribeMessage(
        (msg) => {
          if (msg && msg.type === "event" && msg.event) {
            const ev = msg.event;
            if (egsSafeText(ev.entity_id) !== ent) return;
            const secs = egsNormalizeSections(ev.sections);
            this._sections = secs;
            egsSaveSections(ent, secs);
            this._render();
          }
        },
        { type: `${EGS_SYNC_DOMAIN}/subscribe_sections`, entity_id: ent }
      );
      this._syncUnsub = unsub;
    } catch {
      // If subscription fails, keep local-only behavior.
      this._syncSubKey = null;
    }
  }

  async _ensureSettingsSubscription(entityId) {
    const ent = egsSafeText(entityId);
    const sync = egsSyncEnabled(this._config);
    if (!sync || !ent || !this._hass?.connection?.subscribeMessage) {
      if (this._syncSettingsUnsub) this._teardownSettingsSubscription();
      this._syncSettingsSubKey = null;
      return;
    }

    const key = `${ent}|settings_sync`;
    if (this._syncSettingsSubKey === key && this._syncSettingsUnsub) return;

    await this._teardownSettingsSubscription();
    this._syncSettingsSubKey = key;

    try {
      const conn = this._hass.connection;
      const unsub = await conn.subscribeMessage(
        (msg) => {
          if (msg && msg.type === "event" && msg.event) {
            const ev = msg.event;
            if (egsSafeText(ev.entity_id) !== ent) return;
            const next = egsNormalizeSettings(ev.settings);
            this._intervalMinutes = next.interval_minutes === 15 ? 15 : 60;
            egsSaveSettings(ent, next);
            this._startNowFollowTimer();
            this._render();
          }
        },
        { type: `${EGS_SYNC_DOMAIN}/subscribe_settings`, entity_id: ent }
      );
      this._syncSettingsUnsub = unsub;
    } catch {
      this._syncSettingsSubKey = null;
    }
  }

  _requestSectionsLoad(entityId) {
    const ent = egsSafeText(entityId);
    if (!ent) return;

    const sync = egsSyncEnabled(this._config);
    const key = `${ent}|${sync ? "sync" : "local"}`;
    if (this._sectionsLoadKey === key) return;
    this._sectionsLoadKey = key;

    const local = egsLoadSections(ent);
    // Fast path: show local immediately
    this._sections = local;

    // Load per-entity settings (local only)
    try {
      const st = egsLoadSettings(ent);
      this._intervalMinutes = st.interval_minutes === 15 ? 15 : 60;
    } catch {
      this._intervalMinutes = 60;
    }

    // Ensure we receive live updates (no hard refresh needed)
    this._ensureSyncSubscription(ent);
    this._ensureSyncPolling(ent);

    this._ensureSettingsSubscription(ent);
    this._ensureSettingsPolling(ent);

    if (!sync) return;
    const hass = this._hass;
    if (!hass) return;

    egsWsSend(hass, { type: `${EGS_SYNC_DOMAIN}/get_sections`, entity_id: ent })
      .then((res) => {
        // Ignore stale responses.
        if (this._sectionsLoadKey !== key) return;
        if (egsSafeText(this._config?.entity) !== ent) return;

        const secs = egsNormalizeSections(res?.sections);
        if (secs.length) {
          this._sections = secs;
          egsSaveSections(ent, secs);
          this._render();
          return;
        }

        // If backend is empty but local has data, push it once.
        if (local.length) {
          egsWsSend(hass, {
            type: `${EGS_SYNC_DOMAIN}/set_sections`,
            entity_id: ent,
            sections: local,
          }).catch(() => {});
        }
      })
      .catch(() => {
        // Keep local on error
      });

    egsWsSend(hass, { type: `${EGS_SYNC_DOMAIN}/get_settings`, entity_id: ent })
      .then((res) => {
        // Ignore stale responses.
        if (this._sectionsLoadKey !== key) return;
        if (egsSafeText(this._config?.entity) !== ent) return;

        const exists = !!res?.exists;
        const next = egsNormalizeSettings(res?.settings);

        if (exists) {
          const cur = egsNormalizeSettings({ interval_minutes: this._intervalMinutes });
          if (JSON.stringify(cur) !== JSON.stringify(next)) {
            this._intervalMinutes = next.interval_minutes === 15 ? 15 : 60;
            egsSaveSettings(ent, next);
            this._startNowFollowTimer();
            this._render();
          }
          return;
        }

        // Backend has no settings yet: seed from local if non-default.
        const curM = this._intervalMinutes === 15 ? 15 : 60;
        if (curM !== 60) {
          egsWsSend(hass, {
            type: `${EGS_SYNC_DOMAIN}/set_settings`,
            entity_id: ent,
            settings: { interval_minutes: curM },
          }).catch(() => {});
        }
      })
      .catch(() => {
        // Keep local on error
      });
  }

  _persistSections(entityId, sections) {
    const ent = egsSafeText(entityId);
    if (!ent) return;
    const next = egsNormalizeSections(sections || []);

    // Always cache locally as fallback
    egsSaveSections(ent, next);

    if (!egsSyncEnabled(this._config)) return;
    const hass = this._hass;
    if (!hass) return;

    egsWsSend(hass, { type: `${EGS_SYNC_DOMAIN}/set_sections`, entity_id: ent, sections: next }).catch(() => {});
  }

  set hass(hass) {
    this._hass = hass;

    // Home Assistant updates `hass` very frequently. While the Settings modal is open,
    // a full re-render would recreate the inputs and steal focus/selection.
    if (this._settingsOpen) return;

    // Avoid full re-render on every hass tick; only re-render when the selected
    // entity actually updates (this also prevents scroll from snapping back).
    try {
      const primaryEntityId = egsSafeText(this._config?.entity || "");
      const useTomorrow = !!this._config?.use_tomorrow_entity;
      const tomorrowEntityId = useTomorrow ? egsSafeText(this._config?.tomorrow_entity || "") : "";
      const useSell = !!this._config?.use_sell_entity;
      const sellEntityId = useSell ? egsSafeText(this._config?.sell_entity || "") : "";
      const entityKey = `${primaryEntityId}||${tomorrowEntityId}||${sellEntityId}`;

      if (!primaryEntityId) {
        this._render();
        return;
      }

      const st = hass?.states?.[primaryEntityId] || null;
      const stTomorrow = tomorrowEntityId ? hass?.states?.[tomorrowEntityId] || null : null;
      const stSell = sellEntityId ? hass?.states?.[sellEntityId] || null : null;

      const keyToday = st
        ? `${egsSafeText(st.state)}|${egsSafeText(st.last_updated)}|${egsSafeText(st.last_changed)}`
        : "__missing__";
      const keyTomorrow = tomorrowEntityId
        ? (stTomorrow
            ? `${egsSafeText(stTomorrow.state)}|${egsSafeText(stTomorrow.last_updated)}|${egsSafeText(
                stTomorrow.last_changed
              )}`
            : "__missing__")
        : "__none__";
      const keySell = sellEntityId
        ? (stSell
            ? `${egsSafeText(stSell.state)}|${egsSafeText(stSell.last_updated)}|${egsSafeText(stSell.last_changed)}`
            : "__missing__")
        : "__none__";
      const key = `${keyToday}||${keyTomorrow}||${keySell}`;

      if (this._lastEntityId !== entityKey) {
        this._lastEntityId = entityKey;
        this._lastEntityRenderKey = key;
        this._requestSectionsLoad(primaryEntityId);
        this._render();
        return;
      }

      if (this._lastEntityRenderKey !== key) {
        this._lastEntityRenderKey = key;
        this._render();
      }

      // Keep subscription alive even when only hass ticks.
      this._ensureSyncSubscription(primaryEntityId);
      this._ensureSyncPolling(primaryEntityId);

      this._ensureSettingsSubscription(primaryEntityId);
      this._ensureSettingsPolling(primaryEntityId);
    } catch {
      this._render();
    }
  }

  getCardSize() {
    return 3;
  }

  connectedCallback() {
    // Ensure sections are loaded at least once.
    try {
      const ent = this._config?.entity;
      if (ent) this._requestSectionsLoad(ent);
    } catch {
      // ignore
    }
    this._startNowFollowTimer();
    this._render();
  }

  _openSettings() {
    this._settingsOpen = true;
    this._render();
  }

  _closeSettings() {
    this._settingsOpen = false;
    this._render();
  }

  _addSection(entityId, name, hours) {
    const nm = egsSafeText(name).trim();
    const h = egsClamp(Number(hours) || 0, 1, 24);
    if (!nm) return;
    const next = [...(this._sections || [])];
    next.push({ name: nm, hours: h });
    this._sections = egsNormalizeSections(next);
    this._persistSections(entityId, this._sections);
    this._render();
  }

  _removeSection(entityId, idx) {
    const next = [...(this._sections || [])].filter((_, i) => i !== idx);
    this._sections = egsNormalizeSections(next);
    this._persistSections(entityId, this._sections);
    this._render();
  }

  _render() {
    if (!this.shadowRoot) return;

    // Preserve external style hooks (e.g. card-mod/theme attrs) across re-renders.
    // Frequent re-renders recreate <ha-card>; without this, some themes can briefly
    // revert to default opaque background.
    const preservedHaCardAttrs = [];
    try {
      const prevCard = this.shadowRoot.querySelector("ha-card");
      if (prevCard?.attributes?.length) {
        for (const attr of Array.from(prevCard.attributes)) {
          const name = egsSafeText(attr?.name || "").toLowerCase();
          if (name === "style" || name === "class" || name.includes("card-mod")) {
            preservedHaCardAttrs.push({ name: attr.name, value: attr.value });
          }
        }
      }
    } catch {
      // ignore
    }

    // Preserve horizontal scroll position across frequent re-renders.
    try {
      const prevGraph = this.shadowRoot.querySelector(".graph");
      if (prevGraph) {
        const maxPrev = Math.max(0, (prevGraph.scrollWidth || 0) - (prevGraph.clientWidth || 0));
        const left = prevGraph.scrollLeft || 0;
        this._graphScrollLeft = left;
        this._graphScrollRatio = maxPrev > 0 ? left / maxPrev : null;
      }
    } catch {
      // ignore
    }

    const hass = this._hass;
    const config = this._config || { title: "Energy Graph Scheduler", entity: "" };
    const displayMode = ['all', 'graph_minmax', 'graph_only'].includes(config.display_mode)
      ? config.display_mode
      : 'all';
    const showStats = displayMode === 'all' || displayMode === 'graph_minmax';
    const showNowStat = displayMode === 'all';
    const showSections = displayMode === 'all';

    const lang = egsGetUiLang(config, hass);
    const t = (key, vars) => egsFormatTemplate(egsLocalize(key, config.language || hass), vars);

    // Used only to adapt label density for small cards (does not affect layout sizing).
    let hostW = 0;
    try {
      hostW = Math.round(this.getBoundingClientRect()?.width || 0);
    } catch {
      hostW = 0;
    }

    const entityId = egsSafeText(config.entity);
    const useTomorrowEntity = !!config.use_tomorrow_entity;
    const tomorrowEntityId = useTomorrowEntity ? egsSafeText(config.tomorrow_entity) : "";
    const useSellEntity = !!config.use_sell_entity;
    const sellEntityId = useSellEntity ? egsSafeText(config.sell_entity) : "";
    const stateObj = entityId ? hass?.states?.[entityId] : null;
    const tomorrowStateObj = tomorrowEntityId ? hass?.states?.[tomorrowEntityId] : null;
    const sellStateObj = sellEntityId ? hass?.states?.[sellEntityId] : null;

    const rawTitle = egsSafeText(config.title || "");
    const titleDefaultCandidates = (() => {
      try {
        const set = new Set();
        for (const k of Object.keys(EGS_I18N || {})) {
          const v = EGS_I18N[k] && EGS_I18N[k]['card.title_default'];
          if (v) set.add(String(v).trim());
        }
        return set;
      } catch {
        return new Set();
      }
    })();
    const title = !rawTitle || titleDefaultCandidates.has(String(rawTitle).trim())
      ? egsSafeText(egsLocalize('card.title_default', config.language || hass))
      : rawTitle;

    const unit = stateObj?.attributes?.unit_of_measurement || "";
    const sellUnit = sellStateObj?.attributes?.unit_of_measurement || unit;

    // Scrollable chart: width is derived from how many hours we can show.
    const height = 160; // SVG coordinate height
    // Extra top padding so we can show hour labels + (when multi-day) date labels.
    const pad = { left: 10, right: 10, top: 44, bottom: 18 };

    let bodyHtml = "";

    if (!entityId) {
      bodyHtml = `<div class="hint">${egsSafeText(t('hint.select_entity'))}</div>`;
    } else if (!stateObj) {
      bodyHtml = `<div class="hint">${egsSafeText(t('hint.entity_not_found'))}: <span class="mono">${entityId}</span></div>`;
    } else {
      let points = [];
      let sellPoints = [];
      if (useTomorrowEntity && tomorrowEntityId) {
        const todayPoints = egsExtractSeries(stateObj, 'today')?.points || [];
        const tomPoints = tomorrowStateObj ? egsExtractSeries(tomorrowStateObj, 'tomorrow')?.points || [] : [];
        points = [...todayPoints, ...tomPoints];
      } else {
        points = egsExtractSeries(stateObj)?.points || [];
      }

      if (useSellEntity && sellEntityId && sellStateObj) {
        sellPoints = egsExtractSeries(sellStateObj)?.points || [];
      }

      if (!points.length) {
        bodyHtml = `<div class="hint">${egsSafeText(t('hint.no_price_data'))}: <span class="mono">${entityId}</span></div>`;
      } else {
        const nowTs = Date.now();
        const intervalM = this._intervalMinutes === 15 ? 15 : 60;
        const timeline = egsBuildTimeline(points, nowTs, intervalM);
        const sellTimeline = sellPoints.length ? egsBuildTimeline(sellPoints, nowTs, intervalM) : [];
        const sellHasTs = sellTimeline.some((p) => p && p.ts != null);
        const sellByTs = new Map();
        if (sellHasTs) {
          for (const p of sellTimeline) {
            if (!p || p.ts == null || !Number.isFinite(p.value)) continue;
            sellByTs.set(egsStartOfLocalInterval(p.ts, intervalM), p.value);
          }
        }
        const sellValues = timeline.map((p, i) => {
          if (sellHasTs && p?.ts != null) {
            const v = sellByTs.get(egsStartOfLocalInterval(p.ts, intervalM));
            return Number.isFinite(v) ? v : null;
          }
          const v = sellTimeline?.[i]?.value;
          return Number.isFinite(v) ? v : null;
        });
        const hasSellOverlay = !!(useSellEntity && sellEntityId && sellValues.some((v) => Number.isFinite(v)));
        const hourValues = timeline.map((p) => (Number.isFinite(p.value) ? p.value : null));

        // Only consider hours from "now" and forward when suggesting cheapest times.
        let futureStartIdx = 0;
        try {
          const hasTs = timeline?.some?.((p) => p && p.ts != null);
          if (hasTs) {
            const nowSlot = egsStartOfLocalInterval(nowTs, intervalM);
            const idx = timeline.findIndex((p) => p && p.ts != null && p.ts >= nowSlot);
            futureStartIdx = idx >= 0 ? idx : timeline.length;
          }
        } catch {
          futureStartIdx = 0;
        }

        const baseStepPx = 34;

        const nSteps = Math.max(1, timeline.length);
        const minWidth = pad.left + pad.right + nSteps * baseStepPx;

        // Fill the available card width when possible, so the timeline appears centered.
        // Use a tiny negative fudge to avoid a 1px scrollbar due to rounding.
        // Extra safety pixels to avoid a 1–2px overflow caused by subpixel rounding
        // in HA's card/layout wrappers.
        const availableW = hostW > 0 ? Math.max(0, Math.floor(hostW - 24) - 6) : 0; // .wrap has 12px left/right padding
        const width = Math.max(minWidth, availableW);
        const bars = egsComputeBars(timeline, width, height, pad, hasSellOverlay ? sellValues : null);
        if (!bars) {
          bodyHtml = `<div class="hint">${egsSafeText(t('hint.cannot_build_graph'))}</div>`;
        } else {
          const nowIndex = egsNearestIndexByTime(bars.pts, nowTs);
          const nowPoint = nowIndex != null ? bars.pts[nowIndex] : null;

          const minTxt = Number.isFinite(bars.min) ? bars.min.toFixed(3) : "";
          const maxTxt = Number.isFinite(bars.max) ? bars.max.toFixed(3) : "";
          const nowTxt = nowPoint && Number.isFinite(nowPoint.value) ? nowPoint.value.toFixed(3) : "";

          // Grid lines
          const gridLines = [];
          for (let i = 0; i <= 3; i++) {
            const y = pad.top + (i / 3) * (height - pad.top - pad.bottom);
            gridLines.push(`<line x1="${pad.left}" y1="${y.toFixed(2)}" x2="${(width - pad.right).toFixed(
              2
            )}" y2="${y.toFixed(2)}" class="grid" />`);
          }

          const baseline = `<line x1="${pad.left}" y1="${bars.baselineY.toFixed(2)}" x2="${(width - pad.right).toFixed(
            2
          )}" y2="${bars.baselineY.toFixed(2)}" class="baseline" />`;

          const dayLabels = bars.pts
            .map((p) => {
              if (p.ts == null) return "";
              const d = new Date(p.ts);
              const isMidnight = d.getHours() === 0;
              if (!isMidnight) return "";
              const x = p.xCenter;
              // Date row sits above the repeating 00–23 hour labels.
              const yDate = 14;
              const ySepTop = 22;
              return `
                <line x1="${x.toFixed(2)}" y1="${ySepTop.toFixed(2)}" x2="${x.toFixed(
                2
              )}" y2="${(height - pad.bottom).toFixed(2)}" class="daysep" />
                <text x="${x.toFixed(2)}" y="${yDate.toFixed(
                2
              )}" text-anchor="middle" class="daylab">${egsSafeText(egsFormatDateByLang(d, lang))}</text>
              `;
            })
            .join("");

          const hourLabels = bars.pts
            .map((p, i) => {
              const d = p.ts != null ? new Date(p.ts) : null;
              if (d) {
                // Reduce label noise in 15-min mode: label only on full hours.
                if (intervalM !== 60 && d.getMinutes() !== 0) return "";
                const hh = `${d.getHours()}`.padStart(2, "0");
                return `<text x="${p.xCenter.toFixed(2)}" y="${(pad.top - 8).toFixed(
                  2
                )}" text-anchor="middle" class="xlab">${hh}</text>`;
              }
              const hh = `${Math.floor(i / Math.max(1, Math.round(60 / intervalM))) % 24}`.padStart(2, "0");
              return `<text x="${p.xCenter.toFixed(2)}" y="${(pad.top - 8).toFixed(
                2
              )}" text-anchor="middle" class="xlab">${hh}</text>`;
            })
            .join("");

          const tiers = egsComputeTiers(bars.pts.map((p) => p.value));

          const secsForSel = Array.isArray(this._sections) ? this._sections : [];
          const selIdxRaw = this._selectedSectionIdx;
          const selIdx = Number.isFinite(selIdxRaw) ? selIdxRaw : null;
          const selectedSection =
            selIdx != null && selIdx >= 0 && selIdx < secsForSel.length ? secsForSel[selIdx] : null;
          const selectedWindow = selectedSection
            ? egsFindCheapestWindowFrom(hourValues, selectedSection.hours, futureStartIdx, intervalM)
            : null;

          const marks = (() => {
            if (!selectedWindow) return "";
            const start = egsClamp(Number(selectedWindow?.start) || 0, 0, bars.pts.length - 1);
            const steps = egsClamp(Number(selectedWindow?.steps) || 0, 1, bars.pts.length);
            const end = egsClamp(start + steps, 1, bars.pts.length);
            const p0 = bars.pts[start];
            const p1 = bars.pts[end - 1];
            if (!p0 || !p1) return "";

            const x0 = p0.x;
            const x1 = p1.x + p1.w;
            const y0 = pad.top + 4;
            const y1 = bars.baselineY + 6;
            const w = Math.max(0, x1 - x0);
            const h = Math.max(0, y1 - y0);
            const rx = 10;
            const labelX = x0 + w / 2;
            const labelY = Math.min(y0 + h - 10, y0 + 18);
            return `
              <g class="mark" pointer-events="none">
                <rect class="mark-box" x="${x0.toFixed(2)}" y="${y0.toFixed(
              2
            )}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="${rx}" ry="${rx}" />
                <text class="mark-label" x="${labelX.toFixed(2)}" y="${labelY.toFixed(
              2
            )}" text-anchor="middle">${egsSafeText(selectedSection?.name || "")}</text>
              </g>
            `;
          })();

          const nowMarker = (() => {
            if (!nowPoint) return "";
            const x = nowPoint.xCenter;
            const yTop = pad.top + 2;
            const yBottom = bars.baselineY + 8;
            const valTxt = Number.isFinite(nowPoint.value) ? nowPoint.value.toFixed(3) : "";
            const label = Number.isFinite(nowPoint.value)
              ? t('label.now_value', { value: egsSafeText(valTxt), unit: egsSafeText(unit) })
              : t('label.now_no_data');
            const lx = egsClamp(x, pad.left + 70, width - pad.right - 70);
            const ly = yTop + 14;
            return `
              <g class="nowmark" pointer-events="none">
                <line x1="${x.toFixed(2)}" y1="${yTop.toFixed(2)}" x2="${x.toFixed(
              2
            )}" y2="${yBottom.toFixed(2)}" class="nowline" />
                <g transform="translate(${lx.toFixed(2)}, ${ly.toFixed(2)})">
                  <rect x="-70" y="-14" width="140" height="20" rx="10" ry="10" class="nowpill" />
                  <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" class="nowtext">${egsSafeText(
                    label
                  )}</text>
                </g>
              </g>
            `;
          })();

          const innerH = Math.max(1, height - pad.top - pad.bottom);
          const scaleRange = Math.max(0.0000001, bars.max - bars.min);
          const toYByScale = (v) => pad.top + (1 - (v - bars.min) / scaleRange) * innerH;
          const buyLabel = egsSafeText(t('label.buy'));
          const sellLabel = egsSafeText(t('label.sell'));

          const rects = bars.pts
            .map((p, i) => {
              const isNow = nowIndex != null && i === nowIndex;
              const inSel =
                selectedWindow &&
                Number.isFinite(selectedWindow.start) &&
                Number.isFinite(selectedWindow.steps) &&
                i >= selectedWindow.start &&
                i < selectedWindow.start + selectedWindow.steps;

              const splitGap = hasSellOverlay ? 2 : 0;
              const buyW = hasSellOverlay ? Math.max(1, (p.w - splitGap) / 2) : p.w;
              const sellW = hasSellOverlay ? buyW : 0;
              const buyX = p.x;
              const sellX = hasSellOverlay ? p.x + p.w - sellW : p.x;

              const tier = egsTierClass(p.value, tiers);
              const buyCls = `bar ${tier}${isNow ? " bar-now" : ""}${inSel ? " bar-mark" : ""}`;
              const buyR = Math.min(6, Math.max(0, buyW / 2 - 1), Math.max(0, p.h / 2));
              const buyValTxt = Number.isFinite(p.value) ? p.value.toFixed(3) : "";
              const tsAttr = p.ts != null ? ` data-ts="${Number(p.ts)}"` : "";

              const buyRect = `<rect x="${buyX.toFixed(2)}" y="${p.y.toFixed(2)}" width="${buyW.toFixed(2)}" height="${p.h.toFixed(
                2
              )}" rx="${buyR.toFixed(2)}" ry="${buyR.toFixed(2)}" class="${buyCls}" data-idx="${i}" data-series="buy" data-series-label="${egsSafeText(
                buyLabel
              )}" data-unit="${egsSafeText(unit)}" data-val="${buyValTxt}"${tsAttr} />`;

              if (!hasSellOverlay) return buyRect;

              const sellVal = sellValues[i];
              const sellYVal = toYByScale(sellVal ?? 0);
              const sellTop = Math.min(sellYVal, bars.baselineY);
              const sellBottom = Math.max(sellYVal, bars.baselineY);
              const sellH = sellVal == null ? 0 : Math.max(0, sellBottom - sellTop);
              const sellR = Math.min(6, Math.max(0, sellW / 2 - 1), Math.max(0, sellH / 2));
              const sellValTxt = Number.isFinite(sellVal) ? sellVal.toFixed(3) : "";
              const sellCls = `bar bar-sell${isNow ? " bar-now" : ""}${inSel ? " bar-mark" : ""}${
                sellVal == null ? " bar-missing" : ""
              }`;
              const sellRect = `<rect x="${sellX.toFixed(2)}" y="${sellTop.toFixed(2)}" width="${sellW.toFixed(
                2
              )}" height="${sellH.toFixed(2)}" rx="${sellR.toFixed(2)}" ry="${sellR.toFixed(
                2
              )}" class="${sellCls}" data-idx="${i}" data-series="sell" data-series-label="${egsSafeText(
                sellLabel
              )}" data-unit="${egsSafeText(sellUnit)}" data-val="${sellValTxt}"${tsAttr} />`;
              return buyRect + sellRect;
            })
            .join("");

          const nowXAttr = nowPoint ? `${Number(nowPoint.xCenter).toFixed(2)}` : "";

          bodyHtml = `
            ${showStats ? `
            <div class="meta">
              <div class="stats">
                <span>${egsSafeText(t('stats.min'))}: <b>${minTxt}</b> ${egsSafeText(unit)}</span>
                ${showNowStat ? `<span>${egsSafeText(t('stats.now'))}: <b>${nowTxt}</b> ${egsSafeText(unit)}</span>` : ''}
                <span>${egsSafeText(t('stats.max'))}: <b>${maxTxt}</b> ${egsSafeText(unit)}</span>
              </div>
            </div>
            ` : ''}
            <div class="graph">
              <div class="tooltip" hidden></div>
              <svg data-now-x="${nowXAttr}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Price graph" style="width:${width}px; height:160px;">
                <defs>
                  <linearGradient id="egsFillLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--success-color)" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="var(--success-color)" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="egsFillMid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--warning-color)" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="var(--warning-color)" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="egsFillHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--error-color)" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="var(--error-color)" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="egsFillSell" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.92" />
                    <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.32" />
                  </linearGradient>
                </defs>
                ${dayLabels}
                ${hourLabels}
                ${gridLines.join("")}
                ${baseline}
                ${rects}
                ${marks}
                ${nowMarker}
              </svg>
            </div>
            ${showSections ? (() => {
              const secs = Array.isArray(this._sections) ? this._sections : [];
              if (!secs.length) return "";
              const items = secs
                .map((s, si) => {
                  const best = egsFindCheapestWindowFrom(hourValues, s.hours, futureStartIdx, intervalM);
                  const active = this._selectedSectionIdx === si;
                  if (!best) {
                    return `<div class="sec-card${active ? " active" : ""}" data-sec-idx="${si}"><div class="sec-name">${egsSafeText(
                      s.name
                    )}</div><div class="sec-when muted">${egsSafeText(t('label.no_data'))}</div></div>`;
                  }
                  const startTs = timeline?.[best.start]?.ts ?? null;
                  const txt =
                    startTs != null
                      ? egsFormatRangeByTs(startTs, best.hours, nowTs, lang)
                      : egsFormatHourRange(best.start % 24, best.hours);
                  return `<div class="sec-card${active ? " active" : ""}" data-sec-idx="${si}"><div class="sec-name">${egsSafeText(
                    s.name
                  )}</div><div class="sec-when">${egsSafeText(txt)}</div></div>`;
                })
                .join("");
              return `<div class="sections"><div class="sec-title">${egsSafeText(t('sections.title'))}</div><div class="sec-grid">${items}</div></div>`;
            })() : ''}
          `;
        }
      }
    }

    const css = `
      /*
        Important: Home Assistant layouts often use flex. Flex items default to
        min-width:auto, which can make the card expand to the SVG's width.
        Setting min-width:0 allows the card to shrink and makes the internal
        .graph scroller (and its scrollbar) work reliably.
      */
      :host{
        display:block;
        box-sizing:border-box;
        width:100%;
        min-width:0;
        justify-self: stretch;
        align-self: stretch;
        /* Prevent layout-card grid from sizing the column to SVG max-content width */
        max-width: min(100%, 100vw);
        flex: 1 1 0;
      }
      ha-card{ overflow:hidden; box-sizing:border-box; width:100%; min-width:0; max-width:100%; }
      .wrap{ padding: 12px; min-width:0; }
      .hdr{ display:flex; align-items:center; justify-content:space-between; gap:10px; padding: 12px 12px 0 12px; }
      .hdr-title{ color: var(--primary-text-color); font-size: 20px; font-weight: 600; line-height: 1.2; }
      .hdr-btn{ appearance:none; border: 1px solid var(--divider-color); background: transparent; color: var(--primary-text-color); border-radius: 10px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
      .hdr-btn:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
      .hdr-btn:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .hint{ color: var(--secondary-text-color); padding: 10px 2px; }
      .mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .meta{ display:flex; flex-direction:column; gap:6px; margin-bottom: 8px; }
      .name{ color: var(--primary-text-color); font-weight: 600; line-height: 1.2; }
      .stats{ display:flex; gap: 14px; flex-wrap: wrap; color: var(--secondary-text-color); font-size: 12px; }
      .stats b{ color: var(--primary-text-color); font-weight: 600; }
      .graph{
        display:block;
        width:100%;
        max-width:100%;
        min-width:0;
        position:relative;
        overflow-x:auto;
        overflow-y:hidden;
        -webkit-overflow-scrolling: touch;
        /*
          Key fix for layout-card grid: prevent this scroll area’s contents
          (the wide SVG) from affecting the card’s intrinsic width.
        */
        height:160px;
        contain: size layout paint;
      }
      /* Fixed height keeps labels readable on small cards */
      .graph svg{ height:160px; display:block; }
      .grid{ stroke: var(--divider-color); stroke-width: 1; opacity: 0.35; }
      .baseline{ stroke: var(--divider-color); stroke-width: 1; opacity: 0.55; }
      .daysep{ stroke: var(--divider-color); stroke-width: 1; opacity: 0.8; stroke-dasharray: 2 4; }
      .daylab{ fill: var(--secondary-text-color); font-size: 11px; font-weight: 700; opacity: 0.9; user-select:none; }
      .bar{ opacity: 0.78; cursor: default; }
      .bar-mark{ opacity: 1; }
      .bar-low{ fill: url(#egsFillLow); }
      .bar-mid{ fill: url(#egsFillMid); }
      .bar-high{ fill: url(#egsFillHigh); }
      .bar-sell{ fill: url(#egsFillSell); }
      .bar-now{ opacity: 1; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25)); }
      .bar-missing{ opacity: 0; pointer-events:none; }
      .xlab{ fill: var(--secondary-text-color); font-size: 11px; opacity: 0.8; user-select:none; }

      .mark-box{ fill: color-mix(in oklab, var(--primary-color) 10%, transparent); stroke: var(--primary-color); stroke-width: 2; vector-effect: non-scaling-stroke; }
      .mark-label{ fill: var(--primary-text-color); font-size: 12px; font-weight: 800; opacity: 0.95; user-select:none; paint-order: stroke; stroke: var(--card-background-color); stroke-width: 4; }

      .nowline{ stroke: var(--primary-color); stroke-width: 2; opacity: 0.9; vector-effect: non-scaling-stroke; }
      .nowpill{ fill: color-mix(in oklab, var(--card-background-color) 86%, black); stroke: var(--divider-color); stroke-width: 1; vector-effect: non-scaling-stroke; }
      .nowtext{ fill: var(--primary-text-color); font-size: 11px; font-weight: 800; paint-order: stroke; stroke: var(--card-background-color); stroke-width: 4; }

      .tooltip{ position:absolute; z-index: 5; pointer-events:none; background: color-mix(in oklab, var(--card-background-color) 88%, black); border: 1px solid var(--divider-color); border-radius: 10px; padding: 8px 10px; box-shadow: 0 10px 22px rgba(0,0,0,0.35); }
      .tooltip .t-time{ color: var(--secondary-text-color); font-size: 11px; line-height: 1.1; margin-bottom: 4px; }
      .tooltip .t-series{ color: var(--secondary-text-color); font-size: 11px; font-weight: 700; margin-right: 6px; }
      .tooltip .t-val{ color: var(--primary-text-color); font-weight: 700; font-size: 13px; line-height: 1.2; white-space: nowrap; }
      .tooltip .t-unit{ color: var(--secondary-text-color); font-weight: 600; margin-left: 4px; }

      .sections{ margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--divider-color); }
      .sec-title{ color: var(--secondary-text-color); font-size: 12px; margin-bottom: 8px; }
      .sec-grid{ display:flex; flex-wrap:wrap; gap: 10px; }
      .sec-card{ border: 1px solid var(--divider-color); border-radius: 12px; padding: 10px 5px; min-width: 140px; max-width: 240px; flex: 0 1 auto; cursor: pointer; user-select:none; }
      .sec-card:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
      .sec-card.active{ border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .sec-name{ color: var(--primary-text-color); font-weight: 700; font-size: 13px; line-height: 1.1; margin-bottom: 6px; }
      .sec-when{ color: var(--primary-text-color); font-size: 13px; }
      .muted{ color: var(--secondary-text-color); }

      .modal-backdrop{ position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 50; display:flex; align-items:center; justify-content:center; padding: 16px; }
      .modal{ width: min(520px, 100%); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); }
      .modal-hdr{ display:flex; align-items:center; justify-content:space-between; padding: 12px 14px; border-bottom: 1px solid var(--divider-color); }
      .modal-title{ color: var(--primary-text-color); font-weight: 700; }
      .iconbtn{ appearance:none; border: none; background: transparent; color: var(--primary-text-color); font-size: 18px; cursor:pointer; padding: 6px 8px; border-radius: 10px; }
      .iconbtn:hover{ background: color-mix(in oklab, var(--primary-text-color) 7%, transparent); }
      .modal-body{ padding: 12px 14px 14px; display:flex; flex-direction:column; gap: 12px; }
      .formrow{ display:flex; gap: 10px; }
      .field{ display:flex; flex-direction:column; gap: 6px; flex: 1; }
      .lab{ color: var(--secondary-text-color); font-size: 12px; }
      .inp{ width:100%; height:36px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:10px; padding:6px 10px; background: var(--card-background-color); color: var(--primary-text-color); }
      .inp:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .btn{ appearance:none; border: 1px solid var(--divider-color); background: transparent; color: var(--primary-text-color); border-radius: 10px; padding: 8px 10px; cursor:pointer; }
      .btn:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
      .list{ display:flex; flex-direction:column; gap: 8px; }
      .item{ display:flex; align-items:center; justify-content:space-between; gap: 10px; border:1px solid var(--divider-color); border-radius: 12px; padding: 10px; }
      .item strong{ color: var(--primary-text-color); }
      .item span{ color: var(--secondary-text-color); font-size: 12px; }
      .checkrow{ display:flex; align-items:center; gap: 10px; padding: 8px 10px; border: 1px solid var(--divider-color); border-radius: 12px; }
      .checkrow input{ width: 18px; height: 18px; }
    `;

    const modalHtml = (() => {
      if (!this._settingsOpen) return "";
      const secs = Array.isArray(this._sections) ? this._sections : [];
      const list = secs
        .map(
          (s, i) =>
            `<div class="item"><div><strong>${egsSafeText(s.name)}</strong><div><span>${egsSafeText(
              t('settings.item_hours', { hours: egsClamp(s.hours, 1, 24) })
            )}</span></div></div><button class="btn" data-act="remove" data-idx="${i}">${egsSafeText(
              t('settings.remove')
            )}</button></div>`
        )
        .join("");
      return `
        <div class="modal-backdrop" data-act="close">
          <div class="modal" role="dialog" aria-label="Settings">
            <div class="modal-hdr">
              <div class="modal-title">${egsSafeText(t('settings.title'))}</div>
              <button class="iconbtn" data-act="close" aria-label="${egsSafeText(t('settings.close'))}">✕</button>
            </div>
            <div class="modal-body">
              <div>
                <div class="lab">${egsSafeText(t('settings.interval'))}</div>
                <label class="checkrow">
                  <input type="checkbox" data-field="quarter" ${this._intervalMinutes === 15 ? 'checked' : ''} />
                  <span>${egsSafeText(t('settings.quarter_hours'))}</span>
                </label>
              </div>
              <div>
                <div class="lab">${egsSafeText(t('settings.add_section'))}</div>
                <div class="formrow">
                  <div class="field">
                    <div class="lab">${egsSafeText(t('settings.name'))}</div>
                    <input class="inp" data-field="name" placeholder="Opvasker" />
                  </div>
                  <div class="field" style="max-width:160px">
                    <div class="lab">${egsSafeText(t('settings.hours'))}</div>
                    <input class="inp" data-field="hours" type="number" min="1" max="24" step="1" value="3" />
                  </div>
                  <div class="field" style="max-width:140px; align-self:flex-end">
                    <button class="btn" data-act="add">${egsSafeText(t('settings.add'))}</button>
                  </div>
                </div>
              </div>
              <div>
                <div class="lab">${egsSafeText(t('settings.sections'))}</div>
                <div class="list">${list || `<div class="muted">${egsSafeText(t('settings.no_sections'))}</div>`}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    })();

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <ha-card>
        <div class="hdr">
          <div class="hdr-title">${title}</div>
          <button class="hdr-btn" data-act="open-settings">${egsSafeText(t('settings.open'))}</button>
        </div>
        <div class="wrap">${bodyHtml}</div>
      </ha-card>
      ${modalHtml}
    `;

    // Re-apply preserved attrs after DOM replacement.
    try {
      const nextCard = this.shadowRoot.querySelector("ha-card");
      if (nextCard && preservedHaCardAttrs.length) {
        for (const attr of preservedHaCardAttrs) {
          if (!attr?.name) continue;
          if (attr.value == null || attr.value === "") {
            nextCard.setAttribute(attr.name, "");
          } else {
            nextCard.setAttribute(attr.name, attr.value);
          }
        }
      }
    } catch {
      // ignore
    }

    // Restore scroll position and keep tracking it.
    try {
      const graph = this.shadowRoot.querySelector(".graph");
      if (graph) {
        const restore = () => {
          try {
            const max = Math.max(0, (graph.scrollWidth || 0) - (graph.clientWidth || 0));
            // When the graph is scrollable (small card), always follow "now".
            // When it's not scrollable, the scroll position is irrelevant.
            const followed = egsScrollGraphToNow(graph);
            if (!followed) {
              const desired =
                this._graphScrollRatio != null && Number.isFinite(this._graphScrollRatio)
                  ? this._graphScrollRatio * max
                  : this._graphScrollLeft || 0;
              graph.scrollLeft = egsClamp(desired, 0, max);
            }
          } catch {
            // ignore
          }
        };

        // Restore after layout so scrollWidth/clientWidth are correct.
        requestAnimationFrame(() => {
          restore();
          requestAnimationFrame(restore);
        });

        graph.onscroll = () => {
          try {
            this._graphScrollLeft = graph.scrollLeft || 0;
            const max = Math.max(0, (graph.scrollWidth || 0) - (graph.clientWidth || 0));
            this._graphScrollRatio = max > 0 ? (graph.scrollLeft || 0) / max : null;
          } catch {
            // ignore
          }
        };

        // If layout changes (dashboard resize, mobile rotation), re-follow now.
        try {
          const onResize = () => {
            // Only do anything when scrollable.
            egsScrollGraphToNow(graph);
          };
          if (!this._egsResizeObserver) {
            this._egsResizeObserver = new ResizeObserver(() => onResize());
          }
          this._egsResizeObserver.disconnect();
          this._egsResizeObserver.observe(graph);
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }

    // Tooltip for bars (custom, theme-friendly)
    try {
      const graph = this.shadowRoot.querySelector(".graph");
      const svg = graph?.querySelector("svg");
      const tip = graph?.querySelector(".tooltip");
      if (graph && svg && tip) {
        const setTip = (clientX, clientY, idx, valStr, tsStr, seriesLabel, valueUnit) => {
          const i = Math.max(0, Number(idx) || 0);
          const hasVal = !!valStr;
          const ts = tsStr != null && tsStr !== "" ? Number(tsStr) : null;
          const seriesTxt = egsSafeText(seriesLabel || "");
          const unitTxt = egsSafeText(valueUnit || unit);
          const time =
            Number.isFinite(ts) && ts != null
              ? egsFormatRangeByTs(ts, 1, Date.now(), lang)
              : egsFormatHourRange(i % 24, 1);
          tip.innerHTML = hasVal
            ? `<div class="t-time">${egsSafeText(time)}</div><div class="t-val">${
                seriesTxt ? `<span class="t-series">${seriesTxt}</span>` : ""
              }${egsSafeText(valStr)}<span class="t-unit">${unitTxt}</span></div>`
            : `<div class="t-time">${egsSafeText(time)}</div><div class="t-val muted">${egsSafeText(t('label.no_data'))}</div>`;

          const r = graph.getBoundingClientRect();
          const x = clientX - r.left;
          const y = clientY - r.top;

          // Clamp in *visible viewport* coords
          const cx = egsClamp(x, 12, r.width - 12);
          const cy = egsClamp(y, 12, r.height - 12);

          // Convert to *scroll content* coords (tooltip is inside the scroller!)
          const sx = (graph.scrollLeft || 0);
          const sy = (graph.scrollTop || 0);

          tip.style.left = `${cx + sx}px`;
          tip.style.top = `${cy + sy}px`;
          
          tip.style.transform = cy < 42 ? "translate(-50%, 16px)" : "translate(-50%, -120%)";
          tip.hidden = false;
        };

        const hideTip = () => {
          tip.hidden = true;
        };

        // Bind to bars directly so the tooltip doesn't flicker when the pointer
        // briefly hits the SVG background/labels.
        const bars = svg.querySelectorAll('rect[data-idx]');
        bars.forEach((bar) => {
          bar.onpointerenter = (ev) => {
            const idx = bar.getAttribute("data-idx");
            const valStr = bar.getAttribute("data-val") || "";
            const tsStr = bar.getAttribute("data-ts") || "";
            const seriesLabel = bar.getAttribute("data-series-label") || "";
            const valueUnit = bar.getAttribute("data-unit") || unit;
            setTip(ev.clientX, ev.clientY, idx, valStr, tsStr, seriesLabel, valueUnit);
          };
          bar.onpointermove = (ev) => {
            const idx = bar.getAttribute("data-idx");
            const valStr = bar.getAttribute("data-val") || "";
            const tsStr = bar.getAttribute("data-ts") || "";
            const seriesLabel = bar.getAttribute("data-series-label") || "";
            const valueUnit = bar.getAttribute("data-unit") || unit;
            setTip(ev.clientX, ev.clientY, idx, valStr, tsStr, seriesLabel, valueUnit);
          };
          bar.onpointerleave = hideTip;
          bar.onpointerdown = hideTip;
        });

        svg.onpointerleave = hideTip;
      }
    } catch {
      // ignore
    }

    // Click a section tile to highlight its cheapest window on the chart.
    try {
      this.shadowRoot.querySelectorAll('[data-sec-idx]').forEach((el) => {
        el.onclick = () => {
          const idx = Number(el.getAttribute('data-sec-idx'));
          if (!Number.isFinite(idx)) return;
          this._selectedSectionIdx = this._selectedSectionIdx === idx ? null : idx;
          this._render();
        };
      });
    } catch {
      // ignore
    }

    const openBtn = this.shadowRoot.querySelector('[data-act="open-settings"]');
    if (openBtn) {
      openBtn.onclick = () => this._openSettings();
    }

    // Modal event wiring (best-effort)
    if (this._settingsOpen) {
      const root = this.shadowRoot;

      // Interval resolution toggle (local per-entity setting)
      try {
        const cb = root.querySelector('[data-field="quarter"]');
        if (cb) {
          cb.onchange = () => {
            const enabled = !!cb.checked;
            this._intervalMinutes = enabled ? 15 : 60;
            try {
              if (entityId) egsSaveSettings(entityId, { interval_minutes: this._intervalMinutes });
            } catch {
              // ignore
            }

            // If sync is enabled, persist to backend so other users/cards follow.
            try {
              if (entityId && egsSyncEnabled(this._config) && this._hass) {
                egsWsSend(this._hass, {
                  type: `${EGS_SYNC_DOMAIN}/set_settings`,
                  entity_id: entityId,
                  settings: { interval_minutes: this._intervalMinutes },
                }).catch(() => {});
              }
            } catch {
              // ignore
            }

            this._startNowFollowTimer();
            this._render();
          };
        }
      } catch {
        // ignore
      }

      root.querySelectorAll('[data-act="close"]').forEach((el) => {
        el.onclick = (ev) => {
          // If backdrop clicked, only close when clicking outside dialog.
          const act = ev?.currentTarget?.getAttribute?.('data-act');
          if (act === 'close') {
            if (ev?.currentTarget?.classList?.contains('modal-backdrop') && ev?.target !== ev?.currentTarget) return;
          }
          this._closeSettings();
        };
      });

      const addBtn = root.querySelector('[data-act="add"]');
      if (addBtn) {
        addBtn.onclick = () => {
          const nameEl = root.querySelector('[data-field="name"]');
          const hoursEl = root.querySelector('[data-field="hours"]');
          const nm = nameEl ? nameEl.value : '';
          const hrs = hoursEl ? hoursEl.value : '3';
          this._addSection(entityId, nm, hrs);
        };
      }

      root.querySelectorAll('[data-act="remove"]').forEach((btn) => {
        btn.onclick = () => {
          const idx = Number(btn.getAttribute('data-idx'));
          if (!Number.isFinite(idx)) return;
          this._removeSection(entityId, idx);
        };
      });
    }
  }

  static getConfigElement() {
    return document.createElement(EGS_EDITOR_TAG);
  }
}

class EnergyGraphSchedulerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = EnergyGraphSchedulerCard.getStubConfig();
    this._loaded = false;
    this._pickerOpen = false;
    this._els = null;
  }

  set hass(hass) {
    this._hass = hass;
    // HA updates `hass` very frequently; re-rendering while a dropdown is open will close it.
    if (this._loaded && !this._pickerOpen) this._applyHassToPickers();
  }

  setConfig(config) {
    const stub = EnergyGraphSchedulerCard.getStubConfig();
    this._config = {
      ...stub,
      ...(config || {}),
      // Normalize
      type: (config && config.type) || stub.type,
      title: (config && config.title) != null ? config.title : stub.title,
      entity: (config && config.entity) || "",
      use_tomorrow_entity: !!(config && config.use_tomorrow_entity),
      tomorrow_entity: (config && config.tomorrow_entity) || "",
      use_sell_entity: !!(config && config.use_sell_entity),
      sell_entity: (config && config.sell_entity) || "",
      display_mode: ['all', 'graph_minmax', 'graph_only'].includes(config && config.display_mode)
        ? config.display_mode
        : stub.display_mode,
      sync: !!(config && config.sync),
      language: typeof (config && config.language) === 'string' ? config.language : stub.language,
    };
    if (this._loaded) this._applyConfigToUi();
    else this._render();
  }

  get value() {
    return this._config;
  }

  _valueChanged(newConfig) {
    const stub = EnergyGraphSchedulerCard.getStubConfig();
    this._config = {
      ...stub,
      ...(this._config || {}),
      ...(newConfig || {}),
      type: (this._config && this._config.type) || stub.type,
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
    // Do not re-render here: it can close dropdowns and steal focus while typing.
  }

  connectedCallback() {
    this._render();
  }

  _applyHassToPickers() {
    if (!this.shadowRoot) return;
    const pickers = this.shadowRoot.querySelectorAll(
      "tt-entity-picker.picker-primary, tt-entity-picker.picker-tomorrow, tt-entity-picker.picker-sell"
    );
    if (!pickers || !pickers.length) return;
    for (const picker of pickers) {
      try {
        picker.hass = this._hass;
      } catch {
        // ignore
      }
    }
  }

  _applyConfigToUi() {
    if (!this.shadowRoot) return;
    const title = egsSafeText(this._config?.title ?? "");
    const entity = egsSafeText(this._config?.entity ?? "");
    const useTomorrowEntity = !!this._config?.use_tomorrow_entity;
    const tomorrowEntity = egsSafeText(this._config?.tomorrow_entity ?? "");
    const useSellEntity = !!this._config?.use_sell_entity;
    const sellEntity = egsSafeText(this._config?.sell_entity ?? "");
    const displayMode = ['all', 'graph_minmax', 'graph_only'].includes(this._config?.display_mode)
      ? this._config.display_mode
      : 'all';
    const sync = !!this._config?.sync;
    const language = egsSafeText(this._config?.language ?? "");

    const titleEl = this.shadowRoot.querySelector("input.title");
    if (titleEl && titleEl.value !== title) titleEl.value = title;

    const pickerPrimary = this.shadowRoot.querySelector("tt-entity-picker.picker-primary");
    if (pickerPrimary) {
      try {
        pickerPrimary.value = entity;
      } catch {
        // ignore
      }
    }

    const useTomorrowEl = this.shadowRoot.querySelector("input.use-tomorrow");
    if (useTomorrowEl && useTomorrowEl.checked !== useTomorrowEntity) useTomorrowEl.checked = useTomorrowEntity;

    // Keep UI disabled-state in sync even when we don't re-render (editor reopen flow).
    const tomorrowSub = this.shadowRoot.querySelector(".sub-tomorrow");
    if (tomorrowSub && tomorrowSub.classList) {
      if (useTomorrowEntity) tomorrowSub.classList.remove("disabled");
      else tomorrowSub.classList.add("disabled");
    }

    const pickerTomorrow = this.shadowRoot.querySelector("tt-entity-picker.picker-tomorrow");
    if (pickerTomorrow) {
      try {
        pickerTomorrow.value = tomorrowEntity;
      } catch {
        // ignore
      }

      try {
        pickerTomorrow.disabled = !useTomorrowEntity;
        if (useTomorrowEntity) pickerTomorrow.removeAttribute("disabled");
        else pickerTomorrow.setAttribute("disabled", "");
      } catch {
        // ignore
      }
    }

    const useSellEl = this.shadowRoot.querySelector("input.use-sell");
    if (useSellEl && useSellEl.checked !== useSellEntity) useSellEl.checked = useSellEntity;

    const sellSub = this.shadowRoot.querySelector(".sub-sell");
    if (sellSub && sellSub.classList) {
      if (useSellEntity) sellSub.classList.remove("disabled");
      else sellSub.classList.add("disabled");
    }

    const pickerSell = this.shadowRoot.querySelector("tt-entity-picker.picker-sell");
    if (pickerSell) {
      try {
        pickerSell.value = sellEntity;
      } catch {
        // ignore
      }

      try {
        pickerSell.disabled = !useSellEntity;
        if (useSellEntity) pickerSell.removeAttribute("disabled");
        else pickerSell.setAttribute("disabled", "");
      } catch {
        // ignore
      }
    }

    const syncEl = this.shadowRoot.querySelector("input.sync");
    if (syncEl && syncEl.checked !== sync) syncEl.checked = sync;

    const langEl = this.shadowRoot.querySelector("select.language");
    if (langEl && langEl.value !== language) langEl.value = language;

    const viewEl = this.shadowRoot.querySelector("select.view-mode");
    if (viewEl && viewEl.value !== displayMode) viewEl.value = displayMode;
  }

  _render() {
    if (!this.shadowRoot) return;

    const hass = this._hass;
    const entity = egsSafeText(this._config?.entity);
    const title = egsSafeText(this._config?.title ?? "");
    const useTomorrowEntity = !!this._config?.use_tomorrow_entity;
    const tomorrowEntity = egsSafeText(this._config?.tomorrow_entity ?? "");
    const useSellEntity = !!this._config?.use_sell_entity;
    const sellEntity = egsSafeText(this._config?.sell_entity ?? "");
    const displayMode = ['all', 'graph_minmax', 'graph_only'].includes(this._config?.display_mode)
      ? this._config.display_mode
      : 'all';
    const sync = !!this._config?.sync;
    const language = egsSafeText(this._config?.language ?? "");

    const lang = egsGetUiLang(this._config, hass);
    const t = (key, vars) => egsFormatTemplate(egsLocalize(key, this._config?.language || hass), vars);

    const titlePlaceholder = egsSafeText(egsLocalize('card.title_default', this._config?.language || hass || 'en'));

    const languageLabels = {
      en: 'English',
      da: 'Dansk',
      sv: 'Svenska',
      nb: 'Norsk (Bokmål)',
      de: 'Deutsch',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
      fi: 'Suomi',
      cs: 'Čeština',
      sl: 'Slovenščina',
    };
    const supportedLangs = ['en','da','sv','nb','de','es','fr','it','fi','cs','sl'];
    const langOptions = [
      `<option value="" ${language === '' ? 'selected' : ''}>${egsSafeText(t('editor.language_auto'))}</option>`,
      ...supportedLangs.map((code) => {
        const label = languageLabels[code] || code;
        return `<option value="${code}" ${language === code ? 'selected' : ''}>${egsSafeText(label)} (${code})</option>`;
      }),
    ].join('');

    const css = `
      :host{ display:block; padding: 8px 0; }
      .grid{ display:grid; grid-template-columns: 1fr; gap: 12px; }
      .label{ color: var(--secondary-text-color); font-size: 12px; margin: 2px 0 6px; }
      input{ width:100%; height:36px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:8px; padding:6px 10px; background: var(--card-background-color); color: var(--primary-text-color); }
      input:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      select{ width:100%; height:36px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:8px; padding:6px 10px; background: var(--card-background-color); color: var(--primary-text-color); }
      select:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .box{ border:1px solid var(--divider-color); border-radius: 14px; padding: 12px; background: color-mix(in oklab, var(--card-background-color) 92%, transparent); }
      .box .boxhdr{ display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; margin-bottom: 10px; }
      .box .boxhdr .txt{ display:flex; flex-direction:column; gap: 4px; }
      .box .boxhdr .t1{ color: var(--primary-text-color); font-weight: 700; font-size: 13px; line-height: 1.2; }
      .box .boxhdr .t2{ color: var(--secondary-text-color); font-size: 12px; line-height: 1.3; }
      .box .content{ display:grid; grid-template-columns: 1fr; gap: 10px; }
      .box .sub{ padding-top: 10px; border-top: 1px solid var(--divider-color); }
      .box .sub.disabled{ opacity: 0.55; }
      .row{ display:flex; align-items:center; justify-content:space-between; gap: 12px; }
      .row .txt{ display:flex; flex-direction:column; gap: 2px; }
      .row .t1{ color: var(--primary-text-color); font-weight: 600; font-size: 13px; }
      .row .t2{ color: var(--secondary-text-color); font-size: 12px; }
      input.sync{ width:18px; height:18px; margin:0; }
      input.use-tomorrow{ width:18px; height:18px; margin:0; }
      input.use-sell{ width:18px; height:18px; margin:0; }
    `;

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="grid">
        <div>
          <div class="label">${egsSafeText(t('editor.title_optional'))}</div>
          <input class="title" type="text" value="${title}" placeholder="${titlePlaceholder}" />
        </div>
        <div>
          <div class="label">${egsSafeText(t('editor.language'))}</div>
          <select class="language">${langOptions}</select>
        </div>
        <div>
          <div class="label">${egsSafeText(t('editor.view_optional'))}</div>
          <div class="box">
            <div class="content">
              <div>
                <div class="label">${egsSafeText(t('editor.view_label'))}</div>
                <select class="view-mode">
                  <option value="all" ${displayMode === 'all' ? 'selected' : ''}>${egsSafeText(t('editor.view_show_all'))}</option>
                  <option value="graph_minmax" ${displayMode === 'graph_minmax' ? 'selected' : ''}>${egsSafeText(t('editor.view_graph_minmax'))}</option>
                  <option value="graph_only" ${displayMode === 'graph_only' ? 'selected' : ''}>${egsSafeText(t('editor.view_graph_only'))}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="boxhdr">
            <div class="txt">
              <div class="t1">${egsSafeText(t('editor.entity_label'))}</div>
              <div class="t2">${egsSafeText(t('editor.entity_picker'))}</div>
            </div>
          </div>
          <div class="content">
            <tt-entity-picker class="picker-primary" label="${egsSafeText(t('editor.entity_picker'))}" include-domains='["sensor","binary_sensor"]'></tt-entity-picker>
          </div>
        </div>

        <div class="box">
          <div class="boxhdr">
            <div class="txt">
              <div class="t1">${egsSafeText(t('editor.tomorrow_toggle'))}</div>
              <div class="t2">${egsSafeText(t('editor.tomorrow_desc'))}</div>
            </div>
            <input class="use-tomorrow" type="checkbox" ${useTomorrowEntity ? "checked" : ""} />
          </div>
          <div class="content">
            <div class="sub sub-tomorrow ${useTomorrowEntity ? '' : 'disabled'}">
              <div class="label">${egsSafeText(t('editor.tomorrow_entity_label'))}</div>
              <tt-entity-picker class="picker-tomorrow" ${useTomorrowEntity ? '' : 'disabled'} label="${egsSafeText(
                t('editor.tomorrow_entity_picker')
              )}" include-domains='["sensor","binary_sensor"]'></tt-entity-picker>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="boxhdr">
            <div class="txt">
              <div class="t1">${egsSafeText(t('editor.sell_toggle'))}</div>
              <div class="t2">${egsSafeText(t('editor.sell_desc'))}</div>
            </div>
            <input class="use-sell" type="checkbox" ${useSellEntity ? "checked" : ""} />
          </div>
          <div class="content">
            <div class="sub sub-sell ${useSellEntity ? '' : 'disabled'}">
              <div class="label">${egsSafeText(t('editor.sell_entity_label'))}</div>
              <tt-entity-picker class="picker-sell" ${useSellEntity ? '' : 'disabled'} label="${egsSafeText(
                t('editor.sell_entity_picker')
              )}" include-domains='["sensor","binary_sensor"]'></tt-entity-picker>
            </div>
          </div>
        </div>
        <div>
          <div class="label">${egsSafeText(t('editor.sync_optional'))}</div>
          <div class="box">
            <div class="boxhdr">
            <div class="txt">
              <div class="t1">${egsSafeText(t('editor.sync_title'))}</div>
              <div class="t2">${egsSafeText(t('editor.sync_desc'))}</div>
            </div>
            <input class="sync" type="checkbox" ${sync ? "checked" : ""} />
            </div>
          </div>
        </div>
      </div>
    `;

    const titleEl = this.shadowRoot.querySelector("input.title");
    if (titleEl) {
      titleEl.onchange = (e) => this._valueChanged({ title: e.target.value || "" });
    }

    const langEl = this.shadowRoot.querySelector('select.language');
    if (langEl) {
      langEl.onchange = (e) => {
        const v = egsSafeText(e?.target?.value || '');

        // Keep default title in sync if the user hasn't customized it.
        let nextTitle = undefined;
        try {
          const rawTitle = egsSafeText(this._config?.title || '');
          const titleDefaultCandidates = (() => {
            try {
              const set = new Set();
              for (const k of Object.keys(EGS_I18N || {})) {
                const dv = EGS_I18N[k] && EGS_I18N[k]['card.title_default'];
                if (dv) set.add(String(dv).trim());
              }
              return set;
            } catch {
              return new Set();
            }
          })();
          if (!rawTitle || titleDefaultCandidates.has(String(rawTitle).trim())) {
            nextTitle = egsSafeText(egsLocalize('card.title_default', v || this._hass || 'en'));
          }
        } catch {
          nextTitle = undefined;
        }

        this._valueChanged(nextTitle != null ? { language: v, title: nextTitle } : { language: v });
        this._render();
      };
    }

    const viewEl = this.shadowRoot.querySelector('select.view-mode');
    if (viewEl) {
      viewEl.onchange = (e) => {
        const vRaw = egsSafeText(e?.target?.value || 'all');
        const v = ['all', 'graph_minmax', 'graph_only'].includes(vRaw) ? vRaw : 'all';
        this._valueChanged({ display_mode: v });
      };
    }

    const pickerPrimary = this.shadowRoot.querySelector(".picker-primary");
    if (pickerPrimary) {
      // Track whether the dropdown is open; prevents hass updates from killing it.
      try {
        pickerPrimary.addEventListener(
          "picker-opened",
          () => {
            this._pickerOpen = true;
          },
          { passive: true }
        );
        pickerPrimary.addEventListener(
          "picker-closed",
          () => {
            setTimeout(() => {
              this._pickerOpen = false;
              this._applyHassToPickers();
            }, 200);
          },
          { passive: true }
        );
      } catch {
        // ignore
      }

      try {
        pickerPrimary.hass = hass;
      } catch {
        // ignore
      }

      try {
        // ha-entity-picker uses .value; fallback picker uses .value too.
        pickerPrimary.value = entity;
      } catch {
        // ignore
      }

      // tt-entity-picker fires "value-changed" with detail.value
      pickerPrimary.addEventListener("value-changed", (ev) => {
        const v = ev?.detail?.value ?? ev?.target?.value;
        this._valueChanged({ entity: v || "" });
      });
    }

    const pickerTomorrow = this.shadowRoot.querySelector(".picker-tomorrow");
    if (pickerTomorrow) {
      try {
        pickerTomorrow.addEventListener(
          "picker-opened",
          () => {
            this._pickerOpen = true;
          },
          { passive: true }
        );
        pickerTomorrow.addEventListener(
          "picker-closed",
          () => {
            setTimeout(() => {
              this._pickerOpen = false;
              this._applyHassToPickers();
            }, 200);
          },
          { passive: true }
        );
      } catch {
        // ignore
      }

      try {
        pickerTomorrow.hass = hass;
      } catch {
        // ignore
      }

      try {
        pickerTomorrow.value = tomorrowEntity;
      } catch {
        // ignore
      }

      pickerTomorrow.addEventListener("value-changed", (ev) => {
        const v = ev?.detail?.value ?? ev?.target?.value;
        this._valueChanged({ tomorrow_entity: v || "" });
      });
    }

    const pickerSell = this.shadowRoot.querySelector(".picker-sell");
    if (pickerSell) {
      try {
        pickerSell.addEventListener(
          "picker-opened",
          () => {
            this._pickerOpen = true;
          },
          { passive: true }
        );
        pickerSell.addEventListener(
          "picker-closed",
          () => {
            setTimeout(() => {
              this._pickerOpen = false;
              this._applyHassToPickers();
            }, 200);
          },
          { passive: true }
        );
      } catch {
        // ignore
      }

      try {
        pickerSell.hass = hass;
      } catch {
        // ignore
      }

      try {
        pickerSell.value = sellEntity;
      } catch {
        // ignore
      }

      pickerSell.addEventListener("value-changed", (ev) => {
        const v = ev?.detail?.value ?? ev?.target?.value;
        this._valueChanged({ sell_entity: v || "" });
      });
    }

    const useTomorrowEl = this.shadowRoot.querySelector("input.use-tomorrow");
    if (useTomorrowEl) {
      useTomorrowEl.onchange = (e) => {
        this._valueChanged({ use_tomorrow_entity: !!e.target.checked });
        this._render();
      };
    }

    const useSellEl = this.shadowRoot.querySelector("input.use-sell");
    if (useSellEl) {
      useSellEl.onchange = (e) => {
        this._valueChanged({ use_sell_entity: !!e.target.checked });
        this._render();
      };
    }

    const syncEl = this.shadowRoot.querySelector("input.sync");
    if (syncEl) {
      syncEl.onchange = (e) => this._valueChanged({ sync: !!e.target.checked });
    }

    this._loaded = true;
  }
}

if (!customElements.get(EGS_CARD_TAG)) {
  customElements.define(EGS_CARD_TAG, EnergyGraphSchedulerCard);
}
if (!customElements.get(EGS_EDITOR_TAG)) {
  customElements.define(EGS_EDITOR_TAG, EnergyGraphSchedulerCardEditor);
}

// Register in the Lovelace UI card picker (best-effort)
try {
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: EGS_CARD_TAG,
    name: "Energy Graph Scheduler",
    description: "Graf over valgt strømpris-entity (med editor entity picker)",
  });
} catch {
  // ignore
}

console.info(`%cENERGY-GRAPH-SCHEDULER-CARD ${EGS_CARD_VERSION}`, "color: #03a9f4; font-weight: 700");
