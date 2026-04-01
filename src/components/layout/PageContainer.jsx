export default function PageContainer({ children }) {
  return (
    <div
      className="fade-in-up"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        padding: '24px',
      }}
    >
      {children}
    </div>
  );
}
