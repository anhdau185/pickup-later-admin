import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import { productSearch } from 'api';

const ProductSelector = ({ authToken }) => {
    const [products, setProducts] = useState([]);

    return (
        <div className="product-selector">
            <Button>Products</Button>
            <Button>Combos</Button>
            <Dropdown
                options={products.map(product => ({
                    key: product.id,
                    value: product.id,
                    text: product.title,
                    image: { src: product.imageUrl }
                }))}
                placeholder='Choose product'
                search
                selection
                fluid
                onSearchChange={e => {
                    const search = e.target.value;
                    if (search.length > 2) {
                        productSearch({
                            keyword: search,
                            token: authToken
                        })
                            .then(resp => setProducts(resp))
                            .catch(err => console.error(err));
                    }
                }}
            />
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(ProductSelector);

export default ConnectedComp;
