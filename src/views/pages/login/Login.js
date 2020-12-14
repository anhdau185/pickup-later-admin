import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { UserType } from 'enums';
import { authenticate } from 'redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    if (this.state.username && this.state.password) {
      this.props.authenticate({
        userName: this.state.username,
        password: this.state.password
      });
    } else {
      window.alert('Chưa nhập tên đăng nhập/mật khẩu.');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth && this.props.auth !== prevProps.auth) {
      const { type, error } = this.props.auth;
      if (!error && type === UserType.ADMIN.value) {
        this.props.history.replace('/');
      } else if (!error && type === UserType.STORE_MANAGER.value) {
        this.props.history.replace('/');
      } else {
        window.alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    }
  }

  render() {
    if (this.props.auth && this.props.auth.type === UserType.ADMIN.value) {
      return <Redirect to="/" />;
    }

    if (this.props.auth && this.props.auth.type === UserType.STORE_MANAGER.value) {
      return <Redirect to="/" />;
    }

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
    );
  }
}

const LoginWithRouter = withRouter(Login);
const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { authenticate };
const ConnectedComp = connect(mapStateToProps, mapDispatchToProps)(LoginWithRouter);

export default ConnectedComp;
