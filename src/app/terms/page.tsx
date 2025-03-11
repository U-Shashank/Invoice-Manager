import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Terms = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
            <div className="space-y-4">
              <p>
                <strong>Recipient Acquisition:</strong> Users will be acquired
                through a sign-up process. The invoice manager is designed
                solely for managing invoices and sending reminders. The
                agreement for receiving emails will be between the merchandise
                seller and the buyer, as the platform only facilitates these
                communications.
              </p>
              <p>
                <strong>Consent Mechanism:</strong> We will explicitly mention
                these details on the landing page of the invoice manager as part
                of our terms and conditions. This will ensure transparency and
                compliance with email policies. Users will be required to review
                and accept these terms before signing up.
              </p>
              <p>
                <strong>Additional Terms:</strong>
              </p>
              <p>
                - Users are responsible for the accuracy of the information they
                provide when creating invoices.
              </p>
              <p>
                - The invoice manager is not responsible for any disputes
                between sellers and buyers.
              </p>
              <p>
                - Users must comply with all applicable laws and regulations
                when using the invoice manager.
              </p>
              <p>
                - We reserve the right to modify or terminate the service at any
                time without notice.
              </p>
              <p>
                - All data provided by users will be handled in accordance with
                our privacy policy.
              </p>
              <p>
                - By using the invoice manager, you agree to these terms and
                conditions.
              </p>
              <p>
                - Any unauthorized use of the system is strictly prohibited.
              </p>
              <p>
                - Users are responsible for maintaining the confidentiality of
                their account credentials.
              </p>
              <p>
                - The platform only facilitates the sending of invoices and
                reminders, payment processing is handled outside of this
                platform.
              </p>
              <p>
                - We are not liable for any financial losses incurred by users.
              </p>

            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;