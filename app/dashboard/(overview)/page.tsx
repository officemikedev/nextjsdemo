import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
//import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
//import { usePathname, useParams } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ userid: string }>
}) {
  //const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  //const {totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers} = await fetchCardData();
  //const params = useParams();
  const userid = (await params).userid
  const ticks = new Date().getTime()*1000;
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense key={ticks} fallback={<CardsSkeleton/>}>
        <CardWrapper  userid={userid}/>
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense  key={ticks} fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense key={ticks}  fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices/>
        </Suspense>
      </div>
    </main>
  );
}