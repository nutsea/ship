import React, { useState } from "react";
import './../styles/tracker.scss'

import loop from './../assets/loop.png'
import { getOrder } from "../http/orderAPI";

const Tracker = () => {
    const [trackNumber, setTrackNumber] = useState('')
    const [order, setOrder] = useState()

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
            getOrder(track).then(data => setOrder(data))
            console.log(order)
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
                </div>
            }
        </div>
    );
}
 
export default Tracker;