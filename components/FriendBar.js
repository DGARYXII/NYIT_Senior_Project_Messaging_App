import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TouchableHighlightBase } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FriendBar extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }  
    }

    render(){
    
        return(
            <View style = {this.props.bar_style}>
                <TouchableOpacity style = {this.props.bar_style} >
                    <View style={styles.body_container}>

                        <View style={styles.left_container}>
                            <Icon name="user" size={100} color="white"/>
                                
                        </View>

                        <View style={styles.right_container}>

                            <Text style ={{flex:.50}}>{this.props.name}</Text>
                            <Text style ={{flex:.50}}>{this.props.interests}</Text>
                        
                        </View>
                    
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }

}


const styles = StyleSheet.create({

    left_container:{
        flexDirection:"column",
        flex: .30,
    },

    right_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex: .70,

    },  
})