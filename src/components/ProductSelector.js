import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input, Radio } from 'semantic-ui-react';
import { productSearch, comboSearch, getProductById } from 'api';
import { Col, Row } from 'react-bootstrap';

const ProductSelector = ({ authToken, onSelect }) => {
    const [products, setProducts] = useState([]);
    const [searchWhat, setSearchWhat] = useState('1');
    const handleChange = (e, { value }) => setSearchWhat(value);

    return (
        <div className="product-selector">
            <Form>
                <Form.Group inline>
                    <Form.Field
                        control={Radio}
                        label="Products only"
                        value="1"
                        checked={searchWhat === '1'}
                        onChange={handleChange}
                    />
                    <Form.Field
                        control={Radio}
                        label="Combos only"
                        value="2"
                        checked={searchWhat === '2'}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>

            <Row>
                <Col xl={4}>
                    <Input
                        onChange={e => {
                            const search = e.target.value;
                            if (search.length > 2) {
                                if (searchWhat === '1') {
                                    productSearch({
                                        keyword: search,
                                        token: authToken
                                    })
                                        .then(resp => setProducts(resp))
                                        .catch(err => console.error(err));
                                } else if (searchWhat === '2') {
                                    comboSearch({
                                        keyword: search,
                                        token: authToken
                                    })
                                        .then(resp => setProducts(resp))
                                        .catch(err => console.error(err));
                                }
                            }
                        }}
                    />
                </Col>
                <Col xl={8}>
                    <Dropdown
                        search
                        selection
                        fluid
                        placeholder="Choose product"
                        options={products.map(product => ({
                            key: product.id,
                            value: product.id,
                            text: product.title,
                            image: { src: product.imageUrl }
                        }))}
                        onChange={(e, { value }) => {
                            getProductById({
                                productId: value,
                                token: authToken
                            })
                                .then(resp => onSelect(resp, searchWhat === '1' ? 'Product' : 'Combo'))
                                .catch(err => console.error(err));
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(ProductSelector);

export default ConnectedComp;
