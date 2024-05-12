const fs = require("fs")
const yesterday = new Date()
yesterday.setDate(yesterday.getDate()-1)
//only 1 file der needed depnding on environment
const fileDer = ""
//const fileDer = "Documents/fitnessData/"

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

storeWeight()
