import "./Form.css";

export default function Form() {
  return (
    <div className="form-container">
      <h1>Form Creation</h1>
      <form className="form-body">
        <div className="form-group">
          <input type="text" placeholder="Name" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Mobile" />
        </div>
        <div className="form-group">
          <input type="date" placeholder="DOB" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Age" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Mobile" />
        </div>
        <div className="form-group">
          <input type="date" placeholder="DOB" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Age" />
        </div>
        <div className="form-footer">
          <button className="form-button">Submit</button>
        </div>
      </form>
    </div>
  );
}
