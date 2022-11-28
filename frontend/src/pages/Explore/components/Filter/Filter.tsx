import React, { useState } from 'react'
import { ReactComponent as FilterIcon } from '../../../../assets/icons/filter.svg';
import { TextInput, Popup } from '../../../../components'

type Props = {
    searchString: string,
    setSearchString: React.Dispatch<React.SetStateAction<string>>,
    sortBy: "distance" | "price",
    setSortBy: React.Dispatch<React.SetStateAction<"distance" | "price">>,
    maxDistance: number,
    setMaxDistance: React.Dispatch<React.SetStateAction<number>>
}

export const Filter = ({ searchString, setSearchString, sortBy, setSortBy, maxDistance, setMaxDistance }: Props) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <div className='components__Filter'>
            <TextInput placeholder='Search for a specific restaurant...' >

                <FilterIcon onClick={() => setIsPopupOpen(true)} />
            </TextInput>
            <Popup open={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
                <div>
                    ljahdklajwhd
                </div>
            </Popup>
        </div>
    )
}

/* onchange event på textinput hvor værdien opdateres. setSearchString
buttons der ændrer setSortby
slider der ændrer maxDistance 
*/
