import { Advocate } from "@/utils/types";

interface AdvocateRowProps {
  advocate: Advocate
}
function AdvocateRow({advocate} : AdvocateRowProps ) {
  return (
    <tr>
      <td>{advocate.firstName}</td>
      <td>{advocate.lastName}</td>
      <td>{advocate.city}</td>
      <td>{advocate.degree}</td>
      <td>
        {advocate.specialties.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </td>
      <td>{advocate.yearsOfExperience}</td>
      <td>{advocate.phoneNumber}</td>
    </tr>
  );
}

export default AdvocateRow;
