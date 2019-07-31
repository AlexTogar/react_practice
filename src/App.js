import React from 'react';
import {Component, Fragment} from 'react';
import './App.css';
import card1 from './images/card1.jpg';
import card2 from './images/card2.jpg';
import card3 from './images/card3.jpg';
import card4 from './images/card4.jpg';
import card5 from './images/card5.jpg';

import ItemsContainer from './ItemsContainer'
import ItemCard from "./ItemCard";
import Basket from "./Basket";
import Search from "./Search";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            globalCardsList: [
                {id: 0, price: 150, title: 'Beats x', dis: 'Качественные беспроводные наушники не редкость, но если речь идет о моделях разработанных специально для Apple, то на рынке ассортимент таких устройств, оснащенных встроенным чипом W1, на самом деле невелик.', image: card1},
                {id: 1, price: 250, title: 'Beats solo3 wireless', dis: 'Продолжение знаменитой серии Beats Solo. Теперь, благодаря усовершенствованиям и использованию чипа Apple W1, эти bluetooth-наушники стали работать намного дольше, а процедура сопряжения максимально упростилась. ', image: card2},
                {id: 2, price: 110, title: 'hyperX cloud 2', dis: 'Вторая итерация и без того успешной гарнитуры Kingston HyperX Cloud адресована геймерам-меломанам — звук в наушниках хорош для всего, а не только для игр. Каркас у модели железный, а на чашах и оголовье используется матовый пластик.', image: card3},
                {id: 3, price: 30, title: 'Meizu ep51', dis: 'Спортивные беспроводные внутриканальные наушники с доступной стоимостью и хорошим качеством звучания.', image: card4},
                {id: 4, price: 200, title: 'Beats solo2 wireless', dis: 'Беспроводные накладные наушники закрытого типа верхней ценовой категории от знаменитого американского производителя. Относятся к линейке Active Collection 2016-го модельного года, предназначены для пользователей ведущих активный образ жизни.', image: card5}
            ],
            emptyList: false,
            localCardsList: [],
            basketCardsList: [],
            searchInput: '',
            basketNum: 0,
            basketSum: 0,
            visible: 0, //0 - mainpage , 1 - basketpage, 2 - cardpage
            visibleCard: {}, //карта, которая открывается при нажатии на карту, 0 по умолчанию
            emptyBasket: true,
            cardRedact: false,
            cardRedacted: {}
        };
        this.searchInList = this.searchInList.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.handleAddToBasket = this.handleAddToBasket.bind(this);
        this.handleDelCard = this.handleDelCard.bind(this);
        this.toBasketPage = this.toBasketPage.bind(this);
        this.toCardPage = this.toCardPage.bind(this);
        this.toMainPage = this.toMainPage.bind(this);
        this.handleDelCardFromBasket = this.handleDelCardFromBasket.bind(this);
        this.clearBasket = this.clearBasket.bind(this);
        this.redactCard = this.redactCard.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.saveCardChange = this.saveCardChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            localCardsList: this.state.globalCardsList
        })
    }
    saveCardChange(e){
        let id = parseInt(e.target.id);
        this.setState({
            visibleCard: this.state.cardRedacted,
            cardRedact: false
        });
        let inputs = document.getElementsByClassName("card-redact-input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    }

    handleOnChange(e) {
        let newVisibleCardId = parseInt(e.target.id);
        let newVisibleCard;
        for (var i = 0; i < this.state.globalCardsList.length; i++) {
            if (this.state.globalCardsList[i].id == newVisibleCardId) {
                newVisibleCard = this.state.globalCardsList[i];
            }
        }
        switch (e.target.name) {
            case 'cardTitle':
                newVisibleCard.title = e.target.value;
                this.setState({
                    cardRedacted: newVisibleCard
                });
                break
            case 'cardPrice':
                newVisibleCard.price = parseInt(e.target.value);
                this.setState({
                    cardRedacted: newVisibleCard
                });
                break
            case 'cardDis':
                newVisibleCard.dis = e.target.value;
                this.setState({
                    cardRedacted: newVisibleCard
                });
                break
        }
    }

    redactCard() {
        let inputs = document.getElementsByClassName("card-redact-input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        this.setState({
            cardRedact: true
        });
    }

    clearBasket() {
        this.setState({
            basketNum: 0,
            basketSum: 0,
            basketCardsList: []
        })
    }

    handleDelCardFromBasket(id) {
        let deletedCard;
        let newBasketCardsList = this.state.basketCardsList;
        for (var i = 0; i < newBasketCardsList.length; i++) {
            if (newBasketCardsList[i].id == id) {
                // удалить i-ый элемент массива
                deletedCard = newBasketCardsList.splice(i, 1); //возвращает массив, а не элемент
                break //при одинаковых id удаляется лишь один экземпляр товара (из корзины)
            }
        }
        let sum = deletedCard[0].price;
        this.setState({
            basketCardsList: newBasketCardsList,
            basketSum: this.state.basketSum - sum,
            basketNum: this.state.basketNum - 1
        })
    }

    toMainPage() {
        this.setState({
            visible: 0
        })
    }

    toCardPage(id) {
        let card;
        let cardsList = this.state.globalCardsList;
        for (var i = 0; i < cardsList.length; i++) {
            if (cardsList[i].id == id) {
                card = cardsList[i]
            }
        }

        this.setState({
            visible: 2,
            visibleCard: card
        })
    }

    toBasketPage() {
        this.setState({
            visible: 1
        })
    }

    handleDelCard(id) {
        let newGlobalCardsList = this.state.globalCardsList;
        for (var i = 0; i < newGlobalCardsList.length; i++) {
            if (newGlobalCardsList[i].id == id) {
                // удалить i-ый элемент массива
                newGlobalCardsList.splice(i, 1);
            }
        }
        this.setState({
            globalCardsList: newGlobalCardsList,
            localCardsList: newGlobalCardsList
        })
    }

    handleAddToBasket(id) {
        let card;
        let globalCardsList = this.state.globalCardsList;
        //поиск нужной карты по id
        for (var i = 0; i < globalCardsList.length; i++) {
            if (globalCardsList[i].id == id) {
                card = globalCardsList[i];
            }
        }
        let sum = card.price;
        //формирование нового списка добавленных в корзину товаров
        let newBasketCardsList = this.state.basketCardsList;
        newBasketCardsList.push(card);
        this.setState({
            basketSum: this.state.basketSum + parseFloat(sum),
            basketNum: this.state.basketNum + 1,
            basketCardsList: newBasketCardsList
        });
    }

    addNewItem(newItem) {
        let newGlobalCardsList = this.state.globalCardsList;
        newGlobalCardsList.push(newItem);
        this.setState({
            globalCardsList: newGlobalCardsList,
            searchInput: ''
        });
        this.searchInList('');
    }

    searchInList(input) {

        if (input == undefined) {
            this.setState({
                localCardsList: this.state.globalCardsList
            })
        } else {
            this.setState({
                searchInput: input
            });
            let globalCardsList = this.state.globalCardsList;
            let newList = [];
            for (var i = 0; i < globalCardsList.length; i++) {
                if (globalCardsList[i].title.toLowerCase().includes(input.toLowerCase())) {
                    newList.push(globalCardsList[i])
                }
            }
            if (newList.length == 0) {
                this.setState({
                    emptyList: true
                });
            } else {
                this.setState({
                    localCardsList: newList,
                    emptyList: false
                });


            }
        }
    }

    render() {
        let mainPage = (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <Search searchInList={this.searchInList}/>
                    </div>
                    <div className="col-md-3">
                        <Basket num={this.state.basketNum}
                                sum={this.state.basketSum}
                                toBasketPage={this.toBasketPage}
                        />
                    </div>
                </div>
                <div className="items-in-basket">Список товаров</div>
                {/*<Ad/>*/}
                <br/>
                <ItemsContainer
                    globalCardsList={this.state.globalCardsList}
                    localCardsList={this.state.localCardsList}
                    emptyList={this.state.emptyList}
                    searchInput={this.state.searchInput}
                    addNewItem={this.addNewItem}
                    handleAddToBasket={this.handleAddToBasket}
                    handleDelCard={this.handleDelCard}
                    toCardPage={this.toCardPage}
                />
            </div>
        );

        let tripleCard = [];
        let listLength = this.state.basketCardsList.length;
        let currentCard;
        for (var i = 0; i < Math.ceil(listLength / 3); i++) {
            tripleCard[i] = [];
            for (var j = 0; j < 3; j++) {
                currentCard = this.state.basketCardsList[i * 3 + j];
                if (currentCard != undefined) {
                    tripleCard[i].push(currentCard);
                }
            }
        }

        let emptyBasketText;
        let emptyBasketButton;
        if (this.state.basketCardsList.length == 0) {
            emptyBasketText = (
                <div className="empty-basket-text text-danger">В корзине пока нет товаров</div>
            )
            emptyBasketButton = (
                <Fragment></Fragment>
            )
        } else {
            emptyBasketText = null;
            emptyBasketButton = (
                < button className="btn btn-outline-info add-card-item-btn" onClick={() => {
                    alert("500 - Internal Server Error")
                }}>Оформить заказ</button>
            )
        }

        let basketPage = (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <button className="btn btn-outline-info on-main-page" onClick={this.toMainPage}>На главную
                        </button>
                    </div>
                    <div className="col-md-3">
                        <Basket num={this.state.basketNum}
                                sum={this.state.basketSum}
                                toBasketPage={this.toBasketPage}
                        />
                        <button className="btn btn-outline-dark add-card-item-btn" onClick={this.clearBasket}>Очистить
                            корзину
                        </button>
                    </div>
                </div>
                <br/>

                <div className="items-in-basket">Товары в корзине</div>
                {emptyBasketText}
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
                                        handleAddToBasket={() => {
                                        }}
                                        noButtonCard={true}
                                        handleDelCard={this.handleDelCardFromBasket}
                                        toCardPage={() => {
                                        }} //пустая функция
                                    />
                                </div>
                            )}
                        </div>
                        <br/>
                    </Fragment>
                )
                }
                {emptyBasketButton}
            </div>
        );

        let cardPageRedactButton;
        if (this.state.cardRedact) {
            cardPageRedactButton = (
                <button className="btn btn-outline-success add-card-item-btn"
                        onClick={this.saveCardChange}
                        id={this.state.visibleCard.id}
                >Сохранить изменения</button>

            )
        } else {
            cardPageRedactButton = (
                <button className="btn btn-outline-info add-card-item-btn"
                        onClick={this.redactCard}
                >Редактировать товар</button>

            )
        }

        let url = this.state.visibleCard.image;
        let bigCardImageStyle = {backgroundImage: 'url("'+url+'")'};


        let cardPage = (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <button className="btn btn-outline-info on-main-page" onClick={this.toMainPage}>На главную
                        </button>
                    </div>
                    <div className="col-md-3">
                        <Basket num={this.state.basketNum}
                                sum={this.state.basketSum}
                                toBasketPage={this.toBasketPage}
                        />
                    </div>
                </div>
                <br/>
                <div className="items-in-basket">{this.state.visibleCard.title}</div>
                <br/>
                <div className="image-container" style = {bigCardImageStyle}></div>
                <br/>
                <div className="form-group">
                    <label>Название</label>
                    <input disabled type="text"
                           defaultValue={this.state.visibleCard.title}
                           className="form-control card-redact-input"
                           name="cardTitle"
                           onChange={this.handleOnChange}
                           id={this.state.visibleCard.id}
                    />
                </div>
                <div className="form-group">
                    <label>Цена</label>
                    <input disabled type="number"
                           defaultValue={this.state.visibleCard.price}
                           className="form-control card-redact-input"
                           name="cardPrice"
                           onChange={this.handleOnChange}
                           id={this.state.visibleCard.id}

                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <textarea disabled type="text"
                              defaultValue={this.state.visibleCard.dis}
                              className="form-control card-redact-input"
                              name="cardDis"
                              onChange={this.handleOnChange}
                              id={this.state.visibleCard.id}

                    />
                </div>

                {cardPageRedactButton}

            </div>

        );

        let visiblePage;
        switch (this.state.visible) {
            case 0:
                visiblePage = mainPage;
                break
            case 1:
                visiblePage = basketPage;
                break
            case 2:
                visiblePage = cardPage;
                break
        }


        return (
            <Fragment>
                {visiblePage}
            </Fragment>
        )
    };
}


export default MainPage;
