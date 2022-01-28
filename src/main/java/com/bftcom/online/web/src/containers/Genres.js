import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

/**
 * Компонент отображения списка "Жанр"
 */
class Genres extends Component {

    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {genres: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/genres')
            .then(response => response.json())
            .then(data => this.setState({genres: data}))
            .catch((error) => { console.error('Error:', error); });
    }

    remove = async (id) => {
        await fetch(`/api/genres/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGenres = [...this.state.genres].filter(i => i.id !== id);
            this.setState({genres: updatedGenres});
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        const {genres} = this.state;

        const genresList = genres.map(genre => {
            return <tr key={genre.id}>
                <td style={{whiteSpace: 'nowrap'}}>{genre.name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/genres/" + genre.id}>
                            <i className="bi bi-pencil"></i>
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(genre.id)}>
                            <i className="bi bi-trash"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
                <Container fluid>
                    <div className="float-right">
                        <Button size="sm" color="success" tag={Link} to="/genres/new">Добавить</Button>
                    </div>
                    <h3>Жанры</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Наименование</th>
                        </tr>
                        </thead>
                        <tbody>
                        {genresList}
                        </tbody>
                    </Table>
                </Container>
        );
    }
}

export default Genres;