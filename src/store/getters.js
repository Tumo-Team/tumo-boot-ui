const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  theme: state => state.settings.theme,
  token: state => state.user.token,
  user: state => state.user.user,
  dept: state => state.user.dept,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes
}
export default getters
