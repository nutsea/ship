import './styles/base.scss'
import './styles/app.scss'
import { useState } from 'react'
import Calculator from './components/Calculator'
import Tracker from './components/Tracker'

function App() {
    const [tab, setTab] = useState('calc')

    const tabClick = (e) => {
        const tabs = document.getElementsByClassName('Tab')
        for (let i of tabs) {
            i.classList.remove('Active')
        }
        e.target.classList.add('Active')
        setTab(e.target.id)
    }

    return (
        <div className="App">
            <div className='Subtitle'>WP SHOP</div>
            <div className='Tabs'>
                <div className='Tab Active' id='calc' onClick={tabClick}>КАЛЬКУЛЯТОР</div>
                <div className='Tab' id='track' onClick={tabClick}>ОТСЛЕЖИВАНИЕ</div>
            </div>
            {tab === 'calc' ?
                <Calculator />
                : tab === 'track' &&
                <Tracker />
            }
        </div>
    );
}

export default App;
