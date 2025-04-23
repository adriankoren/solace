"use client";

import AdvocateHeader from "@/components/advocate-header";
import { Advocate, AdvocateArraySchema, AdvocateSchema } from "@/utils/types";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null)

  // this is the text currently in the text field
  const [currentSearchText, setCurrentSearchText] = useState("");
  // this is the text by which we are currently filtering
  const [effectiveSearchText, setEffectiveSearchText] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((json) => {
        AdvocateArraySchema.parseAsync(json).then((advocates) => {
          setAdvocates(advocates.data ?? []);
          setFilteredAdvocates(advocates.data ?? []);
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log('researching');
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(effectiveSearchText) ||
        advocate.lastName.includes(effectiveSearchText) ||
        advocate.city.includes(effectiveSearchText) ||
        advocate.degree.includes(effectiveSearchText) ||
        advocate.specialties.includes(effectiveSearchText)
      );
    });

    setFilteredAdvocates(filteredAdvocates);

  }, [effectiveSearchText]);

  const onChange = useCallback((e) => {
    const searchTerm = e.target.value;

    if (searchRef.current) {
      searchRef.current.innerHTML = searchTerm;
    }

    setCurrentSearchText(searchTerm);
    setEffectiveSearchText(searchTerm);

  }, [currentSearchText]);

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

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
        <input ref={searchRef} style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <AdvocateHeader />
        <tbody>
          {filteredAdvocates.map((advocate) => {
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
