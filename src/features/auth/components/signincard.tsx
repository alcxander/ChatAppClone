import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignInCard = ({ setState } : SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setpending] = useState(false);
  const [error, setError] = useState("")

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setpending(true);
    signIn("password", {email, password, flow: "signIn"})
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setpending(false);
      })
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setpending(true);
    signIn(value)
      .finally(() => {
        setpending(false);
      })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader>
        <CardTitle>
          Login to continue
          <CardDescription>
            Use your email or another service to continue
          </CardDescription>
        </CardTitle>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4"/>
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required 
          /> 
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
            <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
            >
                <FcGoogle className="size-5 absolute top-2.5 left-2.5"/>
                Continue with Google
            </Button>
            <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
            >
                <FaGithub className="size-5 absolute top-2.5 left-2.5"/>
                Continue with Github
            </Button>
        </div>
        <p className="text-xs text-muter-foreground">Don&apos;t have an account?
            <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer"> Sign Up</span>
        </p>
      </CardContent>
    </Card>
  );
};
