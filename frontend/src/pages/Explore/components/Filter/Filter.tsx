import React, { useEffect, useState } from 'react'
import { ReactComponent as FilterIcon } from '../../../../assets/icons/filter.svg';
import { TextInput } from '../../../../components'

type Props = {
    searchString: string, 
    setSearchString: React.Dispatch<React.SetStateAction<string>>,
    sortBy: "distance" | "price",
    setSortBy: React.Dispatch<React.SetStateAction<"distance" | "price">>,
    maxDistance: number,
    setMaxDistance: React.Dispatch<React.SetStateAction<number>>
}

export const Filter = ({}: Props) => {
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(10);

    useEffect(() => {
        const filter = {
            searchString: searchString,
            sortBy: sortBy,
            maxDistance: maxDistance,
        }
    }, [ searchString, sortBy, maxDistance])

    return (
        <div className='components__Filter'>
            <TextInput placeholder='Search for a specific restaurant...' >

                <FilterIcon />
            </TextInput>
            
        </div>
    )
}
