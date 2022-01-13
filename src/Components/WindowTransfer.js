import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Socket } from './Socket.js';

const WindowTransfer = props => {
    const socket = new Socket();

    return ReactDOM.createPortal(
            <div className="modal_wrapper">
                <div className='modal_transfer'>
                    <div className='user_profile'>
                        <div className='photo_user'>
                            <img src={props.photo} alt=""></img>
                        </div>
                        <div className='name_and_coins'>
                            <div className='user_name'>{props.name}</div>
                            <div className='user_coins'>{props.coins.toLocaleString()}</div>
                        </div>
                    </div>
                    <input className='amount_transfer' name='amount_transfer' placeholder='Сумма перевода' type="number"></input>
                    <div className='send_button' onClick={() => {
                        const amount = document.getElementsByName("amount_transfer")[0].value;

                        socket.transfer(props.recepient_id, amount);
                        props.setShow(false);
                    }}>Отправить</div>
                </div>
                <div className='back_div' onClick={() => {props.setShow(false)}}></div>
            </div>,
        document.getElementById('portal')
    )
}

export default WindowTransfer;