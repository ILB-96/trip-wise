import { AttractionsOutlined, ChatBubbleOutline, HomeMaxOutlined, HomeOutlined, HomeSharp, ModeOfTravelOutlined } from "@mui/icons-material";
import { FaHome } from "react-icons/fa";

export const navigation = [
  {
    id: "0",
    icon: <HomeOutlined fontSize="large" />,
    url: "/",
    title: "Home",
  },
  {
    id: "1",
    icon: <ModeOfTravelOutlined fontSize="large" />,
    url: "/trips",
    title: "Trips",
  },
  {
    id: "2",
    icon: <AttractionsOutlined fontSize="large" />,
    url: "/attractions",
    title: "Attractions",
  },
  {
    id: "3",
    icon: <ChatBubbleOutline fontSize="large" />,
    url: "/chats",
    title: "Community",
  },
];