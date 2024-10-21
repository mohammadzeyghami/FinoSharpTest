import Logo from "@/assets/logo.png";
import DropDownMenu from "@/components/molecules/dropDownMenu/Primary";
import { Button } from "@/components/ui/button";
import {
  BadgePlus,
  BellIcon,
  BitcoinIcon,
  ChartNoAxesColumnIncreasingIcon,
  CircleUser,
  CoinsIcon,
  DownloadIcon,
  Globe,
  MenuIcon,
  MoonIcon,
  Newspaper,
  PaletteIcon,
  Search,
} from "lucide-react";
import { useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import DrawerPrimary from "../Drawer/Primary";
import { useState } from "react";
import AccordionPrimary from "@/components/molecules/accordion/primary";
import { Switch } from "@/components/molecules/switch/default";
import { useTheme } from "@/components/molecules/providers/ThemeProvider"; // Import your Theme Provider

const NavbarPrimary = () => {
  const { toggleTheme } = useTheme(); // Access the current theme and toggle function
  const intl = useIntl();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location
  const [drawer, setDrawer] = useState(false);

  const toggleLanguage = () => {
    const currentLang = location.pathname.split("/")[1]; // Get the current language from path
    const newLang = currentLang === "fa" ? "en" : "fa"; // Toggle language
    const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`); // Replace current language in path
    navigate(newPath); // Navigate to the new path
  };

  return (
    <div className="flex items-center justify-between w-full px-6">
      <div className="flex items-center w-full gap-4">
        <img src={Logo} alt="logo" className="h-[64px] me-2" />
        <div className="items-center hidden w-full gap-4 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-primary "
          >
            {intl.formatMessage({ id: "buyCrypto" })}
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-primary"
          >
            {intl.formatMessage({ id: "markets" })}
          </Link>
          <DropDownMenu>{intl.formatMessage({ id: "trade" })}</DropDownMenu>
          <DropDownMenu>{intl.formatMessage({ id: "futures" })}</DropDownMenu>
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-primary "
          >
            {intl.formatMessage({ id: "earn" })}
          </Link>
          <DropDownMenu>{intl.formatMessage({ id: "square" })}</DropDownMenu>
          <DropDownMenu>{intl.formatMessage({ id: "More" })}</DropDownMenu>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Search className="w-[18px] hover:text-primary h-[18px] duration-200 text-gray-500 cursor-pointer" />
        <Button className="flex gap-1">
          <DownloadIcon width={16} height={16} />{" "}
          {intl.formatMessage({ id: "deposit" })}
        </Button>
        <CircleUser className="w-[18px] h-[18px] text-gray-500 duration-200 hover:text-primary cursor-pointer" />
        <BellIcon className="w-[18px] h-[18px] text-gray-500 duration-200 hidden lg:block hover:text-primary cursor-pointer" />
        <Newspaper className="w-[18px] h-[18px] text-gray-500 duration-200 hidden lg:block hover:text-primary cursor-pointer" />
        <Globe
          onClick={toggleLanguage}
          className="w-[18px] h-[18px] text-gray-500 duration-200 hover:text-primary cursor-pointer"
        />
        <MenuIcon
          onClick={() => setDrawer(true)}
          className="w-[18px] h-[18px] text-gray-500 duration-200 block lg:hidden hover:text-primary cursor-pointer"
        />
        <MoonIcon
          onClick={toggleTheme} // Toggle theme using context
          className="w-[18px] h-[18px] text-gray-500 duration-200 hidden lg:block hover:text-primary cursor-pointer"
        />
      </div>
      <DrawerPrimary title=" " isOpen={drawer} onClose={() => setDrawer(false)}>
        <div className="flex flex-col items-start gap-1">
          <Link
            to="/"
            className="flex items-center w-full gap-2 px-6 py-3 text-sm font-medium text-center text-gray-500 hover:bg-gray-300 hover:text-white "
          >
            <BitcoinIcon className="w-6" />{" "}
            {intl.formatMessage({ id: "buyCrypto" })}
          </Link>
          <Link
            to="/"
            className="flex items-center w-full gap-2 px-6 py-3 text-sm font-medium text-gray-500 hover:bg-gray-300 hover:text-white"
          >
            <ChartNoAxesColumnIncreasingIcon className="w-6" />{" "}
            {intl.formatMessage({ id: "markets" })}
          </Link>
          <div className="w-full">
            <AccordionPrimary
              title={
                <div className="flex items-center gap-2">
                  <CoinsIcon className="w-6" />{" "}
                  {intl.formatMessage({ id: "trade" })}
                </div>
              }
            >
              <Link
                to="/"
                className="flex justify-start w-full py-4 text-sm font-medium text-start "
              >
                - {intl.formatMessage({ id: "spot" })}
              </Link>
            </AccordionPrimary>
          </div>

          <Link
            to="/"
            className="flex items-center w-full gap-2 px-6 py-3 text-sm font-medium text-gray-500 hover:bg-gray-300 hover:text-white "
          >
            <BadgePlus className="w-6" /> {intl.formatMessage({ id: "earn" })}
          </Link>
          <div className="flex items-center justify-between w-full gap-2 px-6">
            <div className="flex items-center gap-2">
              <PaletteIcon width={23} height={23} />
              <p> Theme:</p>
            </div>
            <Switch onClick={toggleTheme} />{" "}
            {/* This can also be used to toggle theme */}
          </div>
        </div>
      </DrawerPrimary>
    </div>
  );
};

export default NavbarPrimary;
