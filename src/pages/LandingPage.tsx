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
  },
  {
    icon: Shield,
    title: "Feature Two",
    description:
      "This is where we explain the second feature. It complements the first and adds more capabilities.",
  },
  {
    icon: Sparkles,
    title: "Feature Three",
    description:
      "The third feature rounds out the offering. Together they create a complete solution.",
  },
];

export function LandingPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="flex-1 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="size-3.5" />
            Badge Text Goes Here
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            This is the
            <span className="text-primary"> Main Headline</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This is the subheadline that explains what the product does and why
            it matters. Keep it concise and compelling.
          </p>

          {!isAuthenticated && !isLoading && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button size="lg" className="text-base" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
          {isAuthenticated && (
            <div className="pt-4">
              <Button size="lg" className="text-base" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 border-t bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Features Section Title
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A brief description of what makes this product special and why
              users should care about these features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map(feature => (
              <Card
                key={feature.title}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <CardContent className="pt-6">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
