import React,{Fragment} from 'react';

const CreateItem = props => {
    return(
        <Fragment>
            <div className='item'>
                <div className="icon">{props.icon}</div>
                <div className="item_name">
                    <span>{props.name}</span>
                    <div className='plus'>+{props.plus}</div>
                </div>
                <div className='buy_btn' onClick={props.onClick}>{props.price.toLocaleString()}</div>
            </div>
        </Fragment>
    )
}

export default CreateItem;