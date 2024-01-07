import React, { useEffect } from "react";
import AnimatedProp from "./AnimatedProp";
import { useOnLoad, useStyle } from "../hooks";
import withContext from "../hoc/withContext";

const Box : React.FC<AnimatedProp> = (prop : AnimatedProp) => {
    const {boxStyle} = useStyle(prop.w, prop.h, prop.scale)
    useOnLoad(prop.start)
    return (
        <div style = {boxStyle()}>
        </div>
    )
}

export default withContext(Box) 