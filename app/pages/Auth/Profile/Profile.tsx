import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { getUserProfile } from "../../../helpers";
import { IProfileFormValidation } from "../../../types/ValidationErrors.type";
import { validateToken } from "../../../validations";
import Button from "@root/components/Button";

interface IProfileData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  last4: string;
  expYear: number;
  expMonth: number;
  id: string;
}
type IProfileError = IProfileFormValidation & { page: string };

const Profile: FC = () => {
  const [errors, setErrors] = useState<Partial<IProfileError>>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getUserProfile();
        const { email, firstName, lastName, phoneNumber, id } =
          userData as IProfileData;
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setPhoneNumber(phoneNumber);
        setUserId(id);
      } catch (err) {
        setErrors({ page: "Error while fetch the user data" });
      }
    };

    getData();
  }, []);

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
              value={firstName}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Last Name"
              value={lastName}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Email"
              value={email}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Phone Number"
              value={phoneNumber}
              readOnly={true}
            />
          </div>

          <div className="flex flex-row gap-5">
            <Button
              className="w-[calc(50%_-_10px)] px-[23px]"
              onClick={() => navigate(`/profile-password?userId=${userId}`)}
            >
              Password
            </Button>

            <Button
              className="w-[calc(50%_-_10px)] px-[23px]"
              onClick={() => navigate("/profile-creditcard")}
            >
              Credit Card
            </Button>
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
