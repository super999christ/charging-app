import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const EmailSent: FC = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  return (
    <div className="w-full h-full flex flex-col items-center md:justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl">
          {topic === "signup" ? "Sign Up" : "Forgot Password"}
        </div>
        <div className="flex flex-col w-full text-white text-[20px]">
          <p>Thank you!</p>
          <p>Please check your email and click on the confirmation link.</p>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
