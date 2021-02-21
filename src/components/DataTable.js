import React from 'react';
import { Table } from 'react-bootstrap';
import { CBadge } from '@coreui/react';
import { formatPrice } from 'helpers';
import { Link } from 'react-router-dom';
import { getDateTimeFromMilliseconds } from 'helpers';

const getBadge = status => {
    switch (status) {
        case 'ACTIVE': return 'success';
        case 'INACTIVE': return 'secondary';
        default: return 'primary';
    }
};

const DataTable = ({ fields, children }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {fields.map((field, index) => <th key={index}>{field}</th>)}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </Table>
    );
};

DataTable.ProductRow = ({ item, rowAction }) => {
    const { id, name, title, price, salePrice, freshFood, status } = item;
    return (
        <tr key={id}>
            <td><Link to={`/products/${id}`}>{id}</Link></td>
            <td><Link to={`/products/${id}`}><b>{name}</b></Link></td>
            <td>{title}</td>
            <td>{formatPrice(price)}</td>
            <td>{formatPrice(salePrice)}</td>
            <td>{freshFood ? 'Yes' : 'No'}</td>
            <td>
                <CBadge color={getBadge(status)}>
                    {status}
                </CBadge>
            </td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}>
                        <b>{rowAction.name}</b>
                    </td>
                    : null
            }
        </tr>
    );
};

DataTable.CategoryRow = ({ item, rowAction }) => {
    const { id, name, title } = item;
    return (
        <tr key={id}>
            <td><Link to={`/categories/${id}`}>{id}</Link></td>
            <td><Link to={`/categories/${id}`}><b>{name}</b></Link></td>
            <td>{title}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}>
                        <b>{rowAction.name}</b>
                    </td>
                    : null
            }
        </tr>
    );
};

DataTable.OrderRow = ({ item }) => {
    const { transactionNo, userName, phoneNumber, note, totalAmount, status, paymentMethod, paymentStatus, storeId } = item;
    return (
        <tr key={transactionNo}>
            <td><Link to={`/orders/${transactionNo}`}>{transactionNo}</Link></td>
            <td>{userName}</td>
            <td>{phoneNumber}</td>
            <td>{note}</td>
            <td>{storeId}</td>
            <td>{status}</td>
            <td>{paymentMethod}</td>
            <td>{paymentStatus}</td>
            <td>{totalAmount}</td>
        </tr>
    );
};

DataTable.ComboRow = ({ item, rowAction }) => {
    const { id, name, title, price, salePrice } = item;
    return (
        <tr key={id}>
            <td><Link to={`/combos/${id}`}>{id}</Link></td>
            <td><Link to={`/combos/${id}`}><b>{name}</b></Link></td>
            <td>{title}</td>
            <td>{formatPrice(price)}</td>
            <td>{formatPrice(salePrice)}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}>
                        <b>{rowAction.name}</b>
                    </td>
                    : null
            }
        </tr>
    );
};

DataTable.CampaignRow = ({ item, rowAction }) => {
    const { id, name, code, issuedQuantity, status, startDate, endDate, description } = item;
    return (
        <tr key={id}>
            <td><Link to={`/campaigns/${id}`}>{id}</Link></td>
            <td><Link to={`/campaigns/${id}`}><b>{name}</b></Link></td>
            <td>{code}</td>
            <td>{issuedQuantity}</td>
            <td>{status}</td>
            <td>{getDateTimeFromMilliseconds(startDate)}</td>
            <td>{getDateTimeFromMilliseconds(endDate)}</td>
            <td>{description}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}>
                        <b>{rowAction.name}</b>
                    </td>
                    : null
            }
        </tr>
    );
};

DataTable.VoucherRow = ({ item, rowAction }) => {
    const { id, name, code, value, expiredAt, type, maxDiscount, availableQuantity } = item;
    return (
        <tr key={id}>
            <td><Link to={`/vouchers/${id}`}>{id}</Link></td>
            <td><Link to={`/vouchers/${id}`}><b>{name}</b></Link></td>
            <td>{code}</td>
            <td>{type}</td>
            <td>{value}</td>
            <td>{maxDiscount}</td>
            <td>{expiredAt}</td>
            <td>{availableQuantity}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}>
                        <b>{rowAction.name}</b>
                    </td>
                    : null
            }
        </tr>
    );
};

DataTable.LocationRow = ({ item }) => {
    const { id, name, address, lat, lng, phoneNumber, status, rating, userRatingTotal } = item;
    const getStatusColor = status => {
        switch (status) {
            case 'NEW':
                return '#f9b115';
            case 'REGISTERED':
                return '#39f';
            default:
                return '#888';
        }
    };

    return (
        <tr key={id}>
            <td><Link to={`/locations/${id}`}>{id}</Link></td>
            <td><Link to={`/locations/${id}`}><b>{name}</b></Link></td>
            <td>{address}</td>
            <td>{lat}, {lng}</td>
            <td>{phoneNumber}</td>
            <td style={{ color: getStatusColor(status) }}><b>{status}</b></td>
            <td>{rating}</td>
            <td>{userRatingTotal}</td>
        </tr>
    );
};

DataTable.BuildingRow = ({ item, rowAction }) => {
    const { id, name, address, lat, lng } = item;
    return (
        <tr key={id}>
            <td><Link to={`/buildings/${id}`}>{id}</Link></td>
            <td><Link to={`/buildings/${id}`}><b>{name}</b></Link></td>
            <td>{address}</td>
            <td>{lat}, {lng}</td>
            {
                rowAction
                    ? <td onClick={() => rowAction.action(item)} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}>
                        <b>{rowAction.name}</b>
                    </td>
                    : null
            }
        </tr>
    );
};

DataTable.OrderDetailRow = ({ item }) => {
    const { productId, productName, productType, quantity, price, subtotal } = item;
    return (
        <tr key={productId}>
            <td>{productId}</td>
            <td><b>{productName}</b></td>
            <td>{productType}</td>
            <td>{quantity}</td>
            <td>{formatPrice(price)}</td>
            <td>{formatPrice(subtotal)}</td>
        </tr>
    );
};

DataTable.CustomerRow = ({ item }) => {
    const { id, userName, phoneNumber, latestLoginAt, status } = item;
    return (
        <tr key={id}>
            <td><Link to={`/customers/${id}`}>{id}</Link></td>
            <td><Link to={`/customers/${id}`}>{userName}</Link></td>
            <td>{phoneNumber}</td>
            <td>{getDateTimeFromMilliseconds(latestLoginAt)}</td>
            <td>{status}</td>
        </tr>
    );
};

DataTable.OrderOfCustomerRow = ({ item }) => {
    const { transactionNo, note, totalAmount, status, paymentMethod, paymentStatus } = item;
    return (
        <tr key={transactionNo}>
            <td><Link to={`/orders/${transactionNo}`}>{transactionNo}</Link></td>
            <td>{note}</td>
            <td>{status}</td>
            <td>{paymentMethod}</td>
            <td>{paymentStatus}</td>
            <td>{totalAmount}</td>
        </tr>
    );
};

export default DataTable;
