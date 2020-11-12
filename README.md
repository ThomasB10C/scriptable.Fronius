#### scriptable.Fronius V1.02
![seWidget](froni.jpeg)

# Fronius-Widget
Widget für den Fronius-Wechselrichter

Download: >>> [hier](SolarEdgeV1.0.js)

## Kurzbeschreibung
Das Widget für den SolarEdge-Wechselrichter liest ausgewählte Betriebsdaten über die API-Schnittstelle der Webseite für das Monitoring des Wechselrichters aus 
"https://monitoring.solaredge.com/solaredge-web/p/login", und stellt diese in einer Übersicht zur Verfügung. 
Das Script läuft mit Unterstützung der **App Scriptable** auf dem iPhone ab **iOS14**.

- **Aktuell** in kW, aktuelle Erzeugung einer PV-Anlage
- **Heute** in kWh, Erzeugung der PV-Anlage an diesem Tag (Tagessumme)
- **Monat** in kWh, Erzeugung der PV-Anlage in diesem Monat (Monatssumme)
- **Jahr** in MWh, Erzeugung der PV-Anlage an diesem Jahr (Jahressumme)
- **Life** in MWh, Erzeugung der PV-Anlage seit der Inbetriebnahme (Totalsumme, Lebenszeit-Summe)

Zur Beachtung: Die Betriebsdaten des Wechselrichter werden auch angezeigt, wenn sich das iPhone nicht im Empfangsbereich des WLAN befindet.

## Settings, Parameter
Im Script sind in der oberen Zeile in der **APIurl** für den Zugriif auf den SolarEdge-Wechselrichter die folgenden Parameter einzugeben:

- **Anlagennummer:** - 999999, das ist die Anlagennummer des SE-Wechselrichters, die nach Freigabe in der Konfiguration der Webseite angezeigt wird.
- **Key:** - XXXXXXXXXXXXXXXXXXXXXXX, das ist der Sicherheitsschlüssel, den man der Konfigurationsseite des Wechselrichters entnehmen kann.

## API-Schnittstelle

````APIurl = "https://monitoringapi.solaredge.com/site/999999/overview?api_key=XXXXXXXXXXXXXXXXXXXXXXXXXX"````

Die ausgelesenen Daten werden zur Anzeige gebracht, eine Speicherung der Daten durch das Widget, bspw. in einer Datenbank für die Visualisierung von Trends, erfolgt nicht.

Die folgenden JSON-Daten der Batterie werden verarbeitet:

##### JSON

````
{
  "overview":{
       "lastUpdateTime":"2013-10-01 02:37:47", 
       "lifeTimeData": {
            "energy":761985.75,
            "revenue":946.13104 
        },
        "lastYearData":{ 
            "energy":761985.8, 
            "revenue":0.0
        },
        "lastMonthData":{
            "energy":492736.7,
            "revenue":0.0
        },
        "lastDayData":{
            "energy":0.0,
            "revenue":0.0 
        },
        "currentPower":{
            "power":0.0
        }
}
````
## Changelog

2020/11/11: SolarEdge V1.0 (Widget) init
