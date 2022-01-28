import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import './App.css';
import {withRouter} from "../utils/WithRouter";

/**
 * Компонент отображения формы аутентификации.
 */
class Logout extends Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        sessionStorage.setItem("authenticatedUser", "");
    }

    render() {
        return (
            <div className="app">
                <Container fluid>
                </Container>
            </div>
        );
    }
}
export default withRouter(Logout);;
