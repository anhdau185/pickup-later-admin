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
import { getVouchers } from 'api';
import DataTable from 'components/DataTable';

const Vouchers = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [vouchers, setVouchers] = useState(null);

    useEffect(() => {
        getVouchers({
            page,
            perPage: 10,
            token: authToken
        })
            .then(resp => setVouchers(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (vouchers && !vouchers.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Vouchers</CCardHeader>
                        <CCardBody>
                            <DataTable fields={['ID', 'Name', 'Code', 'Value', 'Max. discount', 'Expired at', 'Available qty']}>
                                {vouchers.records.map(
                                    item => <DataTable.VoucherRow item={item} onRowClick={item => history.push(`/vouchers/${item.id}`)} />
                                )}
                            </DataTable>
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/vouchers?page=${newPage}`);
                                    }
                                }}
                                pages={vouchers ? vouchers.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Vouchers);

export default ConnectedComp;