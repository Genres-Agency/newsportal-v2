import PageContainer from "@/app/(protected)/_components/page-container";
import React from "react";
import AddNewsForm from "../_components/AddNewsForm";

export const metadata = {
  title: "Dashboard : Post News",
};

const page = () => {
  return (
    <div>
      <PageContainer>
        <AddNewsForm />
      </PageContainer>
    </div>
  );
};

export default page;
