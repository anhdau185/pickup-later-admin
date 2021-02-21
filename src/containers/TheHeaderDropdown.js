import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logout } from 'redux/actions'

const TheHeaderDropdown = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={'avatars/6.jpg'}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                    onClick={() => {
                        dispatch(logout());
                        history.push('/login');
                    }}
                >
                    <CIcon name="cil-lock-locked" className="mfe-2" />
                    Lock Account
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdown
