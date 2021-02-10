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
import { getCategories } from 'api';
import DataTable from 'components/DataTable';

const Categories = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getCategories({
            page,
            perPage: 10,
            token: authToken
        })
            .then(resp => setCategories(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (categories && !categories.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Categories</CCardHeader>
                        <CCardBody>
                            <DataTable fields={['ID', 'Name', 'Title']}>
                                {categories.records.groups.map(
                                    item => <DataTable.CategoryRow item={item} onRowClick={item => history.push(`/categories/${item.id}`)} />
                                )}
                            </DataTable>
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/categories?page=${newPage}`);
                                    }
                                }}
                                pages={categories ? categories.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Categories);

export default ConnectedComp;
