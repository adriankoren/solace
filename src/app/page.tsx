"use client";

import AdvocateHeader from "@/components/advocate-header";
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
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input ref={searchRef} style={{ border: "1px solid black" }} onChange={onChange} value={currentSearchText} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <AdvocateHeader />
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
