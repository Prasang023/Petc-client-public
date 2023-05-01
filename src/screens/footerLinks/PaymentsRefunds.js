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

const PaymentsRefunds = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Header />
    <div className={classes.container}>
    <div className={classes.innerContainer}>
    <h1>Payment, Cancellation & Refund Policy</h1>
    <div>
    <p>PetC Animal Care LLP (hereinafter referred to as “PetC” or the “LLP” or “We” and grammatical variations thereof) acting under the brand name PetC, is the owner of the Website, namely, www.PetC.in (hereinafter referred to as the “Website”), is a service oriented online platform for providing online doctor consultation and other medical consultation for pets/animals, providing doctor-on-call services for pets, diagnostic and pathological services for pets, delivery of medicine and sale of products related to Animal Care and health. If you wish to avail any of our services you have to sign up through our Website by providing necessary details. However, before you enlist for any of our services/ products we request you to review this refunds and payment policy (“Payment Policy”) to avoid any further complications later during the course of business. Any reference in this Payment Policy to the “User”, “Customer” or “You”, including its grammatical variations, shall be deemed to refer to all visitors and users using, accessing, registering on, or browsing the Website, or purchasing products or availing the services through the website.</p>
    <p>All the transactions undertaken by You through our Website shall be guided by the Website Terms of Use, as detailed under the PetC Terms and Conditions Document (“PetC T&C Document”) as well as this Payments Policy.</p>
    <p>This Payment Policy shall be read and interpreted with the said PetC T&C Document, as available on the Website. Such PetC T&C Document shall be regarded as the Master Agreement between the User and PetC, and any provision not covered under this Payment Policy but has been so laid down under the PetC T&C Document shall be equally valid and binding, and shall have the same effect as if those had been provided under this Payment Policy itself. Any word, phrase, term, or expression, used in this Payment Policy but not defined hereunder, shall have the same meaning and implication as assigned to it under the PetC T&C Document, unless the contrary is established from the context thereof.</p>
    <p>PetC reserves the right to change, modify, update, alter, add to or revoke, whether in full on in part, this Payment Policy from time to time. In particular, PetC may at its sole discretion introduce new services and amend/introduce fees for existing services or modify the price of some or all of the existing services/ products offered on the Website. The last date of update or changes to the Payment Policy shall be provided at the outset, and the User is advised to take note of such date to understand the latest date of policy update. Such changes shall automatically become effective immediately after they are posted on the Website.</p>
    </div>

    <h1>MODE OF PAYMENT</h1>
    <div>
    <p>All our services and products that we provide will be listed on the Website along with the prices (inclusive taxes) in Indian Rupees (INR). The User shall be entitled to make payment for the services or products by any of the following means:</p>
    <ul>
      <li>Net Banking</li>
      <li>Debit or Credit Cards</li>
      <li>UPI</li>
      <li>Cash on Delivery</li>
    </ul>
    <p>PetC reserves the rights to change, alter, add, or remove any of the above-stated payment modes, and shall be entitled to refuse allowing payment by any of the said modes at any time for any particular or class or products or services, at its own discretion. The User shall not hold PetC liable for refusing any particular mode of payment. </p>
    <p>All our payments related activities are handled by third-party service providers. The details of our payment gateway service provider are as follows:</p>
    <h3>RAZOR PAY SOFTWARE PRIVATE LIMITED</h3>
    <p>Address: 1st Floor, SJR Cyber, 22, Laskar Hosur Road, Adugodi, Bangalore, Karnataka – 560030</p>
    <p>Support: <a href="https://razorpay.com/support/">https://razorpay.com/support/</a></p>
    <p>The User shall be obligated to make the payments for services availed or products purchaser, either at the time of placing the purchase order or booking appointment, as the case may be, or at the time of delivery of product or during the scheduled time of appointment, as per the User’s choice. However, once a mode and time of payment has been chosen by the User at the time of placing order or booking appointment, the same cannot be changed for the particular order/appointment.</p>
    <p>All procedures relating to payment, Cancellation of any service/ product, Return of any goods, Refund of the payment by PetC shall strictly be made by way of this Payment Policy. If you are a business entity, your represent that you are duly authorized by the business entity to accept these terms and conditions. Please note that if the customer refuses to pay when applied for Cash On Delivery (COD), PetC will take necessary legal actions against all of such persons.</p>
    </div>

    <h1>PRICE AND PAYMENTS</h1>
    <div>
    <p>All prices are displayed in Indian Rupees (INR), are inclusive of Taxes (GST) but exclusive of the Delivery Charges or Travelling Charges by the On-Call Doctors/Vets.</p>
    <p>Delivery Charges are applied at the time of Checkout.</p>
    <p>Price for Services (including without limitation doctor/vet fees, charges for diagnostic lab tests, online consultation fees), Travelling charges of the doctors/vets, or the price of any Pet Care Products or Pharmaceutical Products may change from time to time before (but not after the delivery or placing the order)</p>
    <p>If any medical professional (including a doctor/vet) is unavailable after booking of our Services we shall notify you as and when someone is available or if any products runs out of stock we will soon notify you as soon as its available or we will suggest you an alternative.</p>
    <p>The User understands that there may be a possibility that the prices payable or promotions offered in respect of the products or services on the Website may differ from those available over other service providers or pharmacies. We are under no obligation to align or match the price of any such other service provider or pharmacy’s price or promotion in event they differ those of the website. However, the prices charged for the products available through our Website shall be as per the product’s Maximum Retail Price, and the application of any discount, promotions, or benefits shall be solely discretionary on the part of PetC. The User agrees to purchase the products or avail of the services at the price as quoted on the Website itself.</p>
    <p>We endeavour to ensure that all pricing information on the Website is accurate; however there might be occasionally an error with the prices mentioned or due to technical glitches. PetC disclaims any warranty as to the accuracy or correctness of such prices displayed on the Website.</p>
    <p>In case you notice any pricing error after you made the order, you can request a cancellation or refund within a period of 7 (seven) days from the day of placing of the order.</p>
    </div>

    <h1>CANCELLATIONS</h1>
    <div>
    <p>Cancellation of orders shall be undertaken in the following incidents and manner (as applicable):</p>
    <h3>Cancellation by the Customers:-</h3>
    <p><b>For Services: –</b> Orders can be cancelled anytime before scheduled appointment, subject to cancellation charges. If cancelled before at least 2 (two) hours before the scheduled time of appointment, no cancellation charge shall be levied. If the fees/charges for the services is already paid by the user at the time of booking appointment, the same shall be refunded to the original source of payment within 15 working days. If the Customer chooses to cancel the appointment at any time within the 2 hours exactly prior to scheduled time of appointment, 35% of the total Bill amount shall be deducted towards the transport cost of the PetC Partners scheduled to visit your home for providing the services. In this event, if the fees/charges have already been paid at the time of booking appointment, the Balance amount (Bill amount paid, after deducting 35% thereof) shall be refunded to the original source of payment within 15 working days. In case the payment has not been made by you at the time of booking the appointment over the Website, you shall be obligated to pay in cash to the PetC Partner or its representative visiting your home for providing the services. PetC reserves the right to keep your account on suspension until such payment of cancellation penalty has been cleared by you, and you may not be allowed to transact further on the Website unless and until such payment is cleared by you. This remedy, if opted for by PetC, shall be in addition to any other relief or remedy available to PetC, whether under law or equity.</p>
    <p><b>For Pharmaceutical Products:-</b> Orders for Pharmaceutical Products (as defined in the PetC T&C Document) can be cancelled before bill generation and confirmation mail from PetC customer care. Once the Bill is generated the customer has to bear the full costs for the Products ordered.</p>
    <p><b>For other Products:-</b> Orders for Products other than Pharmaceutical Products can be cancelled at any time before the products have been shipped. So Cancellation penalty shall be imposed thereon, in such cases. However, once the product has been shipped by the respective Retail Stores, the same cannot be cancelled, and You agree and undertake to take delivery of the said products and pay in full the Bill Amount.</p>
    <h3>Cancellation by PetC:-</h3>
    <p>We reserve the right at our sole discretion, to refuse or cancel any order (in entirety or in part) for any reason whatsoever. Reasons for cancellation consist of unavailability of a product or portions thereof for purchase, inaccuracies or mistakes in product or pricing data, or troubles in receiving payments made by you. We will get in touch with you in case such product becomes available to us. If at any point of time after booking the doctor/vet’s appointment, the doctor/vet becomes unavailable, or the provision of service becomes otherwise not possible at the scheduled time of appointment, You will be automatically given a choice to re-schedule your appointment as per the available time slots on the Website (if any) at no extra cost, or You may also be given the option to cancel the appointment and in opting for such cancellation, we shall refund the full amount paid by you within the next 15 (fifteen) working days.</p>
    <p>We shall also cancel any service and/or cease any relationship with the customer if the customer tries to defame or the company finds malicious intentions by the customer or requested by any law enforcement agency.</p>
    </div>
    
    <h1>RETURN AND REFUND PROCEDURE</h1>
    <div>
    <p><b>REFUND –</b> The refund process will be initiated once we receive the products in its original condition as unused and sealed and after guaranteeing the same by us. The refund amount shall be paid within 15 (fifteen) working days from the date of receiving back of the products by us.</p>
    <p><b>MODE OF REFUND –</b> Please Note that if you have made the payment electronically (i.e. through a Credit/ Debit/ UPI/ Netbanking), the refund shall be automatically made to the same  Credit/ Debit/ UPI/ Netbanking account. If any Bank charges is levied the same shall be debited from the refundable account. In case you have made the payment by ‘Cash on Delivery’, you will be required to provide PetC with your desired Bank Account Details, in which the refund amount will be remitted.</p>
    </div>

    <h1>ENFORCEMENT OF RIGHTS</h1>
    <div>
    <p>You agree and understand that on booking an appointment or placing order for purchase of products, you become obligated to make full payment of the bill amount as provided to you by PetC. PetC, as well as the respective PetC Partners or Retail Stores providing the services or selling the products, shall be entitled to recover any amount billed against you but has been unpaid by you. In the event You fail to make payment for the amount due against you, PetC, as well as such PetC Partners or Retail Stores, shall be entitled to initiate legal actions, both civil and criminal and under tort and equity, against you to recover the same. This right shall be in addition to and without prejudice to PetC’ other rights and remedies as envisioned under this Payment Policy or PetC T&C Document, including without limitation, suspension/deletion of your account and indemnification.</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default PaymentsRefunds