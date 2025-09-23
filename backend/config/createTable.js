const con = require("./db");
const express = require("express");

// ✅ Announcements Table
const announcements = `CREATE TABLE IF NOT EXISTS announcements (
  announceId INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  message TEXT,
  postedBy VARCHAR(100),
  audienceType VARCHAR(50),
  targetBlock VARCHAR(100),
  targetFlat VARCHAR(100),
  attach VARCHAR(255),
  status VARCHAR(50),
  sendPush BOOLEAN,
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Blocks Table
const blocks = `CREATE TABLE IF NOT EXISTS blocks (
  blockId INT AUTO_INCREMENT PRIMARY KEY,
  blockName VARCHAR(100),
  flatCount INT,
  \`desc\` VARCHAR(255),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Category Table
const category = `CREATE TABLE IF NOT EXISTS category (
  catId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description VARCHAR(100),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Employees Table
const employees = `CREATE TABLE IF NOT EXISTS employees (
  empId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  dob DATE,
  age INT,
  mob VARCHAR(20),
  adhaar VARCHAR(50),
  block VARCHAR(100),
  flat VARCHAR(100),
  country VARCHAR(100),
  state VARCHAR(100),
  city VARCHAR(100),
  address TEXT,
  upload VARCHAR(255),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Facility Booking Table
const facilityBooking = `CREATE TABLE IF NOT EXISTS facilityBooking (
  facilityBookId INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT,
  facilityId INT,
  bookingDate DATE,
  timeSlot VARCHAR(100),
  paymentStatus VARCHAR(50),
  notes VARCHAR(255),
  status VARCHAR(50),
  approvedBy VARCHAR(100),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Facility Master Table
const facilityMaster = `CREATE TABLE IF NOT EXISTS facilityMaster (
  facilityMasId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  \`desc\` VARCHAR(255),
  availableSlot INT,
  priceSlot DECIMAL(10,2),
  isPaid VARCHAR(255),
  attach VARCHAR(255),
  status VARCHAR(50),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Flats Table
const flats = `CREATE TABLE IF NOT EXISTS flats (
  flatId INT AUTO_INCREMENT PRIMARY KEY,
  blockName VARCHAR(100),
  flatNo VARCHAR(50),
  flatName VARCHAR(100),
  ownerName VARCHAR(100),
  mobile VARCHAR(20),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Maintenance Table
const maintenance = `CREATE TABLE IF NOT EXISTS maintenance (
  maintainId INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT,
  block VARCHAR(100),
  flat VARCHAR(100),
  category VARCHAR(100),
  \`desc\` TEXT,
  attach VARCHAR(255),
  status VARCHAR(50),
  priority VARCHAR(50),
  assignedTo VARCHAR(100),
  assignedAt DATETIME,
  resolvedAt DATETIME,
  rating INT,
  feedback TEXT,
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Maintenance Dues Table
const MaintenanceDues = `CREATE TABLE IF NOT EXISTS MaintenanceDues (
  dueId INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  dueMonth VARCHAR(20),
  dueDate DATE,
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Organization Table
const organization = `CREATE TABLE IF NOT EXISTS organization (
  orgId INT AUTO_INCREMENT PRIMARY KEY,
  orgName VARCHAR(200) NOT NULL,
  status VARCHAR(50),
  startDate DATE,
  endDate DATE,
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME
)`;

// ✅ Payments Table
const Payments = `CREATE TABLE IF NOT EXISTS Payments (
  paymentId INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT NOT NULL,
  dueId INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paymentMethod VARCHAR(100) NOT NULL,
  transactionId VARCHAR(100) UNIQUE,
  status VARCHAR(100),
  paidAt DATETIME,
  receiptUrl VARCHAR(255),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Roles Table
const roles = `CREATE TABLE IF NOT EXISTS roles (
  roleId INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(100),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ residents Table
const residents = `CREATE TABLE IF NOT EXISTS residents (
    residentId 		INT AUTO_INCREMENT PRIMARY KEY,
    blockId 		INT NOT NULL,
    flatId 			INT NOT NULL,
    name 			VARCHAR(100) NOT NULL,
    phone 			VARCHAR(20),
    email 			VARCHAR(100),
	  aadhar 			VARCHAR(100),
    role 			VARCHAR(50),
    startDate 		DATE,   
    endDate 		DATE,   
    status 			VARCHAR(50),
	attach 			VARCHAR(200),
	userId 			INT,
	createdBy 		VARCHAR(100),
	createdDate 	DATETIME,
	updatedBy 		VARCHAR(100),
	updatedDate 	DATETIME,
	organizationId 	INT)`;

// ✅ Status Table
const status = `CREATE TABLE IF NOT EXISTS status (
  statusId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  code VARCHAR(100),
  description VARCHAR(100),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Users Table
const users = `CREATE TABLE IF NOT EXISTS users (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(100),
  status VARCHAR(20),
  upload VARCHAR(255),
  role VARCHAR(100),
  email VARCHAR(100),
  mobile VARCHAR(100),
  block VARCHAR(100),
  flat VARCHAR(100),
  password VARCHAR(100),
  conPassword VARCHAR(100),
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Visitor Logs Table
const visitorLogs = `CREATE TABLE IF NOT EXISTS visitorLogs (
  visitorLogsId INT AUTO_INCREMENT PRIMARY KEY,
  visitorId INT,
  guardId INT,
  entryTime DATETIME,
  exitTime DATETIME,
  verifiyType VARCHAR(200),
  notes VARCHAR(200),
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// ✅ Visitors Table
const visitors = `CREATE TABLE IF NOT EXISTS visitors (
  visitId INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT,
  name VARCHAR(150),
  mobile VARCHAR(20),
  purpose VARCHAR(200),
  preApprovedBy VARCHAR(100),
  expectedTime DATETIME,
  entryTime DATETIME,
  exitTime DATETIME,
  status VARCHAR(50),
  entryMethod VARCHAR(50),
  otpCode VARCHAR(20),
  qrCodeUrl VARCHAR(255),
  vehicleNo VARCHAR(50),
  photoUrl VARCHAR(255),
  notes TEXT,
  verifiedBy VARCHAR(100),
  userId INT,
  createdBy VARCHAR(100),
  createdDate DATETIME,
  updatedBy VARCHAR(100),
  updatedDate DATETIME,
  organizationId INT
)`;

// Run tables in sequence
con.query(users, (err) => {
  if (err) throw err;
  console.log("✅ Users Table Created");

  con.query(roles, (err) => {
    if (err) throw err;
    console.log("✅ Roles Table Created");

    con.query(blocks, (err) => {
      if (err) throw err;
      console.log("✅ Blocks Table Created");

      con.query(flats, (err) => {
        if (err) throw err;
        console.log("✅ Flats Table Created");

        con.query(facilityMaster, (err) => {
          if (err) throw err;
          console.log("✅ Facility Master Table Created");

          con.query(facilityBooking, (err) => {
            if (err) throw err;
            console.log("✅ Facility Booking Table Created");

            con.query(maintenance, (err) => {
              if (err) throw err;
              console.log("✅ Maintenance Table Created");

              con.query(organization, (err) => {
                if (err) throw err;
                console.log("✅ Organization Table Created");

                con.query(visitors, (err) => {
                  if (err) throw err;
                  console.log("✅ Visitors Table Created");

                  con.query(announcements, (err) => {
                    if (err) throw err;
                    console.log("✅ Announcements Table Created");

                    con.query(employees, (err) => {
                      if (err) throw err;
                      console.log("✅ Employees Table Created");
                      process.exit();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
