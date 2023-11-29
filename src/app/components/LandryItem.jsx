import Link from "next/link";
export const LaundryItem = ({ name, address, id, jam_buka, jam_tutup }) => {
  return (
    <div className="shadow-sm p-4 rounded-md border bg-slate-50">
      <div className="flex justify-between items-center">
        <Link href={`/laundry/${id}`} relative="path">
          <h2 className="font-extrabold text-blue-dark text-[18px]">{name}</h2>
        </Link>
        <span
          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg bg-green-100 text-green-800`}
        >
          {jam_buka} - {jam_tutup}
        </span>
      </div>
      <p className="text-bold text-[12px] text-gray-500">{address}</p>
    </div>
  );
};
