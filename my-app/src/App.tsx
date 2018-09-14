import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import './App.css';
import cloud from './images/cloud.png';
import partly_cloud from './images/partly_cloud.png';
import rain from './images/rain.png';
import snowy from './images/snowy.png';
import storm from './images/storm.png';
import sunny from './images/sunny.png';
import windy from './images/windy.png';


interface IState {
  image: any,
  condition: any,
  results: any,
  unit_pressure: any,
  unit_speed: any,
  unit_temperature: any,
  pressure:any, 
  wind_speed: any,
  wind_direction: any,
  date: any,
  temp: any,
  text: any,
  city: any,
  location_city: any,
  value: any,
  country: any,
  humidity: any,
  sunset: any,
  sunrise: any,
  temp_high: any,
  temp_low: any,
}

export default class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
  
    this.state = {
      image: "",
      condition: "",
      results: <CircularProgress thickness={3} />,
      city: "",
      value: "",
      date: "",
      temp: "",
      text: "",
      location_city: "",
      country: "",
      unit_pressure: "",
      unit_speed: "",
      unit_temperature: "",
      pressure: "",
      wind_speed: "",
      wind_direction: "",
      temp_high: "",
      temp_low: "",
      humidity: "",
      sunrise: "",
      sunset: "",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  public upload() {
    const searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + this.state.city + "') and u='c'"
    
    
    fetch("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json", {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },

    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText}) 
      }
      else {
        response.json().then((data:any) => this.setState({
          condition: data.query.results.channel.item.condition.code,
          pressure: data.query.results.channel.atmosphere.pressure,
          humidity: data.query.results.channel.atmosphere.humidity,
          sunrise: data.query.results.channel.astronomy.sunrise,
          sunset: data.query.results.channel.astronomy.sunset,
          wind_direction: data.query.results.channel.wind.direction,
          wind_speed: data.query.results.channel.wind.speed,
          temp_high: data.query.results.channel.item.forecast[0].high,
          temp_low: data.query.results.channel.item.forecast[0].low,
          unit_pressure: data.query.results.channel.units.pressure,
          unit_speed: data.query.results.channel.units.speed,
          unit_temperature: data.query.results.channel.units.temperature,
          location_city: data.query.results.channel.location.city,
          country: data.query.results.channel.location.country,
          date: data.query.results.channel.item.condition.date,
          temp: data.query.results.channel.item.condition.temp, 
          text: data.query.results.channel.item.condition.text}, this.weather))
        
      }
      return response
    })
  }
  
  public weather(){
    if(((((this.state.condition <= 4 || this.state.condition === 17 )|| this.state.condition === 35 )|| (37 <= this.state.condition && this.state.condition <= 39) )|| this.state.condition === 45 )|| this.state.condition === 47){
      this.setState({image: storm})
    }
    else if((((this.state.condition ===7 || (13 <= this.state.condition && this.state.condition <=16) )|| this.state.condition === 18 )|| (41 <= this.state.condition && this.state.condition <= 43) )|| this.state.condition ===46 ){
      this.setState({image: snowy})
    }
    else if(this.state.condition <= 12 || this.state.condition === 40){
      this.setState({image: rain})
    }
    else if((19<=this.state.condition && this.state.condition<=22) || (26 <= this.state.condition && this.state.condition <= 28)){
      this.setState({image: cloud})
    }
    else if((29 <= this.state.condition && this.state.condition <= 30) || this.state.condition === 44){
      this.setState({image: partly_cloud})
    }
    else if(23 <= this.state.condition && this.state.condition<= 25){
      this.setState({image: windy})
    }
    else if((31 <= this.state.condition && this.state.condition <= 32) || this.state.condition === 36){
      this.setState({image: sunny})
    }
    else{
      this.setState({image: "Image Error"})
    }
    this.setState({location_city: this.state.location_city + ", " + this.state.country})
    this.setState({temp: this.state.temp + "°" + this.state.unit_temperature})
    this.setState({temp_high: this.state.temp_high + "°" + this.state.unit_temperature})
    this.setState({temp_low: this.state.temp_low + "°" + this.state.unit_temperature})
    this.setState({wind_direction: this.state.wind_direction + "°"})
    this.setState({wind_speed: this.state.wind_speed + this.state.unit_speed})
    this.setState({pressure: this.state.pressure + this.state.unit_pressure})
    this.setState({humidity: this.state.humidity + "%"})
    this.setState({results: ""})
  }

  public handleChange(event: any) {
    this.setState({value: event.target.value})
  }
  
  public handleSubmit(event: any) {
    
    this.setState({city: this.state.value}, this.upload)
    event.preventDefault();
  }

  public render() {
    
    return (
      
      <div>
      
      <div className="container-fluid">

          <div className="centreText">
          
            <form onSubmit={this.handleSubmit}>
              <label>
                City: 
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Enter" />
            </form>
            <div className = "row">
              <p>{this.state.results}</p>
              <h1><h2><b>City: </b></h2>{this.state.location_city}</h1>

              <div className = "column">
                <img src={this.state.image} alt="weather"/>
                <p><b>Weather: </b>{this.state.text}</p>            
              </div>
              <div className = "column">
                <p><b>Date: </b>{this.state.date}</p>
                <p><b>Temperature: </b>{this.state.temp}</p>
                <p><b>High Temperature: </b>{this.state.temp_high}</p>
                <p><b>Low Temperature: </b>{this.state.temp_low}</p>
                <p><b>Sunrise: </b>{this.state.sunrise}</p>
                <p><b>Sunset: </b>{this.state.sunset}</p>
                
              </div>
              <div className = "column">
                <p><b>Wind Speed: </b>{this.state.wind_speed}</p>
                <p><b>Wind Direction: </b>{this.state.wind_direction}</p>
                <p><b>Pressure: </b>{this.state.pressure}</p>
                <p><b>Humidity: </b>{this.state.humidity}</p>
                
                
              </div>
            </div>
          </div>


      </div>
      <a href="https://www.yahoo.com/?ilc=401" target="_blank"> <img src="https://poweredby.yahoo.com/purple.png" width="134" height="29"/> </a>
      </div>
    );
  }
}