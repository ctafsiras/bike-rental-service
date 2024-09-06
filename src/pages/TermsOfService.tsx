import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Welcome to Bike Rental Service. By accessing or using our services,
            you agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-lg font-semibold mt-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By creating an account or using our service, you agree to these
            Terms of Service and all applicable laws and regulations.
          </p>
          <h2 className="text-lg font-semibold mt-4">2. Service Use</h2>
          <p className="text-gray-600">
            You may use our service only in compliance with these Terms and all
            applicable local, state, national, and international laws, rules,
            and regulations.
          </p>
          <h2 className="text-lg font-semibold mt-4">
            3. User Responsibilities
          </h2>
          <p className="text-gray-600">
            You are responsible for your use of the service, for any content you
            post, and for any consequences thereof. You agree to use our service
            only for lawful purposes.
          </p>
          <h2 className="text-lg font-semibold mt-4">
            4. Modifications to the Service
          </h2>
          <p className="text-gray-600">
            We reserve the right to modify or discontinue, temporarily or
            permanently, the service (or any part thereof) with or without
            notice.
          </p>
          <h2 className="text-lg font-semibold mt-4">5. Termination</h2>
          <p className="text-gray-600">
            We may terminate or suspend your account and bar access to the
            service immediately, without prior notice or liability, for any
            reason whatsoever, including without limitation if you breach the
            Terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
