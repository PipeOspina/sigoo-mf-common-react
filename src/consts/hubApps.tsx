import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  DistributionIcon,
  PickupIcon,
  WMSIcon,
} from "../components/atoms/Icons";
import type { HubApp } from "../types";

export const hubApps: HubApp[] = [
  {
    Icon: WMSIcon,
    label: "WMS",
    url: "https://sigo-wms-test.coordinadora.com",
  },
  {
    Icon: AccountBoxIcon,
    label: "Autorizaciones",
    url: "https://autorizacion-test.coordinadora.com",
  },
  {
    Icon: MergeTypeIcon,
    label: "Etiquetas",
    url: "https://app-dot-cm-sigo-consolidacion-test.appspot.com",
  },
  {
    Icon: DistributionIcon,
    label: "Reparto",
    url: "https://sigo-reparto-test.coordinadora.com",
  },
  {
    Icon: PickupIcon,
    label: "Recogidas",
    url: "https://sigo-recogidas-test.coordinadora.com",
  },
  {
    Icon: SettingsIcon,
    label: "Configuración",
    url: "https://sigo-configuracion-test.coordinadora.com",
  },
  {
    Icon: FindInPageIcon,
    label: "NyS",
    url: "https://sigo-nys-test.coordinadora.com",
  },
];
