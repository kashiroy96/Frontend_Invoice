import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import StarRateIcon from '@mui/icons-material/StarRate';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';


export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: '/'
  },
  {
    title: "Customer",
    icon: <PersonIcon />,
    link: '/customer'
  },
  {
    title: "Item",
    icon: <StarRateIcon />,
    link: "/item"
  },
  {
    title: "Invoice",
    icon: <DescriptionIcon />,
    link: "/invoice"
  }

]