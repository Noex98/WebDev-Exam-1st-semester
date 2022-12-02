import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CtaButton, Nav, Popup, PriceTag, Spinner } from '../../components';
import { apiService } from '../../service/apiService';
import { IRestaurantFull } from '../../types';
import { ReactComponent as ClockSvg } from '../../assets/icons/clock.svg'
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow_left.svg'
import { ReactComponent as PeopleSvg } from '../../assets/icons/people.svg'
import { ReactComponent as CalenderSvg } from '../../assets/icons/calender.svg'
import { ReactComponent as TextBoxSvg } from '../../assets/icons/textBox.svg'

import './style.scss'

export const Restaurant = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [restaurant, setRestaurant] = useState<IRestaurantFull | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        if (id) {
            apiService.getRestaurant(id).then(res => {
                if (res.succes) {
                    setRestaurant(res.data)
                }
                setLoading(false)
            })
        }
    }, [])

    if (loading) {
        return (
            <>
                <Spinner />
                <Nav />
            </>
        );
    }

    if (!restaurant) {
        return (
            <>
                <div>No results</div>
                <Nav />
            </>
        )
    }

    return (
        <>
            <div className='pages__restaurant'>
                <div className='titleContainer'>
                    <ArrowSvg onClick={() => navigate('/explore')} />
                    <h2>{restaurant.name}</h2>
                    <ArrowSvg opacity='0' />
                </div>
                <div>
                    <h3>Description</h3>
                    <p>{restaurant.description}</p>
                </div>
                <div className='infoContainer'>
                    <div className='timeContainer'>
                        <ClockSvg /> {restaurant.openTime} - {restaurant.closeTime}
                    </div>
                    <PriceTag priceScore={restaurant.price} />
                </div>
                <img width='100%' src={restaurant.image} alt="" />
                <div className='buttonContainer'>
                    <CtaButton onClick={() => setPopupOpen(true)} color="positive">Make reservation</CtaButton>
                </div>

                <Popup open={popupOpen} closePopup={() => setPopupOpen(false)}>
                    <div className='popupContent'>
                        <div>
                            <PeopleSvg />
                            <label>
                                <div>Number of people</div>
                                <input type="text" />
                            </label>
                        </div>
                        <div>
                            <CalenderSvg />
                            <label>
                                <div>Time & date</div>
                                <input type="datetime-local" />
                            </label>
                        </div>
                        <div>
                            <TextBoxSvg />
                            <label>
                                <div>Comment</div>
                                <input type="text" />
                            </label>
                        </div>
                    </div>
                    <CtaButton color='positive'>Confirm</CtaButton>
                </Popup>

                {restaurant.menuItems.map((menuItem, index) => (
                    <div className='menuItems'>
                        <div className='wrapper'>
                            <h3 key={index}>{menuItem.title}</h3>
                            <h3 key={index}>{menuItem.price}kr</h3>
                        </div>
                        <p key={index}>{menuItem.description}</p>
                    </div>
                ))}

            </div>

            <Nav />
        </>
    )
}