import { cn } from "../helpers/utils";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center py-3">
      <div
        className={cn(
          "size-32 animate-spin rounded-full border-t-2 border-b-2 border-red-700",
          className,
        )}
      />
    </div>
  );
};

export default Loader;
