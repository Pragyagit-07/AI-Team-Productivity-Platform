import { Routes, Route, Navigate, useParams } from "react-router-dom";
import VerifyEmail from "./pages/member/VerifyEmail";
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

// import OrgUserLogin from "./pages/org-auth/Login";



// Member Pages
import MemberLogin from "./pages/member/Login";
import MemberRegister from "./pages/member/Register";
import MemberForgotPassword from "./pages/member/ForgotPassword";
import MemberDashboard from "./pages/member/Dashboard";
// Member Home
import MemberDashboardHome from "./pages/member/Home";

// Project Page
import ProjectsList from "./pages/member/Projects/ProjectsList";
import ProjectForm from "./pages/member/Projects/ProjectForm";
import ProjectView from "./pages/member/Projects/ProjectView";

// Task Page
import TaskBoard from "./pages/member/Tasks/TaskBoard";
import TaskForm from "./pages/member/Tasks/TaskForm";
import TaskList from "./pages/member/Tasks/TaskList";
import TaskView from "./pages/member/Tasks/TaskView";


import CalendarTab from "./pages/member/Calender";
import Activity from "./pages/member/Activity";
import ProfileSetting from "./pages/member/ProfileSetting";
import Subscriptions from "./pages/member/Subscriptions";

import AIAssistant from "./pages/member/AIAssistant";
import FloatingAIChat  from "./pages/member/FloatingAIChat";
function TaskBoardWrapper() {
  const { projectId } = useParams();
  return <TaskBoard projectId={projectId} />;
}

function TaskFormWrapper() {
  const { projectId } = useParams();
  return <TaskForm projectId={projectId} />;
}

function App() {
  return (
    <>
                <FloatingAIChat />

    <Routes>
      {/* Default */}

      <Route path="/" element={<Navigate to="/login" />} />
      

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

      {/* ADMIN DASHBOARD WRAPPER  */}
      <Route path="/admin/dashboard/*" element={<AdminDashboard />}>


        {/* Dashboard Home  */}
        <Route index element={<DashboardHome />} />
        {/* ORGANIZATION ROUTES*/}
        <Route path="organizations" element={<OrganizationTable />} />
        <Route path="organization/add" element={<OrganizationForm />} />
        <Route path="organization/edit/:id" element={<OrganizationEdit />} />
        <Route path="organization/view/:id" element={<OrganizationView />} />
        


        {/*  BRANCH ROUTES */}
        <Route path="branches" element={<BranchTable />} />
        <Route path="branch/add" element={<BranchForm />} />
        <Route path="branch/edit/:id" element={<BranchEdit />} />
        <Route path="branch/view/:id" element={<BranchView />} />

        {/* ORG USERS ROUTES */}
        <Route path="org-users" element={<OrgUserTable />} />
        <Route path="org-users/add" element={<OrgUserForm />} />
        <Route path="org-users/edit/:id" element={<OrgUserEdit />} />
        <Route path="org-users/view/:id" element={<OrgUserView />} />
       </Route>

       {/* ORG USER */}
{/* <Route path="/org/login" element={<OrgUserLogin />} /> */}




      {/* Member */}

      <Route path="/login" element={<MemberLogin />} />
      <Route path="/register" element={<MemberRegister />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<MemberForgotPassword />} />
      <Route path="/dashboard/*" element={<MemberDashboard />}>
      <Route index element={<MemberDashboardHome />} />
      <Route path="projects" element={<ProjectsList />} />
      <Route path="projects/add" element={<ProjectForm />} />
      <Route path="projects/edit/:id" element={<ProjectForm />} />
      <Route path="projects/view/:id" element={<ProjectView />} />
      <Route path="projects/:projectId/tasks" element={<TaskBoardWrapper />} />
       <Route path="projects/:projectId/tasks/add" element={<TaskFormWrapper />} />
       <Route path="tasks" element={<TaskList />} />
       <Route path="tasks/view/:id" element={<TaskView />} />
       <Route path="tasks/edit/:id" element={<TaskForm />} />
      <Route path="calender" element={<CalendarTab />} />
      <Route path="activity" element={<Activity />} />
      <Route path="profile" element={<ProfileSetting />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="ai" element={<AIAssistant />} />


</Route>


      {/* 404 */}
      <Route
        path="*"
        element={<div className="text-center mt-20 text-red-500 text-xl">Page Not Found</div>}
      />
    </Routes>
    </>
  );
}

export default App;
