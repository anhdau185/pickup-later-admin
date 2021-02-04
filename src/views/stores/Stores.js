import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import { getStores } from 'api';
import DataTableStore from 'components/DataTableStore';
// import prods from 'json/stores.json';

const Stores = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [stores, setStores] = useState(null);

    useEffect(() => {
      getStores({
            page,
            perPage: 10,
            token: authToken
        })
            .then(resp => setStores(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (stores && !stores.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Stores
                    </CCardHeader>
                        <CCardBody>
                            <DataTableStore
                                items={stores.stores}
                                fields={[
                                    'ID', 'StoreID', 'Name', 'Phone Number', 'Address'
                                ]}
                                onRowClick={item => history.push(`/stores/${item.id}`)}
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
const ConnectedComp = connect(mapStateToProps)(Stores);

export default ConnectedComp;
