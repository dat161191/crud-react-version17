import React from "react";
import { Routes, Route } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { Container } from "react-bootstrap";

const ListClockRoute = (props) => {
    if (!localStorage.token) {
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
            <Routes>
                <Route path={props.pathClocks} element={props.children} />
            </Routes>
        </>
    );
}
export default ListClockRoute;