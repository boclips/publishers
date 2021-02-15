export default interface Appcues {
  identify: (userId: string, user: any) => {};
  page: () => {};
  track: (event: string, payload?: any) => {};
}
