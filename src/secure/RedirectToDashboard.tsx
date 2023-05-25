import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const RedirectToDashboard = () => {
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard");
    }, []);

    return (
        <></>
    )
};

export default RedirectToDashboard;