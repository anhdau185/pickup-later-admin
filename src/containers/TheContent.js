import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = ({ auth }) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to={auth || true ? '/dashboard' : '/login'} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
const ConnectedComp = connect(mapStateToProps)(TheContent)

export default React.memo(ConnectedComp)
