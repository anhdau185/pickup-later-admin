import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CPagination
} from '@coreui/react';
import { getProducts } from 'api';
import DataTable from 'components/DataTable';
// import prods from 'json/products.json';

const Products = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts({
            page,
            perPage: 10,
            token: authToken
        })
            .then(resp => setProducts(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (products && !products.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Products
                    </CCardHeader>
                        <CCardBody>
                            <DataTable
                                items={products.records.products}
                                fields={[
                                    'ID', 'Name', 'Title', 'Price', 'Sale price', 'Fresh food', 'Status'
                                ]}
                                onRowClick={item => history.push(`/products/${item.id}`)}
                            />
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/products?page=${newPage}`);
                                    }
                                }}
                                pages={products ? products.pages : 1}
                                doubleArrows={false}
                                align="center"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }

    return null;
};

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(Products);

export default ConnectedComp;
