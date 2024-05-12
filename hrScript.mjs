 //This file should be run from root

const fs = import("fs")
const yesterday = new Date()
const fileDer = "Documents/fitnessData/"
//const{GarminConnect } = require('garmin-connect')

yesterday.setDate(yesterday.getDate()-1)


//this function will log in to garmin account
async function runLogin(){
        const GCClient = new GarminConnect()
	await GCClient.login();
        const userProfile = await GCClient.getUserProfile()
       // GCClient.exportTokenToFile('tokens');		
}

//Test data
const testHr = {userProfilePK: "billyboy",
    calendarDate: '2020-03-24',
    startTimestampGMT: '2020-03-24T00:00:00.0',
    endTimestampGMT: '2020-03-25T00:00:00.0',
    startTimestampLocal: '2020-03-24T00:00:00.0',
    endTimestampLocal: '2020-03-25T00:00:00.0',
    maxHeartRate: null,
    minHeartRate: null,
    restingHeartRate: 44,
    lastSevenDaysAvgRestingHeartRate: 50,
    heartRateValueDescriptors: null,
    heartRateValues: null
}

const testWeight = {
  startDate: '2024-05-08',
  endDate: '2024-05-08',
  dateWeightList: [
    {
      samplePk: 1715142684866,
      date: 1715146280000,
      calendarDate: '2024-05-08',
      weight: 94700,
      bmi: null,
      bodyFat: null,
      bodyWater: null,
      boneMass: null,
      muscleMass: null,
      physiqueRating: null,
      visceralFat: null,
      metabolicAge: null,
      sourceType: 'MANUAL',
      timestampGMT: 1715142680000,
      weightDelta: -997.9032139999949
    }
  ],
  totalAverage: {
    from: 1715126400000,
    until: 1715212799999,
    weight: 94700,
    bmi: null,
    bodyFat: null,
    bodyWater: null,
    boneMass: null,
    muscleMass: null,
    physiqueRating: null,
    visceralFat: null,
    metabolicAge: null
  }
}


async function getHr() {
	
	//Load in existing data
	hrFile = fs.readFileSync(fileDer+"hrAppend.json")
	hrFile =  JSON.parse(hrFile)

	// Download the data from the previous day
	//dailyHr = await GCClient.getHeartRate(yesterday)
	delete dailyHr["heartRateValues"]
	delete dailyHr["heartRateValueDescriptors"]
	//Apppend the new data
	hrFile.push(dailyHr)
	console.log(hrFile)
	//Save to file in the 2 locations
	hrFile = JSON.stringify(hrFile)
	fs.writeFile(fileDer + "hrAppend.json", hrFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); }) ;
	fs.writeFile(fileDer + "/archive/hrAppend"+yesterday+ ".json", hrFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); })
	fs.writeFile(fileDer + "/uploadData/hrAppend.json", hrFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); }) ;
	
console.log(hrFile.length)
}



async function getWeight(){
	let entry = {}

	weightFile = fs.readFileSync(fileDer+"weightAppend.json")
	weightFile = JSON.parse(weightFile)
	//Login to Garmin
	const GCClient = new GarminConnect()
  await GCClient.login()

	//get daily weight from Garmin
	dailyWeight = await GCClient.getDailyWeightData(yesterday)
	//create variables and push to temp variable
	weight = dailyWeight["dateWeightList"][0]["weight"]
	weight = weight/1000
	datePeriod = dailyWeight["startDate"]
	entry.weight = weight
	entry.date = datePeriod
	console.log(entry)
	console.log(weightFile)
	weightFile.push(entry)
	console.log(weightFile)
	
	weightFile = JSON.stringify(weightFile)
	fs.writeFile(fileDer + "/archive/weightAppend"+yesterday+ ".json", weightFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); })
	fs.writeFile(fileDer + "/weightAppend.json", weightFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); }) 
	fs.writeFile(fileDer + "/uploadData/weightAppend.json", weightFile, (error) => { if(error) {console.error(error); throw error; } console.log("done correct"); }) 
}
getHr()
getWeight()




const message = "hello"
export {message}