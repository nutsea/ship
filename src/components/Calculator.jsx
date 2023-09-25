import React, { useState } from "react";
import './../styles/calculator.scss'

import box from './../assets/box.png'
import arrow from './../assets/arrow.png'
import yuan from './../assets/yuan.png'
import ruble from './../assets/ruble.png'
import equal from './../assets/equal.png'

const Calculator = () => {
    const [isChoosing, setIsChoosing] = useState(false)
    const [isChosen, setIsChosen] = useState(false)
    const [type, setType] = useState()
    const [yuanCost, setYuanCost] = useState()

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
        console.log(type)
    }

    const calculateCost = (e) => {
        const cleanedCost = e.target.value.replace(/\D/g, '')
        setYuanCost(cleanedCost)
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
                    <div className="ItemText">Кроссовки, куртки, кофты, штаны</div>
                    <div className="CircleContainer">
                        <div className="ItemCircle"></div>
                    </div>
                </div>
                <div className="TypeItem" id="item2" onClick={chooseTypeItem}>
                    <div className="ItemText">Футболки, шорты, сумки</div>
                    <div className="CircleContainer">
                        <div className="ItemCircle"></div>
                    </div>
                </div>
                <div className="TypeItem ItemLast" id="item3" onClick={chooseTypeItem}>
                    <div className="ItemText">Аксессуары, белье</div>
                    <div className="CircleContainer">
                        <div className="ItemCircle"></div>
                    </div>
                </div>
            </div>
            {isChosen &&
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
                        <input className="CostInput" type="text" value={yuanCost ? yuanCost * 14 : 0} />
                    </div>
                </div>
            }
            <button className="ShipNew">Оформить новый заказ</button>
        </div>
    );
}
 
export default Calculator;