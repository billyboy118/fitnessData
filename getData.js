const fs = require("fs")
const{GarminConnect } = require('garmin-connect')
//only 1 file der needed depnding on environment
const fileDer = ""
//const fileDer = "Documents/fitnessData/"
const yesterday = new Date()
yesterday.setDate(yesterday.getDate()-1)

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

getData()
