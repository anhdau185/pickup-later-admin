import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CTextarea } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getCategoryById, updateCategory } from 'api';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.categoryId = this.props.match.params.id;
        this.state = { category: null };
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
            productIds: this.state.category.productIds,
            comboIds: this.state.category.comboIds
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
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Category ID: {this.categoryId}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.category).map((key, index) => (
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
