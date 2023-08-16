import { validateToken } from "../../validations";
import { FC } from "react";
import { useNavigate } from "react-router";

const EntryPage: FC = () => {
  const buttonClassName =
    "text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[328px] py-[10px] rounded text-lg font-semibold";
  const navigate = useNavigate();
  const isTokenValid = validateToken();
  return (
    <div className="h-[calc(100vh_-_75px)] w-full px-[50px] flex flex-col justify-center items-center gap-[35px]">
      {!isTokenValid && (
        <button
          className={buttonClassName}
          onClick={() => navigate("/auth-sign-up")}
        >
          SIGN UP
        </button>
      )}
      {!isTokenValid && (
        <button
          className={buttonClassName}
          onClick={() => navigate("/auth-sign-in")}
        >
          SIGN IN
        </button>
      )}
      <button
        className={buttonClassName}
        onClick={() => navigate("/charging-login")}
      >
        CHARGE
      </button>
      {isTokenValid && (
        <button
          className={buttonClassName}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      )}
      {isTokenValid && (
        <button
          className={buttonClassName}
          onClick={() => {
            localStorage.removeItem("appToken");
            navigate("/");
          }}
        >
          SIGN OUT
        </button>
      )}
    </div>
  );
};

export default EntryPage;
