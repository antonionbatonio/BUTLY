import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Icon28SwitchOutline } from '@vkontakte/icons';
import { Icon28WarningTriangleOutline } from '@vkontakte/icons';
import { Socket } from './Socket.js';
import Main from './Main.js';
import bridge from '@vkontakte/vk-bridge';

function reconnect() {
    bridge.send("VKWebAppGetUserInfo").then(res => {
        const photo = res.photo_200;
        const name = `${res.first_name} ${res.last_name}`;
        
    ReactDOM.render(
        <Main
        photo={photo}
        name={name}
        />,
        document.getElementsByClassName("App")[0]
    )
})
}

const Reconnect = () => {
    const socket = new Socket();

    return(
        <div className='reconnect_wrapper'>
        <Icon28WarningTriangleOutline width={50} height={50} className='warning_icon'/>
        <div className='msg'>Произошла <color>ошибка</color>, пожалуйста, попробуйте очистить кеш приложения (если с пк - закрыть) и зайти снова</div>
        <div className='msg'>По всем вопросам Вы можете написать в личные сообщения группы</div>
        <a href="https://vk.com/bulty" target="_blank"><div className='reconnect' onClick={() => {}}>Написать</div></a>
    </div>
    )
}

export default Reconnect;