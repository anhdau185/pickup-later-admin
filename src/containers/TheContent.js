import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { UserType } from 'enums'

// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = ({ loggedIn }) => {
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
            <Redirect from="/" to={loggedIn ? '/dashboard' : '/login'} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: !!auth && (auth.type === UserType.ADMIN.value || auth.type === UserType.STORE_MANAGER.value)
})

const ConnectedComp = connect(mapStateToProps)(TheContent)

export default React.memo(ConnectedComp)
