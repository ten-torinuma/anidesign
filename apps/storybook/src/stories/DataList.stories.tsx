import type { Meta, StoryObj } from "@storybook/react";
import { DataList, DataListItem } from "@eni/ui/components";
import { Badge } from "@eni/ui/components";
import { Button } from "@eni/ui/components";

const meta = {
  title: "Components/DataList",
  component: DataList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

const tenantColumns = [
  { key: "name",   label: "テナント名",  flex: 1,   minWidth: 120 },
  { key: "id",     label: "テナントID",  width: 160, minWidth: 100 },
  { key: "status", label: "ステータス",  width: 120, minWidth: 80  },
];

const tenants = [
  { name: "株式会社エニシアス", id: "enisia-corp",  status: "active" },
  { name: "サンプル株式会社",   id: "sample-inc",   status: "inactive" },
  { name: "テスト合同会社",     id: "test-llc",     status: "active" },
];

const statusBadge = (status: string) =>
  status === "active"
    ? <Badge variant="subtle">active</Badge>
    : <Badge variant="secondary">inactive</Badge>;

export const Static: Story = {
  render: () => (
    <DataList columns={tenantColumns}>
      {tenants.map((t) => (
        <DataListItem
          key={t.id}
          cells={{ name: t.name, id: t.id, status: statusBadge(t.status) }}
        />
      ))}
    </DataList>
  ),
};

export const WithAction: Story = {
  render: () => (
    <DataList columns={tenantColumns} actionWidth={64}>
      {tenants.map((t) => (
        <DataListItem
          key={t.id}
          cells={{ name: t.name, id: t.id, status: statusBadge(t.status) }}
          action={<Button variant="ghost" size="sm">編集</Button>}
        />
      ))}
    </DataList>
  ),
};

export const Clickable: Story = {
  render: () => (
    <DataList columns={tenantColumns}>
      {tenants.map((t) => (
        <DataListItem
          key={t.id}
          cells={{ name: t.name, id: t.id, status: statusBadge(t.status) }}
          onClick={() => alert(`${t.id} をクリック`)}
        />
      ))}
    </DataList>
  ),
};

export const ClickableWithAction: Story = {
  render: () => (
    <DataList columns={tenantColumns} actionWidth={64}>
      {tenants.map((t) => (
        <DataListItem
          key={t.id}
          cells={{ name: t.name, id: t.id, status: statusBadge(t.status) }}
          action={<Button variant="ghost" size="sm">編集</Button>}
          onClick={() => alert(`${t.id} をクリック`)}
        />
      ))}
    </DataList>
  ),
};
