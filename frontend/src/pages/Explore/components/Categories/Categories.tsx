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
            <h2>Categories</h2>
            <div className='scrollbar'>
                {categories && categories.map((category, index) => (
                    <div className='images' key={index} style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%),
                        url(${category.image})`
                    }}><p>{category.name}</p></div>
                ))}
                {!categories && (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}

