import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1Ijoia2lsb2F6b2xkZWNrIiwiYSI6ImNrOGhlbThwdDAwMHUzaG5sY2xhNHd6c2UifQ.OC04gE7Wqbqa_ftbrDY6-Q");

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
            <MapboxGL.MapView style={styles.map}/>
        </View>
{/*         
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
        

        <Button
          color="#00ff11"
          title="Logout"
          onPress={() => this.signOut()}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  mapContainer:{
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map:{
    flex:1
  }
});