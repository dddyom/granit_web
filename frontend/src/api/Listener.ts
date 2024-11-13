import { AxiosInstance } from "axios";

export class ListenerApi {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async turnOnListener(): Promise<boolean> {
    const response = await this.api.post("/listener/on");
    if (response.status !== 200) {
      return false;
    }
    return response.data?.status || false;
  }
  async turnOffListener(): Promise<boolean> {
    const response = await this.api.post("/listener/off");
    if (response.status !== 200) {
      return false;
    }
    return response.data?.status || false;
  }
}
