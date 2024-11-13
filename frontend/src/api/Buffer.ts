import { AxiosInstance } from "axios";
import { ICOPoint } from "../types";

export class BufferApi {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async searchTargets(
    files: FileList,
  ): Promise<{ status: boolean; ico_targets?: ICOPoint[] }> {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    const response = await this.api.post("/buffers/search", formData);
    if (response.status !== 200) {
      return { status: false };
    }
    return response.data;
  }
}
