const fs = require("fs")
const{GarminConnect } = require('garmin-connect')
const yesterday = new Date()
yesterday.setDate(yesterday.getDate()-1)
//only 1 file der needed depnding on environment
const fileDer = ""
//const fileDer = "Documents/fitnessData/"


//get some activity data
async function getData() {
        const GCClient = new GarminConnect()
        
        await GCClient.login()

        //get activity data for previous day
        saveActivityFile = await GCClient.getActivities(
            0,
            3
        )
        //get HR data for previous day
        saveHrFile = await GCClient.getHeartRate(yesterday)
	
        //Get weight data
        saveWeightFile = await GCClient.getDailyWeightData(yesterday)
        //stringify all extracts 
        saveActivityFile = JSON.stringify(saveActivityFile)
        saveHrFile = JSON.stringify(saveHrFile)
        saveWeightFile = JSON.stringify(saveWeightFile)

        //Save all extracts
        fs.writeFile("testGarminActivityExtract.json", saveActivityFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); })
        fs.writeFile("testGarminHrExtract.json", saveHrFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); })
        fs.writeFile("testGarminWeightExtract.json", saveWeightFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); }) 
        }

function storeHr() {
	//Load in existing data
	hrFile = fs.readFileSync(fileDer+"hrAppend.json")
	hrFile =  JSON.parse(hrFile)
    console.log("Initial number of object in hrAppend: "+hrFile.length)

    //Load in daily data
    hrExtract = fs.readFileSync(fileDer+"testGarminHrExtract.json")
	hrExtract =  JSON.parse(hrExtract)

    delete hrExtract["heartRateValues"]
	delete hrExtract["heartRateValueDescriptors"]

    hrFile.push(hrExtract)
	console.log(hrExtract)
    console.log("Object in HR prior to save: "+hrFile.length)
    hrFile = JSON.stringify(hrFile)
    fs.writeFile(fileDer + "hrAppend.json", hrFile, (error) => { if(error) {console.error(error); throw error; } console.log("HR saved in root"); }) ;
	fs.writeFile(fileDer + "archive/hrAppend"+yesterday+ ".json", hrFile, (error) => { if(error) {console.error(error); throw error; } console.log("HR saved in Archive"); })
	fs.writeFile(fileDer + "uploadData/hrAppend.json", hrFile, (error) => { if(error) {console.error(error); throw error; } console.log("HR saved in upload"); })
}

function storeWeight(){
    let entry = {}

	weightFile = fs.readFileSync(fileDer+"weightAppend.json")
	weightFile = JSON.parse(weightFile)
    console.log("Initial number of object in weightAppend: "+weightFile.length)
    //Load in daily data
    weightExtract = fs.readFileSync(fileDer+"testGarminWeightExtract.json")
    weightExtract =  JSON.parse(weightExtract)
    //create variables and push 
    if(weightExtract["dateWeightList"][0] == null){
        console.log("No weight to record")
        return
    }
    weight = weightExtract["dateWeightList"][0]["weight"]
	weight = weight/1000
	datePeriod = weightExtract["startDate"]
	entry.weight = weight
	entry.date = datePeriod
    weightFile.push(entry)
    console.log(weightFile)

    console.log("Object in weight prior to save: "+weightFile.length)
    weightFile = JSON.stringify(weightFile)
    fs.writeFile(fileDer + "weightAppend.json", weightFile, (error) => { if(error) {console.error(error); throw error; } console.log("Weight saved in root"); }) ;
	fs.writeFile(fileDer + "archive/weightAppend"+yesterday+ ".json", weightFile, (error) => { if(error) {console.error(error); throw error; } console.log("Weight saved in Archive"); })
	fs.writeFile(fileDer + "uploadData/weightAppend.json", weightFile, (error) => { if(error) {console.error(error); throw error; } console.log("Weight saved in upload"); })
}


getData()

//storeHr()

//storeWeight()
