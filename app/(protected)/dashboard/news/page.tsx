import React, { Suspense } from "react";
import { LoadingPage } from "@/components/loading";
import NewsListPage from "./_components/news-ui/all-news-page";

const page = () => {
  return (
    <div className="overflow-x-auto">
      <Suspense fallback={<LoadingPage />}>
        <NewsListPage />
      </Suspense>
    </div>
  );
};

export default page;
