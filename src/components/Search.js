import search from "../images/svg/search.svg";
import React from "react";
import {Component, Fragment} from 'react';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({
            input: value
        });
        this.props.searchInList(value);
    }

    render() {

        return (
            <div className="search row">
                <div className="col-md-1"><img src={search} className="icon"/></div>
                <input className="form-control col-md-11"
                       type="text"
                       placeholder="Поиск товара"
                       onChange={this.handleChange}
                       value={this.state.input}
                       autoFocus/>
            </div>
        );
    }
}

export default Search;