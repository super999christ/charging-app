import React, { FC, useEffect, useState } from "react";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";

interface ITermsConditions {
  onConfirm: () => void
};

const TermsConditions: FC<ITermsConditions> = ({ onConfirm }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/public/tnc.html')
      .then(res => res.text())
      .then(res => {
        setHtml(res);
      })
  }, []);

  return (
    <div className="w-full max-h-[calc(100vh_-_75px)] flex justify-center overflow-y-auto">
      <div className="max-w-[350px]  w-full">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Terms and Conditions
        </div>
        <div className="w-full text-left text-white" dangerouslySetInnerHTML={{__html: html}}>
        </div>
        <div
          className="w-full md:max-w-[350px] md:mt-[40px] md:mb-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
          onClick={onConfirm}
        >
          <ConfirmIcon />
          <span>Confirm</span>
        </div>
        <br />
      </div>
    </div>
  );
};

export default TermsConditions;
