'use strict';
/*/
  The information in this file are defined in the Splittermond Regelwerk. As such,
  they are property of the Uhrwerk Verlag(http://www.uhrwerk-verlag.de/), who also
  owns the copyrights (as of Mai 2015).
/*/

const n = {};

/* eslint-disable max-len, no-multi-spaces */
const splittermond = {
    attributes: [
      {abbreviation: 'aus', name: 'Ausdauer'},
      {abbreviation: 'bew', name: 'Beweglichkeit'},
      {abbreviation: 'int', name: 'Intuition'},
      {abbreviation: 'kon', name: 'Konstitution'},
      {abbreviation: 'mys', name: 'Mystik'},
      {abbreviation: 'str', name: 'Stärke'},
      {abbreviation: 'ver', name: 'Verstand'},
      {abbreviation: 'wil', name: 'Willenskraft'}],
    derivedAttributes: [
      {
        name: 'Größenklasse',
        abbreviation: 'gk',
        gk(char) {
          return char.race && char.race.gk;
        },
        derivedFrom: ['race'],
      },
      {
        name: 'Geschwindigkeit',
        abbreviation: 'gsw',
        gsw(char) {
          return char.derivedAttributes && (char.derivedAttributes.gk + char.attributes.bew.value);
        },
        derivedFrom: ['gk', 'bew'],
      },
      {
        name: 'Initiative',
        abbreviation: 'ini',
        ini(char) {
          return 10 - char.attributes.int.value;
        },
        derivedFrom: ['int'],
      },
      {
        name: 'Lebenspunkte',
        abbreviation: 'lp',
        lp(char) {
          return char.derivedAttributes && (char.derivedAttributes.gk + char.attributes.kon.value);
        },
        derivedFrom: ['gk', 'kon'],
      },
      {
        name: 'Fokuspunkte',
        abbreviation: 'fo',
        fo(char) {
          return 2 * (char.attributes.mys.value + char.attributes.wil.value);
        },
        derivedFrom: ['mys', 'wil'],
      },
      {
        name: 'Verteidigung',
        abbreviation: 'vtd',
        vtd(char) {
          return 12 + char.attributes.bew.value + char.attributes.str.value;
        },
        derivedFrom: ['bew', 'str'],
      },
      {
        name: 'Geistiger Widerstand',
        abbreviation: 'gw',
        gw(char) {
          return 12 + char.attributes.ver.value + char.attributes.wil.value;
        },
        derivedFrom: ['ver', 'wil'],
      },
      {
        name: 'Körperl. Widerstand',
        abbreviation: 'kw',
        kw(char) {
          return 12 + char.attributes.kon.value + char.attributes.wil.value;
        },
        derivedFrom: ['kon', 'wil'],
      },
    ],
    races: [
      {name: 'Alb',    gk: 5, strengths: ['Attraktivität', 'Scharfes Gehör', 'Dämmersicht']},
      {name: 'Gnom',   gk: 3, strengths: ['Feensinn', 'Hoher Geistiger Widerstand', 'Flink']},
      {name: 'Mensch', gk: 5, strengths: ['Zusätzliche Splitterpunkte']},
      {name: 'Varg',   gk: 6, strengths: ['Natürlicher Rüstungsschutz', 'Ausdauernd', 'Natürliche Waffe']},
      {name: 'Zwerg',  gk: 4, strengths: ['Giftresistenz', 'Robust', 'Orientierungssinn']}],
    strengths: [{name: 'Attraktivität', cost: 1, start: true},
      {name: 'Ausdauernd', cost: 1},
      {name: 'Bastler', cost: 1},
      {name: 'Dämmersicht', cost: 2, start: true},
      {name: 'Einen Schritt voraus', cost: 2},
      {name: 'Entfernungssinn', cost: 2},
      {name: 'Erhöhte Fokusregeneration', cost: 2},
      {name: 'Erhöhte Lebensregeneration', cost: 2},
      {name: 'Erhöhter Fokuspool', cost: 2, times: n},
      {name: 'Erwählter der ...', cost: 1, start: true, times: n},
      {name: 'Feensinn', cost: 1, start: true},
      {name: 'Feine Nase', cost: 1, start: true},
      {name: 'Flink', cost: 1, start: true},
      {name: 'Gesellig', cost: 1},
      {name: 'Giftresistenz', cost: 1},
      {name: 'Gleichgewichtssinn', cost: 1},
      {name: 'Gutes Gedächtnis', cost: 1, start: true},
      {name: 'Hitzeresistenz', cost: 1},
      {name: 'Hoher Geistiger Widerstand', cost: 2, times: 'Heldengrad'},
      {name: 'Hoher Körperlicher Widerstand', cost: 2, times: 'Heldengrad'},
      {name: 'Konzentrationsstärke', cost: 1},
      {name: 'Krankheitsresistenz', cost: 1},
      {name: 'Kulturkunde', cost: 1},
      {name: 'Kälteresistenz', cost: 1},
      {name: 'Lastesel', cost: 1, time: 3},
      {name: 'Literat', cost: 1},
      {name: 'Natürlicher Rüstungsschutz', cost: 2, start: true},
      {name: 'Natürliche Waffe', cost: 1, start: true},
      {name: 'Orientierungssinn', cost: 1},
      {name: 'Priester', cost: 0},
      {name: 'Robust', cost: 2, time: 3},
      {name: 'Scharfe Sicht', cost: 1, start: true},
      {name: 'Scharfes Gehör', cost: 1, start: true},
      {name: 'Schmerzresistenz', cost: 2},
      {name: 'Soziales Gespür', cost: 1},
      {name: 'Stabile Magie', cost: 1},
      {name: 'Tierfreund', cost: 1},
      {name: 'Tiervertrauter', cost: 1},
      {name: 'Verbesserte Initiative', cost: 2},
      {name: 'Weltgewandt', cost: 1},
      {name: 'Zäh', cost: 1},
      {name: 'Zielstrebig', cost: 1},
      {name: 'Zusätzliche Splitterpunkte', cost: 2, start: true}],
    weaknesses: [],

    moonsliver: [
      {name: 'Blutiges Antlitz des Mondes',
          influences: 'Gesundheitsstufe'},
      {name: 'Das zweite Gesicht',
          influences: 'Initiative'},
      {name: 'Der Blitz',
          influences: 'Waffengeschwindigkeit'},
      {name: 'Der Fels',
          influences: 'Probe'},
      {name: 'Der Spieler',
          influences: 'Probe'},
      {name: 'Freundschaft der Trabanten',
          influences: 'Fertigkeitswert'},
      {name: 'Geist der Gedanken',
          influences: 'Fokus, Schaden'},
      {name: 'Gunst des reichen Mannes',
          influences: 'Probe'},
      {name: 'Omen des schwarzen Mondes',
          influences: 'Probe'},
      {name: 'Segen der Mondkraft',
          influences: 'Ruhephase, Verschnaufpause, Vergiftung, Krank'}],

    resources: ['Ansehen', 'Gefolge', 'Kontakte',
      'Kreatur', 'Mentor', 'Rang',
      'Relikt', 'Stand', 'Vermögen', 'Zuflucht'],
    coreResources: ['Ansehen', 'Kontakte', 'Stand', 'Vermögen'],

    abilities: [
      {name: 'Akrobatik', attributes: ['bew', 'str'],
        masteries: [
          ['Ausweichen I', 'Balance', 'Blitzreflexe', 'Stehaufmännchen'],
          ['Abrollen', 'Ausweichen II', 'Entfesselungskünstler', 'Koordiniertes Ausweichen', 'Meisterhafte Balance'],
          ['Ausweichbewegungen', 'Ausweichen III', 'Schlangenmensch'], []],
        foci: ['Ausweichen', 'Balancieren', 'Entfesseln', 'Kunststücke', 'Körperformen', 'Sturz abfangen']},
      {name: 'Alchemie', attributes: ['mys', 'ver'],
        masteries: [
          ['Effizienz', 'Geselle (Alchemie)', 'Sparfuchs'],
          ['Begabter Alchemist', 'Fachmann (Alchemie)', 'Wunderarbeiter'],
          ['Abhärtung durch Gewöhnung', 'Meister (Alchemie)'],
          ['Meisterwerk']],
        foci: ['Gifte', 'Heilmittel', 'Stärkungsmittel', 'Zaubermittel']},
      {name: 'Anführen', attributes: ['aus', 'wil'],
        masteries: [
          ['Herausforderung', 'Koordinator', 'Sammeln'],
          ['Inspirieren', 'Schlachtplan (Angriff)', 'Schlachtplan (Verteidigung)'],
          ['Das letzte Aufgebot', 'Taktisches Genie'], []],
        foci: ['Einschüchtern', 'Flammende Rede', 'Koordinieren', 'Schlachtpläne', 'Taktik']},
      {name: 'Arkane Kunde', attributes: ['mys', 'ver'],
        masteries: [
          ['Arkane Verteidigung I', 'Artefaktkunde', 'Schriftrollen erstellen I'],
          ['Arkane Verteidigung II', 'Jäger des Übernatürlichen', 'Schriftrollen erstellen II', 'Wahrsager'],
          ['Bestienjäger', 'Schriftrollen erstellen III'], []],
        foci: ['Artefakte', 'Magische Kreaturen', 'Magische Phänomene', 'Orientierung in Feenwelten', 'Rituale', 'Symbole', 'Wahrsagung', 'Zaubersprüche']},
      {name: 'Athletik', attributes: ['bew', 'str'],
        masteries: [
          ['Kletteraffe', 'Sprinter', 'Weitspringer'],
          ['Flinker Verfolger', 'Hindernisläufer', 'Muskelprotz'],
          ['Freikletterer', 'Mauerstürmer'], []],
        foci: ['Klettern', 'Kraftakt', 'Laufen', 'Springen', 'Werfen']},
      {name: 'Darbietung', attributes: ['aus', 'wil'],
        masteries: [
          ['Einstellung beeinflussen', 'Faszinieren', 'Geselle (Darbietung)', 'Pass ja auf!', 'Publikumsliebling'],
          ['Bannlied', 'Begabter Künstler', 'Fachmann (Darbietung)', 'Haha, Schurke!', 'Schmählied/Loblied'],
          ['Lachen ist die beste Medizin', 'Lied des Aufstandes', 'Meister (Darbietung)'], []],
        foci: ['Akrobatische Vorführung', 'Bauchreden', 'Blasinstrumente', 'Dichtkunst', 'Gaukelei', 'Komposition', 'Saiteninstrumente', 'Schauspielerei', 'Schlaginstrumente', 'Singen', 'Stimmenimitation', 'Tanzen', 'Öffentliche Rede']},
      {name: 'Diplomatie', attributes: ['aus', 'ver'],
        masteries: [
          ['Diplomat', 'Feilscher', 'Stil und Grazie'],
          ['Etikette', 'Missionar', 'Scharfe Zunge'],
          ['Investor', 'Wisst Ihr überhaupt, wer ich bin?'], []],
        foci: ['Bekehren', 'Feilschen', 'Gerüchte', 'Heraldigk', 'Informationssuche', 'Minnekunst', 'Politik', 'Umgangsformen', 'Verhandeln', 'Öffentliche Rede']},
      {name: 'Edelhandwek', attributes: ['int', 'ver'],
        masteries: [
          ['Effizienz', 'Geselle (Edelhandwerk)', 'Sparfuchs'],
          ['Begabter Handwerker', 'Fachmann (Edelhandwerk)', 'Wunderarbeiter'],
          ['Geschickte Rettung', 'Meister (Edelhandwerk)'],
          ['Meisterwerk']],
        foci: ['Architektur', 'Glasbläserei', 'Gravur', 'Juwelier', 'Kalligraphie', 'Kartographie', 'Malerei', 'Weitere nach Spielleitermaßgabe']},
      {name: 'Empathie', attributes: ['int', 'ver'],
        masteries: [
          ['Beruhigen', 'Gegner durchschauen I', 'Rede mit mir'],
          ['Begabter Menschenkenner', 'Gegner durchschauen II', 'Werte einschätzen'],
          ['Herr über den Geist', 'Hypnose'], []],
        foci: ['Beruhigen', 'Lügen erkennen', 'Motivation erkennen', 'Pesönlichkeit einschätzen']},
      {name: 'Entschlossenheit', attributes: ['aus', 'wil'],
        masteries: [
          ['Eiserner Wille', 'Kühler Kopf I', 'Unbeirrbar'],
          ['Begabter Sturkopf', 'Undurchschaubar', 'Willensanstrengung'],
          ['Gesundes Misstrauen', 'Kühler Kopf II'], []],
        foci: ['Beherrschungsmagie widerstehen', 'Furcht widerstehen', 'Prinzipien einhalten', 'Redegewandtheit widerstehen', 'Unterbrechungen widerstehen']},
      {name: 'Fingerfertigkeit', attributes: ['aus', 'bew'],
        masteries: [
          ['Knotenlöser', 'Kreative Ablenkung', 'Schnellziehen'],
          ['Begabter Fingerkünstler', 'Ruhige Hand', 'Zaubergesten verbergen'],
          ['Ich war‘s nicht', 'Waffe aus dem Nichts'], []],
        foci: ['Entfesseln', 'Falschspiel', 'Fesseln', 'Gegenstand verstecken', 'Taschendiebstahl', 'Taschenspielertricks']},
      {name: 'Geschichte und Mythen', attributes: ['mys', 'ver'],
        masteries: [
          ['Büchernarr', 'Feldforschung', 'Legendensänger'],
          ['Begabter Historiker', 'Bibliothekar', 'Jäger des Sagenhaften'],
          ['Der Sage wahrer Kern', 'Legendenjäger'], []],
        foci: ['Einzelne Epoche', 'Einzelne Region', 'Einzelner Themenbereich', 'Einzelnes Pantheon', 'Einzelnes Volk', 'Legendäre Kreaturen', 'Prophezeiungen', 'Schöpfungsmythen']},
      {name: 'Handwerk', attributes: ['kon', 'ver'],
        masteries: [
          ['Effizienz', 'Geselle (Handwerk)', 'Sparfuchs'],
          ['Begabter Handwerker', 'Fachmann (Handwerk)', 'Wunderarbeiter'],
          ['Geschickte Rettung', 'Meister (Handwerk)'],
          ['Meisterwerk']],
        foci: ['Holzbearbeitung', 'Schmiedekunst', 'Schneiderei/Lederverarbeitung', 'Steinbearbeitung', 'Weitere nach Spielleitermaßgabe']},
      {name: 'Heilkunde', attributes: ['int', 'ver'],
        masteries: [
          ['Felddiagnose', 'Heilungsgeschick', 'Lebensretter'],
          ['Begabter Heiler', 'Heilung fördern', 'Tierarzt'],
          ['Spezialist für alle Wesen', 'Wundarzt'], []],
        foci: ['Gifte', 'Heilkräuter bestimmen', 'Krankheiten', 'Wunden', 'Zustände']},
      {name: 'Heimlichkeit', attributes: ['int', 'ver'],
        masteries: [
          ['Leisetreter', 'Unauffällig', 'Überraschungsangriff I'],
          ['Begabter Schleicher', 'Hinterhalt', 'Überraschungsangriff II'],
          ['Lautlosigkeit', 'Überraschungsangriff III'], []],
        foci: ['Beschatten', 'Hinterhalt', 'Natürliche Umgebung', 'Schleichen', 'Spuren verwischen', 'Städtische Umgebung', 'Verstecken']},
      {name: 'Jagdkunst', attributes: ['kon', 'ver'],
        masteries: [
          ['Tierkenner', 'Unermüdlicher Verfolger', 'Waidmann'],
          ['Begabter Spurenleser', 'Schneller Jäger', 'Tierexperte'],
          ['Blattschuss', 'Effizienter Jäger'], []],
        foci: ['Bärenartiger', 'Fallen stellen', 'Fisch', 'Großwild', 'Hundeartiger', 'Insekt', 'Katzenartiger', 'Kleinwild', 'Nahrungssuche', 'Reptil', 'Spinnentier', 'Spurensuche', 'Verarbeitung', 'Vogel']},
      {name: 'Länderkunde', attributes: ['int', 'ver'],
        masteries: [
          ['Schnellleser', 'Sprachbegabt', 'Universalgelehrter'],
          ['Begabter Gelehrter', 'Gute Allgemeinbildung', 'Philosoph'],
          ['Das Wesen der Welt', 'Praktisches Wissen'], []],
        foci: ['Einzelne Kultur', 'Einzelne Region', 'Einzelnes Volk', 'Geographie', 'Philosophie', 'Recht']},
      {name: 'Naturkunde', attributes: ['int', 'ver'],
        masteries: [
          ['Des Alchemisten Helfer', 'Jäger', 'Konservierung'],
          ['Feind', 'Meisterjäger', 'Schneller Sammler'],
          ['Erzfeind (Naturkunde)', 'Kräuterhexe'], []],
        foci: ['Drachen', 'Einzelnes Terrain', 'Gesteinskunde', 'Kreaturen der Finsternis', 'Kräutersuche/Zutaten sammeln', 'Nahrungssuche', 'Pflanzenkunde', 'Sternkunde', 'Tierkunde', 'Wettervorhersage']},
      {name: 'Redegewandheit', attributes: ['aus', 'wil'],
        masteries: [
          ['Ablenken', 'Beißender Spott', 'Improvisierte Verkleidung'],
          ['Begabter Lügner', 'Nicht ins Gesicht!', 'Tarnidentität'],
          ['Können diese Augen lügen?', 'Ohne Worte'], []],
        foci: ['Feilschen', 'Lügen und Betrügen', 'Verführen', 'Verkleiden', 'Überreden']},
      {name: 'Schlösser & Fallen', attributes: ['int', 'bew'],
        masteries: [
          ['Aufmerksam', 'Improvisationskünstler', 'Vorsicht I'],
          ['Flinke Dietriche', 'Gute Reflexe', 'Schlösserhammer'],
          ['Magische Tricks', 'Vorsicht II'], []],
        foci: ['Fallen entdecken', 'Fallen entschärfen', 'Fallen konstruieren', 'Mechanik', 'Schlösser öffnen']},
      {name: 'Schwimmen', attributes: ['str', 'kon'],
        masteries: [
          ['Arbeit unter Wasser', 'Flusstaucher', 'Langstreckenschwimmer'],
          ['Begabter Schwimmer', 'Kampf unter Wasser', 'Meerestaucher'],
          ['Apnoe', 'Tiefseetaucher'], []],
        foci: ['Kurzstrecke', 'Langstrecke', 'Tauchen', 'Wasser treten']},
      {name: 'Seefahrt', attributes: ['bew', 'kon'],
        masteries: [
          ['Beine des Seemanns', 'Blick auf die Sterne', 'Seebär'],
          ['Begabter Seemann', 'Kapitän der verfaulten Nussschale', 'Korsar'],
          ['Held der Meere', 'Meine Karte ist das Firmament'], []],
        foci: ['Boote fahren', 'Fesseln/Knoten', 'Fischen', 'Flussschifffahrt', 'Navigation', 'Ruderschiffe', 'Seeschifffahrt', 'Segelschiffe']},
      {name: 'Straßenkunde', attributes: ['aus', 'int'],
        masteries: [
          ['Gerüchte aufschnappen', 'Glücksspieler', 'Schwarzmarkt'],
          ['Begabter Straßenwanderer', 'Der richtige Ton', 'Überall zu Hause'],
          ['Gerüchte verbreiten', 'Wie meine Westentasche'], []],
        foci: ['Bestimmte Stadt', 'Gerüchte', 'Orientierung', 'Schwarzmarkt', 'Tatorte', 'Zurechtfinden']},
      {name: 'Tierführung', attributes: ['aus', 'bew'],
        masteries: [
          ['Dompteur', 'Reiterkampf', 'Tier einschätzen'],
          ['Herr der Bestien', 'Schlachtreiter', 'Veteran der Arena'],
          ['Freihändigkeit', 'Zwei Geister, ein Gedanke'], []],
        foci: ['Abrichten', 'Einzelne Tierart', 'Fahrzeug lenken', 'Reiten', 'Tier beruhigen', 'Tier einschüchtern']},
      {name: 'Überleben', attributes: ['int', 'kon'],
        masteries: [
          ['Geländekunde', 'Meteorologe', 'Wildnisläufer'],
          ['Sparsame Reise', 'Vorausschauender Führer', 'Wetterfest'],
          ['Unfehlbare Orientierung', 'Wanderer im Schatten'], []],
        foci: ['Feuer entzünden', 'Lagerbereitung', 'Orientierung', 'Wettervorhersage', 'Wildnisführung']},
      {name: 'Wahrnehmung', attributes: ['int', 'wil'],
        masteries: [
          ['Absolutes Gehör', 'Perfekter Gaumen', 'Umgebungssinne'],
          ['Begabter Späher', 'Schnelle Durchsuchung', 'Veränderte Umgebung'],
          ['Niemand war hier', 'Unterschwellige Warnung'], []],
        foci: ['Durchsuchung', 'Hinterhalte', 'Hören', 'Riechen', 'Schmecken', 'Sehen', 'Tasten']},
      {name: 'Zähigkeit', attributes: ['kon', 'wil'],
        masteries: [
          ['Rüstungsträger I', 'Schnell wieder auf den Beinen', 'Starker Schildarm I', 'Wachsamkeit'],
          ['Rüstungsträger II', 'Schmerzwiderstand I', 'Schnelle Schildabwehr', 'Starker Schildarm II'],
          ['Dickschädel', 'Schmerzwiderstand II'], []],
        foci: ['Erschöpfung widerstehen', 'Gift widerstehen', 'Krankheiten widerstehen', 'Zaubern widerstehen', 'Zechen']}],
    generalMasteries: [[], [], [], ['Großmeister']],

    weaponsAbilities: [
    {name: 'Handgemenge', masteries: [
       [{name: 'Block'},
        {name: 'Halten', requires: ['Umklammern']},
        {name: 'Verwirrung', isManoeuvre: true}],
       [{name: 'Schmerzhafter Hieb', isManoeuvre: true},
        {name: 'Tödlicher Schaden'},
        {name: 'Verbessertes Umreißen', requires: ['Umreißen']}],
       [{name: 'Verbessertes Entwaffnen', requires: ['Block', 'Entwaffnen']},
        {name: 'Würgegriff', requires: ['Umklammern']}]]},
        {name: 'Hiebwaffen'},
        {name: 'Kettenwaffen'},
        {name: 'Klingenwaffen'},
        {name: 'Stangenwaffen'},
        {name: 'Schusswaffen'},
        {name: 'Wurfwaffen'}],
    generalWeaponsMasteries: [[
        {name: 'Abdrängen', isManoeuvre: true},
        {name: 'Improvisation'}, {name: 'Kampf mit zwei Waffen'}, {name: 'Rückzugsgefecht'},
        {name: 'Umklammern', isManoeuvre: true},
        {name: 'Umreißen', isManoeuvre: true},
        {name: 'Verteidiger'},
        {name: 'Vorstürmen', isManoeuvre: true}],
       [{name: 'Beidhändige Abwehr', requires: ['Kampf mit zwei Waffen']},
        {name: 'Beidhändiger Angriff', requires: ['Kampf mit zwei Waffen']},
        {name: 'Entwaffnen', isManoeuvre: true},
        {name: 'Rundumschlag', isManoeuvre: true}],
       [{name: 'Klingentanz'},
        {name: 'Meister mit zwei Waffen', requires: ['Beidhändige Abwehr', 'Beidhändiger Angriff']}],
       [{name: 'Großmeister'}]],

    magicAbilities: [
      {name: 'Bann', attributes: ['mys', 'wil'],
        masteries: [
          ['Bannende Hand', 'Bannzauber-Experte', 'Eilige Identifikation'],
          ['Konterzauberer', 'Wissen ist Macht'],
          ['Schnelle Reaktion'], []],
        foci: ['Aura', 'Feenwesen', 'Fluch', 'Hellsicht', 'Konter', 'Nekromantie', 'Schaden', 'Schwächung', 'Sinne', 'Wesen bannen', 'Zauber brechen']},
      {name: 'Beherschung', attributes: ['mys', 'wil'],
        masteries: [
          ['Einfühlsamkeit', 'Willensbrecher'],
          ['Materielle Verbindung I', 'Schläfer'],
          ['Materielle Verbindung II'], []],
        foci: ['Botschaft', 'Einstellung', 'Feenwesen', 'Gedanken', 'Gedächtnis', 'Halluzination', 'Kontrolle', 'Mental', 'Moral', 'Schwächung', 'Tarnung', 'Tiere', 'Zauber brechen']},
      {name: 'Bewegung', attributes: ['mys', 'bew'],
        masteries: [
          ['Arkane Geschwindigkeit', 'Durchschlagendes Geschoss'],
          ['Effektive Bewegung'],
          ['Gliederpuppe'], []],
        foci: ['Aura', 'Bewegung stärken', 'Elementarkontrolle', 'Körper stärken', 'Objekt', 'Schwächung', 'Telekinese', 'Wand', 'Wildnis']},
      {name: 'Erkenntnis', attributes: ['mys', 'ver'],
        masteries: [
          ['Forschender Geist', 'Stimmungsgespür', 'Telepathischer Schild'],
          ['Dringliche Botschaft', 'Fernzauberer', 'Subtile Forschung'],
          ['Stimmen der Freunde'], []],
        foci: ['Anderswelt', 'Botschaft', 'Einstellung', 'Gedanken', 'Gedächtnis', 'Geisterwesen', 'Gift', 'Gifte', 'Hellsicht', 'Konter', 'Prophezeiung', 'Sinne', 'Tiere', 'Verständigung', 'Wahrnehmung', 'Wand', 'Wildnis']},
      {name: 'Fels', attributes: ['mys', 'kon'],
        masteries: [
          ['Erdverbundenheit', 'Felsresistenz I', 'Schmiedemeister'],
          ['Felsmeisterschaft', 'Felsresistenz II', 'Herr der Felsgeister'],
          ['Felsresistenz III', 'Herr der Felsen'], []],
        foci: ['Beschwörung', 'Elementarkontrolle', 'Felswesen', 'Gestalt', 'Hand', 'Haut', 'Herbeirufung', 'Körper stärken', 'Magisches Wesen I', 'Objekt', 'Rüstung', 'Schaden', 'Wand', 'Wildnis']},
      {name: 'Feuer', attributes: ['mys', 'aus'],
        masteries: [
          ['Brandstifter', 'Feuerresistenz I', 'Flammenherz'],
          ['Feuermeisterschaft', 'Feuerresistenz II', 'Herr der Feuergeister'],
          ['Feuerresistenz III', 'Inferno'], []],
        foci: ['Aura', 'Elementarkontrolle', 'Explosion', 'Gestalt', 'Hand', 'Objekt', 'Schaden', 'Schild', 'Schutzfeld', 'Waffe', 'Wand']},
      {name: 'Heilung', attributes: ['mys', 'aus'],
        masteries: [
          ['Entgiftung', 'Kosmetische Thaumaturgie'],
          ['Arkane Diagnose', 'Heilung fördern'],
          ['Gesunder Geist in gesundem Körper'], []],
        foci: ['Aura', 'Bewegung stärken', 'Gift', 'Gifte', 'Hellsicht', 'Körper stärken', 'Leben', 'Objekt', 'Pflanzen', 'Regeneration', 'Verständigung']},
      {name: 'Illusion', attributes: ['mys', 'aus'],
        masteries: [
          ['Trübung des Blicks', 'Zweite Identität'],
          ['Zweite Haut'],
          ['Künstliche Wirklichkeit'], []],
        foci: ['Gedanken', 'Geruch', 'Geräusch', 'Halluzination', 'Hellsicht', 'Impersonation', 'Konter', 'Leuchten', 'Moral', 'Objekt', 'Sinne', 'Tarnung', 'Trugbild']},
      {name: 'Kampf', attributes: ['mys', 'str'],
        masteries: [
          ['Eiserne Konzentration', 'Fernzauberer', 'Geschossmagie', 'Gezielte Zauber'],
          ['Herz des Zerstörers', 'Stählerne Konzentration', 'Veteran des Kampfgetümmels'],
          ['Blutbad'], []],
        foci: ['Eis', 'Elektrizität', 'Explosion', 'Hand', 'Herbeirufung', 'Leuchten', 'Objekt', 'Pfeil', 'Pflanzen', 'Rüstung', 'Schaden', 'Schwächung', 'Säure', 'Waffe']},
      {name: 'Licht', attributes: ['mys', 'aus'],
        masteries: [
          ['Leuchtkraft', 'Streiter des Lichtes'],
          ['Schutz des Lichtes', 'Wider die Finsternis'],
          ['Ungeblendet'], []],
        foci: ['Aura', 'Gestalt', 'Herbeirufung', 'Leuchten', 'Nekromantie', 'Schaden', 'Schild', 'Schutzfeld', 'Schwächung', 'Segen', 'Waffe', 'Wand', 'Wesen bannen', 'Zauber brechen']},
      {name: 'Natur', attributes: ['mys', 'aus'],
        masteries: [
          ['Lied der Natur', 'Naturkenner', 'Vertrautenband'],
          ['Harmonie mit der Natur', 'Kind der Wildnis', 'Stärkung des Vertrauten'],
          ['Eins mit der Natur', 'Vertrautensprache'], []],
        foci: ['Alter', 'Aura', 'Beschwörung', 'Botschaft', 'Einstellung', 'Elektrizität', 'Elementarkontrolle', 'Fluch', 'Gestalt', 'Gift', 'Gifte', 'Haut', 'Herbeirufung', 'Kontrolle', 'Körper stärken', 'Pfeil', 'Pflanzen', 'Rüstung', 'Schaden', 'Sinne', 'Tarnung', 'Tiere', 'Verständigung', 'Waffe', 'Wahrnehmung', 'Wildnis']},
      {name: 'Schatten', attributes: ['mys', 'int'],
        masteries: [
          ['Blick in die Dunkelheit', 'Schattenherr'],
          ['Kind der Schatten', 'Schützende Schatten'],
          ['Nachtsicht (Schattenmagie)'], []],
        foci: ['Aura', 'Belebung', 'Bewegung stärken', 'Gestalt', 'Herbeirufung', 'Objekt', 'Schaden', 'Sinne', 'Trugbild', 'Verhüllung', 'Waffe', 'Wand', 'Zauber brechen']},
      {name: 'Schicksal', attributes: ['mys', 'aus'],
        masteries: [
          ['Glückskind', 'Vorahnung'],
          ['Fluchbringer', 'Wahrsager'],
          ['Hauch des Schicksals'], []],
        foci: ['Alter', 'Einstellung', 'Fluch', 'Körper stärken', 'Leben', 'Mental', 'Nekromantie', 'Objekt', 'Prophezeiung', 'Schwächung', 'Segen', 'Verständigung', 'Waffe', 'Zauber brechen']},
      {name: 'Schutz', attributes: ['mys', 'aus'],
        masteries: [
          ['Eiliger Schutz', 'Zauberschutz-Experte'],
          ['Fernzauberer', 'Zauberschutz-Meister'],
          ['Magischer Sog'], []],
        foci: ['Aura', 'Einstellung', 'Eis', 'Elektrizität', 'Gedanken', 'Gift', 'Gifte', 'Haut', 'Konter', 'Körper stärken', 'Leben', 'Leuchten', 'Nekromantie', 'Objekt', 'Pflanzen', 'Rüstung', 'Schild', 'Schutzfeld', 'Segen', 'Verhüllung', 'Wahrnehmung', 'Wand']},
      {name: 'Stärkung', attributes: ['mys', 'str'],
        masteries: [
          ['Magische Zeichen', 'Überlasten', 'Übertragung der Kraft'],
          ['Eigener Vorteil', 'Konzentrierter Fokus', 'Schutz vor Bannung'],
          ['Große Übertragung der Kraft'], []],
        foci: ['Aura', 'Bewegung stärken', 'Körper stärken', 'Leben', 'Moral', 'Objekt', 'Regeneration', 'Schwächung', 'Sinne', 'Verständigung']},
      {name: 'Tod', attributes: ['mys', 'ver'],
        masteries: [
          ['Atem des Sterbenden', 'Geisterkenner', 'Untotenjäger'],
          ['Herr der Geister', 'Herr des Alters', 'Nekromant'],
          ['Meister der Untoten'], []],
        foci: ['Alter', 'Anderswelt', 'Aura', 'Beschwörung', 'Fluch', 'Geisterwesen', 'Leben', 'Magisches Wesen I', 'Mental', 'Nekromantie', 'Pflanzen', 'Schaden', 'Schwächung', 'Verhüllung', 'Verständigung', 'Wahrnehmung', 'Wesen bannen']},
      {name: 'Verwandlung', attributes: ['mys', 'kon'],
        masteries: [
          ['Bannung der Form', 'Bevorzugte Gestalt', 'Freiheit der Form'],
          ['Haut des Tieres', 'Kontrolle der Form', 'Verhüllung der Form'],
          ['Gestalt des Greifvogels', 'Tierzauberer'], []],
        foci: ['Alter', 'Bewegung stärken', 'Gestalt', 'Hand', 'Haut', 'Impersonation', 'Körper stärken', 'Leuchten', 'Objekt', 'Pflanzen', 'Rüstung', 'Schwächung', 'Sinne', 'Tarnung', 'Tiere', 'Wildnis', 'Zauber brechen']},
      {name: 'Wasser', attributes: ['mys', 'int'],
        masteries: [
          ['Kind der Wellen', 'Wasserresistenz I'],
          ['Herr der Wasserwesen', 'Wassermeisterschaft', 'Wasserresistenz II'],
          ['Herr der Wogen', 'Wasserresistenz III'], []],
        foci: ['Bewegung stärken', 'Eis', 'Elementarkontrolle', 'Gestalt', 'Gift', 'Gifte', 'Herbeirufung', 'Objekt', 'Reinigung', 'Schaden', 'Schild', 'Schutzfeld', 'Sinne', 'Säure', 'Tiere', 'Wahrnehmung', 'Wand', 'Wildnis']},
      {name: 'Wind', attributes: ['mys', 'ver'],
        masteries: [
          ['Stimme des Sturms', 'Wetterkundig', 'Windresistenz I'],
          ['Herr der Windgeister', 'Windmeisterschaft', 'Windresistenz II'],
          ['Herr des Wetters', 'Windresistenz III'], []],
        foci: ['Bewegung stärken', 'Elektrizität', 'Elementarkontrolle', 'Geruch', 'Gestalt', 'Hand', 'Herbeirufung', 'Objekt', 'Schaden', 'Schild', 'Schutzfeld', 'Sinne', 'Telekinese', 'Waffe', 'Wildnis']}],
    generalMagicMasteries: [
      [{name: 'Fokuskontrolle'}, {name: 'Hand des Zauberers'},
       {name: 'Sparsamer Zauberer'}, {name: 'Zauberfinger'}, {name: 'Zauber verzögern'}],
      [{name: 'Nichts passiert!', requires: ['Fokuskontrolle']},
       {name: 'Wunderwirker', requires: ['Zauberfinger']}],
      [{name: 'Artefaktmeister', requires: ['Wunderwirker']},
       {name: 'Auge des Zauberers', requires: ['Hand des Zauberers']}],
      [{name: 'Großmeister'}]],

    startMoney: function(char) {
      switch (char.resources['Vermögen']) {
        case -1: return [0,  1, 0];
        case  0: return [0,  3, 0];
        case  1: return [0,  5, 0];
        case  2: return [0, 20, 0];
        case  3: return [0, 40, 0];
        case  4: return [0, 65, 0];
        case  5: return [1,  0, 0];
        case  6: return [1, 50, 0];
        default: return [0,  0, 0];
      }
    },
};
/* eslint-enable max-len, no-multi-space */

export default splittermond;
const abilities = splittermond.abilities;
export {abilities, n};
