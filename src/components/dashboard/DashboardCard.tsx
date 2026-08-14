type Props = {
  title: string;
  value: string;
};

export function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}