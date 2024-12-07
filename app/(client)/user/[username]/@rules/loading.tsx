const RulesFieldLoading = () => (
  <div className="dash_child animate-pulse">
    <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center space-x-3">
          <div className="h-6 bg-muted rounded w-6"></div>
          <div className="h-6 bg-muted rounded w-full"></div>
        </div>
      ))}
    </div>
  </div>
);
export default RulesFieldLoading;
