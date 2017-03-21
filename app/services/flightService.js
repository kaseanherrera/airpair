//this service is to make calls to the back end. all user related calls should go here 


class flightService {

    constructor() {
        this.endpoints = {
            flightInfo: "https://i1yr7owcya.execute-api.us-west-2.amazonaws.com/dev/flights",
        }
    }

    GetFlightInfo(airlineCode, month, day, year, flightNumber, callback) {
        var endpoint = this.endpoints.flightInfo;

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                airlineCode: airlineCode,
                month : month,
                day : day,
                year : year,
                flightNumber : flightNumber
            })
        }).then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
        callback(null, responseJson);
      }).catch((error) => {
            console.log("got error" + error);
            callback(error, null);
        });
    }

}

module.exports = flightService;