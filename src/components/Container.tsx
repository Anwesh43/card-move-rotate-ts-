import React from "react";
import AnimatedProp from "./AnimatedProp";
import { useStyle } from "../hooks";
import Box from "./Box";
import Button from "./Button";
import withContext from "../hoc/withContext";

const Container : React.FC<AnimatedProp> = (prop : AnimatedProp) => {
    const {containerStyle} = useStyle(prop.w, prop.h, prop.scale) 
    return (
        <div style = {containerStyle()}>
            <Box/>
            <Button onClick = {prop.start}/>
        </div>
    )
}

export default withContext(Container)