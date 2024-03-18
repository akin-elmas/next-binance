import HomePageLayout from "@/components/HomePageLayout";
import LeftArea from "@/components/LeftArea";
import PortfolioPieChart from "@/components/PortfolioPieChart";

export default function Home() {
  return (
    <HomePageLayout leftSide={<LeftArea />} rightSide={<PortfolioPieChart />} />
  );
}
