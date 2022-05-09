const express = require('express')
const cors = require('cors')
const axios = require('axios')
const xml2js = require('xml2js')
const request = require('request-promise')
// const https = require('https')
// const fs = require('fs')
const { type } = require('express/lib/response')
const app = express()
const port = 3001
// const parseXML = require('xml-parse-from-string')

//const info = require('./getallmakes.xml');

app.use(cors())
app.use(express.json())

app.post('/xmlParse', (req, res) => {
    console.log('Raw XML: ' + req.rawBody);
    console.log('Parsed XML: ' + JSON.stringify(req.body));
})

app.get('/', async (req, res) => {

    res.send('YUH YUH')
    let xml = ''
    //const file = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML')

    let resp = await request({
        uri: "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML",
        headers: {},
        timeout: 10000,
        json: true,
        gzip: true
    });
    // console.log(parseXML(resp))


    console.log('doc', xml)

    // const xmlString = file.data
    // const parser = new xml2js.Parser({ attrkey: "ATTR" });
    // let xml_string = fs.readFileSync(info, "utf8");

    // parser.parseString(xml_string, function (error, result) {
    //     if (error === null) {
    //         console.log(result);
    //     }
    //     else {
    //         console.log(error);
    //     }
    // });

    //console.log(x)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})