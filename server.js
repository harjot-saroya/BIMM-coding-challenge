const express = require('express')
const cors = require('cors')
const xml2js = require('xml2js')
const bodyParser = require('body-parser');
const request = require('request-promise')
const fs = require('fs')
const app = express()
const port = 3001
// const parseXML = require('xml-parse-from-string')

//const info = require('./getallmakes.xml');

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/xmlParse', (req, res) => {
    console.log('Raw XML: ' + JSON.stringify(req.body));
    res.send('hit')
})

app.get('/', async (req, res) => {

    res.send('YUH YUH')
    //const file = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML')

    let resp = await request({
        uri: "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML",
        headers: {},
        timeout: 10000,
        json: true,
        gzip: true
    });


    // const xmlString = file.data
    const parser = new xml2js.Parser({ attrkey: "ATTR" });
    let xml_string = fs.readFileSync('./test1.xml', "utf8");
    const parser2 = await xml2js.parseStringPromise(xml_string)
    const Response = parser2.Response.Results[0].AllVehicleMakes
    const vehicleMakes = Response.map((element) => { return { makeName: element.Make_Name[0], makeId: element.Make_ID[0] } })
    console.log(vehicleMakes)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})