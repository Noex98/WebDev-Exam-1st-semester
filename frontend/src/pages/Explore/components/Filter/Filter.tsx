import React from 'react'
import { ReactComponent as FilterIcon } from '../../../../assets/icons/filter.svg';
import { TextInput } from '../../../../components'

type Props = {
}

export const Filter = ({setFilter}: Props) => {
    return (
        <div className='components__Filter'>
            <TextInput placeholder='Search for a specific restaurant...' >

                <FilterIcon />
            </TextInput>
            
        </div>
    )
}
