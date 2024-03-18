import HomePageLayout from "@/Layout/HomePageLayout";
import { PortfolioPieChart } from "@/components/Chart/Chart";
import LeftArea from "@/components/LeftArea";

export default function Home() {
  return (
    <HomePageLayout leftSide={<LeftArea />} rightSide={<PortfolioPieChart />} />
  );
}
