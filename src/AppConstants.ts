declare global {
  interface Window {
    Environment: any;
  }
}

window.Environment = window.Environment || {};

class AppConstants {
  private window: Window;

  public constructor(window: Window) {
    this.window = window;
  }

  public get AUTH_ENDPOINT(): string {
    return this.window.Environment.AUTH_ENDPOINT;
  }

  public get API_PREFIX(): string {
    return this.window.Environment.API_PREFIX;
  }
}

export const Constants = new AppConstants(window);
