import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { getUserProfile } from "../../../helpers";
import { IProfileFormValidation } from "../../../types/ValidationErrors.type";
import Button from "@root/components/Button";
import useSWR from "swr";
import useAuth from "@root/hooks/useAuth";
import { formatPhoneNumber } from "@root/utils";

type IProfileError = IProfileFormValidation & { page: string };

const Profile: FC = () => {
  const [errors, setErrors] = useState<Partial<IProfileError>>({});
  const { data: user } = useSWR("user", getUserProfile, { suspense: true });

  const navigate = useNavigate();

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  useAuth();

  const onSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-7">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Profile
        </div>
        <div className="flex flex-col w-full gap-5 mb-5">
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="First Name"
              value={user.firstName}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Last Name"
              value={user.lastName}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Email"
              value={user.email}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Phone Number"
              value={formatPhoneNumber(user.phoneNumber)}
              readOnly={true}
            />
          </div>

          <div className="flex flex-row gap-5">
            <Button
              className="w-[calc(50%_-_10px)] px-[23px]"
              onClick={() => navigate(`/profile-password`)}
            >
              Password
            </Button>

            {user.billingPlanId !== 3 && (
              <Button
                className="w-[calc(50%_-_10px)] px-[23px]"
                onClick={() => navigate("/profile-creditcard")}
              >
                Credit Card
              </Button>
            )}
          </div>
        </div>
      </div>

      <Button onClick={onSubmit} iconLeft={<ConfirmIcon />}>
        Done
      </Button>
    </div>
  );
};

export default Profile;
