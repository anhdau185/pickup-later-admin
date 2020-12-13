import React from 'react'
import { connect } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { authenticate } from 'redux/actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    if (this.state.username && this.state.password) {
      this.props.authenticate({
        userName: this.state.username,
        password: this.state.password
      })
    } else {
      window.alert('Chưa nhập tên đăng nhập/mật khẩu.')
    }
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">Đăng nhập dùng tài khoản System Admin hoặc Store Manager.</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={e => this.setState({ username: e.target.value })}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={e => this.setState({ password: e.target.value })}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" onClick={this.onSubmit}>Đăng nhập</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0 d-none">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

const mapDispatchToProps = { authenticate }
const ConnectedComp = connect(null, mapDispatchToProps)(Login)

export default ConnectedComp
