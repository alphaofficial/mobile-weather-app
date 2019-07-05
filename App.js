import React from 'react';
import { StyleSheet, ImageBackground, Text, View, KeyboardAvoidingView, Platform, ActivityIndicator, StatusBar } from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather'
import { fetchLocationId, fetchWeather } from './utils/api';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    }
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({
        loading: true
      },
      async () => {
        try {
          const locationID = await fetchLocationId(city);
          const { location, weather, temperature } = await fetchWeather(
            locationID
          );

          this.setState({
            loading: false,
            error: false,
            location,
            weather,
            temperature
          });
        } catch (e) {
          this.setState({
            loading: false,
            error: true
          });
        }
      }
    );
  }


  render(){
    const { loading, error, location, weather, temperature } = this.state;
    //const temperature = "24°"
    return (
      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather('Clear')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
        <View style={styles.detailsContainer}>
        
        <ActivityIndicator size="large" color="#0000ff" animating={loading}/>

        {!loading && (
          <View>
            
            {error && (
              <Text style={[styles.smallText, styles.textStyle]}>
              Could not load weather, please try a different city.
              </Text>
            )}

            {!error && (
              <View>
                <Text style={[styles.largeText, styles.textStyle]}>
                {location}
                </Text>

                <Text style={[styles.smallText, styles.textStyle]}>
                {weather}
                </Text>

                <Text style={[styles.largeText, styles.textStyle]}>
                {`${Math.round(temperature)}°`}
                </Text>
              </View>
            )}

          <SearchInput
            placeholder="Search any city"
            onSubmit={this.handleUpdateLocation}
          />
        </View>
        )}
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
});
