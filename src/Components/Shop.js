import React,{Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import Bonuses from './Bonuses.js';
import CreateItem from './CreateItem.js';
import bridge from '@vkontakte/vk-bridge';
import { Icon28ChevronBack } from '@vkontakte/icons';
import { Icon28WriteOutline } from '@vkontakte/icons';
import { Icon28VoiceOutline } from '@vkontakte/icons';
import { Icon28VideocamOutline } from '@vkontakte/icons';
import { Icon28BookOutline } from '@vkontakte/icons';
import { Icon28BombOutline } from '@vkontakte/icons';
import { Icon28BasketballBallOutline } from '@vkontakte/icons';
import { Icon28BankOutline } from '@vkontakte/icons';
import { Icon28BusOutline } from '@vkontakte/icons';
import { Icon28CoinsOutline } from '@vkontakte/icons';
import { Icon28GiftOutline } from '@vkontakte/icons';
import { Icon28CancelOutline } from '@vkontakte/icons';
import { Icon28DoneOutline } from '@vkontakte/icons';
import { Icon28CompassOutline } from '@vkontakte/icons';
import { Icon28CarOutline } from '@vkontakte/icons';
import { Socket } from './Socket.js';

const socket = new Socket();

function openBonuses() {
    ReactDOM.render(
        <Bonuses/>,
        document.getElementsByClassName('App')[0]
    )
}

function openMainPage() {
    bridge.send("VKWebAppGetUserInfo").then(res => {
        const photo = res.photo_200;
        const name = `${res.first_name} ${res.last_name}`;
        
        ReactDOM.render(
        <Main
          photo={photo}
          name={name}
        />,
        document.getElementsByClassName('App')[0]
        )
      })
      setTimeout(() => {
        socket.getBalance();
      }, 300);
}

const Shop = () => {
    return(
        <Fragment>
            <div className='header'>
                <Icon28ChevronBack className='chevron_back' onClick={() => {openMainPage()}}/>
                <div id='title'>Магазин</div>
            </div>
            <div className='bonuses' onClick={() => {openBonuses()}}>
                <div className='icon'><Icon28GiftOutline/></div>
                <div className='description'>
                    <div className='bonuses_name'>Бонусы</div>
                    <div className='bonuses_description'>Тут находятся разные бонусы</div>
                </div>
            </div>
            <div className='shop_items'>
                <CreateItem
                    onClick={() => {socket.buyPen()}}
                    icon={<Icon28WriteOutline width={22} height={22}/>}
                    name="Ручка"
                    price={1000}
                    plus={1}
                />
                <CreateItem
                    onClick={() => {socket.buyMicrophone()}}
                    icon={<Icon28VoiceOutline width={22} height={22}/>}
                    name="Микрофон"
                    price={10000}
                    plus={2}
                />
                <CreateItem
                    onClick={() => {socket.buyCamera()}}
                    icon={<Icon28VideocamOutline width={22} height={22}/>}
                    name="Камера"
                    price={60000}
                    plus={4}
                />
                <CreateItem
                    onClick={() => {socket.buyBook()}}
                    icon={<Icon28BookOutline width={22} height={22}/>}
                    name="Книжка"
                    price={144000}
                    plus={7}
                />
                <CreateItem
                    onClick={() => {socket.buyBomb()}}
                    icon={<Icon28BombOutline width={22} height={22}/>}
                    name="Бомбочка"
                    price={360000}
                    plus={10}
                />
                <CreateItem
                    onClick={() => {socket.buyBall()}}
                    icon={<Icon28BasketballBallOutline width={22} height={22}/>}
                    name="Мячик"
                    price={900000}
                    plus={12}
                />
                <CreateItem
                    onClick={() => {socket.buyBank()}}
                    icon={<Icon28BankOutline width={22} height={22}/>}
                    name="Банк"
                    price={1554000}
                    plus={15}
                />
                <CreateItem
                    onClick={() => {socket.buyBus()}}
                    icon={<Icon28BusOutline width={22} height={22}/>}
                    name="Автобус"
                    price={2496000}
                    plus={18}
                />
                <CreateItem
                    onClick={() => {socket.buyCompass()}}
                    icon={<Icon28CompassOutline width={22} height={22}/>}
                    name="Компас"
                    price={6500000}
                    plus={30}
                />
                <CreateItem
                    onClick={() => {socket.buyCar()}}
                    icon={<Icon28CarOutline width={22} height={22}/>}
                    name="Машина"
                    price={15000000}
                    plus={60}
                />
                <div className='booster' onClick={() => {socket.buyBoostCoinsx2()}}>
                    <div className='icon'><Icon28CoinsOutline/></div>
                    <div className='description'>
                        <div className='booster_name'>Бустер монет</div>
                        <div className='booster_description'>Вы будете получать за клик больше монет в два раза</div>
                        <div className='buy_btn'>20 000 000</div>
                    </div>
                </div>
            </div>
            <div className='fail_msg'>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg'>Нельзя купить второй раз</div>
            </div>
            <div className='fail_message'>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg'>Недостаточно монет</div>
            </div>
            <div className='success_message'>
                <div className='icon'>
                    <Icon28DoneOutline width={22} height={22} className='success_icon'/>
                </div>
                <div className='msg'>Успешная покупка</div>
            </div>
        </Fragment>
    )
}

export default Shop;