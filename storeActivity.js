const fs = require("fs")

//test command for Windows comment out in AWS
//activityFile = fs.readFileSync("activityAppend.json")
//const fileDer = ""
const fileDer = "Documents/fitnessData/"

//read in ongoing activity file
activityFile = fs.readFileSync(fileDer+"activityAppend.json")
activityFile =  JSON.parse(activityFile)

//Load in the new data extract
//dataExtract = fs.readFileSync(fileDer+"garminActivityExtract.json")
dataExtract = fs.readFileSync(fileDer+"testGarminActivityExtract.json")

dataExtract = JSON.parse(dataExtract)


function getVariable() {
  actFileLength = activityFile.length
  console.log(actFileLength+ " entries in append file")
  if (actFileLength == 0 ){return}
  
  actIdNumber = 3
  elementNo = 3

  for (var i = 0; i < 5; i++) {
    actFileLength = actFileLength - 1
    activityIdAppend = activityFile[actFileLength]["activityId"]
    
    for (var ii = 0; ii < elementNo; ii++ ) {
      actIdNumber = actIdNumber - 1 
      activityIdExtract = dataExtract[actIdNumber]["activityId"]
      if (activityIdExtract == activityIdAppend){
        dataExtract.splice(actIdNumber,1)
      }
    }
    
    actIdNumber  = dataExtract.length
    elementNo = dataExtract.length
  }
}

function createEntries () {
  tempArray = []
  numEntries = dataExtract.length
  arrayNum = 0
  console.log(numEntries+ " to be added to append file")
  for (var i = 0; i < numEntries; i++) {
    tempArray.push({})
    tempArray[arrayNum]["activityId"] = dataExtract[arrayNum]["activityId"]
    tempArray[arrayNum]["activityName"] =  dataExtract[arrayNum]["activityName"]
    tempArray[arrayNum]["startTimeGMT"] =  dataExtract[arrayNum]["startTimeGMT"]
    tempArray[arrayNum]["typeKey"] =  dataExtract[arrayNum]["activityType"]["typeKey"]
    tempArray[arrayNum]["distance"] =  dataExtract[arrayNum]["distance"]
    tempArray[arrayNum]["duration"] =  dataExtract[arrayNum]["duration"]
    tempArray[arrayNum]["calories"] =  dataExtract[arrayNum]["calories"]
    tempArray[arrayNum]["bmrCalories"] =  dataExtract[arrayNum]["bmrCalories"]
    tempArray[arrayNum]["averageHR"] =  dataExtract[arrayNum]["averageHR"]
    tempArray[arrayNum]["maxHR"] =  dataExtract[arrayNum]["maxHR"]
    tempArray[arrayNum]["steps"] =  dataExtract[arrayNum]["steps"]
    tempArray[arrayNum]["aerobicTrainingEffect"] =  dataExtract[arrayNum]["aerobicTrainingEffect"]
    tempArray[arrayNum]["anaerobicTrainingEffect"] =  dataExtract[arrayNum]["anaerobicTrainingEffect"]
    tempArray[arrayNum]["vO2MaxValue"] =  dataExtract[arrayNum]["vO2MaxValue"]
    tempArray[arrayNum]["minTemperature"] =  dataExtract[arrayNum]["minTemperature"]
    tempArray[arrayNum]["maxTemperature"] =  dataExtract[arrayNum]["maxTemperature"]
    tempArray[arrayNum]["locationName"] =  dataExtract[arrayNum]["locationName"]
    
    arrayNum += 1    
  }
  console.log(tempArray)
}

function appendElements () {
  if (tempArray.length == 0) {
    console.log("there are no elements to add")
    return
  }
  console.log(activityFile.length +" Elements in append document")
  activityFile = activityFile.concat(tempArray)
  console.log(activityFile.length +" Elements after push")
  console.log(tempArray.length +" Elements added")
  saveFiles () 
} 

function saveFiles () {
  activityFile = JSON.stringify(activityFile)
	fs.writeFile(fileDer + "archive/activityAppend"+Date()+ ".json", activityFile, (error) => { if(error) {console.error(error); throw error; } console.log("Activity saved in Archive"); })
	fs.writeFile(fileDer + "activityAppend.json", activityFile, (error) => { if(error) {console.error(error); throw error; } console.log("Activity saved in root"); }) 
	fs.writeFile(fileDer + "uploadData/activityAppend.json", activityFile, (error) => { if(error) {console.error(error); throw error; } console.log("Activity saved in upload"); })
}

function writeToLog() {
  textToAppend = Date()+": activity script ran"
  fs.appendFile(fileDer+"scriptRunLog.txt", textToAppend, (err) => {})
}


getVariable()
if (dataExtract.length == 0 ) {
  console.log("No new activities")
  return
} else if (dataExtract.length > 0) {
  createEntries()
  appendElements()
}
writeToLog()