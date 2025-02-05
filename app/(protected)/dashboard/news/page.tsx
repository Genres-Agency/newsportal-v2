import React, { Suspense } from "react";
import NewsListingPage from "./_components/NewsListingPage";
import { LoadingPage } from "@/components/loading";

const page = () => {
  return (
    <div>
      <NewsListingPage />
    </div>
  );
};

export default page;
