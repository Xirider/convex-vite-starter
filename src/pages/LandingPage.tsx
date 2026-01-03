import { useConvexAuth } from "convex/react";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Feature One",
    description:
      "Here we describe the first key feature. It solves a specific problem and delivers value to users.",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    icon: Shield,
    title: "Feature Two",
    description:
      "This is where we explain the second feature. It complements the first and adds more capabilities.",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    icon: Sparkles,
    title: "Feature Three",
    description:
      "The third feature rounds out the offering. Together they create a complete solution.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
];

export function LandingPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm text-sm font-medium">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-2 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-chart-2" />
            </span>
            Badge Text Goes Here
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-foreground">This is the</span>
            <br />
            <span className="text-primary">Main Headline</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This is the subheadline that explains what the product does and why
            it matters. Keep it concise and compelling.
          </p>

          {!isAuthenticated && !isLoading && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-base h-12 px-8" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-12 px-8"
                asChild
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
          {isAuthenticated && (
            <div className="pt-4">
              <Button size="lg" className="text-base h-12 px-8" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 md:py-32 border-t">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background -z-10" />

        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Features Section Title
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              A brief description of what makes this product special and why
              users should care about these features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map(feature => (
              <Card key={feature.title} variant="interactive" className="p-8">
                <CardContent className="p-0">
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-xl ${feature.bg} mb-6`}
                  >
                    <feature.icon className={`size-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
