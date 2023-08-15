import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { getUserProfile } from "../../../helpers";
import { IProfileFormValidation } from "../../../types/ValidationErrors.type";
import { validateToken } from "../../../validations";

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
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
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
        const {
          email,
          firstName,
          lastName,
          phoneNumber,
          id,
          last4,
          expMonth,
          expYear,
        } = userData as IProfileData;
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setPhoneNumber(phoneNumber);
        setCreditCardNumber(`**** **** **** ${last4}`);
        setExpDate(`${expMonth} / ${expYear}`);
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
    <div className="w-full h-full flex flex-col items-center md:justify-center">
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

          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="CreditCard Number"
              value={creditCardNumber}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className={inputStyle}
              placeholder="Exp Date"
              value={expDate}
              readOnly={true}
            />
          </div>
          <div className="flex flex-row gap-5">
            <button
              className="bg-none border border-white hover:bg-nxu-charging-darkwhite w-[calc(50%_-_10px)] px-[23px] text-white font-semibold text-[16px]"
              onClick={() => {
                navigate(`/profile-password?userId=${userId}`);
              }}
            >
              Password
            </button>
            <button
              className="bg-none border border-white hover:bg-nxu-charging-darkwhite w-[calc(50%_-_10px)] px-[23px] text-white font-semibold text-[16px]"
              onClick={() => {
                navigate(`/profile-creditcard?userId=${userId}`);
              }}
            >
              Credit Card
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-full md:max-w-[350px] md:mt-[40px] md:mb-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={onSubmit}
      >
        <ConfirmIcon />
        <span>Done</span>
      </div>
    </div>
  );
};

export default Profile;
