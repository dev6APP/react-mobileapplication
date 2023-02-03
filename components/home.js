import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// Theme
import useThemedStyles from "../styles/theme/useThemedStyles";
import { styles } from "../styles/styles";

// firebase
import '../config/firebase';
import { useAuthentication } from '../hooks/use_authentication';

// Icons
import { Icon } from "@react-native-material/core";

// Statistics
import Stat_lineChart from './visualisations/statistics_lineChart'
import Stat_BarChart from './visualisations/statistics_barChart'
import Stat_interesting from "./visualisations/statistics_interesting";
import { useEffect, useState } from "react";
import DbAPI from "../api/DbAPI";

//Loading
import Fetching from "../layout/message_fetching";

export default function HomeScreen({ navigation }) {
    // Stat flowers over year
    const [amtYears, setAmtYears] = useState(7);
    let labelYears = [];
    let amountYears = [{data: []}]
    const [lineChartData, setLineChartData] = useState(null);

    // Stat flowers per field this year
    const [farms, setFarms] = useState(null);

    // Fields of fieldOwner

    const fieldOwnerId = 1;

    useEffect(() => {
        getOverYears(fieldOwnerId);
        getFarms(fieldOwnerId);
    }, [amtYears])

    async function getOverYears(id){
        const currentYear = new Date().getFullYear();
        for(let i = 0; i < amtYears; i++){
            const year = currentYear - amtYears + i + 1;
            try{
                const result = await DbAPI.getAmountOfFieldOwnerOverYear(id, year)
                labelYears.push(JSON.stringify(year));
                amountYears[0].data.push(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        setLineChartData({ labels: labelYears, datasets: amountYears })
    }

    async function getFarms(id){
        let farmsData = [];
        const result = await DbAPI.getFarmFromFieldOwner(id);
        let tempFarms = result.data;
        for(let i = 0; i < tempFarms.length; i++){
            let farm = tempFarms[i];
            let farmData = {name: farm.name, fields: []};
                            
            let fieldsData = { labels: [], datasets: [{data: []}]};

            for(let j = 0; j < farm.fields.length; j++){
                let field = farm.fields[j];

                const result = await DbAPI.getAmountPerField(field.fieldID);

                fieldsData.labels.push(field.name);
                fieldsData.datasets[0].data.push(result.data);
            }

            farmData.fields.push(fieldsData);

            farmsData.push(farmData);
        }
        setFarms(farmsData);
    }

    async function getPerField(){
        let fieldId = 1;
        let result = await DbAPI.getAmountPerField(fieldId);
    }

    const {user} = useAuthentication();

    // Styling (theme)
    const style = useThemedStyles(styles);

    // Linechart
    const lineChartTitle = "Amount of flowers over the years";

    // Barchart
    const barChartTitle = "Amount of flowers this year";
    const barChartLabels = ["January", "February", "March"];
    const barChartDataset = [{data: [Math.round((Math.random() * 30 + 60) * 100) / 100, Math.round((Math.random() * 30 + 60) * 100) / 100, Math.round((Math.random() * 30 + 60) * 100) / 100]}];
    const barChartData = { labels: barChartLabels, datasets: barChartDataset};

    // Padding for charts
    // This needs to be the sum of all the surounding paddings
    // If paddingCharts = 0 the width of the chart will be equal to the width of the screen
    const paddingCharts = 30;
    // Size of icon
    const size = 40;

    if(!lineChartData) return <Fetching message="Getting flower data..."/>
    if(!farms) return <Fetching message="Getting farm data..."/>

    return (
        <View style={style.body}>
            <ScrollView>    
                <TouchableOpacity style={[style.largeCameraButton, style.mb10]} onPress={() => {navigation.navigate('Camera')}}>
                    <Icon name="camera-iris" size={size} style={style.largeCameraButtonText}/>
                </TouchableOpacity>
                <Stat_lineChart title={lineChartTitle} data={lineChartData} padding={paddingCharts} />
                {farms.map((farm, index) => (
                   farm.fields.length > 0 && (
                    <>
                        <Stat_BarChart key={`barChart${index}`} title={`Flowers per farm: ${farm.name}`} data={farm.fields[0]} padding={paddingCharts} />
                    </>
                )
                ))}
            </ScrollView>
        </View>
    );
    
}