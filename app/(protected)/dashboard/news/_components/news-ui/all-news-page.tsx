import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { getAllNews } from "../../news-action";
import Image from "next/image";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function NewsListPage() {
  // Fetch the news data on the server
  const allNews = await getAllNews();
  const totalNews = allNews.length;
  console.log(allNews);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Total News (${totalNews})`}
            description="View all news"
          />
        </div>
        <Separator />

        {/* Start News Table */}
        <>
          <div className="md:hidden">
            <Image
              src="/examples/tasks-light.png"
              width={1280}
              height={998}
              alt="Playground"
              className="block dark:hidden"
            />
            <Image
              src="/examples/tasks-dark.png"
              width={1280}
              height={998}
              alt="Playground"
              className="hidden dark:block"
            />
          </div>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <DataTable data={allNews} columns={columns} />
          </div>
        </>

        {/* End News Table */}
      </div>
    </PageContainer>
  );
}
