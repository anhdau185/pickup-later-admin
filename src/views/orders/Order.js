// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { useHistory, useLocation } from 'react-router-dom';
// import {
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
//     CRow,
//     CPagination
// } from '@coreui/react';
// import {
//     Button,
//     Checkbox,
//     Form,
//     Input,
//     Radio,
//     Select,
//     TextArea,
// } from 'semantic-ui-react';
// import { getOrderById } from 'api';
// import { formatPrice } from 'helpers';
// import DataTable from 'components/DataTable';

// class Order extends React.Component {
//     constructor(props) {
//         super(props);
//         this.orderId = this.props.match.params.id;
//         this.state = { order: null };
//     }

//     componentDidMount() {
//         getOrderById({
//             orderId: this.orderId,
//             token: this.props.authToken
//         })
//             .then(resp => this.setState({ order: resp }))
//             .catch(err => console.error(err));
//     }

//     getEditableFieldValues() {
//         return {
//             name: this.state.order.name,
//             title: this.state.order.title,
//             price: this.state.order.price,
//             salePrice: this.state.order.salePrice,
//             imageUrl: this.state.order.imageUrl,
//             freshFood: this.state.order.freshFood,
//             status: this.state.order.status
//         };
//     }

//     renderFieldValue(key) {
//         switch (key) {
//             case 'price':
//             case 'salePrice':
//                 return (
//                     <CInput
//                         type="number"
//                         value={this.state.order[key]}
//                         onChange={e => {
//                             let newProduct = { ...this.state.order };
//                             newProduct[key] = Number(e.target.value);
//                             if (!isNaN(newProduct[key])) {
//                                 this.setState({ product: newProduct });
//                             }
//                         }}
//                     />
//                 );
//             case 'freshFood':
//                 return (
//                     <CSelect
//                         custom
//                         name="freshfood"
//                         value={this.state.order['freshFood'] ? '1' : ''}
//                         onChange={e => {
//                             this.setState({
//                                 product: {
//                                     ...this.state.order,
//                                     freshFood: !!e.target.value
//                                 }
//                             });
//                         }}
//                     >
//                         <option value="">No</option>
//                         <option value="1">Yes</option>
//                     </CSelect>
//                 );
//             case 'status':
//                 return (
//                     <CSelect
//                         custom
//                         name="productstatus"
//                         value={this.state.order['status']}
//                         onChange={e => {
//                             this.setState({
//                                 product: {
//                                     ...this.state.order,
//                                     status: e.target.value
//                                 }
//                             });
//                         }}
//                     >
//                         <option value="ACTIVE">ACTIVE</option>
//                         <option value="INACTIVE">INACTIVE</option>
//                     </CSelect>
//                 );
//             default:
//                 return (
//                     <CInput
//                         disabled={key === 'id' || key === 'createdAt' || key === 'updatedAt'}
//                         value={key === 'createdAt' || key === 'updatedAt'
//                             ? getDateTimeFromMilliseconds(this.state.order[key])
//                             : this.state.order[key]
//                         }
//                         onChange={e => {
//                             let newProduct = { ...this.state.order };
//                             newProduct[key] = e.target.value;
//                             this.setState({ product: newProduct });
//                         }}
//                     />
//                 );
//         }
//     }

//     render() {
//         if (this.state.order) {
//             return (
//                 <CRow>
//                     <CCol>
//                         <CCard>
//                             <CCardHeader>Order ID: {this.orderId}</CCardHeader>
//                             <CCardBody>
//                                 <table className="table table-striped table-hover">
//                                     <tbody>
//                                         {
//                                             Object.keys(this.state.order).map((key, index) => (
//                                                 <tr key={index}>
//                                                     <td>{key}:</td>
//                                                     <td>{this.renderFieldValue(key)}</td>
//                                                 </tr>
//                                             ))
//                                         }
//                                     </tbody>
//                                 </table>
//                             </CCardBody>
//                         </CCard>
//                     </CCol>
//                 </CRow>
//             );
//         }

//         return null;
//     }
// }

// const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' });
// const ConnectedComp = connect(mapStateToProps)(Order);

// export default ConnectedComp;
