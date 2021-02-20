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
import { getLocations } from 'api';
import DataTable from 'components/DataTable';

const Locations = ({ authToken }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    getLocations({
        page,
        perPage: 10,
        token: authToken
    })
        .then(resp => setLocations(resp))
        .catch(err => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (locations && !locations.error) {
      return (
          <CRow>
              <CCol>
                  <CCard>
                      <CCardHeader>Locations</CCardHeader>
                      <CCardBody>
                          <DataTable fields={['ID', 'Name', 'Address', 'Coordinate on Map', 'Phone number', 'Status', 'Rating', 'User Rating Total']}>
                              {locations.records.locations.map(
                                  item => <DataTable.LocationRow item={item} onRowClick={item => history.push(`/locations/${item.id}`)} />
                              )}
                          </DataTable>
                          <CPagination
                              activePage={page}
                              onActivePageChange={newPage => {
                                  if (newPage !== page) {
                                      setPage(newPage);
                                      history.push(`/locations?page=${newPage}`);
                                  }
                              }}
                              pages={locations ? locations.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Locations);

export default ConnectedComp;