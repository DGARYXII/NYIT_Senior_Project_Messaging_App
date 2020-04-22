import {StyleSheet} from 'react-native';


const color_a = "white"
const color_b = '#00BED6'
const color_c = "lightgrey"
const color_d = "grey"
const color_e = "orange"

const AppStyles = StyleSheet.create({

    screen:{
        flex: 1,
        backgroundColor: color_a,
    },

    oval_button:{
        backgroundColor: color_b,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },

    circle_button:{
        backgroundColor: color_b,
        justifyContent: "center",
        alignItems: "center",
        height:45,
        width: 45,
        borderRadius: 22,
        marginHorizontal:5
    },



})

export {AppStyles, color_a, color_b, color_c, color_d,color_e}