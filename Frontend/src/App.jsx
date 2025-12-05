import { Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminForgotPassword from "./pages/admin/ForgotPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import DashboardHome from "./pages/admin/Dashboard/DashboardHome";



// Organization Pages
import OrganizationTable from "./pages/admin/Organization/OrganizationTable";
import OrganizationForm from "./pages/admin/Organization/OrganizationForm";
import OrganizationEdit from "./pages/admin/Organization/OrganizationEdit";
import OrganizationView from "./pages/admin/Organization/OrganizationView";

// Branch Pages
import BranchTable from "./pages/admin/Branch/BranchTable";
import BranchForm from "./pages/admin/Branch/BranchForm";
import BranchEdit from "./pages/admin/Branch/BranchEdit";
import BranchView from "./pages/admin/Branch/BranchView";

// Org Users

import OrgUserForm from "./pages/admin/OrgUsers/OrgUserForm";
import OrgUserTable from "./pages/admin/OrgUsers/OrgUserTable";
import OrgUserEdit from "./pages/admin/OrgUsers/OrgUserEdit";
import OrgUserView from "./pages/admin/OrgUsers/OrgUserView";

// Member Pages
import MemberLogin from "./pages/member/Login";
import MemberRegister from "./pages/member/Register";
import MemberForgotPassword from "./pages/member/ForgotPassword";
import MemberDashboard from "./pages/member/Dashboard";

function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

      {/* ADMIN DASHBOARD WRAPPER (ALL INSIDE THIS) */}
      <Route path="/admin/dashboard/*" element={<AdminDashboard />}>

        {/* Dashboard Home */}
        {/* <Route
          index
          element={
            <div className="text-center mt-20 text-xl">
              Welcome to Admin Dashboard
            </div>
          }
        /> */}
<Route index element={<DashboardHome />} />
        {/* ───────── ORGANIZATION ROUTES ───────── */}
        <Route path="organizations" element={<OrganizationTable />} />
        <Route path="organization/add" element={<OrganizationForm />} />
        <Route path="organization/edit/:id" element={<OrganizationEdit />} />
        <Route path="organization/view/:id" element={<OrganizationView />} />

        {/* ───────── BRANCH ROUTES ───────── */}
        <Route path="branches" element={<BranchTable />} />
        <Route path="branch/add" element={<BranchForm />} />
        <Route path="branch/edit/:id" element={<BranchEdit />} />
        <Route path="branch/view/:id" element={<BranchView />} />

        {/* ───────── ORG USERS ROUTES ───────── */}
        <Route path="org-users" element={<OrgUserTable />} />
        <Route path="org-user/add" element={<OrgUserForm />} />
        <Route path="org-user/edit/:id" element={<OrgUserEdit />} />
        <Route path="org-user/view/:id" element={<OrgUserView />} />


      </Route>

      {/* Member */}
      <Route path="/login" element={<MemberLogin />} />
      <Route path="/register" element={<MemberRegister />} />
      <Route path="/forgot-password" element={<MemberForgotPassword />} />
      <Route path="/dashboard/*" element={<MemberDashboard />} />

      {/* 404 */}
      <Route
        path="*"
        element={<div className="text-center mt-20 text-red-500 text-xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
