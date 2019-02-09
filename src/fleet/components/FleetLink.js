

import React, { Component } from "react";
import {
    Container,
    Form,
    FormGroup,
    Row,
    Col,
    Button,
    Label,
    Input,
    ListGroup,
    ListGroupItem
  } from "reactstrap";
function renderArticles(articles) {
    if (articles.length > 0) {      
        return articles.map((article, index) => (
            <Article key={index} article={article} />
        ));
    }
    else return [];
}

const Article = ({article}) => {
    return ( 
        <article key={article.id}>
            <a href={article.link}>{article.title}</a>
            <p>{article.description}</p>
        </article>
    );
};

const Articles = React.createClass({
    render() {
        const articles = renderArticles(this.props.articles);

        return (
            <section>
                { articles }
            </section>
        );
    }
});

module.exports = Articles;