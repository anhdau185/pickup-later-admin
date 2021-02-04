import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getStoreById, updateStore } from 'api';
import MapTemplate from 'components/MapTemplate';
// import prod from 'json/store.json';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = { store: null, building: null };
    }

    componentDidMount() {
        getStoreById({
            storeId: this.id,
            token: this.props.authToken
        })
            .then(resp => this.setState({ store: this.populateStoreResponse(resp), building: this.buildingInfo(resp) }))
            .catch(err => console.error(err));
    }

    getEditableFieldValues() {
        return {
            storeId: this.state.store.storeId,
            name: this.state.store.name,
            title: this.state.store.title,
            price: this.state.store.price,
            salePrice: this.state.store.salePrice,
            imageUrl: this.state.store.imageUrl,
            freshFood: this.state.store.freshFood,
            status: this.state.store.status
        };
    }

    populateStoreResponse(resp) {
      return {
        id: resp.id,
        storeId: resp.storeId,
        name: resp.name,
        phoneNumber: resp.phoneNumber,
        address: resp.address,
        latitude: resp.location.lat,
        longitude: resp.location.long
      }
    };

    buildingInfo(resp) {
      return {
        id: resp.building.id,
        name: resp.building.name,
        address: resp.building.address,
        latitude: resp.building.lat,
        longitude: resp.building.long
      }
    };
    

    renderFieldValue(key) {
      return (<CInput
          disabled={key === 'id' || key === 'createdAt' || key === 'updatedAt'}
          value={key === 'createdAt' || key === 'updatedAt'
              ? getDateTimeFromMilliseconds(this.state.store[key])
              : this.state.store[key]
          }
          onChange={e => {
              let newStore = { ...this.state.store };
              newStore[key] = e.target.value;
              this.setState({ store: newStore });
          }}
      />);
    }


    render() {
        if (this.state.store) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                Store ID: {this.state.store.storeId}
                            </CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.store).map((key, index) => (
                                                <tr key={index}>
                                                    <td>{key}:</td>
                                                    <td>{this.renderFieldValue(key)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <Row>
                                    <Col className="text-right">
                                        <Button disabled onClick={() => {
                                            updateStore({
                                                storeId: this.id,
                                                storeData: this.getEditableFieldValues(),
                                                token: this.props.authToken
                                            })
                                                .then(resp => {
                                                    getStoreById({
                                                        storeId: this.id,
                                                        token: this.props.authToken
                                                    })
                                                        .then(resp => this.setState({ store: resp }))
                                                        .catch(err => console.error(err));

                                                    console.log(resp);
                                                    window.alert('Successfully updated store!');
                                                })
                                                .catch(err => console.error(err));
                                        }}>Submit</Button>
                                    </Col>
                                </Row>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedStore = connect(mapStateToProps)(Store);

export default ConnectedStore;
