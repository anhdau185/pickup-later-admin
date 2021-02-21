import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';
import { mapSearch, createBuilding } from 'api';
import DataTable from 'components/DataTable';
import { Input, Icon } from 'semantic-ui-react';

const NewBuilding = ({ authToken }) => {
    const [buildings, setBuildings] = useState([]);

    if (buildings && !buildings.error) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <Input
                                icon
                                placeholder="Search for buildings..."
                                onChange={e => {
                                    const search = e.target.value;
                                    if (search.length > 2) {
                                        mapSearch({
                                            keyword: search,
                                            token: authToken
                                        })
                                            .then(resp => setBuildings(resp))
                                            .catch(err => console.error(err));
                                    }
                                }}
                            >
                                <input />
                                <Icon name="search" />
                            </Input>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable fields={['ID', 'Name', 'Address', 'Coordinate on Map']}>
                                {buildings.map(
                                    item => (
                                        <DataTable.BuildingRow
                                            item={item}
                                            rowAction={{
                                                name: 'Choose',
                                                action: building => {
                                                    createBuilding({
                                                        buildingData: building,
                                                        token: authToken
                                                    })
                                                        .then(() => window.alert('Building added successfully!'))
                                                        .catch(err => console.error(err));
                                                }
                                            }}
                                        />
                                    )
                                )}
                            </DataTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }

    return null;
};

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(NewBuilding);

export default ConnectedComp;
