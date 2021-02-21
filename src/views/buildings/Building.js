import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput } from '@coreui/react';
import { getBuildingById } from 'api';
import GoogleMap from 'components/GoogleMap';

class Building extends React.Component {
    constructor(props) {
        super(props);
        this.buildingId = this.props.match.params.id;
        this.state = {
            building: null
        };
    }

    componentDidMount() {
        getBuildingById({
            buildingId: this.buildingId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ building: resp }))
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.building) {
            return (
                <div>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>Building ID: {this.buildingId}</CCardHeader>
                                <CCardBody>
                                    <table className="table table-striped table-hover">
                                        <tbody>
                                            {
                                                Object.keys(this.state.building).map((key, index) => {
                                                    if (key !== 'locations') {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{key}:</td>
                                                                <td>{
                                                                    <CInput readOnly value={this.state.building[key]} />
                                                                }</td>
                                                            </tr>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    <GoogleMap
                        params={{
                            building: this.state.building,
                            location: [...this.state.building.locations, this.state.building]
                        }}
                    />
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(Building);

export default ConnectedComp;
