import {
  Avatar,
  Typography,
  Paper,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import {
  LaptopMacOutlined,
  SupportOutlined,
  LibraryAddOutlined,
  ArticleOutlined,
  ChatBubbleOutlineOutlined,
  BusinessOutlined,
  ArrowDropDown,
  CallMergeOutlined,
} from "@mui/icons-material";
import MenuItem from "./components/menuItem";
import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent } from "@tauri-apps/api/window";

function App() {
  const openSlack = (url: string) => {
    const window = getCurrent();
    invoke("open_slack", { window, url }).catch(console.error);
  };

  return (
    <div>
      <div className="flex items-center m-4">
        <Avatar alt="Remy Sharp" src="hhLogo.png" />
        <Typography variant="h6" className="text-white pl-2">
          HH Dev
        </Typography>
      </div>
      <div className="flex m-2 gap-2 justify-evenly">
        <Paper className="p-2" elevation={3}>
          <Typography variant="h6">Basics</Typography>
          <Divider className="pt-2" />
          <MenuItem
            Icon={LaptopMacOutlined}
            url="https://github.com/hinge-health/phoenix#getting-started"
            text="Mac setup"
          />
          <MenuItem
            Icon={ArticleOutlined}
            url="https://phoenix-docs.hingehealth.com/"
            text="Phoenix docs"
          />
          <MenuItem
            Icon={LibraryAddOutlined}
            url="https://github.com/hinge-health/phoenix/discussions/new?category=dependency-management"
            text="Request a lib addition"
          />
          <MenuItem Icon={SupportOutlined} url="#" text="IT support" />
        </Paper>
        <Paper className="p-2" elevation={3}>
          <div className="flex items-center">
            <Avatar alt="Slack" src="slack.webp" sx={{ width: 32, height: 32 }} />
            <Typography variant="h6">Slack Channels</Typography>
          </div>
          <Divider className="pt-2" />
          <MenuItem
            Icon={ChatBubbleOutlineOutlined}
            url="https://hingehealth.enterprise.slack.com/archives/CQTUHLD6G"
            text="PHX Channel"
          />
          <MenuItem
            Icon={ChatBubbleOutlineOutlined}
            url="https://hingehealth.enterprise.slack.com/archives/C05K3GDUPQE"
            text="PHX Announcements"
          />
          <MenuItem
            Icon={ChatBubbleOutlineOutlined}
            url="https://hingehealth.enterprise.slack.com/archives/C063QLB421M"
            text="PHX Services Status"
          />
          <MenuItem
            Icon={ChatBubbleOutlineOutlined}
            url="#"
            func={() => openSlack("https://hingehealth.enterprise.slack.com/archives/C0110JX81HR")}
            text="App Release"
          />
        </Paper>
        <Paper className="p-2 flex-1" elevation={3}>
          <Typography variant="h6">Admin</Typography>
          <Divider className="pt-2" />
          <MenuItem Icon={BusinessOutlined} url="https://app.getguru.com/dashboard" text="Guru" />
          <MenuItem
            Icon={BusinessOutlined}
            url="https://hingehealth.latticehq.com/"
            text="Lattice"
          />
          <MenuItem
            Icon={BusinessOutlined}
            url="https://www.myworkday.com/hingehealth/d/pex/home.htmld"
            text="Workday"
          />
        </Paper>
      </div>
      <div className="flex m-2 gap-2 justify-evenly">
        <Paper className="p-2 flex-1" elevation={3}>
          <div className="flex items-center mb-2">
            <Avatar alt="Github" src="github-mark.png" sx={{ width: 32, height: 32 }} />
            <Typography variant="h6" className="pl-2">
              GitHub
            </Typography>
          </div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Waitting for my review</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MenuItem
                Icon={CallMergeOutlined}
                url="#"
                text="APP-2858 Add Installer package name as a super prop to Mixpanel"
              />
              <MenuItem
                Icon={CallMergeOutlined}
                url="#"
                text="CAREX-2106 Add Care Notes feature flag"
              />
              <MenuItem
                Icon={CallMergeOutlined}
                url="#"
                text="CV-2792 Implement cvEtSessionSummaries in Redux"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Created by Me</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MenuItem Icon={CallMergeOutlined} url="#" text="APP-2938 Upgrade RN to 0.73.x" />
              <MenuItem Icon={CallMergeOutlined} url="#" text="APP-2939 Upgrade Expo SDK to 50" />
              <MenuItem
                Icon={CallMergeOutlined}
                url="#"
                text="APP-2940 Implement a new GH issue template"
              />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </div>
    </div>
  );
}

export default App;
