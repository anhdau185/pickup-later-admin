import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput } from '@coreui/react';
import { getVoucherById } from 'api';

class Voucher extends React.Component {
    constructor(props) {
        super(props);
        this.voucherId = this.props.match.params.id;
        this.state = {
            voucher: null
        };
    }

    componentDidMount() {
        getVoucherById({
            voucherId: this.voucherId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ voucher: resp }))
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.voucher) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Voucher ID: {this.voucherId}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.voucher).map((key, index) => (
                                                <tr key={index}>
                                                    <td>{key}:</td>
                                                    <td>{
                                                        <CInput readOnly value={this.state.voucher[key]} />
                                                    }</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
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
const ConnectedComp = connect(mapStateToProps)(Voucher);

export default ConnectedComp;
