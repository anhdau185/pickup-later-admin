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
import {
    Button,
    Checkbox,
    Form,
    Input
} from 'semantic-ui-react';
import { getOrders } from 'api';
import { formatPrice } from 'helpers';
import DataTable from 'components/DataTable';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Orders = ({ authToken }) => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const [page, setPage] = useState(queryPage && queryPage[1] ? parseInt(queryPage[1]) : 1);
    const [orders, setOrders] = useState(null);
    const [transactionNo, setTransactionNo] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [startDate, setStartDate] = useState(new Date(2020, 11, 1)); // set 'Dec 1, 2020' as default
    const [endDate, setEndDate] = useState(new Date()); // now

    const [statusNEW, setStatusNEW] = useState(false);
    const [statusRECEIVED, setStatusRECEIVED] = useState(false);
    const [statusCONFIRMED, setStatusCONFIRMED] = useState(false);
    const [statusAVAILABLE, setStatusAVAILABLE] = useState(false);
    const [statusCOMPLETED, setStatusCOMPLETED] = useState(false);
    const [statusCANCELED, setStatusCANCELED] = useState(false);

    useEffect(() => {
        getOrders({
            page,
            perPage: 100
        }, authToken)
            .then(resp => setOrders(resp.data))
            .catch(err => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (orders && !orders.error) {
        return (
            <div className="orders-mgr">
                <CRow>
                    <CCol xl={6}>
                        <CCard>
                            <CCardHeader>Filters</CCardHeader>
                            <CCardBody>
                                <Form>
                                    <Form.Group inline>
                                        <Form.Field
                                            control={Input}
                                            type='text'
                                            label='Transaction no.'
                                            value={transactionNo}
                                            onChange={e => setTransactionNo(e.target.value)}
                                        />
                                        <Form.Field
                                            control={Input}
                                            type='text'
                                            label='Phone number'
                                            value={phoneNumber}
                                            onChange={e => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group inline>
                                        <div className="mr-3">
                                            <label className="mr-2"><b>Start date:</b></label>
                                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                                        </div>
                                        <div className="ml-3">
                                            <label className="mr-2"><b>End date:</b></label>
                                            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group inline>
                                        <label>Status:</label>
                                        <Form.Field
                                            control={Checkbox}
                                            label='NEW'
                                            checked={statusNEW}
                                            onClick={() => setStatusNEW(prevState => !prevState)}
                                        />
                                        <Form.Field
                                            control={Checkbox}
                                            label='RECEIVED'
                                            checked={statusRECEIVED}
                                            onClick={() => setStatusRECEIVED(prevState => !prevState)}
                                        />
                                        <Form.Field
                                            control={Checkbox}
                                            label='CONFIRMED'
                                            checked={statusCONFIRMED}
                                            onClick={() => setStatusCONFIRMED(prevState => !prevState)}
                                        />
                                        <Form.Field
                                            control={Checkbox}
                                            label='AVAILABLE (READY)'
                                            checked={statusAVAILABLE}
                                            onClick={() => setStatusAVAILABLE(prevState => !prevState)}
                                        />
                                        <Form.Field
                                            control={Checkbox}
                                            label='COMPLETED'
                                            checked={statusCOMPLETED}
                                            onClick={() => setStatusCOMPLETED(prevState => !prevState)}
                                        />
                                        <Form.Field
                                            control={Checkbox}
                                            label='CANCELED'
                                            checked={statusCANCELED}
                                            onClick={() => setStatusCANCELED(prevState => !prevState)}
                                        />
                                    </Form.Group>
                                    <Form.Field
                                        control={Button}
                                        onClick={() => {
                                            let params = {
                                                page: 1,
                                                perPage: 100,
                                                'created_at': 'DESC'
                                            };
                                            let statusArray = [];

                                            if (transactionNo) params.transactionNo = transactionNo;
                                            if (phoneNumber) params.phone = phoneNumber;
                                            if (startDate) params.from = startDate.getTime();
                                            if (endDate) params.to = endDate.getTime();

                                            if (statusNEW) statusArray.push('NEW');
                                            if (statusRECEIVED) statusArray.push('RECEIVED');
                                            if (statusCONFIRMED) statusArray.push('CONFIRMED');
                                            if (statusAVAILABLE) statusArray.push('AVAILABLE');
                                            if (statusCANCELED) statusArray.push('CANCELED');
                                            if (statusArray.length > 0) params.status = statusArray.join(',');

                                            getOrders(params, authToken)
                                                .then(resp => setOrders(resp.data))
                                                .catch(err => console.error(err));
                                        }}
                                    >
                                        Search
                                    </Form.Field>
                                </Form>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xl={6}>
                        <CCard>
                            <CCardHeader>Stats</CCardHeader>
                            <CCardBody>
                                <div className="stat-entry">
                                    <h4>
                                        Total orders: <span style={{ color: '#321fdb', fontWeight: 'bold' }}>{orders.report.totalOrder}</span>
                                    </h4>
                                </div>
                                <div className="stat-entry">
                                    <h4>
                                        Total order amount: <span style={{ color: '#321fdb', fontWeight: 'bold' }}>{formatPrice(orders.report.totalAmount)}</span>
                                    </h4>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Orders</CCardHeader>
                            <CCardBody>
                                <DataTable fields={['Transaction no.', 'Username', 'Phone number', 'Note', 'Store ID', 'Status', 'Payment method', 'Payment status', 'Total amount']}>
                                    {orders.records.map(
                                        item => <DataTable.OrderRow key={item.transactionNo} item={item} onRowClick={item => history.push(`/orders/${item.id}`)} />
                                    )}
                                </DataTable>
                                <CPagination
                                    activePage={page}
                                    onActivePageChange={newPage => {
                                        if (newPage !== page) {
                                            setPage(newPage);
                                            history.push(`/orders?page=${newPage}`);
                                        }
                                    }}
                                    pages={orders ? orders.pages : 1}
                                    doubleArrows={false}
                                    align="center"
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        );
    }

    return null;
};

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
const ConnectedComp = connect(mapStateToProps)(Orders);

export default ConnectedComp;
