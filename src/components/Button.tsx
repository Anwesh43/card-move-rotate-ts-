import React, { useEffect } from "react";
import AnimatedProp from "./AnimatedProp";
import { useOnLoad, useStyle } from "../hooks";
import withContext from "../hoc/withContext";

const Button : React.FC<AnimatedProp> = (prop : AnimatedProp) => {
    const {buttonStyle} = useStyle(prop.w, prop.h, prop.scale)
    useOnLoad(prop.start)
    return (
        <button style = {buttonStyle()}>
            Rotate
        </button>
    )
}

export default withContext(Button)