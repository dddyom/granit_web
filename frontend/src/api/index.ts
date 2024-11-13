import axios, { AxiosInstance } from "axios";
import { ListenerApi } from "./Listener";
import { BufferApi } from "./Buffer";
import { ICOPoint } from "../types";

class Api {
  private api: AxiosInstance;
  private listener: ListenerApi;
  private buffer: BufferApi;

  constructor(api: string) {
    this.api = axios.create({
      baseURL: api,
    });
    this.listener = new ListenerApi(this.api);
    this.buffer = new BufferApi(this.api);
  }

  async turnOnListener(): Promise<boolean> {
    return this.listener.turnOnListener();
  }
  async turnOffListener(): Promise<boolean> {
    return this.listener.turnOffListener();
  }
  async searchTargets(
    files: FileList,
  ): Promise<{ status: boolean; ico_targets?: ICOPoint[] }> {
    return this.buffer.searchTargets(files);
  }
  async datToJpg(file: File): Promise<{ status: boolean; fileUrl?: string }> {
    return this.buffer.datToJpg(file);
  }
}

const api = new Api(import.meta.env.VITE_API_URL);
export default api;
