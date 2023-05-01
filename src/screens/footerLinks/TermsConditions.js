import React from 'react'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Components import
import Header from "../../ui/Header/matnavbar";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    
  },
  innerContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 20px',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    }
  },
}));

const TermsConditions = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Header />
    <div className={classes.container}>
    <div className={classes.innerContainer}>
    <h1>Terms of Use</h1>
    <div>
    <p>The Company provides the service of facilitating veterinary teleconsultation for pets through veterinarians listed on the Platform (“Consultants”)</p>
    <p>These Terms: (i) will be considered to be an electronic record under the Indian data privacy laws including the Information Technology Act, 2000 read with rules and regulations made thereunder; and (ii) will not require any physical, electronic, or digital signature by the Company.</p>
    </div>

    <h2>Eligibility and Access</h2>
    <div>
    <p>The Service is not available to persons, under the age of 18 (eighteen) years or to any User suspended or removed from the Platform for any reason whatsoever. You represent that You are of legal age to form a binding contract and are not a person barred from using or accessing the Platform and receiving the Services by the Company or under the applicable laws of India.</p>
    <p>The Services are always evolving and the form and nature of the Services may change from time to time. In addition, the Company may stop (permanently or temporarily) providing the Service (or any features within the Platform) to You or to Users generally and may not be able to provide You with prior notice.</p>
    </div>
    
    <h2>Access and Use of Service</h2>
    <div>
    <p>In order to use the Service, You are required to create an account on the Platform by providing certain details about yourself, such as Your name, email address and such other details as may be required by the Platform (“Account”).</p>
    <p>You shall ensure and confirm that the Account information provided by You is complete, accurate and up-to-date. If there is any change in the Account information, You shall promptly update Your Account information on the Platform or by writing to the Company at support@petc.in. If You provide any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete), or if the Company has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, the Company has the right to suspend or terminate Your Account and refuse any and all current or future use of the Service (or any portion thereof) at its discretion, in addition to any right that the Company may have against You at law or in equity, for any misrepresentation of information provided by You.</p>
    <p>You are responsible for maintaining the confidentiality of Your Account information and for all activities that occur on or in connection with Your Account. You agree to notify the Company immediately of any unauthorized access or use of Your Account or any other breach of security and ensure that You exit from Your Account at the end of each session. You acknowledge and agree that the Company is not responsible or liable for any damages, losses, costs, expenses, or liabilities related to any unauthorized access to or use of Your Account. You may be held liable for losses incurred by the Company or any other User of or visitor of the Platform due to authorized or unauthorized use of Your Account as a result of Your failure in keeping Your Account information secure and confidential.</p>
    <p>You shall not have more than one active Account on the Platform. You are prohibited from selling, trading, or otherwise transferring Your Account to another party or impersonating any other person for the purpose of creating an Account with the Platform. The Company reserves the right to refuse access to the Service to new Users or to terminate access granted to existing Users at any time if such access or use of the Platform or the Service is found to be in breach of these Terms or Platform Policies or applicable laws or pursuant to any administrative or judicial order or direction by any governmental authority.</p>
    </div>

    <h2>Services</h2>
    <div>
    <p><b>Teleconsultation Services:</b></p>
    <p>The Company facilitates veterinary teleconsultation for the pets through the Consultants. Platform enables the Users to connect with the Consultants through the Platform by various modes including video, or the telephonic service, as may be available on the Platform.</p>
    <p>While We do check and authenticate the veterinarians listed on the Platform, You should independently also verify the credential of the Consultants and We are not liable for the same. Further, the Platform may have veterinarians from countries other than India, listed on the Platform, who may not be registered under the Indian laws to provide the veterinarian services. However, if You choose to procure the Services from such veterinarians, You hereby agree and acknowledge that consultation provided by such foreign Consultants is advisory in nature and should not be considered as a medical opinion.</p>
    <p>You hereby agree and acknowledge that the Platform is an intermediary that facilitates the provision of veterinary teleconsultation services on the Platform and is in no manner involved in providing such teleconsultation services to You. The Consultants are independent professionals and such services are being provided solely by them to the relevant pet. Therefore, they are responsible for the teleconsultation services rendered to the patient and the Company or the Platform is not in any manner liable for the consultations provided by such Consultants through the Platform including diagnosis, prescription, medication, and treatment prescribed to the patient and/or for their compliance with applicable laws.</p>
    <p>We do not endorse any specific Consultant on the Platform nor place any guarantee as to the quality of teleconsultation performed by them or provide any ratings for the Consultants through the Platform. Any such recommendations may be made by other Users of the Platform and the Company does not verify or acknowledge the same.</p>
    <p>The Company shall not be liable for breach of confidentiality and privacy of Users by the Consultants and claims of any nature whatsoever arising out of the wilful misconduct and negligence (including gross negligence) of such Consultants.</p>
    <p>The credentials of the Consultant and any description of their registrations/certifications, location, contact details, etc. displayed on the Platform, are as provided by the Consultant to the Company and the Company shall not in any manner, be responsible or liable for such information.</p>
    <p>You hereby expressly understand, acknowledge, and accept the following:</p>
    <ul>
      <li>In case any prescription is being provided to You by a Consultant, the same is being provided basis the online consultation and the reports/information/details shared by You with the Consultant through the Platform. However, such prescription may vary when the patient is examined physically, hence, in no event shall the prescription provided by the Consultant be relied upon as a final and conclusive solution.</li>
    </ul>
    <p>You agree to use the advice from a Consultant on the Platform pursuant to:</p>
    <ul>
      <li>an ongoing treatment with the patient's veterinarian</li>
      <li>a condition which does not require emergency treatment, physical examination, or medical attention</li>
      <li>medical history available as records with You for reference</li>
      <li>a record of physical examination and report thereof with You, generated through local veterinarian of the patient</li>
      <li>consultation with local veterinarian of the patient before abandoning or modifying any ongoing treatment.</li>
    </ul>
    <p>You agree that by using the Platform, the Consultant will not be conducting physical examination of the patient, hence, they may not have or be able to derive important information that is usually obtained through a physical examination. You hereby acknowledge and agree that You are aware of these limitations and agree to assume the complete risk of these limitations.</p>
    <p>You agree that all details provided by You during the course of availing Services on the Platform will be honest, accurate and complete. You further acknowledge and understand that misrepresentation of information or not providing all or complete details in relation to or for availing the Services may lead to inaccurate diagnosis and treatment and consequently inaccurate prescription. You agree to indemnify and hold harmless the Company and its directors, officers, and agents from and against any and all claims, proceedings, losses, penalties, liabilities, and damages arising due to or in relation to Your breach of this Clause.</p>
    </div>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    </div>
    </div>
    </>
  )
}

export default TermsConditions