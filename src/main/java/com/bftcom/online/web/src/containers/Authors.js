import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

/**
 * Компонент отображения списка "Автор".
 */
class Authors extends Component {

    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {authors: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/authors')
            .then(response => response.json())
            .then(data => this.setState({authors: data}))
            .catch((error) => {
                console.error('Error:', error);
            });;
    }

    remove = async (id) => {
        await fetch(`/api/authors/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAuthors = [...this.state.authors].filter(i => i.id !== id);
            this.setState({authors: updatedAuthors});
        }).catch((error) => {
            console.error('Error:', error);
        });;
    }

    render() {
        const {authors} = this.state;

        const authorsList = authors.map(author => {
            return <tr key={author.id}>
                <td style={{whiteSpace: 'nowrap'}}>{author.firstName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{author.lastName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{author.displayName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{author.biography}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/authors/" + author.id}>
                            <i className="bi bi-pencil"></i>
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(author.id)}>
                            <i className="bi bi-trash"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
                <Container fluid>
                    <div className="float-right">
                        <Button size="sm" color="success" tag={Link} to="/authors/new">Добавить</Button>
                    </div>
                    <h3>Авторы</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Имя</th>
                            <th width="30%">Фамилия</th>
                            <th width="30%">Отображение</th>
                            <th width="30%">Биография</th>
                        </tr>
                        </thead>
                        <tbody>
                        {authorsList}
                        </tbody>
                    </Table>
                </Container>
        );
    }
}

export default Authors;