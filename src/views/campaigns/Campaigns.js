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
import { getCampaigns } from 'api';
import DataTable from 'components/DataTable';

const Campaigns = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [campaigns, setCampaigns] = useState(null);

    useEffect(() => {
        getCampaigns({
            page,
            perPage: 10,
            token: authToken
        })
            .then(resp => setCampaigns(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (campaigns && !campaigns.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Campaigns</CCardHeader>
                        <CCardBody>
                            <DataTable fields={['ID', 'Name', 'Code', 'Issued Quantity', 'Status', 'Start date', 'End date', 'Description']}>
                                {campaigns.records.campaigns.map(
                                    item => <DataTable.CampaignRow item={item} onRowClick={item => history.push(`/campaigns/${item.id}`)} />
                                )}
                            </DataTable>
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/campaigns?page=${newPage}`);
                                    }
                                }}
                                pages={campaigns ? campaigns.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Campaigns);

export default ConnectedComp;