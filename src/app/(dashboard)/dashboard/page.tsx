import { DashboardHomeV2 } from "@/features/dashboard/pages/DashboardHomeV2";
import { HomeShellLayout } from "@/layouts/HomeShellLayout";

export default function DashboardPage() {
  return (
    <HomeShellLayout>
      <DashboardHomeV2 />
    </HomeShellLayout>
  );
}
