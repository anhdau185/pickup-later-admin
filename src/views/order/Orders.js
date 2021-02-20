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
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
} from 'semantic-ui-react';
import { getOrders } from 'api';
import DataTable from 'components/DataTable';

const Order = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        getOrders({
            page,
            perPage: 100,
            token: authToken
        })
            .then(resp => setOrders(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (orders && !orders.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Filters</CCardHeader>
                        <CCardBody>

                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>Orders</CCardHeader>
                        <CCardBody>
                            <DataTable fields={['Transaction no.', 'Username', 'Phone number', 'Note', 'Store ID', 'Status', 'Payment method', 'Payment status', 'Total amount']}>
                                {orders.records.orders.map(
                                    item => <DataTable.OrderRow item={item} onRowClick={item => history.push(`/orders/${item.id}`)} />
                                )}
                            </DataTable>
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/orders?page=${newPage}`);
                                    }
                                }}
                                pages={orders ? orders.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Order);

export default ConnectedComp;