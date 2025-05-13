import { useState, useEffect } from "react";

function DisplayInfo({ allInternships, allPrisms, specificInternship, specificPrism, activeTab }) {
  const [search, setSearch] = useState(null);
  const [activatedTab, setActivatedTab] = useState(activeTab);
  const [filterData, setFilterData] = useState(allInternships);

  const currentData =
    activatedTab == "intern" ? allInternships : allPrisms;

  useEffect(() => {
    setFilterData(currentData?.data || []);
  }, [activatedTab, currentData]);

  function toggleActive(tab) {
    setActivatedTab(tab);
  }

  return <section className="w-90" id="unallo">
    <div className="mt-5 d-flex justify-content-between align-items-center">
      <div className="flex">
        <h3 className="text-primary">Allocation Details</h3>
        <div className="toggle">
          <div
            className={`intern ${activatedTab == "intern" ? "active" : "inactive"
              }`}
            onClick={() => toggleActive("intern")}
          >
            Internship
          </div>
          <div
            className={`prism ${activatedTab == "prism" ? "active" : "inactive"
              }`}
            onClick={() => toggleActive("prism")}
          >
            Prism
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default DisplayInfo;