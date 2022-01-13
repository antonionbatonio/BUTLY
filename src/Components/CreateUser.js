import React,{Fragment} from 'react';
import { Icon28ChevronRightOutline } from '@vkontakte/icons';

const CreateUser = props => {
    return(
        <Fragment>
            <a target="_blank" href={props.link}>
                <div className='user'>
                    <span className='place'>
                        {props.place}
                    </span>
                    <div className='photo'>
                        <img src={props.photo} alt=''></img>
                    </div>
                    <div className='description'>
                        <div className='name'>{props.name}</div>
                        <div className='user_coins'>{props.coins.toLocaleString()}</div>
                    </div>
                    <Icon28ChevronRightOutline className='chevron_right'/>
                </div>
            </a>
        </Fragment>
    )
}

export default CreateUser;