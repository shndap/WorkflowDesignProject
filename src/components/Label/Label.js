import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

const Label = ({text, color, show_remove=false, onClick=()=>{}}) => {
    const labelStyle = {
        backgroundColor: color,
        color: 'white',
        width: 'fit-content',
        padding: '5px 10px',
        borderRadius: '200px',
        marginRight: '5px',
        cursor: 'pointer'
    };

    return (
        <span style={labelStyle} onClick={onClick}>
            {text} {show_remove && (<FontAwesomeIcon icon={faClose}/>)}
        </span>
    );
};

export default Label;
