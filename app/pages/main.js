'user strict';
import Autocomplete from 'react-native-autocomplete-input';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';


var baseStyles = require('../styles/base');
var flightService = require('../services/flightService');
var FlightService = new flightService();

class mainPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: '',
      flights : [],
      showFlightInfo : false,
      flightInfo : ''
    };
  }

 


  componentDidMount() {
    fetch("https://i1yr7owcya.execute-api.us-west-2.amazonaws.com/dev/airports").then(res => res.json()).then((json) => {
      console.log(json);
      const { Items: flights } = json;
      this.setState({ flights });
    });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { flights } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return flights.filter(flight => flight.name.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const flights = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      
    <View style={styles.container}>
        <Text style = {styles.title}>
            Search Flight
        </Text>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={flights.length === 1 && comp(query, flights[0].name) ? [] : flights}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter the name of the departing airport"
          renderItem={(data) => (
            <TouchableOpacity onPress={() => this.setState({ query: data.name })}>
              <Text style={styles.itemText}>
                {data.city}, {data.state}, {data.name}, {data.code}

              </Text>
                
            </TouchableOpacity>
          )}
        />

        <View style = {styles.dateAndFlightView}>
            <TextInput
            onChangeText={(text) => this.setState({ flightNumber : text })}
            style={styles.flightNumberInput}
            keyboardAppearance="dark"
            />

            <TextInput
                onChangeText={(text) => this.setState({ date : text })}
                style={styles.dateInput}
                keyboardAppearance="dark"
            />
        </View>


         <TouchableHighlight
                    style={styles.searchButton}
                    onPress={this.searchFlight.bind(this)}>
                    <Text>
                        search flights
                    </Text>
        </TouchableHighlight>

        {this.state.showFlightInfo && 
            
        <View style = {styles.flightTile}> 
            <View style = {styles.flightTileRowOne}> 
                 <View style = {styles.airlinesTimes}> 
                    <Text>
                        {this.state.airLine}
                    </Text>
                    <Text>
                        {this.state.departureTime} - {this.state.arrivalTime}
                    </Text>
                </View>
                 <View style = {styles.airportStopsContainer}> 
                    <Text>
                        {this.state.arrivalAirportCode} - {this.state.departureAirportCode}
                    </Text>
                     <Text>
                        {this.state.numberOfStops} stops
                    </Text>
                </View>
            </View>
            <View style = {styles.rowTwo}> 
                <Text>
                {this.state.numberOfBags} extra check-space available 
                </Text>
            </View>
        </View>
        }
    </View>
    );
  }

  searchFlight = () => {
      console.log("making service call");
      FlightService.GetFlightInfo("F9", "03", "23","2017", "408", (error, data) => {
            if(error){
                console.log(error, "error from the signup call");
            }
            else{
                console.log(JSON.stringify(data.body));
          
                 this.setState({arrivalTime : '12:56 PM'});
                 this.setState({departureTime : '5:00 AM'});
                this.setState({departureAirportCode : 'LAX'});
                 this.setState({arrivalAirportCode : 'MIA'});
                  this.setState({numberOfStops : '1'});
                   this.setState({numberOfBags : '7'});
                    this.setState({airLine : 'American AirLines'});
                            this.setState({showFlightInfo : true});
               
            }
        });
  }
}


var styles = StyleSheet.create({
    rowTwo : {
        marginTop : 30,
        marginLeft : 20
    },
    flightTile : {
        borderColor : 'black',
        marginTop : 10,
        marginLeft : 10,
        marginRight : 10,
        height : 120,
         backgroundColor: 'white',
         borderColor : 'gray',
        borderWidth : 1
    },
    airportStopsContainer : {
             alignItems: 'flex-end',
             justifyContent : 'flex-end',
             marginLeft : 120
    },
    flightTileRowOne : {
        marginTop : 20,
        marginLeft : 20,
          flexDirection: 'row'
    },
    airportCity : {
        fontSize : 10
    },
    searchButton : {
        marginTop: 10,
        height: 50,
        width : 200,
        alignSelf : 'center',
        justifyContent: 'center',
        backgroundColor: '#9B9B9B'
    },
    dateAndFlightView : {
        flexDirection: 'row'
    },
    title : {
        fontSize : 25,
        color : '#FFFFFF',
        alignSelf : 'center',
        marginTop : 30
        
    },
   container: {
    backgroundColor: 'white',
    flex: 1
  },
  flightNumberInput : {
        height: 30,
        marginTop: 10,
        marginLeft : 10,
        marginRight : 5,
        width: 172,
        alignSelf: 'flex-start',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black',
        borderColor : 'gray',
        borderWidth : 1
  },
  dateInput : {
        height: 30,
        marginTop: 10,
        width: 172,
        marginLeft : 5,
        marginRight : 10,
        alignSelf: 'flex-end',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
         borderColor : 'gray',
        borderWidth : 1
  },
  autocompleteContainer: {
        
    marginLeft: 10,
    marginRight: 10,
    marginTop : 5
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
    
})
module.exports = mainPage;