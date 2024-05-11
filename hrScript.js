 //This file should be run from root

const fs = require("fs")
const yesterday = new Date()
const fileDer = "Documents/fitnessData/"
const{GarminConnect } = require('garmin-connect')

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

const = testActivity {}

asyns function getActivity () {
         //Login
        //const GCClient = new GarminConnect()
        //await GCClient.login()
        //const userProfile = await GCClient.getUserProfile()


        //Load in existing data
        activityFile = fs.readFileSync(fileDer+"activityAppend.json")
        activityFile =  JSON.parse(hrFile)
	
	//Download data from the previous day
	dailyActivity = await 
	

}

async function getHr() {
	//Login
	const GCClient = new GarminConnect()
        await GCClient.login()
        //const userProfile = await GCClient.getUserProfile()

	
	//Load in existing data
	hrFile = fs.readFileSync(fileDer+"hrAppend.json")
	hrFile =  JSON.parse(hrFile)

	// Download the data from the previous day
	dailyHr = await GCClient.getHeartRate(yesterday)
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



const testActivity ()
{
  activityId: 15323842016,
  activityName: 'Hinckley and Bosworth Walking',
  description: null,
  startTimeLocal: '2024-05-10 15:21:37',
  startTimeGMT: '2024-05-10 14:21:37',
  activityType: {
    typeId: 9,
    typeKey: 'walking',
    parentTypeId: 17,
    isHidden: false,
    trimmable: true,
    restricted: false
  },
  eventType: { typeId: 9, typeKey: 'uncategorized', sortOrder: 10 },
  comments: null,
  parentId: null,
  distance: 4191.85986328125,
  duration: 6410.35888671875,
  elapsedDuration: 6410.35888671875,
  movingDuration: 3328,
  elevationGain: 66.30000001192093,
  elevationLoss: 68.52999997138977,
  averageSpeed: 0.6539999842643738,
  maxSpeed: 1.6699999570846558,
  startLatitude: 52.67179671674967,
  startLongitude: -1.2298758141696453,
  hasPolyline: true,
  hasImages: false,
  ownerId: 78210337,
  ownerDisplayName: 'c35855c7-79d1-473b-8f72-58be45d63668',
  ownerFullName: 'William',
  ownerProfileImageUrlSmall: 'https://s3.amazonaws.com/garmin-connect-prod/profile_images/069a0da6-7023-4be8-a0c1-881e91c3bfe0-78210337.png',
  ownerProfileImageUrlMedium: 'https://s3.amazonaws.com/garmin-connect-prod/profile_images/ebdbb5f4-afc3-4290-ac17-a55056d0abd5-78210337.png',
  ownerProfileImageUrlLarge: 'https://s3.amazonaws.com/garmin-connect-prod/profile_images/6763cbe3-662f-4eab-a91d-825c87af64ad-78210337.png',
  calories: 402,
  bmrCalories: 176,
  averageHR: 71,
  maxHR: 107,
  averageRunningCadenceInStepsPerMinute: 47.234375,
  maxRunningCadenceInStepsPerMinute: 158,
  maxLapAvgRunCadence: null,
  averageBikingCadenceInRevPerMinute: null,
  maxBikingCadenceInRevPerMinute: null,
  averageSwimCadenceInStrokesPerMinute: null,
  maxSwimCadenceInStrokesPerMinute: null,
  averageSwolf: null,
  activeLengths: null,
  steps: 5712,
  conversationUuid: null,
  conversationPk: null,
  numberOfActivityLikes: null,
  numberOfActivityComments: null,
  likedByUser: null,
  commentedByUser: null,
  activityLikeDisplayNames: null,
  activityLikeFullNames: null,
  activityLikeProfileImageUrls: null,
  requestorRelationship: null,
  userRoles: [
    'SCOPE_GOLF_API_READ',
    'SCOPE_ATP_READ',
    'SCOPE_DIVE_API_WRITE',
    'SCOPE_COMMUNITY_COURSE_ADMIN_READ',
    'SCOPE_DIVE_API_READ',
    'SCOPE_DI_OAUTH_2_CLIENT_READ',
    'SCOPE_CONNECT_WRITE',
    'SCOPE_MESSAGE_GENERATION_READ',
    'SCOPE_DI_OAUTH_2_CLIENT_REVOCATION_ADMIN',
    'SCOPE_CONNECT_WEB_TEMPLATE_RENDER',
    'SCOPE_CONNECT_NON_SOCIAL_SHARED_READ',
    'SCOPE_CONNECT_READ',
    'SCOPE_DI_OAUTH_2_TOKEN_ADMIN',
    'ROLE_CONNECTUSER',
    'ROLE_FITNESS_USER',
    'ROLE_WELLNESS_USER',
    'ROLE_OUTDOOR_USER'
  ],
  privacy: { typeId: 2, typeKey: 'private' },
  userPro: false,
  courseId: null,
  poolLength: null,
  unitOfPoolLength: null,
  hasVideo: false,
  videoUrl: null,
  timeZoneId: 159,
  beginTimestamp: 1715350897000,
  sportTypeId: 11,
  avgPower: null,
  maxPower: null,
  aerobicTrainingEffect: 0.20000000298023224,
  anaerobicTrainingEffect: 0,
  strokes: null,
  normPower: null,
  leftBalance: null,
  rightBalance: null,
  avgLeftBalance: null,
  max20MinPower: null,
  avgVerticalOscillation: null,
  avgGroundContactTime: null,
  avgStrideLength: 82.08725587251078,
  avgFractionalCadence: null,
  maxFractionalCadence: null,
  trainingStressScore: null,
  intensityFactor: null,
  vO2MaxValue: 51,
  avgVerticalRatio: null,
  avgGroundContactBalance: null,
  lactateThresholdBpm: null,
  lactateThresholdSpeed: null,
  maxFtp: null,
  avgStrokeDistance: null,
  avgStrokeCadence: null,
  maxStrokeCadence: null,
  workoutId: null,
  avgStrokes: null,
  minStrokes: null,
  deviceId: 3353433028,
  minTemperature: 29,
  maxTemperature: 35,
  minElevation: 99.4000015258789,
  maxElevation: 128.60000610351562,
  avgDoubleCadence: null,
  maxDoubleCadence: 158,
  summarizedExerciseSets: null,
  maxDepth: null,
  avgDepth: null,
  surfaceInterval: null,
  startN2: null,
  endN2: null,
  startCns: null,
  endCns: null,
  summarizedDiveInfo: {
    weight: null,
    weightUnit: null,
    visibility: null,
    visibilityUnit: null,
    surfaceCondition: null,
    current: null,
    waterType: null,
    waterDensity: null,
    summarizedDiveGases: [],
    totalSurfaceTime: null
  },
  activityLikeAuthors: null,
  avgVerticalSpeed: null,
  maxVerticalSpeed: 0.399993896484375,
  floorsClimbed: null,
  floorsDescended: null,
  manufacturer: 'GARMIN',
  diveNumber: null,
  locationName: 'Hinckley and Bosworth',
  bottomTime: null,
  lapCount: 3,
  endLatitude: 52.67147778533399,
  endLongitude: -1.2295567151159048,
  minAirSpeed: null,
  maxAirSpeed: null,
  avgAirSpeed: null,
  avgWindYawAngle: null,
  minCda: null,
  maxCda: null,
  avgCda: null,
  avgWattsPerCda: null,
  flow: null,
  grit: null,
  jumpCount: null,
  caloriesEstimated: null,
  caloriesConsumed: null,
  waterEstimated: 863,
  waterConsumed: null,
  maxAvgPower_1: null,
  maxAvgPower_2: null,
  maxAvgPower_5: null,
  maxAvgPower_10: null,
  maxAvgPower_20: null,
  maxAvgPower_30: null,
  maxAvgPower_60: null,
  maxAvgPower_120: null,
  maxAvgPower_300: null,
  maxAvgPower_600: null,
  maxAvgPower_1200: null,
  maxAvgPower_1800: null,
  maxAvgPower_3600: null,
  maxAvgPower_7200: null,
  maxAvgPower_18000: null,
  excludeFromPowerCurveReports: null,
  totalSets: null,
  activeSets: null,
  totalReps: null,
  minRespirationRate: null,
  maxRespirationRate: null,
  avgRespirationRate: null,
  trainingEffectLabel: 'UNKNOWN',
  activityTrainingLoad: 2.664337158203125,
  avgFlow: null,
  avgGrit: null,
  minActivityLapDuration: 1060.2080078125,
  avgStress: null,
  startStress: null,
  endStress: null,
  differenceStress: null,
  maxStress: null,
  aerobicTrainingEffectMessage: 'NO_AEROBIC_BENEFIT_18',
  anaerobicTrainingEffectMessage: 'NO_ANAEROBIC_BENEFIT_0',
  splitSummaries: [],
  hasSplits: false,
  maxBottomTime: null,
  hasSeedFirstbeatProfile: null,
  calendarEventId: null,
  calendarEventUuid: null,
  groupRideUUID: null,
  avgGradeAdjustedSpeed: null,
  avgWheelchairCadence: null,
  maxWheelchairCadence: null,
  avgJumpRopeCadence: null,
  maxJumpRopeCadence: null,
  gameName: null,
  differenceBodyBattery: null,
  gameType: null,
  curatedCourseId: null,
  matchedCuratedCourseId: null,
  purposeful: false,
  pr: false,
  manualActivity: false,
  autoCalcCalories: false,
  elevationCorrected: false,
  atpActivity: false,
  favorite: false,
  decoDive: false,
  parent: false
}
{
  activityId: 15323842016,
  activityName: 'Hinckley and Bosworth Walking',
  description: null,
  startTimeLocal: '2024-05-10 15:21:37',
  startTimeGMT: '2024-05-10 14:21:37',
  activityType: {
    typeId: 9,
    typeKey: 'walking',
    parentTypeId: 17,
    isHidden: false,
    trimmable: true,
    restricted: false
  },
  eventType: { typeId: 9, typeKey: 'uncategorized', sortOrder: 10 },
  comments: null,
  parentId: null,
  distance: 4191.85986328125,
  duration: 6410.35888671875,
  elapsedDuration: 6410.35888671875,
  movingDuration: 3328,
  elevationGain: 66.30000001192093,
  elevationLoss: 68.52999997138977,
  averageSpeed: 0.6539999842643738,
  maxSpeed: 1.6699999570846558,
  startLatitude: 52.67179671674967,
  startLongitude: -1.2298758141696453,
  hasPolyline: true,
  hasImages: false,
  ownerId: 78210337,
  ownerDisplayName: 'c35855c7-79d1-473b-8f72-58be45d63668',
  ownerFullName: 'William',
  ownerProfileImageUrlSmall: 'https://s3.amazonaws.com/garmin-connect-prod/profile_images/069a0da6-7023-4be8-a0c1-881e91c3bfe0-78210337.png',
  ownerProfileImageUrlMedium: 'https://s3.amazonaws.com/garmin-connect-prod/profile_images/ebdbb5f4-afc3-4290-ac17-a55056d0abd5-78210337.png',
  ownerProfileImageUrlLarge: 'https://s3.amazonaws.com/garmin-connect-prod/profile_images/6763cbe3-662f-4eab-a91d-825c87af64ad-78210337.png',
  calories: 402,
  bmrCalories: 176,
  averageHR: 71,
  maxHR: 107,
  averageRunningCadenceInStepsPerMinute: 47.234375,
  maxRunningCadenceInStepsPerMinute: 158,
  maxLapAvgRunCadence: null,
  averageBikingCadenceInRevPerMinute: null,
  maxBikingCadenceInRevPerMinute: null,
  averageSwimCadenceInStrokesPerMinute: null,
  maxSwimCadenceInStrokesPerMinute: null,
  averageSwolf: null,
  activeLengths: null,
  steps: 5712,
  conversationUuid: null,
  conversationPk: null,
  numberOfActivityLikes: null,
  numberOfActivityComments: null,
  likedByUser: null,
  commentedByUser: null,
  activityLikeDisplayNames: null,
  activityLikeFullNames: null,
  activityLikeProfileImageUrls: null,
  requestorRelationship: null,
  userRoles: [
    'SCOPE_GOLF_API_READ',
    'SCOPE_ATP_READ',
    'SCOPE_DIVE_API_WRITE',
    'SCOPE_COMMUNITY_COURSE_ADMIN_READ',
    'SCOPE_DIVE_API_READ',
    'SCOPE_DI_OAUTH_2_CLIENT_READ',
    'SCOPE_CONNECT_WRITE',
    'SCOPE_MESSAGE_GENERATION_READ',
    'SCOPE_DI_OAUTH_2_CLIENT_REVOCATION_ADMIN',
    'SCOPE_CONNECT_WEB_TEMPLATE_RENDER',
    'SCOPE_CONNECT_NON_SOCIAL_SHARED_READ',
    'SCOPE_CONNECT_READ',
    'SCOPE_DI_OAUTH_2_TOKEN_ADMIN',
    'ROLE_CONNECTUSER',
    'ROLE_FITNESS_USER',
    'ROLE_WELLNESS_USER',
    'ROLE_OUTDOOR_USER'
  ],
  privacy: { typeId: 2, typeKey: 'private' },
  userPro: false,
  courseId: null,
  poolLength: null,
  unitOfPoolLength: null,
  hasVideo: false,
  videoUrl: null,
  timeZoneId: 159,
  beginTimestamp: 1715350897000,
  sportTypeId: 11,
  avgPower: null,
  maxPower: null,
  aerobicTrainingEffect: 0.20000000298023224,
  anaerobicTrainingEffect: 0,
  strokes: null,
  normPower: null,
  leftBalance: null,
  rightBalance: null,
  avgLeftBalance: null,
  max20MinPower: null,
  avgVerticalOscillation: null,
  avgGroundContactTime: null,
  avgStrideLength: 82.08725587251078,
  avgFractionalCadence: null,
  maxFractionalCadence: null,
  trainingStressScore: null,
  intensityFactor: null,
  vO2MaxValue: 51,
  avgVerticalRatio: null,
  avgGroundContactBalance: null,
  lactateThresholdBpm: null,
  lactateThresholdSpeed: null,
  maxFtp: null,
  avgStrokeDistance: null,
  avgStrokeCadence: null,
  maxStrokeCadence: null,
  workoutId: null,
  avgStrokes: null,
  minStrokes: null,
  deviceId: 3353433028,
  minTemperature: 29,
  maxTemperature: 35,
  minElevation: 99.4000015258789,
  maxElevation: 128.60000610351562,
  avgDoubleCadence: null,
  maxDoubleCadence: 158,
  summarizedExerciseSets: null,
  maxDepth: null,
  avgDepth: null,
  surfaceInterval: null,
  startN2: null,
  endN2: null,
  startCns: null,
  endCns: null,
  summarizedDiveInfo: {
    weight: null,
    weightUnit: null,
    visibility: null,
    visibilityUnit: null,
    surfaceCondition: null,
    current: null,
    waterType: null,
    waterDensity: null,
    summarizedDiveGases: [],
    totalSurfaceTime: null
  },
  activityLikeAuthors: null,
  avgVerticalSpeed: null,
  maxVerticalSpeed: 0.399993896484375,
  floorsClimbed: null,
  floorsDescended: null,
  manufacturer: 'GARMIN',
  diveNumber: null,
  locationName: 'Hinckley and Bosworth',
  bottomTime: null,
  lapCount: 3,
  endLatitude: 52.67147778533399,
  endLongitude: -1.2295567151159048,
  minAirSpeed: null,
  maxAirSpeed: null,
  avgAirSpeed: null,
  avgWindYawAngle: null,
  minCda: null,
  maxCda: null,
  avgCda: null,
  avgWattsPerCda: null,
  flow: null,
  grit: null,
  jumpCount: null,
  caloriesEstimated: null,
  caloriesConsumed: null,
  waterEstimated: 863,
  waterConsumed: null,
  maxAvgPower_1: null,
  maxAvgPower_2: null,
  maxAvgPower_5: null,
  maxAvgPower_10: null,
  maxAvgPower_20: null,
  maxAvgPower_30: null,
  maxAvgPower_60: null,
  maxAvgPower_120: null,
  maxAvgPower_300: null,
  maxAvgPower_600: null,
  maxAvgPower_1200: null,
  maxAvgPower_1800: null,
  maxAvgPower_3600: null,
  maxAvgPower_7200: null,
  maxAvgPower_18000: null,
  excludeFromPowerCurveReports: null,
  totalSets: null,
  activeSets: null,
  totalReps: null,
  minRespirationRate: null,
  maxRespirationRate: null,
  avgRespirationRate: null,
  trainingEffectLabel: 'UNKNOWN',
  activityTrainingLoad: 2.664337158203125,
  avgFlow: null,
  avgGrit: null,
  minActivityLapDuration: 1060.2080078125,
  avgStress: null,
  startStress: null,
  endStress: null,
  differenceStress: null,
  maxStress: null,
  aerobicTrainingEffectMessage: 'NO_AEROBIC_BENEFIT_18',
  anaerobicTrainingEffectMessage: 'NO_ANAEROBIC_BENEFIT_0',
  splitSummaries: [],
  hasSplits: false,
  maxBottomTime: null,
  hasSeedFirstbeatProfile: null,
  calendarEventId: null,
  calendarEventUuid: null,
  groupRideUUID: null,
  avgGradeAdjustedSpeed: null,
  avgWheelchairCadence: null,
  maxWheelchairCadence: null,
  avgJumpRopeCadence: null,
  maxJumpRopeCadence: null,
  gameName: null,
  differenceBodyBattery: null,
  gameType: null,
  curatedCourseId: null,
  matchedCuratedCourseId: null,
  purposeful: false,
  pr: false,
  manualActivity: false,
  autoCalcCalories: false,
  elevationCorrected: false,
  atpActivity: false,
  favorite: false,
  decoDive: false,
  parent: false
}

