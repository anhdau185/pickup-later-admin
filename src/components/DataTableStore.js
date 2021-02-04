import React from 'react';
import { Table } from 'react-bootstrap';

const DataTableStoreRow = ({ item, onRowClick }) => {
  const { id, storeId, name, phoneNumber, address } = item;
  return (
      <tr key={id} onClick={() => onRowClick(item)} style={{ cursor: 'pointer' }}>
          <td>{id}</td>
          <td>{storeId}</td>
          <td><b>{name}</b></td>
          <td>{phoneNumber}</td>
          <td>{address}</td>
      </tr>
  );
};

const DataTableStore = ({ items, fields, onRowClick }) => {
  return (
      <Table striped bordered hover>
          <thead>
              <tr>
                  {fields.map((field, index) => <th key={index}>{field}</th>)}
              </tr>
          </thead>
          <tbody>
              {items.map(item => <DataTableStoreRow item={item} onRowClick={onRowClick} />)}
          </tbody>
      </Table>
  );
};

export default DataTableStore;