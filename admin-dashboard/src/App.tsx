import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DataProvider } from "./data/DataProvider";
import { BMAdvertising } from "./pages/BMStructure/BMAdvertising";
import { BMCompetitiveness } from "./pages/BMStructure/BMCompetitiveness";
import { BMPlatform } from "./pages/BMStructure/BMPlatform";
import { BMStructureLayout } from "./pages/BMStructure/BMStructureLayout";
import { AdvertisingUsageLayout } from "./pages/AdvertisingUsage/AdvertisingUsageLayout";
import { Company } from "./pages/AdvertisingUsage/Company";
import { Competitor } from "./pages/AdvertisingUsage/Competitor";
import { Growth } from "./pages/AdvertisingUsage/Growth";
import { EventRankingLayout } from "./pages/EventRanking/EventRankingLayout";
import { GameRanking } from "./pages/EventRanking/GameRanking";
import { RankComparison } from "./pages/EventRanking/RankComparison";
import { UserRanking } from "./pages/EventRanking/UserRanking";
import { Conclusion } from "./pages/InsightConclusion/Conclusion";
import { InsightConclusionLayout } from "./pages/InsightConclusion/InsightConclusionLayout";
import { Insights } from "./pages/InsightConclusion/Insights";
import { Advertising as OverviewAdvertising } from "./pages/Overview/Advertising";
import { Events as OverviewEvents } from "./pages/Overview/Events";
import { Insights as OverviewInsights } from "./pages/Overview/Insights";
import { Kpi as OverviewKpi } from "./pages/Overview/Kpi";
import { OverviewLayout } from "./pages/Overview/OverviewLayout";
import { Ranking as OverviewRanking } from "./pages/Overview/Ranking";
import { Summary as OverviewSummary } from "./pages/Overview/Summary";
import { Sources } from "./pages/Sources/Sources";

/**
 * All routes below map 1:1 to `navigation/menuConfig.ts`. This file only
 * wires paths to page components — it holds no business logic and no
 * styling, so it never needs to change when the design changes.
 */
export function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/overview" replace />} />

            <Route path="overview" element={<OverviewLayout />}>
              <Route index element={<Navigate to="kpi" replace />} />
              <Route path="kpi" element={<OverviewKpi />} />
              <Route path="events" element={<OverviewEvents />} />
              <Route path="ranking" element={<OverviewRanking />} />
              <Route path="advertising" element={<OverviewAdvertising />} />
              <Route path="insights" element={<OverviewInsights />} />
              <Route path="summary" element={<OverviewSummary />} />
            </Route>

            <Route path="event-ranking" element={<EventRankingLayout />}>
              <Route index element={<Navigate to="game" replace />} />
              <Route path="game" element={<GameRanking />} />
              <Route path="users" element={<UserRanking />} />
              <Route path="comparison" element={<RankComparison />} />
            </Route>

            <Route path="bm" element={<BMStructureLayout />}>
              <Route index element={<Navigate to="advertising" replace />} />
              <Route path="advertising" element={<BMAdvertising />} />
              <Route path="platform" element={<BMPlatform />} />
              <Route path="competitiveness" element={<BMCompetitiveness />} />
            </Route>

            <Route path="advertising" element={<AdvertisingUsageLayout />}>
              <Route index element={<Navigate to="competitor" replace />} />
              <Route path="competitor" element={<Competitor />} />
              <Route path="company" element={<Company />} />
              <Route path="growth" element={<Growth />} />
            </Route>

            <Route path="insight" element={<InsightConclusionLayout />}>
              <Route index element={<Navigate to="insights" replace />} />
              <Route path="insights" element={<Insights />} />
              <Route path="conclusion" element={<Conclusion />} />
            </Route>

            <Route path="sources" element={<Sources />} />

            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
