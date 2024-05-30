import PlanSubscriptionBarChart from '../components/BarChart/BarChart'
import PaymentDistributionStackedBarChart from '../components/PaymentStatusChart/PaymentStatusChart'
import TopUsers from '../components/TopUsers/TopUsers'
import ChartBox from '../components/chartBox/ChartBox'
import PieChart from '../components/pieChartBox/PieChartBox'
import Styles from './Home.module.css'

export default function Home1() {
  return (
    <div className={Styles.home}>
      <div className={`${Styles.box} ${Styles.box1}`}><TopUsers/></div>
      <div className={`${Styles.box} ${Styles.box2}`}><ChartBox collectionName="users"/></div>
      <div className={`${Styles.box} ${Styles.box3}`}><ChartBox collectionName="orders"/></div>
      <div className={`${Styles.box} ${Styles.box4}`}><PieChart/></div>
      <div className={`${Styles.box} ${Styles.box5}`}><ChartBox collectionName="blogs"/></div>
      <div className={`${Styles.box} ${Styles.box6}`}><ChartBox collectionName="clients"/></div>
      <div className={`${Styles.box} ${Styles.box7}`}><PaymentDistributionStackedBarChart /></div>
      <div className={`${Styles.box} ${Styles.box8}`}><PlanSubscriptionBarChart /></div>
    </div>
  )
}