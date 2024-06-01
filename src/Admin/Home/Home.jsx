import UserPlanPieChart from '../components/UserPlanPieChart/UserPlanPieChart'
import TopUsers from '../components/TopUsers/TopUsers'
import Styles from './Home.module.css'
import ChartBox from '../components/chartBox/ChartBox'

export default function Home1() {
  return (
    <div className={Styles.home}>
      <div className={`${Styles.box} ${Styles.box1}`}><TopUsers /></div>
      <div className={`${Styles.box} ${Styles.box2}`}><ChartBox collectionName="users"/></div>
      <div className={`${Styles.box} ${Styles.box3}`}><ChartBox collectionName="subscribed-users"/></div> 
      <div className={`${Styles.box} ${Styles.box4}`}><ChartBox collectionName="referral-code"/></div>
      <div className={`${Styles.box} ${Styles.box6}`}><ChartBox collectionName="visitors"/></div>
      <div className={`${Styles.box} ${Styles.box5}`}><UserPlanPieChart /></div>
    </div>
  )
}