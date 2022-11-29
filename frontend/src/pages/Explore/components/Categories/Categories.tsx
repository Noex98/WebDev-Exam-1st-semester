import './style.scss';


type Props = {
   categories: number[], 
   setCategories: React.Dispatch<React.SetStateAction<number[]>>
}

export const Categories = ({  }: Props) => {


    return (
        <div className='components__Categories'>
            Categories
        </div>
    )
}

