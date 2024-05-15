const fs = require("fs")
const yesterday = new Date()
yesterday.setDate(yesterday.getDate()-1)
//only 1 file der needed depnding on environment
//const fileDer = ""
const fileDer = "Documents/fitnessData/"

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

storeHr()

