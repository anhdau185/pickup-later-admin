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
import { getCustomers } from 'api';
import DataTable from 'components/DataTable';

const Customer = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        getCustomers({
            page,
            perPage: 100,
            token: authToken
        })
            .then(resp => setCustomers(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (customers && !customers.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Customers</CCardHeader>
                        <CCardBody>
                            <DataTable fields={['ID', 'User name', 'Phone number', 'Last login at', 'Status']}>
                                {customers.records.customers.map(
                                    item => <DataTable.CustomerRow item={item} onRowClick={item => history.push(`/customers/${item.id}`)} />
                                )}
                            </DataTable>
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/customers?page=${newPage}`);
                                    }
                                }}
                                pages={customers ? customers.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Customer);

export default ConnectedComp;