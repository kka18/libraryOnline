import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, InputGroup, Label, Alert} from 'reactstrap';
import AppNavbar from './AppNavbar';
import MultiSelect from "../components/MultiSelect";
import {withRouter} from './../utils/WithRouter';
import { BookFileContentType } from "./../constants";

/**
 * Компонент отображения редактирования "Книга".
 */
class EditBook extends Component {

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
            item: this.emptyItem,
            genres: [],
            authors: [],
            selectedGenres: [],
            selectedAuthors: [],
            selectedImage: undefined,
            selectedContent: undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAuthors = this.handleChangeAuthors.bind(this);
        this.handleChangeGenres = this.handleChangeGenres.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleClearImage = this.handleClearImage.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleClearContent = this.handleClearContent.bind(this);
        this.handleDownloadImage = this.handleDownloadImage.bind(this);
        this.handleDownloadContent = this.handleDownloadContent.bind(this);

    }

    async componentDidMount() {
        await this.load();
    }

    /**
     * Приведение дерева данных к дереву данных компонента.
     * @param tree
     * @param item
     */
    processTree = (tree, item) => {
        if (item) {
            for (let i=0; i<tree.length; i++) {
                if (String(tree[i].id) === String(item.parent.id)) {
                    tree[i].children.push(item);
                    break;
                }
                else this.processTree(tree[i].children, item);
            }
        }
        else {
            let idx = 0;
            while (idx < tree.length)
                if (tree[idx].parent) this.processTree(tree, tree.splice(idx, 1)[0])
                else idx++;
        }
    }

    /**
     * Загрузка данных.
     */
    load = async () => {
        if (this.props.params.id !== 'new') {
            const book = await (await fetch(`/api/books/${this.props.params.id}`)
                .catch((error) => { console.error('Error:', error); })).json();
            this.setState({
                item: book,
                selectedAuthors: book.authors ? book.authors.map((a)=>{ return a.id;}): [],
                selectedGenres: book.genres ? book.genres.map((a)=>{ return a.id;}): [],
                selectedImage: book.bookFiles ? book.bookFiles.find((a) => { return a.contentType === BookFileContentType.Image;}): undefined,
                selectedContent: book.bookFiles ? book.bookFiles.find((a) => { return a.contentType === BookFileContentType.Content;}): undefined
            });
        }

        fetch('/api/authors')
            .then(response => response.json())
            .then((data) =>
            {
                let result = data.map((a) => {
                    return {
                        value: a.id,
                        title: a.displayName,
                        children: [] }});
                this.setState({authors: result})
            })
            .catch((error) => {
            console.error('Error:', error);
        });

        fetch('/api/genres')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].value = data[i].id;
                    data[i].title = data[i].name;
                    data[i].children = [];
                }

                this.processTree(data);
                this.setState({genres: data})
            })
            .catch((error) => {
            console.error('Error:', error);
        });
    }

    /**
     * Событие на сохранения контекста
     * @param event
     * @returns {Promise<void>}
     */
    async handleSubmit(event) {
        event.preventDefault();

        const {item} = this.state;

        const {selectedAuthors} = this.state;
        const {selectedGenres} = this.state;
        const {selectedImage} = this.state;
        const {selectedContent} = this.state;

        if (selectedAuthors.length) { item.authors = selectedAuthors.map((a)=> { return { id: a }}); }

        if (selectedGenres.length) { item.genres = selectedGenres.map((a)=> { return { id: a }}); }

        await this.saveFile(selectedImage)
            .then((id) =>
            {
                const files = item.bookFiles;

                if (id) {
                    const bookFile = {
                        id: id,
                        content_type: selectedImage.content_type
                    }

                    item.bookFiles = files == null ? [bookFile]:
                        files.filter((a)=> { return a.contentType !== BookFileContentType.Image}).concat([bookFile]);
                } else {
                    if (files != null) {
                        item.bookFiles = files.filter((a)=> { return a.contentType !== BookFileContentType.Image } );
                    }
                }

            })
            .then(()=> {
                return this.saveFile(selectedContent);
            })
            .then((id) =>
            {
                const files = item.bookFiles;

                if (id) {
                    const bookFile = {
                        id: id,
                        content_type: selectedImage.content_type
                    }

                    item.bookFiles = files == null ? [bookFile] : files.filter((a)=> { return a.contentType !== BookFileContentType.Content}).concat([bookFile]);
                } else {
                    if (files != null) {
                        item.bookFiles = files.filter((a)=> { return a.contentType !== BookFileContentType.Content} );
                    }
                }
            })
            .then(()=> {
                return this.saveBook(item);
            })
            .then(data => {
                this.setState({ item: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        this.props.navigate("/books");
    }

    /**
     * Сохранить/обновить книгу.
     * @param item Книга
     * @returns {Promise<any>}
     */
    saveBook = async(item) => {
        return await fetch('/api/books' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(response => response.json())
    }

    /**
     * Сохранить файл.
     * @param formData Файл
     * @returns {Promise<any>}
     */
    saveFile = async(item) => {
        if (!item) {
            return null;
        }

        if (!item.file){
            return item.id;
        }

        const formData = new FormData();
        formData.append('file', item.file);
        formData.append('name', item.name);
        formData.append('type', item.type);
        formData.append('content_type', item.content_type);

        return await fetch(
            '/api/files/upload/',
            {
                method: 'POST',
                body: formData,
            }

        ).then(response => response.json());
    }

    /**
     * Событие на изменения значений атрибутов контекста.
     * @param event
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    /**
     * Событие на изменение изображения.
     * @param value
     */
    handleChangeImage = ({target: {files}}) => {
        const cancel = !files.length;
        if (cancel) {
            this.setState({selectedImage: undefined});
            return;
        }
        const [{ name, type }] = files;
        const book =  {
            id: undefined,
            name:   name,
            type: type,
            content_type: BookFileContentType.Image,
            file: files[0]
        };

        this.setState({selectedImage: book});
    }

    /**
     * Событие на удаление изображения.
     */
    handleClearImage = () => {
        this.setState({selectedImage: undefined})
    }

    /**
     * Событие на изменение содержимого.
     * @param value
     */
    handleChangeContent = ({target: {files}}) => {
        const cancel = !files.length;
        if (cancel) {
            this.setState({selectedContent: undefined});
            return;
        }
        const [{ name, type }] = files;

        const book =  {
            id: undefined,
            name:   name,
            type: type,
            content_type: BookFileContentType.Content,
            file: files[0]
        };

        this.setState({selectedContent: book});
    }

    /**
     * Событие на удаление содержимого.
     */
    handleClearContent = () => {
        this.setState({selectedContent: undefined})
    }

    /**
     * Событие на изменение списка связанных авторов.
     * @param value
     */
    handleChangeAuthors = (value) => {
        this.setState({selectedAuthors: value});
    }

    /**
     * Событие на изменение списка связанных жанров.
     * @param value
     */
    handleChangeGenres = (value) => {
        this.setState({selectedGenres: value});
    }

    /**
     * Событие на загрузку изображения.
     * @param item
     * @returns {Promise<void>}
     */
    handleDownloadImage = async (item) => {
        await this.handleDownload(this.state.selectedImage.id, this.state.selectedImage.name)
    }

    /**
     * Событие на загрузку содержимого.
     * @returns {Promise<void>}
     */
    handleDownloadContent = async () => {
        await this.handleDownload(this.state.selectedContent.id, this.state.selectedContent.name)
    }

    /**
     * Событие на загрузку.
     * @param id
     * @param name
     * @returns {Promise<void>}
     */
    handleDownload = async (id, name) => {
        await fetch('/api/files/download/'+id, {
            method: 'GET'})
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => console.error('Error:', error));
    }

    render() {
        const {item} = this.state;
        const {selectedAuthors} = this.state;
        const {selectedGenres} = this.state;
        const {selectedImage} = this.state;
        const {selectedContent} = this.state;

        const title = <h2>{item.id ? 'Изменить книгу' : 'Добавить книгу'}</h2>;

        return <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label size="sm" for="name">Наименование</Label>
                        <Input size="sm" type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="definition">Описание</Label>
                        <Input size="sm" type="textarea"  name="definition" id="definition" value={item.definition || ''}
                               onChange={this.handleChange} autoComplete="definition"/>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="image">Изображение</Label>
                        <InputGroup size="sm">
                            <Input type="file" name="image" id="image" key={selectedImage} disabled={!item.id} onChange={this.handleChangeImage} />
                        </InputGroup>
                        <Alert isOpen={selectedImage !== undefined}
                            color="light"
                            toggle={this.handleClearImage}>
                            {selectedImage ? selectedImage.name: undefined}
                            &nbsp;&nbsp;<a style={{ visibility: selectedImage && selectedImage.id ? 'visible': 'hidden'}} className="alert-link" onClick={this.handleDownloadImage}><i className="bi bi-download" /></a>
                        </Alert>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="content">Содержимое</Label>
                        <InputGroup size="sm">
                            <Input type="file" name="content" id="content" key={selectedContent} disabled={!item.id} onChange={this.handleChangeContent} />
                        </InputGroup>
                        <Alert isOpen={selectedContent !== undefined}
                               color="light"
                               toggle={this.handleClearContent}>
                            {selectedContent ? selectedContent.name: undefined}
                            &nbsp;&nbsp;<a style={{ visibility: selectedContent && selectedContent.id ? 'visible': 'hidden'}} className="alert-link" onClick={this.handleDownloadContent}><i className="bi bi-download" /></a>
                        </Alert>
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="authors">Авторы</Label>
                        <MultiSelect data={this.state.authors} value={selectedAuthors} onChange={this.handleChangeAuthors} />
                    </FormGroup>
                    <FormGroup>
                        <Label size="sm" for="genres">Жанры</Label>
                        <MultiSelect data={this.state.genres} value={selectedGenres} onChange={this.handleChangeGenres} />
                    </FormGroup>
                    <FormGroup>
                        <Button size="sm" color="primary" type="submit">Сохранить <i className="bi bi-save" /></Button>{' '}
                        <Button size="sm" color="secondary" tag={Link} to="/books">Отмена <i className="bi bi-x-square" /></Button>
                    </FormGroup>

                </Form>
        </Container>
    }
}

export default withRouter(EditBook);