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

    const clickHandler = (id: number) => {
        const index = selectedCategories.indexOf(id);
        if (index === -1) {
            setSelectedCategories(prev => [...prev, id])
        } else {
            setSelectedCategories(prev => {
                const output = [...prev];
                output.splice(index, 1)
                return [...output];

            })
        }
    }

    return (
        <div className='components__Categories'>
            <h2>Categories</h2>
            <div className='container'>
                {categories && categories.map((category, index) => (
                    <div key={index} className={`imageWrapper ${selectedCategories.includes(category.id) ? "active" : ""}`}>
                        <div
                            onClick={() => clickHandler(category.id)}
                            className='image'
                            style={{
                                background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%), url(${category.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                           }}>
                            <p>{category.name}</p>
                        </div>
                    </div>
                ))}
                {!categories && (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}

