import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CSelect } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getProductById, updateProduct } from 'api';
// import prod from 'json/product.json';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.productId = this.props.match.params.id;
        this.state = { product: null };
    }

    componentDidMount() {
        getProductById({
            productId: this.productId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ product: resp }))
            .catch(err => console.error(err));
    }

    getEditableFieldValues() {
        return {
            name: this.state.product.name,
            title: this.state.product.title,
            price: this.state.product.price,
            salePrice: this.state.product.salePrice,
            imageUrl: this.state.product.imageUrl,
            freshFood: this.state.product.freshFood,
            status: this.state.product.status
        };
    }

    renderFieldValue(key) {
        switch (key) {
            case 'price':
            case 'salePrice':
                return (
                    <CInput
                        type="number"
                        value={this.state.product[key]}
                        onChange={e => {
                            let newProduct = { ...this.state.product };
                            newProduct[key] = Number(e.target.value);
                            if (!isNaN(newProduct[key])) {
                                this.setState({ product: newProduct });
                            }
                        }}
                    />
                );
            case 'freshFood':
                return (
                    <CSelect
                        custom
                        name="freshfood"
                        value={this.state.product['freshFood'] ? '1' : ''}
                        onChange={e => {
                            this.setState({
                                product: {
                                    ...this.state.product,
                                    freshFood: !!e.target.value
                                }
                            });
                        }}
                    >
                        <option value="">No</option>
                        <option value="1">Yes</option>
                    </CSelect>
                );
            case 'status':
                return (
                    <CSelect
                        custom
                        name="productstatus"
                        value={this.state.product['status']}
                        onChange={e => {
                            this.setState({
                                product: {
                                    ...this.state.product,
                                    status: e.target.value
                                }
                            });
                        }}
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </CSelect>
                );
            default:
                return (
                    <CInput
                        disabled={key === 'id' || key === 'createdAt' || key === 'updatedAt'}
                        value={key === 'createdAt' || key === 'updatedAt'
                            ? getDateTimeFromMilliseconds(this.state.product[key])
                            : this.state.product[key]
                        }
                        onChange={e => {
                            let newProduct = { ...this.state.product };
                            newProduct[key] = e.target.value;
                            this.setState({ product: newProduct });
                        }}
                    />
                );
        }
    }

    render() {
        if (this.state.product) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                Product ID: {this.productId}
                            </CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.product).map((key, index) => (
                                                <tr key={index}>
                                                    <td>{key}:</td>
                                                    <td>{this.renderFieldValue(key)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <Row>
                                    <Col className="text-right">
                                        <Button onClick={() => {
                                            updateProduct({
                                                productId: this.productId,
                                                productData: this.getEditableFieldValues(),
                                                token: this.props.authToken
                                            })
                                                .then(resp => {
                                                    getProductById({
                                                        productId: this.productId,
                                                        token: this.props.authToken
                                                    })
                                                        .then(resp => this.setState({ product: resp }))
                                                        .catch(err => console.error(err));

                                                    console.log(resp);
                                                    window.alert('Successfully updated product!');
                                                })
                                                .catch(err => console.error(err));
                                        }}>Submit</Button>
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
const ConnectedProduct = connect(mapStateToProps)(Product);

export default ConnectedProduct;
