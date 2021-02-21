import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput } from '@coreui/react';
import { getLocationById } from 'api';
import GoogleMap from 'components/GoogleMap';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.locationId = this.props.match.params.id;
        this.state = {
            location: null
        };
    }

    componentDidMount() {
        getLocationById({
            locationId: this.locationId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ location: resp }))
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.location) {
            return (
                <>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>Location ID: {this.locationId}</CCardHeader>
                                <CCardBody>
                                    <table className="table table-striped table-hover">
                                        <tbody>
                                            {
                                                Object.keys(this.state.location).map((key, index) => {
                                                    if (key !== 'building') {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{key}:</td>
                                                                <td>{
                                                                    <CInput readOnly value={this.state.location[key]} />
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
                    {this.state.location.building
                        ? <GoogleMap
                            params={{
                                building: this.state.location.building,
                                location: [this.state.location, this.state.location.building]
                            }}
                        />
                        : null
                    }
                </>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(Location);

export default ConnectedComp;
