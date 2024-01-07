import React, { useEffect } from "react";
import AnimatedProp from "./AnimatedProp";
import { useOnLoad, useStyle } from "../hooks";
import withContext from "../hoc/withContext";

interface ButtonAnimatedProp extends AnimatedProp {
    onClick : () => void 
}

const Button : React.FC<ButtonAnimatedProp> = (prop : ButtonAnimatedProp) => {
    const {buttonStyle} = useStyle(prop.w, prop.h, prop.scale)
    useOnLoad(prop.start)
    return (
        <button style = {buttonStyle()} onClick = {() => {prop.onClick()}}>
            Rotate
        </button>
    )
}

export default withContext(Button)