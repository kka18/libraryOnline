import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Container
} from 'reactstrap';
import './App.css';
import * as appActions from './../actions/appActions';

/**
 * Компонент отображения формы аутентификации.
 */
class Login extends React.Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Событие на изменение значения.
     * @param event
     */
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    };

    /**
     * Событие на аутентификацию.
     * @param e
     */
    handleSubmit = (e) => {

        this.props.appActions.initUser(this.state.user, this.state.password);
        this.props.navigate("/");
    }

    render() {
        const { user, password } = this.state;
        return (
            <Container fluid>
                <h3>Личный кабинет</h3>
            <Form className="form">
                <FormGroup>
                    <Label for="user">Имя</Label>
                    <Input
                        type="text"
                        name="user"
                        id="user"
                        value={user}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Пароль</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        value={password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button onClick={this.handleSubmit}>Вход</Button>
            </Form>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        appState: state.appState
    }
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
