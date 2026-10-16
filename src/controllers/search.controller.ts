import type { Dispatch, SetStateAction } from "react";
import { SearchService } from "@/services/search.service";
import type { SearchParams } from "@/types/search";

interface ISearch {
  params: SearchParams;
  setFullName: Dispatch<SetStateAction<string>>;
  setCheckDigit: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export class SearchController {
  static search = async ({
    params,
    setFullName,
    setCheckDigit,
    setLoading,
  }: ISearch) => {
    try {
      setLoading(true);
      const response = await SearchService.search(params);

      if (response.status === "success") {
        localStorage.setItem("documentNumber", params.documentNumber);
        setFullName(response.data.fullName);
        localStorage.setItem("fullName", response.data.fullName);
        setCheckDigit(response.data.checkDigit || "");
        localStorage.setItem("checkDigit", response.data.checkDigit || "");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
}
