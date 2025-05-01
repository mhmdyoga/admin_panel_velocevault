/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChartDataTx, useGetPercentOfMonths, useGetPercentTransaction, useGetTransaction } from '@/hooks/use-transaction';
import { Loader, TrendingDown, TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  total: {
    label: "Income",
    color: "#111",
  },
} satisfies ChartConfig


const Dashbord = () => {

  const router = useRouter();
  const {data: transaction, isLoading, isError} = useGetTransaction();
  const {data: percentOfMonths} = useGetPercentOfMonths();
  const {data: percentOfTransactions} = useGetPercentTransaction();
  const {data: chartDataTx} = useChartDataTx();
  const {toast} = useToast();

  const [chartData, setChartData] = useState<{month: string, total: number}[]>([])

  useEffect(() => {
    const roleUser = sessionStorage.getItem('value-data-role-user');
    if(roleUser !== 'admin'){
      toast({
        title: 'Access Denied!',
        description: 'Please Login before access this page',
        variant: 'destructive'
      })
           // untuk mencegah navigasi sebelum toast tampil
           setTimeout(() => {
            router.push('/auth/sign-in');
          }, 100);
    
    }
  }, [router, toast]);

  useEffect(() => {
    const fecthDataChartTx = () => {
      setChartData(chartDataTx?.data?.dataChart)
    };
    fecthDataChartTx()
  }, [chartDataTx])

  console.log('response data_chart',chartData);
  
  
  if(isLoading){
    return( 
          <div className='flex justify-center items-center h-screen ml-[445px]'>
            <Loader className='animate-spin w-10 h-10 text-muted-foreground'/>
          </div>
        )
  }

  if(isError){
    return <div>Error</div>
  }

  return (
    <div className='p-6 flex flex-col gap-4'>
        <div className='flex flex-row gap-8 items-center'>
        <Card className='w-72 h-32'>
        <CardHeader>
          <CardTitle className='font-medium text-lg'>Total Revenue</CardTitle>
          <CardTitle className='text-3xl'>${transaction.data.reduce((acc: any, item: any) => acc + item.amount, 0).toFixed(2)}</CardTitle>
        </CardHeader>
        </Card>

        <Card className='w-72 h-auto'>
        <CardHeader>
          <CardTitle className='font-medium text-sm'>Income By this Month</CardTitle>
          <CardTitle className='text-2xl'>${percentOfMonths?.data?.thisMonth.toFixed(1)}</CardTitle>
          <CardDescription>{percentOfMonths?.data?.thisMonth > percentOfMonths?.data?.lastMonth? (
            <div className='text-sm font-medium text-muted-foreground flex gap-2'>
             <h4 className='flex gap-2'>+{percentOfMonths?.data?.totalPercent.toFixed(1)}% <TrendingUp className='text-green-500 w-5 h-5'/></h4>
             <span className='text-muted-foreground'>from last month</span>
            </div>
          ) : (
            <div className='text-sm font-medium text-muted-foreground flex gap-2'>-{percentOfMonths?.data?.totalPercent.toFixed(1)}% <TrendingDown className='text-red-500 w-5 h-5'/></div>
          )}</CardDescription>
        </CardHeader>
        </Card>

        <Card className='w-72 h-auto'>
        <CardHeader>
          <CardTitle className='font-medium text-sm'>Orders By this Month</CardTitle>
          <CardTitle className='text-2xl'>{percentOfTransactions?.data?.thisMonth}</CardTitle>
          <CardDescription>{percentOfTransactions?.data?.thisMonth > percentOfTransactions?.data?.lastMonth? (
            <div className='text-sm font-medium text-muted-foreground flex gap-2'>
             <h4 className='flex gap-2'>+{percentOfTransactions?.data?.percentOfTransaction.toFixed(1)}% <TrendingUp className='text-green-500 w-5 h-5'/></h4>
             <span className='text-muted-foreground'>from last month</span>
            </div>
          ) : (
            <div className='text-sm font-medium text-muted-foreground flex gap-2'>-{percentOfTransactions?.data?.percentOfTransactions.toFixed(1)}% <TrendingDown className='text-red-500 w-5 h-5'/></div>
          )}</CardDescription>
        </CardHeader>
        </Card>
        </div>
        <Card className='w-full h-auto'>
      <CardHeader>
        <CardTitle>Line Chart - Dots</CardTitle>
        <CardDescription>Chart Income for 6 Months 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="total"
              type="natural"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-total)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by {percentOfTransactions?.data?.percentOfTransaction.toFixed(1)}% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Income for the last 6 months
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Dashbord