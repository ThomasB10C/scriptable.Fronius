/*
fronius.js V1.02
Please run Script with Scriptable with iOS14
Thomas Burchert, Charles Perley, MIT-Lizenz
Script/Widget nutzt die API von Fronius
Anzeige einer Uebersicht ausgewählter Daten der API

Gerätetyp: 
- für Fronius Wechselrichter GT
 
Parameter:
- IP-Adresse des Fronius Wechselrichters; bitte den Parameter in die untere URL eingeben
*/

const apiUrl = "http://xxx.xxx.xxx.xxx/solar_api/v1/GetPowerFlowRealtimeData.fcgi"


// Start
let widget = await createWidget()

if (!config.runsInWidget) {
  await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  let fm = FileManager.local()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, "scriptable-fronius.json")

  const list = new ListWidget()
  list.addSpacer(16)

  try {
    let r = new Request(apiUrl)
    // setting the mobile header
    r.headers = {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
    }
    
    let data, freshdata = 0
    try {
      // Fetch data from inverter 
      data = await r.loadJSON()
      // Write JSON to iCloud file
      fm.writeString(path, JSON.stringify(data, null, 2))
      freshdata= 1
    } catch (err) {
      // Read data from iCloud file
      data = JSON.parse(fm.readString(path), null)
      if (!data || !data.Body.Head.Timestamp){
        const errorList = new ListWidget()
        errorList.addText("Error: Check connection, the inverter is not reachable")
        return errorList
      }
    }
    
    // Prepare print 
    const line1 = list.addText("Fronius Data")
    line1.font = Font.boldSystemFont(14)
    list.addSpacer()
    
    const line2 = list.addText("Aktuell " + Math.round(data.Body.Data.Site.P_PV/10)/100 + " kW")
    line2.font = Font.mediumSystemFont(12)
    line2.textColor = Color.orange()
    
    const line3 = list.addText("Heute " + Math.round(data.Body.Data.Site.E_Day/10)/100 + " kWh")
    line3.font = Font.mediumSystemFont(12)
    
    const line4 = list.addText("Jahr " + Math.round(data.Body.Data.Site.E_Year/1000)/100 + " MWh")
    line4.font = Font.mediumSystemFont(12)
    
    const line5 = list.addText("Total " + Math.round(data.Body.Data.Site.E_Total/1000)/100 + " MWh")
    line5.font = Font.mediumSystemFont(12)
    
    // aktivieren, wenn eine Batterie-Verbindung konifiguriert wurde
    //const line6 = list.addText("SOC " + Math.round(data.Body.Data.Site.P_Akku) + " %")
    //line6.font = Font.mediumSystemFont(12)
    //line6.textColor = Color.green()
  
    list.addSpacer()
        
    if (freshdata == 0) {
      line1.textColor = Color.darkGray()
      line2.textColor = Color.darkGray()
      line3.textColor = Color.darkGray()
      line4.textColor = Color.darkGray()
      line5.textColor = Color.darkGray()
      //line6.textColor = Color.darkGray()
    }
    
  } catch(err) {
    list.addText("Fronius sleeps or Error fetching JSON")
  }

  // Add time of last widget refresh:
  list.addSpacer(3)
  const now = new Date();
  const timeLabel = list.addDate(now)
  timeLabel.font = Font.mediumSystemFont(10)
  timeLabel.centerAlignText()
  timeLabel.applyTimeStyle()
  timeLabel.textColor = Color.darkGray()
  
  return list
}

// Script end, please copy up to this point