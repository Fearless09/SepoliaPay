export default function IdSection({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="absolute top-0 left-0 z-[-5] -translate-y-1/2 p-24"
    />
  );
}
