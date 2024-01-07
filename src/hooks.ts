import {useState, useEffect, CSSProperties} from 'react'

interface UseAnimatedScaleProp {
    scale : number, 
    start : () => void
}

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) : UseAnimatedScaleProp => {
    const [scale, setScale] = useState<number>(0)
    const [animating, setAnimating] = useState<boolean>(false)
    return {
        scale, 
        start() {
            if (!animating) {
                setAnimating(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev >= 1) {
                            setAnimating(false)
                            clearInterval(interval)
                            return 1 
                        }
                        return prev + scGap // 0 -> 0.01, 0.01 -> 0.02, 0.02 -> 0.03..... 0.99 -> 1 
                    }) 
                }, delay)
            }
        }
    }
}

interface UseDimensionProp {
    w : number, 
    h : number 
}

export const useDimension = () : UseDimensionProp => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        const listener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', listener, false)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])
    return {
        w, 
        h
    }
}

type StyleFn = () => CSSProperties

export interface UseStyleProp {
    containerStyle : StyleFn,
    boxStyle : StyleFn,
    buttonStyle : StyleFn  
}

export const useStyle = (w : number, h : number, scale : number) : UseStyleProp => {
    const size : number = Math.min(w, h) / 7 
    const position = 'absolute'
    const x : number = w / 2
    const y : number = h / 2
    return {
        boxStyle() : CSSProperties {
            const left = `${-size / 2}px`
            const top = `${ -size + (-h / 2) * (1 - scale)}px`
            const width = `${size}px`
            const height = `${size}px`
            const background = `#69517B`
            return {
                position, 
                left, 
                top,
                width, 
                height,
                background 
            }
        },
        containerStyle() : CSSProperties {
            const left = `${x}px`
            const top = `${y}px`
            const transform = `rotate(${360 * scale}deg)`
            return {
                position,
                left, 
                top,
                transform 
            }
        },
        buttonStyle() : CSSProperties {
            const left = `${w / 2 - (w / 2 + size / 2) * scale}px`
            const top = `0px`
            const width = `${size}px`
            const height = `${size / 2.5}px`
            const color = 'white'
            const fontSize = '16px'
            const background = `#2B1E1E`
            const display = 'flex'
            const justifyContent = 'center'
            const alignItems = 'center'
            const border = `1px solid ${background}`
            const cursor = 'pointer'
            return {
                position,
                left, 
                top, 
                width, 
                height, 
                display, 
                background, 
                color, 
                fontSize, 
                justifyContent, 
                alignItems,
                border,
                cursor 
            }
        }
    }
}

export const useOnLoad = (mountCb : () => void, unmountCb : () => void = () => {}) => {
    useEffect(() => {
        mountCb()
        return unmountCb 
    }, []) 
}