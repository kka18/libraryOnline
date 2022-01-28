import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {withRouter} from './../utils/WithRouter';

/**
 * Компонент отображения редактирования "Автор"
 */
class EditAuthor extends Component {

    emptyItem = {
        first_name: '',
        last_name: '',
        display_name: '',
        biography: ''
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
            const author = await (await fetch(`/api/authors/${this.props.params.id}`)
                .catch((error) => { console.error('Error:', error); })).json();
            this.setState({item: author});
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

        await fetch('/api/authors' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).catch((error) => {
            console.error('Error:', error);
        });;

        this.props.navigate("/authors");
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Изменить автора' : 'Добавить автора'}</h2>;

        return (
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label size="sm" for="firstName">Имя</Label>
                        <Input size="sm" type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="lastName">Фамилия</Label>
                        <Input size="sm" type="text" name="lastName" id="lastName" value={item.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="displayName">Отображение</Label>
                        <Input size="sm" type="text" name="displayName" id="displayName" value={item.displayName || ''}
                               onChange={this.handleChange} autoComplete="displayName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="biography">Биография</Label>
                        <Input size="sm" type="text" name="biography" id="biography" value={item.biography || ''}
                               onChange={this.handleChange} autoComplete="biography"/>
                    </FormGroup>
                    <FormGroup>
                        <Button size="sm" color="primary" type="submit">Сохранить <i className="bi bi-save" /></Button>{' '}
                        <Button size="sm" color="secondary" tag={Link} to="/books">Отмена <i className="bi bi-x-square" /></Button>
                    </FormGroup>
                </Form>
            </Container>)

    }
}

export default withRouter(EditAuthor);