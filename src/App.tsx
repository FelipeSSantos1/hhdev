import {
  Avatar,
  Typography,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {
  LaptopMacOutlined,
  SupportOutlined,
  LibraryAddOutlined,
  ArticleOutlined,
  ChatBubbleOutlineOutlined,
  BusinessOutlined,
  ArrowDropDown,
  CallMergeOutlined,
  TextSnippetOutlined,
  PhoneAndroid,
  PhoneIphone,
} from "@mui/icons-material";
import MenuItem from "./components/menuItem";
import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent } from "@tauri-apps/api/window";
import Role from "./components/role";
import { useEffect, useState } from "react";

type Simulator = {
  name: string;
  uuid: string;
};

function App() {
  const [simulators, setSimulators] = useState<Simulator[]>([]);

  useEffect(() => {
    invoke("get_ios_simulators")
      .catch(console.error)
      .then((simulators) => {
        setSimulators(simulators as Simulator[]);
      });
  }, []);

  const openSlack = (url: string) => {
    const window = getCurrent();
    invoke("open_slack", { window, url }).catch(console.error);
  };

  const openSimulator = (uuid: string) => {
    const window = getCurrent();
    invoke("open_ios", { window, uuid }).catch(console.error);
  };

  return (
    <div>
      <div className="flex items-center m-4 ">
        <Avatar alt="Hinge Health" src="hhLogo.png" />
        <Typography
          variant="h6"
          className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent pl-2"
        >
          HH Dev
        </Typography>
      </div>
      <div className="m-2 gap-2 justify-evenly grid grid-cols-3 gri">
        <div className="p-2 bg-white rounded-md shadow-md">
          <Typography
            variant="h6"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
          >
            Basics
          </Typography>
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
        </div>
        <div className="p-2 bg-white rounded-md shadow-md">
          <div className="flex items-center">
            <Avatar alt="Slack" src="slack.webp" sx={{ width: 32, height: 32 }} />
            <Typography
              variant="h6"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
            >
              Slack Channels
            </Typography>
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
        </div>
        <div className="p-2 bg-white rounded-md shadow-md">
          <Typography
            variant="h6"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
          >
            Admin
          </Typography>
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
        </div>
        <div className="p-2 bg-white rounded-md shadow-md col-span-3">
          <Typography
            variant="h6"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
          >
            Release 1.200.0
          </Typography>
          <div className="flex justify-between mt-2">
            <Typography className="text-stone-900">Rollout 20%</Typography>
            <Typography className="text-stone-900" variant="body2">
              March 23
            </Typography>
          </div>
          <LinearProgress variant="determinate" value={20} className="mb-2" />
          <div className="grid grid-cols-2 gap-2">
            <Role
              name="Eduardo Pisapia"
              what="The Pilot"
              picture="https://avatars.githubusercontent.com/u/82107248"
            />
            <Role
              name="Oak Chantosa"
              what="On Call"
              picture="https://avatars.githubusercontent.com/u/68754854"
            />
          </div>
          <MenuItem
            Icon={TextSnippetOutlined}
            url="https://github.com/hinge-health/phoenix/releases/tag/v1.143.0"
            text="Changelog"
            align="justify-end"
          />
        </div>
        <div className="p-2 bg-white rounded-md shadow-md col-span-3">
          <div className="flex items-center mb-2">
            <Avatar alt="Github" src="github-mark.png" sx={{ width: 32, height: 32 }} />
            <Typography
              variant="h6"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent pl-2"
            >
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
        </div>
        <div className="p-2 bg-white rounded-md shadow-md col-span-2">
          <Typography
            variant="h6"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
          >
            Bitrise
          </Typography>
          <Typography className="text-stone-400" variant="body2">
            Create a build for a specific branch
          </Typography>
          <div className="flex gap-2">
            <TextField id="branch" label="Branch" variant="filled" size="small" />
            <Button variant="contained" size="small">
              Trigger a Dev Build
            </Button>
          </div>
        </div>
        <div className="p-2 bg-white rounded-md shadow-md">
          <Typography
            variant="h6"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
          >
            Simulators
          </Typography>
          <Divider className="pt-2" />
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography fontSize="small">iOS</Typography>
            </AccordionSummary>
            {simulators.map((simulator) => (
              <AccordionDetails>
                <MenuItem
                  Icon={PhoneIphone}
                  url="#"
                  text={simulator.name}
                  fontSize="small"
                  func={() => openSimulator(simulator.uuid)}
                />
              </AccordionDetails>
            ))}
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography fontSize="small">Android</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MenuItem Icon={PhoneAndroid} url="" text="Pixel 6" fontSize="small" />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default App;
