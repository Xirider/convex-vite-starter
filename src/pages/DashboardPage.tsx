import { useQuery } from "convex/react";
import { Activity, Clock, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "../../convex/_generated/api";

const stats = [
  {
    title: "Stat One",
    value: "123",
    change: "+12 this week",
    icon: Activity,
  },
  {
    title: "Stat Two",
    value: "456",
    change: "+34 this week",
    icon: TrendingUp,
  },
  {
    title: "Stat Three",
    value: "78.9",
    change: "This week",
    icon: Clock,
  },
];

const quickActions = [
  { label: "Account Settings", href: "/settings", icon: Settings },
];

export function DashboardPage() {
  const user = useQuery(api.auth.currentUser);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">
          Dashboard subtitle goes here
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {quickActions.map(action => (
              <Button
                key={action.label}
                variant="outline"
                className="justify-start h-auto py-3"
                asChild
              >
                <Link to={action.href}>
                  <action.icon className="size-4" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">First step title</p>
                  <p className="text-muted-foreground text-sm">
                    Description of what to do in this step
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Second step title</p>
                  <p className="text-muted-foreground text-sm">
                    Description of what to do in this step
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Third step title</p>
                  <p className="text-muted-foreground text-sm">
                    Description of what to do in this step
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
