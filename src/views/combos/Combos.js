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
import { getCombos } from 'api';
import DataTable from 'components/DataTable';

const Combos = ({ authToken }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
  const [combos, setCombos] = useState(null);

  useEffect(() => {
    getCombos({
        page,
        perPage: 10,
        token: authToken
    })
        .then(resp => setCombos(resp))
        .catch(err => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (combos && !combos.error) {
      return (
          <CRow>
              <CCol>
                  <CCard>
                      <CCardHeader>Combos</CCardHeader>
                      <CCardBody>
                          <DataTable fields={['ID', 'Name', 'Title', 'Price', 'Sale price']}>
                              {combos.records.combos.map(
                                  item => <DataTable.ComboRow item={item} onRowClick={item => history.push(`/combos/${item.id}`)} />
                              )}
                          </DataTable>
                          <CPagination
                              activePage={page}
                              onActivePageChange={newPage => {
                                  if (newPage !== page) {
                                      setPage(newPage);
                                      history.push(`/combos?page=${newPage}`);
                                  }
                              }}
                              pages={combos ? combos.pages : 1}
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
const ConnectedComp = connect(mapStateToProps)(Combos);

export default ConnectedComp;