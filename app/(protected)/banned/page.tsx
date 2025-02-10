import React from "react";

const BannedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Access Denied</h1>
        <p className="mt-4 text-lg">
          Your account has been banned. Please contact support for more
          information.
        </p>
      </div>
    </div>
  );
};

export default BannedPage;
