import makes from './getallmakes.xml'

const testXMLParser = (file) => {
    console.log(file)
    fetch('/xmlParse', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml'
        },
        body: '<retrieveCustomer><id>39399444</id></retrieveCustomer>'
    })
        .then(response => {
            console.log('Response status: ' + response.status);
            return response.text();
        })
        .then(responseText => console.log('Response text: ' + responseText)
            .catch(error => console.log('Error caught: ' + error));
}

testXMLParser(makes)