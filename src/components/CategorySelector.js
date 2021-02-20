import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Input } from 'semantic-ui-react';
import { categorySearch, getCategoryById } from 'api';
import { Col, Row } from 'react-bootstrap';

const CategorySelector = ({ authToken, onSelect }) => {
    const [categories, setCategories] = useState([]);

    return (
        <div className="category-selector">
            <Row>
                <Col xl={4}>
                    <Input
                        onChange={e => {
                            const search = e.target.value;
                            if (search.length > 2) {
                                categorySearch({
                                    keyword: search,
                                    token: authToken
                                })
                                    .then(resp => setCategories(resp.groups))
                                    .catch(err => console.error(err));
                            }
                        }}
                    />
                </Col>
                <Col xl={8}>
                    <Dropdown
                        search
                        selection
                        fluid
                        placeholder="Choose category"
                        options={categories.map(category => ({
                            key: category.id,
                            value: category.id,
                            text: category.title,
                            image: { src: category.imageUrl }
                        }))}
                        onChange={(e, { value }) => {
                            getCategoryById({
                                categoryId: value,
                                token: authToken
                            })
                                .then(resp => onSelect(resp))
                                .catch(err => console.error(err));
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(CategorySelector);

export default ConnectedComp;
