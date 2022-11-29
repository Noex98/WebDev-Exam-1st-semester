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
            <div className='scrollbar'>
                {categories && categories.map((category, index) => (
                    <div className='images' key={index} style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.81) 61.98%), url(${category.image})`,                        
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>{category.name}</div>
                ))}
                {!categories && (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}

