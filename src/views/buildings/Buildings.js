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
import { getBuildings } from 'api';
import DataTable from 'components/DataTable';
import { Button, Icon } from 'semantic-ui-react';

const Buildings = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [buildings, setBuildings] = useState(null);

    useEffect(() => {
        getBuildings({
            page,
            perPage: 10,
            token: authToken
        })
            .then(resp => setBuildings(resp))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (buildings && !buildings.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <Button icon labelPosition="left" color="violet" onClick={() => history.push('/new-building')}>
                                <Icon name="add" />
                                New building
                            </Button>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable fields={['ID', 'Name', 'Address', 'Coordinate on Map']}>
                                {buildings.records.buildings.map(
                                    item => <DataTable.BuildingRow item={item} onRowClick={item => history.push(`/buildings/${item.id}`)} />
                                )}
                            </DataTable>
                            <CPagination
                                activePage={page}
                                onActivePageChange={newPage => {
                                    if (newPage !== page) {
                                        setPage(newPage);
                                        history.push(`/buildings?page=${newPage}`);
                                    }
                                }}
                                pages={buildings ? buildings.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Buildings);

export default ConnectedComp;