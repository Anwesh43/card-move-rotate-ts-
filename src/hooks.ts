import {useState, useEffect} from 'react'

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