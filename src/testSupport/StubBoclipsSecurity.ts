export const stubBoclipsSecurity = {
  logout: jest.fn(),
  isAuthenticated: () => true,
  getTokenFactory: jest.fn(),
  configureAxios: jest.fn(),
  ssoLogin: jest.fn(),
  hasRole: (_role: string) => true,
};
