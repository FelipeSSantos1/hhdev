import { Avatar, Typography, Paper, Divider } from "@mui/material";
import {
  LaptopMacOutlined,
  SupportOutlined,
  LibraryAddOutlined,
  ArticleOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import MenuItem from "./components/menuItem";

function App() {
  return (
    <div>
      <div className="flex items-center m-4">
        <Avatar alt="Remy Sharp" src="hhLogo.png" />
        <Typography variant="h6" className="text-white pl-2">
          HH Dev
        </Typography>
      </div>
      <div className="flex m-2 gap-2">
        <Paper className="p-2" elevation={3}>
          <Typography variant="h6">Basics</Typography>
          <Divider className="pt-2" />
          <MenuItem
            Icon={LaptopMacOutlined}
            url="https://github.com/hinge-health/phoenix#getting-started"
            text="User env setup"
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
            <Avatar alt="Remy Sharp" src="slack.webp" sx={{ width: 32, height: 32 }} />
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
            url="https://hingehealth.enterprise.slack.com/archives/C0110JX81HR"
            text="App Release"
          />
        </Paper>
      </div>
    </div>
  );
}

export default App;
