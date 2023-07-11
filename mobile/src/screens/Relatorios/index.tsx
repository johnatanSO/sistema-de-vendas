import { useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from './RelatoriosStyles'
import HeaderReports from '../../layout/HeaderReports'
import { ProductsList } from './ProductsList'
import { Submenu } from './Submenu'

export function Relatorios({ navigation }: any) {
  const [activeReport, setActiveReport] = useState<string>('products')

  return (
    <View style={styles.container}>
      <HeaderReports />

      <Submenu activeReport={activeReport} setActiveReport={setActiveReport} />

      {activeReport === 'products' ? (
        <ProductsList focus={activeReport} navigation={navigation} />
      ) : activeReport === 'clients' ? (
        <Text style={{ color: 'white', marginTop: 20 }}>
          Página de clientes em desenvolvimento...
        </Text>
      ) : (
        <Text style={{ color: 'white', marginTop: 20 }}>404 Not found</Text>
      )}
    </View>
  )
}
