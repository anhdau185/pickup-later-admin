import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CTextarea } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { getLocationById } from 'api';
import GoogleMap from 'components/GoogleMap';
// import campaignJson from 'json/campaign.json';

class Campaign extends React.Component {
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
                <div>
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
                                                                    <CInput value={this.state.location[key]} />
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
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedCampaign = connect(mapStateToProps)(Campaign);

export default ConnectedCampaign;
