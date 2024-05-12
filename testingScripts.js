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

    // getActivityData()