import { useEffect, useState } from 'react';
import { apiService } from '../../../../service/apiService';
import { ICategory } from '../../../../types';
import './style.scss';


type Props = {
    selectedCategories: number[],
    setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>
}

export const Categories = ({ selectedCategories, setSelectedCategories }: Props) => {
    const [categories, setCategories] = useState<ICategory[] | null>(null)
    useEffect(() => {
        apiService.getCategories().then(res => {
            if (res.succes) {
                setCategories(res.data)
            }
        })
    }, [])

    return (
        <div className='components__Categories'>
            Categories

            {categories && categories.map((category, index) => (
                <div key={index}>{category.name}</div>
            ))}
            {!categories && (
                <div>Loading</div>
                )}
        </div>
    )
}

