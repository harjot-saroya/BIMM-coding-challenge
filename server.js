const express = require('express')
const cors = require('cors')
const xml2js = require('xml2js')
const bodyParser = require('body-parser');
const request = require('request-promise')
const fs = require('fs')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const getInformationById = async (makeId, makeName) => {
    let xmlString = ''
    try {
        xmlString = await request({
            uri: `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`,
            headers: { 'user-agent': "Google" },
            timeout: 10000,
            forever: true,
            json: true,
            gzip: true
        });
    }
    catch (exception) {
    }

    return [xmlString, makeName]
}

const parseMake = async (xmlString) => {
    const parsed = await xml2js.parseStringPromise(xmlString)
    return parsed
}
const MakeTemplate = (items) => {
    const form = '[' + items.map((item) => {
        const vehicleTypes = (item.vehicleTypes) ? JSON.stringify(item.vehicleTypes) : [];
        return `{
            "makeId": "${item.makeId}",
            "makeName":"${item.makeName}",
            "vehicleTypes": ${vehicleTypes}
        }`
    }) + ']'


    console.log('writefile', fs.writeFile('./results.js', form, err => {
        if (err) {
            console.error(err);
        }
        console.log('Finished write')
    })
    return form
}
app.get('/', async (req, res) => {

    let xml_string = fs.readFileSync('./getAllMakes.xml', "utf8");
    const parser2 = await xml2js.parseStringPromise(xml_string)
    const Response = parser2.Response.Results[0].AllVehicleMakes
    const vehicleMakes = Response.map((element) => { return { makeName: element.Make_Name[0], makeId: element.Make_ID[0] } })
    const ids = vehicleMakes.map((element) => { return { makeId: element.makeId, makeName: element.makeName } })
    const resmap = ids.map((id) => { return getInformationById(id.makeId, id.makeName) })
    const test = await Promise.all(resmap)
    const nonEmptyMakes = test.filter((element) => element[0] != '')
    const convertedMakes = nonEmptyMakes.map(async (element) => {
        const parsed = await parseMake(element[0])
        const makeName = element[1]
        const makeId = await parsed.Response.SearchCriteria[0].slice(9)
        const vehicleTypes = await parsed.Response.Results[0].VehicleTypesForMakeIds
        return { parsed, makeId, vehicleTypes, makeName }

    }
    )
    const parsedMakes = await Promise.all(convertedMakes);

    const Form = MakeTemplate(parsedMakes)
    res.send(Form)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})