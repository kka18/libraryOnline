import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {withRouter} from './../utils/WithRouter';

/**
 * Компонент отображения редактирования "Жанр"
 */
class EditGenre extends Component {

    emptyItem = {
        name: ''
    };

    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.params.id !== 'new') {
            const genre = await (await fetch(`/api/genres/${this.props.params.id}`)
                .catch((error) => { console.error('Error:', error); })).json();
            this.setState({item: genre});
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

     handleSubmit = async (event) => {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/genres' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).catch((error) => {
            console.error('Error:', error);
        });;

        this.props.navigate("/genres");
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Изменить жанр' : 'Добавить жанр'}</h2>;


        return (
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label size="sm" for="name">Наименование</Label>
                        <Input size="sm" type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>

                    <FormGroup>
                        <Button size="sm" color="primary" type="submit">Сохранить <i className="bi bi-save" /></Button>{' '}
                        <Button size="sm" color="secondary" tag={Link} to="/books">Отмена <i className="bi bi-x-square" /></Button>
                    </FormGroup>
                </Form>
            </Container>)
    }
}

export default withRouter(EditGenre);