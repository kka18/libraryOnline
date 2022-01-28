import React from 'react';
import TreeSelect from 'antd/lib/tree-select';
import 'antd/dist/antd.min.css';

/**
 * Расширенный контейнер для мультивыбора в выпадающем списке
 */
class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * Событие на изменение значения
     * @param value
     */
    onChange = value => {
        this.props.onChange(value);
    };

    render() {

        return (
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={this.props.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                allowClear
                multiple
                treeDefaultExpandAll
                onChange={this.onChange}
                treeData={this.props.data}
            ></TreeSelect>
        )
    }
}

export default MultiSelect;