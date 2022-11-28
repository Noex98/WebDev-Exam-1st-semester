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
            <TextInput placeholder='Search for a specific restaurant...' onChange={e => setSearchString(e.target.value)}>

                <FilterIcon onClick={() => setIsPopupOpen(true)} />
            </TextInput>
            <Popup open={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
                <div>
                    <button onClick={() => setSortBy("price")} className={sortBy === "price" ? "active" : ""}> Price </button>
                    <button onClick={() => setSortBy("distance")} className={sortBy === "distance" ? "active" : ""}> Distance </button>
                    
                    <span>{maxDistance}</span>
                    <br></br>
                    <input type="range" min="1" max="100" onChange={e => setMaxDistance(parseInt(e.target.value))}></input>
                </div>
            </Popup>
        </div>
    )
}

/* 
buttons der ændrer setSortby
slider der ændrer maxDistance 
*/
