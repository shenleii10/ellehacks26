import { createBrowserRouter } from "react-router";
import { IntroSlides } from "./components/onboarding/IntroSlides";
import { AuthPage } from "./components/auth/AuthPage";
import { EmailVerification } from "./components/auth/EmailVerification";
import { ProfileSetupStep1 } from "./components/profile/ProfileSetupStep1";
import { ProfileSetupStep2 } from "./components/profile/ProfileSetupStep2";
import { ProfileSetupStep3 } from "./components/profile/ProfileSetupStep3";
import { CameraScanner } from "./components/scanner/CameraScanner";
import { ProductInfo } from "./components/results/ProductInfo";
import { ProfilePage } from "./components/profile/ProfilePage";
import { EditProfile } from "./components/profile/EditProfile";
import { SettingsPage } from "./components/profile/SettingsPage";
import { AppHelp } from "./components/profile/AppHelp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: IntroSlides,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/verify-email",
    Component: EmailVerification,
  },
  {
    path: "/profile-setup-1",
    Component: ProfileSetupStep1,
  },
  {
    path: "/profile-setup-2",
    Component: ProfileSetupStep2,
  },
  {
    path: "/profile-setup-3",
    Component: ProfileSetupStep3,
  },
  {
    path: "/scanner",
    Component: CameraScanner,
  },
  {
    path: "/product/:id",
    Component: ProductInfo,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/edit-profile",
    Component: EditProfile,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
  {
    path: "/help",
    Component: AppHelp,
  },
]);