import { Advocate } from "@/utils/types";
import ItemList from "./item-list";
import { useCallback, useState } from "react";

interface AdvocateRowProps {
  advocate: Advocate
}
function AdvocateRow({advocate} : AdvocateRowProps ) {
  const [showSpecialties, setShowSpecialties] = useState(false);
  const toggleSpecialties = useCallback(() => {
    setShowSpecialties((v) => !v)
  }, [setShowSpecialties]);

  return (
    <>
      <tr >
        <td>{advocate.firstName}</td>
        <td>{advocate.lastName}</td>
        <td>{advocate.city}</td>
        <td>{advocate.degree}</td>
        
        <td>{advocate.yearsOfExperience}</td>
        <td>{advocate.phoneNumber}</td>
        <td>
          <button className="bold text-2xl ml-1" onClick={toggleSpecialties}>
            {showSpecialties ? "⇈" : "⇊"}
          </button>
        </td>
      </tr>
      { showSpecialties && 
        <tr>
          <td colSpan={4}>
          <ItemList items={advocate.specialties} />
          </td>
        </tr>
      }
    </>
  );
}

export default AdvocateRow;
