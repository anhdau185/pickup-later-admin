import React from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CTextarea } from '@coreui/react';
import { getDateTimeFromMilliseconds } from 'helpers';
import { Button, Row, Col } from 'react-bootstrap';
import { getCampaignById } from 'api';
import DataTable from 'components/DataTable';
import campaignJson from 'json/campaign.json';

class Campaign extends React.Component {
    constructor(props) {
        super(props);
        this.campaignId = this.props.match.params.id;
        this.state = {
            campaign: campaignJson/* {
                products: []
            } */
        };
    }

    componentDidMount() {
        getCampaignById({
            campaignId: this.campaignId,
            token: this.props.authToken
        })
            .then(resp => this.setState({ campaign: resp }))
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
                        value={this.state.campaign['description']}
                        onChange={e => {
                            this.setState({
                                campaign: {
                                    ...this.state.campaign,
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
                        value={key === 'createdAt' || key === 'updatedAt' || key === 'startDate' || key === 'endDate'
                            ? getDateTimeFromMilliseconds(this.state.campaign[key])
                            : this.state.campaign[key]
                        }
                        onChange={e => {
                            let newCampaign = { ...this.state.campaign };
                            newCampaign[key] = e.target.value;
                            this.setState({ campaign: newCampaign });
                        }}
                    />
                );
        }
    }

    render() {
        if (this.state.campaign) {
            return (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>campaignId ID: {this.campaignId}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {
                                            Object.keys(this.state.campaign).map((key, index) => {
                                                if (key !== 'vouchers') {
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
                                        <h5>Vouchers issued from this campaign:</h5>
                                        <DataTable fields={['ID', 'Name', 'Code', 'Value', 'Maximum discount', 'Expired at', 'Available qty']}>
                                            {this.state.campaign.vouchers.map(
                                                item => (
                                                    <DataTable.VoucherRow
                                                        item={item}
                                                    />
                                                )
                                            )}
                                        </DataTable>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-right mt-3">
                                        <Button
                                        /* onClick={() => {
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
                                        }} */
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
const ConnectedCampaign = connect(mapStateToProps)(Campaign);

export default ConnectedCampaign;
