import React, { Component } from 'react';
import {StyleSheet, View, Text, SafeAreaView } from 'react-native';
import {getUserInfo, getCurrentUserID} from "../../api/MessagingAppAPI"
import OvalButton from "../components/OvalButton";
import {signOut} from '../../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_c } from '../styles/AppStyles';


export default class ProfileScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "Default Name",
            status: "Offline",
        }
    }

    componentDidMount(){
       getUserInfo(getCurrentUserID(), this.userInfoRetrieved)
    }

    userInfoRetrieved = (info) =>{
        this.setState({name: info.UserName});
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>
                    <Icon name="user" size={100} color={color_c}/>

                    <Text style = {{margin: 10,}}>
                        {this.state.name}
                    </Text>

                    <Text style = {{margin: 10,}}>
                        {this.state.status}
                    </Text>

                    <OvalButton text="Friends"/>

                    <OvalButton text="Settings" handler ={() => this.props.navigation.navigate('Settings')}/>
                    
                    <OvalButton text="Sign Out" handler = {() => signOut(this.onSignOut)}/>
                </View>
            </View>
            </SafeAreaView>
            
        );
    }

}

const styles = StyleSheet.create({
    
    content_container:{
        flex: 1,
        alignItems: "center", 
        justifyContent: "center",
    },


})

