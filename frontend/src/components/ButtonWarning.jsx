import { Link } from "react-router-dom";

export const ButtonWarning=({statement,textTo,to})=>{
    return (
        <div className="pt-1.5 pl-11.5 flex">
            <div>{statement}</div>
            <div>{textTo}</div>
            {/* <Link className="pointer underline pl-1 cursor-pointer">{to}</Link> */}
        </div>
);
}