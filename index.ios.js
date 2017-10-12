/**
 * Convoy is an event-planning app that allows users to create events, track their friends' locations, 
 * and give approximate arrival times.
 * 
 * @author Vincent Yao
 */

import React, { Component } from 'react';
import {
  DatePickerIOS,
  TextInput,
  Switch,
  Image,
  ScrollView,
  LayoutAnimation,
  StatusBar,
  NavigatorIOS,
  Alert,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Dimensions from 'Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import HideableView from 'react-native-hideable-view';
import Collapsible from 'react-native-collapsible';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MapView from 'react-native-maps'; 
import Polyline from '@mapbox/polyline';

{/* height/width of entire screen*/}
var {height, width} = Dimensions.get('window');
var moment = require('moment')
var destination = '12345 El Monte Rd Los Altos Hills, CA 94022'

{/* The home screen
  1. Displays Logo and catchphrase
  2. Buttons leading to page Create Event or Check Events
*/}
class SPLASH_SCREEN extends Component {
  static navigationOptions = { 
    header: null
  };
  constructor(){
    super();
    this.state={pressStatus1: false, pressStatus2: false}
  }
  render(){
    StatusBar.setBarStyle('light-content', true);
    return(
      <View style={styles.container}>
        <LinearGradient colors={['#22B2DB', '#85CFF5']} style={styles.linearGradient}>
          <View style={{
            flex: .9,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'transparent'
          }}>
          {/*Splash Screen Text */}

          <View style={{width:235, padding:30}}>
              <Text style={[styles.appFont,{fontSize:48}]}>Convoy</Text>
            </View>
            <View style={{width:210}}>
              <Text style={[styles.appFont,{fontSize:24}]}>Where you at boi?</Text>
            </View>
          </View>

          {/* Buttons */}

          <View style={{
            flex: .1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('CreateEvent')} underlayColor='#F99550' activeOpacity={0.2}>
              <View style = {this.state.pressStatus1 ? styles.buttonPress : styles.button}>
                <Text style = {this.state.pressStatus1 ? styles.buttonTextPress : styles.buttonText}>Create Event</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('EventList')} underlayColor='#F99550' activeOpacity={0.2}>
              <View style = {this.state.pressStatus2 ? styles.buttonPress : styles.button}>
                <Text style = {this.state.pressStatus2? styles.buttonTextPress : styles.buttonText}>Check Events</Text>
              </View>
            </TouchableHighlight>
          </View>
        </LinearGradient>
      </View>
    )
  }
}
class CREATE_EVENT extends Component {
  static navigationOptions = { 
    header: null
  };
  constructor(){
    super()
    this.state = {date: new Date(), isDateTimePickerVisible: false, showGuestList: false, location: '', eventName: '', customMessage: ''}
  }
  sendInvites = () => {
    destinationLoc = location
  }
  toggleAddGuests = () => {
    this.setState({
      showGuestList:!this.state.showGuestList
    })
  }
  showDateTimePicker = () => this.setState({isDateTimePickerVisible: true})
  hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false})
  handleDataPicked = (date) => {
    this.setState({date: date})
    this.hideDateTimePicker()
  }
  render(){
    StatusBar.setBarStyle('light-content', true);
    return (
      <LinearGradient colors={['#22B2DB', '#85CFF5']} style={styles.linearGradient}>
        <View style={{
          backgroundColor: 'transparent',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{
            paddingTop: 20,
            paddingLeft:5,
            paddingRight:10,
            width: width-20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: 'white',
            borderBottomWidth: 1,
          }}>
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('Home')} underlayColor='transparent'>
              <Image source={require('../convoy/images/back-arrow.png')} style={{width:35,height:35}}/>
            </TouchableHighlight>
            <Text style={styles.appFont}>Create Event</Text>
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('Profile')} underlayColor='transparent'>
              <Image source={require('../convoy/images/vincent-profile.png')} style={{width:35,height:35, borderRadius:35/2}}/>
            </TouchableHighlight>
          </View>
          <View style={{
            width:width-10,
            flexDirection: 'row',
            justifyContent:'space-between',
            padding:10,
            backgroundColor:'white',
            borderRadius:10,
            alignItems:'center'
          }}>
            <Text style={[styles.appFont,{color: '#22B2DB', fontSize:18}]}>Guests</Text>
            <TouchableHighlight onPress={this.toggleAddGuests} underlayColor='transparent'>
              <Text style={[styles.appFont, {color: '#22B2DB', fontSize:30}]}>+</Text>
            </TouchableHighlight>
          </View>
          <View style={{
            width:width-10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding:10,
            backgroundColor:'white',
            borderRadius:10,
            alignItems: 'center'
          }}>
            <Text style={[styles.appFont,{color: '#22B2DB', fontSize:18}]}>Date and Time</Text>
            <TouchableHighlight onPress={this.showDateTimePicker} underlayColor='transparent'>
              <Text style={[styles.appFont,{fontWeight: 'normal', color: '#F99550', fontSize:18}]}>{moment(this.state.date).format('LLL')}</Text>
            </TouchableHighlight>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDataPicked}
              onCancel={this.hideDateTimePicker}
              mode='datetime'
            />
          </View>
          <View style={{
            width:width-10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding:10,
            backgroundColor:'white',
            borderRadius:10,
            alignItems:'center'
          }}>
            <Text style={[styles.appFont,{color: '#22B2DB', fontSize:18}]}>Location</Text>
            <TextInput
              multiline={true}
              enablesReturnKeyAutomatically={true}
              style={{color: '#F99550', fontSize: 18, fontFamily: 'Avenir', width: width-120, textAlign: 'right'}}
              onChangeText={(text) => this.setState({location: text})}
              placeholder='1234 Street Name'
              placeholderTextColor='#F99550'
            />
          </View> 
          <View style={{
            width:width-10,
            flexDirection: 'row',
            padding:10,
            backgroundColor:'white',
            borderRadius:10,
            alignItems:'center',
            justifyContent: 'space-between'
          }}>
            <Text style={[styles.appFont,{color: '#22B2DB', fontSize:18}]}>Event Name</Text>
            <TextInput
              multiline={true}
              enablesReturnKeyAutomatically={true}
              style={{color: '#F99550', fontSize: 18, fontFamily: 'Avenir', width: width-150, textAlign: 'right'}}
              onChangeText={(text) => this.setState({eventName: text})}
              placeholder='Party Time!'
              placeholderTextColor='#F99550'
            />
          </View>
          <View style={{
            width:width-10,
            padding:10,
            backgroundColor:'white',
            borderRadius:10,
          }}>
            <Text style={[styles.appFont,{color: '#22B2DB', fontSize:18, paddingBottom: 10}]}>Custom Message</Text>
            <View style={{
              width: width-30,
              alignItems: 'center',
            }}>
              <View>
                <TextInput
                  multiline={true}
                  enablesReturnKeyAutomatically={true}
                  style={{color: '#F99550', fontSize: 16, fontFamily: 'Avenir', width: width-80, paddingBottom: 10}}
                  onChangeText={(text) => this.setState({customMessage: text})}
                  placeholder='Come for a fun night out in the city!'
                  placeholderTextColor='#F99550'
                />
              </View>
            </View>
          </View>
          <TouchableHighlight onPress={this.sendInvites} style={{
            backgroundColor:'white', 
            borderRadius:10,
            width:width-10,
            padding:15,
          }} underlayColor='#F99550'>
            <Text style={[styles.appFont,{color:'#22B2DB', textAlign: 'center', fontSize:20}]}>Send Invites</Text>
          </TouchableHighlight>        
        </View>
        <View style={{height:20}}/>
      </LinearGradient>
    )
  }
}
class EVENT_LIST extends Component {
  constructor(){
    super()
    this.state = {isCollapsed1: false, isCollapsed2: true, isCollapsed3: true}
  }
  static navigationOptions = { 
    header: null
  };
  toggleMenu1() {
    this.setState({isCollapsed1: !this.state.isCollapsed1})
  }
  toggleMenu2() {
    this.setState({isCollapsed2: !this.state.isCollapsed2})
  }
  toggleMenu3() {
    this.setState({isCollapsed3: !this.state.isCollapsed3})
  }
  render(){
    StatusBar.setBarStyle('light-content', true);
    return (
  <LinearGradient colors={['#22B2DB', '#85CFF5']} style={styles.linearGradient}>
    <ScrollView>
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          alignItems: 'center'
      }}>
        {/* Header */}

