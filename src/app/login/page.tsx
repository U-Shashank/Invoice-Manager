import SubmitButton from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "@/utils/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();

    if (session?.user) {
        redirect("/dashboard");
    }

  return (
    <>
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter you email to login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-y-4"
                    action={ async (formData) => {
                        "use server"
                        await signIn("nodemailer", formData)
                    }}>
                        <div>
                            <Label>Email</Label>
                            <Input name="email" type="email" placeholder="john@mail.com" required/>
                        </div>
                        <SubmitButton text="Login"/>
                    </form>
                </CardContent>
            </Card>
        </div>
    </>
  );
}

export default LoginPage;