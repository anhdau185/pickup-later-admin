import React, { lazy, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react'
import { getDashboardData } from 'api'
import BestSellersChart from '../charts/BestSellersChart'
import TopUsersChart from '../charts/TopUsersChart'
import SaleAvenueChart from '../charts/SaleAvenueChart'

const Dashboard = ({ authToken }) => {
    const [dashboardData, setDashboardData] = useState(null);
    useEffect(() => {
        getDashboardData(authToken)
            .then(resp => setDashboardData(resp.data))
            .catch(err => console.error(err));
    }, []);

    if (!dashboardData) return null;
    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol>
                        <h4 id="traffic" className="card-title mb-0">Statistics</h4>
                        <div className="small text-muted">February 2021</div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xl={6}>
                        <BestSellersChart data={dashboardData.bestSellers} />
                    </CCol>
                    <CCol xl={6}>
                        <TopUsersChart data={dashboardData.topUsers} />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CCol>
                        <SaleAvenueChart data={dashboardData.saleRevenue} />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

const mapStateToProps = ({ auth }) => ({ authToken: auth ? auth.token : '' })
const ConnectedComp = connect(mapStateToProps)(Dashboard)

export default ConnectedComp
