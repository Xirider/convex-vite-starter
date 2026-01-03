import { useQuery } from "convex/react";
import { Bell, Moon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { api } from "../../convex/_generated/api";

export function SettingsPage() {
  const user = useQuery(api.auth.currentUser);
  const { theme, toggleTheme, switchable } = useTheme();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Page subtitle goes here</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">
                {user?.name?.charAt(0).toUpperCase() || (
                  <User className="size-6" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name || "User"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {switchable && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "light" ? (
                  <Sun className="size-4 text-muted-foreground" />
                ) : (
                  <Moon className="size-4 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">
                    Dark mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle description goes here
                  </p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          )}
          {!switchable && (
            <p className="text-sm text-muted-foreground">
              Theme follows your system preference
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="size-4 text-muted-foreground" />
              <div>
                <Label htmlFor="email-notifications" className="font-medium">
                  Email notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle description goes here
                </p>
              </div>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="size-4 text-muted-foreground" />
              <div>
                <Label htmlFor="push-notifications" className="font-medium">
                  Push notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle description goes here
                </p>
              </div>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
