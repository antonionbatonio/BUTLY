import React,{Fragment, useState} from 'react';
import { Icon28ChevronRightOutline } from '@vkontakte/icons';
import WindowTransfer from './WindowTransfer.js';

const CreateUserTransfer = props => {
    const [isShow, setShow] = useState(false);
    return(
        <Fragment>
            {isShow && <WindowTransfer
                setShow={setShow}
                photo={props.photo}
                name={props.name}
                coins={props.coins}
                recepient_id={props.recepient_id}
            />}
            <div className='user' onClick={() => {setShow(true)}}>
                <div className='photo'>
                    <img src={props.photo} alt=''></img>
                </div>
                <div className='description'>
                    <div className='name'>{props.name}</div>
                    <div className='user_coins'>{props.coins.toLocaleString()}</div>
                </div>
                <Icon28ChevronRightOutline className='chevron_right'/>
            </div>
        </Fragment>
    )
}

export default CreateUserTransfer;