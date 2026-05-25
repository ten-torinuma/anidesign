import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@eni/ui/components";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文がここに入ります。</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">カードのコンテンツ領域です。</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">キャンセル</Button>
        <Button>確認</Button>
      </CardFooter>
    </Card>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>アカウント情報を入力してください。</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">パスワード</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">ログイン</Button>
      </CardFooter>
    </Card>
  ),
};
