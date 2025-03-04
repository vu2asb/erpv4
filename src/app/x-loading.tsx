import SkeletonCard from "@/components/ui/SkeletonCard";

const loading = () => {
  return (
    <main>
      <div className="sm:grid grid-cols-1 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {"abcdefg".split("").map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
};

export default loading;
