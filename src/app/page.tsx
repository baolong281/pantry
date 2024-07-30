"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<string>("");
  const { toast } = useToast();

  const onSubmit = async () => {
    if (user === "") {
      return;
    }

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
      }),
    });

    if (res.ok) {
      const body = await res.json();
      console.log(body);
      if (body[0]?.id) {
        console.log("making toast");
        toast({
          title: "New User Created ✅",
          description: `Username: ${user} has been registered`,
        });
      }
      router.push(`/dashboard/pantry/${user}`);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle> Sign In / Register</CardTitle>
          <CardDescription>
            Enter a username to either sign in or register. No password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent any default action for Enter key
                    onSubmit(); // Call the submit function
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="ml-auto flex justify-end">
          <Button onClick={onSubmit}>Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
