const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const orgRoutes = require("./routes/orgRoutes");
const blockRoutes = require("./routes/blockRoutes");
const flatRoutes = require("./routes/flatRoutes");
const roleRoutes = require("./routes/roleRoutes");
const facilityMasterRoutes = require("./routes/facilityMasterRoutes");
const facilityBookingRoutes = require("./routes/facilityBookingRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const visitlogsRoutes = require("./routes/visitorLogsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const statusRoutes = require("./routes/statusRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dueRoutes = require("./routes/maintenanceDuesRoutes");
const residentRoutes = require("./routes/residentRoutes");
const announceRoutes = require("./routes/announcementRoutes");
const app = express();
app.use(cors());

console.log("App.js Working");

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.use("/api/org", orgRoutes);

app.use("/api/block", blockRoutes);

app.use("/api/flat", flatRoutes);

app.use("/api/role", roleRoutes);

app.use("/api/facilitymas", facilityMasterRoutes);

app.use("/api/facilityBook", facilityBookingRoutes);

app.use("/api/maintenance", maintenanceRoutes);

app.use("/api/visitor", visitorRoutes);

app.use("/api/announce", announceRoutes);

app.use("/api/employee", employeeRoutes);

app.use("/api/visitlog", visitlogsRoutes);

app.use("/api/category", categoryRoutes);

app.use("/api/status", statusRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/due", dueRoutes);

app.use("/api/resident", residentRoutes);
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
