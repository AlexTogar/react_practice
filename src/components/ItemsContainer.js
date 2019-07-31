import card1 from "../images/card1.jpg";
import React from "react";
import {Component, Fragment} from 'react';
import ItemCard from "./ItemCard";
class ItemsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItemFormVisible: false,
            buttonTitle: "Добавить новый товар",
            newTitle: '',
            newPrice: 0,
            newDis: ''
        };
        this.handleOpenForm = this.handleOpenForm.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.handleAddToBasket = this.handleAddToBasket.bind(this);
        this.handleDelCard = this.handleDelCard.bind(this);
        this.toCardPage = this.toCardPage.bind(this);
    }

    toCardPage(id) {
        this.props.toCardPage(id)
    }


    handleAddToBasket(id) {
        this.props.handleAddToBasket(id);
    }

    addNewItem() {
        let title = this.state.newTitle;
        let price = this.state.newPrice;
        let dis = this.state.newDis;
        let globalCardsListLength = this.props.globalCardsList.length;
        this.props.addNewItem({
            id: globalCardsListLength,
            price: price,
            title: title,
            dis: dis,
            image: card1
        },)
    }

    handleDelCard(id) {
        this.props.handleDelCard(id);
    }

    handleOnChange(e) {
        switch (e.target.name) {
            case 'title':
                this.setState({
                    newTitle: e.target.value
                });
                break
            case 'price':
                this.setState({
                    newPrice: parseInt(e.target.value)
                });
                break
            case 'dis':
                this.setState({
                    newDis: e.target.value
                });
                break
        }

    }

    handleOpenForm() {
        if (this.state.newItemFormVisible) {
            this.setState({
                newItemFormVisible: false,
                buttonTitle: "Добавить новый товар"
            })
        } else {
            this.setState({
                newItemFormVisible: true,
                buttonTitle: "Отменить добавление товара"
            })
        }

    }

    render() {
        // создание массива массивов карт для отображения товаров в сетке
        let tripleCard = [];
        let listLength = this.props.localCardsList.length;
        let currentCard;
        for (var i = 0; i < Math.ceil(listLength / 3); i++) {
            tripleCard[i] = [];
            for (var j = 0; j < 3; j++) {
                currentCard = this.props.localCardsList[i * 3 + j];
                if (currentCard != undefined) {
                    tripleCard[i].push(currentCard);
                }
            }
        }
        // создание формы для добавления нового товара
        let newItemForm;
        if (this.state.newItemFormVisible) {
            newItemForm = (
                <Fragment>
                    <div className="form-group">
                        <label>Название</label>
                        <input name="title"
                               className="form-control"
                               type="text"
                               placeholder="Введите название"
                               onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Цена</label>
                        <input name="price"
                               className="form-control"
                               type="number"
                               placeholder="Введите цену"
                               onChange={this.handleOnChange}
                        />
                        <small className="form-text text-muted">Только цифры</small>
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <textarea name="dis"
                                  className="form-control"
                                  type="text"
                                  placeholder="Введите описание"
                                  onChange={this.handleOnChange}
                        />
                    </div>

                    <button className="btn btn-outline-success save-new-item" onClick={this.addNewItem}>Добавить
                    </button>
                </Fragment>

            )
        } else {
            newItemForm = null;
        }

        if (this.props.emptyList) {
            return (
                <div className="search-not-found">По запросу "{this.props.searchInput}" не найдено ни одного
                    товара</div>
            )
        } else {
            return (
                <Fragment>
                    {tripleCard.map((triple) =>
                        <Fragment>
                            <div className="row">
                                {triple.map((card) =>
                                    <div className="col-md-4">
                                        <ItemCard
                                            id={card.id}
                                            price={card.price}
                                            title={card.title}
                                            dis={card.dis}
                                            image={card.image}
                                            handleAddToBasket={this.handleAddToBasket}
                                            handleDelCard={this.handleDelCard}
                                            toCardPage={this.toCardPage}
                                        />
                                    </div>
                                )}
                            </div>
                            <br/>
                        </Fragment>
                    )
                    }
                    <button className="btn btn-outline-info add-card-item-btn" onClick={this.handleOpenForm}>
                        {this.state.buttonTitle}
                    </button>
                    {newItemForm}
                </Fragment>
            );
        }
    }

}

export default ItemsContainer