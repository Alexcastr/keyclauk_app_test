export const roles = {
  ADMIN : 'admin_realm_role',
  EMPLOYEE : 'employee_realm_role',
  TEST: 'test_real_role',

}


export const authToggleOptions = {
  LOGOUT: "logout",
  LOGIN: "login",
}


export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
