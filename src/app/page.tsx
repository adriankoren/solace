"use client";

import AdvocateHeader from "@/components/advocate-header";
import AdvocateRow from "@/components/advocate-row";
import { Advocate, AdvocateArraySchema, AdvocateSchema } from "@/utils/types";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null); // we may no longer need this
  const searchTimer = useRef<NodeJS.Timeout| undefined>(undefined);

  // this is the text currently in the text field
  const [currentSearchText, setCurrentSearchText] = useState("");
  // this is the text by which we are currently filtering
  const [effectiveSearchText, setEffectiveSearchText] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    const url = "/api/advocates?search=" + encodeURIComponent(effectiveSearchText);
    fetch(url).then((response) => {
      response.json().then((json) => {
        AdvocateArraySchema.parseAsync(json).then((advocates) => {
          setAdvocates(advocates.data ?? []);
        });
      });
    });
  }, [effectiveSearchText]);

  const performSearch = useCallback(() => {
    setEffectiveSearchText(currentSearchText);
  }, [currentSearchText, setEffectiveSearchText]);

  const onChange = useCallback((e) => {
    const searchTerm = e.target.value;
    setCurrentSearchText(searchTerm);
    clearTimeout(searchTimer.current);
    // perform search with debounce.
    searchTimer.current = setTimeout(performSearch, 500);

  }, [setCurrentSearchText, performSearch]);

  const onClick = useCallback(() => {
    console.log(advocates);
    setEffectiveSearchText("");
    setCurrentSearchText("");
  }, [setEffectiveSearchText, setCurrentSearchText]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <h2>Search</h2>
        <input ref={searchRef} className="border border-solid border-black mr-1" onChange={onChange} value={currentSearchText} />
        <button className="border border-solid border-red-700 rounded pl-1 pr-1 hover:bg-red-300" onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table width="100%">
        <AdvocateHeader />
        <tbody>
          {advocates.map((advocate) => {            
            return <AdvocateRow advocate={advocate} key={advocate.id} />
          })}
        </tbody>
      </table>
    </main>
  );
}
