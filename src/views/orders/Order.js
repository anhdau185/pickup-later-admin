import React from 'react';
import { connect } from 'react-redux';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';
import { getOrderById } from 'api';
import { formatPrice, getDateTimeFromMilliseconds } from 'helpers';
import orderJson from 'json/order.json';
import { OrderStatus } from 'enums';
import DataTable from 'components/DataTable';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.orderId = this.props.match.params.id;
        this.state = { order: orderJson };
    }

    componentDidMount() {
        getOrderById({
            orderId: this.orderId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ order: resp.data }))
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.order) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Order Info</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.order).filter(key => key !== 'orderDetails' && key !== 'orderAudits').map((key, index) => {
                                                const value = key === 'totalAmount' ? formatPrice(this.state.order[key]) : this.state.order[key];
                                                return (
                                                    <tr key={index}>
                                                        <td>{key}</td>
                                                        <td>{value}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                        <CCard>
                            <CCardHeader>Order Details</CCardHeader>
                            <CCardBody>
                                <DataTable fields={['Product ID', 'Product Name', 'Product Type ', 'Qty', 'Price', 'Subtotal']}>
                                    {this.state.order.orderDetails.map(
                                        (item, index) => <DataTable.OrderDetailRow key={index} item={item} />
                                    )}
                                </DataTable>
                            </CCardBody>
                        </CCard>
                        <CCard>
                            <CCardHeader>Order Audits</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            this.state.order.orderAudits.map((orderAudit, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ color: OrderStatus[orderAudit.status].indicatorColor }}>
                                                            <b>{orderAudit.status}</b>
                                                        </td>
                                                        <td>{getDateTimeFromMilliseconds(orderAudit['created_at'])}</td>
                                                    </tr>
                                                );
                                            })
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
const ConnectedComp = connect(mapStateToProps)(Order);

export default ConnectedComp;
