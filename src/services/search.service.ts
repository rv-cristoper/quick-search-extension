import axios from "@/lib/axios";
import type { SearchParams, SearchResponse } from "@/types/search";

export class SearchService {
  static search = async (params: SearchParams): Promise<SearchResponse> => {
    const { data } = await axios.request<SearchResponse>({
      method: "GET",
      url: "/api/v1/search",
      params,
    });
    return data;
  };
}
