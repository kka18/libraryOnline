import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, NavbarText, Input, InputGroupText, InputGroup, Button
} from 'reactstrap';
import {Outlet, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import * as appActions from "../actions/appActions";
import * as searchActions from "../actions/searchActions";
import {connect} from "react-redux";
import Login from "./Login";

/**
 * Компонент отображения навигации.
 */
export class AppNavbar extends Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {isOpen: false, showLogin: false, searchResults: [], keyword: "" };
        this.toggle = this.toggle.bind(this);
        this.handleShowLogin = this.handleShowLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    /**
     * Показать/скрыть компонент.
     */
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /**
     * Событие на отображение формы аутентификации
     */
    handleShowLogin = () => {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    /**
     * Событие на выход пользователя из системы
     */
    handleLogout = () => {
        this.props.appActions.disposeUser();
    }

    /**
     * Событие на запуск поиска.
     */
    handleSearchClick = async() => {
        this.props.searchActions.search(this.state.keyword);
    }

    /**
     * Событие на изменение ключевого слова поиска.
     * @param event
     */
    handleChangeSearch = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({keyword: value})
    }

    render() {
        return <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">Библиотека</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                {this.props.appState.user ?
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Справочники
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink href="/books/"><i className="bi bi-book"/> Книги</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink href="/authors/"><i className="bi bi-person"/> Авторы</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink href="/genres/"><i className="bi bi-journal"/> Жанры</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav> : <Nav></Nav>
                }
            </Collapse>
                <NavbarText>
                <InputGroup>
                    <Input placeholder="Поиск" onChange={this.handleChangeSearch}/>
                    <InputGroupText onClick={this.handleSearchClick}>
                        <i className="bi bi-search"/>
                    </InputGroupText>

                    {this.props.appState.user ? <Button
                            color="primary"
                            onClick={this.handleLogout}>
                            <i className="bi bi-box-arrow-right"/>
                        </Button> :
                        <Button
                            color="primary"
                            onClick={this.handleShowLogin}>
                            <i className="bi bi-box-arrow-in-right"/>
                        </Button>
                    }
                </InputGroup>
            </NavbarText>
            </Navbar>
            <Login show={this.state.showLogin} onClose={this.handleShowLogin} />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        appState: state.appState
    }
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);