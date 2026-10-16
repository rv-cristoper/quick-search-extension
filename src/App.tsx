import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentType, SearchParams } from "@/types/search";
import { SearchController } from "./controllers/search.controller";

function App() {
  const storedFullName = localStorage.getItem("fullName");
  const storedCheckDigit = localStorage.getItem("checkDigit");
  const storedDocumentNumber = localStorage.getItem("documentNumber");

  const [params, setParams] = useState<SearchParams>({
    documentType: "",
    documentNumber: storedDocumentNumber || "",
  });
  const [fullName, setFullName] = useState(storedFullName || "");
  const [checkDigit, setCheckDigit] = useState(storedCheckDigit || "");
  const [loading, setLoading] = useState(false);

  const handleDocumentTypeChange = (value: string) => {
    setParams({
      documentType: value as DocumentType,
      documentNumber: "",
    });
  };

  const handleDocumentNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setParams((current) => ({
      ...current,
      documentNumber: event.target.value.replace(/\D/g, ""),
    }));
  };

  const handleReset = () => {
    setFullName("");
    setCheckDigit("");
    setParams({ documentType: "", documentNumber: "" });
    localStorage.clear();
  };

  const handleSearch = async () => {
    await SearchController.search({
      params,
      setFullName,
      setCheckDigit,
      setLoading,
    });
  };

  const maxLength =
    params.documentType === "dni" ? 8 : params.documentType === "ruc" ? 11 : 0;
  const isInvalid = !(
    params.documentType &&
    params.documentNumber &&
    params.documentNumber.length === maxLength
  );

  return (
    <div className="text-gray300">
      <header className="font-bold text-xl flex gap-3 px-4 py-2 select-none">
        <img
          src="/icons/icon48.png"
          className="pt-0.5"
          alt="logo"
          height={28}
          width={28}
        />
        Buscador Suri
      </header>
      <main className="px-4 py-6 pb-10 flex flex-col gap-4">
        {fullName ? (
          <div className="mt-0 grid gap-2">
            <div
              className="text-[14px] text-white cursor-pointer w-max mb-6"
              onClick={handleReset}
            >
              {"< Volver atrás"}
            </div>
            <p className="text-[12px]">Número de documento:</p>
            <div className="text-base text-white font-medium">
              {params.documentNumber}
              <Button
                className="bg-green-400 shadow-lg shadow-green-400/50 p-1 h-[14px] text-[10px] text-black ml-2"
                onClick={() =>
                  navigator.clipboard.writeText(params.documentNumber)
                }
              >
                Copiar
              </Button>
            </div>
            <p className="text-[12px] mt-2">Nombre completo:</p>
            <div className="text-base text-white font-medium">
              {fullName}
              <Button
                className="bg-green-400 shadow-lg shadow-green-400/50 p-1 h-[14px] text-[10px] text-black ml-2"
                onClick={() => navigator.clipboard.writeText(fullName)}
              >
                Copiar
              </Button>
            </div>
            {checkDigit && (
              <>
                <p className="text-[12px] mt-2">Dígito de verificación:</p>
                <div className="text-base text-white font-medium">
                  {checkDigit}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-2">
              <Label>Tipo de documento</Label>
              <Select
                value={params.documentType || undefined}
                onValueChange={handleDocumentTypeChange}
                disabled={loading}
              >
                <SelectTrigger className="w-[240px] text-sm select-none">
                  <SelectValue placeholder="Seleccione tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">DNI</SelectItem>
                  <SelectItem value="ruc">RUC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Número de documento</Label>
              <Input
                type="text"
                placeholder="Ingrese número de documento"
                className="w-[240px] text-sm select-none"
                value={params.documentNumber}
                onChange={handleDocumentNumberChange}
                maxLength={maxLength || undefined}
                disabled={loading || !params.documentType}
              />
            </div>
            <div className="flex justify-center mt-2">
              <Button
                className="bg-orange-400 w-full shadow-lg shadow-orange-400/50"
                disabled={loading || isInvalid}
                onClick={handleSearch}
                aria-label={loading ? "Cargando" : "Buscar"}
              >
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                    Buscando
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>
          </>
        )}
      </main>
      <footer className="flex items-center h-10 py-0 pl-3 pr-4 bg-gray900 text-[13px] font-medium select-none">
        © 2026 rv_cristoper Software Ltd
      </footer>
    </div>
  );
}

export default App;
