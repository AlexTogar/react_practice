import React from "react";
import {Component, Fragment} from 'react';


class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.handleAddToBasket = this.handleAddToBasket.bind(this);
        this.handleDelCard = this.handleDelCard.bind(this);
        this.toCardPage = this.toCardPage.bind(this);
    }

    toCardPage() {
        this.props.toCardPage(parseInt(this.props.id));
    }

    handleDelCard(e) {
        let id = parseInt(e.target.value);
        this.props.handleDelCard(id);
    }


    handleAddToBasket(e) {
        let id = parseInt(e.target.value);
        this.props.handleAddToBasket(id);
    }


    render() {
        var backImage = {backgroundImage: 'url("' + this.props.image + '")'};
        let cardButton;
        if (this.props.noButtonCard) {
            cardButton = (
                <div className="not-button-card"></div>
            )
        } else {
            cardButton = (
                <button className="item-card-button btn btn-info"
                        onClick={this.handleAddToBasket} value={this.props.id}>
                    В корзину
                </button>
            )
        }
        return (

            <div className="item-card" style={backImage}>
                <button className="delete-card btn btn-outline-dark"
                        onClick={this.handleDelCard}
                        value={this.props.id}
                >
                    X
                </button>
                <div onClick={this.toCardPage}>
                    <div className="item-card-price">{this.props.price}$</div>
                    <div className="item-card-dis">{this.props.title}</div>
                </div>
                {cardButton}
            </div>
        );
    }
}

export default ItemCard;