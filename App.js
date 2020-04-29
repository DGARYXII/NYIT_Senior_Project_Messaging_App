import React, { Component } from 'react';
import messaging from '@react-native-firebase/messaging';
import MessagingScreen from './ui/screens/MessagingScreen';
import LoginScreen from './ui/screens/LoginScreen';
import GroupScreen from './ui/screens/GroupScreen';
import GroupInfoScreen from "./ui/screens/GroupInfoScreen";
import GroupMapScreen from './ui/screens/GroupMapScreen'
import ProfileScreen from './ui/screens/ProfileScreen';
import SettingsScreen from './ui/screens/SettingsScreen';
import ForgetPasswordScreen from './ui/screens/ForgetPasswordScreen';
import ChangeEmailScreen from './ui/screens/ChangeEmailScreen';
import GroupCreationScreen from "./ui/screens/GroupCreationScreen";
import RequestScreen from "./ui/screens/RequestScreen"; 
import UserInterestScreen from "./ui/screens/UserInterestScreen";
import {NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {subscribeToAuthChanges,getAllGroups,getCurrentUserGroups,registerAppWithFCM,requestUserPermission,requestCameraLibraryPermission, getUserInfo} from './api/MessagingAppAPI'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_a, color_b, color_c, color_d } from './ui/styles/AppStyles';
import { withNavigation } from 'react-navigation';


function myGroupScreen({navigation}){
  return(
    <GroupScreen get_groups_functions={getCurrentUserGroups} navigation = {navigation}/>
  );
}
const MyGroupsStack = createStackNavigator();
function MyGroupsStackScreen(){
  return(
    <MyGroupsStack.Navigator>
      <MyGroupsStack.Screen name="GroupMap" component = {myGroupScreen} options={{headerShown:false}}/>
      <MyGroupsStack.Screen name="Message" component = {MessagingScreen} />
      <MyGroupsStack.Screen name="CreateGroup" component = {GroupCreationScreen}/>
      <MyGroupsStack.Screen name="GroupInfo" component = {GroupInfoScreen}/>
    </MyGroupsStack.Navigator>
  );
}

const GroupMapStack = createStackNavigator();
function GroupMapStackScreen(){
  return(
    <GroupMapStack.Navigator>
      <GroupMapStack.Screen name="GroupMap" component = {GroupMapScreen} options={{headerShown:false}}/>
      <GroupMapStack.Screen name="Message" component = {MessagingScreen}/>
      <GroupMapStack.Screen name="CreateGroup" component = {GroupCreationScreen}/>
      <GroupMapStack.Screen name="GroupInfo" component = {GroupInfoScreen}/>
    </GroupMapStack.Navigator>
  );
}

function searchGroupScreen({navigation}){
  return(
    <GroupScreen get_groups_functions={getAllGroups} navigation = {navigation}/>
  );
}
const SearchGroupStack = createStackNavigator();
function SearchGroupStackScreen(){
  return(
    <SearchGroupStack.Navigator>
      <SearchGroupStack.Screen name="GroupScreen" component = {searchGroupScreen} options={{headerShown:false}}/>
      <SearchGroupStack.Screen name="Message" component = {MessagingScreen}/>
      <SearchGroupStack.Screen name="CreateGroup" component = {GroupCreationScreen}/>
      <SearchGroupStack.Screen name="GroupInfo" component = {GroupInfoScreen}/>
    </SearchGroupStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator();
function MyProfileStackScreen(){
  return(
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen name="Profile" component = {ProfileScreen} options={{headerShown:false}}/>
      <MyProfileStack.Screen name="Settings" component = {SettingsScreen} />
      <MyProfileStack.Screen name="ChangePassword"  component = {ForgetPasswordScreen}/>
      <MyProfileStack.Screen name="ChangeEmail"  component = {ChangeEmailScreen}/>
      <MyProfileStack.Screen name="Requests"  component = {RequestScreen}/>
      <MyProfileStack.Screen name="Interests"  component = {UserInterestScreen}/>
    </MyProfileStack.Navigator>
  );
}


const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        signedIn: false
    }
    this.initialRoute = "MyGroups"
    
  }

  componentDidMount(){

    registerAppWithFCM()
    requestUserPermission()
    subscribeToAuthChanges(this.authStateChanged)
    
    
    // messaging().setBackgroundMessageHandler((remoteMessage)=>{
    //   if(remoteMessage.data.type == "message"){
    //     this.initialRoute = "GroupMap"
    //   }
    //   else if(remoteMessage.data.type == "group"){
    //     this.initialRoute = "MyProfile"
    //   }
    //   else{
    //     this.initialRoute = "MyProfile"
    //   }
    // })
    
    

  }

  authStateChanged = (user) =>{
    if(user !== null){
        this.setState({
          signedIn: true
        })
    }
    else{
      this.setState({
        signedIn: false
      })
    }
  }

  render() {

    if(this.state.signedIn){
      return(
        <NavigationContainer>
          <Tab.Navigator initialRouteName={this.initialRoute} tabBarOptions = {{activeBackgroundColor:color_a, inactiveBackgroundColor:color_a, inactiveTintColor:color_c, activeTintColor:color_b} }>
            <Tab.Screen name="MyGroups" component={MyGroupsStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="group" size={size} color={color}/>)}} />
            <Tab.Screen name="GroupMap" component={GroupMapStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="map" size={size} color={color}/>)}} />
            <Tab.Screen name="SearchGroup" component={SearchGroupStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="search" size={size} color={color}/>)}} />
            <Tab.Screen name="MyProfile" component={MyProfileStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="user" size={size} color={color}/>)}} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return(
        <NavigationContainer>
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component = {LoginScreen} options={{headerShown:false}}/>
            <AuthStack.Screen name="ForgetPassword" component = {ForgetPasswordScreen}/>
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
