import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Button, Paper} from '@material-ui/core'
import classes from "./CarouselCustom.module.scss"
import classnames from 'classnames'

interface Props {
    items: any[],
    autoplay?: boolean,
    stopAutoPlayOnHover?: boolean,
    interval?: number,
    indicators?: boolean,
    animation?: "fade" | "slide",
    timeout?: number,
    swipe?: boolean,
    navButtonsAlwaysVisible?: boolean,
    navButtonsAlwaysInvisible?: boolean,
    fullHeightHover?: true,
    index?: number,
    strictIndexing?: boolean,
    changeOnFirstRender?: boolean,
    indicatorProps?: {className: string, style: React.CSSProperties},
    activeIndicatorProps?: {className: string, style: React.CSSProperties},
    indicatorContainerProps?: {className: string, style: React.CSSProperties},
    onChange?: (index: number, active: number) => void,
    next?: (next: number, active: number) => void,
    prev?: (next: number, active: number) => void
}

const Item: React.FC<any> = (props) => {
    return <Paper>
        <div className={classnames("d-flex",classes.CarouselContainer)} style={{ background: `url(${props.item.imageLink})` }}>

        </div>
    </Paper>
}

// https://www.npmjs.com/package/react-material-ui-carousel
export const CarouselCustom: React.FC<Props> = ({
    items,
    autoplay = true,
    stopAutoPlayOnHover = true,
    interval = 2000,
    indicators = true,
    animation = "slide",
    timeout = 500,
    swipe = true,
    navButtonsAlwaysVisible = false,
    navButtonsAlwaysInvisible = false,
    fullHeightHover = true,
    index = 0,
    strictIndexing = true,
    changeOnFirstRender = false,
    indicatorProps,
    activeIndicatorProps,
    indicatorContainerProps,
    onChange = ()=>{},
    next = () => {},
    prev = () => {}
}: Props) => {
    
    return (
        <Carousel
            autoPlay = {autoplay}
            stopAutoPlayOnHover={stopAutoPlayOnHover}
            interval={interval}
            indicators = {indicators}
            animation = {animation}
            timeout = {timeout}
            swipe = {swipe}
            navButtonsAlwaysVisible = {navButtonsAlwaysVisible}
            navButtonsAlwaysInvisible = {navButtonsAlwaysInvisible}
            fullHeightHover = {fullHeightHover}
            index = {index}
            strictIndexing = {strictIndexing}
            changeOnFirstRender = {changeOnFirstRender}
            indicatorProps = {indicatorProps}
            activeIndicatorProps = {activeIndicatorProps}
            indicatorContainerProps = {indicatorContainerProps}
            onChange = {onChange}
            next = {next}
            prev = {prev}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