        <View style={{
          paddingTop: 20,  
          width: width-20, 
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: 'white',
          alignItems: 'center',
          paddingLeft:5,
          paddingRight:10
        }}>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('Home')} underlayColor='transparent'>
            <Image source={require('./images/back-arrow.png')} style={{width:35, height:35}}/>
          </TouchableHighlight>
          <Text style={styles.appFont}>Event List</Text>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('Profile')} underlayColor='transparent'>
            <Image source={require('./images/vincent-profile.png')} style={{width:35, height:35, borderRadius: 35/2}}/>
          </TouchableHighlight>
        </View>

        {/* Hosting Section */}

        <View>
          <Text style={[styles.appFont,{paddingTop: 15, paddingLeft: 5, fontSize:24}]}>Hosting</Text>
          <View style={{alignItems: 'center'}}>
            <View style={styles.borderB} />
          </View>

          <View style={{width: width, alignItems:'center'}}>
            <View style={styles.box}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Maps')}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <View>
                    <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>Commencement</Text>
                    <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>UC Berkeley</Text>
                  </View>
                  <View>
                    <Text style={{textAlign: 'right', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>Today, 6:00 PM</Text>
                    <Text style={{textAlign: 'right', fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>1 hour away</Text>
                  </View>
                </View>
                <View style={{width:(width-30), height:1, backgroundColor: '#22B2DB'}} />
              </TouchableOpacity>
              <Collapsible collapsed={this.state.isCollapsed1}>
                <View style={{alignItems: 'center',  paddingTop: 20, paddingBottom: 20}}>
                  <Text style={{fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>You better get here on time or else...</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <View style={{width:(width/2)-20}}>
                    <Text style={{paddingLeft:5, fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB'}}>Going</Text>
                  </View>
                  <View style={{width:(width/2)-20}}>
                    <Text style={{paddingLeft:15, fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB'}}>Deciding</Text>
                  </View>
                </View>
                <View style={{paddingTop:2, flexDirection: 'row', justifyContent:'space-around'}}>
                  <View style={{width:(width/2)-40, borderWidth: 2, borderRadius: 10, borderColor: '#22B2DB'}}>
                    <View style={{padding:5, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                      <Image style={styles.image} source={require('./images/vincent-profile.png')}/>
                      <View style={{width:5}}/>
                      <Text style={{textAlign:'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB', backgroundColor: 'transparent'}}> + 5 sadbois</Text>
                    </View>
                  </View>
                  <View style={{width:20}} />
                  <View style={{width:(width/2)-40, borderWidth: 2, borderRadius: 10, borderColor: '#22B2DB'}}>
                    <View style={{padding:5, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                      <Image style={styles.image} source={require('./images/andrew-profile.png')}/>
                      <View style={{width:5}}/>
                      <Text style={{textAlign:'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB', backgroundColor: 'transparent'}}> + 1 sadboi</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.toggleMenu1()}>
                  <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>^</Text>
                </TouchableOpacity>
              </Collapsible>
              <Collapsible collapsed={!this.state.isCollapsed1}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.toggleMenu1()}>
                  <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>v</Text>
                </TouchableOpacity>
              </Collapsible>
            </View>
          </View>
        </View> 

        {/* Going Section */}
        <View>
          <Text style={{paddingLeft: 5, paddingTop: 15, fontFamily: 'Avenir', fontSize:24, fontWeight:"bold", color: 'white'}}>Going</Text>
          <View style={{alignItems: 'center'}}>
            <View style={styles.borderB} />
          </View>

          <View style={{width: width, alignItems:'center'}}>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <View>
                    <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>Grad Party!</Text>
                    <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>Mike's apartment</Text>
                  </View>
                  <View>
                    <Text style={{textAlign: 'right', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>Today, 10:00 PM</Text>
                    <Text style={{textAlign: 'right', fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>5 hours away</Text>
                  </View>
                </View>
                <View style={{width:(width-30), height:1, backgroundColor: '#22B2DB'}} />
              </TouchableOpacity>
              <Collapsible collapsed={this.state.isCollapsed2}>
              <View style={{alignItems: 'center',  paddingTop: 20,paddingBottom: 20}}>
                <Text style={{fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>Get ready to regret your decisions</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={{width:(width/2)-10}}>
                  <Text style={{paddingLeft:5, fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB'}}>Going</Text>
                </View>
                <View style={{width:(width/2)-10}}>
                  <Text style={{paddingLeft:15, fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB'}}>Deciding</Text>
                </View>
              </View>
              <View style={{paddingTop:2,flexDirection: 'row', justifyContent:'space-around'}}>
                <View style={{width:(width/2)-40, borderWidth: 2, borderRadius: 10, borderColor: '#22B2DB'}}>
                  <View style={{padding:5, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                    <Image style={styles.image} source={require('./images/vincent-profile.png')}/>
                    <View style={{width:5}}/>
                    <Text style={{textAlign:'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB', backgroundColor: 'transparent'}}> + 18 sadbois</Text>
                  </View>
                </View>
                <View style={{width:20}}>
                </View>
                <View style={{width:(width/2)-40, borderWidth: 2, borderRadius: 10, borderColor: '#22B2DB'}}>
                  <View style={{padding:5, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                    <Image style={styles.image} source={require('./images/andrew-profile.png')}/>
                    <View style={{width:5}}/>
                    <Text style={{textAlign:'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB', backgroundColor: 'transparent'}}> + 27 sadbois</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.toggleMenu2()}>
                <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>^</Text>
              </TouchableOpacity>
              </Collapsible>
              <Collapsible collapsed={!this.state.isCollapsed2}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.toggleMenu2()}>
                  <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>v</Text>
                </TouchableOpacity>
              </Collapsible>
            </View>
          </View>
        </View>

        {/* Invited Section */}
        <View>
          <Text style={{paddingLeft: 5, paddingTop: 15, fontFamily: 'Avenir', fontSize:24, fontWeight:"bold", color: 'white'}}>Invited</Text>
          <View style={{alignItems: 'center'}}>
            <View style={styles.borderB} />
          </View>

          <View style={{width: width, alignItems:'center'}}>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <View>
                    <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>Friendship</Text>
                    <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>Swan's House</Text>
                  </View>
                  <View>
                    <Text style={{textAlign: 'right', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>May 17, 8:00 PM</Text>
                    <Text style={{textAlign: 'right', fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>4 days away</Text>
                  </View>
                </View>
                <View style={{width:(width-30), height:1, backgroundColor: '#22B2DB'}}/>
              </TouchableOpacity>
              <Collapsible collapsed={this.state.isCollapsed3}>
              <View style={{alignItems: 'center',  paddingTop: 20,paddingBottom: 20}}>
                <Text style={{fontFamily: 'Avenir', fontSize:14, color: '#22B2DB'}}>Let's go sit on a couch and talk about our feelings.</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={{width:(width/2)-10}}>
                  <Text style={{paddingLeft:5, fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB'}}>Going</Text>
                </View>
                <View style={{width:(width/2)-10}}>
                  <Text style={{paddingLeft:15, fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB'}}>Deciding</Text>
                </View>
              </View>
              <View style={{paddingTop:2,flexDirection: 'row', justifyContent:'space-around'}}>
                <View style={{width:(width/2)-40, borderWidth: 2, borderRadius: 10, borderColor: '#22B2DB'}}>
                  <View style={{padding:5, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                    <Image style={styles.image} source={require('./images/vincent-profile.png')}/>
                    <View style={{width:5}}/>
                    <Text style={{textAlign:'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB', backgroundColor: 'transparent'}}> + 3 sadbois</Text>
                  </View>
                </View>
                <View style={{width:20}}>
                </View>
                <View style={{width:(width/2)-40, borderWidth: 2, borderRadius: 10, borderColor: '#22B2DB'}}>
                  <View style={{padding:5, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                    <Image style={styles.image} source={require('./images/andrew-profile.png')}/>
                    <View style={{width:5}}/>
                    <Text style={{textAlign:'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:14, color: '#22B2DB', backgroundColor: 'transparent'}}> + 4 sadbois</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.toggleMenu3()}>
                <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>^</Text>
              </TouchableOpacity>
              </Collapsible>
              <Collapsible collapsed={!this.state.isCollapsed3}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.toggleMenu3()}>
                  <Text style={{textAlign: 'left', fontFamily: 'Avenir', fontWeight: 'bold', fontSize:18, color: '#22B2DB'}}>v</Text>
                </TouchableOpacity>
              </Collapsible>
            </View>
          </View>
        </View> 
      </View>
    </ScrollView>
  </LinearGradient>
    )
  }
}
export default class MAPS extends Component {
  static navigationOptions = { 
    header: null
  };
  constructor(props){
    super(props)
    this.state = {
      coords: [],
      destination: []
    }
  }
  componentDidMount(){
    let destinationLoc = this.getCoords('12345 El Monte Rd Los Altos Hills, CA 94022')
    this.getDirections("37.3268866, -122.0405298", "37.36339788029149,-122.1257931197085")
  }
  async getCoords(destinationLoc) {
    try{
      let resp = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=${ destinationLoc }')
      let respJson = await resp.json();
      let destination = respJson.results[0].geometry.location
      let coords = {latitude: destination.lat, longitude: destination.long}
      this.setState({destination: destination})
      return destination
    } catch(error) {
      alert(error)
      return error
    }
  }
  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }
  render(){
    return (
      <LinearGradient colors={['#22B2DB', '#85CFF5']} style={styles.linearGradient}>
        <View style={styles.container}>
          <View style={{
            width: width-20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 5,
          }}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('EventList')} underlayColor='transparent'>
              <Image source={require('../convoy/images/back-arrow.png')} style={{width:35, height:35}}/>
            </TouchableHighlight>
            <Text style={styles.appFont}>Convoy</Text>
            <View style={{width:35,height:35}}/>
          </View>
          <MapView
            style={{
              width:width,
              flex: .8,
            }}
            initialRegion={{
              latitude:37.3268866, 
              longitude:-122.0405298, 
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}>
          <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
          </MapView>
        </View>
      </LinearGradient>
    )
  }
}
class PROFILE extends Component {
  static navigationOptions = {
    header : null
  };
  constructor(){
    super()
    this.state = {visibleSwitch: true, friendsOnlySwitch: false, phoneNumber: '', notificationsBefore: '', notificationsAfter: ''}
  }
  render(){
    return(
      <LinearGradient colors={['#22B2DB', '#85CFF5']} style={styles.linearGradient}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            alignItems: 'center',
        }}>
          {/* Header */}

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            paddingLeft: 5,
            paddingTop: 20,
            width:width-20,
            borderColor: 'white',
            borderBottomWidth: 1,
          }}>
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('CreateEvent')} underlayColor='transparent'>
              <Image source={require('../convoy/images/back-arrow.png')} style={{width:35,height:35}}/>
            </TouchableHighlight>
            <Text style={styles.appFont}>Profile</Text>
            <View style={{width:35,height:35}}/>
          </View>

          {/* Profile Pic/Name */}
          <View style={{
            width:(width-20),
            borderBottomWidth: 1,
            borderColor: 'white',
            alignItems: 'center',
          }}>
            <Image source={require('../convoy/images/vincent-profile.png')} style={{width:150,height:150, borderRadius:150/2}}/>
            <Text style={styles.appFont}>Vincent</Text>
          </View>

          {/* Visibility/Friend Settings */}

          <View style={{
            width:(width-80),
          }}>
            <Text style={[styles.appFont,{fontSize: 24, textAlign:'left'}]}>Visibility Settings</Text>
          </View>
          <View style={{
            width:(width-120),
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              paddingBottom: 10,
            }}>
              <Text style={[styles.appFont,{fontSize: 18, textAlign:'left'}]}>Make Me Visible</Text>
              <Switch 
                onValueChange={(value) => this.setState({visibleSwitch: value})} 
                value={this.state.visibleSwitch} 
                onTintColor='#F99550'
                tintColor='white' />
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
            }}>
              <Text style={[styles.appFont,{fontSize: 18, textAlign:'left'}]}>Friends Only</Text>
              <Switch 
                onValueChange={(value) => this.setState({friendsOnlySwitch: value})} 
                value={this.state.friendsOnlySwitch}
                onTintColor='#F99550'
                tintColor='white'/>
            </View>

          {/* Phone Number */}

          </View>
          <View style={{
            width:(width-80)
          }}>
            <Text style={[styles.appFont,{fontSize: 24, textAlign:'left'}]}>Phone Number</Text>
          </View>
          <View style={{
            width:(width-120)
          }}>
            <TextInput
              style={{color:'white',borderRadius: 10,padding:10,height:40, borderColor:'white', borderWidth:1}}
              selectionColor='white'
              keyboardType='numeric'
              maxLength={10}
              onChangeText={(text) => this.setState({phoneNumber: text})}
              value={this.state.phoneNumber} />
          </View>

          {/* Notifications */}

          <View style={{
            width:width-80
          }}>
            <Text style={[styles.appFont,{fontSize:24, textAlign:'left'}]}>Notifications</Text>
          </View>
          <View style={{
            width:(width-120),
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <View style={{
              width:45,
              backgroundColor:'white',
              borderRadius: 10
            }}>
            <TextInput
              style={{textAlign: 'center', color:'#F99550',borderRadius: 20,padding:10,height:40, borderColor:'white', borderWidth:1}}
              selectionColor='#F99550'
              keyboardType = 'numeric'
              maxLength={2}
              onChangeText={(text) => this.setState({notificationsBefore: text})}
              value={this.state.notificationsBefore} />
            </View>
            <Text style={[styles.appFont,{paddingLeft: 10, fontSize: 18, textAlign: 'left'}]}>hour(s) before event</Text>
          </View>
          <View style={{
            width:(width-120),
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20
          }}>
            <View style={{
              width:45,
              backgroundColor: 'white',
              borderRadius: 10
            }}>
            <TextInput
              style={{textAlign: 'center', color:'#F99550',borderRadius: 20,padding:10,height:40, borderColor:'white', borderWidth:1}}
              selectionColor='#F99550'
              keyboardType = 'numeric'
              maxLength={2}
              onChangeText={(text) => this.setState({notificationsAfter: text})}
              value={this.state.notificationAfter} />
            </View>
            <Text style={[styles.appFont,{paddingLeft: 10, fontSize: 18, textAlign: 'left'}]}>hour(s) after event</Text>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
const convoy = StackNavigator({
  Home: {
    screen: SPLASH_SCREEN
  },
  CreateEvent:{
    screen: CREATE_EVENT
  },
  EventList:{
    screen: EVENT_LIST
  },
  Maps: {
    screen: MAPS
  },
  Profile: {
    screen: PROFILE
  }
})

AppRegistry.registerComponent('convoy', () => convoy);

const styles = StyleSheet.create({
  appFont: {
    fontFamily: 'Avenir', 
    fontSize: 36, 
    fontWeight:"bold", 
    color: 'white'
  },
  box: {
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    width:(width-10), 
    borderRadius:5, 
    backgroundColor: 'white'
  },
  borderB: {
    width:(width-10), 
    height:1, 
    borderTopWidth:1, 
    borderColor: 'white', 
    paddingBottom:5
  },
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color:'#F99550',
  },
  buttonTextPress: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color:'white',
  },
  button: {
    width:188,
    height: 65,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'gray',
    borderRightWidth:1
  },
  buttonPress: {
    width:188,
    height: 65,
    backgroundColor: '#F99550',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'gray',
    borderRightWidth:1
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: width,
    height: height
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30/2
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height
  },
});

