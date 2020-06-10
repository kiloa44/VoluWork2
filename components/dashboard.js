import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import * as firebase from 'firebase';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1Ijoia2lsb2F6b2xkZWNrIiwiYSI6ImNrOTlxb2phYjAwdnIzbm51dmlreHFkM2gifQ.9FMgr8HYBwOnoSpjPxoxbg");

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid:'',
      users:{},
      positions:[],
      visible:true
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  getLocation=(uid)=>{
    firebase.database().ref('users/'+uid).on("value",snapshot=>{
      snapshot = snapshot.val();
      console.log("jjjjjj",snapshot)
      this.setState({coordinate:[snapshot.longitude,snapshot.latitude]},()=>{
        this.getUsersLoc()
      })
    })
  }

  getUsersLoc=()=>{
    firebase.database().ref('users/').on("value",snapshot=>{
      snapshot = snapshot.val();
      console.log(snapshot);

      let users = {}
      for (const id in snapshot){
        let user = snapshot[id]
        users[id]=[user.longitude,user.latitude]
      }
      this.setState({users:users},()=>{
        this.renderPositions()
      })

      // this.setState({coordinate:[snapshot.longitude,snapshot.latitude]})
    })
  }

  componentDidMount(){
    this.setState({ 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    },()=>{
      this.getLocation(this.state.uid);
    });
  }
  renderPositions=()=>{
    let positions = [];
    if(!!this.state.users){
    for (const id in this.state.users){
      console.log(id)
      positions.push(
        <MapboxGL.PointAnnotation
              coordinate={this.state.users[id]}
              id="pt-ann"
              onSelected={()=>{
                console.log('uid in point ===>>',id);
                this.setState({ visible: true });
              }}
              >
        </MapboxGL.PointAnnotation>
      )
    }
    this.setState({positions:positions})
    console.log("positions =====> ",positions);
  }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
        {!!this.state.coordinate && !!this.state.users?
            <MapboxGL.MapView style={styles.map}>
            
            <MapboxGL.Camera centerCoordinate={this.state.coordinate} zoomLevel={10}>
            </MapboxGL.Camera>
            {/* <MapboxGL.PointAnnotation
              coordinate={this.state.coordinate}
              id="pt-ann"
              onSelected={()=>{
                this.setState({ visible: true });
              }}
              >
            </MapboxGL.PointAnnotation> */}
            {this.state.positions}
            </MapboxGL.MapView>
            :[]
          }
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
              })}
            >
              <DialogContent>
                <Text>This is what I am talking about
                </Text>
              </DialogContent>
            </Dialog>
        </View>
{/*         
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
        <Text style = {styles.textStyle}>
          {this.state.lat}
        </Text>
        <Text style = {styles.textStyle}>
          {this.state.long}
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
    margin:15,
    height: 1000,
    width: 600,
    backgroundColor: "tomato"
  },
  map:{
    flex:1
  }
});