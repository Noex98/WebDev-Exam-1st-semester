import React from 'react'
import { ReactComponent as PinSvg } from '../../../../assets/icons/pin.svg';
import { TextInput } from '../../../../components';
import './style.scss';
import { ReactComponent as LocationSvg } from '../../../../assets/icons/location.svg';

export const Location = () => {
    return (
        <div className='components__Location'>
            <div className="locationDisplay">
                <PinSvg />
                <div>
                    <div>Search area near:</div>
                    <div>Gelocation</div>
                </div>
            </div>
            <TextInput placeholder='Type adress or city...'>
                <LocationSvg />
            </TextInput>
        </div>
    )
}
