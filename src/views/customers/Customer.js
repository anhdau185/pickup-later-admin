import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CTextarea } from '@coreui/react';
import { Button, Row, Col } from 'react-bootstrap';
import { getCustomerById } from 'api';
import { getDateTimeFromMilliseconds } from 'helpers';
import DataTable from 'components/DataTable';
import customerJson from 'json/customer.json';

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.customerId = this.props.match.params.id;
        this.state = {
            customer: customerJson
        };
    }

    componentDidMount() {
        getCustomerById({
            customerId: this.customerId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ customer: resp }))
            .catch(err => console.error(err));
    }

    renderFieldValue(key) {
        switch (key) {
            case 'description':
                return (
                    <CTextarea
                        value={this.state.customer['description']}
                        onChange={e => {
                            this.setState({
                                customer: {
                                    ...this.state.customer,
                                    description: e.target.value
                                }
                            });
                        }}
                    />
                );
            default:
                return (
                    <CInput
                        disabled={key === 'id' || key === 'createdAt' || key === 'updatedAt'}
                        value={key === 'createdAt' || key === 'updatedAt' || key === 'latestLoginAt'
                            ? getDateTimeFromMilliseconds(this.state.customer[key])
                            : this.state.customer[key]
                        }
                        onChange={e => {
                            let newCustomer = { ...this.state.customer };
                            newCustomer[key] = e.target.value;
                            this.setState({ customer: newCustomer });
                        }}
                    />
                );
        }
    }

    render() {
        if (this.state.customer) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>CustomerId ID: {this.customerId}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.customer).map((key, index) => {
                                                if (key !== 'orders') {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{key}:</td>
                                                            <td>{this.renderFieldValue(key)}</td>
                                                        </tr>
                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Row>
                                    <Col>
                                        <h5>Orders:</h5>
                                        <DataTable fields={['Transaction no.', 'Note', 'Status', 'Payment method', 'Payment status', 'Total amount']}>
                                            {this.state.customer.orders.map(
                                                item => (
                                                    <DataTable.OrderOfCustomerRow
                                                        item={item}
                                                    />
                                                )
                                            )}
                                        </DataTable>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-right mt-3">
                                        <Button
                                        >
                                            Submit
                                        </Button>
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
const ConnectedCustomer = connect(mapStateToProps)(Customer);

export default ConnectedCustomer;
