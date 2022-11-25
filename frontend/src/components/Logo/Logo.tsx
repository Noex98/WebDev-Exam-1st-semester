import React from 'react'
import { ReactComponent as LogoSvg } from '../../assets/icons/logo.svg';

type Props = {
    color: "dark" | "light"
}

export const Logo = ({color}: Props) => {
    return (
        <LogoSvg />
    )
}
