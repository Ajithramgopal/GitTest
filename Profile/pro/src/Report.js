import "./Report.css";

export default function Report() {
  const data = [
    { name: "Ajithram", age: 28, mob: "8903472854" },
    { name: "Ravi", age: 32, mob: "9876543210" },
    { name: "Sita", age: 25, mob: "9123456789" },
    { name: "Ajithram", age: 28, mob: "8903472854" },
    { name: "Ravi", age: 32, mob: "9876543210" },
    { name: "Sita", age: 25, mob: "9123456789" },
    { name: "Ajithram", age: 28, mob: "8903472854" },
    { name: "Ravi", age: 32, mob: "9876543210" },
    { name: "Sita", age: 25, mob: "9123456789" },
    { name: "Ajithram", age: 28, mob: "8903472854" },
    { name: "Ravi", age: 32, mob: "9876543210" },
    { name: "Sita", age: 25, mob: "9123456789" },
    { name: "Ajithram", age: 28, mob: "8903472854" },
    { name: "Ravi", age: 32, mob: "9876543210" },
    { name: "Sita", age: 25, mob: "9123456789" },
  ];

  return (
    <div className="report-container">
      <h2>Employee Report</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.mob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
