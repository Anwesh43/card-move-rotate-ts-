import React from "react";
import { useAnimatedScale, useDimension } from "../hooks";


const withContext = (MainFC: React.FC<any>) : React.FC<any> => {
    return (props : any) => {
        const {scale, start} = useAnimatedScale()
        const {w, h} = useDimension()
        const newProps = {
            ...props, 
            w, 
            h, 
            scale, 
            start 
        }
        return (
            <MainFC {...newProps}>
            </MainFC>
        )
    }
}

export default withContext