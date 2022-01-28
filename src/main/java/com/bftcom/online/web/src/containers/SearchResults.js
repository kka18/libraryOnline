import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import * as appActions from "../actions/appActions";
import * as searchActions from "../actions/searchActions";
import {connect} from "react-redux";
import {Table} from "reactstrap";

/**
 * Компонент отображения списка "Результаты поиска".
 */
class SearchResults extends Component {
    /**
     * Конструктор.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        const booksList = this.props.appState.search ? this.props.appState.search.map(book => {
            return <tr key={book.id}>
                <td style={{whiteSpace: 'nowrap'}}>{book.name}</td>
                <td style={{whiteSpace: 'nowrap'}}>{book.authors ? book.authors.map((a)=>{ return a.displayName; }).join(", "): []}</td>
                <td style={{whiteSpace: 'nowrap'}}>{book.definition}</td>
                <td style={{whiteSpace: 'nowrap'}}>{book.genres ? book.genres.map((a)=>{ return a.name; }).join(", "): []}</td>
            </tr>
        }): undefined;
        return (
            <div>
                {
                    this.props.appState.search ?
                        <div>
                            <h3>Результаты поиска</h3>
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
                        </div> : <span></span>
                }
            </div>
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
        appActions: bindActionCreators(appActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);