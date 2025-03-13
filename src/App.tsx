import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  // const storedCount = localStorage.getItem('counter');
  // const [count, setCount] = useState(storedCount ? parseInt(storedCount) : 0);
  const [input, setInput] = useState({
    documentType: '',
    documentNumber: '',
  });
  const [fullName, setFullName] = useState('Cristoper Jhanfranco Runco Contreras');

  // const onClick = () => {
  //   setCount(prev => prev + 1);
  //   localStorage.setItem('counter', (count + 1).toString());
  // }

  const selectDocumentType = (value: string) => {
    setInput({
      documentType: value,
      documentNumber: ''
    })
  }
  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prev => ({
      ...prev,
      documentNumber: e.target.value.replace(/\D/g, '')
    }))
  }

  const disabledDocumentNumberInput = !input.documentType;
  const maxLengthDocumentNumberInput = input.documentType === 'dni' ? 8 : input.documentType === 'ruc' ? 11 : 0;
  const disabledSearchButton = !(input.documentType && input.documentNumber && input.documentNumber.length === maxLengthDocumentNumberInput);

  return (
    <div className="text-gray300">
      <header className="font-bold text-xl flex gap-3 px-4 py-2">
        <img
          src="/icons/icon48.png"
          className="pt-0.5"
          alt="logo"
          height={28}
          width={28}
        />
        Buscador BFS
      </header>
      <main className="h-[400px] px-4 py-6 flex flex-col gap-4">
        <div className="grid gap-2">
          <Label>Tipo de documento</Label>
          <Select
            defaultValue={input.documentType}
            onValueChange={selectDocumentType}
            disabled
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Seleccione tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dni">
                DNI
              </SelectItem>
              <SelectItem value="ruc">
                RUC
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Número de documento</Label>
          <Input
            type="text"
            placeholder="Ingrese número de documento"
            className="w-[240px] text-sm"
            disabled={disabledDocumentNumberInput}
            value={input.documentNumber}
            onChange={inputHandleChange}
            maxLength={maxLengthDocumentNumberInput}
          />
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-orange-400 w-[150px] shadow-lg shadow-orange-400/50"
            disabled={disabledSearchButton}
          >
            Buscar
          </Button>
        </div>
        <div className="mt-5 grid gap-2">
          <p className="text-sm font-medium text-white">
            Resultado:
          </p>
          <div className="text-base">
            {fullName}
            <img
              src="/icons/copy.png"
              className="ml-2 cursor-pointer inline-block"
              alt="Copy icon"
              height={17}
              width={17}
              onClick={() => navigator.clipboard.writeText(fullName)}
            />
          </div>
        </div>
      </main>
      <footer className="flex items-center h-10 py-0 pl-3 pr-4 bg-gray900 text-[13px] font-medium">
        © 2025 rv_cristoper Software Ltd
      </footer>
    </div>
  )
}

export default App
