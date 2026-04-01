export default function PageContainer({ children }) {
  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 py-6 fade-in-up">
      {children}
    </div>
  );
}