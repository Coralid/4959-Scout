import {useLocation, useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        useEffect(() => {}, [params]);
        return (
            <Component { ...props } { ...location} { ...navigate} { ...params } />
        );
    }
    return ComponentWithRouterProp;
}

export {withRouter}