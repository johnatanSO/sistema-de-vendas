import { Dashboard } from '../screens/Dashboard'
import { Relatorios } from '../screens/Relatorios'
import { NovaVenda } from '../screens/NovaVenda'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Vendas } from '../screens/Vendas'
import { Platform, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faChartPie,
  faClipboardList,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import theme from '../styles/theme'

const { Navigator, Screen } = createBottomTabNavigator()

export function Routes() {
  return (
    <View style={{ width: '100%', flex: 1 }}>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.COLORS.PRIMARY_COLOR,
          tabBarInactiveTintColor: theme.COLORS.GRAY_200,
          tabBarStyle: {
            backgroundColor: theme.COLORS.GRAY_600,
            borderTopWidth: 0,
            height: Platform.OS === 'ios' ? 85 : 60,
            paddingBottom: Platform.OS === 'ios' ? 15 : 7,
          },
        }}
      >
        <Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon color={color} icon={faChartPie} size={20} />
            ),
          }}
        />
        <Screen
          name="Vendas"
          component={Vendas}
          options={{
            title: 'Vendas',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon color={color} icon={faDollarSign} size={20} />
            ),
          }}
        />
        <Screen
          name="Relatorios"
          component={Relatorios}
          options={{
            title: 'Relatórios',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon color={color} icon={faClipboardList} size={20} />
            ),
          }}
        />
        <Screen
          name="NovaVenda"
          component={NovaVenda}
          options={{
            title: 'Nova venda',
            tabBarButton: () => null,
          }}
        />
      </Navigator>
    </View>
  )
}
