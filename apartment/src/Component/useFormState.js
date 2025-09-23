import { useState } from "react";

export default function useFormState(type, options = {}) {
  const {
    editData = null,
    created = null,
    toDate = null,
    orgId = null,
    userId = null,
  } = options;

  let initialState = {};

  switch (type) {
    case "announce":
      initialState = {
        announceId: null,
        title: null,
        message: null,
        postedBy: null,
        audienceType: null,
        targetBlock: null,
        targetFlat: null,
        attach: null,
        status: null,
        sendPush: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "block":
      initialState = {
        blockId: null,
        blockName: null,
        flatCount: null,
        desc: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "category":
      initialState = {
        catId: null,
        name: null,
        description: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "employee":
      initialState = {
        name: null,
        dob: null,
        age: null,
        mob: null,
        adhaar: null,
        block: null,
        flat: null,
        country: null,
        state: null,
        city: null,
        address: null,
        upload: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "facility":
      initialState = {
        facilitymasId: null,
        name: null,
        desc: null,
        availableslot: null,
        priceslot: null,
        isPaid: null,
        attach: null,
        status: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "facilityBooking":
      initialState = {
        facilityBookId: null,
        residentId: null,
        facilityId: null,
        bookingDate: null,
        timeSlot: null,
        paymentStatus: null,
        notes: null,
        status: null,
        approvedBy: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "flat":
      initialState = {
        flatId: null,
        blockName: null,
        flatNo: null,
        flatName: null,
        ownerName: null,
        mobile: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "maintenance":
      initialState = {
        maintainId: null,
        residentId: null,
        block: null,
        flat: null,
        category: null,
        description: null,
        attach: null,
        status: null,
        priority: null,
        assignedTo: null,
        assignedAt: null,
        reslovedAt: null,
        rating: null,
        feedBack: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "maintenanceDues":
      initialState = {
        dueId: null,
        residentId: null,
        amount: null,
        dueMonth: null,
        dueDate: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "org":
      initialState = {
        orgId: null,
        orgName: "",
        status: null,
        startDate: null,
        endDate: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
      };
      break;

    case "payments":
      initialState = {
        paymentId: null,
        residentId: null,
        dueId: null,
        amount: null,
        paymentMethod: null,
        transactionId: null,
        status: null,
        paidAt: null,
        receiptUrl: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "role":
      initialState = {
        roleId: null,
        role: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "resident":
      initialState = {
        residentId: null,
        blockId: null,
        flatId: null,
        name: null,
        phone: null,
        email: null,
        aadhar: null,
        role: null,
        startDate: null,
        endDate: null,
        status: null,
        attach: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "status":
      initialState = {
        statusId: null,
        name: null,
        code: null,
        description: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "user":
      initialState = {
        userId: 0,
        userName: "",
        status: "",
        upload: null,
        role: "",
        email: "",
        mobile: "",
        block: "",
        flat: "",
        password: "",
        conPassword: "",
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "visitor":
      initialState = {
        visitId: null,
        residentId: null,
        name: null,
        mobile: "",
        purpose: null,
        preApprovedBy: null,
        expectedTime: null,
        entryTime: null,
        exitTime: null,
        status: null,
        entryMethod: null,
        otpCode: null,
        qrCodeurl: null,
        vehicleNo: null,
        photoUrl: null,
        notes: null,
        verifiedBy: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    case "visitorlogs":
      initialState = {
        visitorLogsId: null,
        visitorId: null,
        guardId: null,
        entryTime: null,
        exitTime: null,
        verifiyType: null,
        notes: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        updatedBy: null,
        updatedDate: null,
        organizationId: null,
      };
      break;

    default:
      initialState = {};
      break;
  }

  const [state, setState] = useState(initialState);

  return { state, setState };
}
