import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";
import Link from "next/link";

const SignUp = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w=[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto aspect-square w-16" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to Aiur Nexus
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Auir Nexus account and agree to
          our User Agreement and Privacy Policy.
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          Do you already have an account?{" "}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
