import { useContext, useState, useEffect } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePutApi from "../CustomHook/usePutApi";
import usePostApi from "../CustomHook/usePostApi";

export default function TicketCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgid;
  const navigate = useNavigate();
  const location = useLocation();

  const tableName = "ticket"; // ✅ changed from 'flat'
  const { updateItem, waiting, err } = usePutApi(tableName);
  const { postData, postLoading, postError, responseData } =
    usePostApi(tableName);

  const editData = location?.state?.editData || null;

  const [tic, setTic] = useState({
    ticketid: "",
    ticketname: "",
    category: "",
    block: "",
    flat: "",
    attach: "",
  });

  useEffect(() => {
    if (editData) {
      setTic({
        ticketid: editData.ticketid || "",
        ticketname: editData.ticketname || "",
        category: editData.category || "",
        block: editData.block || "",
        flat: editData.flat || "",
        attach: editData.attach || "",
      });
    }
  }, [editData, orgId]);

  const handleChange = (key, value) => {
    setTic((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...tic,
    };
    console.log("gg", payload);
    try {
      if (editData) {
        await updateItem("ticketid", tic.ticketid, payload);
        alert("Ticket updated successfully");
      } else {
        await postData(payload);
        alert("Ticket created successfully");
      }
      navigate("/ticrep");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Ticket Creation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ticket ID</label>
          <input
            type="number"
            name="ticketid"
            placeholder="Ticket ID"
            value={tic.ticketid}
            onChange={(e) => handleChange("ticketid", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ticket Name</label>
          <input
            type="text"
            name="ticketname"
            placeholder="Ticket Name"
            value={tic.ticketname}
            onChange={(e) => handleChange("ticketname", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Block</label>
          <input
            type="text"
            name="block"
            placeholder="Block"
            value={tic.block}
            onChange={(e) => handleChange("block", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Flat</label>
          <input
            type="text"
            name="flat"
            placeholder="Flat"
            value={tic.flat}
            onChange={(e) => handleChange("flat", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={tic.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Attachment</label>
          <input
            type="text"
            name="attach"
            value={tic.attach}
            onChange={(e) => handleChange("attach", e.target.value)}
          />
        </div>

        <button type="submit" disabled={postLoading || waiting}>
          {editData ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
