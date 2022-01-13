import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Socket } from './Socket.js';
import { Icon28UserAddOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';

var id;
const WindowRefSystem = props => {
    const socket = new Socket();

    const id = socket.getId();

    return ReactDOM.createPortal(
        <div className='modal_wrapper'>
            <div className='modal_referal_system'>
                <div className='icon'>
                    <Icon28UserAddOutline/>
                </div>
                <span className='name'>Реферальная система</span>
                <span className='description'>Если вы пригласите по этой ссылке игрока, который еще не играл в игру, вы будете получать <color>10%</color> его дохода</span>
                <input className='ref_link' name="ref_link" value={`https://vk.com/app7972826#${id}`}></input>
                <div className='copy' onClick={() => {bridge.send("VKWebAppCopyText", {"text": `https://vk.com/app7972826#${id}`});}}>Скопировать</div>
            </div>
            <div className='back_div' onClick={() => {props.setShow(false)}}></div>
        </div>,
        document.getElementById('portal')
    )
}

export default WindowRefSystem;