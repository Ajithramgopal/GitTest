import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import useFormState from "../../Component/useFormState";
export default function FacilityBookingCreation() {
  const { state: booking, setState: setBooking } =
    useFormState("facilityBooking");
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state || null;
  const { postData, putData } = useApi("facilityBook");
  const { data: facilities = [] } = useApi("facilitymas");
  const { data: residents = [] } = useApi("users");

  console.log("facilities", facilities);
  // ✅ Pre-fill if editing
  useEffect(() => {
    if (editData) {
      setBooking({
        ...editData,
      });
    }
  }, [editData]);

  // ✅ Handle change
  const handleChange = (key, value) => {
    setBooking((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log("facilityBook", booking);
  // ✅ Validation
  const validate = () => {
    const err = Validation("facilityBooking", booking);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editData) {
        await putData(editData.facilityBookId, booking);
        notifySuccess("Facility booking updated successfully!");
      } else {
        await postData(booking);
        notifySuccess("Facility booking created successfully!");
      }

      setTimeout(() => {
        navigate("/facilitybookrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("❌ Failed to save booking. Try again!");
    }
  };

  return (
    <>
      <h1>{editData ? "Edit Facility Booking" : "Create Facility Booking"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Resident */}
          <div className="form-group">
            <label>Resident</label>
            <select
              value={booking.residentId}
              onChange={(e) =>
                handleChange("residentId", Number(e.target.value))
              }
            >
              <option value="">Select Resident</option>
              {residents.map((res) => (
                <option key={res.userId} value={res.userId}>
                  {res.userName}
                </option>
              ))}
            </select>
            {errors.residentId && (
              <p style={{ color: "red" }}>{errors.residentId}</p>
            )}
          </div>

          {/* Facility */}
          <div className="form-group">
            <label>Facility</label>
            <select
              value={booking.facilityId}
              onChange={(e) =>
                handleChange("facilityId", Number(e.target.value))
              }
            >
              <option value="">Select Facility</option>
              {facilities.map((fac) => (
                <option key={fac.facilityMasId} value={fac.facilityMasId}>
                  {fac.name}
                </option>
              ))}
            </select>
            {errors.facilityId && (
              <p style={{ color: "red" }}>{errors.facilityId}</p>
            )}
          </div>

          {/* Booking Date */}
          <div className="form-group">
            <label>Booking Date</label>
            <input
              type="date"
              value={booking.bookingDate}
              onChange={(e) => handleChange("bookingDate", e.target.value)}
            />
            {errors.bookingDate && (
              <p style={{ color: "red" }}>{errors.bookingDate}</p>
            )}
          </div>

          {/* Time Slot */}
          <div className="form-group">
            <label>Time Slot</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM - 11:00 AM"
              value={booking.timeSlot}
              onChange={(e) => handleChange("timeSlot", e.target.value)}
            />
            {errors.timeSlot && (
              <p style={{ color: "red" }}>{errors.timeSlot}</p>
            )}
          </div>

          {/* Payment Status */}
          <div className="form-group">
            <label>Payment Status</label>
            <select
              value={booking.paymentStatus}
              onChange={(e) => handleChange("paymentStatus", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={booking.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={booking.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Approved By */}
          <div className="form-group">
            <label>Approved By</label>
            <input
              type="text"
              value={booking.approvedBy}
              onChange={(e) => handleChange("approvedBy", e.target.value)}
            />
          </div>

          <button type="submit">{editData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
