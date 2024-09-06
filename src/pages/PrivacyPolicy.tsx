import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            At Bike Rental Service, we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and disclose
            information about you when you use our services.
          </p>
          <h2 className="text-lg font-semibold mt-4">
            1. Information Collection
          </h2>
          <p className="text-gray-600">
            We collect information you provide directly to us, such as when you
            create or modify your account, rent a bike, request customer
            support, or otherwise communicate with us. This information may
            include your name, email, phone number, payment method, and other
            details.
          </p>
          <h2 className="text-lg font-semibold mt-4">2. Use of Information</h2>
          <p className="text-gray-600">
            We use the information we collect to provide, maintain, and improve
            our services, including processing transactions, developing new
            features, and providing customer support.
          </p>
          <h2 className="text-lg font-semibold mt-4">
            3. Sharing of Information
          </h2>
          <p className="text-gray-600">
            We may share your information with third-party vendors, service
            providers, and partners to perform certain services on our behalf,
            such as payment processing and bike maintenance.
          </p>
          <h2 className="text-lg font-semibold mt-4">4. Security</h2>
          <p className="text-gray-600">
            We take reasonable measures to help protect your personal
            information from loss, theft, misuse, and unauthorized access.
          </p>
          <h2 className="text-lg font-semibold mt-4">
            5. Changes to this Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on our website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
