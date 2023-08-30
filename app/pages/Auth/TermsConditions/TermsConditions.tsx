import { FC } from "react";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";

interface ITermsConditions {
  onConfirm: () => void;
}

const TermsConditions: FC<ITermsConditions> = ({ onConfirm }) => {
  return (
    <div className="w-full max-h-[calc(100vh_-_75px)] flex justify-center overflow-y-auto">
      <div className="w-1/2">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl">
          TERMS OF SERVICE: NXU CHARGING
        </div>

        <TermsAndConditionsText />

        <div className="flex justify-center py-20">
          <button
            className="w-full md:max-w-[350px] bg-black text-white uppercase font-semibold flex flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
            onClick={onConfirm}
          >
            <ConfirmIcon />
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function TermsAndConditionsText() {
  return (
    <div className="w-full text-white">
      <p className="underline">IMPORTANT</p>

      <p className="mb-5">
        WELCOME TO NXU. THIS TERMS OF SERVICE AGREEMENT (“TOS”) GOVERNS THE USE
        OF ELECTRIC VEHICLE CHARGING AND SUPPORT SERVICES FOR PLUG IN ELECTRIC
        VEHICLES THROUGH NXU CHARGING STATIONS AND RELATED EQUPMENT AND
        SERVICES. THIS IS A LEGAL AGREEMENT BETWEEN EACH END USER (referenced
        herein as “YOU” or “USER” or with “YOUR”) AND NXU, INC (“COMPANY”) THAT
        APPLIES EACH TIME YOU ACCESS OR USE A NXU CHARGER ON THE NXU CHARGING
        NETWORK, (A “CHARGER” “SOLUTION” or collectively, the “NETWORK”), YOU
        SHOULD THEREFORE READ CAREFULLY THE FOLLOWING TERMS AND CONDITIONS
        CONTAINED IN THIS TERMS OF SERVICE AGREEMENT AS THEY GOVERN YOUR USE OF
        THE NETWORK, AND/OR THE CHARGING SOLUTION AND ITS FUNCTIONALITY. THESE
        TERMS ARE IMPORTANT. THEY AFFECT YOUR RIGHTS. PLEASE READ THESE TERMS
        CAREFULLY AND MAKE SURE THAT YOU UNDERSTAND EACH PROVISION AS THEY
        CONTAIN IMPORTANT INFORMATION ABOUT THE SERVICES PROVIDED TO YOU. THESE
        TERMS REQUIRE THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE
        DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS. PLEASE CAREFULLY
        REVIEW SECTION 16 OF THESE TERMS FOR MORE INFORMATION. THESE TERMS LIMIT
        COMPANY’S LIABILITY AND THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A
        DISPUTE.
      </p>

      <ol className="list-decimal space-y-5">
        <li>
          Restrictions on Charging. When charging an electric vehicle using an
          Nxu Charger, You agree to follow all applicable product, vehicle,
          safety, and technical documentation for the Charger and the vehicle.
          You also agree to use the correct equipment and connector type for the
          vehicle. Nxu only permits the use of automaker-manufactured charging
          adapters on Nxu Chargers. Your use of any other adapter is prohibited
          at Nxu’s Chargers, or on the Nxu Network. You acknowledge and agree
          that Nxu’s Chargers are intended for use solely for standard,
          industry-manufactured automotive land vehicles, and that You are
          prohibited from using Nxu’s Chargers for any other type of vehicle, or
          electric transportation. This prohibition includes, without
          limitation, electric boats, home-built electric vehicles, home-built
          onboard chargers, and vehicles that contain personally modified
          chargers, without Nxu’s separate express prior written consent. You
          acknowledge that Nxu’s chargers are not UL listed and there is a
          chance that the Nxu Chargers could cause damage to your vehicle. To
          the maximum extent permitted under applicable law, Nxu shall have no
          responsibility to You for any damages or losses resulting from Your
          failure to comply with the terms of this paragraph, including without
          limitation any damages to personal property or arising from personal
          injury. You further acknowledge and agree to indemnify, defend, and
          hold Nxu harmless for any damage experienced by any party caused by
          Your failure to comply with the terms of this paragraph.
        </li>
        <li>
          License Grant. This TOS provides to You a personal, revocable,
          limited, non-exclusive, non-sublicensable, and non-transferable
          license to use the Solution, conditioned on Your continued compliance
          with the terms and conditions of this TOS. Nxu reserves the right to
          revoke this license to use the solution at any time and to terminate
          the charging session at any time and for any reason.{" "}
        </li>
        <li>
          Restrictions. Except as expressly provided herein, Company does not
          grant any other express or implied right to You or any other person.
          Accordingly, You may not modify, translate, decompile, create
          derivative work(s) of, copy, distribute, disassemble, broadcast,
          transmit, publish, remove or alter any proprietary notices or labels,
          license, sublicense, transfer, sell, mirror, frame, exploit, rent,
          lease, private label, grant a security interest in, or otherwise use
          the Solution in any manner not expressly permitted herein. Moreover,
          You shall not, nor shall You permit any third party or person to,
          disable, circumvent, or otherwise avoid any security device,
          mechanism, protocol, or procedure implemented by Company for use of
          the Solution or the Network.
        </li>
        <li>
          User Obligations. You represent that You are at least eighteen years
          of age or the legal age of majority in Your state (whichever is
          greater) and will, at all times, provide true, accurate, current, and
          complete information (for which You have all necessary rights,
          permission(s), or authority) when submitting information through the
          Solution, including, without limitation, when You provide information
          via a registration or submission form. In addition, You access the
          Solution on Your own volition and are responsible for compliance with
          all applicable laws, rules, and regulations with respect to Your use
          of the Solution If You access the Solution on behalf of any
          organization, Your organization shall be bound to this TOS and liable
          for any breach by You. You represent that You have all rights, power,
          and authority to agree to this TOS on behalf of Your organization.
        </li>
        <li>
          Proprietary Rights. All rights, titles, and interests in and to the
          Solution are owned by Company. The Solution is protected by United
          States copyright law and international treaty provisions governing
          proprietary rights, including, without limitation the Berne
          Convention. This TOS provides only a limited license to access and use
          the Solution. Accordingly, You expressly acknowledge and agree that
          Company transfers no ownership or intellectual property right, title,
          or interest in and to the Solution to You or anyone else. All
          trademarks, service marks, text, graphics, headers, icons, user
          interfaces, visual interfaces, photographs, sounds, artwork, computer
          code (including HTML, CSS, XML, and JavaScript code), programs,
          software, products, information, and documentation as well as the
          design, structure, selection, coordination, expression, “look and
          feel,” and arrangement of any content contained on or available
          through the Solution, unless otherwise indicated, are owned,
          controlled, and licensed by Company and/or its licensors. In
          particular, without limitation, the Company logo, the words “Nxu,” all
          Company product or service names, and Company advertising slogan(s)
          are trademarks. Nothing contained on the Solution should be construed
          as granting, by implication, estoppel or otherwise, any license or
          right to use any of Company's trade names, trademarks or service marks
          without express prior written consent. All rights not expressly
          licensed hereunder are reserved by Company.
        </li>
        <li>
          Account. You may be required to register to use the Solution or
          certain features of the Solution. Each registration is for a single
          user only, unless otherwise expressly agreed upon by Company.
          Registration for access to and use of the Solution may also require
          access credentials, such as a user name and a password, or adherence
          to other particular access requirements as designated by Company in
          its sole discretion from time to time. You hereby agree to consider
          Your access credentials, such as a user name and password, as
          confidential information and not to disclose such information to any
          third party without the prior express written consent of Company,
          which may be withheld in its sole discretion. You shall immediately
          notify Company if You suspect or become aware of any loss or theft of
          Your password or any unauthorized use of Your user name and password.
          Company will not be liable for any loss or damage arising from Your
          failure (whether inadvertent or intentional) to comply with these
          obligations. By submitting the requested information to the
          registration form on the Solution, You represent and warrant that the
          information You submit for registration is complete, true, accurate,
          and current in all respects. You must maintain and promptly update
          Your submitted account information to ensure that such information is
          complete, true, accurate, and current. Company reserves the right to
          suspend, terminate, or otherwise discontinue Your account and/or
          pending registration for any reason and without advance notice.
        </li>
        <li>
          Communications. By creating an Account or by giving us any contact
          information, you automatically opt-in, agree to, and hereby do consent
          to receive mail and electronic communications (email, text/SMS and by
          telephone) from us concerning information about the Solution or your
          account (collectively “Communications”). For account holders,
          Communications may include those that we are required to send to you
          by law concerning us, your Account, the Site, the Solution, or any
          services related to the Solution (“Required Communications”). The
          Communications may also be those that we send you for other reasons,
          including for payment purposes and two step verification. You may
          change your email or mobile phone number on file for your account by
          visiting your account profile or by contacting us. You may opt out of
          receiving all Communications other than Required Communications, via
          email by sending us a notice that identifies your full name, username,
          and email address; however, you will not receive any further
          electronic notices from us other than Required Communications,
          including other important notices or announcements, if you choose to
          opt out.
        </li>
        <li>
          Purchases. The Solution may contain the option for You to purchase a
          payment plan, membership plan, subscription, or other related products
          and services. The applicable fees (and any applicable discounts, if
          available), period of plan or subscription, renewal opportunities, and
          permitted payment methods (e.g., credit or debit) will be specified
          through the Solution at the time of order. All purchases are final and
          there will be no refunds or credits except as otherwise provided in
          this Agreement, indicated by Company in writing, or as may be required
          under applicable law. All transactions are void where prohibited by
          law and Company may request information in order to confirm the order
          and method of payment. Company reserves the right to terminate or
          suspend access to the Solution or any related plan, subscription,
          product, or service if You fail to pay any amounts when due. You shall
          reimburse Company for all reasonable costs incurred (including
          reasonable attorney’s fees) in collecting past-due amounts. Unless
          otherwise specified herein, all obligations with respect to the
          amounts due to Company under the TOU shall survive the expiration or
          termination of the TOU for any reason.
        </li>
        <li>
          Payments through the Solution. Upon placing an order, You agree to pay
          using the payment methods indicated and grant authorization to Company
          and/or the applicable third party payment-processor to charge Your
          payment methods indicated. Company and/or the applicable third-party
          payment processor shall charge and You shall be responsible for
          payment of all taxes, tariffs, levies, or duties applicable to Your
          payment. All amounts loaded to Your account will be denominated in the
          currency of the United States, and all transactions listed through the
          Solution are denominated in U.S. dollars. You are responsible for: (a)
          the accuracy of all credit and debit card information that You provide
          to us; and (b) maintaining the confidentiality and security of Your
          account information. You should not disclose Your account information
          to anyone. If Your account information is lost or stolen, anyone who
          obtains possession of either could use Your account. You are
          responsible for all transactions on Your account, including
          unauthorized transactions.
        </li>
        <ol className="list-[upper-roman] ml-5 space-y-5">
          <li>
            Loading of Funds. The Solution may require You to load a dollar
            value to Your account using Your credit or debit card on file in
            order to make payments at Company’s electric vehicle charging
            stations using the Solution. Any value that You load to Your account
            is a prepayment for the goods and services offered to You through
            the Solution. While you may be required to provide your credit and
            debit card information to enroll in the Solution, the Solution may
            not charge your payment method until your first attempt to purchase
            time at one of Company’s electric vehicle charging stations using
            the Solution, notwithstanding any applicable subscription fee. Any
            dollar value You have previously loaded to Your account will be
            refunded back to the original payment method You used to load funds
            to Your account if you cancel your enrollment in the Solution. The
            value You load to Your account is not insured by the Federal Deposit
            Insurance Corporation (FDIC) and does not earn interest. Company may
            impose limits on the amount of value that You may load to Your
            account. Company may require that You load a minimum amount to Your
            account in order to use the account’s payment functionalities or
            other features. Company may change these limits in its sole
            discretion and at any time without notice to You. There may be a
            delay from the time You load value to when the value is available
            for use through the Solution.
          </li>
          <li>
            Reloading of Funds. To use the Solution to make payments, You may be
            required to agree to the Solution’s automatic reload feature. The
            Solution will reload Your account by automatically charging the
            credit or debit card credentials that You have stored through the
            Solution whenever Your account balance falls below a certain,
            defined amount indicated at sign up. The Company will send You an
            email confirming the details of the automatic reload terms after You
            sign up. When the funds in Your account fall below the defined
            threshold the Company will automatically charge Your credit or debit
            card the reload amount You have selected. Company will send You a
            confirmation email after each reload purchase. You can change Your
            reload preferences at any time through the Solution, but changes may
            take up to twenty-four (24) hours to go into effect. Once Your
            payment method is charged, the transaction cannot be reversed.
          </li>
          <li>
            Fees. Except as provided in this Agreement or by the Company in
            writing, Company does not charge any activation, service, dormancy
            or inactivity fees in connection with Your account. There is no
            expiration date for the value on Your account.
          </li>
          <li>
            Transaction History. You are responsible for checking Your
            transaction history to ensure that Your transaction history and
            account balance are accurate. You can check Your transaction history
            and balance through the Solution. If You have questions regarding
            Your transaction history or balance, or if You wish to dispute any
            transaction, please call Customer Assistance. Company will review
            Your claim and correct any error promptly after finishing its
            review. Company has no obligation to review or correct any billing
            error unless You provide notice within sixty (60) days of the date
            of the transaction in question.
          </li>
        </ol>
        <li>
          Charging Pricing. The pre-tax charging pricing shown when logged onto
          the Site, the App, or at a charging station (“Charging Pricing”)
          represents the per-minute pricing charged during entire charging
          session and is based on the rate of charge Your vehicle communicates
          to the charging station that it can receive. Actual speed of charge
          may vary during the charging session and may fall below the Charging
          Pricing due to factors such as vehicle capacity at start of charging,
          temperature, battery age, vehicle efficacy, vehicle usage, and power
          output of the charging station. By using the Solution or any other
          payment mechanism to purchase time at a charging station, You
          understand these factors and agree to pay the Charging Pricing
          disclosed through the Solution or at the charging station.
        </li>
        <li>
          Subscription Plans. The Solution may provide You the option to sign up
          for a monthly subscription plan that provides discounted pricing at
          Company’s network of electric vehicle charging stations for a monthly
          fee. Discounts may vary depending on the region, so please check the
          Plan Details for more information regarding the discounts offered for
          charging stations located in your region. There is no minimum purchase
          obligation for this subscription, so the specified discounts will
          remain in effect regardless of how many charging sessions you purchase
          during the subscription term. In order to begin Your subscription
          plan, Company may require You to provide an acceptable means of
          payment, such as a valid credit or debit card. Some subscription plans
          may have differing conditions and limitations, which will be disclosed
          at Your sign-up or in other communications made available to You. You
          can find specific details regarding Your subscription through the
          Solution by accessing the “Plan details” menu item under the Profile
          menu in the Solution.
        </li>
        <ol className="list-[upper-roman] ml-5 space-y-5" type="A">
          <li>
            Automatic Renewal. Your subscription plan will continue
            month-to-month and automatically renew until terminated. You must
            cancel Your membership before it renews each month in order to avoid
            billing of the next month's membership fee to Your payment method on
            file.
          </li>
          <li>
            Payment. You will need to provide Company with authorization to
            charge Your credit or debit card on a recurring basis. The fee for
            the subscription plan will be charged to Your payment method on file
            at the time of enrollment and then each month thereafter until Your
            Account is funded following Your first use of the Solution at one of
            Company’s electric vehicle charging stations. Once Your Account is
            funded, the monthly subscription fee will be deducted from Your
            Account balance each month on the calendar day corresponding to the
            commencement of the paying portion of Your subscription until Your
            membership is cancelled. Subscription fees are fully earned upon
            payment. In some cases Your payment date may change, for example if
            Your payment method has not successfully settled or if Your paid
            membership began on a day not contained in a given month. You can
            find specific details on Your next payment date through the Solution
            by viewing your Billing Details. You authorize Company to charge any
            payment method associated to Your account in case Your primary
            payment method is declined or no longer available to Company for
            payment of Your subscription fee. You remain responsible for any
            uncollected amounts. If a payment is not successfully settled, due
            to expiration, insufficient funds, or otherwise, and You do not
            cancel Your account, Company may suspend Your access to the service
            until Company has successfully charged a valid payment method.
          </li>
          <li>
            Changes to Terms. Company may change the terms of the subscription
            plans or adjust pricing at any time as Company may determine in its
            sole discretion. Except as otherwise expressly provided for in these
            Terms of Use, Company will provide You with notice before
            implementing any price changes or changes to Your subscription plan.
          </li>
          <li>
            Limitations. Use of the subscription plan is non-transferable. The
            sale, barter, transfer or assignment of any subscription plan
            benefits is strictly prohibited. Without limiting any other
            remedies, Company may suspend or terminate any subscription plan if
            it suspects, in its sole discretion, that any member or other person
            has engaged in fraudulent activity in connection with the
            subscription plan, including without limitation by providing
            personal information that is untrue, inaccurate or not current.
          </li>
        </ol>

        <li>
          Communications, and Updates. By creating an account, You agree to
          receive communications from Company including, but not limited to
          email, push notifications, and/or text messages. These communications
          may include charging session notifications and final receipts. These
          communications are part of Your relationship with Company and You
          receive them as part of Your use of the Solution. You therefore hereby
          agree that any such notices, agreements, disclosures or other
          communications that Company sends to You electronically will satisfy
          any legal communication requirements.{" "}
        </li>
        <li>
          Data Collection and Storage. In return for using the Charger free of
          cost, you agree to allow the Company to collect data associated with
          the Charger’s usage and to your vehicle’s battery usage and
          performance. You agree to allow the Company to use this data for any
          reason, at any time, and without permission or notice. Additionally,
          you agree to allow the Company to collect and store your credit or
          debit card information for payments through the Solution or through
          Subscription Plans.
        </li>
        <li>
          Right to Use Likeness; Video Recording. You irrevocably authorizes the
          Company to use your likeness and/or name in any photograph, image,
          video, motion picture, performance, sound recording, or in any other
          media or format ("Likeness") for any purpose, including but not
          limited to advertising, publicizing or marketing for the Company, and
          to use and license others to use your Likeness for such purposes,
          without any compensation. You acknowledge that the Company may have
          video cameras integrated into, or installed near, the Solution for
          monitoring purposes. You acknowledge the existence of such recording
          devices and assent to the Company recording video footage of the
          Solution in which you may appear. You further acknowledge and agree
          that all property rights in and to the Company's use of your Likeness
          are the sole and exclusive property of the Company in perpetuity
          without limitation. You agree that the Company is the sole owner of
          all rights in the negatives, photographs, video or audio recordings,
          prints, and all other items bearing your Likeness, including full
          domestic and foreign copyrights therein, and shall have the exclusive
          right to make such use of your Likeness as it wishes, including, but
          not limited to, the right to display, reproduce, and distribute it in
          all media, and the right to create, perform, display, or reproduce
          derivative works thereof. In addition, you waive any right of privacy
          associated with your Likeness, as well as any right to inspect or
          approve the finished product wherein your Likeness appears.
        </li>
        <li>
          Mobile Usage. The Solution offers various tools or display
          functionality that are available to You via Your mobile phone or other
          mobile computing device. Please note that Your mobile carrier’s normal
          messaging, data, and other rates and fees will apply to Your use of
          the Solution. In addition, downloading, installing, or using the
          Solution may be prohibited or restricted by Your mobile carrier, and
          not all functionality on the Solution will work with all carriers or
          devices or in all locations. Therefore, You are solely responsible for
          checking with Your mobile carrier to determine if the Solution is
          available for Your mobile devices; what restrictions, if any, may be
          applicable to Your use of the Solution; and how much such use will
          cost You. Nevertheless, Your use of the Solution shall be strictly in
          accordance with this TOU.
        </li>
        <li>
          Disclaimer. COMPANY DOES NOT REPRESENT OR WARRANT THAT THE SOLUTION
          WILL OPERATE ERROR-FREE OR ON AN UNINTERRUPTED BASIS. THE SOLUTION IS
          PROVIDED “AS IS” AND “AS AVAILABLE,” AND COMPANY HEREBY DISCLAIMS ANY
          AND ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
          ANY IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, OR
          FITNESS FOR A PARTICULAR PURPOSE. MOREOVER, COMPANY EXPRESSLY
          DISCLAIMS RESPONSIBILITY AND LIABILITY FOR ANY THIRD PARTY PROVIDED
          MATERIALS, PROGRAMS, PRODUCTS, AND SERVICES SET FORTH, DESCRIBED ON,
          OR ACCESSED THROUGH THE SOLUTION, AND YOU AGREE THAT COMPANY SHALL NOT
          BE RESPONSIBLE FOR ANY LOSS OR DAMAGE OF ANY SORT INCURRED AS A RESULT
          OF ANY SUCH DEALINGS BETWEEN YOU AND A THIRD PARTY.
        </li>
        <li>
          Limitation and Liability. COMPANY SHALL NOT BE RESPONSIBLE FOR ANY
          CLAIM OF HARM RESULTING FROM A CAUSE BEYOND COMPANY’S CONTROL.
          MOREOVER, AND TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT
          SHALL COMPANY BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL,
          SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN ANY WAY
          CONNECTED WITH THE USE OF THE SOLUTION OR FOR ANY INFORMATION AND
          MATERIALS AVAILABLE THROUGH THE SOLUTION, WHETHER BASED IN CONTRACT,
          TORT, STRICT LIABILITY, OR OTHERWISE, AND EVEN IF COMPANY HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN ADDITION, TOTAL
          LIABILITY OF COMPANY FOR ANY REASON WHATSOEVER RELATED TO USE OF THE
          SOLUTION SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR USE OF THE
          SOLUTION (DURING THE LAST TWELVE (12) MONTHS) OR TEN U.S. DOLLARS ($10
          USD), WHICHEVER IS GREATER. THE NEGATION AND LIMITATION OF DAMAGES SET
          FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN
          BETWEEN NXU AND YOU. THE SERVICES WOULD NOT BE PROVIDED WITHOUT SUCH
          LIMITATIONS. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN,
          OBTAINED BY YOU FROM US OR OTHERWISE SHALL CREATE ANY WARRANTY,
          REPRESENTATION, OR GUARANTEE NOT EXPRESSLY STATED IN THESE TERMS.
        </li>
        <li>
          Indemnification. YOU AGREE TO INDEMNIFY AND HOLD HARMLESS COMPANY, ITS
          AFFILIATES, AND THEIR RESPECTIVE DIRECTORS, OFFICERS, MEMBERS,
          PARTNERS, SHAREHOLDERS, EMPLOYEES, CONTRACTORS, AND AGENTS FROM AND
          AGAINST ALL THIRD-PARTY ACTIONS, CAUSES OF ACTION, CLAIMS, DEMANDS,
          LOSSES, COSTS, DAMAGES, DEFICIENCIES, JUDGMENTS, LIABILITIES,
          PENALTIES, FINES, ASSESSMENTS, AND EXPENSES (INCLUDING, WITHOUT
          LIMITATION, ATTORNEY’S FEES AND COSTS OF LITIGATION) WHICH THEY OR ANY
          OF THEM SUFFER OR INCUR RESULTING FROM, BY REASON OF, ARISING OUT OF
          OR IN CONNECTION WITH: (I) PERSONAL INJURY, BODILY INJURY, INCLUDING
          FATAL INJURY TO, OR LOSS OF OR DAMAGE TO THE PROPERTY OF, ANY PERSON
          OR ENTITY WHATSOEVER (INCLUDING THE PARTIES HERETO) ARISING OUT OF OR
          IN CONNECTION WITH YOUR, OR ANYONE USING YOUR ACCESS CREDENTIAL, (II)
          YOUR NEGLIGENT USE OF THE SERVICES, (III) ANY BREACH BY YOU OF ANY
          REPRESENTATION, WARRANTY, AGREEMENT, OBLIGATION, OR COVENANT MADE BY
          YOU TO COMPANY INCLUDING IN ANY PLAN, AGREEMENT, CERTIFICATE,
          DOCUMENT, SCHEDULE, ANNEX, OR OTHER INFORMATION RELATING TO OR
          DELIVERED PURSUANT HERETO, (IV) ANY ACTUAL OR PROSPECTIVE CLAIM,
          LITIGATION, INVESTIGATION, OR PROCEEDING RELATING TO ANY OF THE
          FOREGOING, WHETHER BASED ON AGREEMENT, TORT, OR ANY OTHER THEORY,
          WHETHER BROUGHT BY A THIRD PARTY OR BY YOU, OR (V) YOUR USE OF THE
          SOLUTION.
        </li>
        <li>
          Governing Law. This TOS has been made in and will be construed and
          enforced solely in accordance with the laws of the State of Arizona,
          U.S.A as applied to agreements entered into and completely performed
          in the State of Arizona. Any dispute will be resolved by arbitration,
          with the losing party to pay all costs and fees.
        </li>
        <li>
          Enforcing Security on the Solution. Company reserves the right to
          view, monitor, and record activity on the Solution without notice or
          permission from You. Any information obtained by monitoring,
          reviewing, or recording is subject to review by law enforcement
          organizations in connection with investigation or prosecution of
          possible criminal or unlawful activity on the Solution as well as to
          disclosures required by or under applicable law or related government
          agency actions. Company will also comply with all court orders or
          subpoenas involving requests for such information.
        </li>
        <li>
          Injunctive Relief. You acknowledge that any breach, threatened or
          actual, of this TOS, including, without limitation, with respect to
          unauthorized use of Company proprietary rights or assets, will cause
          irreparable injury to Company, such injury would not be quantifiable
          in monetary damages, and Company would not have an adequate remedy at
          law. You therefore agree that Company shall be entitled, in addition
          to other available remedies, to seek and be awarded an injunction or
          other appropriate equitable relief from a court of competent
          jurisdiction restraining any breach, threatened or actual, of Your
          obligations under any provision of this TOS. Accordingly, You hereby
          waive any requirement that Company post any bond or other security in
          the event any injunctive or equitable relief is sought by or awarded
          to Company to enforce any provision of this TOS.
        </li>
        <li>
          Term & Termination. This TOS will take effect (or re-take effect) at
          the moment You sign this TOS or begin accessing, or using the Network
          or the Solution, whichever is earliest. Company reserves the right at
          any time and on any grounds, which shall include, without limitation,
          any reasonable belief of fraudulent or unlawful activity or actions or
          omissions that violate any term or condition of this TOS, to deny Your
          access to the Network, Solution or to any portion thereof in order to
          protect its name and goodwill, its business, and/or others, and this
          TOS will also terminate automatically if You fail to comply with its
          terms and conditions, subject to the survival rights of certain
          provisions identified below. Termination will be effective without
          prior notice and may impact (and prohibit) submission of any
          information. You may also terminate this TOS at any time by ceasing to
          use the Network or the Solution, but all applicable provisions of this
          TOS will survive termination, as identified below, and each re-access
          or use of Network, or the Solution will reapply this TOS (then in
          effect) to You.
        </li>
        <li>
          Waiver & Severability. Failure to insist on strict performance of any
          of the terms and conditions of this TOS will not operate as a waiver
          of any subsequent default or failure of performance. No waiver by
          Company of any right under this TOS will be deemed to be either a
          waiver of any other right or provision or a waiver of that same right
          or provision at any other time. If any part of this TOS is determined
          to be invalid or unenforceable pursuant to applicable law including,
          but not limited to, the warranty disclaimers and the liability
          limitations set forth above, then the invalid or unenforceable
          provision will be deemed superseded by a valid, enforceable provision
          that most clearly matches the intent of the original provision and the
          remainder of this TOS shall continue in effect.
        </li>
        <li>
          Miscellaneous. No joint venture, partnership, employment, affiliate,
          or agency relationship exists between You and Company as a result of
          this TOS or Your utilization of the Solution. This TOS represents the
          entire agreement between You and Company with respect to use of the
          Solution, and the Network, and they supersede all prior or
          contemporaneous communications and proposals, whether electronic,
          oral, or written between You and Company with respect to the Solution
          and the Network. You may not assign, delegate, or transfer any rights
          under this TOS without the prior written consent of Company. Please
          note that Company reserves the right to change the terms and
          conditions of this TOS by posting a revised TOS or mailing and/or
          e-mailing notice thereof to You. In addition, Company may add, modify,
          or delete any aspect, program, or feature of the Solution, but Company
          is not under any obligation to add any upgrade, enhancement, or
          modification. Your continued use of the Solution and/or the Network
          following any announced change will be conclusively deemed acceptance
          of any change to the terms and conditions of this TOS (and acceptance
          of the version of this TOS then in effect).
        </li>
      </ol>
    </div>
  );
}

export default TermsConditions;
