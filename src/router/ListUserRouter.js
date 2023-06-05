import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Alert from 'react-bootstrap/Alert';
import { Container } from "react-bootstrap";

const ListUserRouter = (props) => {
    const { user } = useContext(UserContext);
    console.log("check props", props);
    if (user && !localStorage.token) {
        return (
            <Container>
                <Alert variant="danger" className="mt-3 text-center">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        You do not have permission to access this link!
                    </p>
                    <p>
                        Please login to access the page!
                    </p>
                    <img src="https://cdn-icons-png.flaticon.com/512/552/552871.png"/>
                </Alert>
            </Container>
        );
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default ListUserRouter;