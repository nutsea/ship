import React, { useState } from "react";
import './../styles/tracker.scss'

import loop from './../assets/loop.png'
import { getOrder } from "../http/orderAPI";

const Tracker = () => {
    const [trackNumber, setTrackNumber] = useState('')
    const [status, setStatus] = useState(0)

    const changeTrackNumber = (e) => {
        if (e.target.value.length <= 20) setTrackNumber(e.target.value)
        if (e.target.value.length > 0) {
            document.querySelector('.TrackInputContainer').classList.add('Active')
        } else {
            document.querySelector('.TrackInputContainer').classList.remove('Active')
        }
        fetchOrder(e.target.value)
    }

    const fetchOrder = async (track) => {
        try {
            await getOrder(track).then((data) => {
                if (data) setStatus(Number(data))
                else setStatus(0)
            })
            console.log(status)
        } catch (e) {

        }
    }

    return (
        <div className="TrackerContainer">
            <div className="TrackInputContainer ">
                <div className="TrackSimbol">
                    <img src={loop} alt="ruble" />
                </div>
                <input className="TrackInput" type="text" placeholder="Поиск заказов..." value={trackNumber} onChange={changeTrackNumber} />
            </div>
            {trackNumber.length > 0 &&
                <div className="SearchContainer">
                    <div className="SearchSub">
                        <div className="SearchText">Трек-номер</div>
                        <div className="SearchNumber">#{trackNumber}</div>
                    </div>
                    <div className="SearchLine"></div>
                    {status > 0 &&
                        <div className={`StatusItem ${status === 1 ? 'Active' : ''}`} id="status1">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Выкуплен</div>
                        </div>
                    }
                    {status > 1 &&
                        <div className={`StatusItem ${status === 2 ? 'Active' : ''}`} id="status2">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Отправлен на легит</div>
                        </div>
                    }
                    {status > 2 &&
                        <div className={`StatusItem ${status === 3 ? 'Active' : ''}`} id="status3">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Отправлен на склад в Китае</div>
                        </div>
                    }
                    {status > 3 &&
                        <div className={`StatusItem ${status === 4 ? 'Active' : ''}`} id="status4">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Выехал из китая</div>
                        </div>
                    }
                    {status > 4 && 
                        <div className={`StatusItem ${status === 5 ? 'Active' : ''}`} id="status5">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Ожидается оплата доставки</div>
                        </div>
                    }
                    {status > 5 &&
                        <div className={`StatusItem ${status === 6 ? 'Active' : ''}`} id="status6">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Передан в СДЭК</div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}
 
export default Tracker;