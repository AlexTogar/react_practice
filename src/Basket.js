import React from 'react';
import {Component, Fragment} from 'react';
import basket from "./images/svg/cart.svg";

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.toBasketPage = this.toBasketPage.bind(this);
    }

    toBasketPage() {
        this.props.toBasketPage();
    }


    render() {
        return (
            <div className="basket" onClick={this.toBasketPage}>
                <img src={basket} className="icon"/>
                <div className="sum">
                    <span className="text-info"> {this.props.num} </span>
                    ед. товара на
                    <span className="text-info"> {this.props.sum} </span>
                    $
                </div>
            </div>
        );
    }
}
export default Basket;
