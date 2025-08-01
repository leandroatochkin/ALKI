import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
//import centralizedErrorHandler from './middleware/error_handling/error_handler.cjs'; // Keeping this .cjs since it's CommonJS
import signupRoute from './api/routes/signup/signup.js';
import newUserRoute from './api/routes/newUser/newUser.js';
import getUserData from './api/routes/userData/userData.js';
import getProperties from './api/routes/properties/getProperties.js';
import addProperty from './api/routes/properties/addProperty.js';
import deleteProperty from './api/routes/properties/deleteProperty.js';
import updateProperty from './api/routes/properties/updateProperty.js';
import getTenants from './api/routes/tenants/getTenants.js';
import addTenant from './api/routes/tenants/addTenant.js';
import getTenantById from './api/routes/tenants/getTenantById.js';
import updateTenant from './api/routes/tenants/updateTenant.js';
import deleteTenant from './api/routes/tenants/deleteTenant.js';
import getInventories from './api/routes/inventories/getInventories.js';
import deleteInventoryItems from './api/routes/inventories/deleteInventoryItems.js';
import addNewInventoryItems from './api/routes/inventories/addNewInventoryItems.js';
import deleteInventory from './api/routes/inventories/deleteWholeInventory.js';
import printPDFs from './api/routes/inventories/returnQrPdfs.js';
import getPaymentsByTenantId from './api/routes/payments/getPaymentsByTenantId.js';
import getPaymentsByUserId from './api/routes/payments/getPaymentsByUserId.js';
import registerPayment from './api/routes/payments/registerPayment.js';
import createOrganization from './api/routes/organizations/createOrganization.js';
import getOrganizationsByUserId from './api/routes/organizations/getOrganizationsByUserId.js';
import deleteOrganization from './api/routes/organizations/deleteOrganization.js';
import deleteOrganizationMember from './api/routes/organizations/deleteOrganizationMember.js';
import getOrganizationMembersByOrganizationId from './api/routes/organizations/getOrganizationMembersByOrganizationId.js';
import updateOrganization from './api/routes/organizations/updateOrganization.js';
import addOrganizationMembers from './api/routes/organizations/addOrganizationMembers.js';
import updateUserData from './api/routes/userData/updateUser.js';
import addServices from './api/routes/services/addServices.js';
import getServicesByPropertyId from './api/routes/services/getServicesByPropertyId.js';
import deleteService from './api/routes/services/deleteService.js';
import getExpensesByUserId from './api/routes/services/getMonthlyExpensesByuserId.js';
const app = express();
const frontendURL = process.env.FRONTEND_URL_A;
const allowedOrigins = [
    frontendURL,
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Allow requests with no origin (e.g., mobile apps)
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
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
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy' });
});
// Load routes
app.use('/signup', signupRoute);
app.use('/newuser', newUserRoute);
app.use('/user', getUserData);
app.use('/properties', getProperties);
app.use('/add-property', addProperty);
app.use('/delete-property', deleteProperty);
app.use('/update-property', updateProperty);
app.use('/get-tenants', getTenants);
app.use('/add-tenant', addTenant);
app.use('/delete-tenant', deleteTenant);
app.use('/update-tenant', updateTenant);
app.use('/get-inventory', getInventories);
app.use('/delete-inventory-items', deleteInventoryItems);
app.use('/add-inventory-items', addNewInventoryItems);
app.use('/delete-inventory', deleteInventory);
app.use('/return-pdfs', printPDFs);
app.use('/get-payments-by-tenantId', getPaymentsByTenantId);
app.use('/get-payments-by-userId', getPaymentsByUserId);
app.use('/get-tenant-by-id', getTenantById);
app.use('/register-payment', registerPayment);
app.use('/create-organization', createOrganization);
app.use('/get-organizations-by-userId', getOrganizationsByUserId);
app.use('/delete-organization', deleteOrganization);
app.use('/get-organization-members-by-organizationId', getOrganizationMembersByOrganizationId);
app.use('/delete-organization-member', deleteOrganizationMember);
app.use('/update-organization', updateOrganization);
app.use('/add-organization-members', addOrganizationMembers);
app.use('/update-user', updateUserData);
app.use('/delete-service', deleteService);
app.use('/add-services', addServices);
app.use('/get-services-by-property-id', getServicesByPropertyId);
app.use('/get-expenses', getExpensesByUserId);
//app.use(centralizedErrorHandler);
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
export default app;
