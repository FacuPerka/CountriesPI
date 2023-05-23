import NavBar from '../NavBar/navbar.jsx';
import Cards from '../Cards/cards.jsx'
import style from '../Home/home.module.css'

export default function Home() {
    return (
        <div className={style.home}>
        <NavBar/>
        <Cards/>
        </div>
    )
}