// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Icons
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Theme
import useThemedStyles from "./styles/theme/useThemedStyles";
import { text, background, red } from "./styles/styles";

import {RecoilRoot} from 'recoil';

// Import for screens
import HomeScreen from './components/home';
import WorkersScreen from './components/workers';
import FarmsScreen from './components/farms';
import AdminFieldOwnerScreen from './components/admin/fieldowners'
import AccountScreen from './components/account';
import PhotoScreen from './components/camera/photoScreen';

// Authentication screens
import SignInScreen from './components/authentication/signin_screen';
import SignUpScreen from './components/authentication/signup_screen';

// Provider
import ThemeProvider from './styles/theme/ThemeProvider';

// data
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import configData from './config/hasura.json';

// firebase
import './config/firebase';
import { useAuthentication } from './hooks/use_authentication';

// Stack screens
import WorkerDetails from './components/workers/worker_details';
import FarmDetails from './components/farms/farm_details';
import FieldDetails from './components/fields/field_details';
import AdminFieldOwnerDetails from './components/admin/fieldowner/fieldOwner_details'
import AddWorker from './components/workers/worker_add';
import AddFarm from './components/farms/farm_add';
import EditField from './components/fields/field_edit';
import AddField from './components/fields/field_add';

import EditFarm from './components/farms/farm_edit';

// there is a warning that does not matter
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    'x-hasura-admin-secret': configData.qlkey
  },
  cache: new InMemoryCache()
});

const WorkersStack = createNativeStackNavigator();

function WorkerStackScreen() {
  return(
    <WorkersStack.Navigator>
      <WorkersStack.Screen name="WorkersList" component={WorkersScreen} options={{ title: 'Workers' }}/>
      <WorkersStack.Screen name="WorkerDetails" component={WorkerDetails} options={{ title: 'Workers: Details' }}/>
      <WorkersStack.Screen name="AddWorker" component={AddWorker} options={{ title: 'Workers: Add' }}/>
    </WorkersStack.Navigator>
  );
}

const FarmStack = createNativeStackNavigator();

function FarmStackScreen() {
  return(
    <FarmStack.Navigator>
      <FarmStack.Screen name="FarmsList" component={FarmsScreen} options={{ title: 'Farms' }}/>
      <FarmStack.Screen name="FarmDetails" component={FarmDetails} options={{ title: 'Farms: Details' }}/>
      <FarmStack.Screen name="AddFarm" component={AddFarm} options={{ title: 'Farms: Add' }}/>
      <FarmStack.Screen name="EditField" component={EditField} options={{ title: 'Field: Edit' }}/>
      <FarmStack.Screen name="AddField" component={AddField} options={{ title: 'Field: Add' }}/>
      <FarmStack.Screen name="EditFarm" component={EditFarm} options={{ title: 'Farm: Edit' }}/>
    </FarmStack.Navigator>
  );
}

const AdminFieldOwnerStack = createNativeStackNavigator();

function AdminFieldOwnerStackScreen(){
  return(
    <AdminFieldOwnerStack.Navigator>
      <AdminFieldOwnerStack.Screen name="FieldOwnerList" component={AdminFieldOwnerScreen} options={{title: "Admin: Field owners"}}/>
      <AdminFieldOwnerStack.Screen name="FieldOwnerDetails" component={AdminFieldOwnerDetails} options={{title: "Admin: Field owner detail"}}/>
    </AdminFieldOwnerStack.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  
  const {user} = useAuthentication();


  if (user?.uid == "6TQuN609EAdG5toyuHxW40TaDU62"){
    // console.log('its the fieldowner');
    return (
      <ThemeProvider>
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <RecoilRoot>
      <ApolloProvider client={client}>
      <NavigationContainer>
          <Tab.Navigator initialRouteName='Farms' screenOptions={({route}) => ({
            tabBarIcon:({focused, color, size}) => {
              let iconName;
              switch (route.name){
                case "Home":
                  iconName = 'home';
                  break;
                case "Admin: Field owner":
                  iconName = 'account-key';
                  break;
                case "Workers":
                  iconName = 'hammer';
                  break;
                case "Farms":
                  iconName = 'tractor';
                  break;
                case "Account":
                  iconName = 'account';
                  break;
                case "Camera":
                  iconName = 'camera';
                  break;
              }
              return <Icon name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: useThemedStyles(red),
            tabBarInactiveTintColor: useThemedStyles(text),
            tabBarStyle: {
              backgroundColor: useThemedStyles(background),
            },
            tabBarIconStyle: {
              height: 40
            },
          })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Workers" component={WorkerStackScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Farms" component={FarmStackScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Admin: Field owner" component={AdminFieldOwnerStackScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Camera" component={PhotoScreen}/>
            <Tab.Screen name="Account" component={AccountScreen}/>
            
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
      </RecoilRoot>
    </IconComponentProvider>
    </ThemeProvider>
    )
  }
  if (user?.uid == "uNek9kZlU9W8MAH5qDtze3CBc8j1"){
    // console.log('its the worker');
    return (
      <ThemeProvider>
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <RecoilRoot>
      <ApolloProvider client={client}>
      <NavigationContainer>
          <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon:({focused, color, size}) => {
              let iconName;
              switch (route.name){
                case "Home":
                  iconName = 'home';
                  break;
                case "Farms":
                  iconName = 'tractor';
                  break;
                  case "Account":
                    iconName = 'account';
                    break;
                  case "Camera":
                    iconName = 'camera';
                    break;
              }
              return <Icon name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: useThemedStyles(red),
            tabBarInactiveTintColor: useThemedStyles(text),
            tabBarStyle: {
              backgroundColor: useThemedStyles(background),
            },
          })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Farms" component={FarmStackScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountScreen}/>
            <Tab.Screen name="Camera" component={PhotoScreen}/>
            
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
      </RecoilRoot>
    </IconComponentProvider>
    </ThemeProvider>
    )
  }
  return (
    <ThemeProvider>
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <RecoilRoot>
      <ApolloProvider client={client}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Sign In">
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
      </RecoilRoot>
    </IconComponentProvider>
    </ThemeProvider>
  );
}
