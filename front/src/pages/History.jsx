import Header from "../components/Navbar/Navbar.jsx";
import HistoryTable from "../components/history/historyTable.jsx";

export default function History() {

  return (
    <>
      <Header />
      <div className="m-5">
        <HistoryTable />
      </div>
    </>
  );
}
