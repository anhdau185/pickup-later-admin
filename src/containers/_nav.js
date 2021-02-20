export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Products']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All products',
    to: '/products'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All combos',
    to: '/combos'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All categories',
    to: '/categories'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Store management',
    to: '/stores'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Order management',
    to: '/orders'
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Marketing']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Campaigns',
    to: '/campaigns'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Vouchers',
    to: '/vouchers'
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Store Menus'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All stores',
    to: '/stores'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Buildings',
    to: '/buildings'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Locations',
    to: '/locations'
  },
]
