import React from 'react';
import { Table } from 'react-bootstrap';
import { CBadge } from '@coreui/react';
import { formatPrice } from 'helpers';

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

DataTable.ProductRow = ({ item, onRowClick }) => {
    const { id, name, title, price, salePrice, freshFood, status } = item;
    return (
        <tr key={id} onClick={() => onRowClick(item)} style={{ cursor: 'pointer' }}>
            <td>{id}</td>
            <td><b>{name}</b></td>
            <td>{title}</td>
            <td>{formatPrice(price)}</td>
            <td>{formatPrice(salePrice)}</td>
            <td>{freshFood ? 'Yes' : 'No'}</td>
            <td>
                <CBadge color={getBadge(status)}>
                    {status}
                </CBadge>
            </td>
        </tr>
    );
};

DataTable.CategoryRow = ({ item, onRowClick }) => {
    const { id, name, title } = item;
    return (
        <tr key={id} onClick={() => onRowClick(item)} style={{ cursor: 'pointer' }}>
            <td>{id}</td>
            <td><b>{name}</b></td>
            <td>{title}</td>
        </tr>
    );
};

export default DataTable;
