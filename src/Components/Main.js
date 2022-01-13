import React,{Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import { Icon28CoinsOutline } from '@vkontakte/icons';
import { Icon28Users3Outline } from '@vkontakte/icons';
import { Icon28ChevronRightOutline } from '@vkontakte/icons';
import { Icon28ShoppingCartOutline } from '@vkontakte/icons';
import { Icon28MoneyTransferOutline } from '@vkontakte/icons';
import { Icon28UserAddOutline } from '@vkontakte/icons';
import { Icon28SwitchOutline } from '@vkontakte/icons';
import { Icon28TargetOutline } from '@vkontakte/icons';
import Top from './Top.js';
import Shop from './Shop.js';
import WindowRefSystem from './WindowRefSystem.js';
import Transfer from './Transfer.js';
import { Socket } from './Socket.js';
import bridge from '@vkontakte/vk-bridge';

const Main = props => {
    const [isShow, setShow] = useState(false);
    const socket = new Socket();

    function openRating() {
        ReactDOM.render(
            <Top/>,
            document.getElementsByClassName('App')[0]
        )
        socket.getUsersRatingMoney();
    }
    
    function openShop() {
        ReactDOM.render(
            <Shop/>,
            document.getElementsByClassName('App')[0]
        )
    }
    
    function openTransfer() {
        ReactDOM.render(
            <Transfer/>,
            document.getElementsByClassName('App')[0]
        )
        setTimeout(() => {
            const input = document.getElementsByClassName("search")[0];
            input.addEventListener('input', () => {
                const value = document.getElementsByName("search")[0].value;
                socket.search(value);
            });
        }, 100);
    }

    return(
        <Fragment>
            {isShow && <WindowRefSystem
                setShow={setShow}
            />}
            <div className='header'>
                <div className='title'>Главная</div>
            </div>
            <div className='profile'>
                <div className='photo'>
                    <img src={props.photo} alt='' id='photo'></img>
                </div>
                <div className='name' id="name">{props.name}</div>
                <div className='balance'>
                    <div className='coins'>
                        <Icon28CoinsOutline className='coin_icon' width={24} height={24}/>
                    </div>
                    <div className='amount_coins'>
                        <span className='amount'>0</span>
                        <span>Монет</span>
                    </div>
                </div>
                <div className='btn_click' onClick={() => {
                    socket.click();
                }}>Сделать клик</div>
            </div>
            <div className='rating' onClick={() => {openRating()}}>
                <div className='users_icon'>
                    <Icon28Users3Outline width={24} height={24}/>
                </div>
                <span>Топ</span>
                <Icon28ChevronRightOutline className='chevron_right'/>
            </div>
            <div className='shop' onClick={() => {openShop()}}>
                <div className='users_icon'>
                    <Icon28ShoppingCartOutline width={24} height={24}/>
                </div>
                <span>Магазин</span>
                <Icon28ChevronRightOutline className='chevron_right'/>
            </div>
            <div className='transfer' onClick={() => {
                openTransfer();
                socket.search("");
            }}>
                <div className='users_icon'>
                    <Icon28MoneyTransferOutline width={24} height={24}/>
                </div>
                <span>Перевод</span>
                <Icon28ChevronRightOutline className='chevron_right'/>
            </div>
            <div className='ref_system' onClick={() => {setShow(true)}}>
                <div className='users_icon'>
                    <Icon28UserAddOutline width={24} height={24}/>
                </div>
                <span>Реферальная система</span>
                <Icon28ChevronRightOutline className='chevron_right'/>
            </div>
            <div className='loading'>
                <div className='rotate'>
                    <Icon28SwitchOutline width={42} height={42} className='rotate_icon'/>
                </div>
            </div>
            <div className='amounts'>
                <div className='amount_money'>
                    <div className='icon'>
                        <Icon28CoinsOutline width={24} height={24}/>
                    </div>
                    <div className='amount_coins'>
                        <span className='amount'>0</span>
                        <span>Монет в сумме у всех на руках</span>
                    </div>
                </div>
                <div className='amount_clicks'>
                    <div className='icon'>
                        <Icon28TargetOutline width={24} height={24}/>
                    </div>
                    <div className='clicks_amount'>
                        <span className='amount'>0</span>
                        <span>Кликов в сумме все сделали</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Main;