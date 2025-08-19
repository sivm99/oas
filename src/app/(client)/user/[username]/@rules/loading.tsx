const RulesFieldLoading = () => (
  <div className="dash_child animate-pulse">
    <div className="h-8 bg-muted rounded w-1/2 mb-4" />
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div className="flex items-center space-x-3" key={item}>
          <div className="h-6 bg-muted rounded w-6" />
          <div className="h-6 bg-muted rounded w-full" />
        </div>
      ))}
    </div>
  </div>
);
export default RulesFieldLoading;
