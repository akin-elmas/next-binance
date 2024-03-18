import HomePageLayout from "@/components/HomePageLayout";
import { PortfolioPieChart } from "@/components/PortfolioPieChart/PortfolioPieChart";
import LeftArea from "@/components/LeftArea";

export default function Home() {
  return (
    <HomePageLayout leftSide={<LeftArea />} rightSide={<PortfolioPieChart />} />
  );
}
