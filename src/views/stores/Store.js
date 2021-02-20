import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getStoreById, updateStore, getCategoryById } from 'api';
import storeJson from 'json/store.json';
import GoogleMap from 'components/GoogleMap';
import CategorySelector from 'components/CategorySelector';
import DataTable from 'components/DataTable';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = { store: storeJson, building: null };
    }

    componentDidMount() {
        getStoreById({
            storeId: this.id,
            token: this.props.authToken
        })
            .then(resp => this.setState({
                store: resp,
                building: this.buildingInfo(resp),
                location: this.locationInfo(resp)
            }))
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
            status: this.state.store.status,
            groupIds: this.state.store.groups.map(({ id }) => id)
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
            title: resp.building.name,
            name: resp.building.address,
            lat: resp.building.lat,
            lng: resp.building.long
        }
    };

    locationInfo(resp) {
        return {
            id: resp.location.id,
            title: resp.location.name,
            name: resp.location.address,
            lat: resp.location.lat,
            lng: resp.location.long
        }
    }

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
            console.log(this.state.store);
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
                                    <Col>
                                        <h5>Categories assigned to this store:</h5>
                                        <DataTable fields={['ID', 'Name', 'Title']}>
                                            {this.state.store.groups.map(item => (
                                                <DataTable.CategoryRow
                                                    item={item}
                                                    rowAction={{
                                                        name: 'Remove',
                                                        action: () => {
                                                            if (window.confirm('Remove category from store menu?')) {
                                                                this.setState(prevState => {
                                                                    let nextState = { store: { ...prevState.store } };
                                                                    nextState.store.groups = nextState.store.groups.filter(group => group.id !== item.id);
                                                                    return nextState;
                                                                });
                                                            }
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </DataTable>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Add a category to store menu:</h5>
                                        <CategorySelector
                                            onSelect={category => {
                                                this.setState(prevState => {
                                                    let nextState = { store: { ...prevState.store } };
                                                    nextState.store.groups.push(category);
                                                    return nextState;
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-right mt-3">
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

                                {/* <GoogleMap
                                    params={{
                                        building: this.state.building,
                                        location: this.state.location
                                    }}
                                /> */}
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
