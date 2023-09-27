import React, { useState } from "react";
import './../styles/calculator.scss'

import box from './../assets/box.png'
import arrow from './../assets/arrow.png'
import yuan from './../assets/yuan.png'
import ruble from './../assets/ruble.png'
import equal from './../assets/equal.png'
import { getYuan } from "../http/yuanAPI";

const Calculator = () => {
    const [isChoosing, setIsChoosing] = useState(false)
    const [isChosen, setIsChosen] = useState(false)
    const [type, setType] = useState()
    const [yuanCost, setYuanCost] = useState()
    const [yuanCourse, setYuanCourse] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    const chooseType = () => {
        const arrow = document.querySelector('.Arrow')
        const list = document.querySelector('.TypesList')
        if (isChoosing) {
            setIsChoosing(false)
            arrow.classList.remove('Active')
            list.classList.add('None')
        } else {
            setIsChoosing(true)
            arrow.classList.add('Active')
            list.classList.remove('None')
        }
    }

    const chooseTypeItem = (e) => {
        const items = document.getElementsByClassName('TypeItem')
        for (let i of items) {
            i.classList.remove('Active')
        }
        e.target.classList.add('Active')
        setIsChoosing(false)
        document.querySelector('.TypesList').classList.add('None')
        document.querySelector('.Arrow').classList.remove('Active')
        document.querySelector('.Type').classList.add('Active')
        document.querySelector('.TypeText').innerHTML = `${e.target.innerText}`
        setIsChosen(true)
        setType(e.target.id)
    }

    const calculateCost = (e) => {
        const cleanedCost = e.target.value.replace(/\D/g, '')
        setYuanCost(cleanedCost)
        fetchYuan()
        if (e.target.value.length > 0) {
            let totalcost = 0
            if (type === 'item1' && yuanCourse.course) {
                if (Number(e.target.value) < 50) totalcost = Number(yuanCourse.course) * Number(e.target.value) + 500 + 1700
                else totalcost = Number(yuanCourse.course) * Number(e.target.value) + 999 + 1700
            }
            if (type === 'item2' && yuanCourse.course) {
                if (Number(e.target.value) < 50) totalcost = Number(yuanCourse.course) * Number(e.target.value) + 500 + 1700
                else totalcost = Number(yuanCourse.course) * Number(e.target.value) + 999 + 1000
            }
            if (type === 'item3' && yuanCourse.course) {
                if (Number(e.target.value) < 50) totalcost = Number(yuanCourse.course) * Number(e.target.value) + 500 + 1700
                else totalcost = Number(yuanCourse.course) * Number(e.target.value) + 999 + 1300
            }
            setTotalCost(totalcost)
        } else {
            setTotalCost(0)
        }
        if (e.target.value.length > 0 && Number(e.target.value) < 50) {
            document.querySelector('.Sale').classList.remove('None')
        } else {
            document.querySelector('.Sale').classList.add('None')
        }
    }

    const fetchYuan = async () => {
        try {
            getYuan().then(data => setYuanCourse(data))
        } catch (e) {

        }
    }

    return (
        <div className="CalculatorContainer">
            <div className="Type" onClick={chooseType}>
                <div className="BoxImgContainer">
                    <img src={box} alt="box" />
                </div>
                <div className="TypeTextContainer">
                    <div className="TypeText">Выберите вид посылки</div>
                    <img className="Arrow" src={arrow} alt="arrow" />
                </div>
            </div>
            <div className="TypesList None">
                <div className="TypeItem ItemFirst" id="item1" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item1">Кроссовки</div>
                    <div className="CircleContainer" id="item1">
                        <div className="ItemCircle" id="item1"></div>
                    </div>
                </div>
                <div className="TypeItem" id="item2" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item2">Брюки, футболки, кофты</div>
                    <div className="CircleContainer" id="item2">
                        <div className="ItemCircle" id="item2"></div>
                    </div>
                </div>
                <div className="TypeItem ItemLast" id="item3" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item3">Куртки</div>
                    <div className="CircleContainer" id="item3">
                        <div className="ItemCircle" id="item3"></div>
                    </div>
                </div>
            </div>
            {isChosen &&
                <>
                    <div className="TotalCostContainer">
                        <div className="CostContainer Yuan">
                            <div className="CostSimbol">
                                <img src={yuan} alt="yuan" />
                            </div>
                            <input className="CostInput" type="text" placeholder="Цена в юанях" value={yuanCost} onChange={calculateCost} />
                        </div>
                        <div className="EqualSimbol">
                            <img src={equal} alt="equal" />
                        </div>
                        <div className="CostContainer Ruble">
                            <div className="CostSimbol">
                                <img src={ruble} alt="ruble" />
                            </div>
                            <input className="CostInput" type="text" value={totalCost} />
                        </div>
                    </div>
                    <div className="Sale None">Для вас применена скидка 50% на комиссию из-за того, что стоимость вещи меньше 50 юаней</div>
                </>
            }
            <div className="ShipNew">
                <a className="ShipLink" href="https://t.me/ship_snikers" target="_blank" rel="noreferrer">Оформить новый заказ</a>
            </div>
        </div>
    );
}
 
export default Calculator;