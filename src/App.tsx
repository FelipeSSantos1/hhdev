import React from "react";
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilFork,
  cilMonitor,
  cibGithub,
  cilClearAll,
  cilUser,
  cilBook,
  cilPlus,
} from "@coreui/icons";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  return (
    <div>
      <CSidebar>
        <CSidebarNav className="bg-teal-950">
          <CNavTitle className="bg-black/10 inline-flex">
            <CIcon customClassName="nav-icon" icon={cilClearAll} />
            Basics
          </CNavTitle>
          <CNavItem
            href="https://github.com/hinge-health/phoenix#getting-started"
            target="_blank"
            className="cursor-default"
          >
            <CIcon customClassName="nav-icon" icon={cilUser} />
            User env setup
          </CNavItem>
          <CNavItem
            href="https://phoenix-docs.hingehealth.com/"
            target="_blank"
            className="cursor-default"
          >
            <CIcon customClassName="nav-icon" icon={cilBook} />
            Phoenix docs
          </CNavItem>
          <CNavItem
            href="https://github.com/hinge-health/phoenix/discussions/new?category=dependency-management"
            target="_blank"
            className="cursor-default"
          >
            <CIcon customClassName="nav-icon" icon={cilPlus} />
            Request a lib addition
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilMonitor} />
            IT support
          </CNavItem>
          <CNavTitle className="bg-black/10 inline-flex">
            <CIcon customClassName="nav-icon" icon={cibGithub} />
            Github
          </CNavTitle>
          <CNavGroup toggler="PR Waiting for my review">
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilFork} /> Nav dropdown item
            </CNavItem>
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilFork} /> Nav dropdown item
            </CNavItem>
          </CNavGroup>
          <CNavGroup toggler="PR Created by me">
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilFork} /> Nav dropdown item
            </CNavItem>
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilFork} /> Nav dropdown item
            </CNavItem>
          </CNavGroup>
        </CSidebarNav>
      </CSidebar>
    </div>
  );
}

export default App;
