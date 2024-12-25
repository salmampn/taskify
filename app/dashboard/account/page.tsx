import { AccountTable } from "./components/AccountTable";

function Accounts() {
  return (
    <div className='flex flex-col space-y-4'>
      <h1 className='text-3xl font-semibold'>Accounts</h1>
      <AccountTable />
    </div>
  );
}
export default Accounts;
