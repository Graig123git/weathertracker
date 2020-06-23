import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import PopoverMessage from '../popOver/index';
import '../MapView/mapStyles.css';

// define API Url
const url = 'http://api.weatherstack.com/current?access_key=ee2aaf54e405b6221b12c03fbcdce406&query=';
/*
Google Map Class
*/
export class MapView extends Component {
	// Constructor with state varaibles
	constructor(props) {
		super(props);
		this.state = {
			center: {
				lat: 43.6858146,
				lng: -79.7599337,
			},
			weather_Icon: '',
			city: '',
			windSpeed: '',
			feelsLike: '',
			weather_Desriptions: '',
			userInput: '',
			Temperature: '',
		};
	}

	// Function used for API calls to get the current with detials
	getWeatherDetails = (event) => {
		// validate input to ensure it is not empty string
		if (this.state.userInput === '') {
			alert('Please Enter a Valid City');
			return;
		}
		// make API call
		fetch(url + this.state.userInput)
			.then((res) => res.json())
			.then((results) => {
				this.setDetails(results);
			})
			.catch((e) => alert('Please Enter a Valid City'));
	};
	// execute setstate
	setDetails = (results) => {
		// detsruct resut
		const { weather_icons, feelslike, wind_speed, weather_descriptions, temperature } = results.current;
		const { query } = results.request;
		const { lat, lon } = results.location;
		this.setState({
			weather_Desriptions: weather_descriptions,
			weather_Icon: weather_icons,
			feelsLike: feelslike,
			windSpeed: wind_speed,
			city: query,
			Temperature: temperature,
			center: {
				lat: parseInt(lat),
				lng: parseInt(lon),
			},
		});
	};

	// return JXS element
	render() {
		return (
			<div style={{ height: '100vh', width: '100%' }}>
				<div className='searchBar'>
					<div className=' mb-2'>
						<Input
							placeholder='Search City...'
							onChange={(e) => this.setState({ userInput: e.target.value })}
							value={this.state.userInput}
							style={{
								borderWidth: 'thin',
								borderRadius: '30px',
								height: 50,
								textAlign: 'center',
								fontSize: 14,
								fontWeight: 'bold',
							}}
						/>
					</div>
					<div className='btnContainer'>
						<Button
							style={{ borderWidth: 'thin', borderRadius: '30px', height: 50, textAlign: 'center', fontSize: 10 }}
							color='primary'
							size='sm'
							onClick={this.getWeatherDetails}
						>
							Search
						</Button>
					</div>
				</div>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyDwskfGKuKv8eNdhlXJwuoUPTP-TWWKgVw' }}
					center={this.state.center}
					defaultZoom={5}
					draggable={false}
				>
					<PopoverMessage
						description={this.state.weather_Desriptions}
						icon={this.state.weather_Icon}
						windspeed={this.state.windSpeed}
						feel={this.state.feelsLike}
						city={this.state.city}
						temperature={this.state.Temperature}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

//Export MapView Class
export default MapView;
