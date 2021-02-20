import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CTextarea } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getComboById } from 'api';
import ProductSelector from 'components/ProductSelector';
import DataTable from 'components/DataTable';
import comboJson from 'json/combo.json';

class Combo extends React.Component {
    constructor(props) {
        super(props);
        this.comboId = this.props.match.params.id;
        this.state = {
            combo: comboJson/* {
                products: []
            } */
        };
    }

    componentDidMount() {
        getComboById({
            comboId: this.comboId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ combo: resp }))
            .catch(err => console.error(err));
    }

    // getEditableFieldValues() {
    //     return {
    //         name: this.state.category.name,
    //         title: this.state.category.title,
    //         imageUrl: this.state.category.imageUrl,
    //         description: this.state.category.description,
    //         productIds: this.state.category.products.map(({ id }) => id),
    //         comboIds: this.state.category.combos.map(({ id }) => id)
    //     };
    // }

    renderFieldValue(key) {
        switch (key) {
            case 'description':
                return (
                    <CTextarea
                        value={this.state.combo['description']}
                        onChange={e => {
                            this.setState({
                                combo: {
                                    ...this.state.combo,
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
                        value={key === 'createdAt' || key === 'updatedAt'
                            ? getDateTimeFromMilliseconds(this.state.combo[key])
                            : this.state.combo[key]
                        }
                        onChange={e => {
                            let newCombo = { ...this.state.combo };
                            newCombo[key] = e.target.value;
                            this.setState({ combo: newCombo });
                        }}
                    />
                );
        }
    }

    render() {
        if (this.state.combo) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Combo ID: {this.comboId}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.combo).map((key, index) => {
                                                if (key !== 'products' && key !== 'combos') {
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
                                        <h5>Products assigned to this combo:</h5>
                                        <DataTable fields={['ID', 'Name', 'Title', 'Price', 'Sale price', 'Fresh food', 'Status']}>
                                            {this.state.combo.products.map(
                                                item => (
                                                    <DataTable.ProductRow
                                                        item={item}
                                                        rowAction={{
                                                            name: 'Remove',
                                                            action: () => {
                                                                if (window.confirm('Remove product from this combo?')) {
                                                                    this.setState(prevState => {
                                                                        let nextState = { combo: { ...prevState.combo } };
                                                                        nextState.combo.products = nextState.combo.products.filter(product => product.id !== item.id);
                                                                        return nextState;
                                                                    });
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )
                                            )}
                                        </DataTable>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Add a product to Combo:</h5>
                                        <ProductSelector
                                            onSelect={(product, productType) => {
                                                this.setState(prevState => {
                                                    let nextState = { combo: { ...prevState.combo } };

                                                    if (productType === 'Product') {
                                                        nextState.combo.products.push(product);
                                                    }

                                                    return nextState;
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-right mt-3">
                                        <Button
                                            // onClick={() => {
                                            //     updateCategory({
                                            //         categoryId: this.categoryId,
                                            //         categoryData: this.getEditableFieldValues(),
                                            //         token: this.props.authToken
                                            //     })
                                            //         .then(resp => {
                                            //             getCategoryById({
                                            //                 categoryId: this.categoryId,
                                            //                 token: this.props.authToken
                                            //             })
                                            //                 .then(resp => this.setState({ category: resp }))
                                            //                 .catch(err => console.error(err));

                                            //             console.log(resp);
                                            //             window.alert('Successfully updated category!');
                                            //         })
                                            //         .catch(err => console.error(err));
                                            // }}
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
const ConnectedCombo = connect(mapStateToProps)(Combo);

export default ConnectedCombo;
