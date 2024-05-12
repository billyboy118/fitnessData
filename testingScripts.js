const fs = require("fs")
//get some activity data
async function getActivityData() {
        const{GarminConnect } = require('garmin-connect')
        const GCClient = new GarminConnect()
        await GCClient.login()
        const activities = await GCClient.getActivities(
            0,
            3
        )

        var saveFile = JSON.stringify(activities)
        fs.writeFile("testGarminActivityExtract.json", saveFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); }) ;
    }

    //getActivityData()

//read in a file

async function readFile() {
    let filePath = "testGarminWeightExtract.json"
    fileName = fs.readFileSync(filePath)
    fileName = JSON.parse(fileName)
    console.log(fileName["dateWeightList"][0])
    fileName["dateWeightList"][0] = "hellow"
    console.log(fileName["dateWeightList"][0])
    console.log(fileName["dateWeightList"][0] == null)
}
readFile()


