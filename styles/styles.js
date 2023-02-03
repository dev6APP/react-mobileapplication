import { AutoFocus } from "expo-camera";
import { StyleSheet } from "react-native";

export const text = theme => theme.colors.TEXT;
export const background = theme => theme.colors.BACKGROUND;
export const red = theme => theme.colors.RED
export const blue = theme => theme.colors.BLUE;
export const green = theme => theme.colors.GREEN;

export const styles = theme =>

    StyleSheet.create({
        body: {
            padding: 15,
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND,
            width: '100%',
            position: "relative",
        },
        loader: {
            position: "absolute",
            left: "50%",
            top: "50%",
            //transform: [{translateX: -50, translateY: -50}],
            width: 100,
            height: 100,
        },
        text: {
            color: theme.colors.TEXT,
        },
        textBG_COLOR: {
            color: theme.colors.BACKGROUND,
        },
        camera: {
            width: "100%",
            height: "100%",
            position: "relative",
        },
        cameraFlipButtonContainer: {
            position: "absolute",
            top: 10,
            right: 10,
        },
        takePictureButtonContainer: {
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: [{translateX: -25}],
        },
        cameraButton: {
            borderRadius: 50,
            backgroundColor: theme.colors.BACKGROUND,
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        takePictureButton: {
            borderRadius: 50,
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        cameraButtonText: {
            color: theme.colors.TEXT,
            color: theme.colors.TEXT,
        },
        largeCameraButton: {
            width: "100%",
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.TEXT,
        },
        largeCameraButtonText: {
            color: theme.colors.BACKGROUND,
        },
        newPhotoButton: {
            position: "absolute",
            top: 25,
            left: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: theme.colors.TEXT
        },
        usePhotoButton: {
            position: "absolute",
            bottom: 25,
            left: 25,
            right: 25,
            height: 60,
            backgroundColor: theme.colors.BACKGROUND,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        addButton: {
            padding: 15,
            textColor: theme.colors.BACKGROUND,
            backgroundColor: theme.colors.TEXT,
            width: "100%",
            borderRadius:10,
            flex:1,
            justifyContent: "center",
        },
        addButtonText: {
            color: theme.colors.BACKGROUND,
            fontSize: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        selectList:{
            position: "absolute",
            top: 25,
            right: 25,
        },
        mb10: {
            marginBottom: 10,
        },
        largeButton: {
            padding: 15,
            textColor: theme.colors.BACKGROUND,
            backgroundColor: theme.colors.TEXT,
            width: "100%",
        },
        textLargeButton: {
            fontSize: 15,
            textAlign: "center",
            color: theme.colors.BACKGROUND,
        },
        control: {
            padding: 0,
            color: theme.colors.TEXT,
            width: "100%",
        },
        img: {
            width: "100%",
            height: "100%",
        },
        error: {
          fontSize: 15,
          color: 'darkred',
          fontWeight: 'bold'
        },
        loading: {
          fontSize: 15,
        },
        name: {
            fontSize: 30,
            color: theme.colors.TEXT,
            fontWeight: 'bold',
        },
        sectionHeader: {
            fontSize: 20,
            color: theme.colors.TEXT,
            textDecorationLine: 'underline',
            marginTop: 20,
        },
        icon: {
            color: theme.colors.TEXT,
        },
        list: {
            flex: 1,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: theme.colors.BACKGROUND,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
        },
        listItem:{
            fontSize: 20,
            color: theme.colors.TEXT,
            marginTop: 15,
            marginBottom: 15,
            height: 50,
            paddingLeft: 20,
            paddingTop:15,
        },
        circle: {
            width: 50,
            height: 50,
            fontSize: 20,
            borderRadius: 50,
            fontSize: 30,
            backgroundColor: 'tomato',
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        table:{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.colors.TEXT, 
        },
        tableHeader: {
            backgroundColor: theme.colors.TEXT,
        },
        tableHeaderTitle: {
            textColor: theme.colors.BACKGROUND,
        },
        flatListItem: {
            flex: 1,
            paddingVertical: 15,
            backgroundColor: theme.colors.BACKGROUND,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: "space-between"
        },
        flatListTitle: {
            position: "relative"
        },
        flatListTitleNumber: {
            position: "absolute",
            top: -2,
            left: "100%",
            color: theme.colors.BACKGROUND,
            backgroundColor: theme.colors.TEXT,
            width: 15,
            height: 15,
            textAlignVertical: "center",
            textAlign: "center",
            fontSize: 11,
            fontWeight: "bold",
            borderRadius: 50,
        },
        flatListTitleText: {
            paddingRight: 5,
            fontSize: 20,
        },
        flatListInfo: {
            fontSize: 13,
            textAlign: "right",
        },
        listWithLabel: {
            marginVertical: 15,
            padding: 15,
            borderWidth: 1,
            borderType: "solid",
            borderColor: theme.colors.TEXT,
            position: "relative"
        },
        listWithLabelItem: {
            paddingBottom: 25,
        },
        listWithLabelItemTitle: {
            fontWeight: "bold",
            fontSize: 18,
        },
        listWithLabelLabel: {
            position: "absolute",
            left: 10,
            top: -15,
            height: 30,
            padding: 5,
            backgroundColor: theme.colors.BACKGROUND,
        },
        opacity6: {
            opacity: 0.6
        },
        themeButton: {
            backgroundColor: theme.colors.TEXT,
            width: 150,
            padding: 10,
            marginVertical: 10
        },
        themeButtonText: {
            textAlign: "center",
            color: theme.colors.BACKGROUND,
        },
        farmInfoList:{
            marginTop: 10,
        },
        mapMarker:{
            backgroundColor: theme.colors.BACKGROUND,
            color: theme.colors.TEXT,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 50
        },
        farmsList:{
            height: '90%',
        },
        listItem: {
            padding: 16,
            backgroundColor: theme.colors.BACKGROUND,
            color: theme.colors.TEXT,
            margin: 5
        },
        textInput: {
            color: theme.colors.TEXT,
            backgroundColor: theme.colors.BACKGROUND,
            borderWidth: 2,
            borderColor: "gray",
            padding: 10,
            borderRadius:10,
        },
        fab:{
            backgroundColor: theme.colors.TEXT,
            color: theme.colors.BACKGROUND
        },
        addLabel:{
            color: theme.colors.TEXT,
            fontSize: 15,
            marginTop: 5
        },
        datePicker: {
            justifyContent: 'space-between',
            flexDirection: 'row',

        },
        circle: {
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 10,
            right: 10,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        legend:{
           display: "flex",
           flexDirection: "row"
        }
    }
);
