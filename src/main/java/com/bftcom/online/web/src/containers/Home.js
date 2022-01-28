import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Input, InputGroup, InputGroupText} from 'reactstrap';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import './App.css';
import SearchResults from "./SearchResults";
import {bindActionCreators} from "redux";
import * as appActions from "../actions/appActions";
import * as searchActions from "../actions/searchActions";
import {connect} from "react-redux";

/**
 * Компонент отображения главной страницы
 */
class home extends Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {books: [], activeIndex: 0, searchResults: [], keyword: ""};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        fetch('/api/books/random?num=10')
            .then(response => response.json())
            .then(data => this.setState({books: data}))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.books.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.books.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
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
        const { books } = this.state;
        const slides = books.map((item) => {

            const bookFileImage = item.bookFiles ? item.bookFiles.find((a)=> { return a.contentType === 1}): undefined;
            const authors = item.authors ?  item.authors.map((a)=> { return a.displayName;}).join(", ") : undefined;
            return (
                <Carousel.Item interval={1500} onClick={this.onClick} key={item.id}>
                    <Link to={`/books/${item.id}`}>
                        <span>
                            {(bookFileImage) ?
                                <Image fluid className="className='img-fluid shadow-4'" src={`data:image/jpeg;base64,${bookFileImage.data}`} />
                                :
                                <Image fluid className="d-block w-100" src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png" />
                            }
                            <Carousel.Caption>
                                <h3>{item.name}</h3>
                                <p>{authors}</p>
                                <p>{item.definition}</p>
                            </Carousel.Caption>
                        </span>
                    </Link>
                </Carousel.Item>
            );
        });

        return (
            <Container fluid>
                <div className="carousel-container">
                    <Carousel>
                        {slides}
                    </Carousel>
                </div>
                <div className="search-container">
                    <InputGroup>
                        <Input placeholder="Поиск книги по наименованию, автору и жанру" onChange={this.handleChangeSearch}/>
                        <InputGroupText onClick={this.handleSearchClick}>
                            <i className="bi bi-search"/>
                        </InputGroupText>
                    </InputGroup>
                </div>
                <div className="search-results-container">
                    <SearchResults />
                </div>
            </Container>
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
        appActions: bindActionCreators(appActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home);