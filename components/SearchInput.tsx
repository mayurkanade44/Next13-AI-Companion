"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import qs from 'query-string'

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debounce = useDebounce<string>(value, 1000);

   const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
     setValue(e.target.value);
   };

   useEffect(() => {
     const query = {
       name: debounce,
       categoryId: categoryId,
     };

     const url = qs.stringifyUrl(
       {
         url: window.location.href,
         query,
       },
       { skipNull: true, skipEmptyString: true }
     );

     router.push(url);
   }, [debounce, router, categoryId]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input onChange={onChange} value={value} placeholder="Search..." className="pl-10 bg-primary/10" />
    </div>
  );
};
export default SearchInput;
