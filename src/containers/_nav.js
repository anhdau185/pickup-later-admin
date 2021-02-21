export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Store Management']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Products',
    to: '/products'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Product combos',
    to: '/combos'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Categories',
    to: '/categories'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    to: '/orders'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customers',
    to: '/customers'
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
    _children: ['System'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Stores',
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
