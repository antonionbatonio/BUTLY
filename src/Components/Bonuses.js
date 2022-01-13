import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import Shop from './Shop.js';
import { Icon28ChevronBack } from '@vkontakte/icons';
import { Icon28CoinsOutline } from '@vkontakte/icons';
import { Icon28DoneOutline } from '@vkontakte/icons';
import { Icon28CancelOutline } from '@vkontakte/icons';
import { Socket } from './Socket.js';
import bridge from '@vkontakte/vk-bridge';

const socket = new Socket();

function openShop() {
    ReactDOM.render(
        <Shop/>,
        document.getElementsByClassName('App')[0]
    )
}

function showError() {
    const no_ad = document.getElementsByClassName("no_ad")[0];
    
    no_ad.style.display="flex";
    setTimeout(()=>{
        no_ad.style.display="none";
    },1800)
}

const Bonuses = () => {
    return(
        <Fragment>
            <div className='header'>
                <Icon28ChevronBack className='chevron_back' onClick={() => {openShop()}}/>
                <div id='title'>Бонусы</div>
            </div>
            <div className='bonuses_items'>
                <div className='bonus' onClick={() => {
                    bridge.send("VKWebAppShowNativeAds", {ad_format:"reward"})
                    .then(data => {
                        if(data.result) {
                            socket.money_for_ad()
                        }
                    })
                    .catch(error => showError());
                }}>
                    <div className='icon'><Icon28CoinsOutline/></div>
                    <div className='description'>
                        <div className='bonus_name'>Монетки</div>
                        <div className='bonus_description'>После просмотра рекламы вы получите монетки (сумма монеток зависит от вашего прогресса)</div>
                    </div>
                </div>
                <div className='bonus' onClick={() => {
                    bridge.send("VKWebAppShowNativeAds", {ad_format:"reward"})
                    .then(data => {
                        if(data.result) {
                            socket.boostx2_for_ad()
                        }
                    })
                    .catch(error => showError());
                }}>
                    <div className='icon'><Icon28CoinsOutline/></div>
                    <div className='description'>
                        <div className='bonus_name'>Бустер монет x2</div>
                        <div className='bonus_description'>После просмотра рекламы вы получите бустер монет x2 на 3 минуты</div>
                    </div>
                </div>
            </div>
            <div className='please_wait'>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg_pls_wait'>Подождите</div>
            </div>
            <div className='boostx2_activated'>
                <div className='icon'>
                    <Icon28DoneOutline width={22} height={22} className='success_icon'/>
                </div>
                <div className='msg'>Бустер активирован</div>
            </div>
            <div className='success_message'>
                <div className='icon'>
                    <Icon28DoneOutline width={22} height={22} className='success_icon'/>
                </div>
                <div className='msg_money'>Успешная покупка</div>
            </div>
            <div className='no_ad'>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg'>Нет рекламы, попробуйте еще раз</div>
            </div>
        </Fragment>
    )
}

export default Bonuses;