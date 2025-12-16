type Props = {
  onClick: () => void;
};

export default function ExportButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: "white",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Exportar CSV
    </button>
  );
}
