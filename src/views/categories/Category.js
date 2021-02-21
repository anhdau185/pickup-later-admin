import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CTextarea } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getCategoryById, updateCategory } from 'api';
import ProductSelector from 'components/ProductSelector';
import DataTable from 'components/DataTable';
// import categoryJson from 'json/category.json';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.categoryId = this.props.match.params.id;
        this.state = {
            category: {
                products: [],
                combos: []
            }
        };
    }

    componentDidMount() {
        getCategoryById({
            categoryId: this.categoryId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ category: resp }))
            .catch(err => console.error(err));
    }

    getEditableFieldValues() {
        return {
            name: this.state.category.name,
            title: this.state.category.title,
            imageUrl: this.state.category.imageUrl,
            description: this.state.category.description,
            productIds: this.state.category.products.map(({ id }) => id),
            comboIds: this.state.category.combos.map(({ id }) => id)
        };
    }

    renderFieldValue(key) {
        switch (key) {
            case 'description':
                return (
                    <CTextarea
                        value={this.state.category['description']}
                        onChange={e => {
                            this.setState({
                                category: {
                                    ...this.state.category,
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
                            ? getDateTimeFromMilliseconds(this.state.category[key])
                            : this.state.category[key]
                        }
                        onChange={e => {
                            let newCategory = { ...this.state.category };
                            newCategory[key] = e.target.value;
                            this.setState({ category: newCategory });
                        }}
                    />
                );
        }
    }

    render() {
        if (this.state.category) {
            console.log(this.state.category);
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Category ID: {this.categoryId}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.category).map((key, index) => {
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
                                        <h5>Products assigned to this category:</h5>
                                        <DataTable fields={['ID', 'Name', 'Title', 'Price', 'Sale price', 'Fresh food', 'Status']}>
                                            {this.state.category.products.map(
                                                item => (
                                                    <DataTable.ProductRow
                                                        item={item}
                                                        rowAction={{
                                                            name: 'Remove',
                                                            action: () => {
                                                                if (window.confirm('Remove product from this category?')) {
                                                                    this.setState(prevState => {
                                                                        let nextState = { category: { ...prevState.category } };
                                                                        nextState.category.products = nextState.category.products.filter(product => product.id !== item.id);
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
                                        <h5>Combos assigned to this category:</h5>
                                        <DataTable fields={['ID', 'Name', 'Title', 'Price', 'Sale price', 'Fresh food', 'Status']}>
                                            {this.state.category.combos.map(
                                                item => (
                                                    <DataTable.ProductRow
                                                        item={item}
                                                        rowAction={{
                                                            name: 'Remove',
                                                            action: () => {
                                                                if (window.confirm('Remove combo from this category?')) {
                                                                    this.setState(prevState => {
                                                                        let nextState = { category: { ...prevState.category } };
                                                                        nextState.category.combos = nextState.category.combos.filter(combo => combo.id !== item.id);
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
                                        <h5>Add a product to category:</h5>
                                        <ProductSelector
                                            onSelect={(product, productType) => {
                                                this.setState(prevState => {
                                                    let nextState = { category: { ...prevState.category } };

                                                    if (productType === 'Product') {
                                                        nextState.category.products.push(product);
                                                    } else if (productType === 'Combo') {
                                                        nextState.category.combos.push(product);
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
                                            onClick={() => {
                                                updateCategory({
                                                    categoryId: this.categoryId,
                                                    categoryData: this.getEditableFieldValues(),
                                                    token: this.props.authToken
                                                })
                                                    .then(resp => {
                                                        getCategoryById({
                                                            categoryId: this.categoryId,
                                                            token: this.props.authToken
                                                        })
                                                            .then(resp => this.setState({ category: resp }))
                                                            .catch(err => console.error(err));

                                                        console.log(resp);
                                                        window.alert('Successfully updated category!');
                                                    })
                                                    .catch(err => console.error(err));
                                            }}
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
const ConnectedCategory = connect(mapStateToProps)(Category);

export default ConnectedCategory;
