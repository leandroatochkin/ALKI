import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
//import centralizedErrorHandler from './middleware/error_handling/error_handler.cjs'; // Keeping this .cjs since it's CommonJS
import signupRoute from './api/routes/signup/signup';
import newUserRoute from './api/routes/newUser/newUser'
import getUserData from './api/routes/userData/userData'
import getProperties from './api/routes/properties/getProperties'
import addProperty from './api/routes/properties/addProperty'
import deleteProperty from './api/routes/properties/deleteProperty'
import updateProperty from './api/routes/properties/updateProperty'
import getTenants from './api/routes/tenants/getTenants'
import addTenant from './api/routes/tenants/addTenant'
import getTenantById from './api/routes/tenants/getTenantById'
import deleteTenant from './api/routes/tenants/deleteTenant'
import getInventories from './api/routes/inventories/getInventories'
import deleteInventoryItems from './api/routes/inventories/deleteInventoryItems'
import addNewInventoryItems from './api/routes/inventories/addNewInventoryItems'
import deleteInventory from './api/routes/inventories/deleteWholeInventory'
import printPDFs from './api/routes/inventories/returnQrPdfs'
import getPaymentsByTenantId from './api/routes/payments/getPaymentsByTenantId'
import getPaymentsByUserId from './api/routes/payments/getPaymentsByUserId'
import registerPayment from './api/routes/payments/registerPayment'
import createOrganization from './api/routes/organizations/createOrganization'
import getOrganizationsByUserId from './api/routes/organizations/getOrganizationsByUserId'
import deleteOrganization from './api/routes/organizations/deleteOrganization'
import deleteOrganizationMember from './api/routes/organizations/deleteOrganizationMember'
import getOrganizationMembersByOrganizationId from './api/routes/organizations/getOrganizationMembersByOrganizationId'
import updateOrganization from './api/routes/organizations/updateOrganization'
import addOrganizationMembers from './api/routes/organizations/addOrganizationMembers'


const app = express();

const frontendURL = process.env.FRONTEND_URL;

const allowedOrigins = [
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin: string, callback: (err: Error | null, isOriginAllowed: boolean) => void) => {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., mobile apps)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Explicitly handle preflight (OPTIONS) requests
//app.options(frontendURL, cors());

// Resource headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Load routes
app.use('/signup', signupRoute)
app.use('/newuser', newUserRoute)
app.use('/user', getUserData)
app.use('/properties', getProperties)
app.use('/add-property', addProperty)
app.use('/delete-property', deleteProperty)
app.use('/update-property', updateProperty)
app.use('/get-tenants', getTenants)
app.use('/add-tenant', addTenant)
app.use('/delete-tenant', deleteTenant)
app.use('/get-inventory', getInventories)
app.use('/delete-inventory-items', deleteInventoryItems)
app.use('/add-inventory-items', addNewInventoryItems)
app.use('/delete-inventory', deleteInventory)
app.use('/return-pdfs', printPDFs)
app.use('/get-payments-by-tenantId', getPaymentsByTenantId)
app.use('/get-payments-by-userId', getPaymentsByUserId)
app.use('/get-tenant-by-id', getTenantById)
app.use('/register-payment', registerPayment)
app.use('/create-organization', createOrganization)
app.use('/get-organizations-by-userId', getOrganizationsByUserId)
app.use('/delete-organization', deleteOrganization)
app.use('/get-organization-members-by-organizationId', getOrganizationMembersByOrganizationId)
app.use('/delete-organization-member', deleteOrganizationMember)
app.use('/update-organization', updateOrganization)
app.use('/add-organization-members', addOrganizationMembers)

//app.use(centralizedErrorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
