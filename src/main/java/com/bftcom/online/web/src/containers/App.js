import './App.css';
import React, { Component } from 'react';
import {
    Button,
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle, Input, InputGroup, InputGroupText,
    Nav,
    Navbar,
    NavbarBrand, NavbarText, NavbarToggler, NavLink,
    UncontrolledDropdown
} from 'reactstrap';
import {BrowserRouter, Route, Routes, Outlet, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import * as appActions from "../actions/appActions";
import {connect} from "react-redux";

import Home from './Home';
import Login from "./Login";
import Books from './Books';
import EditBook from './EditBook';
import Authors from './Authors';
import EditAuthor from './EditAuthor';
import Genres from './Genres';
import EditGenre from './EditGenre';

class App extends Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
    }
  render() {

      function LayoutsWithNavbar() {
          return (
              <div>
                  <Navbar color="light" light expand="md">
                      <NavbarBrand tag={Link} to="/">Библиотека</NavbarBrand>
                      <NavbarToggler />
                      <Collapse  navbar>
                          <Nav className="ml-auto" navbar>
                              <UncontrolledDropdown nav inNavbar>
                                  <DropdownToggle nav caret>
                                      <i className="bi bi-list" />
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
                          </Nav>
                      </Collapse>
                      <NavbarText>
                          <InputGroup>
                              <Button color="light">
                                  <i className="bi bi-box-arrow-right"/>
                              </Button>
                          </InputGroup>
                      </NavbarText>
                  </Navbar>
                  <Outlet />
              </div>
          );
      }
    return (
        <div className="app">
            <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LayoutsWithNavbar />}>
                            <Route path='/' element={<Home />} />
                            <Route path='/books' element={<Books />} />
                            <Route path='/books/:id' element={<EditBook />}/>
                            <Route path='/authors' element={<Authors />} />
                            <Route path='/authors/:id' element={<EditAuthor />}/>
                            <Route path='/genres' element={<Genres />} />
                            <Route path='/genres/:id' element={<EditGenre />}/>
                            <Route path='/login' element={<Login />} />
                        </Route>
                    </Routes>
            </BrowserRouter>
        </div>

    )
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

