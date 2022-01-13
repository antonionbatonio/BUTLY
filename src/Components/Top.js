import React,{Fragment} from 'react';
import { Icon28ChevronBack } from '@vkontakte/icons';
import CreateUser from './CreateUser.js'
import ReactDOM from 'react-dom';
import Main from './Main.js';
import bridge from '@vkontakte/vk-bridge';
import { Socket } from './Socket.js';

const socket = new Socket();

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

const Top = () => {
    return(
        <Fragment>
            <div className='header'>
                <Icon28ChevronBack className='chevron_back' onClick={() => {openMainPage()}}/>
                <div id='title'>Топ</div>
            </div>
            <div className='buttons'>
                <div className='btn_money' onClick={() => {socket.getUsersRatingMoney()}}>Монеты</div>
                <div className='btn_clicks' onClick={() => {socket.getUsersRatingClicks()}}>Клики</div>
            </div>
            <div className='users'></div>
        </Fragment>
    )
}

export default Top;