import React, { Component } from 'react';
import { Container, Button, ButtonGroup, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import {bindActionCreators} from "redux";
import * as appActions from "../actions/appActions";
import {connect} from "react-redux";

/**
 * Компонент отображения списка "Книга".
 */
class Books extends Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = { books: [] };

        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        await fetch('/api/books')
            .then(response => response.json())
            .then(data => this.setState({books: data}))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**
     * Удалить запись.
     * @param id
     * @returns {Promise<void>}
     */
    remove = async (id) => {
        await fetch(`/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedBooks = [...this.state.books].filter(i => i.id !== id);
            this.setState({books: updatedBooks});
        }).catch((error) => {
            console.error('Error:', error);
        });;
    }

    render() {
        const {books} = this.state;
        const access = this.props.appState.user;

        const booksList = books.map(book => {
            return <tr key={book.id}>
                <td style={{whiteSpace: 'nowrap'}}>{book.name}</td>
                <td style={{whiteSpace: 'nowrap'}}>{book.authors ? book.authors.map((a)=>{ return a.displayName; }).join(", "): []}</td>
                <td style={{whiteSpace: 'nowrap'}}>{book.definition}</td>
                <td style={{whiteSpace: 'nowrap'}}>{book.genres ? book.genres.map((a)=>{ return a.name; }).join(", "): []}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/books/" + book.id}>
                                <i className="bi bi-pencil"></i>
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>
                            <i className="bi bi-trash"></i>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <Container fluid>
                    <div className="float-right">
                        <Button size="sm" color="success" tag={Link} to="/books/new">Добавить</Button>
                    </div>
                    <h3>Книги</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="30%">Автор</th>
                            <th width="30%">Описание</th>
                            <th width="30%">Жанр</th>
                        </tr>
                        </thead>
                        <tbody>
                        {booksList}
                        </tbody>
                    </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Books);