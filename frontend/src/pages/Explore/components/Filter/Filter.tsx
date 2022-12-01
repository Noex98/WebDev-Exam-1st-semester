import React, { useState } from 'react'
import { ReactComponent as FilterIcon } from '../../../../assets/icons/filter.svg';
import { TextInput, Popup } from '../../../../components'
import './style.scss';


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
                <FilterIcon onClick={() => setIsPopupOpen(true)} width="22px" height="22px" />
            </TextInput>
            <Popup open={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
                <div>
                    <p>Sort by</p>
                    <button onClick={() => setSortBy("price")} className={sortBy === "price" ? "active" : ""}> Price </button>
                    <button onClick={() => setSortBy("distance")} className={sortBy === "distance" ? "active" : ""}> Distance </button>

                    <p>Max distance: {maxDistance} km</p>
                    <br></br>
                    <input type="range" min="1" max="200" onChange={e => setMaxDistance(parseInt(e.target.value))} />
                </div>
            </Popup>
        </div>
    )
}
