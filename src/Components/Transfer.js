import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import bridge from '@vkontakte/vk-bridge';
import { Icon28ChevronBack } from '@vkontakte/icons';
import { Icon28CancelOutline } from '@vkontakte/icons';
import { Icon28DoneOutline } from '@vkontakte/icons';
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

const Transfer = () => {
    return(
        <Fragment>
            <div className='header'>
                <Icon28ChevronBack className='chevron_back' onClick={() => {openMainPage()}}/>
                <div id='title'>Перевод</div>
            </div>
            <input className='search' placeholder='Введите имя' name="search" onClick={() => {

            }}></input>
            <div className='users'></div>
            <div className='wait' onClick={() => {
                const wait = document.getElementsByClassName("wait")[0];
                wait.style.display="none"
            }}>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg'>Пожалуйста, подождите</div>
            </div>
            <div className='msg_fail' onClick={() => {
                const msg_fail = document.getElementsByClassName("msg_fail")[0];
                msg_fail.style.display="none"
            }}>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg'>Нельзя перевести себе</div>
            </div>
            <div className='fail_message' onClick={() => {
                const fail_message = document.getElementsByClassName("fail_message")[0];
                fail_message.style.display="none"
            }}>
                <div className='icon'>
                    <Icon28CancelOutline width={22} height={22} className='fail_icon'/>
                </div>
                <div className='msg'>Недостаточно монет</div>
            </div>
            <div className='success_message' onClick={() => {
                const success_message = document.getElementsByClassName("success_message")[0];
                success_message.style.display="none"
            }}>
                <div className='icon'>
                    <Icon28DoneOutline width={22} height={22} className='success_icon'/>
                </div>
                <div className='msg'>Успешный перевод</div>
            </div>
        </Fragment>
    )
}

export default Transfer;