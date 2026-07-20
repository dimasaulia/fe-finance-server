import { AccountDetailV1 } from "@/features/dashboard/pages/AccountDetailV1";

type AccountDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AccountDetailPage({
  params,
}: AccountDetailPageProps) {
  const { id } = await params;

  return <AccountDetailV1 accountId={id} />;
}
